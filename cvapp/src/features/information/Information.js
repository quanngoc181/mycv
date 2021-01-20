import { Card, Col, message, Radio, Row, Tabs } from 'antd'
import React, { useEffect } from 'react'
import VI from 'antd/es/date-picker/locale/vi_VN'
import EN from 'antd/es/date-picker/locale/en_US'
import '../../css/information.css'
import { Profile } from './Profile'
import { PersonalInformation } from './PersonalInformation'
import { ContactInformation } from './ContactInformation'
import { UploadAvatar } from './UploadAvatar'
import { useDispatch, useSelector } from 'react-redux'
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
import { resetStatus, updateLanguage } from './infoSlice'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

export function Information() {
  const dispatch = useDispatch()
  const viInfo = useSelector((state) => state.info.viInfo)
  const enInfo = useSelector((state) => state.info.enInfo)
  const language = useSelector((state) => state.info.language)
  const updateStatus = useSelector((state) => state.info.updateStatus)

  let info = language === 'vi' ? viInfo : enInfo
  let locale = language === 'vi' ? VI : EN

  useEffect(() => {
    if (updateStatus === 'success') {
      message.success({ content: 'Thành công' })
    } else if (updateStatus === 'error') {
      message.error({ content: 'Thất bại' })
    }
  }, [updateStatus])

  useEffect(() => {
    return () => {
      dispatch(resetStatus())
    }
  }, [dispatch])

  if (info === null) return null

  const handleLanguageChange = (e) => {
    dispatch(updateLanguage({ language: e.target.value }))
  }

  return (
    <Row>
      <Col span={8}>
        <div style={{ padding: 15 }}>
          <Card size='small' hoverable style={{ marginBottom: 15 }}>
            <div className='avatar-region'>
              <img className='avatar-image' src={'http://localhost:8080/resources/avatar/' + info.avatar} alt='Anh dai dien' />
              <UploadAvatar />
            </div>
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <Radio.Group value={language} onChange={handleLanguageChange} buttonStyle='solid'>
                <Radio.Button className='info-language' value='vi'>
                  Tiếng Việt
                </Radio.Button>
                <Radio.Button className='info-language' value='en'>
                  English
                </Radio.Button>
              </Radio.Group>
            </div>
          </Card>
          <Card size='small' title='Profile' hoverable style={{ marginBottom: 15 }}>
            <Profile info={info} layout={layout} tailLayout={tailLayout} updateStatus={updateStatus} />
          </Card>
          <Card size='small' title='Thông tin cá nhân' hoverable style={{ marginBottom: 15 }}>
            <PersonalInformation info={info} layout={layout} tailLayout={tailLayout} locale={locale} language={language} updateStatus={updateStatus} />
          </Card>
          <Card size='small' title='Thông tin liên hệ' hoverable style={{ marginBottom: 15 }}>
            <ContactInformation info={info} layout={layout} tailLayout={tailLayout} updateStatus={updateStatus} />
          </Card>
          <Card size='small' title='Thông tin thêm' hoverable>
            <AdditionalInformation info={info} layout={layout} tailLayout={tailLayout} updateStatus={updateStatus} />
          </Card>
        </div>
      </Col>
      <Col span={8}>
        <div style={{ padding: 15 }}>
          <Card size='small' title='Kỹ năng' hoverable style={{ marginBottom: 15 }}>
            <Skill info={info} layout={layout} tailLayout={tailLayout} updateStatus={updateStatus} />
          </Card>
          <Card size='small' title='Xuất bản, thuyết trình' hoverable style={{ marginBottom: 15 }}>
            <Tabs defaultActiveKey='61' centered>
              <Tabs.TabPane tab='Sách' key='61'>
                <Book info={info} layout={layout} tailLayout={tailLayout} updateStatus={updateStatus} locale={locale} />
              </Tabs.TabPane>
              <Tabs.TabPane tab='Tạp chí' key='62'>
                <Journal info={info} layout={layout} tailLayout={tailLayout} updateStatus={updateStatus} locale={locale} />
              </Tabs.TabPane>
              <Tabs.TabPane tab='Thuyết trình' key='63'>
                <Presentation info={info} layout={layout} tailLayout={tailLayout} updateStatus={updateStatus} locale={locale} />
              </Tabs.TabPane>
            </Tabs>
          </Card>
          <Card size='small' title='Giải thưởng, danh hiệu' hoverable style={{ marginBottom: 15 }}>
            <Award info={info} layout={layout} tailLayout={tailLayout} updateStatus={updateStatus} locale={locale} />
          </Card>
          <Card size='small' title='Chứng nhận, giấy phép' hoverable style={{ marginBottom: 15 }}>
            <Certificate info={info} layout={layout} tailLayout={tailLayout} updateStatus={updateStatus} locale={locale} />
          </Card>
          <Card size='small' title='Học bổng, tài trợ' hoverable>
            <Scholarship info={info} layout={layout} tailLayout={tailLayout} updateStatus={updateStatus} locale={locale} />
          </Card>
        </div>
      </Col>
      <Col span={8}>
        <div style={{ padding: 15 }}>
          <Card size='small' title='Giáo dục, đào tạo' hoverable style={{ marginBottom: 15 }}>
            <Education info={info} layout={layout} tailLayout={tailLayout} locale={locale} language={language} updateStatus={updateStatus} />
          </Card>
          <Card size='small' title='Kinh nghiệm làm việc' hoverable style={{ marginBottom: 15 }}>
            <Work info={info} layout={layout} tailLayout={tailLayout} locale={locale} language={language} updateStatus={updateStatus} />
          </Card>
          <Card size='small' title='Dự án' hoverable style={{ marginBottom: 15 }}>
            <Project info={info} layout={layout} tailLayout={tailLayout} locale={locale} language={language} updateStatus={updateStatus} />
          </Card>
          <Card size='small' title='Thành viên tổ chức' hoverable style={{ marginBottom: 15 }}>
            <Membership info={info} layout={layout} tailLayout={tailLayout} locale={locale} language={language} updateStatus={updateStatus} />
          </Card>
          <Card size='small' title='Luận văn, luận án' hoverable>
            <Thesis info={info} layout={layout} tailLayout={tailLayout} updateStatus={updateStatus} />
          </Card>
        </div>
      </Col>
    </Row>
  )
}
