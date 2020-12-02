import { Button, DatePicker, Form, Input, Radio } from 'antd'

export function Book({ info, layout, tailLayout, locale }) {
  return (
    <Form {...layout}>
      {/* <Form.List name='authors'>
        {(fields, { add, remove }) => (
          <>
            <Form.Item {...layout} label={'Tác giả'} required={false}>
              <Form.Item noStyle>
                <Input style={{ width: 'calc(100% - 40px)' }} />
              </Form.Item>
              <PlusCircleOutlined className='dynamic-delete-button' onClick={() => add()} />
            </Form.Item>
            {fields.map((field) => (
              <Form.Item {...tailLayout} label={''} required={false} key={field.key}>
                <Form.Item {...field} noStyle>
                  <Input style={{ width: 'calc(100% - 40px)' }} />
                </Form.Item>
                <MinusCircleOutlined className='dynamic-delete-button' onClick={() => remove(field.name)} />
              </Form.Item>
            ))}
          </>
        )}
      </Form.List> */}

      <Form.Item label='Tiêu đề' name='title'>
        <Input />
      </Form.Item>

      <Form.Item label='Nhà xuất bản' name='publisher'>
        <Input />
      </Form.Item>

      <Form.Item label='Năm xuất bản' name='year'>
        <DatePicker locale={locale} picker='year' />
      </Form.Item>

      <Form.Item label='Nơi xuất bản' name='location'>
        <Input />
      </Form.Item>

      <Form.Item label='Định dạng' name='format'>
        <Radio.Group buttonStyle='solid'>
          <Radio.Button value='APA'>APA</Radio.Button>
          <Radio.Button value='MLA'>MLA</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Lưu
        </Button>
      </Form.Item>
    </Form>
  )
}
