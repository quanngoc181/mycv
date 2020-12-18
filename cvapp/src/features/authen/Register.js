import { Button, Card, Checkbox, Divider, Form, Input, message, notification } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser, resetRegisterStatus } from './userSlice'

export function Register() {
  const dispatch = useDispatch()
  const [registerForm] = Form.useForm()

  const registerStatus = useSelector((state) => state.user.registerStatus)
  const registerError = useSelector((state) => state.user.registerError)

  useEffect(() => {
    if (registerStatus === 'success') {
      message.success({ content: 'Thành công' })
      notification['success']({
        duration: 10,
        message: 'Đăng ký thành công',
        description: 'Bạn đã đăng ký thành công tài khoản trên MYCV, vui lòng kiểm tra email để xác nhận tài khoản.',
      })
    } else if (registerStatus === 'error') {
      message.error({ content: 'Thất bại: ' + registerError })
    }
  })
  useEffect(() => {
    return () => {
      dispatch(resetRegisterStatus())
    }
  }, [dispatch])

  const onFinish = (values) => {
    if (values.isCompany) values.role = 'EMPLOYER'
    else values.role = 'EMPLOYEE'
    dispatch(registerUser(values))
  }

  return (
    <div style={{height: '100vh', backgroundColor: '#2f54eb'}}>
      <div className='login-form'>
        <Card>
          <div className='text-center' style={{ marginBottom: 20 }}>
            <Link to='/'>
              <div className='app-logo'>MYCV</div>
            </Link>
          </div>
          <Form form={registerForm} onFinish={onFinish}>
            <Form.Item name='fullName' rules={[{ required: true, message: 'Hãy nhập họ tên' }]}>
              <Input placeholder='Họ tên' />
            </Form.Item>
            <Form.Item
              name='email'
              rules={[
                { required: true, message: 'Hãy nhập email' },
                { type: 'email', message: 'Email không hợp lệ' },
              ]}
            >
              <Input placeholder='Email' />
            </Form.Item>
            <Form.Item
              name='username'
              rules={[
                { required: true, message: 'Hãy nhập tài khoản' },
                { min: 8, message: 'Tài khoản chứa ít nhất 8 kí tự' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: 'Tài khoản chứa ký tự không hợp lệ' },
              ]}
            >
              <Input placeholder='Tài khoản' />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                { required: true, message: 'Hãy nhập mật khẩu' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: 'Mật khẩu chứa ký tự không hợp lệ' },
              ]}
            >
              <Input.Password placeholder='Mật khẩu' />
            </Form.Item>
            <Form.Item
              name='repassword'
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập lại mật khẩu',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) return Promise.resolve()
                    return Promise.reject('Mật khẩu nhập lại không trùng khớp')
                  },
                }),
              ]}
            >
              <Input.Password placeholder='Nhập lại mật khẩu' />
            </Form.Item>
            <Form.Item name='isCompany' valuePropName='checked'>
              <Checkbox>Tôi là nhà tuyển dụng</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' block loading={registerStatus === 'pending'}>
                Đăng ký
              </Button>
            </Form.Item>
            <Divider />
            <div className='text-center'>
              <Link to='/login'>Đã có tài khoản?</Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  )
}
