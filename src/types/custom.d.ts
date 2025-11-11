// Global module declarations to help incremental migration from JS/JSX to TS/TSX
declare module '*.js'
declare module '*.jsx'
declare module '*.css'
declare module '*.scss'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'

// A loose UnknownAction type for dispatch helpers during migration
// During incremental migration allow dispatching loosely typed actions.
declare type UnknownAction = any

// Specific module shims for incremental migration
// note: specific module shims removed; core modules have been migrated to TS/TSX
