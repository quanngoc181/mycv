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
import { viLabel, enLabel } from '../../util/dataUtil'

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

  let paddingString = window.getComputedStyle(cv).getPropertyValue('padding-top')
  let pagePadding = Number(paddingString.substring(0, paddingString.length - 2))

  // let oldHeightString = window.getComputedStyle(cv).getPropertyValue('height')
  // let oldPageHeight = Number(oldHeightString.substring(0, oldHeightString.length - 2))

  let a4Width = 794
  let a4Height = 1123

  let sections = document.querySelectorAll('.cv-section')
  for (let i = 1; i < sections.length; i++) {
    const previousSection = sections[i - 1]
    const currentsection = sections[i]

    let previousTop = previousSection.offsetTop
    let previousHeight = previousSection.offsetHeight

    let currentTop = currentsection.offsetTop
    let currentHeight = currentsection.offsetHeight

    let currentPage = Math.floor(currentTop / a4Height) + 1

    if (currentTop + currentHeight + pagePadding > currentPage * a4Height) {
      let breakSpace = currentPage * a4Height - previousTop - previousHeight + pagePadding
      previousSection.style.marginBottom = breakSpace + 'px'
    }
  }

  let newPageHeight = cv.offsetHeight

  let roundedHeight = (Math.floor(newPageHeight / a4Height) + 1) * a4Height
  cv.style.height = roundedHeight + 'px'

  html2canvas(cv, { backgroundColor: '#ffffff', scale: 4, scrollY: -window.scrollY }).then(function (canvas) {
    let pdf = new jsPDF({ unit: 'px' })
    let pdfWidth = pdf.internal.pageSize.getWidth()
    let pdfHeight = pdf.internal.pageSize.getHeight()
    let width = a4Width * 4
    let height = a4Height * 4

    for (var i = 0; i <= (cv.clientHeight - 1) / a4Height; i++) {
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

    for (let i = 1; i < sections.length; i++) {
      let section = sections[i]
      let marginBottom = section.style.marginBottom
      if (marginBottom) section.style.marginBottom = null
    }

    cv.style.height = null
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
          <TemplateComponent viewMode={true} uploadImage={() => true} updateRating={() => true} info={info} label={info.language === 'vi' ? viLabel : enLabel} />
        </div>
      </div>
    </div>
  )
}
