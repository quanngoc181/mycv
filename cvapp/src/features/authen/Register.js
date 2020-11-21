import { Button, Card, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser } from './userSlice'

export function Register() {
  const dispatch = useDispatch()
  const [registerForm] = Form.useForm()

  const onFinish = (values) => {
    let firstname = values.firstname.trim()
    let lastname = values.lastname.trim()
    let email = values.email.trim()
    let username = values.username.trim()
    let password = values.password.trim()
    let repassword = values.repassword.trim()

    if (password !== repassword) return

    dispatch(registerUser({ firstname, lastname, email, username, password }))

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
          <Form.Item name='firstname'>
            <Input type='text' placeholder='Họ và tên đệm' />
          </Form.Item>
          <Form.Item name='lastname'>
            <Input type='text' placeholder='Tên' />
          </Form.Item>
          <Form.Item name='email'>
            <Input type='email' placeholder='Email' />
          </Form.Item>
          <Form.Item name='username'>
            <Input type='text' placeholder='Tài khoản' />
          </Form.Item>
          <Form.Item name='password'>
            <Input type='password' placeholder='Mật khẩu' />
          </Form.Item>
          <Form.Item name='repassword'>
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
