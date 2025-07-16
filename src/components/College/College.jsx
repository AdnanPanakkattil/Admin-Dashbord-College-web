import React, { useState } from 'react';
import { Button, Form, Input, message, Modal, Row, Col, Card, Upload, Pagination, Select } from 'antd';
import { useQuery } from 'react-query';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useCreateCollege, useDeleteCollege, useUpdateCollege } from '../../utils/college/hooks';
import { getUniversityData } from '../../utils/University/UniversityApi';
import { getCollegeData } from '../../utils/college/CollegeApi';

const { Meta } = Card;
const { Option } = Select;

function College() {

  const { data, isLoading, refetch } = useQuery('getCollege', getCollegeData, {
    onError: (error) => {
      console.error('Error fetching colleges:', error);
      message.error('Failed to load colleges');
    },
  });

  const { data: universities, isLoading: universitiesLoading } = useQuery('getUniversities', getUniversityData, {
    onSuccess: (data) => {
      console.log('Universities data:', data);
    },
    onError: (error) => {
      console.error('Error fetching universities:', error);
      message.error('Failed to load universities');
    },
  });

  const { mutate: createCollege, isLoading: creating } = useCreateCollege();
  const { mutate: updateCollege, isLoading: updating } = useUpdateCollege();
  const { mutate: deleteCollege, isLoading: deleting } = useDeleteCollege();

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentCollege, setCurrentCollege] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  function handleEdit(record) {
    console.log('Editing college:', record);
    setCurrentCollege(record);
    form.setFieldsValue({
      College_name: record.College_name,
      Place: record.Place,
      state: record.state,
      University_id: record.University_name, 
    });
    setFileList(record.image ? [{ uid: '-1', name: 'image', url: `http://localhost:8000${record.image}` }] : []);
    setEditModalVisible(true);
  }

  function handleDelete(id) {
    console.log('Deleting college ID:', id);
    deleteCollege(id, {
      onSuccess: () => {
        message.success('College deleted successfully');
        refetch();

        if (data?.data?.length <= (currentPage - 1) * pageSize + 1) {
          setCurrentPage(Math.max(1, currentPage - 1));
        }
      },
      onError: (error) => {
        console.error('Delete error:', error.response?.data || error.message);
        message.error(`Failed to delete college: ${error.response?.data?.detail || error.message}`);
      },
    });
  }

  function handleAdd() {
    console.log('Opening Add College modal');
    form.resetFields();
    setCurrentCollege(null);
    setFileList([]);
    setAddModalVisible(true);
  }

  function onFinish(values) {
    const formData = new FormData();
    formData.append('College_name', values.College_name);
    formData.append('Place', values.Place );
    formData.append('state', values.state );
    formData.append('University_id', values.University_id); 

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append('image', fileList[0].originFileObj);
    }

    console.log('Submitting form data:', Object.fromEntries(formData));

    if (currentCollege) {

      updateCollege(
        { id: currentCollege.id, data: formData },
        {
          onSuccess: () => {
            message.success('College updated successfully');
            setEditModalVisible(false);
            form.resetFields();
            setFileList([]);
            refetch();
          },
          onError: (error) => {
            console.error('Update error:', error.response?.data || error.message);
            message.error(`Failed to update college: ${error.response?.data?.detail || error.message}`);
          },
        }
      );
    } else {

      createCollege(formData, {
        onSuccess: () => {
          message.success('College created successfully');
          setAddModalVisible(false);
          form.resetFields();
          setFileList([]);
          refetch();
          setCurrentPage(1);
        },
        onError: (error) => {
          console.error('Create error:', error.response?.data || error.message);
          message.error(`Failed to create college: ${error.response?.data?.detail || error.message}`);
        },
      });
    }
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
  const paginatedData = data?.data?.slice(startIndex, endIndex) || [];

  return (
    <>

      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={handleAdd}
          style={{ minHeight: '48px', padding: '8px 16px' }}
          aria-label="Add new college"
        >
          Add College
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
            {paginatedData.map((doc) => (
              <Col xs={24} sm={12} md={8} lg={6} key={doc.id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={doc.College_name || 'College Image'}
                      src={`http://localhost:8000${doc.image}`}
                      loading="lazy"
                      style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
                      onError={(e) => (e.target.src = '/placeholder-image.jpg')} 
                    />
                  }
                  actions={[
                    <Button
                      type="link"
                      key="edit"
                      onClick={() => handleEdit(doc)}
                      icon={<EditOutlined />}
                      style={{ padding: window.innerWidth < 576 ? '4px 8px' : '8px 16px' }}
                      aria-label={`Edit ${doc.College_name || 'college'}`}
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
                      aria-label={`Delete ${doc.College_name || 'college'}`}
                    >
                      {window.innerWidth >= 576 && 'Delete'}
                    </Button>,
                  ]}
                >
                  <Meta
                    title={doc.College_name || 'Unnamed College'}
                    description={
                      <div>
                        <p style={{ margin: 0, fontSize: window.innerWidth < 576 ? '12px' : '14px' }}>
                          Place: {doc.Place || 'N/A'}
                        </p>
                        <p style={{ margin: 0, fontSize: window.innerWidth < 576 ? '12px' : '14px' }}>
                          State: {doc.state || 'N/A'}
                        </p>
                        <p style={{ margin: 0, fontSize: window.innerWidth < 576 ? '12px' : '14px' }}>
                          University: {doc?.University_id?.University_name ||  'N/A'}
                        </p>
                      </div>
                    }
                    style={{
                      whiteSpace: 'normal',
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
                total={data?.data?.length || 0}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                responsive={true}
              />
            </div>
          )}
        </>
      )}

      {/* Add College Modal */}
      <Modal
        title="Add College"
        open={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        footer={null}
        destroyOnClose
        width={modalWidth}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="College_name"
            label="College Name"
            rules={[{ required: true, message: 'Please input college name!' }]}
          >
            <Input
              placeholder="Enter college name"
              size={window.innerWidth < 576 ? 'middle' : 'large'}
            />
          </Form.Item>

          <Form.Item
            name="Place"
            label="Place"
            rules={[{ required: true, message: 'Please input place!' }]}
          >
            <Input
              placeholder="Enter place"
              size={window.innerWidth < 576 ? 'middle' : 'large'}
            />
          </Form.Item>

          <Form.Item
            name="state"
            label="State"
            rules={[{ required: true, message: 'Please input state!' }]}
          >
            <Input
              placeholder="Enter state"
              size={window.innerWidth < 576 ? 'middle' : 'large'}
            />
          </Form.Item>

          <Form.Item
            name="University_id"
            label="University"
            rules={[{ required: true, message: 'Please select a university!' }]}
          >
            <Select
              placeholder="Select university"
              loading={universitiesLoading}
              size={window.innerWidth < 576 ? 'middle' : 'large'}
            >
              {universities?.data?.length > 0 ? (
                universities.data.map((uni) => (
                  <Option key={uni.id} value={uni.id}>
                    {uni.University_name || 'Unknown University'}
                  </Option>
                ))
              ) : (
                <Option disabled>No universities available</Option>
              )}
            </Select>
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

      {/* Edit College Modal */}

      <Modal
        title="Edit College"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        destroyOnClose
        width={modalWidth}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="College_name"
            label="College Name"
            rules={[{ required: true, message: 'Please input college name!' }]}
          >
            <Input
              placeholder="Enter college name"
              size={window.innerWidth < 576 ? 'middle' : 'large'}
            />
          </Form.Item>

          <Form.Item
            name="Place"
            label="Place"
            rules={[{ required: true, message: 'Please input place!' }]}
          >
            <Input
              placeholder="Enter place"
              size={window.innerWidth < 576 ? 'middle' : 'large'}
            />
          </Form.Item>

          <Form.Item
            name="state"
            label="State"
            rules={[{ required: true, message: 'Please input state!' }]}
          >
            <Input
              placeholder="Enter state"
              size={window.innerWidth < 576 ? 'middle' : 'large'}
            />
          </Form.Item>

          <Form.Item
            name="University_id"
            label="University"
            rules={[{ required: true, message: 'Please select a university!' }]}
          >
            <Select
              placeholder="Select university"
              loading={universitiesLoading}
              size={window.innerWidth < 576 ? 'middle' : 'large'}
            >
              {universities?.data?.length > 0 ? (
                universities.data.map((uni) => (
                  <Option key={uni.id} value={uni.id}>
                    {uni.University_name || 'Unknown University'}
                  </Option>
                ))
              ) : (
                <Option disabled>No universities available</Option>
              )}
            </Select>
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
              style={{ minHeight: '48px' }}
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