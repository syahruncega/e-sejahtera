// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconApps, IconBox, IconHelp, IconSitemap, IconBuildingSkyscraper, IconFocus2, IconBookmarks } from '@tabler/icons';

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const mainKemiskinan = {
  id: 'main',
  title: 'Indikator',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/kemiskinan/dashboard',
      icon: IconDashboard
    },
    // {
    //   id: 'bidang-urusan',
    //   title: 'Bidang Urusan',
    //   type: 'item',
    //   url: '/kemiskinan/dashboard/bidang-urusan',
    //   icon: IconFocus2
    // },
    // {
    //   id: 'instansi',
    //   title: 'Instansi',
    //   type: 'item',
    //   url: '/kemiskinan/dashboard/instansi',
    //   icon: IconBuildingSkyscraper
    // },
    {
      id: 'indikator-program',
      title: 'Program',
      type: 'item',
      url: '/kemiskinan/dashboard/master/program',
      icon: IconApps
    },
    {
      id: 'indikator-kegiatan',
      title: 'Kegiatan',
      type: 'item',
      url: '/kemiskinan/dashboard/master/kegiatan',
      icon: IconBox
    },
    {
      id: 'indikator-sub-kegiatan',
      title: 'Sub Kegiatan',
      type: 'item',
      url: '/kemiskinan/dashboard/master/sub-kegiatan',
      icon: IconSitemap,
      breadcrumbs: false
    },
    {
      id: 'penerima-manfaat',
      title: 'Penerima Manfaat',
      type: 'item',
      url: '/kemiskinan/dashboard/master/penerima-manfaat',
      icon: IconBookmarks,
      breadcrumbs: false
    }
  ]
};

export default mainKemiskinan;
