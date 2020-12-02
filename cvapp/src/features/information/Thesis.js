import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateTheses } from './infoSlice'

export function Thesis({ info, layout, tailLayout }) {
  const [form] = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    if (info) {
      let theses = info.theses && info.theses.length > 0 ? info.theses : [{}]
      form.setFieldsValue({ theses })
    }
  }, [form, info])

  const onFinish = (values) => {
    dispatch(updateTheses(values))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.List name='theses'>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space key={field.key} direction='vertical' style={{ width: '100%' }} size={0}>
                <Form.Item label='Luận văn'>
                  <Form.Item {...field} name={[field.name, 'title']} fieldKey={[field.fieldKey, 'title']} noStyle>
                    <Input style={{ width: 'calc(100% - 40px)' }} />
                  </Form.Item>
                  {index === 0 ? <PlusCircleOutlined className='dynamic-delete-button' onClick={() => add()} /> : <MinusCircleOutlined className='dynamic-delete-button' onClick={() => remove(field.name)} />}
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'advisor']} fieldKey={[field.fieldKey, 'advisor']} label='Người hướng dẫn'>
                  <Input style={{ width: 'calc(100% - 40px)' }} />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'description']} fieldKey={[field.fieldKey, 'description']} label='Mô tả ngắn'>
                  <Input.TextArea style={{ width: 'calc(100% - 40px)' }} />
                </Form.Item>
              </Space>
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
