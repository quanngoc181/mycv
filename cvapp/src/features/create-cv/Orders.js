import { Checkbox, Modal } from 'antd'
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
    gender: 'Giới tính',
    dob: 'Ngày sinh',
    address: 'Địa chỉ',
    marital: 'Hôn nhân',
    childs: 'Số con',
    nationality: 'Quốc tịch',
    religion: 'Tôn giáo',
    phone: 'Điện thoại',
    email: 'Email',
    website: 'Website',
    book: 'Sách',
    journal: 'Tạp chí',
    presentation: 'Thuyết trình',
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
    gender: 'Gender',
    dob: 'Birthday',
    address: 'Address',
    marital: 'Marital Status',
    childs: 'Children',
    nationality: 'Nationality',
    religion: 'Religion',
    phone: 'Tel',
    email: 'Email',
    website: 'Website',
    book: 'Books',
    journal: 'Journals',
    presentation: 'Presentations',
  },
}

export function Orders({ orders, subs, language, isModalVisible, setIsModalVisible }) {
  const dispatch = useDispatch()
  const [state, setState] = useState([])
  const [state1, setState1] = useState([])

  useEffect(() => {
    setState(orders)
    setState1(subs)
  }, [orders, subs])

  const onChange = (list, index) => {
    let tmp = JSON.parse(JSON.stringify(state))
    tmp[index] = list
    setState(tmp)
  }

  const handleClose = () => {
    setIsModalVisible(false)
    dispatch(updateCvInfo({ field: 'orders', value: state }))
    dispatch(updateCvInfo({ field: 'subs', value: state1 }))
  }

  const hideItem = (name) => {
    let tmp = JSON.parse(JSON.stringify(state))
    for (let i = 0; i < tmp.length; i++) {
      for (let j = 0; j < tmp[i].length; j++) {
        if (tmp[i][j].name === name) tmp[i][j].display = false
      }
    }
    setState(tmp)
  }

  const showItem = (name) => {
    let tmp = JSON.parse(JSON.stringify(state))
    for (let i = 0; i < tmp.length; i++) {
      for (let j = 0; j < tmp[i].length; j++) {
        if (tmp[i][j].name === name) tmp[i][j].display = true
      }
    }
    setState(tmp)
  }

  const changeSubs = (sub) => {
    let tmp = JSON.parse(JSON.stringify(state1))
    for (let i = 0; i < tmp.length; i++) {
      if (tmp[i].name === sub) tmp[i].display = !tmp[i].display
    }
    setState1(tmp)
  }

  return (
    <Modal style={{ top: 10, paddingBottom: 0 }} width={822} title='Bố Cục' visible={isModalVisible} footer={null} onCancel={handleClose}>
      <div className='d-flex'>
        <div>
          <h3 style={{ textAlign: 'center' }}>Sắp xếp</h3>
          <div className='layout-page'>
            {state.map((s, index) => (
              <div className='layout-column' key={index}>
                <ReactSortable list={s} setList={(list) => onChange(list, index)}>
                  {s.map((item) => (
                    <div className='layout-item' key={item.name} style={{ display: item.display ? 'block' : 'none' }}>
                      {labels[language][item.name]}
                      <span className='layout-item-action remove' onClick={() => hideItem(item.name)}>
                        &times;
                      </span>
                    </div>
                  ))}
                </ReactSortable>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 style={{ textAlign: 'center' }}>Mục ẩn</h3>
          <div className='layout-page' style={{ marginLeft: 12, outlineStyle: 'dashed' }}>
            <div className='layout-column'>
              {state
                .reduce((acc, val) => acc.concat(val), [])
                .filter((s) => !s.display)
                .map((item) => (
                  <div className='layout-item' key={item.name} style={{ background: 'rgb(128, 128, 128, 0.5)' }}>
                    {labels[language][item.name]}
                    <span className='layout-item-action add' onClick={() => showItem(item.name)}>
                      +
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <h3 style={{ textAlign: 'center' }}>Mục nhỏ</h3>
          <div className='layout-page' style={{ marginLeft: 12 }}>
            <div className='layout-column'>
              {state1.map((sub, index) => (
                <div style={{ marginBottom: 5 }} key={index} onChange={() => changeSubs(sub.name)}>
                  <Checkbox checked={sub.display}>{labels[language][sub.name]}</Checkbox>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
