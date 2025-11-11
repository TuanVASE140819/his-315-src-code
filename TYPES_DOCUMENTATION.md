# TypeScript Types Structure Documentation

## Tổng quan

Project đã được tổ chức lại với cấu trúc types rõ ràng và dễ maintain. Tất cả types được tập trung trong thư mục `src/types/`.

## Cấu trúc thư mục Types

```
src/types/
├── index.ts                 # Export tất cả types
├── api.types.ts            # API response/request types
├── common.types.ts         # Utility types và common types
├── redux.types.ts          # Redux action và state types
├── user.types.ts           # User & Authentication types
├── category.types.ts       # Category types
├── team.types.ts           # Team types
├── league.types.ts         # League types
├── game.types.ts           # Game types
├── customer.types.ts       # Customer & Transaction types
├── route.ts                # Route configuration types
└── modules.d.ts            # Module declarations
```

## Chi tiết các Types

### 1. API Types (`api.types.ts`)

Định nghĩa các types chung cho API requests/responses:

```typescript
import { ApiResponse, PaginatedResponse } from '@/types'

// Generic API response
const response: ApiResponse<User> = {
  data: userData,
  message: 'Success',
  success: true
}

// Paginated response
const listResponse: PaginatedResponse<Team> = {
  data: [...],
  pageNumber: 1,
  pageSize: 10,
  totalPages: 5,
  totalCount: 50
}
```

### 2. Common Types (`common.types.ts`)

Utility types và helper types:

```typescript
import { Nullable, Optional, VoidCallback, ID } from '@/types'

// Nullable type
const user: Nullable<User> = null

// Callback types
const handleSave: VoidCallback = () => console.log('saved')
const handleUpdate: Callback<number> = (id) => console.log(id)

// ID type (union of number | string)
const userId: ID = 123
```

### 3. Redux Types (`redux.types.ts`)

State và Action types cho Redux:

```typescript
import { RootState, UserState, CommonState } from '@/types'

// Use in components
const user = useSelector((state: RootState) => state.User.infoUser)

// Use in actions
import { LoginAction, LogoutAction } from '@/types'

const action: LoginAction = {
  type: 'LOGIN',
  payload: { userName: 'admin', password: '123' },
  navigate: navigateFunction,
}
```

### 4. Entity Types

#### User Types (`user.types.ts`)

```typescript
import { User, LoginCredentials, ChangePasswordPayload } from '@/types'

const user: User = {
  id: 1,
  email: 'admin@example.com',
  username: 'admin',
  fullName: 'Admin User',
  isAdmin: true,
  role: 'Administrator',
}

const credentials: LoginCredentials = {
  userName: 'admin',
  password: 'password123',
}
```

#### Category Types (`category.types.ts`)

```typescript
import { Category, CreateCategoryPayload, UpdateCategoryPayload } from '@/types'

const category: Category = {
  id: 1,
  name: 'Football',
  isActive: true,
}

const createPayload: CreateCategoryPayload = {
  name: 'Basketball',
}
```

#### Team Types (`team.types.ts`)

```typescript
import { Team, CreateTeamPayload } from '@/types'

const team: Team = {
  id: 1,
  name: 'Manchester United',
  categoryId: 1,
  categoryName: 'Football',
  isActive: true,
}
```

#### Game Types (`game.types.ts`)

```typescript
import { Game, GameStatus, CreateGamePayload } from '@/types'

const game: Game = {
  id: 1,
  leagueId: 1,
  homeTeamId: 1,
  awayTeamId: 2,
  startTime: '2025-11-10T10:00:00',
  status: GameStatus.Scheduled,
  isActive: true,
}
```

## Sử dụng Types trong Components

### 1. Import types

```typescript
import { User, Category, Team } from '@/types'
// hoặc
import { User } from '@/types/user.types'
```

### 2. Trong React Components

```typescript
import React, { FC } from 'react'
import { User } from '@/types'

interface Props {
  user: User
  onUpdate: (user: User) => void
}

const UserCard: FC<Props> = ({ user, onUpdate }) => {
  return <div>{user.fullName}</div>
}
```

### 3. Trong Redux Actions

```typescript
import { postInfoCategoryAction } from '@/redux/actions/categoryActions'
import { CreateCategoryPayload } from '@/types'

const payload: CreateCategoryPayload = {
  name: 'New Category',
}

dispatch(postInfoCategoryAction(payload, handleReload))
```

### 4. Trong Services

```typescript
import { userServices } from '@/redux/services/userServices'
import { LoginCredentials } from '@/types'

const credentials: LoginCredentials = {
  userName: 'admin',
  password: 'password',
}

const response = await userServices.login(credentials)
// response type is AxiosResponse<AuthResponse>
```

## Best Practices

### 1. Luôn import types từ index

```typescript
// ✅ Good
import { User, Category, Team } from '@/types'

// ❌ Avoid (unless specific reason)
import { User } from '@/types/user.types'
import { Category } from '@/types/category.types'
```

### 2. Sử dụng type inference khi có thể

```typescript
// ✅ Good - type được infer từ function return type
const user = await userServices.getInfoUser()

// ⚠️ OK nhưng không cần thiết
const user: User = await userServices.getInfoUser()
```

### 3. Tránh dùng `any`, sử dụng `unknown` nếu cần

```typescript
// ❌ Bad
const data: any = response.data

// ✅ Good
const data: unknown = response.data
if (isUser(data)) {
  // type guard
  const user: User = data
}
```

### 4. Tạo specific types cho component props

```typescript
// ✅ Good
interface UserListProps {
  users: User[]
  onSelect: (user: User) => void
  loading?: boolean
}

const UserList: FC<UserListProps> = ({ users, onSelect, loading }) => {
  // ...
}
```

## Type Guards (Nâng cao)

Tạo type guards để kiểm tra types runtime:

```typescript
// src/types/guards.ts
import { User, Category } from '@/types'

export function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' && obj !== null && 'id' in obj && 'username' in obj
  )
}

export function isCategory(obj: unknown): obj is Category {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'isActive' in obj
  )
}

// Usage
const data: unknown = response.data
if (isUser(data)) {
  console.log(data.username) // TypeScript knows data is User
}
```

## Extending Types

Khi cần mở rộng types:

```typescript
// Tạo file mới: src/types/extended.types.ts
import { User } from './user.types'

export interface AdminUser extends User {
  permissions: string[]
  lastLoginAt: string
}

export interface UserWithStats extends User {
  totalBets: number
  totalWins: number
  winRate: number
}
```

## Migration từ JavaScript

Các files đã được migrate:

- ✅ All Redux actions
- ✅ All Redux reducers
- ✅ All Redux services
- ✅ All Redux sagas
- ✅ Main entry files

Đang trong quá trình:

- 🔄 React components
- 🔄 Utility functions
- 🔄 Hooks

## Troubleshooting

### Lỗi: Cannot find module '@/types'

```typescript
// Đảm bảo đã import đúng path
import { User } from '@/types'
// hoặc
import { User } from '../../types'
```

### Lỗi: Type 'X' is not assignable to type 'Y'

```typescript
// Sử dụng type assertion nếu bạn chắc chắn
const user = data as User

// Hoặc sử dụng type guard
if (isUser(data)) {
  const user: User = data
}
```

## Tài liệu tham khảo

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Redux TypeScript Guide](https://redux.js.org/usage/usage-with-typescript)
