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
import { userClassEndpoint } from '@/config/endpoints'
import { IClass, IUser } from '@/types'

const RECORD_PER_PAGE = 10
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
    key: 'class',
    label: 'Class',
  },
  {
    key: 'action',
    label: '',
  },
]

export default function StudentList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const search = searchParams.get('search')
  const classId = searchParams.get('classId')

  const { response, pending } = useGet<{ count: number; results: { user: IUser; class_instance: IClass }[] }>(
    {
      url: userClassEndpoint.BASE,
      config: {
        params: {
          search,
          class_id: classId,
          limit: RECORD_PER_PAGE,
          offset: (page - 1) * RECORD_PER_PAGE,
        },
      },
    },
    {
      deps: [search, classId, page],
    },
  )

  return (
    <div className="mt-10">
      <Table isStriped aria-label="Student-list" selectionMode="multiple">
        <TableHeader columns={cols}>
          {(col) => (
            <TableColumn key={col.key} align="center">
              {col.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody loadingContent={<Spinner />} loadingState="idle" isLoading={pending}>
          {(response?.results || []).map((student, index) => (
            <TableRow key={student.user.id}>
              <TableCell>{(page - 1) * RECORD_PER_PAGE + index + 1}</TableCell>
              <TableCell>{student.user.full_name}</TableCell>
              <TableCell>{student.user.email}</TableCell>
              <TableCell>{student.user.code}</TableCell>
              <TableCell>{student.class_instance.name}</TableCell>
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
        total={Math.ceil((response?.count || 0) / RECORD_PER_PAGE)}
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
