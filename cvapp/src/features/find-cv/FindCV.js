import { Button, Radio, Select, Slider } from 'antd'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'lodash'
import './find-cv.css'
import { searchAddress, searchCompany, searchCv, searchField, searchPosition, searchSchool, searchSkill, searchTag } from './findCVSlice'

export function FindCV() {
  const dispatch = useDispatch()

  let suggestTag = useSelector((state) => state.find.suggestTag)
  let suggestAddress = useSelector((state) => state.find.suggestAddress)
  let suggestSchool = useSelector((state) => state.find.suggestSchool)
  let suggestField = useSelector((state) => state.find.suggestField)
  let suggestCompany = useSelector((state) => state.find.suggestCompany)
  let suggestPosition = useSelector((state) => state.find.suggestPosition)
  let suggestSkill = useSelector((state) => state.find.suggestSkill)
  let searchStatus = useSelector((state) => state.find.searchStatus)

  const [language, setLanguage] = useState(null)
  const handleLanguage = (e) => {
    setLanguage(e.target.value)
  }

  const [gender, setGender] = useState(null)
  const handleGender = (e) => {
    setGender(e.target.value)
  }

  const [age, setAge] = useState([0, 100])
  const handleAge = (value) => {
    setAge(value)
  }

  const [marital, setMarital] = useState(null)
  const handleMarital = (e) => {
    setMarital(e.target.value)
  }

  const [tag, setTag] = useState([])
  const handleTag = (value) => {
    setTag(value)
  }
  // eslint-disable-next-line
  const debouncedTag = useCallback(
    debounce((value) => {
      if (value.trim().length !== 0) {
        dispatch(searchTag({ value: value.trim() }))
      }
    }, 1000),
    []
  )
  const handleKeyupTag = (value) => {
    debouncedTag(value)
  }

  const [address, setAddress] = useState([])
  const handleAddress = (value) => {
    setAddress(value)
  }
  // eslint-disable-next-line
  const debouncedAddress = useCallback(
    debounce((value) => {
      if (value.trim().length !== 0) {
        dispatch(searchAddress({ value: value.trim() }))
      }
    }, 1000),
    []
  )
  const handleKeyupAddress = (value) => {
    debouncedAddress(value)
  }

  const [school, setSchool] = useState([])
  const handleSchool = (value) => {
    setSchool(value)
  }
  // eslint-disable-next-line
  const debouncedSchool = useCallback(
    debounce((value) => {
      if (value.trim().length !== 0) {
        dispatch(searchSchool({ value: value.trim() }))
      }
    }, 1000),
    []
  )
  const handleKeyupSchool = (value) => {
    debouncedSchool(value)
  }

  const [field, setField] = useState([])
  const handleField = (value) => {
    setField(value)
  }
  // eslint-disable-next-line
  const debouncedField = useCallback(
    debounce((value) => {
      if (value.trim().length !== 0) {
        dispatch(searchField({ value: value.trim() }))
      }
    }, 1000),
    []
  )
  const handleKeyupField = (value) => {
    debouncedField(value)
  }

  const [company, setCompany] = useState([])
  const handleCompany = (value) => {
    setCompany(value)
  }
  // eslint-disable-next-line
  const debouncedCompany = useCallback(
    debounce((value) => {
      if (value.trim().length !== 0) {
        dispatch(searchCompany({ value: value.trim() }))
      }
    }, 1000),
    []
  )
  const handleKeyupCompany = (value) => {
    debouncedCompany(value)
  }

  const [position, setPosition] = useState([])
  const handlePosition = (value) => {
    setPosition(value)
  }
  // eslint-disable-next-line
  const debouncedPosition = useCallback(
    debounce((value) => {
      if (value.trim().length !== 0) {
        dispatch(searchPosition({ value: value.trim() }))
      }
    }, 1000),
    []
  )
  const handleKeyupPosition = (value) => {
    debouncedPosition(value)
  }

  const [skill, setSkill] = useState([])
  const handleSkill = (value) => {
    setSkill(value)
  }
  // eslint-disable-next-line
  const debouncedSkill = useCallback(
    debounce((value) => {
      if (value.trim().length !== 0) {
        dispatch(searchSkill({ value: value.trim() }))
      }
    }, 1000),
    []
  )
  const handleKeyupSkill = (value) => {
    debouncedSkill(value)
  }

  const clickSearch = () => {
    dispatch(searchCv({ language, gender, age, marital, tag, address, school, field, company, position, skill }))
  }

  return (
    <>
      <div className='shadow-tag'></div>
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
          <Button type='primary' onClick={clickSearch} block>
            Tìm kiếm
          </Button>
        </div>
        <div className='section'>BBB</div>
        <div className='sidebar right'>
          <div style={{ marginBottom: 20 }}>
            <h3 className='header'>
              <span>Thẻ (Tag)</span>
            </h3>
            <Select mode='multiple' value={tag} onChange={handleTag} onSearch={handleKeyupTag} style={{ width: '100%' }} filterOption={false} loading={searchStatus === 'pending'} placeholder='Chọn thẻ...'>
              {suggestTag.map((t) => (
                <Select.Option key={t.name}>{t.name}</Select.Option>
              ))}
            </Select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <h3 className='header'>
              <span>Khu vực</span>
            </h3>
            <Select mode='multiple' value={address} onChange={handleAddress} onSearch={handleKeyupAddress} style={{ width: '100%' }} filterOption={false} loading={searchStatus === 'pending'} placeholder='Chọn khu vực...'>
              {suggestAddress.map((t) => (
                <Select.Option key={t.name}>{t.name}</Select.Option>
              ))}
            </Select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <h3 className='header'>
              <span>Học vấn</span>
            </h3>
            <Select mode='multiple' value={school} onChange={handleSchool} onSearch={handleKeyupSchool} style={{ width: '100%' }} filterOption={false} loading={searchStatus === 'pending'} placeholder='Chọn trường học...'>
              {suggestSchool.map((t) => (
                <Select.Option key={t.name}>{t.name}</Select.Option>
              ))}
            </Select>
            <div style={{ height: 10 }}></div>
            <Select mode='multiple' value={field} onChange={handleField} onSearch={handleKeyupField} style={{ width: '100%' }} filterOption={false} loading={searchStatus === 'pending'} placeholder='Chọn chuyên ngành...'>
              {suggestField.map((t) => (
                <Select.Option key={t.name}>{t.name}</Select.Option>
              ))}
            </Select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <h3 className='header'>
              <span>Kinh nghiệm</span>
            </h3>
            <Select mode='multiple' value={company} onChange={handleCompany} onSearch={handleKeyupCompany} style={{ width: '100%' }} filterOption={false} loading={searchStatus === 'pending'} placeholder='Chọn công ty...'>
              {suggestCompany.map((t) => (
                <Select.Option key={t.name}>{t.name}</Select.Option>
              ))}
            </Select>
            <div style={{ height: 10 }}></div>
            <Select mode='multiple' value={position} onChange={handlePosition} onSearch={handleKeyupPosition} style={{ width: '100%' }} filterOption={false} loading={searchStatus === 'pending'} placeholder='Chọn vị trí...'>
              {suggestPosition.map((t) => (
                <Select.Option key={t.name}>{t.name}</Select.Option>
              ))}
            </Select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <h3 className='header'>
              <span>Kỹ năng</span>
            </h3>
            <Select mode='multiple' value={skill} onChange={handleSkill} onSearch={handleKeyupSkill} style={{ width: '100%' }} filterOption={false} loading={searchStatus === 'pending'} placeholder='Chọn kỹ năng...'>
              {suggestSkill.map((t) => (
                <Select.Option key={t.name}>{t.name}</Select.Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </>
  )
}
