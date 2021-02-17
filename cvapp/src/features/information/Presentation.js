import { Button, DatePicker, Form, Input, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { CheckOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { updateInfo } from './infoSlice'

export function Presentation({ info, layout, tailLayout, locale, updateStatus }) {
  const [form] = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    if (info) {
      let presentations = info.presentations && info.presentations.length > 0 ? info.presentations.map((e) => ({ ...e, year: e.year ? moment(`${e.year}`) : null })) : [{}]
      form.setFieldsValue({ presentations })
    }
  }, [form, info])

  const onFinish = (values) => {
    let presentations = values.presentations.map((e) => ({ ...e, year: e.year ? e.year.year() : null }))
    dispatch(updateInfo({ presentations }))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.List name='presentations'>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space key={field.key} direction='vertical' style={{ width: '100%' }} size={0}>
                <Form.Item label={'Thuyết trình ' + (index + 1)} className='mb-5px'>
                  <Form.Item {...field} name={[field.name, 'title']} fieldKey={[field.fieldKey, 'title']} noStyle>
                    <Input style={{ width: 'calc(100% - 40px)' }} placeholder='Nhập tên bài thuyết trình' />
                  </Form.Item>
                  {index === 0 ? <PlusCircleOutlined className='dynamic-delete-button add' onClick={() => add()} /> : <MinusCircleOutlined className='dynamic-delete-button delete' onClick={() => remove(field.name)} />}
                </Form.Item>
                <Form.Item {...field} {...tailLayout} name={[field.name, 'conference']} fieldKey={[field.fieldKey, 'conference']} className='mb-5px'>
                  <Input style={{ width: 'calc(100% - 40px)' }} placeholder='Nhập tên hội nghị' />
                </Form.Item>
                <Form.Item {...field} {...tailLayout} name={[field.name, 'location']} fieldKey={[field.fieldKey, 'location']} className='mb-5px'>
                  <Input style={{ width: 'calc(100% - 40px)' }} placeholder='Nhập nơi diễn ra' />
                </Form.Item>
                <Form.Item {...field} {...tailLayout} name={[field.name, 'year']} fieldKey={[field.fieldKey, 'year']}>
                  <DatePicker locale={locale} picker='year' />
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
