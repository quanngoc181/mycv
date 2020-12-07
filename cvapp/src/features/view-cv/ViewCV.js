import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import TemplateList from '../../templates/TemplateList'
import { fetchCvView } from './viewCVSlice'

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

  return (
    <div style={{ backgroundColor: '#333', padding: '50px 0' }}>
      <div style={{ fontFamily, fontSize: fontSize + 'pt', lineHeight }}>
        <TemplateComponent viewMode={true} info={info} />
      </div>
    </div>
  )
}
