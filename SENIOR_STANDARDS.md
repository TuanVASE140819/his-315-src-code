# 🎯 Senior Developer Standards & Code Guidelines

## 📌 Tổng quan

Tài liệu này định nghĩa các chuẩn mực code cho Senior Developer trong dự án Frontend HIS Phusan315v2. Tuân thủ các quy tắc này để đảm bảo code quality, maintainability và team collaboration.

---

## 🏆 Senior Developer Mindset

### 1. Think Before You Code

- ✅ Hiểu rõ yêu cầu trước khi code
- ✅ Design solution trước khi implement
- ✅ Consider edge cases và error scenarios
- ✅ Think about scalability và performance
- ✅ Review existing code patterns trước khi tạo mới

### 2. Code for Others

- ✅ Code phải self-documenting
- ✅ Naming phải clear và meaningful
- ✅ Comments cho WHY, không phải WHAT
- ✅ Consistent với existing codebase
- ✅ Easy to test và maintain

### 3. Continuous Improvement

- ✅ Refactor legacy code khi touch vào
- ✅ Suggest better patterns
- ✅ Share knowledge với team
- ✅ Review code của others constructively
- ✅ Stay updated với best practices

---

## 📐 Architectural Principles

### 1. Separation of Concerns

```typescript
// ❌ BAD: Mixing concerns
const UserComponent = () => {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const response = await axios.get('http://api.com/users')
    setUsers(response.data)
  }

  return <div>{users.map(u => <div>{u.name}</div>)}</div>
}

// ✅ GOOD: Separated concerns
// Service layer
const userService = {
  getUsers: () => axiosInstance.get('/users')
}

// Redux saga
function* fetchUsersSaga() {
  const response = yield call(userService.getUsers)
  yield put(fetchUsersSuccess(response.data))
}

// Component
const UserComponent = () => {
  const users = useAppSelector(state => state.users.list)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsersAction())
  }, [dispatch])

  return <UserList users={users} />
}
```

### 2. Single Responsibility Principle

```typescript
// ❌ BAD: Component doing too much
const UserManagement = () => {
  // State management
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('')
  const [pagination, setPagination] = useState({})

  // API calls
  const fetchUsers = async () => { /* ... */ }
  const deleteUser = async () => { /* ... */ }
  const updateUser = async () => { /* ... */ }

  // Business logic
  const calculateUserStats = () => { /* ... */ }
  const validateUser = () => { /* ... */ }

  // UI rendering
  return (
    <div>
      <UserTable />
      <UserForm />
      <UserStats />
      <UserFilters />
    </div>
  )
}

// ✅ GOOD: Split responsibilities
const UserManagement = () => {
  return (
    <div>
      <UserFilters />
      <UserTable />
    </div>
  )
}

const UserTable = () => {
  const users = useUsers() // Custom hook
  const { handleEdit, handleDelete } = useUserActions()

  return <Table data={users} onEdit={handleEdit} onDelete={handleDelete} />
}

const UserFilters = () => {
  const { filter, setFilter } = useUserFilter()
  return <FilterPanel filter={filter} onChange={setFilter} />
}
```

### 3. DRY (Don't Repeat Yourself)

```typescript
// ❌ BAD: Repeated code
const ProductList = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await api.getProducts()
      setData(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  return <div>{/* ... */}</div>
}

const UserList = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await api.getUsers()
      setData(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  return <div>{/* ... */}</div>
}

// ✅ GOOD: Reusable custom hook
const useApiData = <T,>(apiCall: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiCall()
      setData(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [apiCall])

  useEffect(() => { fetchData() }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

// Usage
const ProductList = () => {
  const { data, loading, error } = useApiData(api.getProducts)

  if (loading) return <Spin />
  if (error) return <Alert type="error" message={error} />

  return <div>{/* ... */}</div>
}

const UserList = () => {
  const { data, loading, error } = useApiData(api.getUsers)

  if (loading) return <Spin />
  if (error) return <Alert type="error" message={error} />

  return <div>{/* ... */}</div>
}
```

---

## 🎨 Component Design Patterns

### 1. Container/Presentational Pattern

