import { DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, List, Popconfirm, Space } from 'antd'
import './list-cv.css'
import { useDispatch, useSelector } from 'react-redux'
import { initCvInfo, editCvInfo } from '../create-cv/createCVSlice'
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

  const handleUpdate = (id) => {
    dispatch(editCvInfo({ id }))
    history.push('/create-cv')
  }

  const handleDelete = (id) => {
    dispatch(deleteCv({ id }))
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
                  <h2>{item.cvName}</h2>
                  <div>{item.cvNote}</div>
                  <div className='create-at'>{moment(item.lastModified).format('HH:mm:ss DD/MM/YYYY')}</div>
                  <div className='button-group'>
                    <Space>
                      <Button type='primary' size='small' icon={<DownloadOutlined />}></Button>
                      <Button type='primary' size='small' icon={<EyeOutlined />}></Button>
                      <Button
                        type='primary'
                        size='small'
                        icon={<EditOutlined />}
                        onClick={() => {
                          handleUpdate(item.id)
                        }}
                      ></Button>
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
