/**
 * Type guard for axios errors
 */
export function isAxiosError(
  error: any,
): error is { response: { data: { message?: string } } } {
  return error && error.response && error.response.data
}

/**
 * Extract error message from various error types
 */
export function getErrorMessage(
  error: unknown,
  defaultMessage = 'Đã xảy ra lỗi',
): string {
  if (isAxiosError(error)) {
    return error.response?.data?.message || defaultMessage
  }

  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  return defaultMessage
}

/**
 * Safe localStorage operations with error handling
 */
export const safeLocalStorage = {
  getItem: (key: string, defaultValue: any = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return defaultValue
    }
  },

  setItem: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  },

  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  },

  clear: () => {
    try {
      localStorage.clear()
    } catch (error) {
      console.warn('Error clearing localStorage:', error)
    }
  },
}
