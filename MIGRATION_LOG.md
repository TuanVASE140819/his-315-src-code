# Migration log — TypeScript migration (incremental)

Date: 2025-11-11

Summary of changes made so far (incremental migration toward full TypeScript):

- Added `src/types/custom.d.ts` to declare common non-TS modules and provide a loose `UnknownAction` type to reduce declaration errors for JS imports.
- Enabled `allowJs: true` in `tsconfig.json` to allow mixing JS/TS during migration.
- Created `src/pages/HeThong/NhanVien/columns.tsx` and refactored `index.jsx` to use it (columns extraction).
- Updated `src/pages/HeThong/NhanVien/index.jsx`:
  - Sync `pageSize` from API metadata (computed = ceil(totalCount / totalPages)).
  - Enabled vertical scroll on the AntD Table (scroll.y = 600) to allow 20 rows with scrollbar.
  - Converted columns usage to import memoized `getColumns` and wrapped handlers with `useCallback`.
  - Converted component file to progressively use typings where necessary.
- Annotated many redux-saga generator functions with `SagaIterator` and added lightweight `any` typings where necessary to silence generator/`yield` implicit-any warnings. Files modified include:
  - `src/redux/sagas/commonSaga.ts`
  - `src/redux/sagas/nhanVienSaga.ts`
  - `src/redux/sagas/userSaga.ts`
  - `src/redux/sagas/teamSaga.ts`
  - plus small fixes in other saga files as part of earlier steps.

Notes / rationale:
- The changes are intentionally incremental and conservative: we prefer to make small, verifiable changes that reduce TypeScript noise and keep the app runnable.
- Many files still have implicit-any or typing mismatches. The next phase is to methodically convert key UI pages and redux artifacts to `.ts`/`.tsx` and add types (actions, state, services).

Next recommended steps:
1. Convert remaining `.jsx` files to `.tsx` (start with `src/pages/HeThong/NhanVien/index.jsx`).
2. Add stronger typings for Redux actions/state (create central `src/types/redux.d.ts` or update existing `src/types/*`).
3. Annotate sagas with `SagaIterator` and type action params as specific action interfaces rather than `any`.
4. Remove temporary `as any` casts and `UnknownAction` once types are settled.

If you'd like, I will continue now by converting `src/pages/HeThong/NhanVien/index.jsx` -> `src/pages/HeThong/NhanVien/index.tsx` and ensure imports compile; say OK and I will proceed.
