import React, { useState } from 'react';
import { Button, Form, Input, message, Modal, Table } from 'antd';
import { useQuery } from 'react-query';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useCreateCourses, useDeleteCourses, useUpdateCourses } from '../../utils/courses/hooks';
import { getCoursesData } from '../../utils/Courses/CoursesApi';


function Courses() {
    const { data, isLoading, refetch } = useQuery('getCourses', getCoursesData);
    const { mutate: createCourses, isLoading: creating } = useCreateCourses();
    const { mutate: updateCourses, isLoading: updating } = useUpdateCourses();
    const { mutate: deleteCourses, isLoading: deleting } = useDeleteCourses();

    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentCourses, setCurrentCourses] = useState(null);

    const [form] = Form.useForm();

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title:"Courses Name",
            key:"id",
            dataIndex:"courses_name"
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
                            borderColor: '#1890ff'
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
                            color: '#fff'
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
       setCurrentCourses(record);
        form.setFieldsValue({ 
            courses_name: record.courses_name, 
        });
        setEditModalVisible(true);
    }

    function handleDelete(id) {
        deleteCourses(id, {
            onSuccess: () => {
                message.success('Courses deleted successfully');
                refetch();
            },
            onError: () => {
                message.error('Failed to delete Courses');
            },
        });
    }

    function handleAdd() {
        form.resetFields();
        setCurrentCourses(null);
        setAddModalVisible(true);
    }

    function onFinish(values) {
        if (currentCourses) {
            updateCourses(
                { id: currentCourses.id, data: values },
                {
                    onSuccess: () => {
                        message.success('Courses updated successfully');
                        setEditModalVisible(false);
                        form.resetFields();
                        refetch();
                    },
                    onError: () => {
                        message.error('Failed to update Courses');
                    },
                }
            );
        } else {
            createCourses(values, {
                onSuccess: () => {
                    message.success('Courses created successfully');
                    setAddModalVisible(false);
                    form.resetFields();
                    refetch();
                },
                onError: () => {
                    message.error('Failed to create Courses');
                },
            });
        }
    }

    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <Button  type="primary"  onClick={handleAdd} style={{ backgroundColor: '#52c41a',   borderColor: '#52c41a'}}>
                    Add Courses
                </Button>
            </div>

            <Table columns={columns} dataSource={data?.data} loading={isLoading} rowKey="id" />

            {/* Add Modal */}
            <Modal title="Add courses" visible={addModalVisible} onCancel={() => setAddModalVisible(false)} footer={null} destroyOnClose >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item name="courses_name" label="courses name" rules={[{ required: true, message: 'Please input courses name!' }]}>
                        <Input placeholder="Enter courses name" />
                    </Form.Item>
                   
                    <Form.Item>
                        <Button  type="primary"  htmlType="submit"   loading={creating}   block style={{ backgroundColor: '#52c41a',  borderColor: '#52c41a' }} >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Edit Modal */}
            <Modal title="Edit courses name" visible={editModalVisible}  onCancel={() => setEditModalVisible(false)} footer={null} destroyOnClose >
                <Form form={form} layout="vertical" onFinish={onFinish}>

                    <Form.Item name="courses_name" label="courses name" rules={[{ required: true, message: 'Please input courses name!' }]}>
                        <Input placeholder="Enter courses name" />
                    </Form.Item>
               
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={updating}  block
                            style={{
                                backgroundColor: '#1890ff', 
                                borderColor: '#1890ff'
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

export default Courses;