```typescript
// Presentational Component (UI only)
interface UserListProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (id: number) => void
  loading?: boolean
}

const UserListView: React.FC<UserListProps> = ({
  users,
  onEdit,
  onDelete,
  loading
}) => {
  if (loading) return <Spin />

  return (
    <Table
      dataSource={users}
      columns={[
        { title: 'Name', dataIndex: 'name' },
        {
          title: 'Actions',
          render: (_, record) => (
            <>
              <Button onClick={() => onEdit(record)}>Edit</Button>
              <Button onClick={() => onDelete(record.id)}>Delete</Button>
            </>
          )
        }
      ]}
    />
  )
}

// Container Component (Logic)
const UserListContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const { users, loading } = useAppSelector(state => state.users)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    dispatch(fetchUsersAction())
  }, [dispatch])

  const handleEdit = useCallback((user: User) => {
    setSelectedUser(user)
    setEditModalOpen(true)
  }, [])

  const handleDelete = useCallback((id: number) => {
    dispatch(deleteUserAction(id))
  }, [dispatch])

  return (
    <>
      <UserListView
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />
      {editModalOpen && (
        <UserEditModal
          user={selectedUser}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </>
  )
}

export default UserListContainer
```

### 2. Compound Component Pattern

```typescript
// ✅ GOOD: Flexible, composable
interface TabsContextValue {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined)

const Tabs: React.FC<{ defaultTab: string; children: React.ReactNode }> & {
  List: typeof TabsList
  Tab: typeof Tab
  Panel: typeof TabPanel
} = ({ defaultTab, children }) => {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  )
}

const TabsList: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="tabs-list">{children}</div>
)

const Tab: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error('Tab must be used within Tabs')

  return (
    <button
      className={context.activeTab === value ? 'active' : ''}
      onClick={() => context.setActiveTab(value)}
    >
      {children}
    </button>
  )
}

const TabPanel: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error('TabPanel must be used within Tabs')

  return context.activeTab === value ? <div>{children}</div> : null
}

Tabs.List = TabsList
Tabs.Tab = Tab
Tabs.Panel = TabPanel

// Usage
const MyComponent = () => (
  <Tabs defaultTab="users">
    <Tabs.List>
      <Tabs.Tab value="users">Users</Tabs.Tab>
      <Tabs.Tab value="products">Products</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="users">
      <UserList />
    </Tabs.Panel>
    <Tabs.Panel value="products">
      <ProductList />
    </Tabs.Panel>
  </Tabs>
)
```

### 3. Render Props Pattern

```typescript
interface DataFetcherProps<T> {
  url: string
  children: (data: {
    data: T | null
    loading: boolean
    error: string | null
    refetch: () => void
  }) => React.ReactNode
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const json = await response.json()
      setData(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error')
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => { fetchData() }, [fetchData])

  return <>{children({ data, loading, error, refetch: fetchData })}</>
}

// Usage
const UserComponent = () => (
  <DataFetcher<User[]> url="/api/users">
    {({ data, loading, error, refetch }) => {
      if (loading) return <Spin />
      if (error) return <Alert type="error" message={error} />
      if (!data) return null

      return (
        <>
          <Button onClick={refetch}>Refresh</Button>
          <UserList users={data} />
        </>
      )
    }}
  </DataFetcher>
)
```

---

## 🔧 Advanced TypeScript Patterns

### 1. Generic Components

```typescript
// Generic Table Component
interface Column<T> {
  key: keyof T | string
  title: string
  render?: (value: any, record: T, index: number) => React.ReactNode
  width?: number
  align?: 'left' | 'center' | 'right'
}

interface GenericTableProps<T> {
  data: T[]
  columns: Column<T>[]
  rowKey: keyof T
  loading?: boolean
  pagination?: {
    current: number
    pageSize: number
    total: number
    onChange: (page: number) => void
  }
  onRowClick?: (record: T) => void
}

function GenericTable<T extends Record<string, any>>({
  data,
  columns,
  rowKey,
  loading,
  pagination,
  onRowClick,
}: GenericTableProps<T>) {
  return (
    <Table
      dataSource={data}
      columns={columns.map(col => ({
        key: String(col.key),
        title: col.title,
        dataIndex: col.key,
        render: col.render,
        width: col.width,
        align: col.align,
      }))}
      rowKey={(record) => String(record[rowKey])}
      loading={loading}
      pagination={pagination}
      onRow={(record) => ({
        onClick: () => onRowClick?.(record),
      })}
    />
  )
}

// Usage with type safety
interface User {
  id: number
  name: string
  email: string
  age: number
}

const UserTable = () => {
  const users: User[] = [/* ... */]

  return (
    <GenericTable<User>
      data={users}
      rowKey="id"
      columns={[
        { key: 'name', title: 'Name' },
        { key: 'email', title: 'Email' },
        {
          key: 'age',
          title: 'Age',
          render: (age: number) => `${age} years old`
        },
      ]}
      onRowClick={(user) => console.log(user.name)} // Type-safe!
    />
  )
}
```

### 2. Discriminated Unions

