import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addCvInfo, updateCvInfo, deleteCvInfo } from '../features/create-cv/createCVSlice'
import $ from 'jquery'
import { defaultPlaceholder, viLabel, enLabel } from '../util/dataUtil'
import './template5.css'

export function Template5({ info, uploadImage, updateRating, viewMode }) {
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
        {subs['gender'] && (
          <div className='information-item' field='gender'>
            {info.gender}
          </div>
        )}
        {subs['dob'] && (
          <div className='information-item' field='dob' style={{ display: subs['dob'] ? 'inline-block' : 'none' }}>
            {info.dob}
          </div>
        )}
        {subs['address'] && (
          <div className='information-item' field='address' style={{ display: subs['address'] ? 'inline-block' : 'none' }}>
            {info.address}
          </div>
        )}
        {subs['marital'] && (
          <div className='information-item' field='marital' style={{ display: subs['marital'] ? 'inline-block' : 'none' }}>
            {info.marital}
          </div>
        )}
        {subs['childs'] && (
          <div className='information-item' field='childs' style={{ display: subs['childs'] ? 'inline-block' : 'none' }}>
            {info.childs}
          </div>
        )}
        {subs['nationality'] && (
          <div className='information-item' field='nationality' style={{ display: subs['nationality'] ? 'inline-block' : 'none' }}>
            {info.nationality}
          </div>
        )}
        {subs['religion'] && (
          <div className='information-item' field='religion' style={{ display: subs['religion'] ? 'inline-block' : 'none' }}>
            {info.religion}
          </div>
        )}
        {subs['phone'] && (
          <div className='information-item' field='phone' style={{ display: subs['phone'] ? 'inline-block' : 'none' }}>
            {info.phone}
          </div>
        )}
        {subs['email'] && (
          <div className='information-item' field='email' style={{ display: subs['email'] ? 'inline-block' : 'none' }}>
            {info.email}
          </div>
        )}
        {subs['website'] && (
          <div className='information-item pre-line' field='website' style={{ display: subs['website'] ? 'inline-block' : 'none' }}>
            {info.socials}
          </div>
        )}
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
          <div className='cv-section-item cv-education-item d-flex' key={index}>
            <div className='cv-left-col'>
              <div field='educations' index={index} subfield='school' className='font-bold second-text mb-5'>
                {education.school}
              </div>
              <div>
                <span field='educations' index={index} subfield='start' className='mw-30'>
                  {education.start}
                </span>
                <span>&nbsp;-&nbsp;</span>
                <span field='educations' index={index} subfield='end' className='mw-30'>
                  {education.end}
                </span>
              </div>
            </div>
            <div className='cv-right-col'>
              <div field='educations' index={index} subfield='field' className='font-bold second-text mb-5'>
                {education.field}
              </div>
              <div field='educations' index={index} subfield='description' className='cv-page pre-line'>
                {education.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    work: (
      <div className='cv-section work'>
        <div className='cv-section-header'>{label.work}</div>
        {info.works.map((work, index) => (
          <div className='cv-section-item cv-work-item d-flex' key={index}>
            <div className='cv-left-col'>
              <div field='works' index={index} subfield='company' className='font-bold second-text mb-5'>
                {work.company}
              </div>
              <div>
                <span field='works' index={index} subfield='start' className='mw-30'>
                  {work.start}
                </span>
                <span>&nbsp;-&nbsp;</span>
                <span field='works' index={index} subfield='end' className='mw-30'>
                  {work.end}
                </span>
              </div>
            </div>
            <div className='cv-right-col'>
              <div field='works' index={index} subfield='position' className='font-bold second-text mb-5'>
                {work.position}
              </div>
              <div field='works' index={index} subfield='description' className='cv-page pre-line'>
                {work.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    project: (
      <div className='cv-section project'>
        <div className='cv-section-header'>{label.project}</div>
        {info.projects.map((project, index) => (
          <div className='cv-section-item cv-project-item d-flex' key={index}>
            <div className='cv-left-col'>
              <div field='projects' index={index} subfield='name' className='font-bold second-text mb-5'>
                {project.name}
              </div>
              <div>
                <span field='projects' index={index} subfield='start' className='mw-30'>
                  {project.start}
                </span>
                <span>&nbsp;-&nbsp;</span>
                <span field='projects' index={index} subfield='end' className='mw-30'>
                  {project.end}
                </span>
              </div>
            </div>
            <div className='cv-right-col'>
              <div field='projects' index={index} subfield='company' className='font-bold second-text mb-5'>
                {project.company}
              </div>
              <div field='projects' index={index} subfield='description' className='cv-page pre-line'>
                {project.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    membership: (
      <div className='cv-section membership'>
        <div className='cv-section-header'>{label.membership}</div>
        {info.memberships.map((membership, index) => (
          <div className='cv-section-item cv-membership-item d-flex' key={index}>
            <div className='cv-left-col'>
              <div field='memberships' index={index} subfield='organization' className='font-bold second-text mb-5'>
                {membership.organization}
              </div>
              <div>
                <span field='memberships' index={index} subfield='start' className='mw-30'>
                  {membership.start}
                </span>
                <span>&nbsp;-&nbsp;</span>
                <span field='memberships' index={index} subfield='end' className='mw-30'>
                  {membership.end}
                </span>
              </div>
            </div>
            <div className='cv-right-col'>
              <div field='memberships' index={index} subfield='role' className='font-bold second-text mb-5'>
                {membership.role}
              </div>
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
          <div className='cv-section-item cv-award-item d-flex' key={index}>
            <div className='cv-left-col'>
              <div field='awards' index={index} subfield='name' className='font-bold second-text mb-5'>
                {award.name}
              </div>
              <div field='awards' index={index} subfield='year'>
                {award.year}
              </div>
            </div>
            <div className='cv-right-col'>
              <div field='awards' index={index} subfield='organization' className='font-bold second-text mb-5'>
                {award.organization}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    certificate: (
      <div className='cv-section certificate'>
        <div className='cv-section-header'>{label.certificate}</div>
        {info.certificates.map((certificate, index) => (
          <div className='cv-section-item cv-certificate-item d-flex' key={index}>
            <div className='cv-left-col'>
              <div field='certificates' index={index} subfield='name' className='font-bold second-text mb-5'>
                {certificate.name}
              </div>
              <div field='certificates' index={index} subfield='year'>
                {certificate.year}
              </div>
            </div>
            <div className='cv-right-col'>
              <div field='certificates' index={index} subfield='organization' className='font-bold second-text mb-5'>
                {certificate.organization}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    scholarship: (
      <div className='cv-section scholarship'>
        <div className='cv-section-header'>{label.scholarship}</div>
        {info.scholarships.map((scholarship, index) => (
          <div className='cv-section-item cv-scholarship-item d-flex' key={index}>
            <div className='cv-left-col'>
              <div field='scholarships' index={index} subfield='name' className='font-bold second-text mb-5'>
                {scholarship.name}
              </div>
              <div field='scholarships' index={index} subfield='year'>
                {scholarship.year}
              </div>
            </div>
            <div className='cv-right-col'>
              <div field='scholarships' index={index} subfield='organization' className='font-bold second-text mb-5'>
                {scholarship.organization}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    thesis: (
      <div className='cv-section thesis'>
        <div className='cv-section-header'>{label.thesis}</div>
        {info.theses.map((thesis, index) => (
          <div className='cv-section-item cv-thesis-item d-flex' key={index}>
            <div className='cv-left-col'>
              <div field='theses' index={index} subfield='title' className='font-bold second-text mb-5'>
                {thesis.title}
              </div>
            </div>
            <div className='cv-right-col'>
              <div className='font-bold second-text mb-5'>
                <span>{label.advisor}:&nbsp;</span>
                <span field='theses' index={index} subfield='advisor' className='mw-30'>
                  {thesis.advisor}
                </span>
              </div>
              <div field='theses' index={index} subfield='description' className='cv-page pre-line'>
                {thesis.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    publication: (
      <div className='cv-section publication'>
        <div className='cv-section-header'>{label.publication}</div>
        <div className='cv-book-item' style={{ marginBottom: 10, display: subs['book'] ? 'block' : 'none' }}>
          <div className='font-bold second-text'>{label.book}</div>
          {info.books.map((book, index) => (
            <div className='cv-section-item mb-0' key={index}>
              <div className='font-italic cv-page' field='books' index={index}>
                {book}
              </div>
            </div>
          ))}
        </div>
        <div className='cv-journal-item' style={{ marginBottom: 10, display: subs['journal'] ? 'block' : 'none' }}>
          <div className='font-bold second-text'>{label.journal}</div>
          {info.journals.map((journal, index) => (
            <div className='cv-section-item mb-0' key={index}>
              <div className='font-italic cv-page' field='journals' index={index}>
                {journal}
              </div>
            </div>
          ))}
        </div>
        <div className='cv-presentation-item' style={{ marginBottom: 10, display: subs['presentation'] ? 'block' : 'none' }}>
          <div className='font-bold second-text'>{label.presentation}</div>
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
            <div field='skills' index={index} subfield='name' className='font-bold mb-5'>
              {skill.name}
            </div>
            <div className='rating'>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, i) => (
                <span
                  style={{ backgroundColor: skill.rate * 2 > number ? '#556e8e' : '#cccccc' }}
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
      <div className={'cv-container cv-container5' + (viewMode ? ' view-mode' : '')} spellCheck={false} onBlur={onBlur} onClick={onClick} style={{ fontFamily, fontSize: fontSize + 'pt', lineHeight }}>
        <div className='cv-top'>
          <div className={`cv-avatar${viewMode ? '' : ' editable'}`} style={{ backgroundImage: `url(http://localhost:8080/resources/cv/${info.avatar})` }} onClick={() => uploadImage({ aspect: 1 / 1, shape: 'round' })}></div>
          <div className='flex-grow'>
            <div className='cv-fullname' field='fullName'>
              {info.fullName}
            </div>
            <div className='cv-position' field='position'>
              {info.position}
            </div>
          </div>
        </div>
        {sections.information}
        <div className='header-divider'></div>
        {info.orders[0]
          .filter((s) => s.display)
          .map((s) => (
            <Fragment key={s.name}>{sections[s.name]}</Fragment>
          ))}
      </div>
    </>
  )
}
