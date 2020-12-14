import { Button, Card, Divider, Form, Input, message } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './login.css'
import { changePassword, resetPasswordStatus } from './userSlice'

export function ChangePassword() {
  const dispatch = useDispatch()

  const passwordStatus = useSelector((state) => state.user.passwordStatus)
  const passwordError = useSelector((state) => state.user.passwordError)

  useEffect(() => {
    if (passwordStatus === 'success') {
      message.success({ content: 'Thành công' })
    } else if (passwordStatus === 'error') {
      message.error({ content: 'Thất bại: ' + passwordError })
    }
  })
  useEffect(() => {
    return () => {
      dispatch(resetPasswordStatus())
    }
  }, [dispatch])

  const onFinish = ({ oldpassword, newpassword }) => {
    dispatch(changePassword({ oldpassword, newpassword }))
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
          <Form onFinish={onFinish}>
            <Form.Item name='oldpassword' rules={[{ required: true, message: 'Hãy nhập mật khẩu cũ' }]}>
              <Input.Password placeholder='Mật khẩu cũ' />
            </Form.Item>
            <Form.Item
              name='newpassword'
              rules={[
                { required: true, message: 'Hãy nhập mật khẩu mới' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: 'Mật khẩu chứa ký tự không hợp lệ' },
              ]}
            >
              <Input.Password placeholder='Mật khẩu mới' />
            </Form.Item>
            <Form.Item
              name='repassword'
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập lại mật khẩu mới',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('newpassword') === value) return Promise.resolve()
                    return Promise.reject('Mật khẩu nhập lại không trùng khớp')
                  },
                }),
              ]}
            >
              <Input.Password placeholder='Nhập lại mật khẩu mới' />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' block loading={passwordStatus === 'pending'}>
                Đổi mật khẩu
              </Button>
            </Form.Item>
            <Divider />
            <div className='text-center'>
              <Link to='/login'>Tới trang đăng nhập</Link>
            </div>
          </Form>
        </Card>
      </div>
    </>
  )
}
