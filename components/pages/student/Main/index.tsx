import PageTitle from '@/components/common/PageTitle'

import TopBar from '../TopBar'
import StudentList from '../StudentList'

export default function Student() {
  return (
    <div>
      <PageTitle title="Student" />
      <div className="p-1 pt-3 pb-14">
        <TopBar />
        <StudentList />
      </div>
    </div>
  )
}
