import { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import './login.css'
import { loginUser } from './userSlice'

export function Login() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginStatus = useSelector(state => state.user.loginStatus)

  useEffect(() => {
    if(loginStatus === 'success') history.push('/')
  }, [history, loginStatus])

  const handleUsernameChange = (e) => {
    setUsername(e.target.value.trim())
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username && password) {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div className='login-form'>
      <Card>
        <Card.Body>
          <div className='text-center' style={{ marginBottom: 20 }}>
            <Link to='/'>
              <div className='app-logo'>MYCV</div>
            </Link>
          </div>
          <Form>
            <Form.Group controlId='username'>
              <Form.Control type='text' value={username} onChange={handleUsernameChange} placeholder='Tài khoản' />
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Control type='password' value={password} onChange={handlePasswordChange} placeholder='Mật khẩu' />
            </Form.Group>
            <Button variant='primary' className='w-100' type='submit' onClick={handleSubmit}>
              Đăng nhập
            </Button>
            <hr />
            <div className='text-center'>
              <Link to='/'>Quên mật khẩu?</Link>
            </div>
            <div className='text-center'>
              <Link to='/register'>Chưa có tài khoản?</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
