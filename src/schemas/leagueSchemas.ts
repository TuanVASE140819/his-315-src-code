import * as Yup from 'yup'

export const addLeagueSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên giải đấu'),
  categoryId: Yup.number().required('Vui chọn bộ môn'),
})
