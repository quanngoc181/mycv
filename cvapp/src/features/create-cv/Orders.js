import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ReactSortable } from 'react-sortablejs'
import { updateCvInfo } from './createCVSlice'

const labels = {
  vi: {
    information: 'thông tin',
    profile: 'giới thiệu',
    education: 'học vấn',
    work: 'kinh nghiệm',
    project: 'dự án',
    membership: 'thành viên',
    skill: 'kỹ năng',
    award: 'giải thưởng',
    certificate: 'chứng nhận',
    scholarship: 'học bổng',
    thesis: 'luận văn',
    publication: 'xuất bản',
    activity: 'hoạt động',
    hobby: 'sở thích',
    additional: 'thêm',
  },
  en: {
    information: 'information',
    profile: 'profile',
    education: 'education',
    work: 'work',
    project: 'project',
    membership: 'membership',
    skill: 'skill',
    award: 'award',
    certificate: 'certificate',
    scholarship: 'scholarship',
    thesis: 'thesis',
    publication: 'publication',
    activity: 'activity',
    hobby: 'hobby',
    additional: 'additional',
  },
}

export function Orders({ orders, language, isModalVisible, setIsModalVisible }) {
  const dispatch = useDispatch()
  const [state, setState] = useState([])

  useEffect(() => {
    setState(orders)
  }, [orders])

  const onChange = (list, index) => {
    let tmp = JSON.parse(JSON.stringify(state))
    tmp[index] = list
    setState(tmp)
  }

  const handleClose = () => {
    setIsModalVisible(false)
    dispatch(updateCvInfo({ field: 'orders', value: state }))
  }

  const hideItem = (name) => {
    let tmp = JSON.parse(JSON.stringify(state))
    for (let i = 0; i < tmp.length; i++) {
      for (let j = 0; j < tmp[i].length; j++) {
        if(tmp[i][j].name === name) tmp[i][j].display = false
      }
    }
    setState(tmp)
  }

  const showItem = (name) => {
    let tmp = JSON.parse(JSON.stringify(state))
    for (let i = 0; i < tmp.length; i++) {
      for (let j = 0; j < tmp[i].length; j++) {
        if(tmp[i][j].name === name) tmp[i][j].display = true
      }
    }
    setState(tmp)
  }

  return (
    <Modal style={{ top: 10, paddingBottom: 0 }} width={560} title='Bố Cục' visible={isModalVisible} footer={null} onCancel={handleClose}>
      <div className='d-flex'>
        <div className='layout-page'>
          {state.map((s, index) => (
            <div className='layout-column' key={index}>
              <ReactSortable list={s} setList={(list) => onChange(list, index)}>
                {s
                  .filter((s) => s.display)
                  .map((item) => (
                    <div className='layout-item' key={item.name}>
                      {labels[language][item.name]}
                      <span className='layout-item-action remove' onClick={() => hideItem(item.name)}>&times;</span>
                    </div>
                  ))}
              </ReactSortable>
            </div>
          ))}
        </div>
        <div className='layout-page' style={{ marginLeft: 12, outlineStyle: 'dashed' }}>
          <div className='layout-column'>
            {state
              .reduce((acc, val) => acc.concat(val), [])
              .filter((s) => !s.display)
              .map((item) => (
                <div className='layout-item' key={item.name} style={{ background: 'rgb(128, 128, 128, 0.5)' }}>
                  {labels[language][item.name]}
                  <span className='layout-item-action add' onClick={() => showItem(item.name)}>+</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}
