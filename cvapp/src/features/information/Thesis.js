import { CheckOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateInfo } from './infoSlice'

export function Thesis({ info, layout, tailLayout, updateStatus }) {
  const [form] = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    if (info) {
      let theses = info.theses && info.theses.length > 0 ? info.theses : [{}]
      form.setFieldsValue({ theses })
    }
  }, [form, info])

  const onFinish = (values) => {
    dispatch(updateInfo(values))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.List name='theses'>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space key={field.key} direction='vertical' style={{ width: '100%' }} size={0}>
                <Form.Item label={'Luận văn ' + (index + 1)} className='mb-5px'>
                  <Form.Item {...field} name={[field.name, 'title']} fieldKey={[field.fieldKey, 'title']} noStyle>
                    <Input style={{ width: 'calc(100% - 40px)' }} placeholder='Nhập tên luận văn' />
                  </Form.Item>
                  {index === 0 ? <PlusCircleOutlined className='dynamic-delete-button add' onClick={() => add()} /> : <MinusCircleOutlined className='dynamic-delete-button delete' onClick={() => remove(field.name)} />}
                </Form.Item>
                <Form.Item {...field} {...tailLayout} name={[field.name, 'advisor']} fieldKey={[field.fieldKey, 'advisor']} className='mb-5px'>
                  <Input style={{ width: 'calc(100% - 40px)' }} placeholder='Nhập tên người hướng dẫn' />
                </Form.Item>
                <Form.Item {...field} {...tailLayout} name={[field.name, 'description']} fieldKey={[field.fieldKey, 'description']}>
                  <Input.TextArea style={{ width: 'calc(100% - 40px)' }} autoSize placeholder='Mô tả thêm về nội dung của luận văn, luận án' />
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
