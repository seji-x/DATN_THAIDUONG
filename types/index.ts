import { SVGProps } from 'react'

import { Role } from '@/helper/enums'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export interface IUser {
  id: string
  username: string
  full_name: string
  role: Role
  email: string
  code: string
  avatar: string | null
  gender: 'MALE' | 'FEMALE'
  date_of_birth: string
  date_joined: string
  phone_number: string | null
  address: string | null
}

export interface IClass {
  id: string
  name: string
  key: string
  year: number
}

export interface ISubject {
  id: string
  name: string
  key: string
  grade: string
}
