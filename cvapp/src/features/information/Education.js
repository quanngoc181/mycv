import { Button, DatePicker, Form, Input, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { updateInfo } from './infoSlice'

export function Education({ info, layout, tailLayout, locale, language }) {
  const [form] = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    if (info) {
      let educations = info.educations && info.educations.length > 0 ? info.educations.map((e) => ({ ...e, time: e.start && e.end ? [moment(e.start), moment(e.end)] : null })) : [{}]
      form.setFieldsValue({ educations })
    }
  }, [form, info])

  const onFinish = (values) => {
    let educations = values.educations.map((e) => {
      return {
        ...e,
        start: e.time ? e.time[0].format('YYYY-MM') : null,
        end: e.time ? e.time[1].format('YYYY-MM') : null,
      }
    })
    dispatch(updateInfo({ educations }))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.List name='educations'>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space key={field.key} direction='vertical' style={{ width: '100%' }} size={0}>
                <Form.Item label='Trường học, trung tâm'>
                  <Form.Item {...field} name={[field.name, 'school']} fieldKey={[field.fieldKey, 'school']} noStyle>
                    <Input style={{ width: 'calc(100% - 40px)' }} />
                  </Form.Item>
                  {index === 0 ? <PlusCircleOutlined className='dynamic-delete-button' onClick={() => add()} /> : <MinusCircleOutlined className='dynamic-delete-button' onClick={() => remove(field.name)} />}
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'field']} fieldKey={[field.fieldKey, 'field']} label='Ngành, nội dung đào tạo'>
                  <Input style={{ width: 'calc(100% - 40px)' }} />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'time']} fieldKey={[field.fieldKey, 'time']} label='Thời gian'>
                  <DatePicker.RangePicker locale={locale} picker='month' format={'MM/YYYY'} />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'description']} fieldKey={[field.fieldKey, 'description']} label='Thông tin khác'>
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
