import './template2.css'
import { ReactComponent as Gender } from './icon/gender.svg'
import { ReactComponent as Birthday } from './icon/birthday.svg'
import { ReactComponent as Address } from './icon/address.svg'
import { ReactComponent as Marital } from './icon/marital.svg'
import { ReactComponent as Childs } from './icon/childs.svg'
import { ReactComponent as Nationality } from './icon/nationality.svg'
import { ReactComponent as Religion } from './icon/religion.svg'
import { ReactComponent as Phone } from './icon/phone.svg'
import { ReactComponent as Email } from './icon/email.svg'
import { ReactComponent as Website } from './icon/website.svg'
import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateCvInfo } from '../features/create-cv/createCVSlice'

export function Template2({ info, uploadImage }) {
  const dispatch = useDispatch()

  useEffect(() => {
    let edits = document.querySelectorAll('[field]')
    edits.forEach((element) => {
      element.setAttribute('contenteditable', 'true')
    })
  }, [])

  const onBlur = (e) => {
    let field = e.target.getAttribute('field')
    if (!field) return
    let index = e.target.getAttribute('index')
    let subfield = e.target.getAttribute('subfield')
    let value = e.target.innerText
    dispatch(updateCvInfo({ field, index, subfield, value }))
  }

  return (
    <>
      <div className='cv-container2' spellCheck={false} onBlur={onBlur}>
        <div style={{ height: 30 }}></div>
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
                <Gender className='cv-icon' />
                <span field='gender'>{info.gender}</span>
              </div>
              <div className='cv-info-item'>
                <Birthday className='cv-icon' />
                <span field='dob'>{info.dob}</span>
              </div>
              <div className='cv-info-item'>
                <Address className='cv-icon' />
                <span field='address'>{info.address}</span>
              </div>
              <div className='cv-info-item'>
                <Marital className='cv-icon' />
                <span field='marital'>{info.marital}</span>
              </div>
              <div className='cv-info-item'>
                <Childs className='cv-icon' />
                <span field='childs'>{info.childs}</span>
              </div>
              <div className='cv-info-item'>
                <Nationality className='cv-icon' />
                <span field='nationality'>{info.nationality}</span>
              </div>
              <div className='cv-info-item'>
                <Religion className='cv-icon' />
                <span field='religion'>{info.religion}</span>
              </div>
              <div className='cv-info-item'>
                <Phone className='cv-icon' />
                <span field='phone'>{info.phone}</span>
              </div>
              <div className='cv-info-item'>
                <Email className='cv-icon' />
                <span field='email'>{info.email}</span>
              </div>
              <div className='cv-info-item'>
                <Website className='cv-icon' />
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
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, index) => (
                      <span style={{ backgroundColor: skill.rate * 2 > number ? '#000' : '#ddd' }} key={index}></span>
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
                      <span field='certificates' index={index} subfield='year'>
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
                      <span field='awards' index={index} subfield='year'>
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
                      <span field='scholarships' index={index} subfield='year'>
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
                      <span field='memberships' index={index} subfield='start'>
                        {membership.start}
                      </span>
                      <span> - </span>
                      <span field='memberships' index={index} subfield='end'>
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
                <div className='cv-bullet' field='hobbies' index={index} key={index}>
                  {hobby}
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
                      <span field='educations' index={index} subfield='school'>
                        {education.school}
                      </span>
                      <span> - </span>
                      <span field='educations' index={index} subfield='field'>
                        {education.field}
                      </span>
                    </div>
                    <div className='cv-date'>
                      <span field='educations' index={index} subfield='start'>
                        {education.start}
                      </span>
                      <span> - </span>
                      <span field='educations' index={index} subfield='end'>
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
                      <span field='works' index={index} subfield='company'>
                        {work.company}
                      </span>
                      <span> - </span>
                      <span field='works' index={index} subfield='position'>
                        {work.position}
                      </span>
                    </div>
                    <div className='cv-date'>
                      <span field='works' index={index} subfield='start'>
                        {work.start}
                      </span>
                      <span> - </span>
                      <span field='works' index={index} subfield='end'>
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
                      <span field='projects' index={index} subfield='name'>
                        {project.name}
                      </span>
                      <span> - </span>
                      <span field='projects' index={index} subfield='company'>
                        {project.company}
                      </span>
                    </div>
                    <div className='cv-date'>
                      <span field='projects' index={index} subfield='start'>
                        {project.start}
                      </span>
                      <span> - </span>
                      <span field='projects' index={index} subfield='end'>
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
                <div className='cv-bullet' field='activities' index={index} key={index}>
                  {activity}
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
                    <div className='font-bold' field='theses' index={index} subfield='title'>
                      {thesis.title}
                    </div>
                    <div>
                      <span>GVHD: </span>
                      <span field='theses' index={index} subfield='advisor'>
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
              <div className='cv-section-item cv-book-item'>
                <div className='font-bold'>Sách</div>
                {info.books.map((book, index) => (
                  <div className='font-italic cv-page' field='books' index={index} key={index}>
                    {book}
                  </div>
                ))}
              </div>
              <div className='cv-section-item cv-journal-item'>
                <div className='font-bold'>Tạp chí</div>
                {info.journals.map((journal, index) => (
                  <div className='font-italic cv-page' field='journals' index={index} key={index}>
                    {journal}
                  </div>
                ))}
              </div>
              <div className='cv-section-item cv-book-item'>
                <div className='font-bold'>Thuyết trình</div>
                {info.presentations.map((presentation, index) => (
                  <div className='font-italic cv-page' field='presentations' index={index} key={index}>
                    {presentation}
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
