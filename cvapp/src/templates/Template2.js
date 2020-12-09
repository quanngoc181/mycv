import './template2.css'
import gender from './icon/gender.png'
import dob from './icon/dob.png'
import address from './icon/address.png'
import marital from './icon/marital.png'
import childs from './icon/childs.png'
import nationality from './icon/nationality.png'
import religion from './icon/religion.png'
import phone from './icon/phone.png'
import email from './icon/email.png'
import website from './icon/website.png'
import { useEffect } from 'react'
import $ from 'jquery'
import { useDispatch } from 'react-redux'
import { addCvInfo, deleteCvInfo, updateCvInfo } from '../features/create-cv/createCVSlice'

export function Template2({ info, uploadImage, updateRating, viewMode }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (viewMode === false) {
      let edits = document.querySelectorAll('[field]')
      edits.forEach((element) => {
        element.setAttribute('contenteditable', 'true')
      })
    }

    let items = $('.cv-section-item')
    items.each((index, item) => {
      let action = $(`
        <div class='cv-action'>
          <button class='cv-add'>+</button>
          <button class='cv-remove'>-</button>
        </div>
      `)
      if ($(item).find('.cv-action').length === 0) item.append(action[0])
    })
  })

  const onBlur = (e) => {
    let field = e.target.getAttribute('field')
    if (!field) return
    let index = e.target.getAttribute('index')
    let subfield = e.target.getAttribute('subfield')
    let value = e.target.innerText
    dispatch(updateCvInfo({ field, index, subfield, value }))
  }

  const onClick = (e) => {
    let el = $(e.target)
    let field = el.closest('.cv-section-item').find('[field]').attr('field')
    let index = el.closest('.cv-section-item').find('[field]').attr('index')

    if (el.hasClass('cv-add')) {
      dispatch(addCvInfo({ field, index }))
    } else if (el.hasClass('cv-remove')) {
      dispatch(deleteCvInfo({ field, index }))
    }
  }

  return (
    <>
      <div className='cv-container cv-container2' spellCheck={false} onBlur={onBlur} onClick={onClick}>
        <div className='cv-top'>
          <div className='cv-fullname' field='fullName'>
            {info.fullName}
          </div>
          <div className='cv-position' field='position'>
            {info.position}
          </div>
        </div>
        <div className='d-flex'>
          <div className='cv-col-1'>
            <div className='cv-section'>
              <div className='cv-section-header'>Thông tin</div>
              <div className='cv-info-item'>
                <img src={gender} alt='gender' className='cv-icon' />
                <span field='gender'>{info.gender}</span>
              </div>
              <div className='cv-info-item'>
                <img src={dob} alt='dob' className='cv-icon' />
                <span field='dob'>{info.dob}</span>
              </div>
              <div className='cv-info-item'>
                <img src={address} alt='address' className='cv-icon' />
                <span field='address'>{info.address}</span>
              </div>
              <div className='cv-info-item'>
                <img src={marital} alt='marital' className='cv-icon' />
                <span field='marital'>{info.marital}</span>
              </div>
              <div className='cv-info-item'>
                <img src={childs} alt='childs' className='cv-icon' />
                <span field='childs'>{info.childs}</span>
              </div>
              <div className='cv-info-item'>
                <img src={nationality} alt='nationality' className='cv-icon' />
                <span field='nationality'>{info.nationality}</span>
              </div>
              <div className='cv-info-item'>
                <img src={religion} alt='religion' className='cv-icon' />
                <span field='religion'>{info.religion}</span>
              </div>
              <div className='cv-info-item'>
                <img src={phone} alt='phone' className='cv-icon' />
                <span field='phone'>{info.phone}</span>
              </div>
              <div className='cv-info-item'>
                <img src={email} alt='email' className='cv-icon' />
                <span field='email'>{info.email}</span>
              </div>
              <div className='cv-info-item'>
                <img src={website} alt='website' className='cv-icon' />
                <span field='socials' className='pre-line'>
                  {info.socials}
                </span>
              </div>
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Kỹ năng</div>
              {info.skills.map((skill, index) => (
                <div className='cv-section-item cv-skill-item' key={index}>
                  <div field='skills' index={index} subfield='name'>
                    {skill.name}
                  </div>
                  <div className='rating'>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, i) => (
                      <span
                        style={{ backgroundColor: skill.rate * 2 > number ? '#000' : '#ddd' }}
                        onClick={() => {
                          updateRating(index, number + 1)
                        }}
                        key={i}
                      ></span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Chứng nhận</div>
              {info.certificates.map((certificate, index) => (
                <div className='cv-section-item cv-certificate-item' key={index}>
                  <div>
                    <div className='font-bold' field='certificates' index={index} subfield='name'>
                      {certificate.name}
                    </div>
                    <div>
                      <span>(</span>
                      <span field='certificates' index={index} subfield='year' style={{ minWidth: 25, display: 'inline-block' }}>
                        {certificate.year}
                      </span>
                      <span>)</span>
                    </div>
                  </div>
                  <div field='certificates' index={index} subfield='organization'>
                    {certificate.organization}
                  </div>
                </div>
              ))}
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Giải thưởng</div>
              {info.awards.map((award, index) => (
                <div className='cv-section-item cv-award-item' key={index}>
                  <div>
                    <div className='font-bold' field='awards' index={index} subfield='name'>
                      {award.name}
                    </div>
                    <div>
                      <span>(</span>
                      <span field='awards' index={index} subfield='year' style={{ minWidth: 25, display: 'inline-block' }}>
                        {award.year}
                      </span>
                      <span>)</span>
                    </div>
                  </div>
                  <div field='awards' index={index} subfield='organization'>
                    {award.organization}
                  </div>
                </div>
              ))}
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Học bổng</div>
              {info.scholarships.map((scholarship, index) => (
                <div className='cv-section-item cv-scholarship-item' key={index}>
                  <div>
                    <div className='font-bold' field='scholarships' index={index} subfield='name'>
                      {scholarship.name}
                    </div>
                    <div>
                      <span>(</span>
                      <span field='scholarships' index={index} subfield='year' style={{ minWidth: 25, display: 'inline-block' }}>
                        {scholarship.year}
                      </span>
                      <span>)</span>
                    </div>
                  </div>
                  <div field='scholarships' index={index} subfield='organization'>
                    {scholarship.organization}
                  </div>
                </div>
              ))}
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Tổ chức</div>
              {info.memberships.map((membership, index) => (
                <div className='cv-section-item cv-membership-item' key={index}>
                  <div>
                    <div className='font-bold' field='memberships' index={index} subfield='organization'>
                      {membership.organization}
                    </div>
                    <div>
                      <span>(</span>
                      <span field='memberships' index={index} subfield='start' style={{ minWidth: 50, display: 'inline-block' }}>
                        {membership.start}
                      </span>
                      <span> - </span>
                      <span field='memberships' index={index} subfield='end' style={{ minWidth: 50, display: 'inline-block' }}>
                        {membership.end}
                      </span>
                      <span>)</span>
                    </div>
                  </div>
                  <div field='memberships' index={index} subfield='role'>
                    {membership.role}
                  </div>
                </div>
              ))}
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Sở thích</div>
              {info.hobbies.map((hobby, index) => (
                <div className='cv-section-item' key={index}>
                  <div className='cv-bullet' field='hobbies' index={index}>
                    {hobby}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='cv-col-2'>
            <div className='cv-section'>
              <div className='cv-section-header'>Giới Thiệu</div>
              <p className='cv-page text-justify pre-line' field='profile'>
                {info.profile}
              </p>
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Học vấn</div>
              {info.educations.map((education, index) => (
                <div className='cv-section-item cv-education-item' key={index}>
                  <div className='d-flex justify-content-between mb-5'>
                    <div className='font-bold'>
                      <span field='educations' index={index} subfield='school' style={{ minWidth: 50, display: 'inline-block' }}>
                        {education.school}
                      </span>
                      <span> - </span>
                      <span field='educations' index={index} subfield='field' style={{ minWidth: 50, display: 'inline-block' }}>
                        {education.field}
                      </span>
                    </div>
                    <div className='cv-date'>
                      <span field='educations' index={index} subfield='start' style={{ minWidth: 50, display: 'inline-block' }}>
                        {education.start}
                      </span>
                      <span> - </span>
                      <span field='educations' index={index} subfield='end' style={{ minWidth: 50, display: 'inline-block' }}>
                        {education.end}
                      </span>
                    </div>
                  </div>
                  <div className='cv-page pre-line' field='educations' index={index} subfield='description'>
                    {education.description}
                  </div>
                </div>
              ))}
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Kinh nghiệm làm việc</div>
              {info.works.map((work, index) => (
                <div className='cv-section-item cv-work-item' key={index}>
                  <div className='d-flex justify-content-between mb-5'>
                    <div className='font-bold'>
                      <span field='works' index={index} subfield='company' style={{ minWidth: 50, display: 'inline-block' }}>
                        {work.company}
                      </span>
                      <span> - </span>
                      <span field='works' index={index} subfield='position' style={{ minWidth: 50, display: 'inline-block' }}>
                        {work.position}
                      </span>
                    </div>
                    <div className='cv-date'>
                      <span field='works' index={index} subfield='start' style={{ minWidth: 50, display: 'inline-block' }}>
                        {work.start}
                      </span>
                      <span> - </span>
                      <span field='works' index={index} subfield='end' style={{ minWidth: 50, display: 'inline-block' }}>
                        {work.end}
                      </span>
                    </div>
                  </div>
                  <div className='cv-page pre-line' field='works' index={index} subfield='description'>
                    {work.description}
                  </div>
                </div>
              ))}
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Dự án</div>
              {info.projects.map((project, index) => (
                <div className='cv-section-item cv-project-item' key={index}>
                  <div className='d-flex justify-content-between mb-5'>
                    <div className='font-bold'>
                      <span field='projects' index={index} subfield='name' style={{ minWidth: 50, display: 'inline-block' }}>
                        {project.name}
                      </span>
                      <span> - </span>
                      <span field='projects' index={index} subfield='company' style={{ minWidth: 50, display: 'inline-block' }}>
                        {project.company}
                      </span>
                    </div>
                    <div className='cv-date'>
                      <span field='projects' index={index} subfield='start' style={{ minWidth: 50, display: 'inline-block' }}>
                        {project.start}
                      </span>
                      <span> - </span>
                      <span field='projects' index={index} subfield='end' style={{ minWidth: 50, display: 'inline-block' }}>
                        {project.end}
                      </span>
                    </div>
                  </div>
                  <div className='cv-page pre-line' field='projects' index={index} subfield='description'>
                    {project.description}
                  </div>
                </div>
              ))}
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Hoạt động</div>
              {info.activities.map((activity, index) => (
                <div className='cv-section-item' key={index}>
                  <div className='cv-bullet' field='activities' index={index}>
                    {activity}
                  </div>
                </div>
              ))}
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Thông tin thêm</div>
              <p className='cv-page text-justify pre-line' field='additional'>
                {info.additional}
              </p>
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Luận văn</div>
              {info.theses.map((thesis, index) => (
                <div className='cv-section-item cv-thesis-item' key={index}>
                  <div className='d-flex justify-content-between mb-5'>
                    <div className='font-bold' field='theses' index={index} subfield='title' style={{ minWidth: 50 }}>
                      {thesis.title}
                    </div>
                    <div>
                      <span>GVHD: </span>
                      <span field='theses' index={index} subfield='advisor' style={{ minWidth: 50, display: 'inline-block' }}>
                        {thesis.advisor}
                      </span>
                    </div>
                  </div>
                  <div className='cv-page text-justify pre-line' field='theses' index={index} subfield='description'>
                    {thesis.description}
                  </div>
                </div>
              ))}
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Xuất bản, thuyết trình</div>
              <div className='cv-book-item' style={{ marginBottom: 10 }}>
                <div className='font-bold'>Sách</div>
                {info.books.map((book, index) => (
                  <div className='cv-section-item mb-0' key={index}>
                    <div className='font-italic cv-page' field='books' index={index}>
                      {book}
                    </div>
                  </div>
                ))}
              </div>
              <div className='cv-journal-item' style={{ marginBottom: 10 }}>
                <div className='font-bold'>Tạp chí</div>
                {info.journals.map((journal, index) => (
                  <div className='cv-section-item mb-0' key={index}>
                    <div className='font-italic cv-page' field='journals' index={index}>
                      {journal}
                    </div>
                  </div>
                ))}
              </div>
              <div className='cv-presentation-item' style={{ marginBottom: 10 }}>
                <div className='font-bold'>Thuyết trình</div>
                {info.presentations.map((presentation, index) => (
                  <div className='cv-section-item mb-0' key={index}>
                    <div className='font-italic cv-page' field='presentations' index={index}>
                      {presentation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
