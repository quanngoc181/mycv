import { CheckOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateInfo } from './infoSlice'

export function Profile({ info, layout, tailLayout, updateStatus }) {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    if (info) {
      form.setFieldsValue({ position: info.position, profile: info.profile })
    }
  }, [form, info])

  const onFinish = (values) => {
    dispatch(updateInfo(values))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.Item label='Vị trí ứng tuyển' name='position'>
        <Input placeholder='Nhập vị trí ứng tuyển' />
      </Form.Item>

      <Form.Item label='Profile' name='profile'>
        <Input.TextArea autoSize placeholder='Giới thiệu ngắn gọn về bản thân và mục tiêu trong công việc' />
      </Form.Item>

      <Form.Item {...tailLayout} className='mb-0'>
        <Button type='primary' htmlType='submit' icon={<CheckOutlined />} loading={updateStatus === 'pending'}>
          Lưu
        </Button>
      </Form.Item>
    </Form>
  )
}
