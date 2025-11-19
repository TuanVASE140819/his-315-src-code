import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  TextField,
  Autocomplete,
  Box,
  CircularProgress,
} from '@mui/material'
import { useAuth } from '@shared/hooks/useAuth'
import { usePaymentMethods, usePaymentForms } from '@shared/hooks'
import type { PhieuNhapKho } from '../types/phieuNhapKho'
import type { PaymentMethod } from '@shared/types/paymentMethod'
import type { PaymentForm } from '@shared/types/paymentForm'

interface NhapKhoHeaderProps {
  formData: Partial<PhieuNhapKho>
  onChange: (field: keyof PhieuNhapKho, value: any) => void
  nhanVienOptions?: Array<{ id: number; ten: string }>
  doiTacOptions?: Array<{ id: number; ten: string }>
  khoOptions?: Array<{ idkho: number; tenkho: string }>
  khoaPhongOptions?: Array<{ id: number; ten: string }>
  onSelectKhoaPhong?: (idKhoaPhong: number | null) => void
  readonly?: boolean
  onReset?: () => void
}

/**
 * Component Header Form nhỏ gọn - tối ưu cho màn hình nhỏ
 */
const NhapKhoHeader: React.FC<NhapKhoHeaderProps> = ({
  formData,
  onChange,
  nhanVienOptions = [],
  doiTacOptions = [],
  khoOptions = [],
  khoaPhongOptions = [],
  onSelectKhoaPhong,
  readonly = false,
}) => {
  const { user } = useAuth()
  const loggedInName =
    (user as any)?.data?.tenNhanVien ||
    (user as any)?.data?.tenNV ||
    (user as any)?.data?.taiKhoan ||
    ''

  const displayNguoiNhap =
    formData.tenNguoiNhap ||
    (formData.idNguoiNhap &&
      nhanVienOptions.find((nv) => nv.id === formData.idNguoiNhap)?.ten) ||
    loggedInName ||
    ''
  const { paymentMethods, loading: loadingPaymentMethods } = usePaymentMethods()
  const { paymentForms, loading: loadingPaymentForms } = usePaymentForms()

  // Generic compact autocomplete
  const A = <T,>(p: {
    label: string
    options: T[]
    getLabel: (o: T) => string
    value: any
    onChange: (v: T | string | null) => void
    freeSolo?: boolean
    required?: boolean
  }) => (
    <Autocomplete
      size='small'
      fullWidth
      options={p.options}
      freeSolo={p.freeSolo}
      getOptionLabel={(o: any) => (typeof o === 'string' ? o : p.getLabel(o))}
      value={p.value ?? null}
      onChange={(_, v) => p.onChange(v)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={p.label}
          margin='none'
          required={p.required}
          sx={commonInputSx}
        />
      )}
      sx={commonInputSx}
    />
  )

  // Compact styling - giảm height, padding, font
  const fieldHeight = 32
  const commonInputSx = {
    '& .MuiInputBase-root': {
      height: fieldHeight,
      minHeight: fieldHeight,
      backgroundColor: '#fff',
    },
    '& .MuiInputBase-input': {
      fontSize: 12,
      paddingTop: '4px',
      paddingBottom: '4px',
      paddingLeft: '8px',
      paddingRight: '8px',
    },
    '& .MuiAutocomplete-inputRoot': {
      padding: 0,
      '& .MuiInputBase-input': {
        paddingTop: '4px',
        paddingBottom: '4px',
      },
    },
    '& .MuiFormLabel-root': {
      fontSize: 12,
      transform: 'translate(8px, 6px) scale(1)',
      fontWeight: 500,
      color: '#64748b',
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(8px, -8px) scale(0.75)',
      backgroundColor: '#fff',
      padding: '0 3px',
      color: '#1976d2',
    },
    '& .MuiFormLabel-asterisk': { color: '#ef4444' },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e5e7eb',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1976d2',
    },
    '& .MuiCircularProgress-root': {
      width: 12,
      height: 12,
    },
  } as const

  // Compact layout - giảm gap
  const colGap = 1
  const rowGap = 0.75

  // Validation
  const khoError = !formData.idKho
  const doiTacError = !formData.idDoiTac
  const soHdError = !formData.soHoaDon || (formData.soHoaDon + '').trim() === ''

  const handlePartnerSelect = (v: any) => {
    if (!v || typeof v === 'string') {
      onChange('idDoiTac', undefined)
      if (typeof v === 'string') onChange('maDoiTac', v)
      onChange('diaChi', '')
      onChange('soThue', '')
      onChange('tenVietTat', '')
      return
    }
    onChange('idDoiTac', v.id)
    onChange('diaChi', v.diaChi ?? '')
    onChange('soThue', v.maSoThue ?? '')
    onChange('tenVietTat', v.tenVietTat ?? '')
    onChange('maDoiTac', v.ma ?? '')
  }

  const pad2 = (n: number) => String(n).padStart(2, '0')

  useEffect(() => {
    try {
      if (!formData.ngayNhap) {
        const d = new Date()
        const dateOnly = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
        onChange('ngayNhap', dateOnly)
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formatToDateOnly = (v?: string | null) => {
    if (!v) return ''
    if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v
    if (v.includes('T')) return v.split('T')[0]
    const d = new Date(v)
    if (isNaN(Number(d))) return ''
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
  }

  return (
    <Card
      elevation={0}
      sx={{
        mb: 1.5,
        borderRadius: 1.5,
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: rowGap }}>
          {/* Row 1 - 4 cột */}
          <Box
            sx={{
              display: 'grid',
              gap: colGap,
              gridTemplateColumns: 'repeat(4,1fr)',
            }}
          >
            <TextField
              size='small'
              label='Người nhập'
              value={displayNguoiNhap}
              onChange={(e) => onChange('tenNguoiNhap', e.target.value)}
              disabled={readonly}
              margin='none'
              sx={commonInputSx}
            />
            {A<{ id: number; ten: string }>({
              label: 'Nơi nhập',
              options: khoaPhongOptions,
              getLabel: (o) => o.ten,
              value:
                khoaPhongOptions.find((k) => k.ten === formData.noiNhap) ||
                null,
              onChange: (v) => {
                if (!v) {
                  onChange('noiNhap', '')
                  onChange('idKho', undefined)
                  onChange('idKhoKp', null)
                  onSelectKhoaPhong?.(null)
                  return
                }
                if (typeof v === 'string') {
                  onChange('noiNhap', v)
                  onChange('idKho', undefined)
                  onChange('idKhoKp', null)
                  onSelectKhoaPhong?.(null)
                  return
                }
                onChange('noiNhap', v.ten)
                onChange('idKho', undefined)
                onChange('idKhoKp', null)
                onSelectKhoaPhong?.(v.id ?? null)
              },
              freeSolo: true,
            })}
            <Autocomplete
              size='small'
              fullWidth
              options={khoOptions}
              getOptionLabel={(o: any) =>
                typeof o === 'string' ? o : o.tenkho
              }
              value={khoOptions.find((k) => k.idkho === formData.idKho) || null}
              onChange={(_, v) => {
                const obj = v as any
                onChange('idKho', obj?.idkho)
                onChange('idKhoKp', obj?.idkhokp ?? null)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Kho nhập *'
                  margin='none'
                  sx={commonInputSx}
                  error={khoError}
                />
              )}
              sx={commonInputSx}
            />
            <TextField
              size='small'
              label='Ngày nhập'
              type='date'
              value={formatToDateOnly(formData.ngayNhap)}
              onChange={(e) => onChange('ngayNhap', e.target.value)}
              InputLabelProps={{ shrink: true }}
              disabled={readonly}
              margin='none'
              sx={commonInputSx}
            />
          </Box>

          {/* Row 2 - 3 cột */}
          <Box
            sx={{
              display: 'grid',
              gap: colGap,
              gridTemplateColumns: 'repeat(3,1fr)',
            }}
          >
            <TextField
              size='small'
              label='Mã đối tác'
              value={formData.maDoiTac || ''}
              onChange={(e) => onChange('maDoiTac', e.target.value)}
              disabled={readonly}
              margin='none'
              sx={commonInputSx}
            />
            <TextField
              size='small'
              label='Số thuế'
              value={formData.soThue || ''}
              onChange={(e) => onChange('soThue', e.target.value)}
              disabled={readonly}
              margin='none'
              sx={commonInputSx}
            />
            <Box />
          </Box>

          {/* Row 3 - 3 cột */}
          <Box
            sx={{
              display: 'grid',
              gap: colGap,
              gridTemplateColumns: 'repeat(3,1fr)',
            }}
          >
            <Autocomplete
              size='small'
              fullWidth
              options={doiTacOptions}
              getOptionLabel={(o: any) => (typeof o === 'string' ? o : o.ten)}
              value={
                doiTacOptions.find((dt) => dt.id === formData.idDoiTac) || null
              }
              onChange={(_, v) => handlePartnerSelect(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Đối tác *'
                  margin='none'
                  sx={commonInputSx}
                  error={doiTacError}
                />
              )}
              sx={commonInputSx}
            />
            <TextField
              size='small'
              label='SĐT'
              value={formData.sdt || ''}
              onChange={(e) => onChange('sdt', e.target.value)}
              disabled={readonly}
              margin='none'
              sx={commonInputSx}
            />
            <TextField
              size='small'
              label='Email'
              type='email'
              value={formData.email || ''}
              onChange={(e) => onChange('email', e.target.value)}
              disabled={readonly}
              margin='none'
              sx={commonInputSx}
            />
          </Box>

          {/* Row 4 - 3 cột */}
          <Box
            sx={{
              display: 'grid',
              gap: colGap,
              gridTemplateColumns: 'repeat(3,1fr)',
            }}
          >
            <TextField
              size='small'
              label='Địa chỉ'
              value={formData.diaChi || ''}
              onChange={(e) => onChange('diaChi', e.target.value)}
              disabled={readonly}
              margin='none'
              sx={commonInputSx}
            />
            <Autocomplete<PaymentMethod, false, false, false>
              size='small'
              fullWidth
              options={paymentMethods}
              getOptionLabel={(o) => o.tenPhuongThuc}
              isOptionEqualToValue={(opt, val) =>
                opt.idPhuongThuc === val.idPhuongThuc
              }
              value={
                paymentMethods.find(
                  (m) => m.tenPhuongThuc === formData.phuongThuc,
                ) || null
              }
              onChange={(_, v) =>
                onChange('phuongThuc', v?.tenPhuongThuc || '')
              }
              loading={loadingPaymentMethods}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Phương thức'
                  margin='none'
                  sx={commonInputSx}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loadingPaymentMethods ? (
                          <CircularProgress color='inherit' size={12} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              sx={commonInputSx}
              disabled={readonly}
            />
            <Autocomplete<PaymentForm, false, false, false>
              size='small'
              fullWidth
              options={paymentForms}
              getOptionLabel={(o) => o.tenHinhThuc}
              isOptionEqualToValue={(opt, val) =>
                opt.idHinhThuc === val.idHinhThuc
              }
              value={
                paymentForms.find((f) => f.tenHinhThuc === formData.hinhThuc) ||
                null
              }
              onChange={(_, v) => onChange('hinhThuc', v?.tenHinhThuc || '')}
              loading={loadingPaymentForms}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Hình thức'
                  margin='none'
                  sx={commonInputSx}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loadingPaymentForms ? (
                          <CircularProgress color='inherit' size={12} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              sx={commonInputSx}
              disabled={readonly}
            />
          </Box>

          {/* Row 5 - 3 cột */}
          <Box
            sx={{
              display: 'grid',
              gap: colGap,
              gridTemplateColumns: 'repeat(3,1fr)',
            }}
          >
            <TextField
              size='small'
              label='Tên phiếu'
              value={formData.tenPhieu || ''}
              onChange={(e) => onChange('tenPhieu', e.target.value)}
              disabled={readonly}
              margin='none'
              sx={commonInputSx}
            />
            <TextField
              size='small'
              label='Số HĐ *'
              value={formData.soHoaDon || ''}
              onChange={(e) => onChange('soHoaDon', e.target.value)}
              disabled={readonly}
              margin='none'
              sx={commonInputSx}
              error={soHdError}
            />
            <TextField
              size='small'
              label='Ngày HĐ'
              type='date'
              value={formData.ngayHetHan?.split('T')[0] || ''}
              onChange={(e) => onChange('ngayHetHan', e.target.value)}
              InputLabelProps={{ shrink: true }}
              disabled={readonly}
              margin='none'
              sx={commonInputSx}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default NhapKhoHeader
