import { CameraOutlined } from '@ant-design/icons'
import { Button, Radio, Tabs } from 'antd'
import React, { useState } from 'react'
import coverImage from '../../image/cover-image.jpg'
import defaultAvatar from '../../image/default-avatar.png'
import './information.css'

export function UserInfo() {
  const [language, setLanguage] = useState('vi')

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
  }

  return (
    <div className='container p-0' style={{ backgroundColor: '#fff' }}>
      <div className='homepage-region'>
        <img className='cover-image' src={coverImage} alt='Anh bia' />
        <div className='avatar-region'>
          <img className='avatar-image' src={defaultAvatar} alt='Anh dai dien' />
          <Button className='change-avatar' shape='circle' icon={<CameraOutlined />} />
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
        <Tabs.TabPane tab='Thông tin cá nhân' key='1'>
          <div style={{ padding: '16px 24px 16px 0' }}>Content 1</div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Thông tin liên hệ' key='2'>
          <div style={{ padding: '16px 24px 16px 0' }}>Content 2</div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Thông tin thêm' key='3'>
          <div style={{ padding: '16px 24px 16px 0' }}>Content 3</div>
        </Tabs.TabPane>
      </Tabs>

      <div style={{ height: 50 }}></div>
    </div>
  )
}
