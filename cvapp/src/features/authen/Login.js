import { useEffect } from 'react'
import { Button, Card, Divider, Form, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import './login.css'
import { loginUser, resetLoginStatus } from './userSlice'

export function Login() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loginForm] = Form.useForm()

  const loginStatus = useSelector((state) => state.user.loginStatus)

  useEffect(() => {
    if (loginStatus === 'success') {
      message.success({ content: 'Thành công' })
      history.push('/')
    } else if (loginStatus === 'error') {
      message.error({ content: 'Thất bại: Tài khoản hoặc mật khẩu không đúng' })
    }
  })
  useEffect(() => {
    return () => {
      dispatch(resetLoginStatus())
    }
  }, [dispatch])

  const onFinish = ({ username, password }) => {
    dispatch(loginUser({ username, password }))
  }

  return (
    <>
      <div className='login-form'>
        <Card>
          <div className='text-center' style={{ marginBottom: 20 }}>
            <Link to='/'>
              <div className='app-logo'>MYCV</div>
            </Link>
          </div>
          <Form form={loginForm} onFinish={onFinish}>
            <Form.Item name='username' rules={[{ required: true, message: 'Hãy nhập tài khoản' }]}>
              <Input placeholder='Tài khoản' />
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message: 'Hãy nhập mật khẩu' }]}>
              <Input.Password placeholder='Mật khẩu' />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' block loading={loginStatus === 'pending'}>
                Đăng nhập
              </Button>
            </Form.Item>
            <Divider />
            <div className='text-center'>
              <Link to='/'>Quên mật khẩu?</Link>
            </div>
            <div className='text-center'>
              <Link to='/register'>Chưa có tài khoản?</Link>
            </div>
          </Form>
        </Card>
      </div>
    </>
  )
}
