'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@nextui-org/button'
import { Pagination } from '@nextui-org/pagination'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { FaEye } from 'react-icons/fa'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { Spinner } from '@nextui-org/spinner'

import { updateSeachParams } from '@/helper/logics'
import { useGet } from '@/hooks/useGet'
import { ISubject } from '@/types'
import { subjectEndpoint } from '@/config/endpoints'

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
    key: 'key',
    label: 'Key',
  },
  {
    key: 'grade',
    label: 'Grade',
  },
  {
    key: 'action',
    label: '',
  },
]

const RECORD_PER_PAGE = 10

export default function SubjectList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  const { response, pending } = useGet<{ count: number; results: ISubject[] }>(
    {
      url: subjectEndpoint.BASE,
      config: {
        params: {
          limit: RECORD_PER_PAGE,
          offset: (page - 1) * RECORD_PER_PAGE,
        },
      },
    },
    {
      deps: [page],
    },
  )

  return (
    <div className="mt-10">
      <Table aria-label="subject-list">
        <TableHeader columns={cols}>{(col) => <TableColumn key={col.key}>{col.label}</TableColumn>}</TableHeader>
        <TableBody isLoading={pending} loadingContent={<Spinner />}>
          {(response?.results || []).map((subject, index) => (
            <TableRow key={subject.id}>
              <TableCell>{(page - 1) * RECORD_PER_PAGE + index + 1}</TableCell>
              <TableCell>{subject.name}</TableCell>
              <TableCell>{subject.key}</TableCell>
              <TableCell>{subject.grade}</TableCell>
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
