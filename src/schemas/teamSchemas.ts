import * as Yup from 'yup'

export const addTeamSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên đội thi đấu'),
  categoryId: Yup.number().required('Vui chọn bộ môn'),
})
