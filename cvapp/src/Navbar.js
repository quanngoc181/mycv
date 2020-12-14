import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { fetchInfo, resetUser } from './features/information/infoSlice'
import { fetchUser, resetToken } from './features/authen/userSlice'
import './navbar.css'
import { Dropdown, Menu } from 'antd'
import { CaretDownFilled } from '@ant-design/icons'
import { fetchCv } from './features/list-cv/listCVSlice'

export function NavBar() {
  const history = useHistory()
  const dispatch = useDispatch()
  const info = useSelector((state) => state.info.viUser)
  const user = useSelector((state) => state.user.user)

  const words = info ? info.fullName.split(' ') : null
  const lastName = words ? words[words.length - 1] : null

  const avatar = info ? info.avatar : null
  const avatarUrl = avatar ? avatar : 'default-avatar.png'

  useEffect(() => {
    dispatch(fetchUser())
    dispatch(fetchInfo())
    dispatch(fetchCv())
  }, [dispatch])

  const logoutHandler = () => {
    dispatch(resetToken())
    dispatch(resetUser())
    history.push('/login')
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={logoutHandler}>Đăng xuất</Menu.Item>
      <Menu.Item>
        <Link to='/change-password'>Đổi mật khẩu</Link>
      </Menu.Item>
    </Menu>
  )

  let rightNav, centerNav
  if (info === null) {
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
    if (user && user.role === 'EMPLOYER')
      centerNav = (
        <div className='my-nav mr-auto ml-auto'>
          <Link to='/my-info'>
            <div className='my-nav-link'>Admin</div>
          </Link>
        </div>
      )
    else if (user && user.role === 'EMPLOYEE')
      centerNav = (
        <div className='my-nav mr-auto ml-auto'>
          {/* <Link to='/todos'>
            <div className='my-nav-link'>Todo</div>
          </Link> */}
          <Link to='/my-info'>
            <div className='my-nav-link'>Thông tin</div>
          </Link>
          <Link to='/list-cv'>
            <div className='my-nav-link'>Quản lý CV</div>
          </Link>
        </div>
      )
    else centerNav = <div className='my-nav mr-auto ml-auto'></div>

    rightNav = (
      <div className='my-nav'>
        <img src={'http://localhost:8080/resources/avatar/' + avatarUrl} className='nav-avatar' alt='Avatar' />
        <div className='my-nav-link'>{lastName}</div>
        <Dropdown overlay={menu} placement='bottomRight' trigger={['click']}>
          <div className='my-nav-link'>
            <CaretDownFilled />
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
