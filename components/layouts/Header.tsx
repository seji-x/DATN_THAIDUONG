'use client'

import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@nextui-org/button'
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/dropdown'
import { GoSidebarCollapse } from 'react-icons/go'
import { User } from '@nextui-org/user'
import { RootState } from '@/redux'
import { actionLogout } from '@/redux/slices/auth'

interface Props {
  collapsed: boolean
  setCollapsed: Dispatch<SetStateAction<boolean>>
}

export default function Header({ collapsed, setCollapsed }: Props) {
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <header className="h-20 shrink-0 w-full bg-white flex items-center px-6 shadow-sm justify-between">
      <Button
        isIconOnly
        className={`${collapsed ? '' : 'rotate-180'} duration-200`}
        color="primary"
        size="sm"
        variant="light"
        onClick={() => setCollapsed(!collapsed)}
      >
        <GoSidebarCollapse className="text-base text-black" />
      </Button>

      <Dropdown>
        <DropdownTrigger>
          <User
            avatarProps={{
              name: 'K',
              color: 'success',
            }}
            className="border rounded-full p-0.5 pr-4 cursor-pointer shadow"
            description={user?.role}
            name={user?.full_name}
          />
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownSection showDivider>
            <DropdownItem key={'profile'}>Profile</DropdownItem>
            <DropdownItem key={'setting'}>Setting</DropdownItem>
          </DropdownSection>
          <DropdownItem
            key={'logout'}
            color="warning"
            onClick={() => {
              dispatch(actionLogout())
              router.replace('/auth/login')
            }}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </header>
  )
}
