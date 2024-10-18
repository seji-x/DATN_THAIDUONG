import { LuLayoutDashboard } from 'react-icons/lu'
import { SiGoogleclassroom } from 'react-icons/si'
import { PiStudent } from 'react-icons/pi'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { BiMath } from 'react-icons/bi'

export const teacherNavs = [
  {
    label: 'Dashboard',
    icon: LuLayoutDashboard,
    href: '/',
  },
  {
    label: 'Class',
    icon: SiGoogleclassroom,
    href: '/class',
  },
  {
    label: 'Student',
    icon: PiStudent,
    href: '/student',
  },
]

export const adminNavs = [
  {
    label: 'Dashboard',
    icon: LuLayoutDashboard,
    href: '/',
  },
  {
    label: 'Class',
    icon: SiGoogleclassroom,
    href: '/class',
  },
  {
    label: 'Student',
    icon: PiStudent,
    href: '/student',
  },
  {
    label: 'Teacher',
    icon: FaChalkboardTeacher,
    href: '/teacher',
  },
  {
    label: 'Subject',
    icon: BiMath,
    href: '/subject',
  },
]
