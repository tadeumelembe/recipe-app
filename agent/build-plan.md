# Build Plan

Phased plan for the Recipe app. Each phase is shippable on its own. Do not start work from a later phase while an earlier one is incomplete — if something seems out of order, ask.

**Active phase: Phase 0 — Foundation migration.**

---

## Where the code is today

The app already has working screens and routes, built before this architecture was adopted:

- Routes in `app/`: `sign-in`, `sign-up`, `(tabs)/index` (feed), `(tabs)/search`, `(tabs)/profile`, `add-recipe`, `cooking-mode`, `recipe/[id]`
- Screens in `src/screens/`, feature components in `src/components/`, shared primitives in `src/components/Themed.tsx`
- Firebase for auth and Firestore for data (`src/services/`, `firebaseConfig.js`)
- `src/contexts/authContext.tsx` for the session
- Styling via `StyleSheet` + `src/constants/style.tsx`

The target stack (NativeWind, TanStack Query, DDD layers) is described in `architecture.md`. Firebase stays — what changes is that it moves behind repositories in `data/` instead of being called directly from `src/services/`. Phase 0 closes that gap.

---

## Phase 0 — Foundation migration (active)

Goal: the target architecture exists and one vertical slice runs on it end to end.

1. Install and configure NativeWind; add `presentation/components/ui/Screen.tsx` with the `SafeAreaView` fix baked in.
2. Create the `domain/` layer: `Recipe`, `Ingredient`, `Direction`, `User` entities and the `IRecipeRepository` / `IUserRepository` interfaces. Replace the ad-hoc types in `src/components/types.tsx` as each is superseded.
3. Model Firestore: `recipes` (with `ingredients` and `directions` embedded in the document), `likes`, `saves`, `follows`; security rules so only an author can edit their own recipe; a Storage path convention for recipe media.
4. Implement `FirebaseRecipeRepository` + mappers, with an in-memory fake for tests. Migrate `src/services/recipe/recipeService.ts` behind it — that file currently writes an unvalidated form object straight to Firestore.
5. Add TanStack Query provider and the centralized query-key factory.
6. Port **one** slice — the recipe detail screen — fully onto the new stack as the reference implementation.

Done when: recipe detail reads through a use case, renders with NativeWind, and has passing tests against the in-memory repository.

---

## Phase 1 — Publishing

Goal: a user can create a real recipe and see it.

- Recipe form with React Hook Form + Zod: title, description, ingredients, directions
- Stable ids for every ingredient and direction; add, remove, and reorder without corrupting state
- Cover image and per-step images: pick via `expo-image-picker`, compress, upload to Firebase Storage
- `PublishRecipe` use case: upload media → persist → invalidate feed
- Draft persistence so a half-written recipe survives backgrounding

---

## Phase 2 — Feed and discovery

- Paginated feed via `useInfiniteQuery`, rendered with FlashList
- Recipe card: cover, title, author, like count
- Search across title, ingredient, and author
- Empty, loading, and error states for every list

---

## Phase 3 — Social

- Like and save with optimistic updates and rollback
- Public profile: published recipes and saved collection as tabs
- Follow / unfollow, and a feed filtered to followed cooks
- Share out via `expo-sharing`

---

## Phase 4 — Cooking mode

- Full-screen, step-by-step walkthrough of the directions
- Large type, one step at a time, swipe or tap to advance
- Keep the screen awake while active; release the lock on unmount
- Ingredient checklist reachable without leaving the flow

---

## Phase 5 — Polish

- Auth hardening: password change, account settings, sign-out everywhere
- Offline read cache for saved recipes
- Accessibility pass: labels, hit targets, dynamic type
- Performance pass on the feed: image sizing, list recycling, render counts

---

## Later (not in scope yet)

- Comments and threaded replies
- Push notifications
- AI-assisted recipe drafting from a photo or a rough description
- Collections / cookbooks
