import * as Yup from 'yup'

export const addCategorySchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên bộ môn'),
})
