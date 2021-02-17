import { CheckOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateInfo } from './infoSlice'
import moment from 'moment'

export function Scholarship({ info, layout, tailLayout, locale, updateStatus }) {
  const [form] = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    if (info) {
      let scholarships = info.scholarships && info.scholarships.length > 0 ? info.scholarships.map((e) => ({ ...e, year: e.year ? moment(`${e.year}`) : null })) : [{}]
      form.setFieldsValue({ scholarships })
    }
  }, [form, info])

  const onFinish = (values) => {
    let scholarships = values.scholarships.map((e) => ({ ...e, year: e.year ? e.year.year() : null }))
    dispatch(updateInfo({ scholarships }))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.List name='scholarships'>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space key={field.key} direction='vertical' style={{ width: '100%' }} size={0}>
                <Form.Item label={'Học bổng ' + (index + 1)} className='mb-5px'>
                  <Form.Item {...field} name={[field.name, 'name']} fieldKey={[field.fieldKey, 'name']} noStyle>
                    <Input style={{ width: 'calc(100% - 40px)' }} placeholder='Nhập tên học bổng' />
                  </Form.Item>
                  {index === 0 ? <PlusCircleOutlined className='dynamic-delete-button add' onClick={() => add()} /> : <MinusCircleOutlined className='dynamic-delete-button delete' onClick={() => remove(field.name)} />}
                </Form.Item>
                <Form.Item {...field} {...tailLayout} name={[field.name, 'organization']} fieldKey={[field.fieldKey, 'organization']} className='mb-5px'>
                  <Input style={{ width: 'calc(100% - 40px)' }} placeholder='Được trao bởi' />
                </Form.Item>
                <Form.Item {...field} {...tailLayout} name={[field.name, 'year']} fieldKey={[field.fieldKey, 'year']}>
                  <DatePicker locale={locale} picker='year' />
                </Form.Item>
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
