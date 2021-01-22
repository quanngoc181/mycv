import { Button, DatePicker, Form, Input, Select, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { CheckOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { updateInfo } from './infoSlice'

export function Book({ info, layout, tailLayout, locale, updateStatus }) {
  const [form] = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    if (info) {
      let books = info.books && info.books.length > 0 ? info.books.map((e) => ({ ...e, year: e.year ? moment(`${e.year}`) : null })) : [{}]
      form.setFieldsValue({ books })
    }
  }, [form, info])

  const onFinish = (values) => {
    let books = values.books.map((e) => ({ ...e, year: e.year ? e.year.year() : null }))
    dispatch(updateInfo({ books }))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.List name='books'>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space key={field.key} direction='vertical' style={{ width: '100%' }} size={0}>
                <Form.Item label={'Sách ' + (index + 1)} className='mb-5px'>
                  <Form.Item {...field} name={[field.name, 'title']} fieldKey={[field.fieldKey, 'title']} noStyle>
                    <Input style={{ width: 'calc(100% - 40px)' }} placeholder='Nhập tiêu đề sách' />
                  </Form.Item>
                  {index === 0 ? <PlusCircleOutlined className='dynamic-delete-button add' onClick={() => add()} /> : <MinusCircleOutlined className='dynamic-delete-button delete' onClick={() => remove(field.name)} />}
                </Form.Item>
                <Form.Item {...field} {...tailLayout} name={[field.name, 'authors']} fieldKey={[field.fieldKey, 'authors']} className='mb-5px'>
                  <Select mode='tags' style={{ width: 'calc(100% - 40px)' }} placeholder='Nhập tên các tác giả'></Select>
                </Form.Item>
                <Form.Item {...field} {...tailLayout} name={[field.name, 'publisher']} fieldKey={[field.fieldKey, 'publisher']} className='mb-5px'>
                  <Input style={{ width: 'calc(100% - 40px)' }} placeholder='Nhập tên nhà xuất bản' />
                </Form.Item>
                <Form.Item {...field} {...tailLayout} name={[field.name, 'location']} fieldKey={[field.fieldKey, 'location']} className='mb-5px'>
                  <Input style={{ width: 'calc(100% - 40px)' }} placeholder='Nơi xuất bản' />
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
