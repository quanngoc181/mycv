import { Button, DatePicker, Form, Input, InputNumber, Radio } from 'antd'
import VN from 'antd/es/date-picker/locale/vi_VN'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updatePersonal } from './infoSlice'
import moment from 'moment'

export function PersonalInformation({ info, layout, tailLayout }) {
  const [form] = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    if (info) {
      let dob = info.dob ? moment(info.dob) : null
      form.setFieldsValue({ fullName: info.fullName, childs: info.childs, address: info.address, nationality: info.nationality, religion: info.religion, gender: info.gender, marital: info.marital, dob })
    }
  }, [form, info])

  const onFinish = (values) => {
    dispatch(updatePersonal({ ...values, dob: values.dob ? values.dob.format('YYYY-MM-DD') : null }))
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <Form.Item label='Họ tên' name='fullName'>
        <Input />
      </Form.Item>

      <Form.Item label='Giới tính' name='gender'>
        <Radio.Group buttonStyle='solid'>
          <Radio.Button value='male'>Nam</Radio.Button>
          <Radio.Button value='female'>Nữ</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label='Ngày sinh' name='dob'>
        <DatePicker locale={VN} format={'DD-MM-YYYY'} />
      </Form.Item>

      <Form.Item label='Địa chỉ' name='address'>
        <Input />
      </Form.Item>

      <Form.Item label='Tình trạng hôn nhân' name='marital'>
        <Radio.Group buttonStyle='solid'>
          <Radio.Button value='single'>Độc thân</Radio.Button>
          <Radio.Button value='married'>Kết hôn</Radio.Button>
          <Radio.Button value='divorced'>Ly hôn</Radio.Button>
          <Radio.Button value='widowed'>Góa</Radio.Button>
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
