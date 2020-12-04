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

export function Template2() {
  return (
    <>
      <div className='cv-container2'>
        <div style={{ height: 30 }}></div>
        <div className='cv-top'>
          <div className='cv-fullname' contentEditable spellCheck={false} suppressContentEditableWarning>
            Nguyễn Văn Anh
          </div>
          <div className='cv-position' contentEditable spellCheck={false} suppressContentEditableWarning>
            Lập trình viên
          </div>
        </div>
        <div className='d-flex'>
          <div className='cv-col-1'>
            <div className='cv-section'>
              <div className='cv-section-header'>Thông tin</div>
              <div className='cv-info-item'>
                <Gender style={{ width: 15, height: 15, verticalAlign: -2, marginRight: 5 }} />
                <span contentEditable spellCheck={false} suppressContentEditableWarning>
                  Nam
                </span>
              </div>
              <div className='cv-info-item'>
                <Birthday style={{ width: 15, height: 15, verticalAlign: -2, marginRight: 5 }} />
                <span contentEditable spellCheck={false} suppressContentEditableWarning>
                  01/01/1998
                </span>
              </div>
              <div className='cv-info-item'>
                <Address style={{ width: 15, height: 15, verticalAlign: -2, marginRight: 5 }} />
                <span contentEditable spellCheck={false} suppressContentEditableWarning>
                  Tân Hòa - Quốc Oai - HN
                </span>
              </div>
              <div className='cv-info-item'>
                <Marital style={{ width: 15, height: 15, verticalAlign: -2, marginRight: 5 }} />
                <span contentEditable spellCheck={false} suppressContentEditableWarning>
                  Độc thân
                </span>
              </div>
              <div className='cv-info-item'>
                <Childs style={{ width: 15, height: 15, verticalAlign: -2, marginRight: 5 }} />
                <span contentEditable spellCheck={false} suppressContentEditableWarning>
                  0
                </span>
              </div>
              <div className='cv-info-item'>
                <Nationality style={{ width: 15, height: 15, verticalAlign: -2, marginRight: 5 }} />
                <span contentEditable spellCheck={false} suppressContentEditableWarning>
                  Việt Nam
                </span>
              </div>
              <div className='cv-info-item'>
                <Religion style={{ width: 15, height: 15, verticalAlign: -2, marginRight: 5 }} />
                <span contentEditable spellCheck={false} suppressContentEditableWarning>
                  Không
                </span>
              </div>
              <div className='cv-info-item'>
                <Phone style={{ width: 15, height: 15, verticalAlign: -2, marginRight: 5 }} />
                <span contentEditable spellCheck={false} suppressContentEditableWarning>
                  0123456789
                </span>
              </div>
              <div className='cv-info-item'>
                <Email style={{ width: 15, height: 15, verticalAlign: -2, marginRight: 5 }} />
                <span contentEditable spellCheck={false} suppressContentEditableWarning>
                  anhnv@gmail.com
                </span>
              </div>
              <div className='cv-info-item'>
                <Website style={{ width: 15, height: 15, verticalAlign: -2, marginRight: 5 }} />
                <span contentEditable spellCheck={false} suppressContentEditableWarning>
                  facebook.com/anh.nv
                </span>
              </div>
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Kỹ năng</div>
              <div className='cv-section-item cv-skill-item'>
                <div contentEditable spellCheck={false} suppressContentEditableWarning>
                  Tiếng Anh
                </div>
                <div className='rating'>
                  <span style={{ backgroundColor: '#000' }}></span>
                  <span style={{ backgroundColor: '#000' }}></span>
                  <span style={{ backgroundColor: '#000' }}></span>
                  <span style={{ backgroundColor: '#000' }}></span>
                  <span style={{ backgroundColor: '#000' }}></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className='cv-section-item cv-skill-item'>
                <div contentEditable spellCheck={false} suppressContentEditableWarning>
                  Tiếng Anh
                </div>
                <div className='rating'>
                  <span style={{ backgroundColor: '#000' }}></span>
                  <span style={{ backgroundColor: '#000' }}></span>
                  <span style={{ backgroundColor: '#000' }}></span>
                  <span style={{ backgroundColor: '#000' }}></span>
                  <span style={{ backgroundColor: '#000' }}></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Chứng nhận</div>
              <div className='cv-section-item cv-certificate-item'>
                <div>
                  <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                    TOEIC 450
                  </div>
                  <div>
                    <span>(</span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      2020
                    </span>
                    <span>)</span>
                  </div>
                </div>
                <div contentEditable spellCheck={false} suppressContentEditableWarning>
                  IIG Việt Nam
                </div>
              </div>
              <div className='cv-section-item cv-certificate-item'>
                <div>
                  <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                    TOEIC 450
                  </div>
                  <div>
                    <span>(</span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      2020
                    </span>
                    <span>)</span>
                  </div>
                </div>
                <div contentEditable spellCheck={false} suppressContentEditableWarning>
                  IIG Việt Nam
                </div>
              </div>
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Giải thưởng</div>
              <div className='cv-section-item cv-award-item'>
                <div>
                  <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                    Quán quân MR & MISS
                  </div>
                  <div>
                    <span>(</span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      2020
                    </span>
                    <span>)</span>
                  </div>
                </div>
                <div contentEditable spellCheck={false} suppressContentEditableWarning>
                  ĐH Bách Khoa HN
                </div>
              </div>
              <div className='cv-section-item cv-award-item'>
                <div>
                  <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                    Quán quân MR & MISS
                  </div>
                  <div>
                    <span>(</span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      2020
                    </span>
                    <span>)</span>
                  </div>
                </div>
                <div contentEditable spellCheck={false} suppressContentEditableWarning>
                  ĐH Bách Khoa HN
                </div>
              </div>
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Học bổng</div>
              <div className='cv-section-item cv-scholarship-item'>
                <div>
                  <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                    Học bổng tài năng
                  </div>
                  <div>
                    <span>(</span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      2020
                    </span>
                    <span>)</span>
                  </div>
                </div>
                <div contentEditable spellCheck={false} suppressContentEditableWarning>
                  ĐH Bách Khoa HN
                </div>
              </div>
              <div className='cv-section-item cv-scholarship-item'>
                <div>
                  <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                    Học bổng tài năng
                  </div>
                  <div>
                    <span>(</span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      2020
                    </span>
                    <span>)</span>
                  </div>
                </div>
                <div contentEditable spellCheck={false} suppressContentEditableWarning>
                  ĐH Bách Khoa HN
                </div>
              </div>
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Tổ chức</div>
              <div className='cv-section-item cv-membership-item'>
                <div>
                  <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                    Hội lập trình viên HN
                  </div>
                  <div>
                    <span>(</span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2016
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2020
                    </span>
                    <span>)</span>
                  </div>
                </div>
                <div contentEditable spellCheck={false} suppressContentEditableWarning>
                  Thành viên
                </div>
              </div>
              <div className='cv-section-item cv-membership-item'>
                <div>
                  <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                    Hội lập trình viên HN
                  </div>
                  <div>
                    <span>(</span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2016
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2020
                    </span>
                    <span>)</span>
                  </div>
                </div>
                <div contentEditable spellCheck={false} suppressContentEditableWarning>
                  Thành viên
                </div>
              </div>
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Sở thích</div>
              <div>
                <ul>
                  <li contentEditable spellCheck={false} suppressContentEditableWarning>
                    Nghe nhạc
                  </li>
                  <li contentEditable spellCheck={false} suppressContentEditableWarning>
                    Nghe nhạc
                  </li>
                  <li contentEditable spellCheck={false} suppressContentEditableWarning>
                    Nghe nhạc
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='cv-col-2'>
            <div className='cv-section'>
              <div className='cv-section-header'>Giới Thiệu</div>
              <p className='cv-page text-justify' contentEditable spellCheck={false} suppressContentEditableWarning>
                Mong muốn được thực tập tại công ty, học hỏi thêm nhiều kiến thức và kinh nghiệm lập trình, kết hợp với những kiến thức đã học được để đóng góp cho công ty trong quá trình thực tập hè.
              </p>
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Học vấn</div>
              <div className='cv-section-item cv-education-item'>
                <div className='d-flex justify-content-between mb-5'>
                  <div className='font-bold'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      ĐH Bách Khoa HN
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      Cử nhân công nghệ thông tin
                    </span>
                  </div>
                  <div className='cv-date'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2016
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2020
                    </span>
                  </div>
                </div>
                <div className='cv-page' contentEditable spellCheck={false} suppressContentEditableWarning>
                  - CPA hiện tại: 3.5
                  <br />- Dự kiến ra trường: 01/2021
                </div>
              </div>
              <div className='cv-section-item cv-education-item'>
                <div className='d-flex justify-content-between mb-5'>
                  <div className='font-bold'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      ĐH Bách Khoa HN
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      Cử nhân công nghệ thông tin
                    </span>
                  </div>
                  <div className='cv-date'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2016
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2020
                    </span>
                  </div>
                </div>
                <div className='cv-page' contentEditable spellCheck={false} suppressContentEditableWarning>
                  - CPA hiện tại: 3.5
                  <br />- Dự kiến ra trường: 01/2021
                </div>
              </div>
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Kinh nghiệm làm việc</div>
              <div className='cv-section-item cv-work-item'>
                <div className='d-flex justify-content-between mb-5'>
                  <div className='font-bold'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      Công ty ABC
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      Lập trình viên
                    </span>
                  </div>
                  <div className='cv-date'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2016
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2020
                    </span>
                  </div>
                </div>
                <div className='cv-page' contentEditable spellCheck={false} suppressContentEditableWarning>
                  - Lập trình viên chính trong các dự án của công ty
                  <br />- Hướng dẫn cho các bạn thực tập sinh mới vào công ty
                </div>
              </div>
              <div className='cv-section-item cv-work-item'>
                <div className='d-flex justify-content-between mb-5'>
                  <div className='font-bold'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      Công ty ABC
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      Lập trình viên
                    </span>
                  </div>
                  <div className='cv-date'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2016
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2020
                    </span>
                  </div>
                </div>
                <div className='cv-page' contentEditable spellCheck={false} suppressContentEditableWarning>
                  - Lập trình viên chính trong các dự án của công ty
                  <br />- Hướng dẫn cho các bạn thực tập sinh mới vào công ty
                </div>
              </div>
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Dự án</div>
              <div className='cv-section-item cv-project-item'>
                <div className='d-flex justify-content-between mb-5'>
                  <div className='font-bold'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      Đồ án 1
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      ĐH Bách Khoa HN
                    </span>
                  </div>
                  <div className='cv-date'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2016
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2020
                    </span>
                  </div>
                </div>
                <div className='cv-page' contentEditable spellCheck={false} suppressContentEditableWarning>
                  - Xây dựng ứng dụng tạo CV
                  <br />- Công nghệ sử dụng: Java
                </div>
              </div>
              <div className='cv-section-item cv-project-item'>
                <div className='d-flex justify-content-between mb-5'>
                  <div className='font-bold'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      Đồ án 1
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      ĐH Bách Khoa HN
                    </span>
                  </div>
                  <div className='cv-date'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2016
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2020
                    </span>
                  </div>
                </div>
                <div className='cv-page' contentEditable spellCheck={false} suppressContentEditableWarning>
                  - Xây dựng ứng dụng tạo CV
                  <br />- Công nghệ sử dụng: Java
                </div>
              </div>
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Hoạt động</div>
              <div contentEditable spellCheck={false} suppressContentEditableWarning>
                <ul>
                  <li>Đảm nhận vị trí chủ tịch hội sinh viên khóa 61 ĐH Bách Khoa HN</li>
                  <li>Đảm nhận vị trí chủ tịch hội sinh viên khóa 61 ĐH Bách Khoa HN</li>
                </ul>
              </div>
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Thông tin thêm</div>
              <p className='cv-page text-justify' contentEditable spellCheck={false} suppressContentEditableWarning>
                Mong muốn được thực tập tại công ty, học hỏi thêm nhiều kiến thức và kinh nghiệm lập trình, kết hợp với những kiến thức đã học được để đóng góp cho công ty trong quá trình thực tập hè.
              </p>
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Luận văn</div>
              <div className='cv-section-item cv-thesis-item'>
                <div className='d-flex justify-content-between mb-5'>
                  <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                    Luận văn thạc sĩ
                  </div>
                  <div>
                    <span>GVHD: </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      Nguyễn Văn Anh
                    </span>
                  </div>
                </div>
                <div className='cv-page text-justify' contentEditable spellCheck={false} suppressContentEditableWarning>
                  Nghiên cứu về lĩnh vực Trí tuệ nhân tạo và Học máy, xây dựng chương trình nhận diện ảnh chân dung người, sử dụng bởi các phần mềm có tính năng tải lên tập tin ảnh.
                </div>
              </div>
              <div className='cv-section-item cv-thesis-item'>
                <div className='d-flex justify-content-between mb-5'>
                  <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                    Luận văn thạc sĩ
                  </div>
                  <div>
                    <span>GVHD: </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      Nguyễn Văn Anh
                    </span>
                  </div>
                </div>
                <div className='cv-page text-justify' contentEditable spellCheck={false} suppressContentEditableWarning>
                  Nghiên cứu về lĩnh vực Trí tuệ nhân tạo và Học máy, xây dựng chương trình nhận diện ảnh chân dung người, sử dụng bởi các phần mềm có tính năng tải lên tập tin ảnh.
                </div>
              </div>
            </div>

            <div className='cv-section'>
              <div className='cv-section-header'>Xuất bản, thuyết trình</div>
              <div className='cv-section-item cv-book-item'>
                <div className='font-bold'>Sách</div>
                <div className='font-italic cv-page' contentEditable spellCheck={false} suppressContentEditableWarning>
                  Anh, N. V. (2020). Phân tích và nhận diện ảnh. Hà Nội: Kim Đồng.
                </div>
                <div className='font-italic cv-page' contentEditable spellCheck={false} suppressContentEditableWarning>
                  Anh, N. V. (2020). Phân tích và nhận diện ảnh. Hà Nội: Kim Đồng.
                </div>
              </div>
              <div className='cv-section-item cv-journal-item'>
                <div className='font-bold'>Tạp chí</div>
                <div className='font-italic cv-page' contentEditable spellCheck={false} suppressContentEditableWarning>
                  Anh, N. V. (2020). OOP Programming. Tạp chí công nghệ, 20(1), 8-12.
                </div>
                <div className='font-italic cv-page' contentEditable spellCheck={false} suppressContentEditableWarning>
                  Anh, N. V. (2020). OOP Programming. Tạp chí công nghệ, 20(1), 8-12.
                </div>
              </div>
              <div className='cv-section-item cv-book-item'>
                <div className='font-bold'>Thuyết trình</div>
                <div className='font-italic cv-page' contentEditable spellCheck={false} suppressContentEditableWarning>
                  "Lập trình Java." Hội nghị công nghệ. Hà Nội, 2020.
                </div>
                <div className='font-italic cv-page' contentEditable spellCheck={false} suppressContentEditableWarning>
                  "Lập trình Java." Hội nghị công nghệ. Hà Nội, 2020.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
