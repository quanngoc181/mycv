import { Button, Card, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser } from './userSlice'

export function Register() {
  const dispatch = useDispatch()
  const [registerForm] = Form.useForm()

  const onFinish = ({ firstName, lastName, email, username, password }) => {
    dispatch(registerUser({ firstName, lastName, email, username, password }))

    registerForm.resetFields()
  }

  return (
    <div className='login-form'>
      <Card>
        <div className='text-center' style={{ marginBottom: 20 }}>
          <Link to='/'>
            <div className='app-logo'>MYCV</div>
          </Link>
        </div>
        <Form form={registerForm} onFinish={onFinish}>
          <Form.Item name='firstName' rules={[{ required: true, message: 'Hãy nhập họ' }]}>
            <Input type='text' placeholder='Họ' />
          </Form.Item>
          <Form.Item name='lastName' rules={[{ required: true, message: 'Hãy nhập tên' }]}>
            <Input type='text' placeholder='Tên' />
          </Form.Item>
          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Hãy nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input type='email' placeholder='Email' />
          </Form.Item>
          <Form.Item
            name='username'
            rules={[
              { required: true, message: 'Hãy nhập tài khoản' },
              { min: 8, message: 'Tài khoản chứa ít nhất 8 kí tự' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: 'Tài khoản chứa ký tự không hợp lệ' },
            ]}
          >
            <Input type='text' placeholder='Tài khoản' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              { required: true, message: 'Hãy nhập mật khẩu' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: 'Mật khẩu chứa ký tự không hợp lệ' },
            ]}
          >
            <Input type='password' placeholder='Mật khẩu' />
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
            <Input type='password' placeholder='Nhập lại mật khẩu' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Đăng ký
            </Button>
          </Form.Item>
          <hr />
          <div className='text-center'>
            <Link to='/login'>Đã có tài khoản?</Link>
          </div>
        </Form>
      </Card>
    </div>
  )
}
