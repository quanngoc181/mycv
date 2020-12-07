import './create-cv.css'
import TemplateList from '../../templates/TemplateList'
import { useEffect, useRef, useState } from 'react'
import { Button, Input, message, Radio, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { resetStatus, updateCv, updateCvInfo, updateFontFamily, updateFontSize, updateLanguage, updateLineHeight, updateTemplate } from '../create-cv/createCVSlice'
import { FileTextOutlined, FontSizeOutlined, LineHeightOutlined, UserOutlined } from '@ant-design/icons'
import { UploadImage } from './UploadImage'

const defaultInfo = {
  avatar: 'default-avatar.png',
  fullName: 'Nguyễn Văn Anh',
  position: 'Thực tập sinh',
  gender: 'Nam',
  dob: '01/01/1998',
  address: 'Tân Hòa - Quốc Oai - Hà Nội',
  marital: 'Độc thân',
  childs: 0,
  nationality: 'Việt Nam',
  religion: 'Không',
  phone: '0123456789',
  email: 'anhnv@gmail.com',
  socials: 'facebook.com/anh.nv',
  profile: 'Mong muốn được thực tập tại công ty, học hỏi thêm nhiều kiến thức và kinh nghiệm lập trình, kết hợp với những kiến thức đã học được để đóng góp cho công ty trong quá trình thực tập hè. Hơn thế nữa là được trở thành nhân viên chính thức của công ty.',
  activities: ['Đảm nhận vị trí chủ tịch hội sinh viên khóa 61 Đại học Bách Khoa Hà Nội', 'Đảm nhận vị trí chủ tịch hội sinh viên khóa 61 Đại học Bách Khoa Hà Nội'],
  hobbies: ['Nghe nhạc', 'Nghe nhạc'],
  educations: [
    { school: 'Đại học Bách Khoa Hà Nội', field: 'Cử nhân công nghệ thông tin', start: '01/2016', end: '01/2020', description: '- CPA hiện tại: 3.5\n- Dự kiến ra trường: 01/2021' },
    { school: 'Đại học Bách Khoa Hà Nội', field: 'Cử nhân công nghệ thông tin', start: '01/2016', end: '01/2020', description: '- CPA hiện tại: 3.5\n- Dự kiến ra trường: 01/2021' },
  ],
  works: [
    { company: 'Công ty ABC', position: 'Lập trình viên', start: '01/2016', end: '01/2020', description: '- Lập trình viên chính trong các dự án của công ty\n- Hướng dẫn cho các bạn thực tập sinh mới vào công ty' },
    { company: 'Công ty ABC', position: 'Lập trình viên', start: '01/2016', end: '01/2020', description: '- Lập trình viên chính trong các dự án của công ty\n- Hướng dẫn cho các bạn thực tập sinh mới vào công ty' },
  ],
  projects: [
    { name: 'Đồ án 1', company: 'Đại học Bách Khoa Hà Nội', start: '01/2016', end: '01/2020', description: '- Xây dựng ứng dụng tạo CV\n- Công nghệ sử dụng: Java' },
    { name: 'Đồ án 1', company: 'Đại học Bách Khoa Hà Nội', start: '01/2016', end: '01/2020', description: '- Xây dựng ứng dụng tạo CV\n- Công nghệ sử dụng: Java' },
  ],
  memberships: [
    { role: 'Thành viên', organization: 'Hội lập trình viên Hà Nội', start: '01/2016', end: '01/2020' },
    { role: 'Thành viên', organization: 'Hội lập trình viên Hà Nội', start: '01/2016', end: '01/2020' },
  ],
  additional: 'Mong muốn được thực tập tại công ty, học hỏi thêm nhiều kiến thức và kinh nghiệm lập trình, kết hợp với những kiến thức đã học được để đóng góp cho công ty trong quá trình thực tập hè. Hơn thế nữa là được trở thành nhân viên chính thức của công ty.',
  skills: [
    { name: 'Tiếng Anh', rate: 2.5 },
    { name: 'Tiếng Anh', rate: 2.5 },
  ],
  awards: [
    { name: 'Quán quân MR & MISS', organization: 'Đại học Bách Khoa Hà Nội', year: 2020 },
    { name: 'Quán quân MR & MISS', organization: 'Đại học Bách Khoa Hà Nội', year: 2020 },
  ],
  certificates: [
    { name: 'TOEIC 450', organization: 'IIG Việt Nam', year: 2020 },
    { name: 'TOEIC 450', organization: 'IIG Việt Nam', year: 2020 },
  ],
  scholarships: [
    { name: 'Học bổng tài năng', organization: 'Đại học Bách Khoa Hà Nội', year: 2020 },
    { name: 'Học bổng tài năng', organization: 'Đại học Bách Khoa Hà Nội', year: 2020 },
  ],
  theses: [
    { title: 'Luận văn thạc sĩ', advisor: 'Nguyễn Văn Anh', description: 'Nghiên cứu về lĩnh vực Trí tuệ nhân tạo và Học máy, xây dựng chương trình nhận diện ảnh chân dung người, sử dụng bởi các phần mềm có tính năng tải lên tập tin ảnh.' },
    { title: 'Luận văn thạc sĩ', advisor: 'Nguyễn Văn Anh', description: 'Nghiên cứu về lĩnh vực Trí tuệ nhân tạo và Học máy, xây dựng chương trình nhận diện ảnh chân dung người, sử dụng bởi các phần mềm có tính năng tải lên tập tin ảnh.' },
  ],
  books: ['Anh, N. V. (2020). Phân tích và nhận diện ảnh. Hà Nội: Kim Đồng.', 'Anh, N. V. (2020). Phân tích và nhận diện ảnh. Hà Nội: Kim Đồng.'],
  journals: ['Anh, N. V. (2020). Lập trình hướng đối tượng. Tạp chí công nghệ, 20(1), 8-12.', 'Anh, N. V. (2020). Lập trình hướng đối tượng. Tạp chí công nghệ, 20(1), 8-12.'],
  presentations: ['"Lập trình Java." Hội nghị công nghệ. Hà Nội, 2020.', '"Lập trình Java." Hội nghị công nghệ. Hà Nội, 2020.'],
}

export function CreateCV() {
  const dispatch = useDispatch()
  const [useData, setUseData] = useState('original')
  const uploadRef = useRef(null)

  let info = useSelector((state) => state.create.cvInfo)
  let status = useSelector((state) => state.create.updateStatus)

  useEffect(() => {
    if (status === 'success') {
      message.success({ content: 'Thành công' })
    } else if (status === 'error') {
      message.error({ content: 'Thất bại' })
    }
  }, [status])
  useEffect(() => {
    return () => {
      dispatch(resetStatus())
    }
  }, [dispatch])

  if (info === null) return null

  let { template, language, fontFamily, fontSize, lineHeight } = info

  const TemplateComponent = TemplateList.find((t) => t.id === template).component

  const saveCV = () => {
    dispatch(updateCv())
  }

  const changeCvName = (e) => {
    dispatch(updateCvInfo({ field: 'cvName', value: e.target.value }))
  }

  const changeCvNote = (e) => {
    dispatch(updateCvInfo({ field: 'cvNote', value: e.target.value }))
  }

  const uploadImage = () => {
    uploadRef.current.click()
  }

  const uploadSuccess = (fileName) => {
    dispatch(updateCvInfo({ field: 'avatar', value: fileName }))
  }

  return (
    <>
      <div className='my-toolbar'>
        <div className='my-divider'></div>
        <div className='my-tool'>
          <Radio.Group
            size='small'
            value={useData}
            onChange={(e) => {
              setUseData(e.target.value)
            }}
          >
            <Radio.Button value='template'>
              <FileTextOutlined />
            </Radio.Button>
            <Radio.Button value='original'>
              <UserOutlined />
            </Radio.Button>
          </Radio.Group>
        </div>
        <div className='my-divider'></div>
        <div className='my-tool'>
          <Radio.Group
            size='small'
            value={language}
            onChange={(e) => {
              dispatch(updateLanguage({ language: e.target.value }))
            }}
          >
            <Radio.Button value='vi'>VI</Radio.Button>
            <Radio.Button value='en'>EN</Radio.Button>
          </Radio.Group>
        </div>
        <div className='my-divider'></div>
        <div className='my-tool'>
          <Select
            size='small'
            value={fontFamily}
            onChange={(fontFamily) => {
              dispatch(updateFontFamily({ fontFamily }))
            }}
            style={{ width: 100 }}
          >
            <Select.Option value='arial'>Arial</Select.Option>
            <Select.Option value='cambria'>Cambria</Select.Option>
            <Select.Option value='calibri'>Calibri</Select.Option>
            <Select.Option value='didot'>Didot</Select.Option>
            <Select.Option value='garamond'>Garamond</Select.Option>
          </Select>
        </div>
        <div className='my-divider'></div>
        <div className='my-tool'>
          <Radio.Group
            size='small'
            value={fontSize}
            onChange={(e) => {
              dispatch(updateFontSize({ fontSize: e.target.value }))
            }}
          >
            <Radio.Button value={10}>
              <FontSizeOutlined style={{ fontSize: 10 }} />
            </Radio.Button>
            <Radio.Button value={11}>
              <FontSizeOutlined style={{ fontSize: 14 }} />
            </Radio.Button>
            <Radio.Button value={12}>
              <FontSizeOutlined style={{ fontSize: 18 }} />
            </Radio.Button>
          </Radio.Group>
        </div>
        <div className='my-divider'></div>
        <div className='my-tool'>
          <Radio.Group
            size='small'
            value={lineHeight}
            onChange={(e) => {
              dispatch(updateLineHeight({ lineHeight: e.target.value }))
            }}
          >
            <Radio.Button value={1.3}>
              <LineHeightOutlined style={{ fontSize: 10 }} />
            </Radio.Button>
            <Radio.Button value={1.4}>
              <LineHeightOutlined style={{ fontSize: 14 }} />
            </Radio.Button>
            <Radio.Button value={1.5}>
              <LineHeightOutlined style={{ fontSize: 18 }} />
            </Radio.Button>
          </Radio.Group>
        </div>
        <div className='my-divider'></div>
      </div>
      <div className='d-flex'>
        <div className='my-sidebar'>
          <UploadImage ref={uploadRef} uploadSuccess={uploadSuccess} />
          <div style={{ marginBottom: 20 }}>
            <Input className='cv-name' value={info.cvName} onInput={changeCvName} size='large' placeholder='Tên CV' />
          </div>
          <div style={{ marginBottom: 20 }}>
            <Input.TextArea value={info.cvNote} onInput={changeCvNote} placeholder='Ghi chú...' />
          </div>
          <h3 className='header'>
            <span>CHỌN MẪU</span>
          </h3>
          <div className='template-container' style={{ marginBottom: 20 }}>
            {TemplateList.map((t, index) => (
              <div
                key={index}
                className={`template-item${template === t.id ? ' active' : ''}`}
                onClick={() => {
                  dispatch(updateTemplate({ template: t.id }))
                }}
              >
                <img src={t.logo} alt={t.name} />
                <div>{t.name}</div>
              </div>
            ))}
          </div>
          <div className='action-container'>
            <Button type='primary' onClick={saveCV} block loading={status === 'pending'}>
              Lưu
            </Button>
          </div>
        </div>
        <div className='my-body' style={{ fontFamily, fontSize: fontSize + 'pt', lineHeight }}>
          <TemplateComponent viewMode={false} uploadImage={uploadImage} info={useData === 'original' ? info : defaultInfo} />
        </div>
      </div>
    </>
  )
}
