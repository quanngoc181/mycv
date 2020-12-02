import { Button, DatePicker, Form, Input, InputNumber, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import TagGroup from './TagGroup'
import { updateJournals } from './infoSlice'

export function Journal({ info, layout, tailLayout, locale }) {
  const [form] = useForm()
  const dispatch = useDispatch()

  let authors = info.journals && info.journals.length > 0 ? info.journals.map((e) => (e.authors ? JSON.parse(e.authors) : [])) : [[]]

  useEffect(() => {
    if (info) {
      let journals = info.journals && info.journals.length > 0 ? info.journals.map((e) => ({ ...e, year: e.year ? moment(`${e.year}`) : null })) : [{}]
      form.setFieldsValue({ journals })
    }
  }, [form, info])

  const onFinish = (values) => {
    let journals = values.journals.map((e, i) => ({ ...e, year: e.year ? e.year.year() : null, authors: JSON.stringify(authors[i]) }))
    dispatch(updateJournals({ journals }))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.List name='journals'>
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
                <Form.Item {...field} name={[field.name, 'name']} fieldKey={[field.fieldKey, 'name']} label='Tên tạp chí'>
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
                <Form.Item {...field} name={[field.name, 'volume']} fieldKey={[field.fieldKey, 'volume']} label='Tập, Kỳ'>
                  <InputNumber min={0} placeholder='Tập' />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'issue']} fieldKey={[field.fieldKey, 'issue']} label='Tập, Kỳ'>
                  <InputNumber min={0} placeholder='Kỳ' />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'start']} fieldKey={[field.fieldKey, 'start']} label='Trang'>
                  <InputNumber min={0} placeholder='Từ' />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'end']} fieldKey={[field.fieldKey, 'end']} label='Trang'>
                  <InputNumber min={0} placeholder='Đến' />
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
