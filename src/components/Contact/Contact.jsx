import React from 'react';
import { Table, Spin } from 'antd';
import { useQuery } from 'react-query';

import { useParams } from 'react-router-dom';
import { getCollegeData } from '../../utils/college/CollegeApi';

const Colleges = () => {
  const columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: 'College Name',
      key: 'id',
      dataIndex: 'College_name',
    },
  ];

  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(
    ['getCollege', id],
    () => getCollegeData(id),
    {
      enabled: !!id,
    }
  );

  // Find the college data based on the id
  const college = id && data?.data?.find((doc) => doc.College_name?.id?.toString() === id)?.College_name;

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Error loading college data</div>;
  }

  if (id && !college) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>College not found</div>;
  }

  // Prepare dataSource for the Table
  const dataSource = college ? [{ id: college.id, College_name: college.name || college.College_name }] : data?.data || [];

  return (
    <div style={{ padding: '20px' }}>
      <Table
        columns={columns}
        dataSource={dataSource}
        title={() => college ? <h2>{college.name || college.College_name}</h2> : 'Colleges List'}
      />
    </div>
  );
};

export default Colleges;