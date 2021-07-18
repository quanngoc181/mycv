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
import { Fragment, useEffect } from 'react'
import $ from 'jquery'
import { useDispatch } from 'react-redux'
import { addCvInfo, deleteCvInfo, updateCvInfo } from '../features/create-cv/createCVSlice'
import { defaultPlaceholder, viLabel, enLabel } from '../util/dataUtil'

export function Template2({ info, uploadImage, updateRating, viewMode }) {
  const dispatch = useDispatch()

  let { fontFamily, fontSize, lineHeight, language } = info
  let label = language === 'vi' ? viLabel : enLabel

  useEffect(() => {
    if (viewMode === false) {
      let edits = document.querySelectorAll('[field]')
      edits.forEach((element) => {
        element.setAttribute('contenteditable', 'true')
      })

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
    }

    let items = $('[field]')
    items.each((index, item) => {
      let field = $(item).attr('field')
      let subfield = $(item).attr('subfield')
      if (!subfield) $(item).attr('data-placeholder', defaultPlaceholder[field])
      else $(item).attr('data-placeholder', defaultPlaceholder[field][subfield])
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

  let subs = info.subs.map((o) => ({ [o.name]: o.display }))
  subs = Object.assign({}, ...subs)

  const sections = {
    information: (
      <div className='cv-section information'>
        <div className='cv-section-header'>{label.information}</div>
        <div className='cv-info-item' style={{ display: subs['gender'] ? 'block' : 'none' }}>
          <img src={gender} alt='gender' className='cv-icon' />
          <span field='gender'>{info.gender}</span>
        </div>
        <div className='cv-info-item' style={{ display: subs['dob'] ? 'block' : 'none' }}>
          <img src={dob} alt='dob' className='cv-icon' />
          <span field='dob'>{info.dob}</span>
        </div>
        <div className='cv-info-item' style={{ display: subs['address'] ? 'block' : 'none' }}>
          <img src={address} alt='address' className='cv-icon' />
          <span field='address'>{info.address}</span>
        </div>
        <div className='cv-info-item' style={{ display: subs['marital'] ? 'block' : 'none' }}>
          <img src={marital} alt='marital' className='cv-icon' />
          <span field='marital'>{info.marital}</span>
        </div>
        <div className='cv-info-item' style={{ display: subs['childs'] ? 'block' : 'none' }}>
          <img src={childs} alt='childs' className='cv-icon' />
          <span field='childs'>{info.childs}</span>
        </div>
        <div className='cv-info-item' style={{ display: subs['nationality'] ? 'block' : 'none' }}>
          <img src={nationality} alt='nationality' className='cv-icon' />
          <span field='nationality'>{info.nationality}</span>
        </div>
        <div className='cv-info-item' style={{ display: subs['religion'] ? 'block' : 'none' }}>
          <img src={religion} alt='religion' className='cv-icon' />
          <span field='religion'>{info.religion}</span>
        </div>
        <div className='cv-info-item' style={{ display: subs['phone'] ? 'block' : 'none' }}>
          <img src={phone} alt='phone' className='cv-icon' />
          <span field='phone'>{info.phone}</span>
        </div>
        <div className='cv-info-item' style={{ display: subs['email'] ? 'block' : 'none' }}>
          <img src={email} alt='email' className='cv-icon' />
          <span field='email'>{info.email}</span>
        </div>
        <div className='cv-info-item' style={{ display: subs['website'] ? 'block' : 'none' }}>
          <img src={website} alt='website' className='cv-icon' />
          <span field='socials' className='pre-line'>
            {info.socials}
          </span>
        </div>
      </div>
    ),
    profile: (
      <div className='cv-section profile'>
        <div className='cv-section-header'>{label.profile}</div>
        <p className='cv-page text-justify pre-line' field='profile'>
          {info.profile}
        </p>
      </div>
    ),
    education: (
      <div className='cv-section education'>
        <div className='cv-section-header'>{label.education}</div>
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
    ),
    work: (
      <div className='cv-section work'>
        <div className='cv-section-header'>{label.work}</div>
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
    ),
    project: (
      <div className='cv-section project'>
        <div className='cv-section-header'>{label.project}</div>
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
    ),
    membership: (
      <div className='cv-section membership'>
        <div className='cv-section-header'>{label.membership}</div>
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
    ),
    activity: (
      <div className='cv-section activity'>
        <div className='cv-section-header'>{label.activity}</div>
        {info.activities.map((activity, index) => (
          <div className='cv-section-item' key={index}>
            <div className='cv-bullet' field='activities' index={index}>
              {activity}
            </div>
          </div>
        ))}
      </div>
    ),
    additional: (
      <div className='cv-section additional'>
        <div className='cv-section-header'>{label.additional}</div>
        <p className='cv-page text-justify pre-line' field='additional'>
          {info.additional}
        </p>
      </div>
    ),
    award: (
      <div className='cv-section award'>
        <div className='cv-section-header'>{label.award}</div>
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
    ),
    certificate: (
      <div className='cv-section certificate'>
        <div className='cv-section-header'>{label.certificate}</div>
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
    ),
    scholarship: (
      <div className='cv-section scholarship'>
        <div className='cv-section-header'>{label.scholarship}</div>
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
    ),
    thesis: (
      <div className='cv-section thesis'>
        <div className='cv-section-header'>{label.thesis}</div>
        {info.theses.map((thesis, index) => (
          <div className='cv-section-item cv-thesis-item' key={index}>
            <div className='d-flex justify-content-between mb-5'>
              <div className='font-bold' field='theses' index={index} subfield='title' style={{ minWidth: 50 }}>
                {thesis.title}
              </div>
              <div>
                <b>{label.advisor}: </b>
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
    ),
    publication: (
      <div className='cv-section publication'>
        <div className='cv-section-header'>{label.publication}</div>
        <div className='cv-book-item' style={{ marginBottom: 10, display: subs['book'] ? 'block' : 'none' }}>
          <div className='font-bold'>{label.book}</div>
          {info.books.map((book, index) => (
            <div className='cv-section-item mb-0' key={index}>
              <div className='font-italic cv-page' field='books' index={index}>
                {book}
              </div>
            </div>
          ))}
        </div>
        <div className='cv-journal-item' style={{ marginBottom: 10, display: subs['journal'] ? 'block' : 'none' }}>
          <div className='font-bold'>{label.journal}</div>
          {info.journals.map((journal, index) => (
            <div className='cv-section-item mb-0' key={index}>
              <div className='font-italic cv-page' field='journals' index={index}>
                {journal}
              </div>
            </div>
          ))}
        </div>
        <div className='cv-presentation-item' style={{ marginBottom: 10, display: subs['presentation'] ? 'block' : 'none' }}>
          <div className='font-bold'>{label.presentation}</div>
          {info.presentations.map((presentation, index) => (
            <div className='cv-section-item mb-0' key={index}>
              <div className='font-italic cv-page' field='presentations' index={index}>
                {presentation}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    hobby: (
      <div className='cv-section hobby'>
        <div className='cv-section-header'>{label.hobby}</div>
        {info.hobbies.map((hobby, index) => (
          <div className='cv-section-item' key={index}>
            <div className='cv-bullet' field='hobbies' index={index}>
              {hobby}
            </div>
          </div>
        ))}
      </div>
    ),
    skill: (
      <div className='cv-section skill'>
        <div className='cv-section-header'>{label.skill}</div>
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
    ),
  }

  return (
    <>
      <div className={'cv-container cv-container2' + (viewMode ? ' view-mode' : '')} spellCheck={false} onBlur={onBlur} onClick={onClick} style={{ fontFamily, fontSize: fontSize + 'pt', lineHeight }}>
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
            {info.orders[0]
              .filter((s) => s.display)
              .map((s) => (
                <Fragment key={s.name}>{sections[s.name]}</Fragment>
              ))}
          </div>
          <div className='cv-col-2'>
            {info.orders[1]
              .filter((s) => s.display)
              .map((s) => (
                <Fragment key={s.name}>{sections[s.name]}</Fragment>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
