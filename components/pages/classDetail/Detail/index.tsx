import { useParams } from 'next/navigation'
import { classEndpoint } from '@/config/endpoints'
import { useGet } from '@/hooks/useGet'
import { IClass } from '@/types'

export default function Detail() {
  const { id } = useParams()

  const { response } = useGet<IClass>({
    url: `${classEndpoint.BASE}/${id}`,
  })

  return (
    <div className="flex items-stretch gap-10 justify-center">
      <div className="aspect-square rounded-full bg-white w-48"></div>
      <div>
        <p className="text-4xl font-bold">{response?.name}</p>
        <p className="mt-3">{response?.year}</p>
      </div>
    </div>
  )
}
