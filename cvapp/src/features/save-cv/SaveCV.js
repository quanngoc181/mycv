import { Button, Empty, message } from 'antd'
import TemplateList from '../../templates/TemplateList'
import genderIcon from '../../templates/icon/gender.png'
import dobIcon from '../../templates/icon/dob.png'
import addressIcon from '../../templates/icon/address.png'
import phoneIcon from '../../templates/icon/phone.png'
import './save-cv.css'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { saveCv } from './saveCVSlice'

export function SaveCV() {
  const history = useHistory()
  const dispatch = useDispatch()

  let savedCv = useSelector((state) => state.save.savedCv)

  return (
    <div className='container' style={{ backgroundColor: '#fff', padding: 50, minHeight: 'calc(100vh - 104px)' }}>
      <h1 className='list-name'>
        <span>Danh sách CV đã lưu</span>
      </h1>
      <div className='saved-container'>
        {savedCv.length === 0 && <Empty description='Không có CV nào đã lưu' />}
        {savedCv.map((save, index) => {
          let logo = TemplateList.find((t) => t.id === save.template).logo
          return (
            <div className='saved-item' key={index}>
              <img src={logo} alt='my cv'></img>
              <div className='content'>
                <div className='cv-name'>{save.cvName}</div>
                <div className='fullname'>{save.fullName}</div>
                <div>
                  <img src={genderIcon} alt='gender' className='icon' />
                  {save.gender}
                </div>
                <div>
                  <img src={dobIcon} alt='gender' className='icon' />
                  {save.dob}
                </div>
                <div>
                  <img src={addressIcon} alt='gender' className='icon' />
                  {save.address}
                </div>
                <div>
                  <img src={phoneIcon} alt='gender' className='icon' />
                  {save.phone}
                </div>
                <Button
                  ghost
                  block
                  size='small'
                  style={{ marginTop: 5 }}
                  onClick={() => {
                    if (save.identifier === null) {
                      message.error({ content: 'CV này được cài đặt riêng tư' })
                    } else {
                      history.push('/cvwr/' + save.identifier)
                    }
                  }}
                >
                  Xem CV
                </Button>
                <Button
                  ghost
                  block
                  size='small'
                  style={{ marginTop: 5 }}
                  onClick={() => {
                    dispatch(saveCv({ cvId: save.cvId }))
                  }}
                >
                  Bỏ lưu
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
