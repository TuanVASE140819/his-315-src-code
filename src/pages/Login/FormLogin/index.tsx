import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Button, Input, Select } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { loginSchema } from '../../../schemas/userSchemas'
import {
  loginUser,
  getCompaniesForUser,
  getDepartmentsForUser,
} from '../../../redux/actions/userActions'
import { RootState } from '../../../types'

function FormLogin() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // Company is fixed to 1 for this deployment; remove UI selection.
  const [company] = useState<any>(1)
  const [department, setDepartment] = useState<any>(null)

  const departments = useAppSelector(
    (state: RootState) => state.User.departments,
  )

  const handleSubmit = (values, action) => {
    // Build payload per API spec: { username, password, menuThaoTac, idKhoaPhong }
    const loginPayload = {
      username: values.email,
      password: values.password,
      menuThaoTac: 'Đăng nhập',
      idKhoaPhong: department || null,
    }
    dispatch(loginUser(loginPayload, navigate, action))
  }

  const formik = useFormik({
    initialValues: {
      email: 'ba_Hang',
      password: '315315',
    },
    onSubmit: (value, action) => {
      handleSubmit(value, action)
    },
    validationSchema: loginSchema,
  })

  // Fetch departments for the fixed company when username changes
  useEffect(() => {
    const username = formik.values.email
    if (username) {
      dispatch(getDepartmentsForUser(username, company))
    }
  }, [formik.values.email, company, dispatch])

  // Transform departments to options
  const departmentOptions = departments.map((d) => ({
    label: d.tenKhoaPhong,
    value: d.idKhoaPhong,
  }))

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='text-left flex flex-col gap-2'>
        <div className='flex flex-col'>
          <label className='text-base text-left' htmlFor='email'>
            Email
          </label>
          <Input
            size='large'
            prefix={<UserOutlined />}
            name='email'
            placeholder='Nhập tài khoản'
            value={formik.values.email}
            onChange={formik.handleChange}
            status={formik.errors.email && formik.touched.email ? 'error' : ''}
            autoComplete='email'
          />
          <div className='text-left text-red-500 h-5 text-sm'>
            {formik.touched.email && formik.errors.email
              ? `*${formik.errors.email}`
              : ''}
          </div>
        </div>
        <div className='flex flex-col'>
          <label className='text-base text-left' htmlFor='password'>
            Mật khẩu
          </label>
          <Input.Password
            size='large'
            prefix={<LockOutlined />}
            name='password'
            placeholder='Nhập mật khẩu'
            value={formik.values.password}
            onChange={formik.handleChange}
            status={
              formik.errors.password && formik.touched.password ? 'error' : ''
            }
            autoComplete='current-password'
          />
          <div className='text-left text-red-500 h-5 text-sm'>
            {formik.touched.password && formik.errors.password
              ? `*${formik.errors.password}`
              : ''}
          </div>
        </div>
        {/* Company selection removed — company is fixed to `1`. */}
        <div className='flex flex-col'>
          <label className='text-base text-left'>Khoa Phòng</label>
          <Select
            size='large'
            value={department}
            onChange={(v) => setDepartment(v)}
            options={departmentOptions}
            placeholder='Chọn khoa phòng'
            allowClear
            disabled={!company}
          />
        </div>
        <div className='flex items-start gap-2'>
          <input type='checkbox' className='mt-1' />
          <label className='text-sm text-gray-700'>
            Lưu thông tin đăng nhập
          </label>
        </div>
        <Button size='large' type='primary' htmlType='submit' className='mt-5'>
          Đăng nhập
        </Button>
      </div>
    </form>
  )
}

FormLogin.propTypes = {}

export default FormLogin
