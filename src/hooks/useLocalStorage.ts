import { useState, useCallback } from 'react'

/**
 * Custom hook for managing localStorage with type safety and error handling
 * @param key - localStorage key
 * @param initialValue - default value if no stored value exists
 * @returns [storedValue, setValue, removeValue]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value

        setStoredValue(valueToStore)

        // Save to localStorage
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue],
  )

  // Function to remove the value from localStorage
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}

/**
 * Batch update multiple localStorage keys
 * @param updates - object with key-value pairs to update
 */
export function batchUpdateLocalStorage(updates: Record<string, any>): void {
  try {
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        window.localStorage.removeItem(key)
      } else {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
    })
  } catch (error) {
    console.warn('Error in batch localStorage update:', error)
  }
}

/**
 * Batch remove multiple localStorage keys
 * @param keys - array of keys to remove
 */
export function batchRemoveLocalStorage(keys: string[]): void {
  try {
    keys.forEach((key) => {
      window.localStorage.removeItem(key)
    })
  } catch (error) {
    console.warn('Error in batch localStorage removal:', error)
  }
}
