// Customer Types
export interface Customer {
  id: number
  email: string
  username: string
  fullName: string
  phoneNumber?: string
  balance: number
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

export interface CustomerSearchParams {
  keyword?: string
  pageNumber?: number
  pageSize?: number
}

export interface Transaction {
  id: number
  userId: number
  username?: string
  transactionType: TransactionType
  amount: number
  balanceBefore: number
  balanceAfter: number
  description?: string
  createdAt: string
}

export enum TransactionType {
  Deposit = 'Deposit',
  Withdraw = 'Withdraw',
  Bet = 'Bet',
  Win = 'Win',
  Refund = 'Refund',
}

export interface TransactionSearchParams {
  userId?: number
  transactionType?: number | string
  fromDate?: string
  toDate?: string
  pageNumber?: number
  pageSize?: number
}

export interface TransactionTypeOption {
  id: number
  name: string
  value: string
}
