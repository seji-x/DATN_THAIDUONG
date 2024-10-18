'use client'

import { ReactNode, Suspense, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import { Role } from '@/helper/enums'
import { RootState } from '@/redux'
import Header from '@/components/layouts/Header'
import SideBar from '@/components/layouts/SideBar'
import { getClientCookie } from '@/services/clientCookies'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/config/constants'
import { axiosInstance } from '@/services/axiosInstance'
import { userEndpoint } from '@/config/endpoints'
import { actionLogout, actionSetUser } from '@/redux/slices/auth'

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const { user } = useSelector((state: RootState) => state.auth)
  const [collapsed, setCollapsed] = useState(false)
  const [ready, setReady] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    const getMe = async () => {
      try {
        const response = await axiosInstance.get(userEndpoint.GET_ME)
        dispatch(actionSetUser(response.data))
        setReady(true)
      } catch (error) {
        dispatch(actionLogout())
        router.replace('/auth/login')
      }
    }

    if (user?.role === Role.ADMIN) {
      setReady(true)
      return
    }
    const access = getClientCookie(ACCESS_TOKEN)
    const refresh = getClientCookie(REFRESH_TOKEN)
    if (access || refresh) {
      getMe()
      return
    }

    router.replace('/auth/login')
  }, [])

  if (!ready) return null

  return (
    <Suspense>
      <div className="w-dvw h-dvh flex bg-gray-100">
        <SideBar collapsed={collapsed} />
        <div className="grow h-full overflow-y-auto flex flex-col">
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
          <main className="grow w-full overflow-y-auto px-4 pt-2">{children}</main>
        </div>
      </div>
    </Suspense>
  )
}
