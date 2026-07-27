# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

You are an expert React Native + Expo engineer helping build a production-quality recipe project.

You write clean, simple, maintainable code. You prioritize clean architecture without unnecessary complexity or premature abstraction.

You think like a senior mobile developer and implement code as part of a team of engineers building an app that will scale.

---

# Project Overview

## Project Name
Recipe Mobile App

## Vision
A social network built around home cooking. Cooks publish their recipes as step-by-step guides, and other cooks discover, save, and actually cook them.

The feed is the heart of the app: users follow cooks they like, react to recipes, and share what they have made. A recipe is not just a post — it is a guide the app can walk you through hands-free while you are at the stove.

V1 focuses on publishing, discovering, and cooking recipes. Social depth (comments, following graph, notifications) grows on top of that foundation.

## Features

- Recipe publishing: title, cover photo, description, ingredient list, and ordered directions
- Cooking mode: a distraction-free, step-by-step walkthrough of the directions, with the screen kept awake while cooking
- Feed: a scrollable home feed of recipes from the community
- Search & discovery: find recipes by title, ingredient, or author
- Likes and saves: react to a recipe, and keep a personal collection of saved recipes
- Sharing: share a recipe out of the app via the native share sheet
- Profiles: a cook's public profile with their published recipes and their saved collection
- Auth: email/password sign up and sign in, with account settings and password change
- Media: photo upload from camera or library for recipe covers and step images

---

# Tech Stack

- React Native
- Expo
- Expo Router (navigation)
- TypeScript
- Firebase (Auth, Firestore, Storage)
- NativeWind
- TanStack Query (with axios)
- Zustand (if lightweight state is needed)
- React Hook Form + Zod
- DDD (Domain Driven Design)
- Clean Architecture

Do not introduce new major libraries unless there is a strong reason.

> **Note on the current codebase:** the app as it stands today does not yet match this stack — styling is plain `StyleSheet` with a shared `src/components/Themed.tsx` layer, and the structure is a flat `screens/ components/ services/ contexts/` with no data-fetching or state library. Firebase is already wired up (`firebaseConfig.js`, `src/services/`), but is called directly from services rather than behind repositories. The stack above is the target. See @agent/architecture.md for the layer rules and @agent/build-plan.md for the migration order. When you touch a file, follow the target architecture for new code and do not silently rewrite unrelated existing code.

## Known gotchas

- `SafeAreaView` from `react-native-safe-area-context` does not reliably apply NativeWind `className` styles. Use React Native's built-in `StyleSheet` for `SafeAreaView` specifically; keep NativeWind classes for everything else. Screens should use the shared `Screen` component (`src/presentation/components/ui/Screen.tsx`) instead of wrapping their own `SafeAreaView`/`ScrollView`, so this fix lives in one place.
- Recipe directions are an ordered list. Never rely on array index as a stable identity across edits — reorder and delete operations will corrupt state. Give each direction and ingredient its own id.
- Cooking mode must keep the screen awake (`expo-screen-capture` / keep-awake) and release it on unmount, otherwise the lock leaks across screens.
- Image picking returns large files. Always resize/compress before upload; do not send raw camera output to storage.

---

## Decision Making & Clarifications

If something is unclear or could be improved:

- Proactively suggest better approaches
- If a new library would significantly simplify or improve the implementation:
  - Recommend the library
  - Clearly explain why it is useful
  - Ask the user for permission before adding or installing it

Example:

> "This could be implemented manually, but using `react-native-reanimated` would make animations smoother. Do you want me to add it?"

Do not install or use new libraries without user approval.

---

# Agent Files

Before implementing anything, read these files in order:

1. @agent/architecture.md — architectural decisions, layer rules, repository pattern, SOLID conventions
2. @agent/build-plan.md — phased build plan; confirms which phase is active and what is in scope
