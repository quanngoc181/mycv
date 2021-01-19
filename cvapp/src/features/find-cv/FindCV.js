import { Button, Col, message, Pagination, Radio, Row, Select, Slider } from 'antd'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'lodash'
import '../../css/find-cv.css'
import { searchFilter, getSuggest, searchKeyword } from './findCVSlice'
import TemplateList from '../../templates/TemplateList'
import { deleteCv, saveCv } from '../save-cv/saveCVSlice'
import Search from 'antd/lib/input/Search'

export function FindCV() {
  const dispatch = useDispatch()

  let savedCv = useSelector((state) => state.save.savedCv)
  let searchPage = useSelector((state) => state.find.searchPage)
  let searchTotal = useSelector((state) => state.find.searchTotal)
  let searchResult = useSelector((state) => state.find.searchResult)
  let suggestTag = useSelector((state) => state.find.suggestTag)
  let suggestAddress = useSelector((state) => state.find.suggestAddress)
  let suggestSchool = useSelector((state) => state.find.suggestSchool)
  let suggestField = useSelector((state) => state.find.suggestField)
  let suggestCompany = useSelector((state) => state.find.suggestCompany)
  let suggestPosition = useSelector((state) => state.find.suggestPosition)
  let suggestSkill = useSelector((state) => state.find.suggestSkill)
  let searchStatus = useSelector((state) => state.find.searchStatus)

  const [lastSearch, setLastSearch] = useState(null)

  const [keyword, setKeyword] = useState(null);
  const handleKeyword = (e) => {
    setKeyword(e.target.value)
  }

  const [language, setLanguage] = useState(undefined)
  const handleLanguage = (e) => {
    setLanguage(e.target.value)
  }

  const [gender, setGender] = useState(undefined)
  const handleGender = (e) => {
    setGender(e.target.value)
  }

  const [age, setAge] = useState([0, 100])
  const handleAge = (value) => {
    setAge(value)
  }

  const [marital, setMarital] = useState(undefined)
  const handleMarital = (e) => {
    setMarital(e.target.value)
  }

  // eslint-disable-next-line
  const debouncedSave = useCallback(
    debounce((field, value) => {
      if (value.trim().length !== 0) {
        dispatch(getSuggest({ field, keyword: value.trim() }))
      }
    }, 500),
    []
  )
  const handleKeyup = (field, value) => {
    debouncedSave(field, value)
  }

  const [tag, setTag] = useState([])
  const handleTag = (value) => {
    setTag(value)
  }

  const [address, setAddress] = useState([])
  const handleAddress = (value) => {
    setAddress(value)
  }

  const [school, setSchool] = useState([])
  const handleSchool = (value) => {
    setSchool(value)
  }

  const [field, setField] = useState([])
  const handleField = (value) => {
    setField(value)
  }

  const [company, setCompany] = useState([])
  const handleCompany = (value) => {
    setCompany(value)
  }

  const [position, setPosition] = useState([])
  const handlePosition = (value) => {
    setPosition(value)
  }

  const [skill, setSkill] = useState([])
  const handleSkill = (value) => {
    setSkill(value)
  }

  const submitSearchFilter = () => {
    setLastSearch('FILTER')
    dispatch(searchFilter({ language, gender, age, marital, tag, address, school, field, company, position, skill, page: 1 }))
  }

  const submitSearchKeyword = () => {
    setLastSearch('KEYWORD')
    dispatch(searchKeyword({ language, gender, age, marital, tag, address, school, field, company, position, skill, keyword, page: 1 }))
  }

  const handlePaging = (page) => {
    if(lastSearch === 'FILTER') {
      dispatch(searchFilter({ language, gender, age, marital, tag, address, school, field, company, position, skill, page }))
    } else if (lastSearch === 'KEYWORD') {
      dispatch(searchKeyword({ language, gender, age, marital, tag, address, school, field, company, position, skill, keyword, page }))
    }
  }

  return (
    <>
      <div className='find-cv'>
        <div className='sidebar left'>
          <div style={{ marginBottom: 20 }}>
            <h3 className='header'>
              <span>Ngôn ngữ</span>
            </h3>
            <Radio.Group value={language} onChange={handleLanguage}>
              <Radio.Button value='vi'>Tiếng Việt</Radio.Button>
              <Radio.Button value='en'>English</Radio.Button>
              <Radio.Button value={undefined}>Tất cả</Radio.Button>
            </Radio.Group>
          </div>
          <div style={{ marginBottom: 20 }}>
            <h3 className='header'>
              <span>Giới tính</span>
            </h3>
            <Radio.Group value={gender} onChange={handleGender}>
              <Radio.Button value='male'>Nam</Radio.Button>
              <Radio.Button value='female'>Nữ</Radio.Button>
              <Radio.Button value={undefined}>Tất cả</Radio.Button>
            </Radio.Group>
          </div>
          <div style={{ marginBottom: 40 }}>
            <h3 className='header'>
              <span>Độ tuổi</span>
            </h3>
            <Slider range marks={{ 0: '0', 20: '20', 40: '40', 60: '60', 80: '80', 100: '100' }} value={age} onChange={handleAge} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <h3 className='header'>
              <span>Hôn nhân</span>
            </h3>
            <Radio.Group value={marital} onChange={handleMarital}>
              <Radio.Button value='single'>Độc thân</Radio.Button>
              <Radio.Button value='married'>Kết hôn</Radio.Button>
              <Radio.Button value='divorced'>Ly hôn</Radio.Button>
              <div style={{ height: 5 }}></div>
              <Radio.Button value='widowed'>Góa</Radio.Button>
              <Radio.Button value={undefined}>Tất cả</Radio.Button>
            </Radio.Group>
          </div>
        </div>
        <div className='section'>
          <div className='find-keyword'>
            <Row style={{ flexGrow: 1 }}>
              <Col span={6}>
                <span className='keyword-label'>Nhập từ khóa tìm kiếm:</span>
              </Col>
              <Col span={12}>
                <Search placeholder='Tìm theo từ khóa' value={keyword} onChange={handleKeyword} onSearch={submitSearchKeyword} enterButton />
              </Col>
              <Col span={6}>
                <span className='keyword-label'>hoặc sử dụng các bộ lọc</span>
              </Col>
            </Row>
          </div>
          <div style={{ margin: '14px 0', textAlign: 'center' }}>
            <Pagination current={searchPage} total={searchTotal} onChange={handlePaging} />
          </div>
          <div className='result-container'>
            {searchResult.map((result, index) => {
              let logo = TemplateList.find((t) => t.id === result.template).logo
              let saved = savedCv.findIndex((c) => c.cvId === result.cvId)

              return (
                <div className='result-item' key={index}>
                  <img src={logo} className='image' alt='my cv'></img>
                  <div className='content'>
                    <div className='cv-name'>Tên CV: {result.cvName}</div>
                    <div className='fullname'>Họ và tên: {result.fullName}</div>
                    <div>
                      <span className='label'>Giới tính: </span>
                      {result.gender}
                    </div>
                    <div>
                      <span className='label'>Ngày sinh: </span>
                      {result.dob}
                    </div>
                    <div>
                      <span className='label'>Địa chỉ: </span>
                      {result.address}
                    </div>
                    <div>
                      <span className='label'>Điện thoại: </span>
                      {result.phone}
                    </div>
                    <div className='action'>
                      <Button
                        style={{ marginBottom: 10 }}
                        onClick={() => {
                          if (result.identifier === null) {
                            message.error({ content: 'CV này được cài đặt riêng tư' })
                          } else {
                            window.open('http://localhost:3000/cvwr/' + result.identifier)
                          }
                        }}
                      >
                        Xem CV
                      </Button>
                      <Button
                        type={saved !== -1 ? 'primary' : 'default'}
                        onClick={() => {
                          if (saved === -1) dispatch(saveCv({ cvId: result.cvId }))
                          else dispatch(deleteCv({ cvId: result.cvId }))
                        }}
                      >
                        {saved !== -1 ? 'Bỏ lưu' : 'Lưu CV'}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='sidebar right'>
          <div style={{ marginBottom: 20 }}>
            <h3 className='header'>
              <span>Thẻ (Tag)</span>
            </h3>
            <Select mode='multiple' size='small' value={tag} onChange={handleTag} onSearch={(value) => handleKeyup('tag', value)} style={{ width: '100%' }} filterOption={false} loading={searchStatus === 'pending'} placeholder='Chọn thẻ...'>
              {suggestTag.map((t) => (
                <Select.Option key={t}>{t}</Select.Option>
              ))}
            </Select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <h3 className='header'>
              <span>Địa chỉ</span>
            </h3>
            <Select mode='multiple' size='small' value={address} onChange={handleAddress} onSearch={(value) => handleKeyup('address', value)} style={{ width: '100%' }} filterOption={false} loading={searchStatus === 'pending'} placeholder='Chọn khu vực...'>
              {suggestAddress.map((t) => (
                <Select.Option key={t}>{t}</Select.Option>
              ))}
            </Select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <h3 className='header'>
              <span>Học vấn</span>
            </h3>
            <Select mode='multiple' size='small' value={school} onChange={handleSchool} onSearch={(value) => handleKeyup('school', value)} style={{ width: '100%' }} filterOption={false} loading={searchStatus === 'pending'} placeholder='Chọn trường học...'>
              {suggestSchool.map((t) => (
                <Select.Option key={t}>{t}</Select.Option>
              ))}
            </Select>
            <div style={{ height: 10 }}></div>
            <Select mode='multiple' size='small' value={field} onChange={handleField} onSearch={(value) => handleKeyup('field', value)} style={{ width: '100%' }} filterOption={false} loading={searchStatus === 'pending'} placeholder='Chọn chuyên ngành...'>
              {suggestField.map((t) => (
                <Select.Option key={t}>{t}</Select.Option>
              ))}
            </Select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <h3 className='header'>
              <span>Kinh nghiệm</span>
            </h3>
            <Select mode='multiple' size='small' value={company} onChange={handleCompany} onSearch={(value) => handleKeyup('company', value)} style={{ width: '100%' }} filterOption={false} loading={searchStatus === 'pending'} placeholder='Chọn công ty...'>
              {suggestCompany.map((t) => (
                <Select.Option key={t}>{t}</Select.Option>
              ))}
            </Select>
            <div style={{ height: 10 }}></div>
            <Select mode='multiple' size='small' value={position} onChange={handlePosition} onSearch={(value) => handleKeyup('position', value)} style={{ width: '100%' }} filterOption={false} loading={searchStatus === 'pending'} placeholder='Chọn vị trí...'>
              {suggestPosition.map((t) => (
                <Select.Option key={t}>{t}</Select.Option>
              ))}
            </Select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <h3 className='header'>
              <span>Kỹ năng</span>
            </h3>
            <Select mode='multiple' size='small' value={skill} onChange={handleSkill} onSearch={(value) => handleKeyup('skill', value)} style={{ width: '100%' }} filterOption={false} loading={searchStatus === 'pending'} placeholder='Chọn kỹ năng...'>
              {suggestSkill.map((t) => (
                <Select.Option key={t}>{t}</Select.Option>
              ))}
            </Select>
          </div>
          <Button type='primary' onClick={submitSearchFilter} block>
            Tìm theo bộ lọc
          </Button>
        </div>
      </div>
    </>
  )
}
