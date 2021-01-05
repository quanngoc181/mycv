import React from 'react'
import { message, Upload } from 'antd'
import { GetToken } from '../../util/authenUtil'
import ImgCrop from 'antd-img-crop'

const UploadImage = React.forwardRef((props, ref) => {
  const attr = {
    name: 'file',
    showUploadList: false,
    action: 'http://localhost:8080/resources/cv',
    headers: GetToken(),
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) message.error({ content: 'You can only upload JPG/PNG file!' })

      const isLt10M = file.size / 1024 / 1024 < 1
      if (!isLt10M) message.error({ content: 'File của bạn lớn hơn cho phép.' })

      return isJpgOrPng && isLt10M
    },
    onChange(info) {
      if (info.file.status === 'done') {
        props.uploadSuccess(info.file.response)
      }
    },
  }

  return (
    <div style={{ height: 0, overflow: 'hidden' }}>
      <ImgCrop aspect={props.aspect} shape={props.shape} grid quality={1} modalTitle='Cắt ảnh' modalOk='Cắt' modalCancel='Hủy' cropperProps={{ zoomSpeed: 0.2 }}>
        <Upload accept='.png,.jpg' {...attr}>
          <div ref={ref}></div>
        </Upload>
      </ImgCrop>
    </div>
  )
})

export { UploadImage }
