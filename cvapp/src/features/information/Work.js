import { Button, DatePicker, Form, Input, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { CheckOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { updateInfo } from './infoSlice'

export function Work({ info, layout, tailLayout, locale, language, updateStatus }) {
  const [form] = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    if (info) {
      let works = info.works && info.works.length > 0 ? info.works.map((e) => ({ ...e, time: e.start && e.end ? [moment(e.start), moment(e.end)] : null })) : [{}]
      form.setFieldsValue({ works })
    }
  }, [form, info])

  const onFinish = (values) => {
    let works = values.works.map((e) => {
      return {
        ...e,
        start: e.time ? e.time[0].format('YYYY-MM') : null,
        end: e.time ? e.time[1].format('YYYY-MM') : null,
      }
    })
    dispatch(updateInfo({ works }))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.List name='works'>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space key={field.key} direction='vertical' style={{ width: '100%' }} size={0}>
                <Form.Item label={'Nơi làm việc ' + (index + 1)} className='mb-5px'>
                  <Form.Item {...field} name={[field.name, 'company']} fieldKey={[field.fieldKey, 'company']} noStyle>
                    <Input style={{ width: 'calc(100% - 40px)' }} placeholder='Nhập tên công ty' />
                  </Form.Item>
                  {index === 0 ? <PlusCircleOutlined className='dynamic-delete-button add' onClick={() => add()} /> : <MinusCircleOutlined className='dynamic-delete-button delete' onClick={() => remove(field.name)} />}
                </Form.Item>
                <Form.Item {...field} {...tailLayout} name={[field.name, 'position']} fieldKey={[field.fieldKey, 'position']} className='mb-5px'>
                  <Input style={{ width: 'calc(100% - 40px)' }} placeholder='Nhập vị trí làm việc' />
                </Form.Item>
                <Form.Item {...field} {...tailLayout} name={[field.name, 'time']} fieldKey={[field.fieldKey, 'time']} className='mb-5px'>
                  <DatePicker.RangePicker locale={locale} picker='month' format={'MM/YYYY'} style={{ width: 'calc(100% - 40px)' }} />
                </Form.Item>
                <Form.Item {...field} {...tailLayout} name={[field.name, 'description']} fieldKey={[field.fieldKey, 'description']}>
                  <Input.TextArea style={{ width: 'calc(100% - 40px)' }} autoSize placeholder='Mô tả thêm về quá trình làm việc tại công ty' />
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
