import template1Logo from './template1.png'
import template2Logo from './template2.png'
import { Template1 } from './Template1'
import { Template2 } from './Template2'

const TemplateList = [
  {
    id: 'template1',
    name: 'Template 1',
    logo: template1Logo,
    component: Template1,
    config: {
      fontFamily: 'arial',
      fontSize: 11,
      lineHeight: 1.4,
      orders: [
        [
          { name: 'profile', display: true },
          { name: 'education', display: true },
          { name: 'work', display: true },
          { name: 'project', display: true },
          { name: 'membership', display: true },
          { name: 'skill', display: true },
          { name: 'award', display: true },
          { name: 'certificate', display: true },
          { name: 'scholarship', display: true },
          { name: 'thesis', display: true },
          { name: 'publication', display: true },
          { name: 'activity', display: true },
          { name: 'hobby', display: true },
          { name: 'additional', display: true },
        ],
      ],
      subs: [
        { name: 'gender', display: true },
        { name: 'dob', display: true },
        { name: 'address', display: true },
        { name: 'marital', display: true },
        { name: 'childs', display: true },
        { name: 'nationality', display: true },
        { name: 'religion', display: true },
        { name: 'phone', display: true },
        { name: 'email', display: true },
        { name: 'website', display: true },
        { name: 'book', display: true },
        { name: 'journal', display: true },
        { name: 'presentation', display: true },
      ],
    },
  },
  {
    id: 'template2',
    name: 'Template 2',
    logo: template2Logo,
    component: Template2,
    config: {
      fontFamily: 'arial',
      fontSize: 11,
      lineHeight: 1.4,
      orders: [
        [
          { name: 'information', display: true },
          { name: 'skill', display: true },
          { name: 'award', display: true },
          { name: 'certificate', display: true },
          { name: 'scholarship', display: true },
          { name: 'membership', display: true },
          { name: 'hobby', display: true },
        ],
        [
          { name: 'profile', display: true },
          { name: 'education', display: true },
          { name: 'work', display: true },
          { name: 'project', display: true },
          { name: 'thesis', display: true },
          { name: 'publication', display: true },
          { name: 'activity', display: true },
          { name: 'additional', display: true },
        ],
      ],
      subs: [
        { name: 'gender', display: true },
        { name: 'dob', display: true },
        { name: 'address', display: true },
        { name: 'marital', display: true },
        { name: 'childs', display: true },
        { name: 'nationality', display: true },
        { name: 'religion', display: true },
        { name: 'phone', display: true },
        { name: 'email', display: true },
        { name: 'website', display: true },
        { name: 'book', display: true },
        { name: 'journal', display: true },
        { name: 'presentation', display: true },
      ],
    },
  },
]

export default TemplateList
