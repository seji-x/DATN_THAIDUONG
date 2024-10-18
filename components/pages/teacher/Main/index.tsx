import PageTitle from '@/components/common/PageTitle'

import TopBar from '../TopBar'
import TeacherList from '../TeacherList'

export default function Teacher() {
  return (
    <div>
      <PageTitle title="Teacher" />
      <div className="p-1 pt-3 pb-14">
        <TopBar />
        <TeacherList />
      </div>
    </div>
  )
}
