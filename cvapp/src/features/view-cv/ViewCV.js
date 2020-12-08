import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import TemplateList from '../../templates/TemplateList'
import { fetchCvView } from './viewCVSlice'
import './view-cv.css'
import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

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
  let cv = document.querySelector('.cv-container')
  cv.style.boxShadow = 'unset'
  document.body.style.overflowY = 'hidden'

  html2canvas(cv, { backgroundColor: '#ffffff', scale: 2, scrollY: -window.scrollY }).then(function (canvas) {
    let pdf = new jsPDF({ unit: 'px' })
    let pdfWidth = pdf.internal.pageSize.getWidth()
    let pdfHeight = pdf.internal.pageSize.getHeight()
    let width = 794 * 2
    let height = 1123 * 2

    for (var i = 0; i <= cv.clientHeight / 1123; i++) {
      let tmpCanvas = document.createElement('canvas')
      tmpCanvas.width = width
      tmpCanvas.height = height
      tmpCanvas.style.marginBottom = '-6px'
      let ctx = tmpCanvas.getContext('2d')

      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, width, height)
      ctx.drawImage(canvas, 0, height * i, width, height, 0, 0, width, height)

      if (i > 0) pdf.addPage()
      pdf.setPage(i + 1)
      pdf.addImage(tmpCanvas, 'JPEG', 0, 0, pdfWidth, pdfHeight, 'image' + i, 'NONE', 0)
    }

    pdf.save(name)
    document.body.style.overflowY = 'scroll'
  })
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
      let css = img.style.backgroundImage
      let url = css.substring(5, css.length - 2)
      toDataUrl(url, function (myBase64) {
        img.style.backgroundImage = `url("${myBase64}")`
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
        </div>
      </div>
    </div>
  )
}
