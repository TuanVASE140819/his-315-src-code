# Tab Management Features - Chrome-style

## 🎯 Tính năng đã thêm

### 1. **Click chuột giữa (Middle Click) để đóng tab**

- Click chuột giữa (scroll wheel) vào tab để đóng nhanh
- Chỉ hoạt động với tabs có thể đóng (closable)

### 2. **Menu chuột phải (Context Menu)**

Chuột phải vào tab để hiện menu với các options:

#### **Đóng tab**

- Đóng tab hiện tại
- Disabled nếu tab không thể đóng (như Home tab)

#### **Đóng các tab khác**

- Giữ lại tab hiện tại và Home tab
- Đóng tất cả tabs còn lại

#### **Đóng tab bên phải**

- Đóng tất cả tabs ở bên phải tab hiện tại
- Disabled nếu không có tab bên phải

#### **Đóng tất cả tab**

- Đóng hết tất cả tabs
- Quay về Home tab

---

## 🔧 Technical Implementation

### Files modified:

1. **`src/components/common/TabBar/index.tsx`**

   - Thêm Ant Design Dropdown cho context menu
   - Handle middle-click event
   - Menu items với conditional disable states

2. **`src/hooks/useTabManager.ts`**

   - Thêm function `closeRightTabs(tabKey)`
   - Logic đóng tabs bên phải

3. **`src/layout/RootLayout/index.tsx`**
   - Pass callbacks: `onCloseOthers`, `onCloseAll`, `onCloseRight`

---

## 🎨 UX Details

### Middle Click

```typescript
onMouseDown={(e) => {
  if (e.button === 1 && tab.closable !== false) {
    e.preventDefault()
    onTabClose(tab.key)
  }
}}
```

### Context Menu Items

```typescript
;[
  { label: 'Đóng tab', disabled: !isClosable },
  { label: 'Đóng các tab khác', disabled: !hasOtherTabs },
  { label: 'Đóng tab bên phải', disabled: !hasRightTabs },
  { divider },
  { label: 'Đóng tất cả tab' },
]
```

---

## ✅ Behavior

- **Home tab** không thể đóng (closable: false)
- Khi đóng active tab → tự động switch sang tab kế bên
- Khi đóng tab bên phải → giữ nguyên active tab nếu không bị đóng
- Menu options tự động disable khi không áp dụng được

---

## 🚀 Usage

### Keyboard shortcuts (có thể thêm sau):

- `Ctrl + W` - Đóng tab hiện tại
- `Ctrl + Shift + T` - Mở lại tab vừa đóng
- `Ctrl + Tab` - Chuyển tab tiếp theo
- `Ctrl + Shift + Tab` - Chuyển tab trước

### Mouse actions:

- **Left click** - Chuyển tab
- **Middle click** - Đóng tab
- **Right click** - Menu options
- **Click X button** - Đóng tab
