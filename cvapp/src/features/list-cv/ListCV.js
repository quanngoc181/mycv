import { CopyOutlined, DeleteOutlined, EditOutlined, EyeOutlined, FacebookOutlined, LinkedinOutlined, PlusOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Button, List, Popconfirm, Popover, Space } from 'antd'
import './list-cv.css'
import { useDispatch, useSelector } from 'react-redux'
import { initCvInfo, editCvInfo, copyCvInfo, copyCvConfig } from '../create-cv/createCVSlice'
import { useHistory } from 'react-router-dom'
import { deleteCv } from './listCVSlice'
import TemplateList from '../../templates/TemplateList'
const moment = require('moment')

export function ListCV() {
  const dispatch = useDispatch()
  const history = useHistory()

  const listCv = useSelector((state) => state.list.listCv)

  if (listCv === null) return null

  const createCV = () => {
    dispatch(initCvInfo())
    history.push('/create-cv')
  }

  const handleView = (identifier) => {
    history.push('/cvwr/' + identifier)
  }

  const handleUpdate = (id) => {
    dispatch(editCvInfo({ id }))
    history.push('/create-cv')
  }

  const handleDelete = (id) => {
    dispatch(deleteCv({ id }))
  }

  const handleShareFb = () => {
    window.FB.ui({ method: 'share', href: 'https://en.wikipedia.org/wiki/Vietnam' }, () => {})
  }

  const handleShareIn = () => {
    window.open('https://www.linkedin.com/sharing/share-offsite/?url=https://en.wikipedia.org/wiki/Vietnam')
  }

  const handleCopyData = (id) => {
    dispatch(copyCvInfo({ id }))
    history.push('/create-cv')
  }

  const handleCopyConfig = (id) => {
    dispatch(copyCvConfig({ id }))
    history.push('/create-cv')
  }

  return (
    <div className='container' style={{ backgroundColor: '#fff', padding: 50 }}>
      <List
        header={
          <div className='list-header'>
            <b>Danh Sách CV</b>
            <Button type='primary' size='small' icon={<PlusOutlined />} onClick={createCV}></Button>
          </div>
        }
        bordered
        dataSource={listCv}
        renderItem={(item) => {
          let logo = TemplateList.find((t) => t.id === item.template).logo
          return (
            <List.Item>
              <div className='cv-list-item'>
                <img src={logo} alt='my cv'></img>
                <div className='content'>
                  <h2 style={{ marginBottom: 0 }}>{item.cvName}</h2>
                  <div>
                    Lượt xem: {item.viewCount ? item.viewCount : 0} Lượt tải: {item.downloadCount ? item.downloadCount : 0}
                  </div>
                  <div>{item.cvNote}</div>
                  <div className='create-at'>{moment(item.lastModified).format('HH:mm:ss DD/MM/YYYY')}</div>
                  <div className='button-group'>
                    <Space>
                      <Button
                        type='primary'
                        size='small'
                        icon={<EyeOutlined />}
                        onClick={() => {
                          handleView(item.identifier)
                        }}
                      ></Button>
                      <Button
                        type='primary'
                        size='small'
                        icon={<EditOutlined />}
                        onClick={() => {
                          handleUpdate(item.id)
                        }}
                      ></Button>
                      <Popover
                        content={
                          <div>
                            <Button
                              type='primary'
                              size='small'
                              onClick={() => {
                                handleCopyData(item.id)
                              }}
                              style={{ marginRight: 10 }}
                            >
                              Giữ thông tin cũ
                            </Button>
                            <Button
                              type='primary'
                              size='small'
                              onClick={() => {
                                handleCopyConfig(item.id)
                              }}
                            >
                              Dùng thông tin mới
                            </Button>
                          </div>
                        }
                        title='Sao chép CV'
                        trigger='click'
                      >
                        <Button type='primary' size='small' icon={<CopyOutlined />}></Button>
                      </Popover>
                      <Popconfirm
                        title='Xóa CV này?'
                        onConfirm={() => {
                          handleDelete(item.id)
                        }}
                        okText='Xóa'
                        cancelText='Hủy'
                      >
                        <Button type='primary' size='small' icon={<DeleteOutlined />}></Button>
                      </Popconfirm>
                      <Popover
                        content={
                          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Button type='primary' size='small' icon={<FacebookOutlined />} onClick={handleShareFb}></Button>
                            <Button type='primary' size='small' icon={<LinkedinOutlined />} onClick={handleShareIn}></Button>
                          </div>
                        }
                        title='Chia sẻ CV'
                        trigger='click'
                      >
                        <Button type='primary' size='small' icon={<ShareAltOutlined />}></Button>
                      </Popover>
                    </Space>
                  </div>
                </div>
              </div>
            </List.Item>
          )
        }}
      />
    </div>
  )
}
