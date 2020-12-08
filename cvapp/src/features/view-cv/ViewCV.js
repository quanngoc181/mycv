import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import TemplateList from '../../templates/TemplateList'
import { fetchCvView } from './viewCVSlice'
import './view-cv.css'
import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
// import { jsPDF } from 'jspdf'
// import '../../templates/font/arial-normal.js'

function toDataUrl(url, callback) {
  let xhr = new XMLHttpRequest()
  xhr.onload = function () {
    let reader = new FileReader()
    reader.onloadend = function () {
      callback(reader.result)
    }
    reader.readAsDataURL(xhr.response)
  }
  xhr.open('GET', url)
  xhr.responseType = 'blob'
  xhr.send()
}

function generatePdf(name) {
  console.log(name);
  // let doc = new jsPDF()

  // doc.setFont('arial', 'normal')
  // doc.text('Việt Nam!', 10, 10)

  // console.log(doc.getFont())
  // console.log(doc.getFontList())

  // doc.save(name + '.pdf')

  // doc.html(document.querySelector('.cv-container'), {
  //   callback: function (doc) {
  //     doc.save(name + '.pdf')
  //   },
  //   margin: [0, 0, 0, 0],
  //   x: 0,
  //   y: 0,
  // })
}

export function ViewCV() {
  let { identifier } = useParams()
  const dispatch = useDispatch()
  const info = useSelector((state) => state.view.cvView)

  useEffect(() => {
    dispatch(fetchCvView({ identifier }))
  }, [dispatch, identifier])

  if (info === null) return null

  let { template, fontFamily, fontSize, lineHeight } = info

  const TemplateComponent = TemplateList.find((t) => t.id === template).component

  const handleDownload = () => {
    let img = document.querySelector('.cv-avatar')
    if (img === null) {
      generatePdf(info.cvName)
    } else {
      toDataUrl(img.src, function (myBase64) {
        img.src = myBase64
        generatePdf(info.cvName)
      })
    }
  }

  return (
    <div className='view-cv-container'>
      <div className='header'>
        <div>{'Xem CV ' + info.cvName}</div>
        <Button size='small' icon={<DownloadOutlined />} ghost onClick={handleDownload}></Button>
      </div>
      <div style={{ backgroundColor: '#333', padding: '100px 0 50px' }}>
        <div style={{ fontFamily, fontSize: fontSize + 'pt', lineHeight }}>
          <TemplateComponent viewMode={true} info={info} />
          {/* <div className='cv-container cv-container1'>
            AAA
          </div> */}
        </div>
      </div>
    </div>
  )
}
