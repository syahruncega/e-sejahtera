// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconApps, IconBox, IconHelp, IconSitemap, IconBuildingSkyscraper, IconFocus2, IconBookmarks } from '@tabler/icons';

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const mainKemiskinan = {
  id: 'main',
  title: 'Menu',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/kemiskinan/dashboard',
      icon: IconDashboard
    },
    {
      id: 'rencana',
      title: 'Rencana',
      type: 'item',
      url: '/kemiskinan/dashboard/rencana',
      icon: IconApps
    },
    {
      id: 'indikator',
      title: 'Indikator',
      type: 'item',
      url: '/kemiskinan/dashboard/indikator',
      icon: IconBox
    },
    {
      id: 'fokus-belanja',
      title: 'Fokus Belanja',
      type: 'item',
      url: '/kemiskinan/dashboard/fokus-belanja',
      icon: IconSitemap,
      breadcrumbs: false
    },
    {
      id: 'realisasi',
      title: 'Realisasi',
      type: 'item',
      url: '/kemiskinan/dashboard/realisasi',
      icon: IconBookmarks,
      breadcrumbs: false
    },
    {
      id: 'evaluasi',
      title: 'Evaluasi',
      type: 'item',
      url: '/kemiskinan/dashboard/evaluasi',
      icon: IconBookmarks,
      breadcrumbs: false
    }
  ]
};

export default mainKemiskinan;
