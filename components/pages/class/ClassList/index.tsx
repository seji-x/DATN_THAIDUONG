'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Pagination } from '@nextui-org/pagination'

import { updateSeachParams } from '@/helper/logics'
import { useGet } from '@/hooks/useGet'
import { classEndpoint } from '@/config/endpoints'
import { IClass } from '@/types'

import ClassItem from './ClassItem'

const POST_PER_PAGE = 12

export default function ClassList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  const search = searchParams.get('search')
  const { response: classes } = useGet<{
    count: number
    results: IClass[]
  }>(
    {
      url: classEndpoint.BASE,
      config: {
        params: {
          limit: POST_PER_PAGE,
          offset: (page - 1) * POST_PER_PAGE,
          search,
        },
      },
    },
    {
      deps: [page, search],
    },
  )

  return (
    <div className="mt-10">
      <div className="grid grid-cols-4 gap-6">
        {classes?.results.map((_class) => (
          <ClassItem key={_class.id} id={_class.id} name={_class.name} year={_class.year} />
        ))}
      </div>
      <Pagination
        showControls
        showShadow
        className="mt-10 flex justify-center"
        page={page}
        total={Math.ceil((classes?.count || 0) / POST_PER_PAGE)}
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
