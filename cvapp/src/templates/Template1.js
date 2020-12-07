import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateCvInfo } from '../features/create-cv/createCVSlice'
import './template1.css'

export function Template1({ info, uploadImage }) {
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
      <div className='cv-container1' spellCheck={false} onBlur={onBlur}>
        <div className='cv-section d-flex'>
          <img className='cv-avatar' src={'http://localhost:8080/resources/cv/' + info.avatar} onClick={uploadImage} alt='Anh dai dien' />
          <div className='flex-grow'>
            <div className='cv-fullname' field='fullName'>
              {info.fullName}
            </div>
            <div className='cv-position' field='position'>
              {info.position}
            </div>
            <table>
              <tbody>
                <tr>
                  <td className='font-bold width-100'>Giới tính:</td>
                  <td field='gender'>{info.gender}</td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Ngày sinh:</td>
                  <td field='dob'>{info.dob}</td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Địa chỉ:</td>
                  <td field='address'>{info.address}</td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Hôn nhân:</td>
                  <td field='marital'>{info.marital}</td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Số con:</td>
                  <td field='childs'>{info.childs}</td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Quốc tịch:</td>
                  <td field='nationality'>{info.nationality}</td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Tôn giáo:</td>
                  <td field='religion'>{info.religion}</td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Điện thoại:</td>
                  <td field='phone'>{info.phone}</td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Email:</td>
                  <td field='email'>{info.email}</td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Website:</td>
                  <td field='socials' className='pre-line'>
                    {info.socials}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

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
              <table>
                <tbody>
                  <tr>
                    <td className='width-150'>
                      <span field='educations' index={index} subfield='start'>
                        {education.start}
                      </span>
                      <span> - </span>
                      <span field='educations' index={index} subfield='end'>
                        {education.end}
                      </span>
                    </td>
                    <td>
                      <div className='font-bold' field='educations' index={index} subfield='school'>
                        {education.school}
                      </div>
                      <div field='educations' index={index} subfield='field'>
                        {education.field}
                      </div>
                      <div className='cv-page pre-line' field='educations' index={index} subfield='description'>
                        {education.description}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Kinh nghiệm làm việc</div>
          {info.works.map((work, index) => (
            <div className='cv-section-item cv-work-item' key={index}>
              <table>
                <tbody>
                  <tr>
                    <td className='width-150'>
                      <span field='works' index={index} subfield='start'>
                        {work.start}
                      </span>
                      <span> - </span>
                      <span field='works' index={index} subfield='end'>
                        {work.end}
                      </span>
                    </td>
                    <td>
                      <div className='font-bold' field='works' index={index} subfield='company'>
                        {work.company}
                      </div>
                      <div field='works' index={index} subfield='position'>
                        {work.position}
                      </div>
                      <div className='cv-page pre-line' field='works' index={index} subfield='description'>
                        {work.description}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Dự án</div>
          {info.projects.map((project, index) => (
            <div className='cv-section-item cv-project-item' key={index}>
              <table>
                <tbody>
                  <tr>
                    <td className='width-150'>
                      <span field='projects' index={index} subfield='start'>
                        {project.start}
                      </span>
                      <span> - </span>
                      <span field='projects' index={index} subfield='end'>
                        {project.end}
                      </span>
                    </td>
                    <td>
                      <div className='font-bold' field='projects' index={index} subfield='name'>
                        {project.name}
                      </div>
                      <div field='projects' index={index} subfield='company'>
                        {project.company}
                      </div>
                      <div className='cv-page pre-line' field='projects' index={index} subfield='description'>
                        {project.description}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Tổ chức</div>
          {info.memberships.map((membership, index) => (
            <div className='cv-section-item cv-membership-item' key={index}>
              <table>
                <tbody>
                  <tr>
                    <td className='width-150'>
                      <span field='memberships' index={index} subfield='start'>
                        {membership.start}
                      </span>
                      <span> - </span>
                      <span field='memberships' index={index} subfield='end'>
                        {membership.end}
                      </span>
                    </td>
                    <td>
                      <div className='font-bold' field='memberships' index={index} subfield='organization'>
                        {membership.organization}
                      </div>
                      <div field='memberships' index={index} subfield='role'>
                        {membership.role}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Hoạt động</div>
          {info.activities.map((activity, index) => (
            <div className='cv-bullet' field='activities' index={index} key={index}>{activity}</div>
          ))}
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Thông tin thêm</div>
          <p className='cv-page text-justify pre-line' field='additional'>
            {info.additional}
          </p>
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Giải thưởng</div>
          {info.awards.map((award, index) => (
            <div className='cv-section-item cv-award-item' key={index}>
              <table>
                <tbody>
                  <tr>
                    <td className='width-150'>
                      <span field='awards' index={index} subfield='year'>
                        {award.year}
                      </span>
                    </td>
                    <td>
                      <div className='font-bold' field='awards' index={index} subfield='name'>
                        {award.name}
                      </div>
                      <div field='awards' index={index} subfield='organization'>
                        {award.organization}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Chứng nhận</div>
          {info.certificates.map((certificate, index) => (
            <div className='cv-section-item cv-certificate-item' key={index}>
              <table>
                <tbody>
                  <tr>
                    <td className='width-150'>
                      <span field='certificates' index={index} subfield='year'>
                        {certificate.year}
                      </span>
                    </td>
                    <td>
                      <div className='font-bold' field='certificates' index={index} subfield='name'>
                        {certificate.name}
                      </div>
                      <div field='certificates' index={index} subfield='organization'>
                        {certificate.organization}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Học bổng</div>
          {info.scholarships.map((scholarship, index) => (
            <div className='cv-section-item cv-scholarship-item' key={index}>
              <table>
                <tbody>
                  <tr>
                    <td className='width-150'>
                      <span field='scholarships' index={index} subfield='year'>
                        {scholarship.year}
                      </span>
                    </td>
                    <td>
                      <div className='font-bold' field='scholarships' index={index} subfield='name'>
                        {scholarship.name}
                      </div>
                      <div field='scholarships' index={index} subfield='organization'>
                        {scholarship.organization}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Luận văn</div>
          {info.theses.map((thesis, index) => (
            <div className='cv-section-item cv-thesis-item' key={index}>
              <div className='d-flex justify-content-between'>
                <span className='font-bold' field='theses' index={index} subfield='title'>
                  {thesis.title}
                </span>
                <span>
                  <span>GVHD: </span>
                  <span field='theses' index={index} subfield='advisor'>
                    {thesis.advisor}
                  </span>
                </span>
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

        <div className='cv-section'>
          <div className='cv-section-header'>Sở thích</div>
          {info.hobbies.map((hobby, index) => (
            <div key={index} className='cv-hobby-tag' field='hobbies' index={index}>
              {hobby}
            </div>
          ))}
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Kỹ năng</div>
          {info.skills.map((skill, index) => (
            <div className='cv-section-item cv-skill-item' key={index}>
              <table>
                <tbody>
                  <tr>
                    <td className='width-150'>
                      <div field='skills' index={index} subfield='name'>
                        {skill.name}
                      </div>
                    </td>
                    <td>
                      <ul className='rating'>
                        {[0, 1, 2, 3, 4].map((number, index) => (
                          <li key={index}>
                            <div style={{ position: 'relative' }}>
                              <div style={{ position: 'absolute', overflow: 'hidden', width: `${skill.rate - number >= 1 ? 100 : skill.rate - number <= 0 ? 0 : 50}%` }}>
                                <svg viewBox='64 64 896 896' width='20px' height='20px' fill='#fadb14'>
                                  <path d='M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z'></path>
                                </svg>
                              </div>
                              <div>
                                <svg viewBox='64 64 896 896' width='20px' height='20px' fill='#ddd'>
                                  <path d='M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z'></path>
                                </svg>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
