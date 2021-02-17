import { Button, DatePicker, Form, Input, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { CheckOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { updateInfo } from './infoSlice'

export function Certificate({ info, layout, tailLayout, locale, updateStatus }) {
  const [form] = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    if (info) {
      let certificates = info.certificates && info.certificates.length > 0 ? info.certificates.map((e) => ({ ...e, year: e.year ? moment(`${e.year}`) : null })) : [{}]
      form.setFieldsValue({ certificates })
    }
  }, [form, info])

  const onFinish = (values) => {
    let certificates = values.certificates.map((e) => ({ ...e, year: e.year ? e.year.year() : null }))
    dispatch(updateInfo({ certificates }))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.List name='certificates'>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space key={field.key} direction='vertical' style={{ width: '100%' }} size={0}>
                <Form.Item label={'Chứng nhận ' + (index + 1)} className='mb-5px'>
                  <Form.Item {...field} name={[field.name, 'name']} fieldKey={[field.fieldKey, 'name']} noStyle>
                    <Input style={{ width: 'calc(100% - 40px)' }} placeholder='Nhập tên chứng nhận' />
                  </Form.Item>
                  {index === 0 ? <PlusCircleOutlined className='dynamic-delete-button add' onClick={() => add()} /> : <MinusCircleOutlined className='dynamic-delete-button delete' onClick={() => remove(field.name)} />}
                </Form.Item>
                <Form.Item {...field} {...tailLayout} name={[field.name, 'organization']} fieldKey={[field.fieldKey, 'organization']}className='mb-5px'>
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
