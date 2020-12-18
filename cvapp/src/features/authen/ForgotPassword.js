import { Button, Card, Divider, Form, Input, message, notification } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './login.css'
import { forgotPassword, resetForgotStatus } from './userSlice'

export function ForgotPassword() {
  const dispatch = useDispatch()

  const forgotStatus = useSelector((state) => state.user.forgotStatus)
  const forgotError = useSelector((state) => state.user.forgotError)

  useEffect(() => {
    if (forgotStatus === 'success') {
      message.success({ content: 'Thành công' })
      notification['success']({
        duration: 10,
        message: 'Thao tác thành công',
        description: 'Chúng tôi đã gửi cho bạn email hướng dẫn, vui lòng kiểm tra email để lấy lại mật khẩu.',
      })
    } else if (forgotStatus === 'error') {
      message.error({ content: 'Thất bại: ' + forgotError })
    }
  })
  useEffect(() => {
    return () => {
      dispatch(resetForgotStatus())
    }
  }, [dispatch])

  const onFinish = ({ username }) => {
    dispatch(forgotPassword({ username }))
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
          <Form onFinish={onFinish}>
            <Form.Item name='username' rules={[{ required: true, message: 'Hãy nhập tài khoản' }]}>
              <Input placeholder='Tài khoản' />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' block loading={forgotStatus === 'pending'}>
                Lấy lại mật khẩu
              </Button>
            </Form.Item>
            <Divider />
            <div className='text-center'>
              <Link to='/login'>Tới trang đăng nhập</Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  )
}
