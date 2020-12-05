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
import { Fragment } from 'react'

export function Template2({ info, fontFamily, fontSize, lineHeight }) {
  return (
    <>
      <div className='cv-container2' spellCheck={false} style={{ fontFamily, fontSize: fontSize + 'pt', lineHeight }}>
        <div style={{ height: 30 }}></div>
        <div className='cv-top'>
          <div className='cv-fullname' contentEditable suppressContentEditableWarning>
            {info.fullName}
          </div>
          <div className='cv-position' contentEditable suppressContentEditableWarning>
            {info.position}
          </div>
        </div>
        <div className='d-flex'>
          <div className='cv-col-1'>
            <div className='cv-section'>
              <div className='cv-section-header'>Thông tin</div>
              <div className='cv-info-item'>
                <Gender className='cv-icon' />
                <span contentEditable suppressContentEditableWarning>
                  {info.gender}
                </span>
              </div>
              <div className='cv-info-item'>
                <Birthday className='cv-icon' />
                <span contentEditable suppressContentEditableWarning>
                  {info.dob}
                </span>
              </div>
              <div className='cv-info-item'>
                <Address className='cv-icon' />
                <span contentEditable suppressContentEditableWarning>
                  {info.address}
                </span>
              </div>
              <div className='cv-info-item'>
                <Marital className='cv-icon' />
                <span contentEditable suppressContentEditableWarning>
                  {info.marital}
                </span>
              </div>
              <div className='cv-info-item'>
                <Childs className='cv-icon' />
                <span contentEditable suppressContentEditableWarning>
                  {info.childs}
                </span>
              </div>
              <div className='cv-info-item'>
                <Nationality className='cv-icon' />
                <span contentEditable suppressContentEditableWarning>
                  {info.nationality}
                </span>
              </div>
              <div className='cv-info-item'>
                <Religion className='cv-icon' />
                <span contentEditable suppressContentEditableWarning>
                  {info.religion}
                </span>
              </div>
              <div className='cv-info-item'>
                <Phone className='cv-icon' />
                <span contentEditable suppressContentEditableWarning>
                  {info.phone}
                </span>
              </div>
              <div className='cv-info-item'>
                <Email className='cv-icon' />
                <span contentEditable suppressContentEditableWarning>
                  {info.email}
                </span>
              </div>
              <div className='cv-info-item'>
                <Website className='cv-icon' />
                <span contentEditable suppressContentEditableWarning>
                  {info.socials.map((social, index) => (
                    <Fragment key={index}>
                      {index !== 0 ? <br /> : null}
                      {social}
                    </Fragment>
                  ))}
                </span>
              </div>
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Kỹ năng</div>
              {info.skills.map((skill, index) => (
                <div className='cv-section-item cv-skill-item' key={index}>
                  <div contentEditable suppressContentEditableWarning>
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
                    <div className='font-bold' contentEditable suppressContentEditableWarning>
                      {certificate.name}
                    </div>
                    <div>
                      <span>(</span>
                      <span contentEditable suppressContentEditableWarning>
                        {certificate.year}
                      </span>
                      <span>)</span>
                    </div>
                  </div>
                  <div contentEditable suppressContentEditableWarning>
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
                    <div className='font-bold' contentEditable suppressContentEditableWarning>
                      {award.name}
                    </div>
                    <div>
                      <span>(</span>
                      <span contentEditable suppressContentEditableWarning>
                        {award.year}
                      </span>
                      <span>)</span>
                    </div>
                  </div>
                  <div contentEditable suppressContentEditableWarning>
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
                    <div className='font-bold' contentEditable suppressContentEditableWarning>
                      {scholarship.name}
                    </div>
                    <div>
                      <span>(</span>
                      <span contentEditable suppressContentEditableWarning>
                        {scholarship.year}
                      </span>
                      <span>)</span>
                    </div>
                  </div>
                  <div contentEditable suppressContentEditableWarning>
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
                    <div className='font-bold' contentEditable suppressContentEditableWarning>
                      {membership.organization}
                    </div>
                    <div>
                      <span>(</span>
                      <span contentEditable suppressContentEditableWarning>
                        {membership.start}
                      </span>
                      <span> - </span>
                      <span contentEditable suppressContentEditableWarning>
                        {membership.end}
                      </span>
                      <span>)</span>
                    </div>
                  </div>
                  <div contentEditable suppressContentEditableWarning>
                    {membership.role}
                  </div>
                </div>
              ))}
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Sở thích</div>
              <div>
                <ul>
                  {info.hobbies.map((hobby, index) => (
                    <li contentEditable suppressContentEditableWarning key={index}>
                      {hobby}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='cv-col-2'>
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
                  <div className='d-flex justify-content-between mb-5'>
                    <div className='font-bold'>
                      <span contentEditable suppressContentEditableWarning>
                        {education.school}
                      </span>
                      <span> - </span>
                      <span contentEditable suppressContentEditableWarning>
                        {education.field}
                      </span>
                    </div>
                    <div className='cv-date'>
                      <span contentEditable suppressContentEditableWarning>
                        {education.start}
                      </span>
                      <span> - </span>
                      <span contentEditable suppressContentEditableWarning>
                        {education.end}
                      </span>
                    </div>
                  </div>
                  <div className='cv-page' contentEditable suppressContentEditableWarning>
                    {education.description.map((des, index) => (
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
              <div className='cv-section-header'>Kinh nghiệm làm việc</div>
              {info.works.map((work, index) => (
                <div className='cv-section-item cv-work-item' key={index}>
                  <div className='d-flex justify-content-between mb-5'>
                    <div className='font-bold'>
                      <span contentEditable suppressContentEditableWarning>
                        {work.company}
                      </span>
                      <span> - </span>
                      <span contentEditable suppressContentEditableWarning>
                        {work.position}
                      </span>
                    </div>
                    <div className='cv-date'>
                      <span contentEditable suppressContentEditableWarning>
                        {work.start}
                      </span>
                      <span> - </span>
                      <span contentEditable suppressContentEditableWarning>
                        {work.end}
                      </span>
                    </div>
                  </div>
                  <div className='cv-page' contentEditable suppressContentEditableWarning>
                    {work.description.map((des, index) => (
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
              <div className='cv-section-header'>Dự án</div>
              {info.projects.map((project, index) => (
                <div className='cv-section-item cv-project-item' key={index}>
                  <div className='d-flex justify-content-between mb-5'>
                    <div className='font-bold'>
                      <span contentEditable suppressContentEditableWarning>
                        {project.name}
                      </span>
                      <span> - </span>
                      <span contentEditable suppressContentEditableWarning>
                        {project.company}
                      </span>
                    </div>
                    <div className='cv-date'>
                      <span contentEditable suppressContentEditableWarning>
                        {project.start}
                      </span>
                      <span> - </span>
                      <span contentEditable suppressContentEditableWarning>
                        {project.end}
                      </span>
                    </div>
                  </div>
                  <div className='cv-page' contentEditable suppressContentEditableWarning>
                    {project.description.map((des, index) => (
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
              <div className='cv-section-header'>Luận văn</div>
              {info.theses.map((thesis, index) => (
                <div className='cv-section-item cv-thesis-item' key={index}>
                  <div className='d-flex justify-content-between mb-5'>
                    <div className='font-bold' contentEditable suppressContentEditableWarning>
                      {thesis.title}
                    </div>
                    <div>
                      <span>GVHD: </span>
                      <span contentEditable suppressContentEditableWarning>
                        {thesis.advisor}
                      </span>
                    </div>
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
          </div>
        </div>
      </div>
    </>
  )
}
