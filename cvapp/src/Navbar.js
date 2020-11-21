import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { fetchAccount, logout } from './features/authen/userSlice'
import './navbar.css'
import defaultAvatar from './image/default-avatar.png'
import { Dropdown, Menu } from 'antd'
import { CaretDownFilled } from '@ant-design/icons'

export function NavBar() {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    dispatch(fetchAccount())
  }, [dispatch])

  const logoutHandler = () => {
    dispatch(logout())
    history.push('/login')
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={logoutHandler}>Đăng xuất</Menu.Item>
    </Menu>
  )

  let rightNav, centerNav
  if (user === null) {
    centerNav = <div className='my-nav mr-auto ml-auto'></div>
    rightNav = (
      <div className='my-nav'>
        <Link to='/login'>
          <div className='my-nav-link'>Đăng nhập</div>
        </Link>
        <Link to='/register'>
          <div className='my-nav-link'>Đăng ký</div>
        </Link>
      </div>
    )
  } else {
    centerNav = (
      <div className='my-nav mr-auto ml-auto'>
        <Link to='/todos'>
          <div className='my-nav-link'>Todo</div>
        </Link>
      </div>
    )
    rightNav = (
      <div className='my-nav'>
        <img src={defaultAvatar} className='nav-avatar' alt='Avatar' />
        <div className='my-nav-link'>{user.lastName}</div>
        <Dropdown overlay={menu} placement='bottomRight' trigger={['click']}>
          <div className='my-nav-link'>
            <CaretDownFilled style={{ verticalAlign: 1 }} />
          </div>
        </Dropdown>
      </div>
    )
  }

  return (
    <>
      <div className='my-navbar'>
        <div className='my-navbar-brand'>
          <Link to='/'>
            <div className='app-logo' style={{ fontSize: 30 }}>
              MYCV
            </div>
          </Link>
        </div>
        {centerNav}
        {rightNav}
      </div>
    </>
  )
}
