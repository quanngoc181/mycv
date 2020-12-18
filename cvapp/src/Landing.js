import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Particles from 'react-particles-js'
import './landing.css'

export function Landing() {
  const info = useSelector((state) => state.info.viUser)

  let action
  if (info === null) {
    action = (
      <div className='landing-action'>
        <Link to='/login'>
          <button className='landing-button'>Đăng nhập</button>
        </Link>
        <Link to='/register'>
          <button className='landing-button'>Đăng ký</button>
        </Link>
      </div>
    )
  } else {
    action = (
      <div className='landing-action'>
        <Link to='/my-info'>
          <button className='landing-button'>Thông tin</button>
        </Link>
        <Link to='/list-cv'>
          <button className='landing-button'>CV của tôi</button>
        </Link>
      </div>
    )
  }

  return (
    <div className='landing-page text-center'>
      <Particles />
      <div className='landing-container'>
        <div className='app-logo'>MYCV</div>
        <div className='landing-text'>MYCV có kho template phong phú, giúp bạn tự tạo ra Curriculum Vitae chuyên nghiệp, đẹp mắt một cách nhanh chóng, dễ dàng. Bạn có thể lưu lại CV, chia sẻ với bạn bè và tải về máy tính của bạn.</div>
        {action}
      </div>
    </div>
  )
}
