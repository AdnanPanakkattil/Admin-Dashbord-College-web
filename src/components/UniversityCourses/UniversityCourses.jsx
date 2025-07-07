import React, { useState } from 'react';
import { Button, Form, message, Modal, Select, Table } from 'antd';
import { useQuery } from 'react-query';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useCreateUniversityCourses, useUpdateUniversityCourses, useDeleteUniversityCourses } from '../../utils/UniversityCourses/hooks';
import { getUniversityCoursesData } from '../../utils/UniversityCourses/UniversityCoursesApi';
import { getCoursesData } from '../../utils/Courses/CoursesApi';
import { getUniversityData } from '../../utils/University/UniversityApi';

function UniversityCourses() {
  const { data, isLoading, refetch } = useQuery('getUniversityCourses', getUniversityCoursesData);
  const { data: Coursesdata, isLoading: CoursesLoading } = useQuery('getCourses', getCoursesData);
  const { data: Universitydata, isLoading: UniversityLoading } = useQuery('getUniversity', getUniversityData);

  const { mutate: createUniversityCourses, isLoading: creating } = useCreateUniversityCourses();
  const { mutate: updateUniversityCourses, isLoading: updating } = useUpdateUniversityCourses();
  const { mutate: deleteUniversityCourses, isLoading: deleting } = useDeleteUniversityCourses();

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentUniversityCourses, setCurrentUniversityCourses] = useState(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Course ID',
      key: 'courseid',
      dataIndex: ['courseid', 'courses_name'],
    },
    {
      title: 'University ID',
      key: 'University_id',
      dataIndex: ['University_id', 'University_name'],
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
     
            icon={<EditOutlined />}
            style={{
              backgroundColor: '#1890ff',
              borderColor: '#1890ff',
              color: '#fff',
              marginRight: 8,
            }}
            onClick={() => handleEdit(record)}
            loading={updating}
          >
            Edit
          </Button>

          <Button
            danger
            icon={<DeleteOutlined />}
            style={{
              backgroundColor: '#ff4d4f',
              borderColor: '#ff4d4f',
              color: '#fff',
            }}
            onClick={() => handleDelete(record.id)}
            loading={deleting}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  function handleEdit(record) {
    setCurrentUniversityCourses(record);
   
    form.setFieldsValue({
      courseid: record.courseid?.id || record.courseid,
      University_id: record.University_id?.id || record.University_id,
    });
    setEditModalVisible(true);
  }

  function handleDelete(id) {
    deleteUniversityCourses(id, {
      onSuccess: () => {
        message.success('UniversityCourses deleted successfully');
        refetch();
      },
      onError: (error) => {
        console.error('Delete error:', error);
        message.error('Failed to delete UniversityCourses');
      },
    });
  }

  function handleAdd() {
    form.resetFields();
    setCurrentUniversityCourses(null);
    setAddModalVisible(true);
  }

  function onFinish(values) {
    console.log('Form values:', values);
    if (!values.courseid || !values.University_id) {
      message.error('Please select both course and university');
      return;
    }

    const payload = {
      courseid: values.courseid,
      University_id: values.University_id,
    };

    console.log('Submitting payload:', payload);

    if (currentUniversityCourses) {
     
      updateUniversityCourses(
        { id: currentUniversityCourses.id, data: payload },
        {
          onSuccess: () => {
            console.log('Update successful');
            message.success('UniversityCourses updated successfully');
            setEditModalVisible(false);
            form.resetFields();
            refetch();
          },
          onError: (error) => {
            console.error('Update error:', error);
            message.error('Failed to update UniversityCourses: ' + (error.message || 'Unknown error'));
          },
        }
      );
    } else {
      console.log('Creating new UniversityCourses');
      createUniversityCourses(payload, {
        onSuccess: () => {
          console.log('Create successful');
          message.success('UniversityCourses created successfully');
          setAddModalVisible(false);
          form.resetFields();
          refetch();
        },
        onError: (error) => {
          console.error('Create error:', error);
          message.error('Failed to create UniversityCourses: ' + (error.message || 'Unknown error'));
        },
      });
    }
  }

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={handleAdd}
          style={{
            backgroundColor: '#52c41a',
            borderColor: '#52c41a',
          }}
        >
          Add UniversityCourses
        </Button>
      </div>

      <Table columns={columns} dataSource={data?.data} loading={isLoading} rowKey="id" />

      <Modal
        title="Add UniversityCourses"
        open={addModalVisible}
        onCancel={() => {
          setAddModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Course Name"
            name="courseid"
            rules={[{ required: true, message: 'Please select course name' }]}
          >
            <Select
              placeholder="Select course name"
              options={
                CoursesLoading
                  ? []
                  : Coursesdata?.data?.map((it) => ({
                      value: it.id,
                      label: it.courses_name,
                    }))
              }
              allowClear={false}
              loading={CoursesLoading}
            />
          </Form.Item>

          <Form.Item
            label="University Name"
            name="University_id"
            rules={[{ required: true, message: 'Please select university name' }]}
          >
            <Select
              placeholder="Select university name"
              options={
                UniversityLoading
                  ? []
                  : Universitydata?.data?.map((it) => ({
                      value: it.id,
                      label: it.University_name,
                    }))
              }
              allowClear={false}
              loading={UniversityLoading}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={creating}
              block
              style={{
                backgroundColor: '#52c41a',
                borderColor: '#52c41a',
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit UniversityCourses"
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Course Name"
            name="courseid"
            rules={[{ required: true, message: 'Please select course name' }]}
          >
            <Select
              placeholder="Select course name"
              options={
                CoursesLoading
                  ? []
                  : Coursesdata?.data?.map((it) => ({
                      value: it.id,
                      label: it.courses_name,
                    }))
              }
              allowClear={false}
              loading={CoursesLoading}
            />
          </Form.Item>

          <Form.Item
            label="University Name"
            name="University_id"
            rules={[{ required: true, message: 'Please select university name' }]}
          >
            <Select
              placeholder="Select university name"
              options={
                UniversityLoading
                  ? []
                  : Universitydata?.data?.map((it) => ({
                      value: it.id,
                      label: it.University_name,
                    }))
              }
              allowClear={false}
              loading={UniversityLoading}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={updating}
              block
              style={{
                backgroundColor: '#52c41a',
                borderColor: '#52c41a',
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UniversityCourses;