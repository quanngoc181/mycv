import moment from 'moment'
import { buildBook, buildJournal, buildPresentation } from './citationUtil'

const genders = {
  vi: {
    male: 'Nam',
    female: 'Nữ',
  },
  en: {
    male: 'Male',
    female: 'Female',
  },
}
const maritals = {
  vi: {
    single: 'Độc thân',
    married: 'Kết hôn',
    divorced: 'Ly hôn',
    widowed: 'Góa',
  },
  en: {
    single: 'Single',
    married: 'Married',
    divorced: 'Divorced',
    widowed: 'Widowed',
  },
}

export const defaultInfo = {
  fullName: 'Nguyễn Văn Anh',
  position: 'Thực tập sinh',
  gender: 'Nam',
  dob: '01/01/1998',
  address: 'Tân Hòa - Quốc Oai - Hà Nội',
  marital: 'Độc thân',
  childs: 0,
  nationality: 'Việt Nam',
  religion: 'Không',
  phone: '0123456789',
  email: 'anhnv@gmail.com',
  socials: 'facebook.com/anh.nv',
  profile: 'Mong muốn được thực tập tại công ty, học hỏi thêm nhiều kiến thức và kinh nghiệm lập trình, kết hợp với những kiến thức đã học được để đóng góp cho công ty trong quá trình thực tập hè. Hơn thế nữa là được trở thành nhân viên chính thức của công ty.',
  activities: ['Đảm nhận vị trí chủ tịch hội sinh viên khóa 61 Đại học Bách Khoa Hà Nội', 'Đảm nhận vị trí chủ tịch hội sinh viên khóa 61 Đại học Bách Khoa Hà Nội'],
  hobbies: ['Nghe nhạc', 'Nghe nhạc'],
  educations: [
    { school: 'Đại học Bách Khoa Hà Nội', field: 'Cử nhân công nghệ thông tin', start: '01/2016', end: '01/2020', description: '- CPA hiện tại: 3.5\n- Dự kiến ra trường: 01/2021' },
    { school: 'Đại học Bách Khoa Hà Nội', field: 'Cử nhân công nghệ thông tin', start: '01/2016', end: '01/2020', description: '- CPA hiện tại: 3.5\n- Dự kiến ra trường: 01/2021' },
  ],
  works: [
    { company: 'Công ty ABC', position: 'Lập trình viên', start: '01/2016', end: '01/2020', description: '- Lập trình viên chính trong các dự án của công ty\n- Hướng dẫn cho các bạn thực tập sinh mới vào công ty' },
    { company: 'Công ty ABC', position: 'Lập trình viên', start: '01/2016', end: '01/2020', description: '- Lập trình viên chính trong các dự án của công ty\n- Hướng dẫn cho các bạn thực tập sinh mới vào công ty' },
  ],
  projects: [
    { name: 'Đồ án 1', company: 'Đại học Bách Khoa Hà Nội', start: '01/2016', end: '01/2020', description: '- Xây dựng ứng dụng tạo CV\n- Công nghệ sử dụng: Java' },
    { name: 'Đồ án 1', company: 'Đại học Bách Khoa Hà Nội', start: '01/2016', end: '01/2020', description: '- Xây dựng ứng dụng tạo CV\n- Công nghệ sử dụng: Java' },
  ],
  memberships: [
    { role: 'Thành viên', organization: 'Hội lập trình viên Hà Nội', start: '01/2016', end: '01/2020' },
    { role: 'Thành viên', organization: 'Hội lập trình viên Hà Nội', start: '01/2016', end: '01/2020' },
  ],
  additional: 'Mong muốn được thực tập tại công ty, học hỏi thêm nhiều kiến thức và kinh nghiệm lập trình, kết hợp với những kiến thức đã học được để đóng góp cho công ty trong quá trình thực tập hè. Hơn thế nữa là được trở thành nhân viên chính thức của công ty.',
  skills: [
    { name: 'Tiếng Anh', rate: 2.5 },
    { name: 'Tiếng Anh', rate: 2.5 },
  ],
  awards: [
    { name: 'Quán quân MR & MISS', organization: 'Đại học Bách Khoa Hà Nội', year: 2020 },
    { name: 'Quán quân MR & MISS', organization: 'Đại học Bách Khoa Hà Nội', year: 2020 },
  ],
  certificates: [
    { name: 'TOEIC 450', organization: 'IIG Việt Nam', year: 2020 },
    { name: 'TOEIC 450', organization: 'IIG Việt Nam', year: 2020 },
  ],
  scholarships: [
    { name: 'Học bổng tài năng', organization: 'Đại học Bách Khoa Hà Nội', year: 2020 },
    { name: 'Học bổng tài năng', organization: 'Đại học Bách Khoa Hà Nội', year: 2020 },
  ],
  theses: [
    { title: 'Luận văn thạc sĩ', advisor: 'Nguyễn Văn Anh', description: 'Nghiên cứu về lĩnh vực Trí tuệ nhân tạo và Học máy, xây dựng chương trình nhận diện ảnh chân dung người, sử dụng bởi các phần mềm có tính năng tải lên tập tin ảnh.' },
    { title: 'Luận văn thạc sĩ', advisor: 'Nguyễn Văn Anh', description: 'Nghiên cứu về lĩnh vực Trí tuệ nhân tạo và Học máy, xây dựng chương trình nhận diện ảnh chân dung người, sử dụng bởi các phần mềm có tính năng tải lên tập tin ảnh.' },
  ],
  books: ['Anh, N. V. (2020). Phân tích và nhận diện ảnh. Hà Nội: Kim Đồng.', 'Anh, N. V. (2020). Phân tích và nhận diện ảnh. Hà Nội: Kim Đồng.'],
  journals: ['Anh, N. V. (2020). Lập trình hướng đối tượng. Tạp chí công nghệ, 20(1), 8-12.', 'Anh, N. V. (2020). Lập trình hướng đối tượng. Tạp chí công nghệ, 20(1), 8-12.'],
  presentations: ['"Lập trình Java." Hội nghị công nghệ. Hà Nội, 2020.', '"Lập trình Java." Hội nghị công nghệ. Hà Nội, 2020.'],
}

