import { CheckOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateInfo } from './infoSlice'

export function AdditionalInformation({ info, layout, tailLayout, updateStatus }) {
  const [form] = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    if (info) {
      let activities = info.activities.length > 0 ? info.activities : [null]
      form.setFieldsValue({ additional: info.additional, hobbies: info.hobbies, activities })
    }
  }, [form, info])

  const onFinish = (values) => {
    dispatch(updateInfo(values))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.Item label='Sở thích' name='hobbies'>
        <Select mode='tags'></Select>
      </Form.Item>

      <Form.List name='activities'>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item {...(index === 0 ? layout : tailLayout)} label={index === 0 ? 'Hoạt động' : ''} required={false} key={field.key}>
                <Form.Item {...field} noStyle>
                  <Input style={{ width: 'calc(100% - 40px)' }} />
                </Form.Item>
                {index === 0 ? <PlusCircleOutlined className='dynamic-delete-button' onClick={() => add()} /> : <MinusCircleOutlined className='dynamic-delete-button' onClick={() => remove(field.name)} />}
              </Form.Item>
            ))}
          </>
        )}
      </Form.List>

      <Form.Item label='Thông tin thêm' name='additional'>
        <Input.TextArea autoSize />
      </Form.Item>

      <Form.Item {...tailLayout} className='mb-0'>
        <Button type='primary' htmlType='submit' icon={<CheckOutlined />} loading={updateStatus === 'pending'}>
          Lưu
        </Button>
      </Form.Item>
    </Form>
  )
}
