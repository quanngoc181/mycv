import { CameraOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { GetToken } from '../../util/authenUtil'
import { updateAvatar } from './infoSlice'

export function UploadAvatar() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const props = {
    name: 'file',
    showUploadList: false,
    action: 'http://localhost:8080/users/change-avatar',
    headers: GetToken(),
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) console.log('You can only upload JPG/PNG file!')

      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) console.log('Image must smaller than 10MB!')

      return isJpgOrPng && isLt10M
    },
    onChange(info) {
      if (info.file.status === 'uploading') {
        setLoading(true)
      }
      if (info.file.status === 'done') {
        dispatch(updateAvatar(info.file.response))
        setLoading(false)
      }
    },
  }

  return (
    <ImgCrop aspect={1} shape='round' grid quality={1} modalTitle='Cắt ảnh' modalOk='Cắt' modalCancel='Hủy' cropperProps={{ zoomSpeed: 0.2 }}>
      <Upload {...props}>
        <Button className='change-avatar' shape='circle' icon={loading ? <LoadingOutlined /> : <CameraOutlined />} />
      </Upload>
    </ImgCrop>
  )
}
