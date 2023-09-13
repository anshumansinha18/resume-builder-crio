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
  modern: {
    id: 'modern',
    name: 'Modern Resume',
    thumbnail: '/templates/modern.png',
    // component: dynamic(() => import('src/templates/modern/ModernTemplate'), { ssr: false }) is defining the component associated with this template. It uses the dynamic function, a feature often used with Next.js for code splitting and lazy loading. It dynamically imports the ModernTemplate component when it's needed. { ssr: false } specifies that this component should not be server-side rendered.
    component: dynamic(() => import('src/templates/modern/MordernTemplate'), {
      ssr: false,
    }),
  },
  professional: {
    id: 'professional',
    name: 'Professional Resume',
    thumbnail: '/templates/professional.png',
    component: dynamic(() => import('src/templates/professional/ProfessionalTemplate'), {
      ssr: false,
    }),
  },
  tier1_fresher_nwg: {
    id: 'tier1_fresher_nwg',
    name: 'Tier-1-Fresher Resume',
    thumbnail: '/templates/tier1_fresher.jpg',
    component: dynamic(() => import('src/templates/tier1_fresher/Tier1Fresher'), {
      ssr: false,
    }),
  }
};

export const CUSTOM_THEME_COLOR: IThemeColor = {
  labelColor: 'white',
  fontColor: 'black',
  titleColor: 'green',
  highlighterColor: '#ff7875',
  id: 4,
};

export const DATE_PICKER_FORMAT = 'DD/MM/YYYY';
