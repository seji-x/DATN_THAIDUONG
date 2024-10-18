import { useRouter } from 'next/navigation'
import { Avatar } from '@nextui-org/avatar'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { IClass } from '@/types'

export default function ClassItem({ id, name }: Omit<IClass, 'key'>) {
  const router = useRouter()

  return (
    <Card
      isPressable
      className="aspect-square cursor-pointer"
      onClick={() => {
        router.push(`/class/${id}`)
      }}
    >
      <CardHeader className="flex-col items-start bg-blue-600 p-5 relative z-0 text-white">
        <p className="text-xl font-semibold">{name}</p>
        <p className="text-sm">30 students</p>
        <Avatar className="absolute right-2 bottom-0 translate-y-1/2" name="K" size="lg" />
      </CardHeader>

      <CardBody className="relative z-10" />
    </Card>
  )
}