```typescript
// API Response Types
type ApiSuccess<T> = {
  status: 'success'
  data: T
}

type ApiError = {
  status: 'error'
  error: string
  code: number
}

type ApiLoading = {
  status: 'loading'
}

type ApiResponse<T> = ApiSuccess<T> | ApiError | ApiLoading

// Usage with type narrowing
const UserComponent = () => {
  const [response, setResponse] = useState<ApiResponse<User[]>>({
    status: 'loading'
  })

  const renderContent = () => {
    switch (response.status) {
      case 'loading':
        return <Spin />

      case 'error':
        // TypeScript knows response.error exists
        return <Alert type="error" message={response.error} />

      case 'success':
        // TypeScript knows response.data exists
        return <UserList users={response.data} />
    }
  }

  return <div>{renderContent()}</div>
}
```

### 3. Utility Types

```typescript
// Make all properties optional recursively
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Pick specific properties and make them required
type RequiredPick<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>

// Example usage
interface User {
  id: number
  name: string
  email: string
  profile?: {
    avatar?: string
    bio?: string
  }
}

// All fields optional including nested
type PartialUser = DeepPartial<User>

// Name and email required, others optional
type UserForm = RequiredPick<User, 'name' | 'email'>

// Omit sensitive fields
type PublicUser = Omit<User, 'email'>

// Pick only display fields
type UserDisplay = Pick<User, 'id' | 'name'>

// Create update type (all optional except id)
type UserUpdate = RequiredPick<Partial<User>, 'id'>
```

---

## 🚀 Performance Optimization

### 1. Memoization Strategy

```typescript
// ❌ BAD: Re-creating objects/functions on every render
const UserComponent = () => {
  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
  ]

  const handleEdit = (user: User) => {
    dispatch(editUserAction(user))
  }

  return <Table columns={columns} onEdit={handleEdit} />
}

// ✅ GOOD: Memoized properly
const COLUMNS = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Email', dataIndex: 'email' },
] as const

const UserComponent = () => {
  const dispatch = useAppDispatch()

  const handleEdit = useCallback((user: User) => {
    dispatch(editUserAction(user))
  }, [dispatch])

  return <Table columns={COLUMNS} onEdit={handleEdit} />
}
```

### 2. Code Splitting

```typescript
// Route-based code splitting
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const UserManagement = lazy(() => import('./pages/UserManagement'))
const ProductManagement = lazy(() => import('./pages/ProductManagement'))

const App = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/products" element={<ProductManagement />} />
    </Routes>
  </Suspense>
)

// Component-based code splitting
const HeavyChart = lazy(() => import('./components/HeavyChart'))

const DashboardPage = () => {
  const [showChart, setShowChart] = useState(false)

  return (
    <div>
      <Button onClick={() => setShowChart(true)}>Show Chart</Button>
      {showChart && (
        <Suspense fallback={<Spin />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  )
}
```

### 3. Virtual Scrolling for Large Lists

```typescript
import { FixedSizeList } from 'react-window'

interface VirtualListProps<T> {
  items: T[]
  itemHeight: number
  renderItem: (item: T, index: number) => React.ReactNode
}

function VirtualList<T>({ items, itemHeight, renderItem }: VirtualListProps<T>) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={itemHeight}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          {renderItem(items[index], index)}
        </div>
      )}
    </FixedSizeList>
  )
}

// Usage
const UserList = () => {
  const users = useAppSelector(state => state.users.list) // 10,000 items

  return (
    <VirtualList
      items={users}
      itemHeight={50}
      renderItem={(user, index) => (
        <div>
          {index + 1}. {user.name} - {user.email}
        </div>
      )}
    />
  )
}
```

---

## 🧪 Testing Standards

### 1. Component Testing

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import UserForm from './UserForm'

describe('UserForm', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    return render(
      <Provider store={store}>
        {component}
      </Provider>
    )
  }

  it('should render form fields', () => {
    renderWithProvider(<UserForm />)

    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('should show validation errors', async () => {
    const user = userEvent.setup()
    renderWithProvider(<UserForm />)

    const submitButton = screen.getByRole('button', { name: 'Submit' })
    await user.click(submitButton)

    expect(await screen.findByText('Name is required')).toBeInTheDocument()
  })

  it('should submit form with valid data', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn()
    renderWithProvider(<UserForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Name'), 'John Doe')
    await user.type(screen.getByLabelText('Email'), 'john@example.com')
    await user.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com'
      })
    })
  })
})
```

### 2. Redux Testing

```typescript
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import { fetchUsersSaga } from './userSaga'
import { userService } from '../services/userService'
import { fetchUsersSuccess, fetchUsersFailure } from '../actions/userActions'

