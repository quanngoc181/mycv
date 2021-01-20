import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { CheckOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { updateInfo } from './infoSlice'

export function Journal({ info, layout, tailLayout, locale, updateStatus }) {
  const [form] = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    if (info) {
      let journals = info.journals && info.journals.length > 0 ? info.journals.map((e) => ({ ...e, year: e.year ? moment(`${e.year}`) : null })) : [{}]
      form.setFieldsValue({ journals })
    }
  }, [form, info])

  const onFinish = (values) => {
    let journals = values.journals.map((e, i) => ({ ...e, year: e.year ? e.year.year() : null }))
    dispatch(updateInfo({ journals }))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.List name='journals'>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space key={field.key} direction='vertical' style={{ width: '100%' }} size={0}>
                <Form.Item label='Tiêu đề'>
                  <Form.Item {...field} name={[field.name, 'title']} fieldKey={[field.fieldKey, 'title']} noStyle>
                    <Input style={{ width: 'calc(100% - 40px)' }} />
                  </Form.Item>
                  {index === 0 ? <PlusCircleOutlined className='dynamic-delete-button' onClick={() => add()} /> : <MinusCircleOutlined className='dynamic-delete-button' onClick={() => remove(field.name)} />}
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'name']} fieldKey={[field.fieldKey, 'name']} label='Tên tạp chí'>
                  <Input style={{ width: 'calc(100% - 40px)' }} />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'authors']} fieldKey={[field.fieldKey, 'authors']} label='Tác giả'>
                  <Select mode='tags' style={{ width: 'calc(100% - 40px)' }}></Select>
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'year']} fieldKey={[field.fieldKey, 'year']} label='Năm xuất bản'>
                  <DatePicker locale={locale} picker='year' />
                </Form.Item>
                <Row>
                  <Col span={8}>
                    <div style={{ lineHeight: '32px', textAlign: 'right', paddingRight: 8 }}>Tập, Kỳ:</div>
                  </Col>
                  <Col span={8}>
                    <Form.Item {...field} name={[field.name, 'volume']} fieldKey={[field.fieldKey, 'volume']} wrapperCol={{ span: 24 }}>
                      <InputNumber min={0} placeholder='Tập' style={{ width: 'calc(100% - 40px)' }} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item {...field} name={[field.name, 'issue']} fieldKey={[field.fieldKey, 'issue']} wrapperCol={{ span: 24 }}>
                      <InputNumber min={0} placeholder='Kỳ' style={{ width: 'calc(100% - 40px)' }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <div style={{ lineHeight: '32px', textAlign: 'right', paddingRight: 8 }}>Trang:</div>
                  </Col>
                  <Col span={8}>
                    <Form.Item {...field} name={[field.name, 'start']} fieldKey={[field.fieldKey, 'start']} wrapperCol={{ span: 24 }}>
                      <InputNumber min={0} placeholder='Từ' style={{ width: 'calc(100% - 40px)' }} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item {...field} name={[field.name, 'end']} fieldKey={[field.fieldKey, 'end']} wrapperCol={{ span: 24 }}>
                      <InputNumber min={0} placeholder='Đến' style={{ width: 'calc(100% - 40px)' }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Space>
            ))}
          </>
        )}
      </Form.List>

      <Form.Item {...tailLayout} className='mb-0'>
        <Button type='primary' htmlType='submit' icon={<CheckOutlined />} loading={updateStatus === 'pending'}>
          Lưu
        </Button>
      </Form.Item>
    </Form>
  )
}