export const defaultPlaceholder = {
  fullName: 'Họ và tên',
  position: 'Vị trí ứng tuyển',
  gender: 'Giới tính',
  dob: '01/01/2020',
  address: 'Địa chỉ',
  marital: 'Tình trạng hôn nhân',
  childs: 'Số con',
  nationality: 'Quốc tịch',
  religion: 'Tôn giáo',
  phone: 'Điện thoại',
  email: 'Email',
  socials: 'Mạng xã hội',
  profile: 'Giới thiệu ngắn gọn về bản thân của bạn và mục tiêu sau khi vào công ty',
  activities: 'Mô tả hoạt động ngoại khóa',
  hobbies: 'Sở thích',
  educations: { school: 'Trường học', field: 'Ngành học', start: '01/2020', end: '01/2020', description: 'Mô tả thêm về quá trình học tập' },
  works: { company: 'Công ty', position: 'Vị trí', start: '01/2020', end: '01/2020', description: 'Mô tả thêm về quá trình làm việc' },
  projects: { name: 'Dự án', company: 'Nơi thực hiện', start: '01/2020', end: '01/2020', description: 'Mô tả thêm về dự án' },
  memberships: { role: 'Vai trò', organization: 'Tổ chức', start: '01/2020', end: '01/2020' },
  additional: 'Các thông tin khác bổ sung',
  skills: { name: 'Kỹ năng' },
  awards: { name: 'Giải thưởng', organization: 'Trao bởi', year: '2020' },
  certificates: { name: 'Chứng nhận', organization: 'Trao bởi', year: '2020' },
  scholarships: { name: 'Học bổng', organization: 'Trao bởi', year: '2020' },
  theses: { title: 'Luận văn', advisor: 'Người hướng dẫn', description: 'Mô tả thêm về luận văn' },
  books: 'Trích dẫn sách',
  journals: 'Trích dẫn bài viết',
  presentations: 'Trích dẫn bài thuyết trình',
}

