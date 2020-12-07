import { DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, List, Popconfirm, Space } from 'antd'
import './list-cv.css'
import template1Logo from '../../templates/template1.png'
import { useDispatch, useSelector } from 'react-redux'
import { initCvInfo } from '../create-cv/createCVSlice'
import { useHistory } from 'react-router-dom'
// import template2Logo from '../../templates/template2.png'
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

  const deleteCv = (id) => {
    console.log(id)
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
        renderItem={(item) => (
          <List.Item>
            <div className='cv-list-item'>
              <img src={template1Logo} alt='my cv'></img>
              <div className='content'>
                <h2>{item.cvName}</h2>
                <div>{item.cvNote}</div>
                <div className='create-at'>{moment(item.lastModified).format('HH:mm:ss DD/MM/YYYY')}</div>
                <div className='button-group'>
                  <Space>
                    <Button type='primary' size='small' icon={<DownloadOutlined />}></Button>
                    <Button type='primary' size='small' icon={<EyeOutlined />}></Button>
                    <Button type='primary' size='small' icon={<EditOutlined />}></Button>
                    <Popconfirm
                      title='Xóa CV này?'
                      onConfirm={() => {
                        deleteCv(item.id)
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
        )}
      />
    </div>
  )
}
