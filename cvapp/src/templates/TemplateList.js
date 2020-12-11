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
    config: { fontFamily: 'arial', fontSize: 11, lineHeight: 1.4 },
    hidden: [],
    display: ['profile', 'education', 'work', 'project', 'membership', 'activity', 'additional', 'award', 'certificate', 'scholarship', 'thesis', 'publication', 'hobby', 'skill'],
  },
  {
    id: 'template2',
    name: 'Template 2',
    logo: template2Logo,
    component: Template2,
    config: { fontFamily: 'arial', fontSize: 11, lineHeight: 1.4 },
    hidden: [],
    display: [['information', 'skill', 'award', 'certificate', 'scholarship', 'membership', 'hobby'], ['profile', 'education', 'work', 'project', 'activity', 'additional', 'thesis', 'publication']]
  },
]

export default TemplateList
