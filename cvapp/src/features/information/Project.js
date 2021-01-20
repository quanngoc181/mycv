import { Button, DatePicker, Form, Input, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { CheckOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { updateInfo } from './infoSlice'

export function Project({ info, layout, tailLayout, locale, language, updateStatus }) {
  const [form] = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    if (info) {
      let projects = info.projects && info.projects.length > 0 ? info.projects.map((e) => ({ ...e, time: e.start && e.end ? [moment(e.start), moment(e.end)] : null })) : [{}]
      form.setFieldsValue({ projects })
    }
  }, [form, info])

  const onFinish = (values) => {
    let projects = values.projects.map((e) => {
      return {
        ...e,
        start: e.time ? e.time[0].format('YYYY-MM') : null,
        end: e.time ? e.time[1].format('YYYY-MM') : null,
      }
    })
    dispatch(updateInfo({ projects }))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.List name='projects'>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space key={field.key} direction='vertical' style={{ width: '100%' }} size={0}>
                <Form.Item label='Tên dự án'>
                  <Form.Item {...field} name={[field.name, 'name']} fieldKey={[field.fieldKey, 'name']} noStyle>
                    <Input style={{ width: 'calc(100% - 40px)' }} />
                  </Form.Item>
                  {index === 0 ? <PlusCircleOutlined className='dynamic-delete-button' onClick={() => add()} /> : <MinusCircleOutlined className='dynamic-delete-button' onClick={() => remove(field.name)} />}
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'company']} fieldKey={[field.fieldKey, 'company']} label='Nơi thực hiện'>
                  <Input style={{ width: 'calc(100% - 40px)' }} />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'time']} fieldKey={[field.fieldKey, 'time']} label='Thời gian'>
                  <DatePicker.RangePicker locale={locale} picker='month' format={'MM/YYYY'} />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'description']} fieldKey={[field.fieldKey, 'description']} label='Mô tả'>
                  <Input.TextArea style={{ width: 'calc(100% - 40px)' }} autoSize />
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