describe('fetchUsersSaga', () => {
  it('should fetch users successfully', () => {
    const mockUsers = [{ id: 1, name: 'John' }]

    return expectSaga(fetchUsersSaga, { type: 'FETCH_USERS', payload: {} })
      .provide([[matchers.call.fn(userService.getList), { data: mockUsers }]])
      .put(fetchUsersSuccess(mockUsers))
      .run()
  })

  it('should handle errors', () => {
    const error = new Error('API Error')

    return expectSaga(fetchUsersSaga, { type: 'FETCH_USERS', payload: {} })
      .provide([[matchers.call.fn(userService.getList), throwError(error)]])
      .put(fetchUsersFailure('API Error'))
      .run()
  })
})
```

---

## 📝 Documentation Standards

### 1. Function Documentation

````typescript
/**
 * Calculates the total price after applying discount and tax
 *
 * @param price - The original price in VND
 * @param discount - Discount percentage (0-100)
 * @param taxRate - Tax rate percentage (0-100)
 * @returns The final price after discount and tax
 *
 * @example
 * ```typescript
 * calculateTotal(100000, 10, 8)
 * // Returns: 97200 (100000 - 10% + 8% tax)
 * ```
 *
 * @throws {Error} If discount or taxRate is out of range
 */
export const calculateTotal = (
  price: number,
  discount: number,
  taxRate: number,
): number => {
  if (discount < 0 || discount > 100) {
    throw new Error('Discount must be between 0 and 100')
  }
  if (taxRate < 0 || taxRate > 100) {
    throw new Error('Tax rate must be between 0 and 100')
  }

  const discountedPrice = price * (1 - discount / 100)
  return discountedPrice * (1 + taxRate / 100)
}
````

### 2. Component Documentation

````typescript
/**
 * A reusable data table component with sorting, filtering, and pagination
 *
 * @component
 * @example
 * ```tsx
 * <DataTable
 *   data={users}
 *   columns={[
 *     { key: 'name', title: 'Name', sortable: true },
 *     { key: 'email', title: 'Email' }
 *   ]}
 *   onRowClick={(user) => navigate(`/users/${user.id}`)}
 * />
 * ```
 */
interface DataTableProps<T> {
  /** Array of data to display */
  data: T[]
  /** Column definitions */
  columns: Column<T>[]
  /** Callback when a row is clicked */
  onRowClick?: (record: T) => void
  /** Show loading spinner */
  loading?: boolean
}

export function DataTable<T>({
  data,
  columns,
  onRowClick,
  loading,
}: DataTableProps<T>) {
  // Implementation
}
````

---

## 🔍 Code Review Guidelines

### What to Look For

1. **Architecture**

   - [ ] Follows established patterns
   - [ ] Proper separation of concerns
   - [ ] No circular dependencies
   - [ ] Scalable design

2. **Type Safety**

   - [ ] No `any` types (unless justified)
   - [ ] Proper interface/type definitions
   - [ ] Type guards where needed
   - [ ] Generic types used correctly

3. **Performance**

   - [ ] No unnecessary re-renders
   - [ ] Proper memoization
   - [ ] Efficient algorithms
   - [ ] No memory leaks

4. **Error Handling**

   - [ ] Try-catch blocks
   - [ ] User-friendly error messages
   - [ ] Logging for debugging
   - [ ] Fallback UI for errors

5. **Testing**

   - [ ] Unit tests for utilities
   - [ ] Component tests
   - [ ] Integration tests for flows
   - [ ] Edge cases covered

6. **Security**
   - [ ] No sensitive data in code
   - [ ] XSS prevention
   - [ ] Input validation
   - [ ] Proper authentication checks

---

## 📊 Metrics & KPIs

### Code Quality Metrics

- **TypeScript Coverage**: > 95%
- **Test Coverage**: > 80%
- **Bundle Size**: < 2MB (production)
- **Build Time**: < 2 minutes
- **Zero ESLint errors**
- **Zero TypeScript errors**

### Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: > 90
- **API Response Time**: < 500ms

---

## 🎓 Learning Resources

### Must-Read

- Clean Code (Robert C. Martin)
- Refactoring (Martin Fowler)
- Design Patterns (Gang of Four)

### TypeScript

- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Effective TypeScript](https://effectivetypescript.com/)

### React

- [React Beta Docs](https://react.dev/)
- [Patterns.dev](https://patterns.dev/)

### Testing

- [Testing Library Docs](https://testing-library.com/)
- [Jest Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

**Remember**: Senior code is not about writing clever code, it's about writing code that others can easily understand and maintain. 🚀
