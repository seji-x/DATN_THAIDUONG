'use client'

import { useParams } from 'next/navigation'
import Detail from '../Detail'
import ListStudent from '../ListStudent'
import { Tab, Tabs } from '@nextui-org/tabs'
import Subjects from '../Subjects'

export default function ClassDetail() {
  const { id } = useParams()

  return (
    <div>
      <Detail />
      <div className="mt-10">
        <Tabs size="lg" color="primary">
          <Tab key="student" title="STUDENT">
            <ListStudent />
          </Tab>
          <Tab key="subject" title="SUBJECT">
            <Subjects />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
