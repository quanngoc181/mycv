import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateScholarships } from './infoSlice'
import moment from 'moment'

export function Scholarship({ info, layout, tailLayout, locale }) {
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
    dispatch(updateScholarships({ scholarships }))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.List name='scholarships'>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space key={field.key} direction='vertical' style={{ width: '100%' }} size={0}>
                <Form.Item label='Học bổng'>
                  <Form.Item {...field} name={[field.name, 'name']} fieldKey={[field.fieldKey, 'name']} noStyle>
                    <Input style={{ width: 'calc(100% - 40px)' }} />
                  </Form.Item>
                  {index === 0 ? <PlusCircleOutlined className='dynamic-delete-button' onClick={() => add()} /> : <MinusCircleOutlined className='dynamic-delete-button' onClick={() => remove(field.name)} />}
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'organization']} fieldKey={[field.fieldKey, 'organization']} label='Trao bởi'>
                  <Input style={{ width: 'calc(100% - 40px)' }} />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'year']} fieldKey={[field.fieldKey, 'year']} label='Năm nhận'>
                  <DatePicker locale={locale} picker='year' />
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
