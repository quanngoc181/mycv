import { Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './login.css'

export function Login() {
  return (
    <div className='login-form'>
      <Card>
        <Card.Body>
          <div className='text-center' style={{ marginBottom: 20 }}>
            <div className='app-logo'>MYCV</div>
          </div>
          <Form>
            <Form.Group controlId='username'>
              <Form.Control type='text' placeholder='Tài khoản' />
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Control type='password' placeholder='Mật khẩu' />
            </Form.Group>
            <Button variant='primary' className='w-100' type='submit'>
              Đăng nhập
            </Button>
            <hr />
            <div className='text-center'>
              <Link to='/'>Quên mật khẩu?</Link>
            </div>
            <div className='text-center'>
              <Link to='/'>Chưa có tài khoản?</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
