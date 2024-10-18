import { date, mixed, number, object, string } from 'yup'

export const CREATE_STUDENT_SCHEMA = object({
  full_name: string().required(),
  email: string().email().required(),
  class_id: string().required(),
  date_of_birth: date().required().max(new Date()),
  avatar: mixed().required(),
  address: string().required(),
  phone_number: string()
    .required()
    .test({
      name: 'is_phone',
      test: (value) => {
        const PHONE_REGEX = /^[0-9]{10}$/

        return PHONE_REGEX.test(value)
      },
      message: 'Invalid phone number',
    }),
})

export const CREATE_TEACHER_SCHEMA = object({
  fullname: string().required(),
  email: string().email().required(),
  date_of_birth: date().required().max(new Date()),
  avatar: mixed().required(),
  address: string().required(),
  gender: string().required(),
  phone_number: string()
    .required()
    .test({
      name: 'is_phone',
      test: (value) => {
        const PHONE_REGEX = /^[0-9]{10}$/

        return PHONE_REGEX.test(value)
      },
      message: 'Invalid phone number',
    }),
})

export const CREATE_CLASS_SCHEMA = object({
  key: string().required(),
  name: string().required(),
  year: string()
    .required()
    .test({
      name: 'is_valid_year',
      test(value) {
        const YEAR_REGEX = /^[0-9]{4}$/

        return YEAR_REGEX.test(value)
      },
      message: 'Invalid year',
    }),
})

export const CREATE_SUBJECT_SCHEMA = object({
  name: string().required(),
  key: string().required(),
  grade: number().required(),
})

export const LOGIN_SCHEMA = object({
  email: string().email().required(),
  password: string().required(),
})
