import './create-cv.css'
import template1Logo from '../../templates/template1.png'
import template2Logo from '../../templates/template2.png'
import { useState } from 'react'
import { Template1 } from '../../templates/Template1'
import { Template2 } from '../../templates/Template2'
import { Radio, Select } from 'antd'
import { useSelector } from 'react-redux'
import { displayInfo } from '../information/infoSlice'
import { FileTextOutlined, FontSizeOutlined, LineHeightOutlined, UserOutlined } from '@ant-design/icons'

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
  socials: ['facebook.com/anh.nv'],
  profile: 'Mong muốn được thực tập tại công ty, học hỏi thêm nhiều kiến thức và kinh nghiệm lập trình, kết hợp với những kiến thức đã học được để đóng góp cho công ty trong quá trình thực tập hè. Hơn thế nữa là được trở thành nhân viên chính thức của công ty.',
  activities: ['Đảm nhận vị trí chủ tịch hội sinh viên khóa 61 Đại học Bách Khoa Hà Nội', 'Đảm nhận vị trí chủ tịch hội sinh viên khóa 61 Đại học Bách Khoa Hà Nội'],
  hobbies: ['Nghe nhạc', 'Nghe nhạc'],
  educations: [
    { school: 'Đại học Bách Khoa Hà Nội', field: 'Cử nhân công nghệ thông tin', start: '01/2016', end: '01/2020', description: ['- CPA hiện tại: 3.5', '- Dự kiến ra trường: 01/2021'] },
    { school: 'Đại học Bách Khoa Hà Nội', field: 'Cử nhân công nghệ thông tin', start: '01/2016', end: '01/2020', description: ['- CPA hiện tại: 3.5', '- Dự kiến ra trường: 01/2021'] },
  ],
  works: [
    { company: 'Công ty ABC', position: 'Lập trình viên', start: '01/2016', end: '01/2020', description: ['- Lập trình viên chính trong các dự án của công ty', '- Hướng dẫn cho các bạn thực tập sinh mới vào công ty'] },
    { company: 'Công ty ABC', position: 'Lập trình viên', start: '01/2016', end: '01/2020', description: ['- Lập trình viên chính trong các dự án của công ty', '- Hướng dẫn cho các bạn thực tập sinh mới vào công ty'] },
  ],
  projects: [
    { name: 'Đồ án 1', company: 'Đại học Bách Khoa Hà Nội', start: '01/2016', end: '01/2020', description: ['- Xây dựng ứng dụng tạo CV', '- Công nghệ sử dụng: Java'] },
    { name: 'Đồ án 1', company: 'Đại học Bách Khoa Hà Nội', start: '01/2016', end: '01/2020', description: ['- Xây dựng ứng dụng tạo CV', '- Công nghệ sử dụng: Java'] },
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
    { title: 'Luận văn thạc sĩ', advisor: 'Nguyễn Văn Anh', description: ['Nghiên cứu về lĩnh vực Trí tuệ nhân tạo và Học máy, xây dựng chương trình nhận diện ảnh chân dung người, sử dụng bởi các phần mềm có tính năng tải lên tập tin ảnh.'] },
    { title: 'Luận văn thạc sĩ', advisor: 'Nguyễn Văn Anh', description: ['Nghiên cứu về lĩnh vực Trí tuệ nhân tạo và Học máy, xây dựng chương trình nhận diện ảnh chân dung người, sử dụng bởi các phần mềm có tính năng tải lên tập tin ảnh.'] },
  ],
  books: ['Anh, N. V. (2020). Phân tích và nhận diện ảnh. Hà Nội: Kim Đồng.', 'Anh, N. V. (2020). Phân tích và nhận diện ảnh. Hà Nội: Kim Đồng.'],
  journals: ['Anh, N. V. (2020). Lập trình hướng đối tượng. Tạp chí công nghệ, 20(1), 8-12.', 'Anh, N. V. (2020). Lập trình hướng đối tượng. Tạp chí công nghệ, 20(1), 8-12.'],
  presentations: ['"Lập trình Java." Hội nghị công nghệ. Hà Nội, 2020.', '"Lập trình Java." Hội nghị công nghệ. Hà Nội, 2020.'],
}

export function CreateCV() {
  const [template, setTemplate] = useState(1)
  const [language, setLanguage] = useState('vi')
  const [useData, setUseData] = useState('original')
  const [fontSize, setFontSize] = useState(11)
  const [lineHeight, setLineHeight] = useState(1.4)
  const [fontFamily, setFontFamily] = useState('arial')

  const info = useSelector(displayInfo)

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
              setLanguage(e.target.value)
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
            onChange={(v) => {
              setFontFamily(v)
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
              setFontSize(e.target.value)
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
              setLineHeight(e.target.value)
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
          <h3 className='header'>
            <span>CHỌN MẪU</span>
          </h3>
          <div className='template-container'>
            <div
              className={`template-item${template === 1 ? ' active' : ''}`}
              onClick={() => {
                setTemplate(1)
              }}
            >
              <img src={template1Logo} alt='template 1' />
              <div>Template 1</div>
            </div>
            <div
              className={`template-item${template === 2 ? ' active' : ''}`}
              onClick={() => {
                setTemplate(2)
              }}
            >
              <img src={template2Logo} alt='template 2' />
              <div>Template 2</div>
            </div>
          </div>
        </div>
        <div className='my-body'>{template === 1 ? <Template1 fontFamily={fontFamily} fontSize={fontSize} lineHeight={lineHeight} info={useData === 'original' && info ? info : defaultInfo} /> : <Template2 fontFamily={fontFamily} fontSize={fontSize} lineHeight={lineHeight} info={useData === 'original' && info ? info : defaultInfo} />}</div>
      </div>
    </>
  )
}
