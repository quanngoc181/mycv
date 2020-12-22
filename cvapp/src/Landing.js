import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Particles from 'react-particles-js'
import './landing.css'

export function Landing() {
  const info = useSelector((state) => state.info.viUser)
  const user = useSelector((state) => state.user.user)

  let action
  let paragraph = 'MYCV có kho template phong phú, giúp bạn tự tạo ra Curriculum Vitae chuyên nghiệp, đẹp mắt một cách nhanh chóng, dễ dàng. Bạn có thể lưu lại CV, chia sẻ với bạn bè và tải về máy tính của bạn.'

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
    if (user && user.role === 'EMPLOYER') {
      action = (
        <div className='landing-action'>
          <Link to='/find-cv'>
            <button className='landing-button'>Tìm kiếm CV</button>
          </Link>
          <Link to='/saved-cv'>
            <button className='landing-button'>CV đã lưu</button>
          </Link>
        </div>
      )

      paragraph = 'Chào mừng nhà tuyển dụng đến với MYCV. Hãy bắt đầu tìm kiếm CV để tìm ra các ứng viên chất lượng nhất trong hàng ngàn ứng viên, đánh giá CV và liên hệ ngay nào. Nhớ lưu lại các đổi tượng trong tầm ngắm nhé.'
    } else if (user && user.role === 'EMPLOYEE') {
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
    } else action = null
  }

  return (
    <div className='landing-page text-center'>
      <Particles />
      <div className='landing-container'>
        <div className='app-logo'>MYCV</div>
        <div className='landing-text'>{paragraph}</div>
        {action}
      </div>
    </div>
  )
}
