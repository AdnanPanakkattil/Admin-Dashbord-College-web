

import React, { useState } from 'react';
import { Button, Form, Input, message, Modal, Table } from 'antd';
import { useQuery } from 'react-query';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useCreateUniversityCourses, useDeleteUniversityCourses, useUpdateUniversityCourses } from '../../utils/UniversityCourses/hooks';
import { getUniversityCoursesData } from '../../utils/UniversityCourses/UniversityCoursesApi';


function UniversityCourses() {
    const { data, isLoading, refetch } = useQuery('getUniversityCourses', getUniversityCoursesData);
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
            title:"course id",
            key:"id",
            dataIndex:"course_id"
        },
        {
            title:"University id",
            key:"id",
            dataIndex:"University_id"
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
       setCurrentUniversityCourses(record);
        form.setFieldsValue({ 
            UniversityCourses_name: record.UniversityCourses_name, 
        });
        setEditModalVisible(true);
    }

    function handleDelete(id) {
        deleteUniversityCourses(id, {
            onSuccess: () => {
                message.success('UniversityCourses deleted successfully');
                refetch();
            },
            onError: () => {
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
        if (currentUniversityCourses) {
            updateUniversityCourses(
                { id: currentUniversityCourses.id, data: values },
                {
                    onSuccess: () => {
                        message.success('UniversityCourses updated successfully');
                        setEditModalVisible(false);
                        form.resetFields();
                        refetch();
                    },
                    onError: () => {
                        message.error('Failed to update UniversityCourses');
                    },
                }
            );
        } else {
            createUniversityCourses(values, {
                onSuccess: () => {
                    message.success('UniversityCourses created successfully');
                    setAddModalVisible(false);
                    form.resetFields();
                    refetch();
                },
                onError: () => {
                    message.error('Failed to create UniversityCourses');
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
                        borderColor: '#52c41a'
                    }}
                >
                    Add UniversityCourses
                </Button>
            </div>

            <Table columns={columns} dataSource={data?.data} loading={isLoading} rowKey="id" />

            {/* Add Modal */}
            <Modal
                title="Add UniversityCourses"
                visible={addModalVisible}
                onCancel={() => setAddModalVisible(false)}
                footer={null}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="course_id"
                        label="course id"
                        rules={[{ required: true, message: 'Please input Ucourse id !' }]}
                    >
                        <Input placeholder="Enter course id name" />
                    </Form.Item>
                    <Form.Item
                        name="University_id"
                        label="University id"
                        rules={[{ required: true, message: 'Please input University id!' }]}
                    >
                        <Input placeholder="Enter University id name" />
                    </Form.Item>
                   
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            loading={creating} 
                            block
                            style={{
                                backgroundColor: '#52c41a', 
                                borderColor: '#52c41a'
                            }}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

        {/* edit       */}
        
            <Modal
                title="Edit course id"
                visible={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                footer={null}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="course_id"
                        label="course id"
                        rules={[{ required: true, message: 'Please input course id!' }]}
                    >
                        <Input placeholder="Enter course id" />
                    </Form.Item>

                    <Form.Item
                        name="University_id"
                        label="University id"
                        rules={[{ required: true, message: 'Please input University id!' }]}
                    >
                        <Input placeholder="Enter course id" />
                    </Form.Item>
               
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            loading={updating} 
                            block
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

export default UniversityCourses;