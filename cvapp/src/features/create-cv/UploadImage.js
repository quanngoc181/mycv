import React from 'react'
import { Upload } from 'antd'
import { GetToken } from '../../utilities/authenUtility'

const UploadImage = React.forwardRef((props, ref) => {
  const attr = {
    name: 'file',
    showUploadList: false,
    action: 'http://localhost:8080/cv-info/upload-image',
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
      }
      if (info.file.status === 'done') {
        props.uploadSuccess(info.file.response)
      }
    },
  }

  return (
    <div style={{ height: 0, overflow: 'hidden' }}>
      <Upload {...attr}>
        <div ref={ref}></div>
      </Upload>
    </div>
  )
})

export { UploadImage }
