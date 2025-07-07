import React, { useState } from 'react';
import { Button, Form, Input, message, Modal, Select, Table } from 'antd';
import { useQuery } from 'react-query';
import { getCollegeData } from '../../utils/college/CollegeApi';
import { useCreateCollege, useDeleteCollege, useUpdateCollege } from '../../utils/college/hooks';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getUniversityData } from '../../utils/University/UniversityApi';


function College() {
  const { data, isLoading, refetch } = useQuery('getCollege', getCollegeData);
  const { mutate: createCollege, isLoading: creating } = useCreateCollege();
  const { mutate: updateCollege, isLoading: updating } = useUpdateCollege();
  const { mutate: deleteCollege, isLoading: deleting } = useDeleteCollege();

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentCollege, setCurrentCollege] = useState(null);

  const [form] = Form.useForm();

  const { data: Universitydata, isLoading: UniversityLoading, error: UniversityError } = useQuery(
    'getUniversityFroProduction',
    getUniversityData,
    {
      onError: (error) => {
        console.error('Error fetching university data:', error);
        message.error('Failed to load university data');
      },
    }
  );


  console.log('Universitydata:', Universitydata);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'College Name',
      key: 'id',
      dataIndex: 'College_name',
    },
    {
      title: 'Place',
      key: 'id',
      dataIndex: 'Place',
    },
    {
      title: 'State',
      key: 'id',
      dataIndex: 'state',
    },
    {
      title: 'University id',
      key: 'id',
      dataIndex: ['University_id', 'University_name'],
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            style={{
              marginRight: 8,
              backgroundColor: '#1890ff',
              borderColor: '#1890ff',
            }}
            onClick={() => handleEdit(record)}
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
    setCurrentCollege(record);
    form.setFieldsValue({
      College_name: record.College_name,
      Place: record.Place,
      state: record.state,
      University_id: record.University_id?.id || record.University_id,
    });
    setEditModalVisible(true);
  }

  function handleDelete(id) {
    deleteCollege(id, {
      onSuccess: () => {
        message.success('College deleted successfully');
        refetch();
      },
      onError: () => {
        message.error('Failed to delete College');
      },
    });
  }

  function handleAdd() {
    form.resetFields();
    setCurrentCollege(null);
    setAddModalVisible(true);
  }

  function onFinish(values) {
    const payload = {
      ...values,
      University_id: Number(values.University_id), 
    };

    if (currentCollege) {
      updateCollege(
        { id: currentCollege.id, data: payload },
        {
          onSuccess: () => {
            message.success('College updated successfully');
            setEditModalVisible(false);
            form.resetFields();
            refetch();
          },
          onError: () => {
            message.error('Failed to update College');
          },
        }
      );
    } else {
      createCollege(payload, {
        onSuccess: () => {
          message.success('College created successfully');
          setAddModalVisible(false);
          form.resetFields();
          refetch();
        },
        onError: () => {
          message.error('Failed to create College');
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
          Add College
        </Button>
      </div>

      <Table columns={columns} dataSource={data?.data} loading={isLoading} rowKey="id" />

      {/* Add Modal */}
      <Modal
        title="Add College"
        visible={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="College_name"
            label="College Name"
            rules={[{ required: true, message: 'Please input College name!' }]}
          >
            <Input placeholder="Enter College name" />
          </Form.Item>
          <Form.Item
            name="Place"
            label="Place"
            rules={[{ required: true, message: 'Please input Place' }]}
          >
            <Input placeholder="Enter Place" />
          </Form.Item>
          <Form.Item
            name="state"
            label="State"
            rules={[{ required: true, message: 'Please input state' }]}
          >
            <Input placeholder="Enter state name" />
          </Form.Item>
          <Form.Item
            label="University id"
            name="University_id"
            rules={[{ required: true, message: 'Please select University id' }]}
          >
            <Select
              placeholder="Select University id"
              options={
                UniversityLoading
                  ? []
                  : Universitydata?.data?.length > 0
                  ? Universitydata.data.map((it) => ({
                      value: it.id,
                      label: it.University_name,
                    }))
                  : [{ value: '', label: 'No universities available' }]
              }
              allowClear
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

      {/* Edit Modal */}
      <Modal
        title="Edit College"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="College_name"
            label="College Name"
            rules={[{ required: true, message: 'Please input College name!' }]}
          >
            <Input placeholder="Enter College name" />
          </Form.Item>
          <Form.Item
            name="Place"
            label="Place"
            rules={[{ required: true, message: 'Please input Place' }]}
          >
            <Input placeholder="Enter Place" />
          </Form.Item>
          <Form.Item
            name="state"
            label="State"
            rules={[{ required: true, message: 'Please input state' }]}
          >
            <Input placeholder="Enter state name" />
          </Form.Item>
          <Form.Item
            label="University id"
            name="University_id"
            rules={[{ required: true, message: 'Please select University id' }]}
          >
            <Select
              placeholder="Select University id"
              options={
                UniversityLoading
                  ? []
                  : Universitydata?.data?.length > 0
                  ? Universitydata.data.map((it) => ({
                      value: it.id,
                      label: it.University_name,
                    }))
                  : [{ value: '', label: 'No universities available' }]
              }
              allowClear
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
                backgroundColor: '#1890ff',
                borderColor: '#1890ff',
              }}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default College;