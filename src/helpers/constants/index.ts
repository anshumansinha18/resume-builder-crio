import dynamic from 'next/dynamic';
import { IThemeColor, ITemplate } from './index.interface';

export const SYSTEM_COLORS: IThemeColor[] = [
  {
    labelColor: '#1890ff',
    fontColor: 'black',
    titleColor: '#0058dd',
    highlighterColor: 'yellowgreen',
    id: 1,
  },
  {
    labelColor: 'black',
    fontColor: '#780650',
    titleColor: '#254000',
    highlighterColor: 'burlywood',
    id: 2,
  },
];

//WE NEED TO UPDATE THIS:
export const AVAILABLE_TEMPLATES: ITemplate = {
  // modern: {
  //   id: 'modern',
  //   name: 'Modern Resume',
  //   thumbnail: '/templates/modern.png',
  //   // component: dynamic(() => import('src/templates/modern/ModernTemplate'), { ssr: false }) is defining the component associated with this template. It uses the dynamic function, a feature often used with Next.js for code splitting and lazy loading. It dynamically imports the ModernTemplate component when it's needed. { ssr: false } specifies that this component should not be server-side rendered.
  //   component: dynamic(() => import('src/templates/modern/MordernTemplate'), {
  //     ssr: false,
  //   }),
  // },
  // professional: {
  //   id: 'professional',
  //   name: 'Professional Resume',
  //   thumbnail: '/templates/professional.png',
  //   component: dynamic(() => import('src/templates/professional/ProfessionalTemplate'), {
  //     ssr: false,
  //   }),
  // },
  tier1_fresher_nwg: {
    id: 'tier1_fresher_nwg',
    name: 'Tier-1 + Fresher',
    thumbnail: '/templates/tier1_fresher.jpg',
    component: dynamic(() => import('src/templates/tier1_fresher/Tier1Fresher'), {
      ssr: false,
    }),
  },
  tier1_working: {
    id: 'tier1_working',
    name: 'Tier-1 + Working Professional',
    thumbnail: '/templates/tier1_fresher.jpg',
    component: dynamic(() => import('src/templates//tier1_working/Tier1Working'), {
      ssr: false,
    }),
  },
  tier1_career_transition: {
    id: 'tier1_career_transition',
    name: 'Tier-1 + Career Transition',
    thumbnail: '/templates/tier1_fresher.jpg',
    component: dynamic(
      () => import('src/templates/tier1_career_transition/Tier1CareerTransition'),
      {
        ssr: false,
      }
    ),
  },
  others_fresher_nwg: {
    id: 'others_fresher_nwg',
    name: 'Others + Fresher/NWG',
    thumbnail: '/templates/tier1_fresher.jpg',
    component: dynamic(() => import('src/templates/others_fresher/OthersFresher'), {
      ssr: false,
    }),
  },
  others_working: {
    id: 'others_working',
    name: 'Others + Working Professional',
    thumbnail: '/templates/tier1_fresher.jpg',
    component: dynamic(() => import('src/templates/others_working/OthersWorking'), {
      ssr: false,
    }),
  },
  others_career_transition: {
    id: 'others_career_transition',
    name: 'Others + Career Transition',
    thumbnail: '/templates/tier1_fresher.jpg',
    component: dynamic(
      () => import('src/templates/others_career_transition/OthersCareerTransition'),
      {
        ssr: false,
      }
    ),
  },
};

export const CUSTOM_THEME_COLOR: IThemeColor = {
  labelColor: 'white',
  fontColor: 'black',
  titleColor: 'green',
  highlighterColor: '#ff7875',
  id: 4,
};

export const DATE_PICKER_FORMAT = 'DD/MM/YYYY';
