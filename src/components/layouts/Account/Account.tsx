import React, { useState, useEffect } from 'react'
import { Button, Input, Divider, Select } from 'antd'
import { PlusOutlined, SyncOutlined } from '@ant-design/icons'
import AccountList from './AccountList/AccountList'
import { useAppSelector, useAppDispatch } from '../../../redux/store/hooks'
import { RootState } from '../../../types'
import {
  getCompaniesForUser,
  getDepartmentsForUser,
} from '../../../redux/actions/userActions'

const Account = () => {
  const dispatch = useAppDispatch()
  const [company, setCompany] = useState<any>(null)
  const [department, setDepartment] = useState<any>(null)

  const user = useAppSelector((state: RootState) => state.User.infoUser)
  const companies = useAppSelector((state: RootState) => state.User.companies)
  const departments = useAppSelector(
    (state: RootState) => state.User.departments,
  )

  useEffect(() => {
    // fetch companies for current user
    const taiKhoan = user?.username || ''
    if (taiKhoan) {
      dispatch(getCompaniesForUser(taiKhoan))
    }
  }, [user, dispatch])

  useEffect(() => {
    // fetch departments when company selected
    if (company && company !== 'all' && user?.username) {
      dispatch(getDepartmentsForUser(user.username, company))
    }
  }, [company, user, dispatch])

  // Auto-select if only one company
  useEffect(() => {
    if (companies.length === 1 && !company) {
      setCompany(companies[0].idct)
    }
  }, [companies, company])

  // Transform companies to options with "Tất cả" option
  const companyOptions = [
    { label: 'Tất cả công ty', value: 'all' },
    ...companies.map((c) => ({ label: c.tenct, value: c.idct })),
  ]

  // Transform departments to options with "Tất cả" option
  const departmentOptions = [
    { label: 'Tất cả khoa', value: 'all' },
    ...departments.map((d) => ({
      label: d.tenKhoaPhong,
      value: d.idKhoaPhong,
    })),
  ]

  return (
    <div className='p-2 flex flex-col gap-2'>
      <div className='flex justify-between items-center'>
        <div className='font-medium text-xl text-gray-500'>Tài khoản</div>
        <div className='flex items-center gap-3'>
          <Select
            value={company}
            onChange={(v) => setCompany(v)}
            options={companyOptions}
            className='w-56'
            placeholder='Chọn công ty'
            allowClear
          />
          <Select
            value={department}
            onChange={(v) => setDepartment(v)}
            options={departmentOptions}
            className='w-56'
            placeholder='Chọn khoa'
            allowClear
          />
          <Button type='primary' icon={<PlusOutlined />}>
            Thêm
          </Button>
        </div>
      </div>
      <Divider style={{ margin: 0, padding: 0 }} />
      <div className='flex flex-wrap items-center gap-3'>
        <Input className='w-96' placeholder='Nhập từ khóa...' allowClear />
        <Button className='w-8' type='primary' icon={<SyncOutlined />} />
      </div>
      <AccountList />
    </div>
  )
}

export default Account
