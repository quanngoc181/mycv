import './create-cv.css'
import TemplateList from '../../templates/TemplateList'
import { useEffect, useRef, useState } from 'react'
import { Button, Input, message, Radio, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { resetStatus, updateCitation, updateCv, updateCvInfo, updateLanguage, updateTemplate } from '../create-cv/createCVSlice'
import { AppstoreOutlined, FontSizeOutlined, LineHeightOutlined } from '@ant-design/icons'
import { UploadImage } from './UploadImage'
import { viLabel, enLabel } from '../../util/dataUtil'
import { Orders } from './Orders'

export function CreateCV() {
  const dispatch = useDispatch()
  // const [useData, setUseData] = useState('original')
  const [aspect, setAspect] = useState(1)
  const [shape, setShape] = useState('round')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const uploadRef = useRef(null)

  let info = useSelector((state) => state.create.cvInfo)
  let status = useSelector((state) => state.create.updateStatus)
  let isEditting = useSelector((state) => state.create.isEditting)

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

  let { template, language, fontFamily, fontSize, lineHeight, citation, orders } = info

  const templateObj = TemplateList.find((t) => t.id === template)
  const TemplateComponent = templateObj ? templateObj.component : null

  const saveCV = () => {
    dispatch(updateCv())
  }

  const uploadImage = ({ aspect, shape }) => {
    setAspect(aspect)
    setShape(shape)
    uploadRef.current.click()
  }
  const uploadSuccess = (fileName) => {
    dispatch(updateCvInfo({ field: 'avatar', value: fileName }))
  }

  const updateRating = (index, rating) => {
    let rate = info.skills[index].rate === rating / 2 ? 0 : rating / 2
    dispatch(updateCvInfo({ field: 'skills', index, subfield: 'rate', value: rate }))
  }

  return (
    <>
      <div className='my-toolbar'>
        {/* <div className='my-divider'></div>
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
        </div> */}
        <div className='my-divider'></div>
        <div className='my-tool'>
          <Button
            size='small'
            icon={<AppstoreOutlined />}
            onClick={() => {
              if (orders) setIsModalVisible(true)
            }}
          />
        </div>
        <div className='my-divider'></div>
        <div className='my-tool'>
          <Radio.Group
            value={citation}
            onChange={(e) => {
              if (isEditting) message.warning({ content: 'Không thể thay đổi.' })
              else dispatch(updateCitation({ citation: e.target.value }))
            }}
            size='small'
          >
            <Radio.Button value='apa'>APA</Radio.Button>
            <Radio.Button value='mla'>MLA</Radio.Button>
          </Radio.Group>
        </div>
        <div className='my-divider'></div>
        <div className='my-tool'>
          <Radio.Group
            size='small'
            value={language}
            onChange={(e) => {
              if (isEditting) message.warning({ content: 'Không thể thay đổi.' })
              else dispatch(updateLanguage({ language: e.target.value }))
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
            onChange={(value) => {
              dispatch(updateCvInfo({ field: 'fontFamily', value }))
            }}
            style={{ width: 105 }}
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
              dispatch(updateCvInfo({ field: 'fontSize', value: e.target.value }))
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
              dispatch(updateCvInfo({ field: 'lineHeight', value: e.target.value }))
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
          <UploadImage aspect={aspect} shape={shape} ref={uploadRef} uploadSuccess={uploadSuccess} />
          <div style={{ marginBottom: 20 }}>
            <Input
              className='cv-name'
              value={info.cvName}
              onInput={(e) => {
                dispatch(updateCvInfo({ field: 'cvName', value: e.target.value }))
              }}
              size='large'
              placeholder='Tên CV'
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <Input.TextArea
              value={info.cvNote}
              onInput={(e) => {
                dispatch(updateCvInfo({ field: 'cvNote', value: e.target.value }))
              }}
              placeholder='Ghi chú...'
            />
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
                  if (template !== t.id) dispatch(updateTemplate({ template: t.id, ...t.config }))
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
        <div className='my-body'>{TemplateComponent !== null && <TemplateComponent viewMode={false} uploadImage={uploadImage} updateRating={updateRating} info={info} label={language === 'vi' ? viLabel : enLabel} />}</div>
      </div>
      {orders && <Orders orders={orders} language={language} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />}
    </>
  )
}
