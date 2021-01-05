import { CheckOutlined, CloseOutlined, CopyOutlined, DeleteOutlined, EditOutlined, EyeOutlined, FacebookOutlined, GiftOutlined, LinkedinOutlined, PlusOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Button, Input, List, Modal, Popconfirm, Popover, Radio, Space, Steps, Switch } from 'antd'
import '../../css/list-cv.css'
import { useDispatch, useSelector } from 'react-redux'
import { initCvInfo, editCv, copyCvAll, copyCvTemplate } from '../create-cv/createCVSlice'
import { useHistory } from 'react-router-dom'
import { deleteCv, getReceiver, publicCv } from './listCVSlice'
import TemplateList from '../../templates/TemplateList'
import { useState } from 'react'

export function ListCV() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [giftCv, setGiftCv] = useState(null)
  const [username, setUsername] = useState(null)
  const [step, setStep] = useState(0)
  const [type, setType] = useState('template')

  const [isModalVisible, setIsModalVisible] = useState(false)

  let receiveUser = useSelector((state) => state.list.receiveUser)

  const showModal = (cvId) => {
    setGiftCv(cvId)
    setStep(0)
    setIsModalVisible(true)
  }

  const handleOk = () => {
    if (step === 0 && username !== null && username.length > 0) {
      dispatch(getReceiver({ username }))
      setStep(1)
    }
    if (step === 1 && receiveUser) {
      setStep(2)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleBack = () => {
    if (step === 0) setIsModalVisible(false)
    else setStep(step - 1)
  }

  const changeUsername = (e) => {
    setUsername(e.target.value.trim())
  }

  const listCv = useSelector((state) => state.list.listCv)

  if (listCv === null) return null

  const createCV = () => {
    dispatch(initCvInfo())
    history.push('/create-cv')
  }

  const handleView = (identifier) => {
    window.open('http://localhost:3000/cvwr/' + identifier)
  }

  const handleUpdate = (id) => {
    dispatch(editCv({ id }))
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
    dispatch(copyCvAll({ id }))
    history.push('/create-cv')
  }

  const handleCopyConfig = (id) => {
    dispatch(copyCvTemplate({ id }))
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
                  <div className='create-at'>{item.lastModified}</div>
                  <div className='button-group'>
                    <Space>
                      <Switch
                        checked={item.cvPublic}
                        onChange={(cvPublic) => {
                          dispatch(publicCv({ id: item.id, cvPublic }))
                        }}
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                      />
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
                      <Button type='primary' size='small' icon={<GiftOutlined />} onClick={() => showModal(item.id)}></Button>
                    </Space>
                  </div>
                </div>
              </div>
            </List.Item>
          )
        }}
      />
      <Modal
        title='Tặng CV'
        width={600}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleBack}>
            {step === 0 ? 'Hủy bỏ' : 'Quay lại'}
          </Button>,
          <Button key='submit' type='primary' onClick={handleOk}>
            {step === 2 ? 'Tặng CV' : 'Tiếp tục'}
          </Button>,
        ]}
      >
        <Steps current={step}>
          <Steps.Step title='Bước 1' description='Nhập tên tài khoản.' />
          <Steps.Step title='Bước 2' description='Xác nhận tài khoản.' />
          <Steps.Step title='Bước 3' description='Xác nhận tặng CV.' />
        </Steps>
        <div className='send-container'>
          {step === 0 && (
            <>
              <div style={{ marginBottom: 5, fontWeight: 500 }}>Tài khoản người nhận:</div>
              <Input value={username} onChange={changeUsername} placeholder='Nhập tài khoản' />
            </>
          )}
          {step === 1 && (
            <>
              {receiveUser ? (
                <div className='receive-user'>
                  <img src={'http://localhost:8080/resources/avatar/' + receiveUser.avatar} alt='avatar' />
                  <div>{receiveUser.fullName}</div>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>Không tìm thấy tài khoản</div>
              )}
            </>
          )}
          {step === 2 && (
            <div style={{ textAlign: 'center' }}>
              <Radio.Group value={type} onChange={(e) => setType(e.target.value)}>
                <Radio value={'template'}>Tặng template</Radio>
                <Radio value={'all'}>Tặng toàn bộ</Radio>
              </Radio.Group>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}
