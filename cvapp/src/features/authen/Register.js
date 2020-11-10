import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser } from './userSlice'

export function Register() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim())
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value.trim())
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim())
  }

  const handleRepasswordChange = (e) => {
    setRepassword(e.target.value.trim())
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== repassword) return

    dispatch(registerUser({ email, username, password }))

    setEmail('')
    setUsername('')
    setPassword('')
    setRepassword('')
  }

  return (
    <div className='login-form'>
      <Card>
        <Card.Body>
          <div className='text-center' style={{ marginBottom: 20 }}>
            <div className='app-logo'>MYCV</div>
          </div>
          <Form>
            <Form.Group controlId='email'>
              <Form.Control type='email' value={email} onChange={handleEmailChange} placeholder='Email' />
            </Form.Group>
            <Form.Group controlId='username'>
              <Form.Control type='text' value={username} onChange={handleUsernameChange} placeholder='Tài khoản' />
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Control type='password' value={password} onChange={handlePasswordChange} placeholder='Mật khẩu' />
            </Form.Group>
            <Form.Group controlId='repassword'>
              <Form.Control type='password' value={repassword} onChange={handleRepasswordChange} placeholder='Nhập lại mật khẩu' />
            </Form.Group>
            <Button variant='primary' className='w-100' type='submit' onClick={handleSubmit}>
              Đăng ký
            </Button>
            <hr />
            <div className='text-center'>
              <Link to='/login'>Đã có tài khoản?</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
