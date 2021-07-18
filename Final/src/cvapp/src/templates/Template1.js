import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addCvInfo, updateCvInfo, deleteCvInfo } from '../features/create-cv/createCVSlice'
import $ from 'jquery'
import { defaultPlaceholder, viLabel, enLabel } from '../util/dataUtil'
import './template1.css'

export function Template1({ info, uploadImage, updateRating, viewMode }) {
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
      <div className='cv-section information d-flex'>
        <div className={`cv-avatar${viewMode ? '' : ' editable'}`} style={{ backgroundImage: `url(http://localhost:8080/resources/cv/${info.avatar})` }} onClick={() => uploadImage({ aspect: 3 / 4, shape: 'rect' })}></div>
        <div className='flex-grow'>
          <div className='cv-fullname' field='fullName'>
            {info.fullName}
          </div>
          <div className='cv-position' field='position'>
            {info.position}
          </div>
          <table>
            <tbody>
              <tr style={{ display: subs['gender'] ? 'table-row' : 'none' }}>
                <td className='font-bold width-110'>{label.gender}:</td>
                <td field='gender'>{info.gender}</td>
              </tr>
              <tr style={{ display: subs['dob'] ? 'table-row' : 'none' }}>
                <td className='font-bold width-110'>{label.dob}:</td>
                <td field='dob'>{info.dob}</td>
              </tr>
              <tr style={{ display: subs['address'] ? 'table-row' : 'none' }}>
                <td className='font-bold width-110'>{label.address}:</td>
                <td field='address'>{info.address}</td>
              </tr>
              <tr style={{ display: subs['marital'] ? 'table-row' : 'none' }}>
                <td className='font-bold width-110'>{label.marital}:</td>
                <td field='marital'>{info.marital}</td>
              </tr>
              <tr style={{ display: subs['childs'] ? 'table-row' : 'none' }}>
                <td className='font-bold width-110'>{label.childs}:</td>
                <td field='childs'>{info.childs}</td>
              </tr>
              <tr style={{ display: subs['nationality'] ? 'table-row' : 'none' }}>
                <td className='font-bold width-110'>{label.nationality}:</td>
                <td field='nationality'>{info.nationality}</td>
              </tr>
              <tr style={{ display: subs['religion'] ? 'table-row' : 'none' }}>
                <td className='font-bold width-110'>{label.religion}:</td>
                <td field='religion'>{info.religion}</td>
              </tr>
              <tr style={{ display: subs['phone'] ? 'table-row' : 'none' }}>
                <td className='font-bold width-110'>{label.phone}:</td>
                <td field='phone'>{info.phone}</td>
              </tr>
              <tr style={{ display: subs['email'] ? 'table-row' : 'none' }}>
                <td className='font-bold width-110'>{label.email}:</td>
                <td field='email'>{info.email}</td>
              </tr>
              <tr style={{ display: subs['website'] ? 'table-row' : 'none' }}>
                <td className='font-bold width-110'>{label.website}:</td>
                <td field='socials' className='pre-line'>
                  {info.socials}
                </td>
              </tr>
            </tbody>
          </table>
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
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span field='educations' index={index} subfield='start' style={{ minWidth: 50, display: 'inline-block' }}>
                      {education.start}
                    </span>
                    <span> - </span>
                    <span field='educations' index={index} subfield='end' style={{ minWidth: 50, display: 'inline-block' }}>
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
    ),
    work: (
      <div className='cv-section work'>
        <div className='cv-section-header'>{label.work}</div>
        {info.works.map((work, index) => (
          <div className='cv-section-item cv-work-item' key={index}>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span field='works' index={index} subfield='start' style={{ minWidth: 50, display: 'inline-block' }}>
                      {work.start}
                    </span>
                    <span> - </span>
                    <span field='works' index={index} subfield='end' style={{ minWidth: 50, display: 'inline-block' }}>
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
    ),
    project: (
      <div className='cv-section project'>
        <div className='cv-section-header'>{label.project}</div>
        {info.projects.map((project, index) => (
          <div className='cv-section-item cv-project-item' key={index}>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span field='projects' index={index} subfield='start' style={{ minWidth: 50, display: 'inline-block' }}>
                      {project.start}
                    </span>
                    <span> - </span>
                    <span field='projects' index={index} subfield='end' style={{ minWidth: 50, display: 'inline-block' }}>
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
    ),
    membership: (
      <div className='cv-section membership'>
        <div className='cv-section-header'>{label.membership}</div>
        {info.memberships.map((membership, index) => (
          <div className='cv-section-item cv-membership-item' key={index}>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span field='memberships' index={index} subfield='start' style={{ minWidth: 50, display: 'inline-block' }}>
                      {membership.start}
                    </span>
                    <span> - </span>
                    <span field='memberships' index={index} subfield='end' style={{ minWidth: 50, display: 'inline-block' }}>
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
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span field='awards' index={index} subfield='year' style={{ minWidth: 50, display: 'inline-block' }}>
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
    ),
    certificate: (
      <div className='cv-section certificate'>
        <div className='cv-section-header'>{label.certificate}</div>
        {info.certificates.map((certificate, index) => (
          <div className='cv-section-item cv-certificate-item' key={index}>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span field='certificates' index={index} subfield='year' style={{ minWidth: 50, display: 'inline-block' }}>
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
    ),
    scholarship: (
      <div className='cv-section scholarship'>
        <div className='cv-section-header'>{label.scholarship}</div>
        {info.scholarships.map((scholarship, index) => (
          <div className='cv-section-item cv-scholarship-item' key={index}>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span field='scholarships' index={index} subfield='year' style={{ minWidth: 50, display: 'inline-block' }}>
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
    ),
    thesis: (
      <div className='cv-section thesis'>
        <div className='cv-section-header'>{label.thesis}</div>
        {info.theses.map((thesis, index) => (
          <div className='cv-section-item cv-thesis-item' key={index}>
            <div className='d-flex justify-content-between'>
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
          <div className='cv-section-item mb-0 cv-hobby-tag' key={index}>
            <div field='hobbies' index={index} style={{ minWidth: 50 }}>
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
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span field='skills' index={index} subfield='name' style={{ minWidth: 50, display: 'inline-block' }}>
                      {skill.name}
                    </span>
                  </td>
                  <td>
                    <ul className='rating'>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, i) => (
                        <li
                          onClick={() => {
                            updateRating(index, number + 1)
                          }}
                          key={i}
                        >
                          <svg viewBox='64 64 896 896' width='20px' height='20px' fill={skill.rate * 2 > number ? '#fadb14' : '#dddddd'}>
                            <path d='M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z'></path>
                          </svg>
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
    ),
  }

  return (
    <>
      <div className={'cv-container cv-container1' + (viewMode ? ' view-mode' : '')} spellCheck={false} onBlur={onBlur} onClick={onClick} style={{ fontFamily, fontSize: fontSize + 'pt', lineHeight }}>
        {sections.information}
        {info.orders[0]
          .filter((s) => s.display)
          .map((s) => (
            <Fragment key={s.name}>{sections[s.name]}</Fragment>
          ))}
      </div>
    </>
  )
}
