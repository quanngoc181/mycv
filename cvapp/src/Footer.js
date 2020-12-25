import { useLocation } from 'react-router-dom'

export function Footer() {
  const location = useLocation()

  let backgroundColor = '#2f54eb'
  let color = '#fff'
  if (location.pathname === '/my-info' || location.pathname === '/list-cv' || location.pathname === '/create-cv' || location.pathname === '/find-cv' || location.pathname === '/saved-cv') {
    backgroundColor = '#fff'
    color = '#000'
  }

  return (
    <div className='app-footer' style={{ lineHeight: '30px', backgroundColor, color }}>
      <b>&#169; MYCV App 2020</b>
      <span className='right'>DATN 20201</span>
    </div>
  )
}
