import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { fetchInfo, resetUser } from './features/information/infoSlice'
import { fetchUser, resetToken } from './features/authentication/userSlice'
import './navbar.css'
import { Dropdown, Menu } from 'antd'
import { CaretDownFilled } from '@ant-design/icons'
import { fetchCv } from './features/list-cv/listCVSlice'
import { fetchSaved } from './features/save-cv/saveCVSlice'

export function NavBar() {
  const history = useHistory()
  const dispatch = useDispatch()
  const info = useSelector((state) => state.info.viInfo)
  const user = useSelector((state) => state.user.user)

  const fullName = info ? info.fullName : null
  const avatar = info ? info.avatar : null

  useEffect(() => {
    dispatch(fetchUser())
    dispatch(fetchInfo())
    dispatch(fetchCv())
    dispatch(fetchSaved())
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
          <Link to='/find-cv'>
            <div className='my-nav-link'>Tìm kiếm CV</div>
          </Link>
          <Link to='/saved-cv'>
            <div className='my-nav-link'>CV đã lưu</div>
          </Link>
        </div>
      )
    else if (user && user.role === 'EMPLOYEE')
      centerNav = (
        <div className='my-nav mr-auto ml-auto'>
          <Link to='/my-info'>
            <div className='my-nav-link'>Cập nhật thông tin</div>
          </Link>
          <Link to='/list-cv'>
            <div className='my-nav-link'>Quản lý CV</div>
          </Link>
        </div>
      )
    else centerNav = <div className='my-nav mr-auto ml-auto'></div>

    rightNav = (
      <div className='my-nav'>
        <img src={'http://localhost:8080/resources/avatar/' + avatar} className='nav-avatar' alt='Avatar' />
        <div className='my-nav-link'>{fullName}</div>
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
