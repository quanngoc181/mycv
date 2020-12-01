import { Button, Form, Input } from 'antd'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateProfile } from './infoSlice'

export function Profile({ info, layout, tailLayout }) {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    if (info) {
      form.setFieldsValue({ position: info.position, profile: info.profile })
    }
  }, [form, info])

  const onFinish = (values) => {
    dispatch(updateProfile(values))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
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
  )
}
