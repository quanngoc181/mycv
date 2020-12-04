import { Radio, Tabs } from 'antd'
import React, { useState } from 'react'
import VN from 'antd/es/date-picker/locale/vi_VN'
import coverImage from '../../image/cover-image.jpg'
import './information.css'
import { Profile } from './Profile'
import { PersonalInformation } from './PersonalInformation'
import { ContactInformation } from './ContactInformation'
import { UploadAvatar } from './UploadAvatar'
import { useSelector } from 'react-redux'
import { AdditionalInformation } from './AdditionalInformation'
import { Skill } from './Skill'
import { Scholarship } from './Scholarship'
import { Award } from './Award'
import { Certificate } from './Certificate'
import { Membership } from './Membership'
import { Thesis } from './Thesis'
import { Presentation } from './Presentation'
import { Book } from './Book'
import { Journal } from './Journal'
import { Education } from './Education'
import { Work } from './Work'
import { Project } from './Project'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
}
const tailLayout = {
  wrapperCol: { offset: 6, span: 12 },
}

export function UserInfo() {
  const [language, setLanguage] = useState('vi')
  const info = useSelector((state) => state.info.user)

  const avatar = info ? info.avatar : null
  const avatarUrl = avatar ? avatar : 'default-avatar.png'

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
  }

  return (
    <div className='container p-0' style={{ backgroundColor: '#fff' }}>
      <div className='homepage-region'>
        <img className='cover-image' src={coverImage} alt='Anh bia' />
        <div className='avatar-region'>
          <img className='avatar-image' src={'http://localhost:8080/resources/avatar/' + avatarUrl} alt='Anh dai dien' />
          <UploadAvatar />
        </div>
      </div>

      <div>
        <Radio.Group value={language} onChange={handleLanguageChange} buttonStyle='solid'>
          <Radio.Button className='info-language' value='vi'>
            Tiếng Việt
          </Radio.Button>
          <Radio.Button className='info-language' value='en'>
            English
          </Radio.Button>
        </Radio.Group>
      </div>

      <Tabs className='info-menu' tabPosition='left'>
        <Tabs.TabPane tab='Profile' key='5'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Profile info={info} layout={layout} tailLayout={tailLayout} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Thông tin cá nhân' key='1'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <PersonalInformation info={info} layout={layout} tailLayout={tailLayout} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Thông tin liên hệ' key='2'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <ContactInformation info={info} layout={layout} tailLayout={tailLayout} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Thông tin thêm' key='4'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <AdditionalInformation info={info} layout={layout} tailLayout={tailLayout} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Xuất bản, thuyết trình' key='6'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Tabs defaultActiveKey='61' centered>
              <Tabs.TabPane tab='Sách' key='61'>
                <Book info={info} layout={layout} tailLayout={tailLayout} locale={VN} />
              </Tabs.TabPane>
              <Tabs.TabPane tab='Tạp chí' key='62'>
                <Journal info={info} layout={layout} tailLayout={tailLayout} locale={VN} />
              </Tabs.TabPane>
              <Tabs.TabPane tab='Thuyết trình' key='63'>
                <Presentation info={info} layout={layout} tailLayout={tailLayout} locale={VN} />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Học bổng, tài trợ' key='7'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Scholarship info={info} layout={layout} tailLayout={tailLayout} locale={VN} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Giải thưởng, danh hiệu' key='8'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Award info={info} layout={layout} tailLayout={tailLayout} locale={VN} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Chứng nhận, giấy phép' key='9'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Certificate info={info} layout={layout} tailLayout={tailLayout} locale={VN} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Luận văn, luận án' key='10'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Thesis info={info} layout={layout} tailLayout={tailLayout} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Thành viên tổ chức' key='11'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Membership info={info} layout={layout} tailLayout={tailLayout} locale={VN} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Kỹ năng' key='12'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Skill info={info} layout={layout} tailLayout={tailLayout} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Giáo dục, đào tạo' key='13'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Education info={info} layout={layout} tailLayout={tailLayout} locale={VN} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Kinh nghiệm làm việc' key='14'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Work info={info} layout={layout} tailLayout={tailLayout} locale={VN} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Dự án' key='15'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Project info={info} layout={layout} tailLayout={tailLayout} locale={VN} />
          </div>
        </Tabs.TabPane>
      </Tabs>

      <div style={{ height: 50 }}></div>
    </div>
  )
}