export const viLabel = {
  information: 'Thông tin',
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
  profile: 'Giới thiệu',
  education: 'Học vấn',
  work: 'Kinh nghiệm làm việc',
  project: 'Dự án',
  membership: 'Tổ chức',
  activity: 'Hoạt động',
  additional: 'Thông tin thêm',
  award: 'Giải thưởng',
  certificate: 'Chứng nhận',
  scholarship: 'Học bổng',
  thesis: 'Luận văn',
  publication: 'Xuất bản, thuyết trình',
  hobby: 'Sở thích',
  skill: 'Kỹ năng',
  advisor: 'GVHD',
  book: 'Sách',
  journal: 'Tạp chí',
  presentation: 'Thuyết trình',
}

export const enLabel = {
  information: 'Information',
  gender: 'Gender',
  dob: 'Birthday',
  address: 'Address',
  marital: 'Marital status',
  childs: 'Children',
  nationality: 'Nationality',
  religion: 'Religion',
  phone: 'Tel',
  email: 'Email',
  website: 'Website',
  profile: 'Profile',
  education: 'Education',
  work: 'Work experience',
  project: 'Projects',
  membership: 'Memberships',
  activity: 'Activities',
  additional: 'Additional information',
  award: 'Honors / Awards',
  certificate: 'Certificates',
  scholarship: 'Scholarships',
  thesis: 'Thesis / Dissertation',
  publication: 'Publications / Presentations',
  hobby: 'Interests',
  skill: 'Skills',
  advisor: 'Advisor',
  book: 'Books',
  journal: 'Publications',
  presentation: 'Presentations',
}

export const formatInfo = (info, language, citation) => {
  let mappedInfo = {
    ...info,
    gender: info.gender ? genders[language][info.gender] : null,
    marital: info.marital ? maritals[language][info.marital] : null,
    dob: info.dob ? moment(info.dob).format('DD/MM/YYYY') : null,
    socials: info.socials ? info.socials.join('\n') : null,
    educations: info.educations.map((education) => ({
      ...education,
      start: education.start ? moment(education.start).format('MM/YYYY') : null,
      end: education.end ? moment(education.end).format('MM/YYYY') : null,
    })),
    works: info.works.map((work) => ({
      ...work,
      start: work.start ? moment(work.start).format('MM/YYYY') : null,
      end: work.end ? moment(work.end).format('MM/YYYY') : null,
    })),
    projects: info.projects.map((project) => ({
      ...project,
      start: project.start ? moment(project.start).format('MM/YYYY') : null,
      end: project.end ? moment(project.end).format('MM/YYYY') : null,
    })),
    memberships: info.memberships.map((membership) => ({
      ...membership,
      start: membership.start ? moment(membership.start).format('MM/YYYY') : null,
      end: membership.end ? moment(membership.end).format('MM/YYYY') : null,
    })),
    books: info.books.map((book) => buildBook(book, citation)),
    journals: info.journals.map((journal) => buildJournal(journal, citation)),
    presentations: info.presentations.map((presentation) => buildPresentation(presentation)),
  }

  if (mappedInfo.hobbies.length === 0) mappedInfo.hobbies = [null]
  if (mappedInfo.activities.length === 0) mappedInfo.activities = [null]
  if (mappedInfo.educations.length === 0) mappedInfo.educations = [{}]
  if (mappedInfo.works.length === 0) mappedInfo.works = [{}]
  if (mappedInfo.projects.length === 0) mappedInfo.projects = [{}]
  if (mappedInfo.memberships.length === 0) mappedInfo.memberships = [{}]
  if (mappedInfo.skills.length === 0) mappedInfo.skills = [{}]
  if (mappedInfo.theses.length === 0) mappedInfo.theses = [{}]
  if (mappedInfo.awards.length === 0) mappedInfo.awards = [{}]
  if (mappedInfo.certificates.length === 0) mappedInfo.certificates = [{}]
  if (mappedInfo.scholarships.length === 0) mappedInfo.scholarships = [{}]
  if (mappedInfo.books.length === 0) mappedInfo.books = [null]
  if (mappedInfo.journals.length === 0) mappedInfo.journals = [null]
  if (mappedInfo.presentations.length === 0) mappedInfo.presentations = [null]

  return mappedInfo
}
