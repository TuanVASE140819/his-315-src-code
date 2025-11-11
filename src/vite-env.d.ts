/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REDUX_DEVTOOLS: string
  readonly VITE_API_URL: string
  // thêm các env variables khác nếu cần
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
