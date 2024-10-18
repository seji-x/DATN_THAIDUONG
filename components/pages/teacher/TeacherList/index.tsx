'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@nextui-org/button'
import { Pagination } from '@nextui-org/pagination'
import { Spinner } from '@nextui-org/spinner'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { FaEye } from 'react-icons/fa'
import { MdOutlineDeleteForever } from 'react-icons/md'

import { updateSeachParams } from '@/helper/logics'
import { useGet } from '@/hooks/useGet'
import { userEndpoint } from '@/config/endpoints'
import { Role } from '@/helper/enums'
import { IUser } from '@/types'

const RECORD_PER_PAGE = 10

export default function TeacherList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const search = searchParams.get('search')

  const { response: teachers, pending } = useGet<{ count: number; results: IUser[] }>(
    {
      url: userEndpoint.BASE,
      config: {
        params: {
          limit: RECORD_PER_PAGE,
          offset: (page - 1) * RECORD_PER_PAGE,
          role: Role.TEACHER,
          search,
        },
      },
    },
    {
      deps: [page, search],
    },
  )

  const cols: { key: string; label: string }[] = [
    {
      key: 'no',
      label: 'No',
    },
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'code',
      label: 'Code',
    },

    {
      key: 'action',
      label: '',
    },
  ]

  return (
    <div className="mt-10">
      <Table isStriped aria-label="teacher-list" selectionMode="multiple">
        <TableHeader columns={cols}>
          {(col) => (
            <TableColumn key={col.key} align="center">
              {col.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody loadingContent={<Spinner />} loadingState="idle" isLoading={pending}>
          {(teachers?.results || []).map((teacher, index) => (
            <TableRow key={teacher.id}>
              <TableCell>{(page - 1) * RECORD_PER_PAGE + index + 1}</TableCell>
              <TableCell>{teacher.full_name}</TableCell>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>{teacher.code}</TableCell>
              <TableCell>
                <div className="flex justify-center gap-1">
                  <Button isIconOnly color="primary" variant="flat">
                    <FaEye className="text-lg" />
                  </Button>
                  <Button isIconOnly color="danger" variant="flat">
                    <MdOutlineDeleteForever className="text-lg" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        showControls
        showShadow
        className="mt-10 flex justify-center"
        page={page}
        total={Math.ceil((teachers?.count || 0) / RECORD_PER_PAGE)}
        onChange={(page) => {
          router.replace(
            updateSeachParams({
              page,
            }),
          )
        }}
      />
    </div>
  )
}
