import { Table } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { getContactData } from '../../utils/Contact/ContactApi'

const Contact = () => {
const colums = [
  {
    title:"id",
    key:"id",
    dataIndex:"id"
},
  {
    title:"Name",
    key:"id",
    dataIndex:"Name"
},
  {
    title:"Age",
    key:"id",
    dataIndex:"Age"
},
  {
    title:"Phone number",
    key:"id",
    dataIndex:"Phone_number"
},
  {
    title:"College name",
    key:"id",
    dataIndex:"College_name"
},
  {
    title:"courses name",
    key:"id",
    dataIndex:"courses_name"
},
]
const {data,isLoading,refetch} = useQuery('getContact',getContactData)

  return (
    <div>
      <Table columns={colums}  dataSource={data?.data}/>
    </div>
  )
}

export default Contact