import { Button, DatePicker, Form, Input, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { useEffect } from 'react'
import { CheckOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { updateInfo } from './infoSlice'

export function Membership({ info, layout, tailLayout, locale, language, updateStatus }) {
  const [form] = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    if (info) {
      let memberships = info.memberships && info.memberships.length > 0 ? info.memberships.map((e) => ({ ...e, time: e.start && e.end ? [moment(e.start), moment(e.end)] : null })) : [{}]
      form.setFieldsValue({ memberships })
    }
  }, [form, info])

  const onFinish = (values) => {
    let memberships = values.memberships.map((e) => {
      return {
        ...e,
        start: e.time ? e.time[0].format('YYYY-MM') : null,
        end: e.time ? e.time[1].format('YYYY-MM') : null,
      }
    })
    dispatch(updateInfo({ memberships }))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.List name='memberships'>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space key={field.key} direction='vertical' style={{ width: '100%' }} size={0}>
                <Form.Item label='Tổ chức'>
                  <Form.Item {...field} name={[field.name, 'organization']} fieldKey={[field.fieldKey, 'organization']} noStyle>
                    <Input style={{ width: 'calc(100% - 40px)' }} />
                  </Form.Item>
                  {index === 0 ? <PlusCircleOutlined className='dynamic-delete-button' onClick={() => add()} /> : <MinusCircleOutlined className='dynamic-delete-button' onClick={() => remove(field.name)} />}
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'role']} fieldKey={[field.fieldKey, 'role']} label='Vai trò'>
                  <Input style={{ width: 'calc(100% - 40px)' }} />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'time']} fieldKey={[field.fieldKey, 'time']} label='Thời gian'>
                  <DatePicker.RangePicker locale={locale} picker='month' format={'MM/YYYY'} />
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
