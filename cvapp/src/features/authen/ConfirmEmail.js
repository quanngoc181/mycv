import { useEffect } from 'react'
import { Card, Result } from 'antd'
import { Link, useParams } from 'react-router-dom'
import './login.css'
import { useDispatch, useSelector } from 'react-redux'
import { confirmEmail } from './userSlice'

export function ConfirmEmail() {
  let { cet } = useParams()
  const dispatch = useDispatch()

  const confirmStatus = useSelector((state) => state.user.confirmStatus)

  useEffect(() => {
    dispatch(confirmEmail({ cet }))
  }, [dispatch, cet])

  if (confirmStatus !== 'success') return null

  return (
    <>
      <div className='login-form'>
        <Card>
          <div className='text-center' style={{ marginBottom: 20 }}>
            <Link to='/'>
              <div className='app-logo'>MYCV</div>
            </Link>
          </div>
          <Result status='success' title='Xác nhận email thành công!' subTitle='Vui lòng tiếp tục đăng nhập và sử dụng dịch vụ.' style={{ padding: 0 }} />
        </Card>
      </div>
    </>
  )
}
