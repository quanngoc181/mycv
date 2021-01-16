import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addCvInfo, updateCvInfo, deleteCvInfo } from '../features/create-cv/createCVSlice'
import $ from 'jquery'
import { defaultPlaceholder, viLabel, enLabel } from '../util/dataUtil'
import './template3.css'
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

export function Template3({ info, uploadImage, updateRating, viewMode }) {
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
            <div className='cv-sub-header'>
              <span field='educations' index={index} subfield='school' className='mw-30'>
                {education.school}
              </span>
              <span>&nbsp;[&nbsp;</span>
              <span field='educations' index={index} subfield='start' className='mw-30'>
                {education.start}
              </span>
              <span>&nbsp;-&nbsp;</span>
              <span field='educations' index={index} subfield='end' className='mw-30'>
                {education.end}
              </span>
              <span>&nbsp;]&nbsp;</span>
            </div>
            <div field='educations' index={index} subfield='field' className='mb-5'>
              {education.field}
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
            <div className='cv-sub-header'>
              <span field='works' index={index} subfield='company' className='mw-30'>
                {work.company}
              </span>
              <span>&nbsp;[&nbsp;</span>
              <span field='works' index={index} subfield='start' className='mw-30'>
                {work.start}
              </span>
              <span>&nbsp;-&nbsp;</span>
              <span field='works' index={index} subfield='end' className='mw-30'>
                {work.end}
              </span>
              <span>&nbsp;]&nbsp;</span>
            </div>
            <div field='works' index={index} subfield='position' className='mb-5'>
              {work.position}
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
            <div className='cv-sub-header'>
              <span field='projects' index={index} subfield='name' className='mw-30'>
                {project.name}
              </span>
              <span>&nbsp;[&nbsp;</span>
              <span field='projects' index={index} subfield='start' className='mw-30'>
                {project.start}
              </span>
              <span>&nbsp;-&nbsp;</span>
              <span field='projects' index={index} subfield='end' className='mw-30'>
                {project.end}
              </span>
              <span>&nbsp;]&nbsp;</span>
            </div>
            <div field='projects' index={index} subfield='company' className='mb-5'>
              {project.company}
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
            <div className='cv-sub-header'>
              <span field='memberships' index={index} subfield='organization' className='mw-30'>
                {membership.organization}
              </span>
              <span>&nbsp;[&nbsp;</span>
              <span field='memberships' index={index} subfield='start' className='mw-30'>
                {membership.start}
              </span>
              <span>&nbsp;-&nbsp;</span>
              <span field='memberships' index={index} subfield='end' className='mw-30'>
                {membership.end}
              </span>
              <span>&nbsp;]&nbsp;</span>
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
            <div className='cv-sub-header'>
              <span field='awards' index={index} subfield='name' className='mw-30'>
                {award.name}
              </span>
              <span>&nbsp;[&nbsp;</span>
              <span field='awards' index={index} subfield='year' className='mw-30'>
                {award.year}
              </span>
              <span>&nbsp;]&nbsp;</span>
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
            <div className='cv-sub-header'>
              <span field='certificates' index={index} subfield='name' className='mw-30'>
                {certificate.name}
              </span>
              <span>&nbsp;[&nbsp;</span>
              <span field='certificates' index={index} subfield='year' className='mw-30'>
                {certificate.year}
              </span>
              <span>&nbsp;]&nbsp;</span>
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
            <div className='cv-sub-header'>
              <span field='scholarships' index={index} subfield='name' className='mw-30'>
                {scholarship.name}
              </span>
              <span>&nbsp;[&nbsp;</span>
              <span field='scholarships' index={index} subfield='year' className='mw-30'>
                {scholarship.year}
              </span>
              <span>&nbsp;]&nbsp;</span>
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
            <div field='theses' index={index} subfield='title' className='cv-sub-header'>
              {thesis.title}
            </div>
            <div className='mb-5'>
              <span>{label.advisor}:&nbsp;</span>
              <span field='theses' index={index} subfield='advisor' className='mw-30'>
                {thesis.advisor}
              </span>
            </div>
            <div className='cv-page pre-line' field='theses' index={index} subfield='description'>
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
          <div className='font-bold' style={{ color: '#444444' }}>
            {label.book}
          </div>
          {info.books.map((book, index) => (
            <div className='cv-section-item mb-0' key={index}>
              <div className='font-italic cv-page' field='books' index={index}>
                {book}
              </div>
            </div>
          ))}
        </div>
        <div className='cv-journal-item' style={{ marginBottom: 10, display: subs['journal'] ? 'block' : 'none' }}>
          <div className='font-bold' style={{ color: '#444444' }}>
            {label.journal}
          </div>
          {info.journals.map((journal, index) => (
            <div className='cv-section-item mb-0' key={index}>
              <div className='font-italic cv-page' field='journals' index={index}>
                {journal}
              </div>
            </div>
          ))}
        </div>
        <div className='cv-presentation-item' style={{ marginBottom: 10, display: subs['presentation'] ? 'block' : 'none' }}>
          <div className='font-bold' style={{ color: '#444444' }}>
            {label.presentation}
          </div>
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
          <div className='cv-section-item mb-0 cv-hobby' key={index}>
            <div field='hobbies' index={index}>
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
          <div className='cv-section-item cv-skill-item d-flex' key={index}>
            <div className='cv-skill' field='skills' index={index} subfield='name'>
              {skill.name}
            </div>
            <div className='rating'>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, i) => (
                <span
                  style={{ backgroundColor: skill.rate * 2 > number ? '#7cc398' : '#c5d8cc' }}
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
      <div className={'cv-container cv-container3' + (viewMode ? ' view-mode' : '')} spellCheck={false} onBlur={onBlur} onClick={onClick} style={{ fontFamily, fontSize: fontSize + 'pt', lineHeight }}>
        <div className='cv-top text-center'>
          <div className={`cv-avatar${viewMode ? '' : ' editable'}`} style={{ backgroundImage: `url(http://localhost:8080/resources/cv/${info.avatar})` }} onClick={() => uploadImage({ aspect: 3 / 4, shape: 'rect' })}></div>
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
