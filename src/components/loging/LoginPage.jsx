import React, { useState } from 'react';
import { Form, Input, Button, Alert, Typography, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useCreateAppLogin } from '../../utils/loging/hooks';
import Cookies from "js-cookie";
import { data, useNavigate } from 'react-router-dom';

const { Title } = Typography;

const LoginPage = () => {
  const [error, setError] = useState('');
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { mutateAsync: createLogin, isLoading: isSubmitting } = useCreateAppLogin();

  const handleSubmit = async (values) => {
    setError('');
    try {
      const response = await createLogin({
        email: values.email,
        password: values.password,
      });

      console.log('Login successful:', response);

      if (response && response.data && response.data.token) {

        const accessToken = response.data.token.access;
        const refreshToken = response.data.token.refresh;

        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", refreshToken);

        navigate('/');
        
        console.log(data)
      } 
      
      else {

        setError('Login failed. Unexpected response from server.');
        console.error('Login error: Invalid response structure', response);

      }

    } catch (err) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: 'url("https://source.unsplash.com/random/1920x1080")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundColor: '#f0f2f5' }}>
      <Card style={{ width: '100%', maxWidth: 400, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '16px', borderRadius: '8px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24, fontSize: 'clamp(20px, 5vw, 24px)' }}>
          Login
        </Title>

        {error && (
          <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />
        )}

        <Form form={form} name="login" onFinish={handleSubmit} layout="vertical" autoComplete="off">
          <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}>
            <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting} block size="large">
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </Button>
          </Form.Item>

 
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;