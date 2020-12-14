import { Button, Card, Divider, Form, Input, message } from 'antd'
import { Link, useParams } from 'react-router-dom'
import './login.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { resetPassword, resetResetStatus } from './userSlice'

export function ResetPassword() {
  let { rpt } = useParams()
  const dispatch = useDispatch()

  const resetStatus = useSelector((state) => state.user.resetStatus)
  const resetError = useSelector((state) => state.user.resetError)

  useEffect(() => {
    if (resetStatus === 'success') {
      message.success({ content: 'Thành công' })
    } else if (resetStatus === 'error') {
      message.error({ content: 'Thất bại: ' + resetError })
    }
  })
  useEffect(() => {
    return () => {
      dispatch(resetResetStatus())
    }
  }, [dispatch])

  const onFinish = ({ newpassword }) => {
    dispatch(resetPassword({ newpassword, token: rpt }))
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
              <Button type='primary' htmlType='submit' block loading={resetStatus === 'pending'}>
                Đặt lại mật khẩu
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
