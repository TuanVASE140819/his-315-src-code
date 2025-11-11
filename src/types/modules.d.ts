// Type declarations for JS/JSX modules that haven't been converted to TS yet
declare module '*.jsx' {
  const component: React.ComponentType<any>
  export default component
}

declare module '*.js' {
  const value: any
  export default value
  export const value: any
}
