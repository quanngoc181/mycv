import './template1.css'

export function Template1() {
  return (
    <>
      <div className='cv-container1'>
        <div className='cv-section d-flex'>
          <img className='cv-avatar' src='http://localhost:8080/resources/avatar/default-avatar.png' alt='Anh dai dien' />
          <div className='flex-grow'>
            <div className='cv-fullname' contentEditable spellCheck={false} suppressContentEditableWarning>
              Nguyễn Văn Anh
            </div>
            <div className='cv-position' contentEditable spellCheck={false} suppressContentEditableWarning>
              Thực tập sinh
            </div>
            <table>
              <tbody>
                <tr>
                  <td className='font-bold width-100'>Giới tính:</td>
                  <td contentEditable spellCheck={false} suppressContentEditableWarning>
                    Nam
                  </td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Ngày sinh:</td>
                  <td contentEditable spellCheck={false} suppressContentEditableWarning>
                    01/01/1998
                  </td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Địa chỉ:</td>
                  <td contentEditable spellCheck={false} suppressContentEditableWarning>
                    Tân Hòa - Quốc Oai - Hà Nội
                  </td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Hôn nhân:</td>
                  <td contentEditable spellCheck={false} suppressContentEditableWarning>
                    Độc thân
                  </td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Số con:</td>
                  <td contentEditable spellCheck={false} suppressContentEditableWarning>
                    0
                  </td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Quốc tịch:</td>
                  <td contentEditable spellCheck={false} suppressContentEditableWarning>
                    Việt Nam
                  </td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Tôn giáo:</td>
                  <td contentEditable spellCheck={false} suppressContentEditableWarning>
                    Không
                  </td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Điện thoại:</td>
                  <td contentEditable spellCheck={false} suppressContentEditableWarning>
                    0123456789
                  </td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Email:</td>
                  <td contentEditable spellCheck={false} suppressContentEditableWarning>
                    anhnv@gmail.com
                  </td>
                </tr>
                <tr>
                  <td className='font-bold width-100'>Website:</td>
                  <td contentEditable spellCheck={false} suppressContentEditableWarning>
                    facebook.com/anh.nv
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Giới Thiệu</div>
          <p className='cv-page text-justify' contentEditable spellCheck={false} suppressContentEditableWarning>
            Mong muốn được thực tập tại công ty, học hỏi thêm nhiều kiến thức và kinh nghiệm lập trình, kết hợp với những kiến thức đã học được để đóng góp cho công ty trong quá trình thực tập hè. Hơn thế nữa là được trở thành nhân viên chính thức của công ty.
          </p>
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Học vấn</div>
          <div className='cv-section-item cv-education-item'>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2016
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2020
                    </span>
                  </td>
                  <td>
                    <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                      Đại học Bách Khoa Hà Nội
                    </div>
                    <div contentEditable spellCheck={false} suppressContentEditableWarning>
                      Cử nhân công nghệ thông tin
                    </div>
                    <div className='cv-page' contentEditable spellCheck={false} suppressContentEditableWarning>
                      - CPA hiện tại: 3.5
                      <br />- Dự kiến ra trường: 01/2021
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='cv-section-item cv-education-item'>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2016
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2020
                    </span>
                  </td>
                  <td>
                    <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                      Đại học Bách Khoa Hà Nội
                    </div>
                    <div contentEditable spellCheck={false} suppressContentEditableWarning>
                      Cử nhân công nghệ thông tin
                    </div>
                    <div className='cv-page' contentEditable spellCheck={false} suppressContentEditableWarning>
                      - CPA hiện tại: 3.5
                      <br />- Dự kiến ra trường: 01/2021
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Kinh nghiệm làm việc</div>
          <div className='cv-section-item cv-work-item'>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2016
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2020
                    </span>
                  </td>
                  <td>
                    <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                      Công ty ABC
                    </div>
                    <div contentEditable spellCheck={false} suppressContentEditableWarning>
                      Lập trình viên
                    </div>
                    <div className='cv-page' contentEditable spellCheck={false} suppressContentEditableWarning>
                      - Lập trình viên chính trong các dự án của công ty
                      <br />- Hướng dẫn cho các bạn thực tập sinh mới vào công ty
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='cv-section-item cv-work-item'>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2016
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2020
                    </span>
                  </td>
                  <td>
                    <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                      Công ty ABC
                    </div>
                    <div contentEditable spellCheck={false} suppressContentEditableWarning>
                      Lập trình viên
                    </div>
                    <div className='cv-page' contentEditable spellCheck={false} suppressContentEditableWarning>
                      - Lập trình viên chính trong các dự án của công ty
                      <br />- Hướng dẫn cho các bạn thực tập sinh mới vào công ty
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Dự án</div>
          <div className='cv-section-item cv-project-item'>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2016
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2020
                    </span>
                  </td>
                  <td>
                    <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                      Đồ án 1
                    </div>
                    <div contentEditable spellCheck={false} suppressContentEditableWarning>
                      Đại học Bách Khoa Hà Nội
                    </div>
                    <div className='cv-page' contentEditable spellCheck={false} suppressContentEditableWarning>
                      - Xây dựng ứng dụng tạo CV
                      <br />- Công nghệ sử dụng: Java
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='cv-section-item cv-project-item'>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2016
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2020
                    </span>
                  </td>
                  <td>
                    <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                      Đồ án 1
                    </div>
                    <div contentEditable spellCheck={false} suppressContentEditableWarning>
                      Đại học Bách Khoa Hà Nội
                    </div>
                    <div className='cv-page' contentEditable spellCheck={false} suppressContentEditableWarning>
                      - Xây dựng ứng dụng tạo CV
                      <br />- Công nghệ sử dụng: Java
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Tổ chức</div>
          <div className='cv-section-item cv-membership-item'>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2016
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2020
                    </span>
                  </td>
                  <td>
                    <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                      Hội lập trình viên Hà Nội
                    </div>
                    <div contentEditable spellCheck={false} suppressContentEditableWarning>
                      Thành viên
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='cv-section-item cv-membership-item'>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2016
                    </span>
                    <span> - </span>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      01/2020
                    </span>
                  </td>
                  <td>
                    <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                      Hội lập trình viên Hà Nội
                    </div>
                    <div contentEditable spellCheck={false} suppressContentEditableWarning>
                      Thành viên
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Hoạt động</div>
          <div contentEditable spellCheck={false} suppressContentEditableWarning>
            <ul>
              <li>Đảm nhận vị trí chủ tịch hội sinh viên khóa 61 Đại học Bách Khoa Hà Nội</li>
              <li>Đảm nhận vị trí chủ tịch hội sinh viên khóa 61 Đại học Bách Khoa Hà Nội</li>
            </ul>
          </div>
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Thông tin thêm</div>
          <p className='cv-page text-justify' contentEditable spellCheck={false} suppressContentEditableWarning>
            Mong muốn được thực tập tại công ty, học hỏi thêm nhiều kiến thức và kinh nghiệm lập trình, kết hợp với những kiến thức đã học được để đóng góp cho công ty trong quá trình thực tập hè. Hơn thế nữa là được trở thành nhân viên chính thức của công ty.{' '}
          </p>
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Giải thưởng</div>
          <div className='cv-section-item cv-award-item'>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      2020
                    </span>
                  </td>
                  <td>
                    <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                      Quán quân MR & MISS
                    </div>
                    <div contentEditable spellCheck={false} suppressContentEditableWarning>
                      Đại học Bách Khoa Hà Nội
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='cv-section-item cv-award-item'>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      2020
                    </span>
                  </td>
                  <td>
                    <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                      Quán quân MR & MISS
                    </div>
                    <div contentEditable spellCheck={false} suppressContentEditableWarning>
                      Đại học Bách Khoa Hà Nội
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Chứng nhận</div>
          <div className='cv-section-item cv-certificate-item'>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      2020
                    </span>
                  </td>
                  <td>
                    <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                      TOEIC 450
                    </div>
                    <div contentEditable spellCheck={false} suppressContentEditableWarning>
                      IIG Việt Nam
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='cv-section-item cv-certificate-item'>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      2020
                    </span>
                  </td>
                  <td>
                    <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                      TOEIC 450
                    </div>
                    <div contentEditable spellCheck={false} suppressContentEditableWarning>
                      IIG Việt Nam
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Học bổng</div>
          <div className='cv-section-item cv-scholarship-item'>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      2020
                    </span>
                  </td>
                  <td>
                    <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                      Học bổng tài năng
                    </div>
                    <div contentEditable spellCheck={false} suppressContentEditableWarning>
                      Đại học Bách Khoa Hà Nội
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='cv-section-item cv-scholarship-item'>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <span contentEditable spellCheck={false} suppressContentEditableWarning>
                      2020
                    </span>
                  </td>
                  <td>
                    <div className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                      Học bổng tài năng
                    </div>
                    <div contentEditable spellCheck={false} suppressContentEditableWarning>
                      Đại học Bách Khoa Hà Nội
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Luận văn</div>
          <div className='cv-section-item cv-thesis-item'>
            <div className='d-flex justify-content-between'>
              <span className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                Luận văn thạc sĩ
              </span>
              <span>
                <span>GVHD: </span>
                <span contentEditable spellCheck={false} suppressContentEditableWarning>
                  Nguyễn Văn Anh
                </span>
              </span>
            </div>
            <div className='cv-page text-justify' contentEditable spellCheck={false} suppressContentEditableWarning>
              Nghiên cứu về lĩnh vực Trí tuệ nhân tạo và Học máy, xây dựng chương trình nhận diện ảnh chân dung người, sử dụng bởi các phần mềm có tính năng tải lên tập tin ảnh.
            </div>
          </div>
          <div className='cv-section-item cv-thesis-item'>
            <div className='d-flex justify-content-between'>
              <span className='font-bold' contentEditable spellCheck={false} suppressContentEditableWarning>
                Luận văn thạc sĩ
              </span>
              <span>
                <span>GVHD: </span>
                <span contentEditable spellCheck={false} suppressContentEditableWarning>
                  Nguyễn Văn Anh
                </span>
              </span>
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
              Anh, N. V. (2020). Lập trình hướng đối tượng. Tạp chí công nghệ, 20(1), 8-12.
            </div>
            <div className='font-italic cv-page' contentEditable spellCheck={false} suppressContentEditableWarning>
              Anh, N. V. (2020). Lập trình hướng đối tượng. Tạp chí công nghệ, 20(1), 8-12.
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

        <div className='cv-section'>
          <div className='cv-section-header'>Sở thích</div>
          <div className='cv-hobby-tag' contentEditable spellCheck={false} suppressContentEditableWarning>
            Nghe nhạc
          </div>
          <div className='cv-hobby-tag' contentEditable spellCheck={false} suppressContentEditableWarning>
            Nghe nhạc
          </div>
          <div className='cv-hobby-tag' contentEditable spellCheck={false} suppressContentEditableWarning>
            Nghe nhạc
          </div>
        </div>

        <div className='cv-section'>
          <div className='cv-section-header'>Kỹ năng</div>
          <div className='cv-section-item cv-skill-item'>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <div contentEditable spellCheck={false} suppressContentEditableWarning>
                      Tiếng Anh
                    </div>
                  </td>
                  <td>
                    <ul className='rating'>
                      <li>
                        <div style={{ position: 'relative' }}>
                          <div style={{ position: 'absolute', overflow: 'hidden', width: '100%' }}>
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
                      <li>
                        <div style={{ position: 'relative' }}>
                          <div style={{ position: 'absolute', overflow: 'hidden', width: '100%' }}>
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
                      <li>
                        <div style={{ position: 'relative' }}>
                          <div style={{ position: 'absolute', overflow: 'hidden', width: '50%' }}>
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
                      <li>
                        <div style={{ position: 'relative' }}>
                          <div style={{ position: 'absolute', overflow: 'hidden', width: '0%' }}>
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
                      <li>
                        <div style={{ position: 'relative' }}>
                          <div style={{ position: 'absolute', overflow: 'hidden', width: '0%' }}>
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
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='cv-section-item cv-skill-item'>
            <table>
              <tbody>
                <tr>
                  <td className='width-150'>
                    <div contentEditable spellCheck={false} suppressContentEditableWarning>
                      Tiếng Anh
                    </div>
                  </td>
                  <td>
                    <ul className='rating'>
                      <li>
                        <div style={{ position: 'relative' }}>
                          <div style={{ position: 'absolute', overflow: 'hidden', width: '100%' }}>
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
                      <li>
                        <div style={{ position: 'relative' }}>
                          <div style={{ position: 'absolute', overflow: 'hidden', width: '100%' }}>
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
                      <li>
                        <div style={{ position: 'relative' }}>
                          <div style={{ position: 'absolute', overflow: 'hidden', width: '50%' }}>
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
                      <li>
                        <div style={{ position: 'relative' }}>
                          <div style={{ position: 'absolute', overflow: 'hidden', width: '0%' }}>
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
                      <li>
                        <div style={{ position: 'relative' }}>
                          <div style={{ position: 'absolute', overflow: 'hidden', width: '0%' }}>
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
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
