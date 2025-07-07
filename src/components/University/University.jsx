import React, { useState } from 'react';
import { Button, Form, Input, message, Modal, Row, Col, Card, Upload, Pagination } from 'antd';
import { useQuery } from 'react-query';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getUniversityData } from '../../utils/University/UniversityApi';
import { useCreateUniversity, useDeleteUniversity, useUpdateUniversity } from '../../utils/University/hooks';

const { Meta } = Card;

function University() {
  const { data, isLoading, refetch } = useQuery('getUniversity', getUniversityData);
  const { mutate: createUniversity, isLoading: creating } = useCreateUniversity();
  const { mutate: updateUniversity, isLoading: updating } = useUpdateUniversity();
  const { mutate: deleteUniversity, isLoading: deleting } = useDeleteUniversity();

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentUniversity, setCurrentUniversity] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8); 

  function handleEdit(record) {
    setCurrentUniversity(record);
    form.setFieldsValue({ University_name: record.University_name });
    setFileList(record.image ? [{ uid: '-1', name: 'image', url: `http://localhost:8000${record.image}` }] : []);
    setEditModalVisible(true);
  }

  function handleDelete(id) {
    deleteUniversity(id, {
      onSuccess: () => {
        message.success('University deleted successfully');
        refetch();
       
        if (data?.data?.length <= (currentPage - 1) * pageSize) {
          setCurrentPage(1);
        }
      },
      onError: (error) => {
        console.error('Delete error:', error.response?.data || error.message);
        message.error(`Failed to delete University: ${error.message}`);
      },
    });
  }

  function handleAdd() {
    form.resetFields();
    setCurrentUniversity(null);
    setFileList([]);
    setAddModalVisible(true);
  }

  function onFinish(values) {
    const formData = new FormData();
    formData.append('University_name', values.University_name);

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append('image', fileList[0].originFileObj);
    }

    const action = currentUniversity
      ? updateUniversity(
          { id: currentUniversity.id, data: formData },
          {
            onSuccess: () => {
              message.success('University updated successfully');
              setEditModalVisible(false);
              form.resetFields();
              setFileList([]);
              refetch();
            },
            onError: (error) => {
              console.error('Update error:', error.response?.data || error.message);
              message.error(`Failed to update University: ${error.message}`);
            },
          }
        )
      : createUniversity(formData, {
          onSuccess: () => {
            message.success('University created successfully');
            setAddModalVisible(false);
            form.resetFields();
            setFileList([]);
            refetch();
            setCurrentPage(1); 
          },
          onError: (error) => {
            console.error('Create error:', error.response?.data || error.message);
            message.error(`Failed to create University: ${error.message}`);
          },
        });
  }

  const uploadProps = {
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList.slice(-1));
    },
    beforeUpload: () => false,
    fileList,
    accept: 'image/*',
    maxCount: 1,
  };

  const modalWidth = window.innerWidth < 576 ? '90%' : window.innerWidth < 768 ? 400 : 520;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data?.data?.slice(startIndex, endIndex);

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={handleAdd}
          style={{ minHeight: '48px', padding: '8px 16px' }}
          aria-label="Add new university"
        >
          Add University
        </Button>
      </div>

      {isLoading ? (
        <Row gutter={[16, 16]}>
          {[...Array(4)].map((_, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card loading />
            </Col>
          ))}
        </Row>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {paginatedData?.map((doc) => (
              <Col xs={24} sm={12} md={8} lg={6} key={doc.id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={doc.University_name}
                      src={`http://localhost:8000${doc.image}`}
                      loading="lazy"
                      style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
                      onError={(e) => (e.target.src = '/path/to/placeholder-image.jpg')}
                    />
                  }
                  actions={[
                    <Button
                      type="link"
                      key="edit"
                      onClick={() => handleEdit(doc)}
                      icon={<EditOutlined />}
                      style={{ padding: window.innerWidth < 576 ? '4px 8px' : '8px 16px' }}
                      aria-label={`Edit ${doc.University_name}`}
                    >
                      {window.innerWidth >= 576 && 'Edit'}
                    </Button>,
                    <Button
                      type="link"
                      danger
                      key="delete"
                      loading={deleting}
                      onClick={() => handleDelete(doc.id)}
                      icon={<DeleteOutlined />}
                      style={{ padding: window.innerWidth < 576 ? '4px 8px' : '8px 16px' }}
                      aria-label={`Delete ${doc.University_name}`}
                    >
                      {window.innerWidth >= 576 && 'Delete'}
                    </Button>,
                  ]}
                >
                  <Meta
                    title={doc.University_name}
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontSize: window.innerWidth < 576 ? '14px' : '16px',
                    }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
          {data?.data?.length > 0 && (
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={data?.data?.length}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                responsive={true}
              />
            </div>
          )}
        </>
      )}

      {/* Add University Modal */}
      <Modal
        title="Add University"
        open={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        footer={null}
        destroyOnClose
        width={modalWidth}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="University_name"
            label="University name"
            rules={[{ required: true, message: 'Please input university name!' }]}
          >
            <Input
              placeholder="Enter University name"
              size={window.innerWidth < 576 ? 'middle' : 'large'}
            />
          </Form.Item>

          <Form.Item label="Image" name="image">
            <Upload {...uploadProps}>
              <Button style={{ width: '100%' }}>Select Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={creating}
              block
              style={{ minHeight: '48px' }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit University Modal */}
      <Modal
        title="Edit University"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        destroyOnClose
        width={modalWidth}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="University_name"
            label="University name"
            rules={[{ required: true, message: 'Please input university name!' }]}
          >
            <Input
              placeholder="Enter University name"
              size={window.innerWidth < 576 ? 'middle' : 'large'}
            />
          </Form.Item>

          <Form.Item label="Image" name="image">
            <Upload {...uploadProps}>
              <Button style={{ width: '100%' }}>Edit Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={updating}
              block
              style={{ minHeight: '48px' }}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default University;