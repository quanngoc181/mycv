import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import TagGroup from './TagGroup'
import { updateAdditional } from './infoSlice'

export function AdditionalInformation({ info, layout, tailLayout }) {
  const [form] = useForm()
  const dispatch = useDispatch()
  const tagGroup = useRef(null)

  const hobbies = info.hobbies ? JSON.parse(info.hobbies) : []

  useEffect(() => {
    if (info) {
      let activities = info.activities ? JSON.parse(info.activities) : ['']
      form.setFieldsValue({ additional: info.additional, activities })
    }
  }, [form, info])

  const onFinish = (values) => {
    dispatch(updateAdditional({ ...values, activities: JSON.stringify(values.activities), hobbies: JSON.stringify(tagGroup.current.state.tags) }))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.Item label='Sở thích' name='hobbies'>
        <TagGroup tags={hobbies} ref={tagGroup} />
      </Form.Item>

      <Form.List name='activities'>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item {...(index === 0 ? layout : tailLayout)} label={index === 0 ? 'Hoạt động ngoại khóa' : ''} required={false} key={field.key}>
                <Form.Item {...field} noStyle>
                  <Input style={{ width: 'calc(100% - 40px)' }} />
                </Form.Item>
                {index === 0 ? <PlusCircleOutlined className='dynamic-delete-button' onClick={() => add()} /> : <MinusCircleOutlined className='dynamic-delete-button' onClick={() => remove(field.name)} />}
              </Form.Item>
            ))}
          </>
        )}
      </Form.List>

      <Form.Item label='Thông tin thêm' name='additional'>
        <Input.TextArea />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Lưu
        </Button>
      </Form.Item>
    </Form>
  )
}
