import { CheckOutlined, CloseOutlined, CopyOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined, FacebookOutlined, GiftOutlined, LinkedinOutlined, PlusOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Button, Card, Input, message, Modal, Popconfirm, Popover, Radio, Space, Statistic, Steps, Switch } from 'antd'
import '../../css/list-cv.css'
import { useDispatch, useSelector } from 'react-redux'
import { initCvInfo, editCv, copyCvAll, copyCvTemplate } from '../create-cv/createCVSlice'
import { useHistory } from 'react-router-dom'
import { deleteCv, getReceiver, publicCv, sendCv } from './listCVSlice'
import TemplateList from '../../templates/TemplateList'
import { useEffect, useState } from 'react'

export function ListCV() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [giftCv, setGiftCv] = useState(null)
  const [username, setUsername] = useState(null)
  const [step, setStep] = useState(0)
  const [type, setType] = useState('template')

  const [isModalVisible, setIsModalVisible] = useState(false)

  let receiveUser = useSelector((state) => state.list.receiveUser)
  let sendStatus = useSelector((state) => state.list.sendStatus)

  useEffect(() => {
    if (sendStatus === 'success') {
      setIsModalVisible(false)
      message.success({ content: 'Thành công' })
    }
    if (sendStatus === 'error') {
      setIsModalVisible(false)
      message.error({ content: 'Thất bại' })
    }
  }, [sendStatus])

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
    if (step === 2) {
      dispatch(sendCv({ cvId: giftCv, type }))
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
    <div className='container listcv-container' style={{ backgroundColor: '#fff', padding: 50, minHeight: 'calc(100vh - 104px)' }}>
      <h1 className='list-name'>
        <span>Danh sách CV</span>
      </h1>
      <div style={{ textAlign: 'right' }}>
        <Button type='primary' icon={<PlusOutlined />} onClick={createCV} className='create-button'>
          Tạo mới
        </Button>
      </div>
      {listCv.map((item, index) => {
        let logo = TemplateList.find((t) => t.id === item.template).logo
        return (
          <div key={index}>
            <Card style={{ marginBottom: index === listCv.length - 1 ? 0 : 20 }} hoverable>
              <div className='cv-list-item'>
                <img src={logo} alt='my cv'></img>
                <div className='content'>
                  <h2 className='cv-name'>
                    {item.cvName}
                    {item.sender && <span className='normal'>{' (Tặng bởi ' + item.sender + ')'}</span>}
                  </h2>
                  <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 5 }}>
                    <Statistic
                      title='Công khai'
                      value={' '}
                      prefix={
                        <Switch
                          checked={item.cvPublic}
                          onChange={(cvPublic) => {
                            dispatch(publicCv({ id: item.id, cvPublic }))
                          }}
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                        />
                      }
                    />
                    <Statistic title='Lượt xem' value={item.viewCount ? item.viewCount : 0} prefix={<EyeOutlined />} />
                    <Statistic title='Lượt tải' value={item.downloadCount ? item.downloadCount : 0} prefix={<DownloadOutlined />} />
                  </div>
                  <p className='cv-note'>{item.cvNote}</p>
                  <div className='create-at'>{item.lastModified}</div>
                  <div className='button-group'>
                    <Space>
                      <Button
                        type='primary'
                        size='small'
                        icon={<EyeOutlined />}
                        onClick={() => {
                          handleView(item.identifier)
                        }}
                        ghost
                      >
                        Xem CV
                      </Button>
                      <Button
                        type='primary'
                        size='small'
                        icon={<EditOutlined />}
                        onClick={() => {
                          handleUpdate(item.id)
                        }}
                      >
                        Sửa CV
                      </Button>
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
                        <Button type='dashed' size='small' icon={<CopyOutlined />}>
                          Sao chép
                        </Button>
                      </Popover>
                      <Popconfirm
                        title='Xóa CV này?'
                        onConfirm={() => {
                          handleDelete(item.id)
                        }}
                        okText='Xóa'
                        cancelText='Hủy'
                      >
                        <Button type='primary' size='small' icon={<DeleteOutlined />} danger>
                          Xóa CV
                        </Button>
                      </Popconfirm>
                      <Popover
                        content={
                          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Button type='primary' size='small' icon={<FacebookOutlined />} onClick={handleShareFb} style={{ marginRight: 10 }}>
                              Facebook
                            </Button>
                            <Button type='primary' size='small' icon={<LinkedinOutlined />} onClick={handleShareIn}>
                              LinkedIn
                            </Button>
                          </div>
                        }
                        title='Chia sẻ CV'
                        trigger='click'
                      >
                        <Button type='primary' size='small' icon={<ShareAltOutlined />}>
                          Chia sẻ
                        </Button>
                      </Popover>
                      <Button type='primary' size='small' icon={<GiftOutlined />} onClick={() => showModal(item.id)}>
                        Tặng CV
                      </Button>
                    </Space>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )
      })}
      <Modal
        title='Tặng CV'
        width={600}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleBack}>
            {step === 0 ? 'Hủy bỏ' : 'Quay lại'}
          </Button>,
          <Button key='submit' type='primary' onClick={handleOk} loading={sendStatus === 'pending'}>
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
