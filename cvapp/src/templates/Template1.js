import { Fragment } from 'react'
import './template1.css'

export function Template1({ info, fontFamily, fontSize, lineHeight }) {
  return (
    <>
      <div className='cv-container1' spellCheck={false} style={{ fontFamily, fontSize: fontSize + 'pt', lineHeight }}>
        <div className='cv-section d-flex'>
          <img className='cv-avatar' src={'http://localhost:8080/resources/avatar/' + info.avatar} alt='Anh dai dien' />
          <div className='flex-grow'>
            <div className='cv-fullname' contentEditable suppressContentEditableWarning>
              {info.fullName}
            </div>
            <div className='cv-position' contentEditable suppressContentEditableWarning>
              {info.position}
            </div>
            <table>
              <tbody>
                <tr>
                  <td className='font-bold width-100'>Giới tính:</td>
                  <td contentEditable suppressContentEditableWarning>
                    {info.gender}
                  </td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Ngày sinh:</td>
                  <td contentEditable suppressContentEditableWarning>
                    {info.dob}
                  </td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Địa chỉ:</td>
                  <td contentEditable suppressContentEditableWarning>
                    {info.address}
                  </td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Hôn nhân:</td>
                  <td contentEditable suppressContentEditableWarning>
                    {info.marital}
                  </td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Số con:</td>
                  <td contentEditable suppressContentEditableWarning>
                    {info.childs}
                  </td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Quốc tịch:</td>
                  <td contentEditable suppressContentEditableWarning>
                    {info.nationality}
                  </td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Tôn giáo:</td>
                  <td contentEditable suppressContentEditableWarning>
                    {info.religion}
                  </td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Điện thoại:</td>
                  <td contentEditable suppressContentEditableWarning>
                    {info.phone}
                  </td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Email:</td>
                  <td contentEditable suppressContentEditableWarning>
                    {info.email}
                  </td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Website:</td>
                  <td contentEditable suppressContentEditableWarning>
                    {info.socials.map((social, index) => (
                      <Fragment key={index}>
                        {index !== 0 ? <br /> : null}
                        {social}
                      </Fragment>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Giới Thiệu</div>
          <p className='cv-page text-justify' contentEditable suppressContentEditableWarning>
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
                      <span contentEditable suppressContentEditableWarning>
                        {education.start}
                      </span>
                      <span> - </span>
                      <span contentEditable suppressContentEditableWarning>
                        {education.end}
                      </span>
                    </td>
                    <td>
                      <div className='font-bold' contentEditable suppressContentEditableWarning>
                        {education.school}
                      </div>
                      <div contentEditable suppressContentEditableWarning>
                        {education.field}
                      </div>
                      <div className='cv-page' contentEditable suppressContentEditableWarning>
                        {education.description.map((des, index) => (
                          <Fragment key={index}>
                            {index !== 0 ? <br /> : null}
                            {des}
                          </Fragment>
                        ))}
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
                      <span contentEditable suppressContentEditableWarning>
                        {work.start}
                      </span>
                      <span> - </span>
                      <span contentEditable suppressContentEditableWarning>
                        {work.end}
                      </span>
                    </td>
                    <td>
                      <div className='font-bold' contentEditable suppressContentEditableWarning>
                        {work.company}
                      </div>
                      <div contentEditable suppressContentEditableWarning>
                        {work.position}
                      </div>
                      <div className='cv-page' contentEditable suppressContentEditableWarning>
                        {work.description.map((des, index) => (
                          <Fragment key={index}>
                            {index !== 0 ? <br /> : null}
                            {des}
                          </Fragment>
                        ))}
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
                      <span contentEditable suppressContentEditableWarning>
                        {project.start}
                      </span>
                      <span> - </span>
                      <span contentEditable suppressContentEditableWarning>
                        {project.end}
                      </span>
                    </td>
                    <td>
                      <div className='font-bold' contentEditable suppressContentEditableWarning>
                        {project.name}
                      </div>
                      <div contentEditable suppressContentEditableWarning>
                        {project.company}
                      </div>
                      <div className='cv-page' contentEditable suppressContentEditableWarning>
                        {project.description.map((des, index) => (
                          <Fragment key={index}>
                            {index !== 0 ? <br /> : null}
                            {des}
                          </Fragment>
                        ))}
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
                      <span contentEditable suppressContentEditableWarning>
                        {membership.start}
                      </span>
                      <span> - </span>
                      <span contentEditable suppressContentEditableWarning>
                        {membership.end}
                      </span>
                    </td>
                    <td>
                      <div className='font-bold' contentEditable suppressContentEditableWarning>
                        {membership.organization}
                      </div>
                      <div contentEditable suppressContentEditableWarning>
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
          <div contentEditable suppressContentEditableWarning>
            <ul>
              {info.activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Thông tin thêm</div>
          <p className='cv-page text-justify' contentEditable suppressContentEditableWarning>
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
                      <span contentEditable suppressContentEditableWarning>
                        {award.year}
                      </span>
                    </td>
                    <td>
                      <div className='font-bold' contentEditable suppressContentEditableWarning>
                        {award.name}
                      </div>
                      <div contentEditable suppressContentEditableWarning>
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
                      <span contentEditable suppressContentEditableWarning>
                        {certificate.year}
                      </span>
                    </td>
                    <td>
                      <div className='font-bold' contentEditable suppressContentEditableWarning>
                        {certificate.name}
                      </div>
                      <div contentEditable suppressContentEditableWarning>
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
                      <span contentEditable suppressContentEditableWarning>
                        {scholarship.year}
                      </span>
                    </td>
                    <td>
                      <div className='font-bold' contentEditable suppressContentEditableWarning>
                        {scholarship.name}
                      </div>
                      <div contentEditable suppressContentEditableWarning>
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
                <span className='font-bold' contentEditable suppressContentEditableWarning>
                  {thesis.title}
                </span>
                <span>
                  <span>GVHD: </span>
                  <span contentEditable suppressContentEditableWarning>
                    {thesis.advisor}
                  </span>
                </span>
              </div>
              <div className='cv-page text-justify' contentEditable suppressContentEditableWarning>
                {thesis.description.map((des, index) => (
                  <Fragment key={index}>
                    {index !== 0 ? <br /> : null}
                    {des}
                  </Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Xuất bản, thuyết trình</div>
          <div className='cv-section-item cv-book-item'>
            <div className='font-bold'>Sách</div>
            {info.books.map((book, index) => (
              <div className='font-italic cv-page' contentEditable suppressContentEditableWarning key={index}>
                {book}
              </div>
            ))}
          </div>
          <div className='cv-section-item cv-journal-item'>
            <div className='font-bold'>Tạp chí</div>
            {info.journals.map((journal, index) => (
              <div className='font-italic cv-page' contentEditable suppressContentEditableWarning key={index}>
                {journal}
              </div>
            ))}
          </div>
          <div className='cv-section-item cv-book-item'>
            <div className='font-bold'>Thuyết trình</div>
            {info.presentations.map((presentation, index) => (
              <div className='font-italic cv-page' contentEditable suppressContentEditableWarning key={index}>
                {presentation}
              </div>
            ))}
          </div>
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Sở thích</div>
          {info.hobbies.map((hobby, index) => (
            <div key={index} className='cv-hobby-tag' contentEditable suppressContentEditableWarning>
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
                      <div contentEditable suppressContentEditableWarning>
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
