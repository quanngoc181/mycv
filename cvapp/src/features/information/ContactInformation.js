import { CheckOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Input, Form } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateInfo } from './infoSlice'

export function ContactInformation({ info, layout, tailLayout, updateStatus }) {
  const [form] = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    if (info) {
      let socials = info.socials.length > 0 ? info.socials : [null]
      form.setFieldsValue({ email: info.email, phone: info.phone, socials })
    }
  }, [form, info])

  const onFinish = (values) => {
    dispatch(updateInfo(values))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.Item label='Email' name='email' rules={[{ type: 'email', message: 'Email không hợp lệ' }]}>
        <Input placeholder='Nhập địa chỉ email' />
      </Form.Item>

      <Form.Item
        label='Số điện thoại'
        name='phone'
        rules={[
          { len: 10, message: 'Số điện thoại không hợp lệ' },
          { pattern: /^[0-9]+$/, message: 'Số điện thoại không hợp lệ' },
        ]}
      >
        <Input placeholder='Nhập số điện thoại' />
      </Form.Item>

      <Form.List name='socials'>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item {...(index === 0 ? layout : tailLayout)} label={index === 0 ? 'Các trang web' : ''} required={false} key={field.key} style={{ marginBottom: index === fields.length - 1 ? 24 : 5 }}>
                <Form.Item {...field} noStyle>
                  <Input style={{ width: 'calc(100% - 40px)' }} placeholder='Mạng xã hội, trang web...' bordered={false} />
                </Form.Item>
                {index === 0 ? <PlusCircleOutlined className='dynamic-delete-button add' onClick={() => add()} /> : <MinusCircleOutlined className='dynamic-delete-button delete' onClick={() => remove(field.name)} />}
              </Form.Item>
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
