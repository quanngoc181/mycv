import { Button, DatePicker, Form, Input, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import TagGroup from './TagGroup'
import moment from 'moment'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { updateBooks } from './infoSlice'

export function Book({ info, layout, tailLayout, locale }) {
  const [form] = useForm()
  const dispatch = useDispatch()

  let authors = info.books && info.books.length > 0 ? info.books.map((e) => (e.authors ? JSON.parse(e.authors) : [])) : [[]]

  useEffect(() => {
    if (info) {
      let books = info.books && info.books.length > 0 ? info.books.map((e) => ({ ...e, year: e.year ? moment(`${e.year}`) : null })) : [{}]
      form.setFieldsValue({ books })
    }
  }, [form, info])

  const onFinish = (values) => {
    let books = values.books.map((e, i) => ({ ...e, year: e.year ? e.year.year() : null, authors: JSON.stringify(authors[i]) }))
    dispatch(updateBooks({ books }))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.List name='books'>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space key={field.key} direction='vertical' style={{ width: '100%' }} size={0}>
                <Form.Item label='Tiêu đề'>
                  <Form.Item {...field} name={[field.name, 'title']} fieldKey={[field.fieldKey, 'title']} noStyle>
                    <Input style={{ width: 'calc(100% - 40px)' }} />
                  </Form.Item>
                  {index === 0 ? (
                    <PlusCircleOutlined
                      className='dynamic-delete-button'
                      onClick={() => {
                        authors.push([])
                        add()
                      }}
                    />
                  ) : (
                    <MinusCircleOutlined
                      className='dynamic-delete-button'
                      onClick={() => {
                        authors.splice(index, 1)
                        remove(field.name)
                      }}
                    />
                  )}
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'publisher']} fieldKey={[field.fieldKey, 'publisher']} label='Nhà xuất bản'>
                  <Input style={{ width: 'calc(100% - 40px)' }} />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'location']} fieldKey={[field.fieldKey, 'location']} label='Nơi xuất bản'>
                  <Input style={{ width: 'calc(100% - 40px)' }} />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'authors']} fieldKey={[field.fieldKey, 'authors']} label='Tác giả'>
                  <TagGroup
                    tags={authors[index]}
                    onChange={(t) => {
                      authors[index] = t
                    }}
                  />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'year']} fieldKey={[field.fieldKey, 'year']} label='Năm xuất bản'>
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
