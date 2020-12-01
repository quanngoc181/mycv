import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Input, Form } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateContact } from './infoSlice'

export function ContactInformation({ info, layout, tailLayout }) {
  const [form] = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    if (info) {
      let socials = info.socials ? JSON.parse(info.socials) : ['']
      form.setFieldsValue({ email: info.email, phone: info.phone, socials })
    }
  }, [form, info])

  const onFinish = (values) => {
    dispatch(updateContact({ ...values, socials: JSON.stringify(values.socials) }))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
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
            {fields.map((field, index) => (
              <Form.Item {...(index === 0 ? layout : tailLayout)} label={index === 0 ? 'Mạng xã hội' : ''} required={false} key={field.key}>
                <Form.Item {...field} noStyle>
                  <Input style={{ width: 'calc(100% - 40px)' }} placeholder={index === 0 ? 'Facebook, LinkedIn...' : ''} />
                </Form.Item>
                {index === 0 ? <PlusCircleOutlined className='dynamic-delete-button' onClick={() => add()} /> : <MinusCircleOutlined className='dynamic-delete-button' onClick={() => remove(field.name)} />}
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
  )
}
