# 📘 Developer Guide - Frontend HIS Phusan315v2

## 📋 Mục lục

1. [Cấu trúc dự án](#cấu-trúc-dự-án)
2. [Quy tắc code chuẩn Senior](#quy-tắc-code-chuẩn-senior)
3. [Hướng dẫn tạo giao diện mới](#hướng-dẫn-tạo-giao-diện-mới)
4. [Hướng dẫn tích hợp API](#hướng-dẫn-tích-hợp-api)
5. [Best Practices](#best-practices)
6. [Code Review Checklist](#code-review-checklist)

---

## 🏗️ Cấu trúc dự án

```
src/
├── components/         # Các component dùng chung
│   ├── common/        # Button, Modal, Toast, etc.
│   └── layouts/       # Các module chức năng (DichVu, Doitac, etc.)
├── pages/             # Các trang chính
├── redux/             # State management
│   ├── actions/       # Action creators
│   ├── reducers/      # Reducers
│   ├── sagas/         # Side effects (API calls)
│   └── services/      # API service layer
├── types/             # TypeScript type definitions
├── hooks/             # Custom React hooks
├── utils/             # Utilities & helpers
├── routes/            # Routing configuration
└── schemas/           # Validation schemas (Yup)
```

---

## 🎯 Quy tắc code chuẩn Senior

### 1. TypeScript Best Practices

#### ✅ DO: Type-safe Components

```typescript
import React from 'react'
import type { User } from '../../types'

interface UserCardProps {
  user: User
  onEdit: (id: number) => void
  onDelete: (id: number) => Promise<void>
  isLoading?: boolean
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  // Implementation
}

export default UserCard
```

#### ❌ DON'T: Using `any` type

```typescript
// Bad
const processData = (data: any) => {
  return data.map((item: any) => item.value)
}

// Good
interface DataItem {
  id: number
  value: string
}

const processData = (data: DataItem[]): string[] => {
  return data.map((item) => item.value)
}
```

### 2. Component Organization

#### File Structure

```typescript
// Component.tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Button, Modal, Form } from 'antd'
import type { ComponentProps } from './types'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks'
import { fetchDataAction } from '../../redux/actions'
import { helperFunction } from './utils'
import './Component.css' // If needed

// 1. Type Definitions (if not in separate file)
interface LocalState {
  // ...
}

// 2. Constants
const DEFAULT_PAGE_SIZE = 10
const STATUS_OPTIONS = ['active', 'inactive'] as const

// 3. Helper Functions (if only used in this component)
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('vi-VN')
}

// 4. Main Component
const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // 4.1. Hooks (order matters)
  const dispatch = useAppDispatch()
  const stateData = useAppSelector(state => state.module)

  // 4.2. Local State
  const [data, setData] = useState<LocalState[]>([])
  const [loading, setLoading] = useState(false)

  // 4.3. Refs
  const containerRef = useRef<HTMLDivElement>(null)

  // 4.4. Memoized Values
  const filteredData = useMemo(() => {
    return data.filter(item => item.active)
  }, [data])

  // 4.5. Callbacks
  const handleSubmit = useCallback(async () => {
    // Implementation
  }, [dependency])

  // 4.6. Effects
  useEffect(() => {
    dispatch(fetchDataAction())
  }, [dispatch])

  // 4.7. Render
  return (
    <div ref={containerRef}>
      {/* JSX */}
    </div>
  )
}

export default Component
```

### 3. Naming Conventions

```typescript
// ✅ Components: PascalCase
const UserProfile: React.FC = () => {}
const ModalEditUser: React.FC = () => {}

// ✅ Functions/Variables: camelCase
const fetchUserData = () => {}
const isUserActive = true
const userList = []

// ✅ Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRY_ATTEMPTS = 3

// ✅ Types/Interfaces: PascalCase
interface UserData {}
type UserStatus = 'active' | 'inactive'

// ✅ Private functions: prefix with underscore (optional)
const _internalHelper = () => {}

// ✅ Boolean variables: use is/has/should prefix
const isLoading = false
const hasPermission = true
const shouldShowModal = false

// ✅ Event handlers: handle prefix
const handleClick = () => {}
const handleSubmit = () => {}
const handleModalClose = () => {}
```

### 4. State Management Rules

#### Redux Action Naming

```typescript
// Pattern: [NOUN]_[VERB]_[STATUS?]
export const USER_FETCH_REQUEST = 'USER_FETCH_REQUEST'
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS'
export const USER_FETCH_FAILURE = 'USER_FETCH_FAILURE'

export const PARTNER_CREATE_REQUEST = 'PARTNER_CREATE_REQUEST'
export const PARTNER_UPDATE_SUCCESS = 'PARTNER_UPDATE_SUCCESS'
export const PARTNER_DELETE_FAILURE = 'PARTNER_DELETE_FAILURE'
```

#### Action Creators

```typescript
// types/redux.types.ts
export interface FetchUsersPayload {
  keyword: string
  pageNumber: number
}

// actions/userActions.ts
export const fetchUsersAction = (payload: FetchUsersPayload) => ({
  type: USER_FETCH_REQUEST,
  payload,
})

export const fetchUsersSuccess = (data: User[]) => ({
  type: USER_FETCH_SUCCESS,
  payload: data,
})

export const fetchUsersFailure = (error: string) => ({
  type: USER_FETCH_FAILURE,
  payload: error,
})
```

### 5. Error Handling

```typescript
// ✅ Good: Proper error handling
const fetchData = async () => {
  try {
    setLoading(true)
    const response = await apiService.getData()
    setData(response.data)
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('API Error:', error.response?.data)
      message.error(error.response?.data?.message || 'Có lỗi xảy ra')
    } else {
      console.error('Unexpected error:', error)
      message.error('Lỗi không xác định')
    }
  } finally {
    setLoading(false)
  }
}

// ✅ Saga error handling
function* fetchUserSaga(action: FetchUserAction) {
  try {
    const response: AxiosResponse<ApiResponse<User>> = yield call(
      userService.getUsers,
      action.payload,
    )
    yield put(fetchUsersSuccess(response.data.data))
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    yield put(fetchUsersFailure(errorMessage))
  }
}
```

### 6. Performance Optimization

```typescript
// ✅ Use memo for expensive calculations
const expensiveValue = useMemo(() => {
  return data.filter(item => item.active)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 10)
}, [data])

// ✅ Use callback to prevent re-renders
const handleDelete = useCallback((id: number) => {
  dispatch(deleteUserAction(id))
}, [dispatch])

// ✅ Debounce search inputs
import { debounce } from 'lodash'

const debouncedSearch = useCallback(
  debounce((keyword: string) => {
    dispatch(searchAction(keyword))
  }, 400),
  [dispatch]
)

// ✅ Lazy loading for code splitting
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// Usage
<Suspense fallback={<Spin />}>
  <HeavyComponent />
</Suspense>
```

### 7. Code Comments

```typescript
// ✅ Document complex logic
/**
 * Tính toán tổng tiền sau khi áp dụng giảm giá và VAT
 * @param price - Giá gốc
 * @param discount - Phần trăm giảm giá (0-100)
 * @param vat - Phần trăm VAT (0-100)
 * @returns Tổng tiền cuối cùng
 */
const calculateFinalPrice = (
  price: number,
  discount: number,
  vat: number,
): number => {
  const discountedPrice = price * (1 - discount / 100)
  return discountedPrice * (1 + vat / 100)
}

// ✅ Explain WHY, not WHAT
// Bad: Tạo mảng mới
const newArray = [...oldArray]

// Good: Clone array để tránh mutate state gốc
const newArray = [...oldArray]

// ✅ Mark TODOs clearly
// TODO: Cần optimize query này khi data > 10000 records
// FIXME: Bug khi user click nhanh nhiều lần
// HACK: Workaround cho bug của thư viện antd v5.20
```

---

## 🎨 Hướng dẫn tạo giao diện mới

### Bước 1: Tạo Type Definitions

```typescript
// src/types/product.types.ts
export interface Product {
  id: number
  masp: string
  tensp: string
  mota: string
  gia: number
  soluong: number
  trangthai: 'active' | 'inactive'
}

export interface ProductFormValues {
  masp: string
  tensp: string
  mota?: string
  gia: number
  soluong: number
}

export interface ModalEditProductState {
  show: boolean
  data: Product | Record<string, never>
}

// Export trong index.ts
// src/types/index.ts
export * from './product.types'
```

### Bước 2: Tạo Component Structure

```bash
src/components/layouts/Product/
├── Product.tsx              # Main component
├── ModalCreateProduct/
│   └── ModalCreateProduct.tsx
└── ModalEditProduct/
    └── ModalEditProduct.tsx
```

### Bước 3: Tạo Modal Create

```typescript
// src/components/layouts/Product/ModalCreateProduct/ModalCreateProduct.tsx
import React from 'react'
import { Modal, Input, Form, InputNumber } from 'antd'
import type { ProductFormValues } from '../../../../types'

interface ModalCreateProductProps {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onCreate: (values: ProductFormValues) => void
}

const ModalCreateProduct: React.FC<ModalCreateProductProps> = ({
  isModalOpen,
  setIsModalOpen,
  onCreate
}) => {
  const [form] = Form.useForm<ProductFormValues>()

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      onCreate(values)
      form.resetFields()
      setIsModalOpen(false)
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }

  return (
    <Modal
      title='Tạo sản phẩm'
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Tạo'
      cancelText='Hủy'
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          name='masp'
          label='Mã sản phẩm'
          rules={[
            { required: true, message: 'Vui lòng nhập mã sản phẩm' },
            { max: 20, message: 'Mã sản phẩm tối đa 20 ký tự' }
          ]}
        >
          <Input placeholder='Nhập mã sản phẩm' />
        </Form.Item>

        <Form.Item
          name='tensp'
          label='Tên sản phẩm'
          rules={[
            { required: true, message: 'Vui lòng nhập tên sản phẩm' },
            { min: 3, message: 'Tên sản phẩm ít nhất 3 ký tự' }
          ]}
        >
          <Input placeholder='Nhập tên sản phẩm' />
        </Form.Item>

        <Form.Item name='mota' label='Mô tả'>
          <Input.TextArea
            rows={4}
            placeholder='Nhập mô tả sản phẩm'
          />
        </Form.Item>

        <Form.Item
          name='gia'
          label='Giá'
          rules={[
            { required: true, message: 'Vui lòng nhập giá' },
            { type: 'number', min: 0, message: 'Giá phải lớn hơn 0' }
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value!.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          name='soluong'
          label='Số lượng'
          rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalCreateProduct
```

### Bước 4: Tạo Modal Edit

```typescript
// src/components/layouts/Product/ModalEditProduct/ModalEditProduct.tsx
import React, { useEffect } from 'react'
import { Modal, Input, Form, InputNumber } from 'antd'
import type { Product, ProductFormValues, ModalEditProductState } from '../../../../types'

interface ModalEditProductProps {
  isModalOpenEdit: ModalEditProductState
  setIsModalOpenEdit: React.Dispatch<React.SetStateAction<ModalEditProductState>>
  onUpdate: (updated: Product) => void
}

const ModalEditProduct: React.FC<ModalEditProductProps> = ({
  isModalOpenEdit,
  setIsModalOpenEdit,
  onUpdate
}) => {
  const [form] = Form.useForm<ProductFormValues>()

  useEffect(() => {
    if (isModalOpenEdit.show && isModalOpenEdit.data && 'id' in isModalOpenEdit.data) {
      form.setFieldsValue({
        masp: isModalOpenEdit.data.masp,
        tensp: isModalOpenEdit.data.tensp,
        mota: isModalOpenEdit.data.mota,
        gia: isModalOpenEdit.data.gia,
        soluong: isModalOpenEdit.data.soluong,
      })
    }
  }, [isModalOpenEdit, form])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      if ('id' in isModalOpenEdit.data) {
        onUpdate({ ...isModalOpenEdit.data, ...values } as Product)
      }
      form.resetFields()
      setIsModalOpenEdit({ show: false, data: {} })
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpenEdit({ show: false, data: {} })
  }

  return (
    <Modal
      title='Chỉnh sửa sản phẩm'
      open={isModalOpenEdit.show}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Cập nhật'
      cancelText='Hủy'
    >
      <Form form={form} layout='vertical'>
        {/* Same form items as ModalCreateProduct */}
      </Form>
    </Modal>
  )
}

export default ModalEditProduct
```

### Bước 5: Tạo Main Component với Table

```typescript
// src/components/layouts/Product/Product.tsx
import React, { useEffect, useState, useCallback } from 'react'
import {
  Button,
  ConfigProvider,
  Input,
  Popconfirm,
  Table,
  Tooltip,
  message
} from 'antd'
import type { TablePaginationConfig } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  SyncOutlined,
  ExportOutlined,
} from '@ant-design/icons'
import ModalCreateProduct from './ModalCreateProduct/ModalCreateProduct'
import ModalEditProduct from './ModalEditProduct/ModalEditProduct'
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks'
import {
  getListProductAction,
  deleteProductAction,
} from '../../../redux/actions/productActions'
import { debounce } from 'lodash'
import * as XLSX from 'xlsx'
import type {
  Product,
  ProductFormValues,
  ModalEditProductState
} from '../../../types'

const PAGE_SIZE = 10

const Product: React.FC = () => {
  const dispatch = useAppDispatch()
  const stateProduct = useAppSelector((s) => s.Product)

  const [listProduct, setListProduct] = useState<Product[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenEdit, setIsModalOpenEdit] = useState<ModalEditProductState>({
    show: false,
    data: {},
  })
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: PAGE_SIZE,
  })
  const [loading, setLoading] = useState(false)

  // Fetch data on mount and when pagination/search changes
  useEffect(() => {
    dispatch(getListProductAction({
      keyword: search,
      pageNumber: pagination.current
    }))
  }, [dispatch, search, pagination.current])

  // Update local state when Redux state changes
  useEffect(() => {
    const payload = stateProduct?.list || []
    setListProduct(payload)
  }, [stateProduct])

  // Debounced search
  const debounceSearch = useCallback(
    debounce((keyword: string) => {
      setSearch(keyword)
      setPagination(prev => ({ ...prev, current: 1 }))
    }, 400),
    []
  )

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value)
  }

  const handleTableChange = (pg: TablePaginationConfig) => {
    const { current = 1 } = pg || {}
    setPagination(prev => ({ ...prev, current }))
  }

  const handleCreate = useCallback((values: ProductFormValues) => {
    // Dispatch create action
    console.log('Create:', values)
    message.success('Tạo sản phẩm thành công')
  }, [])

  const handleUpdate = useCallback((updated: Product) => {
    // Dispatch update action
    console.log('Update:', updated)
    message.success('Cập nhật sản phẩm thành công')
  }, [])

  const handleDelete = useCallback((id: number) => {
    dispatch(deleteProductAction(id, () => {
      message.success('Xóa sản phẩm thành công')
      dispatch(getListProductAction({
        keyword: search,
        pageNumber: pagination.current
      }))
    }))
  }, [dispatch, search, pagination.current])

  const handleEdit = useCallback((record: Product) => {
    setIsModalOpenEdit({ show: true, data: record })
  }, [])

  const exportToExcel = () => {
    const formatted = listProduct.map(item => ({
      'Mã SP': item.masp,
      'Tên SP': item.tensp,
      'Mô tả': item.mota,
      'Giá': item.gia,
      'Số lượng': item.soluong,
    }))
    const ws = XLSX.utils.json_to_sheet(formatted)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Products')
    XLSX.writeFile(wb, 'SanPham.xlsx')
  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      key: 'STT',
      width: 60,
      fixed: 'left' as const,
      align: 'center' as const,
      render: (_: any, __: any, index: number) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: 'Mã SP',
      dataIndex: 'masp',
      key: 'masp',
      width: 120
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'tensp',
      key: 'tensp',
      width: 250,
    },
    {
      title: 'Mô tả',
      dataIndex: 'mota',
      key: 'mota',
      width: 300
    },
    {
      title: 'Giá',
      dataIndex: 'gia',
      key: 'gia',
      width: 120,
      align: 'right' as const,
      render: (value: number) => value.toLocaleString('vi-VN')
    },
    {
      title: 'Số lượng',
      dataIndex: 'soluong',
      key: 'soluong',
      width: 100,
      align: 'center' as const,
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      fixed: 'right' as const,
      render: (_: any, record: Product) => (
        <ul className='flex justify-around m-0 p-0' style={{ listStyle: 'none' }}>
          <li>
            <Tooltip title='Sửa' color='blue'>
              <EditOutlined
                onClick={() => handleEdit(record)}
                className='text-xl text-blue-500 cursor-pointer'
              />
            </Tooltip>
          </li>
          <li>
            <Tooltip title='Xóa' color='red'>
              <Popconfirm
                title='Xóa sản phẩm'
                description='Bạn có chắc chắn muốn xóa sản phẩm này?'
                onConfirm={() => handleDelete(record.id)}
                okText='Xác nhận'
                cancelText='Hủy'
                icon={<DeleteOutlined style={{ color: 'red' }} />}
              >
                <DeleteOutlined className='text-xl text-red-500 cursor-pointer' />
              </Popconfirm>
            </Tooltip>
          </li>
        </ul>
      ),
    },
  ]

  return (
    <>
      <div className='p-5 bg-[#EFEFEF]'>
        <div className='p-2 bg-white rounded-xl border'>
          <div className='flex justify-between gap-2 mb-4'>
            <div className='w-80'>
              <Input
                allowClear
                className='w-full'
                placeholder='Tìm kiếm sản phẩm'
                onChange={handleSearchInput}
                prefix={<SearchOutlined />}
              />
            </div>
            <Button
              onClick={() => dispatch(getListProductAction({ keyword: '', pageNumber: 1 }))}
              type='primary'
              shape='circle'
              icon={<SyncOutlined />}
            />
            <Button
              disabled={!listProduct.length}
              onClick={exportToExcel}
              type='text'
              size='middle'
              className='text-green-700 ml-auto'
              icon={<ExportOutlined />}
            >
              Xuất Excel
            </Button>
            <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
            >
              Tạo sản phẩm
            </Button>
          </div>

          <ConfigProvider
            theme={{
              token: { padding: 5, borderRadius: 0 },
              components: {
                Table: {
                  rowHoverBg: '#ecf0f1',
                  headerBg: '#e6e6e6',
                  footerBg: '#e6e6e6',
                  borderColor: '#BABABA',
                },
              },
            }}
          >
            <Table
              bordered
              loading={loading}
              scroll={{ x: 'max-content', y: 500 }}
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: stateProduct?.totalCount || 0,
                showSizeChanger: false,
                showTotal: (total) => `Tổng ${total} bản ghi`,
              }}
              onChange={handleTableChange}
              columns={columns}
              dataSource={listProduct.map(item => ({
                key: item.id,
                ...item,
              }))}
            />
          </ConfigProvider>
        </div>
      </div>

      {isModalOpen && (
        <ModalCreateProduct
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onCreate={handleCreate}
        />
      )}

      {isModalOpenEdit.show && (
        <ModalEditProduct
          isModalOpenEdit={isModalOpenEdit}
          setIsModalOpenEdit={setIsModalOpenEdit}
          onUpdate={handleUpdate}
        />
      )}
    </>
  )
}

export default Product
```

---

## 🔌 Hướng dẫn tích hợp API

### Bước 1: Tạo Service Layer

```typescript
// src/redux/services/productServices.ts
import axiosInstance from '../../utils/axiosConfig'
import type { AxiosResponse } from 'axios'
import type { Product } from '../../types'

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

interface PagedResponse<T> {
  data: T[]
  totalCount: number
  totalPages: number
  pageNumber: number
}

export const productService = {
  // GET - List với phân trang
  getList: async (params: {
    keyword?: string
    pageNumber?: number
    pageSize?: number
  }): Promise<AxiosResponse<ApiResponse<PagedResponse<Product>>>> => {
    const { keyword = '', pageNumber = 1, pageSize = 10 } = params
    return axiosInstance.get('/Product/Search', {
      params: { keyword, pageNumber, pageSize },
    })
  },

  // GET - Chi tiết
  getById: async (id: number): Promise<AxiosResponse<ApiResponse<Product>>> => {
    return axiosInstance.get(`/Product/${id}`)
  },

  // POST - Tạo mới
  create: async (
    data: Omit<Product, 'id'>,
  ): Promise<AxiosResponse<ApiResponse<Product>>> => {
    return axiosInstance.post('/Product/Create', data)
  },

  // PUT - Cập nhật
  update: async (
    id: number,
    data: Partial<Product>,
  ): Promise<AxiosResponse<ApiResponse<Product>>> => {
    return axiosInstance.put(`/Product/${id}`, data)
  },

  // DELETE - Xóa
  delete: async (id: number): Promise<AxiosResponse<ApiResponse<void>>> => {
    return axiosInstance.delete(`/Product/${id}`)
  },

  // POST - Bulk operations
  bulkDelete: async (
    ids: number[],
  ): Promise<AxiosResponse<ApiResponse<void>>> => {
    return axiosInstance.post('/Product/BulkDelete', { ids })
  },
}
```

### Bước 2: Tạo Redux Actions

```typescript
// src/redux/constants/constants.ts
export const PRODUCT_FETCH_REQUEST = 'PRODUCT_FETCH_REQUEST'
export const PRODUCT_FETCH_SUCCESS = 'PRODUCT_FETCH_SUCCESS'
export const PRODUCT_FETCH_FAILURE = 'PRODUCT_FETCH_FAILURE'

export const PRODUCT_CREATE_REQUEST = 'PRODUCT_CREATE_REQUEST'
export const PRODUCT_CREATE_SUCCESS = 'PRODUCT_CREATE_SUCCESS'
export const PRODUCT_CREATE_FAILURE = 'PRODUCT_CREATE_FAILURE'

export const PRODUCT_UPDATE_REQUEST = 'PRODUCT_UPDATE_REQUEST'
export const PRODUCT_UPDATE_SUCCESS = 'PRODUCT_UPDATE_SUCCESS'
export const PRODUCT_UPDATE_FAILURE = 'PRODUCT_UPDATE_FAILURE'

export const PRODUCT_DELETE_REQUEST = 'PRODUCT_DELETE_REQUEST'
export const PRODUCT_DELETE_SUCCESS = 'PRODUCT_DELETE_SUCCESS'
export const PRODUCT_DELETE_FAILURE = 'PRODUCT_DELETE_FAILURE'

// src/redux/actions/productActions.ts
import * as types from '../constants/constants'
import type { Product } from '../../types'

export const getListProductAction = (payload: {
  keyword?: string
  pageNumber?: number
}) => ({
  type: types.PRODUCT_FETCH_REQUEST,
  payload,
})

export const getListProductSuccess = (
  data: Product[],
  meta: {
    totalCount: number
    totalPages: number
    pageNumber: number
  },
) => ({
  type: types.PRODUCT_FETCH_SUCCESS,
  payload: { data, meta },
})

export const getListProductFailure = (error: string) => ({
  type: types.PRODUCT_FETCH_FAILURE,
  payload: error,
})

export const createProductAction = (
  data: Omit<Product, 'id'>,
  callback?: () => void,
) => ({
  type: types.PRODUCT_CREATE_REQUEST,
  payload: data,
  callback,
})

export const updateProductAction = (
  id: number,
  data: Partial<Product>,
  callback?: () => void,
) => ({
  type: types.PRODUCT_UPDATE_REQUEST,
  payload: { id, data },
  callback,
})

export const deleteProductAction = (id: number, callback?: () => void) => ({
  type: types.PRODUCT_DELETE_REQUEST,
  payload: id,
  callback,
})
```

### Bước 3: Tạo Redux Saga

```typescript
// src/redux/sagas/productSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects'
import type { AxiosResponse } from 'axios'
import { message } from 'antd'
import * as types from '../constants/constants'
import { productService } from '../services/productServices'
import {
  getListProductSuccess,
  getListProductFailure,
} from '../actions/productActions'
import type { Product } from '../../types'

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

interface PagedResponse<T> {
  data: T[]
  totalCount: number
  totalPages: number
  pageNumber: number
}

// Fetch List Saga
function* fetchProductListSaga(
  action: ReturnType<
    typeof import('../actions/productActions').getListProductAction
  >,
) {
  try {
    const response: AxiosResponse<ApiResponse<PagedResponse<Product>>> =
      yield call(productService.getList, action.payload)

    if (response.data.success) {
      const { data, totalCount, totalPages, pageNumber } = response.data.data
      yield put(
        getListProductSuccess(data, { totalCount, totalPages, pageNumber }),
      )
    } else {
      yield put(getListProductFailure(response.data.message))
      message.error(response.data.message)
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || 'Lỗi khi tải danh sách'
    yield put(getListProductFailure(errorMessage))
    message.error(errorMessage)
  }
}

// Create Saga
function* createProductSaga(
  action: ReturnType<
    typeof import('../actions/productActions').createProductAction
  >,
) {
  try {
    const response: AxiosResponse<ApiResponse<Product>> = yield call(
      productService.create,
      action.payload,
    )

    if (response.data.success) {
      message.success('Tạo sản phẩm thành công')
      if (action.callback) {
        action.callback()
      }
      yield put({
        type: types.PRODUCT_CREATE_SUCCESS,
        payload: response.data.data,
      })
    } else {
      message.error(response.data.message)
      yield put({
        type: types.PRODUCT_CREATE_FAILURE,
        payload: response.data.message,
      })
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || 'Lỗi khi tạo sản phẩm'
    message.error(errorMessage)
    yield put({ type: types.PRODUCT_CREATE_FAILURE, payload: errorMessage })
  }
}

// Update Saga
function* updateProductSaga(
  action: ReturnType<
    typeof import('../actions/productActions').updateProductAction
  >,
) {
  try {
    const { id, data } = action.payload
    const response: AxiosResponse<ApiResponse<Product>> = yield call(
      productService.update,
      id,
      data,
    )

    if (response.data.success) {
      message.success('Cập nhật sản phẩm thành công')
      if (action.callback) {
        action.callback()
      }
      yield put({
        type: types.PRODUCT_UPDATE_SUCCESS,
        payload: response.data.data,
      })
    } else {
      message.error(response.data.message)
      yield put({
        type: types.PRODUCT_UPDATE_FAILURE,
        payload: response.data.message,
      })
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || 'Lỗi khi cập nhật sản phẩm'
    message.error(errorMessage)
    yield put({ type: types.PRODUCT_UPDATE_FAILURE, payload: errorMessage })
  }
}

// Delete Saga
function* deleteProductSaga(
  action: ReturnType<
    typeof import('../actions/productActions').deleteProductAction
  >,
) {
  try {
    const response: AxiosResponse<ApiResponse<void>> = yield call(
      productService.delete,
      action.payload,
    )

    if (response.data.success) {
      message.success('Xóa sản phẩm thành công')
      if (action.callback) {
        action.callback()
      }
      yield put({ type: types.PRODUCT_DELETE_SUCCESS, payload: action.payload })
    } else {
      message.error(response.data.message)
      yield put({
        type: types.PRODUCT_DELETE_FAILURE,
        payload: response.data.message,
      })
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || 'Lỗi khi xóa sản phẩm'
    message.error(errorMessage)
    yield put({ type: types.PRODUCT_DELETE_FAILURE, payload: errorMessage })
  }
}

// Watcher Saga
export default function* productSaga() {
  yield takeLatest(types.PRODUCT_FETCH_REQUEST, fetchProductListSaga)
  yield takeLatest(types.PRODUCT_CREATE_REQUEST, createProductSaga)
  yield takeLatest(types.PRODUCT_UPDATE_REQUEST, updateProductSaga)
  yield takeLatest(types.PRODUCT_DELETE_REQUEST, deleteProductSaga)
}
```

### Bước 4: Tạo Reducer

```typescript
// src/redux/reducers/productReducer.ts
import * as types from '../constants/constants'
import type { Product } from '../../types'

interface ProductState {
  list: Product[]
  loading: boolean
  error: string | null
  totalCount: number
  totalPages: number
  pageNumber: number
}

const initialState: ProductState = {
  list: [],
  loading: false,
  error: null,
  totalCount: 0,
  totalPages: 0,
  pageNumber: 1,
}

type ProductAction =
  | { type: typeof types.PRODUCT_FETCH_REQUEST }
  | {
      type: typeof types.PRODUCT_FETCH_SUCCESS
      payload: {
        data: Product[]
        meta: { totalCount: number; totalPages: number; pageNumber: number }
      }
    }
  | { type: typeof types.PRODUCT_FETCH_FAILURE; payload: string }
  | { type: typeof types.PRODUCT_CREATE_SUCCESS; payload: Product }
  | { type: typeof types.PRODUCT_UPDATE_SUCCESS; payload: Product }
  | { type: typeof types.PRODUCT_DELETE_SUCCESS; payload: number }

const productReducer = (
  state = initialState,
  action: ProductAction,
): ProductState => {
  switch (action.type) {
    case types.PRODUCT_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case types.PRODUCT_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.data,
        totalCount: action.payload.meta.totalCount,
        totalPages: action.payload.meta.totalPages,
        pageNumber: action.payload.meta.pageNumber,
      }

    case types.PRODUCT_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case types.PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        list: [action.payload, ...state.list],
        totalCount: state.totalCount + 1,
      }

    case types.PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),
      }

    case types.PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.payload),
        totalCount: Math.max(0, state.totalCount - 1),
      }

    default:
      return state
  }
}

export default productReducer
```

### Bước 5: Đăng ký trong Root Saga và Root Reducer

```typescript
// src/redux/sagas/rootSaga.ts
import { all } from 'redux-saga/effects'
import productSaga from './productSaga'
// ... other sagas

export default function* rootSaga() {
  yield all([
    productSaga(),
    // ... other sagas
  ])
}

// src/redux/reducers/rootReducer.ts
import { combineReducers } from 'redux'
import productReducer from './productReducer'
// ... other reducers

const rootReducer = combineReducers({
  Product: productReducer,
  // ... other reducers
})

export default rootReducer
```

---

## 🎯 Best Practices

### 1. Form Validation với Yup Schema

```typescript
// src/schemas/productSchemas.ts
import * as yup from 'yup'

export const productCreateSchema = yup.object().shape({
  masp: yup
    .string()
    .required('Mã sản phẩm là bắt buộc')
    .max(20, 'Mã sản phẩm tối đa 20 ký tự')
    .matches(/^[A-Z0-9]+$/, 'Mã sản phẩm chỉ chứa chữ in hoa và số'),

  tensp: yup
    .string()
    .required('Tên sản phẩm là bắt buộc')
    .min(3, 'Tên sản phẩm ít nhất 3 ký tự')
    .max(200, 'Tên sản phẩm tối đa 200 ký tự'),

  mota: yup.string().max(1000, 'Mô tả tối đa 1000 ký tự'),

  gia: yup
    .number()
    .required('Giá là bắt buộc')
    .min(0, 'Giá phải lớn hơn hoặc bằng 0')
    .max(999999999, 'Giá không hợp lệ'),

  soluong: yup
    .number()
    .required('Số lượng là bắt buộc')
    .integer('Số lượng phải là số nguyên')
    .min(0, 'Số lượng phải lớn hơn hoặc bằng 0'),
})

// Usage with Formik
import { useFormik } from 'formik'

const formik = useFormik({
  initialValues: {
    masp: '',
    tensp: '',
    mota: '',
    gia: 0,
    soluong: 0,
  },
  validationSchema: productCreateSchema,
  onSubmit: (values) => {
    onCreate(values)
  },
})
```

### 2. Custom Hooks

```typescript
// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react'

export const useDebounce = <T,>(value: T, delay: number = 400): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Usage
const Product = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 400)

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(searchAction(debouncedSearchTerm))
    }
  }, [debouncedSearchTerm])

  return (
    <Input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )
}
```

```typescript
// src/hooks/usePagination.ts
import { useState, useCallback } from 'react'

interface UsePaginationReturn {
  current: number
  pageSize: number
  total: number
  setTotal: (total: number) => void
  onChange: (page: number, pageSize?: number) => void
  reset: () => void
}

export const usePagination = (
  initialPageSize: number = 10
): UsePaginationReturn => {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [total, setTotal] = useState(0)

  const onChange = useCallback((page: number, size?: number) => {
    setCurrent(page)
    if (size) setPageSize(size)
  }, [])

  const reset = useCallback(() => {
    setCurrent(1)
    setTotal(0)
  }, [])

  return {
    current,
    pageSize,
    total,
    setTotal,
    onChange,
    reset,
  }
}

// Usage
const Product = () => {
  const pagination = usePagination(20)

  useEffect(() => {
    dispatch(fetchAction({ page: pagination.current }))
  }, [pagination.current])

  return (
    <Table
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        onChange: pagination.onChange,
      }}
    />
  )
}
```

### 3. Axios Interceptor cho Error Handling

```typescript
// src/utils/axiosConfig.ts
import axios from 'axios'
import { message } from 'antd'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response

      switch (status) {
        case 400:
          message.error(data.message || 'Dữ liệu không hợp lệ')
          break
        case 401:
          message.error('Phiên đăng nhập hết hạn')
          Cookies.remove('token')
          window.location.href = '/login'
          break
        case 403:
          message.error('Bạn không có quyền truy cập')
          break
        case 404:
          message.error('Không tìm thấy dữ liệu')
          break
        case 500:
          message.error('Lỗi máy chủ, vui lòng thử lại sau')
          break
        default:
          message.error(data.message || 'Có lỗi xảy ra')
      }
    } else if (error.request) {
      message.error('Không thể kết nối đến máy chủ')
    } else {
      message.error('Có lỗi xảy ra')
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
```

### 4. Environment Variables

```env
# .env.development
VITE_API_URL=http://localhost:5000/api
VITE_REDUX_DEVTOOLS=true

# .env.production
VITE_API_URL=https://api.production.com
VITE_REDUX_DEVTOOLS=false
```

---

## ✅ Code Review Checklist

### Component Level

- [ ] Component có type definitions đầy đủ
- [ ] Props được validate bằng TypeScript interface
- [ ] Sử dụng React.FC hoặc function component với proper types
- [ ] Không có `any` type trừ khi thực sự cần thiết
- [ ] useEffect có dependency array đúng
- [ ] Callback functions được wrap trong useCallback
- [ ] Expensive calculations được wrap trong useMemo
- [ ] Event handlers có type đúng (e.g., React.ChangeEvent<HTMLInputElement>)

### Redux Level

- [ ] Actions có type constants rõ ràng
- [ ] Saga functions có try-catch error handling
- [ ] API calls được wrap trong service layer
- [ ] Reducer immutable updates (không mutate state)
- [ ] Success/Failure actions được dispatch đúng
- [ ] Loading states được quản lý

### API Integration

- [ ] Service functions có proper return types
- [ ] API responses được type-check
- [ ] Error handling đầy đủ (try-catch, error messages)
- [ ] Loading states được quản lý
- [ ] Axios interceptors handle common errors

### Performance

- [ ] Debounce cho search inputs
- [ ] Pagination được implement đúng
- [ ] Large lists được virtualized (nếu cần)
- [ ] Images được lazy load
- [ ] Code splitting cho large components

### UI/UX

- [ ] Form validation messages rõ ràng
- [ ] Loading states hiển thị
- [ ] Error messages user-friendly
- [ ] Confirmation dialogs cho destructive actions
- [ ] Responsive design
- [ ] Accessibility (alt texts, aria-labels)

### Code Quality

- [ ] Naming conventions đúng
- [ ] Code được format (Prettier)
- [ ] Không có console.log trong production
- [ ] Comments cho complex logic
- [ ] No unused imports/variables
- [ ] Build không có warnings

---

## 📚 Additional Resources

### Thư viện quan trọng

- **Ant Design**: https://ant.design/
- **Redux Toolkit**: https://redux-toolkit.js.org/
- **React Router**: https://reactrouter.com/
- **Axios**: https://axios-http.com/
- **Lodash**: https://lodash.com/
- **Day.js**: https://day.js.org/
- **XLSX**: https://docs.sheetjs.com/

### TypeScript

- **TypeScript Handbook**: https://www.typescriptlang.org/docs/handbook/
- **React TypeScript Cheatsheet**: https://react-typescript-cheatsheet.netlify.app/

### Best Practices

- **React Beta Docs**: https://react.dev/
- **Airbnb React Style Guide**: https://github.com/airbnb/javascript/tree/master/react

---

**Lưu ý**: Tài liệu này nên được update thường xuyên khi có thay đổi về quy trình hoặc công nghệ.
