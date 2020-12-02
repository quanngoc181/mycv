import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Radio, Tabs, Form, Input, DatePicker, InputNumber } from 'antd'
import React, { useState } from 'react'
import VN from 'antd/es/date-picker/locale/vi_VN'
import coverImage from '../../image/cover-image.jpg'
import defaultAvatar from '../../image/default-avatar.png'
import './information.css'
import { Profile } from './Profile'
import { PersonalInformation } from './PersonalInformation'
import { ContactInformation } from './ContactInformation'
import { UploadAvatar } from './UploadAvatar'
import { useSelector } from 'react-redux'
import { AdditionalInformation } from './AdditionalInformation'
import { Skill } from './Skill'
import { Scholarship } from './Scholarship'

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
  const avatarUrl = avatar ? 'data:image/png;base64,' + avatar : defaultAvatar

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
  }

  return (
    <div className='container p-0' style={{ backgroundColor: '#fff' }}>
      <div className='homepage-region'>
        <img className='cover-image' src={coverImage} alt='Anh bia' />
        <div className='avatar-region'>
          <img className='avatar-image' src={avatarUrl} alt='Anh dai dien' />
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
                <Form {...layout}>
                  <Form.List name='authors'>
                    {(fields, { add, remove }) => (
                      <>
                        <Form.Item {...layout} label={'Tác giả'} required={false}>
                          <Form.Item noStyle>
                            <Input style={{ width: 'calc(100% - 40px)' }} />
                          </Form.Item>
                          <PlusCircleOutlined className='dynamic-delete-button' onClick={() => add()} />
                        </Form.Item>
                        {fields.map((field) => (
                          <Form.Item {...tailLayout} label={''} required={false} key={field.key}>
                            <Form.Item {...field} noStyle>
                              <Input style={{ width: 'calc(100% - 40px)' }} />
                            </Form.Item>
                            <MinusCircleOutlined className='dynamic-delete-button' onClick={() => remove(field.name)} />
                          </Form.Item>
                        ))}
                      </>
                    )}
                  </Form.List>

                  <Form.Item label='Tiêu đề' name='title'>
                    <Input />
                  </Form.Item>

                  <Form.Item label='Nhà xuất bản' name='publisher'>
                    <Input />
                  </Form.Item>

                  <Form.Item label='Năm xuất bản' name='year'>
                    <DatePicker locale={VN} picker='year' />
                  </Form.Item>

                  <Form.Item label='Nơi xuất bản' name='location'>
                    <Input />
                  </Form.Item>

                  <Form.Item label='Định dạng' name='format'>
                    <Radio.Group buttonStyle='solid'>
                      <Radio.Button value='APA'>APA</Radio.Button>
                      <Radio.Button value='MLA'>MLA</Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button type='primary' htmlType='submit'>
                      Lưu
                    </Button>
                  </Form.Item>
                </Form>
              </Tabs.TabPane>
              <Tabs.TabPane tab='Tạp chí' key='62'>
                <Form {...layout}>
                  <Form.List name='authors'>
                    {(fields, { add, remove }) => (
                      <>
                        <Form.Item {...layout} label={'Tác giả'} required={false}>
                          <Form.Item noStyle>
                            <Input style={{ width: 'calc(100% - 40px)' }} />
                          </Form.Item>
                          <PlusCircleOutlined className='dynamic-delete-button' onClick={() => add()} />
                        </Form.Item>
                        {fields.map((field) => (
                          <Form.Item {...tailLayout} label={''} required={false} key={field.key}>
                            <Form.Item {...field} noStyle>
                              <Input style={{ width: 'calc(100% - 40px)' }} />
                            </Form.Item>
                            <MinusCircleOutlined className='dynamic-delete-button' onClick={() => remove(field.name)} />
                          </Form.Item>
                        ))}
                      </>
                    )}
                  </Form.List>

                  <Form.Item label='Tiêu đề' name='title'>
                    <Input />
                  </Form.Item>

                  <Form.Item label='Tên tạp chí' name='journal'>
                    <Input />
                  </Form.Item>

                  <Form.Item label='Năm xuất bản' name='year'>
                    <DatePicker locale={VN} picker='year' />
                  </Form.Item>

                  <Form.Item label='Tập, Kỳ'>
                    <InputNumber min={0} name='volume' placeholder='Tập' />
                    <InputNumber min={0} name='issue' placeholder='Kỳ' style={{ marginLeft: 8 }} />
                  </Form.Item>

                  <Form.Item label='Định dạng' name='format'>
                    <Radio.Group buttonStyle='solid'>
                      <Radio.Button value='APA'>APA</Radio.Button>
                      <Radio.Button value='MLA'>MLA</Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button type='primary' htmlType='submit'>
                      Lưu
                    </Button>
                  </Form.Item>
                </Form>
              </Tabs.TabPane>
              <Tabs.TabPane tab='Bài thuyết trình' key='63'>
                <Form {...layout}>
                  <Form.Item label='Tiêu đề' name='title'>
                    <Input />
                  </Form.Item>

                  <Form.Item label='Tên hội nghị' name='conference'>
                    <Input />
                  </Form.Item>

                  <Form.Item label='Nơi diễn ra' name='location'>
                    <Input />
                  </Form.Item>

                  <Form.Item label='Năm diễn ra' name='year'>
                    <DatePicker locale={VN} picker='year' />
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button type='primary' htmlType='submit'>
                      Lưu
                    </Button>
                  </Form.Item>
                </Form>
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
            <Form {...layout}>
              <Form.Item label='Giải thưởng' name='award'>
                <Input />
              </Form.Item>

              <Form.Item label='Trao bởi' name='from'>
                <Input />
              </Form.Item>

              <Form.Item label='Năm nhận' name='year'>
                <DatePicker locale={VN} picker='year' />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Chứng nhận, giấy phép' key='9'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Form {...layout}>
              <Form.Item label='Chứng nhận' name='certification'>
                <Input />
              </Form.Item>

              <Form.Item label='Nơi cấp' name='from'>
                <Input />
              </Form.Item>

              <Form.Item label='Năm nhận' name='year'>
                <DatePicker locale={VN} picker='year' />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Luận văn, luận án' key='10'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Form {...layout}>
              <Form.Item label='Luận văn' name='thesis'>
                <Input />
              </Form.Item>

              <Form.Item label='Người hướng dẫn' name='advisor'>
                <Input />
              </Form.Item>

              <Form.Item label='Mô tả ngắn' name='description'>
                <Input.TextArea />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Thành viên tổ chức' key='11'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Form {...layout}>
              <Form.Item label='Tổ chức' name='association'>
                <Input />
              </Form.Item>

              <Form.Item label='Vai trò' name='role'>
                <Input />
              </Form.Item>

              <Form.Item label='Thời gian' name='time'>
                <DatePicker.RangePicker locale={VN} picker='month' format={'MM-YYYY'} />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Kỹ năng' key='12'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Skill info={info} layout={layout} tailLayout={tailLayout} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Giáo dục, đào tạo' key='13'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Form {...layout}>
              <Form.Item label='Trường học, trung tâm' name='school'>
                <Input />
              </Form.Item>

              <Form.Item label='Ngành, nội dung đào tạo' name='field'>
                <Input />
              </Form.Item>

              <Form.Item label='Thời gian' name='duration'>
                <DatePicker.RangePicker locale={VN} picker='month' format={'MM-YYYY'} />
              </Form.Item>

              <Form.Item label='Thông tin khác' name='description'>
                <Input.TextArea />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Kinh nghiệm làm việc' key='14'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Form {...layout}>
              <Form.Item label='Nơi làm việc' name='company'>
                <Input />
              </Form.Item>

              <Form.Item label='Vị trí' name='position'>
                <Input />
              </Form.Item>

              <Form.Item label='Thời gian' name='duration'>
                <DatePicker.RangePicker locale={VN} picker='month' format={'MM-YYYY'} />
              </Form.Item>

              <Form.Item label='Mô tả' name='description'>
                <Input.TextArea />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Dự án' key='15'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Form {...layout}>
              <Form.Item label='Tên dự án' name='project'>
                <Input />
              </Form.Item>

              <Form.Item label='Nơi thực hiện' name='company'>
                <Input />
              </Form.Item>

              <Form.Item label='Thời gian' name='duration'>
                <DatePicker.RangePicker locale={VN} picker='month' format={'MM-YYYY'} />
              </Form.Item>

              <Form.Item label='Mô tả' name='description'>
                <Input.TextArea />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Tabs.TabPane>
      </Tabs>

      <div style={{ height: 50 }}></div>
    </div>
  )
}
