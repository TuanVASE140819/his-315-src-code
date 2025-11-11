// Common utility types
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type Maybe<T> = T | null | undefined

// Form types
export interface FormikHelpers {
  resetForm: () => void
  setSubmitting: (isSubmitting: boolean) => void
  setErrors: (errors: any) => void
}

// Callback types
export type VoidCallback = () => void
export type Callback<T = void> = (arg: T) => void
export type AsyncCallback<T = void> = (arg: T) => Promise<void>

// ID types
export type ID = number | string

// File upload types
export interface UploadFile {
  uid: string
  name: string
  status?: 'uploading' | 'done' | 'error' | 'removed'
  url?: string
  thumbUrl?: string
  originFileObj?: File
}

export interface UploadFileList extends Array<UploadFile> {}

// Table/List types
export interface TableColumn<T = any> {
  title: string
  dataIndex: string
  key: string
  render?: (value: any, record: T, index: number) => React.ReactNode
  width?: number | string
  align?: 'left' | 'center' | 'right'
  sorter?: boolean
  fixed?: 'left' | 'right'
}

export interface TablePagination {
  current: number
  pageSize: number
  total: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
}

// Modal/Dialog types
export interface ModalState {
  visible: boolean
  mode?: 'create' | 'edit' | 'view'
  data?: any
}

// Select option types
export interface SelectOption<T = any> {
  label: string
  value: T
  disabled?: boolean
}

// Toast/Notification types
export interface ToastConfig {
  icon: 'success' | 'error' | 'warning' | 'info'
  title: string
  text?: string
  timer?: number
}
