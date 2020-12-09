import { Button, DatePicker, Form, Input, InputNumber, Radio } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateInfo } from './infoSlice'
import moment from 'moment'

export function PersonalInformation({ info, layout, tailLayout, locale, language }) {
  const [form] = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    if (info) {
      let dob = info.dob ? moment(info.dob) : null
      form.setFieldsValue({ fullName: info.fullName, childs: info.childs, address: info.address, nationality: info.nationality, religion: info.religion, gender: info.gender, marital: info.marital, dob })
    }
  }, [form, info])

  const onFinish = (values) => {
    dispatch(updateInfo({ ...values, dob: values.dob ? values.dob.format('YYYY-MM-DD') : null }))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.Item label='Họ tên' name='fullName'>
        <Input />
      </Form.Item>

      <Form.Item label='Giới tính' name='gender'>
        <Radio.Group buttonStyle='solid'>
          <Radio.Button value='male'>{language === 'vi' ? 'Nam' : 'Male'}</Radio.Button>
          <Radio.Button value='female'>{language === 'vi' ? 'Nữ' : 'Female'}</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label='Ngày sinh' name='dob'>
        <DatePicker locale={locale} format={'DD/MM/YYYY'} />
      </Form.Item>

      <Form.Item label='Địa chỉ' name='address'>
        <Input />
      </Form.Item>

      <Form.Item label='Tình trạng hôn nhân' name='marital'>
        <Radio.Group buttonStyle='solid'>
          <Radio.Button value='single'>{language === 'vi' ? 'Độc thân' : 'Single'}</Radio.Button>
          <Radio.Button value='married'>{language === 'vi' ? 'Kết hôn' : 'Married'}</Radio.Button>
          <Radio.Button value='divorced'>{language === 'vi' ? 'Ly hôn' : 'Divorced'}</Radio.Button>
          <Radio.Button value='widowed'>{language === 'vi' ? 'Góa' : 'Widowed'}</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label='Số con' name='childs'>
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item label='Quốc tịch' name='nationality'>
        <Input />
      </Form.Item>

      <Form.Item label='Tôn giáo' name='religion'>
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Lưu
        </Button>
      </Form.Item>
    </Form>
  )
}
