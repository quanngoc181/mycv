import { CameraOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Radio, Tabs, Form, Input, DatePicker, InputNumber } from 'antd'
import React, { useState } from 'react'
import TagGroup from './TagGroup'
import VN from 'antd/es/date-picker/locale/vi_VN'
import coverImage from '../../image/cover-image.jpg'
import defaultAvatar from '../../image/default-avatar.png'
import './information.css'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
}
const tailLayout = {
  wrapperCol: { offset: 6, span: 12 },
}

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
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Form {...layout}>
              <Form.Item label='Họ tên' name='fullName'>
                <Input />
              </Form.Item>

              <Form.Item label='Giới tính' name='gender'>
                <Radio.Group buttonStyle='solid'>
                  <Radio.Button value='male'>Nam</Radio.Button>
                  <Radio.Button value='female'>Nữ</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item label='Ngày sinh' name='dob'>
                <DatePicker locale={VN} format={'DD-MM-YYYY'} />
              </Form.Item>

              <Form.Item label='Địa chỉ' name='address'>
                <Input />
              </Form.Item>

              <Form.Item label='Tình trạng hôn nhân' name='marital'>
                <Radio.Group buttonStyle='solid'>
                  <Radio.Button value='single'>Độc thân</Radio.Button>
                  <Radio.Button value='married'>Kết hôn</Radio.Button>
                  <Radio.Button value='divorced'>Ly hôn</Radio.Button>
                  <Radio.Button value='widowed'>Góa</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item label='Số con' name='childs'>
                <InputNumber min={0} />
              </Form.Item>

              <Form.Item label='Quốc tịch' name='nationality'>
                <Input />
              </Form.Item>

              <Form.Item label='Tôn giáo' name='religion'>
                <Input />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Thông tin liên hệ' key='2'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Form {...layout}>
              <Form.Item label='Email' name='email' rules={[{ type: 'email', message: 'Email không hợp lệ' }]}>
                <Input />
              </Form.Item>

              <Form.Item
                label='Số điện thoại'
                name='phone'
                rules={[
                  { len: 10, message: 'Số điện thoại không hợp lệ' },
                  { pattern: /^[0-9]+$/, message: 'Số điện thoại không hợp lệ' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.List name='socials'>
                {(fields, { add, remove }) => (
                  <>
                    <Form.Item {...layout} label={'Mạng xã hội'} required={false}>
                      <Form.Item noStyle>
                        <Input placeholder='Facebook, LinkedIn...' style={{ width: 'calc(100% - 40px)' }} />
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

              <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Sở thích' key='3'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Form {...layout}>
              <Form.Item label='Sở thích' name='hobbies'>
                <TagGroup />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Thông tin thêm' key='4'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Form {...layout}>
              <Form.Item label='Thông tin thêm' name='additional'>
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
        <Tabs.TabPane tab='Profile' key='5'>
          <div style={{ padding: '16px 24px 16px 0' }}>
            <Form {...layout}>
              <Form.Item label='Vị trí ứng tuyển' name='position'>
                <Input />
              </Form.Item>

              <Form.Item label='Profile' name='profile'>
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
            <Form {...layout}>
              <Form.Item label='Học bổng' name='scholarship'>
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
      </Tabs>

      <div style={{ height: 50 }}></div>
    </div>
  )
}
