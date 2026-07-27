# Architecture

This document is the source of truth for how code is organized in the Recipe app. It describes the **target** architecture. The existing codebase predates it — see `build-plan.md` for the migration order.

---

## Guiding principles

- **Dependencies point inward.** Domain knows nothing about React, Expo, Firebase, or the network. Presentation depends on domain, never the reverse.
- **No premature abstraction.** Add a layer when there are two real callers, not because the diagram has a box for it.
- **A file does one thing.** If a component both fetches and renders and validates, split it.
- **Types are domain-owned.** Entities live in the domain layer, not in a shared `types.tsx` grab bag.

---

## Layers

```
src/
  domain/            # Pure TypeScript. No imports from react, expo, or firebase.
    entities/        # Recipe, Ingredient, Direction, User, Reaction
    repositories/    # Interfaces only — IRecipeRepository, IUserRepository
    usecases/        # PublishRecipe, ToggleLike, SaveRecipe, GetFeed

  data/              # Implements the domain's repository interfaces.
    firebase/        # Firebase client, Firestore queries, Storage uploads
    mappers/         # Document <-> entity conversion. Keeps DB shape out of domain.
    repositories/    # FirebaseRecipeRepository implements IRecipeRepository

  presentation/
    components/ui/   # Dumb, reusable: Screen, Button, Text, Avatar
    components/      # Feature components, grouped by feature folder
    hooks/           # TanStack Query hooks that call use cases
    stores/          # Zustand stores, only for genuinely global UI state

app/                 # Expo Router routes. Thin — layout + composition only.
```

### Layer rules

1. `domain/` imports nothing outside `domain/`.
2. `data/` imports `domain/` (to implement its interfaces) and external SDKs. Never imports `presentation/`.
3. `presentation/` imports `domain/` types and use cases. It must **not** import `data/` directly — wire concrete repositories at the composition root.
4. `app/` files contain routing, params, and layout. Business logic belongs in a use case; screen markup belongs in `presentation/`.

---

## Domain model

The recipe is the aggregate root. Ingredients and directions have no life outside it.

```ts
// domain/entities/Recipe.ts
export interface Recipe {
  id: RecipeId;
  authorId: UserId;
  title: string;
  description: string | null;
  coverImageUrl: string | null;
  ingredients: Ingredient[];
  directions: Direction[];
  createdAt: string;      // ISO 8601
  likeCount: number;
  isLikedByViewer: boolean;
  isSavedByViewer: boolean;
}

export interface Ingredient {
  id: string;             // stable id — never index-based
  name: string;
  quantity: string | null;
}

export interface Direction {
  id: string;             // stable id — never index-based
  position: number;       // 1-based, contiguous
  instruction: string;
  imageUrl: string | null;
}
```

**Ordering invariant:** `directions` is always sorted by `position`, and positions are contiguous starting at 1. Reordering is a domain operation that renumbers the whole list — do not let the UI mutate positions ad hoc.

---

## Repository pattern

The domain declares what it needs; `data/` decides how.

```ts
// domain/repositories/IRecipeRepository.ts
export interface IRecipeRepository {
  getFeed(cursor?: string): Promise<Page<Recipe>>;
  getById(id: RecipeId): Promise<Recipe | null>;
  create(draft: RecipeDraft): Promise<Recipe>;
  update(id: RecipeId, patch: RecipePatch): Promise<Recipe>;
  remove(id: RecipeId): Promise<void>;
  setLiked(id: RecipeId, liked: boolean): Promise<void>;
  setSaved(id: RecipeId, saved: boolean): Promise<void>;
}
```

Rules:

- Repository methods take and return **entities**, never Firestore `DocumentSnapshot`s or raw doc data. Conversion happens in `data/mappers/`.
- Repositories throw domain errors (`RecipeNotFoundError`), not raw `FirebaseError` objects.
- Firestore `Timestamp` never escapes `data/`. Mappers convert to ISO 8601 strings on the way out.
- One repository per aggregate. Do not create a repository per screen.

---

## Data fetching

TanStack Query owns all server state. Zustand is for UI state only (active cooking step, draft-in-progress, theme) — never a mirror of server data.

- Query keys are centralized and hierarchical: `['recipes','feed']`, `['recipes','detail',id]`, `['users',id,'saved']`.
- Likes and saves use **optimistic updates**, with rollback in `onError`. They are the most-tapped actions in the app and must feel instant.
- Hooks live in `presentation/hooks/` and call use cases. A component never calls a repository directly.

---

## Validation

Zod schemas live next to the form they validate and are the single source of truth for that form's types.

```ts
const recipeSchema = z.object({
  title: z.string().min(3).max(80),
  description: z.string().max(2000).nullable(),
  ingredients: z.array(ingredientSchema).min(1, 'Add at least one ingredient'),
  directions: z.array(directionSchema).min(1, 'Add at least one step'),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;
```

Wire with `zodResolver` in React Hook Form. Do not duplicate the shape as a hand-written interface.

---

## Styling

NativeWind for everything, with one exception: `SafeAreaView` from `react-native-safe-area-context` does not reliably apply `className`. That is handled once inside `presentation/components/ui/Screen.tsx`, which uses `StyleSheet` internally. Screens compose `Screen`; they do not wrap their own `SafeAreaView`.

---

## SOLID in practice

- **SRP** — a use case does one thing. `PublishRecipe` uploads media, persists, and invalidates; it does not also format dates for the UI.
- **OCP** — new recipe sources (drafts, imported, AI-generated) arrive as new repository implementations, not `if` branches inside existing ones.
- **LSP** — any `IRecipeRepository` must be substitutable, including the in-memory fake used in tests.
- **ISP** — prefer several small interfaces over one god-repository. A component that only reads the feed should not depend on `remove()`.
- **DIP** — presentation depends on the interface; the concrete Firebase implementation is injected at the composition root.

---

## Testing

- Jest + `@testing-library/react-native`.
- Use cases are tested against an in-memory repository — fast, no network, no mocks of Firebase internals.
- Components are tested through user-visible behavior (`getByText`, `getByRole`), not implementation details.
- Mappers get their own tests. They are where DB drift silently breaks the app.
