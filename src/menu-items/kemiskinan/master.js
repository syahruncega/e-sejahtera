// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconApps, IconBox, IconHelp, IconSitemap, IconBuildingSkyscraper, IconFocus2, IconBookmarks } from '@tabler/icons';

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const masterKemiskinan = {
  id: 'master',
  title: 'Master',
  type: 'group',
  children: [
    {
      id: 'bidang-urusan',
      title: 'Bidang Urusan',
      type: 'item',
      url: '/kemiskinan/dashboard/bidang-urusan',
      icon: IconFocus2
    },
    {
      id: 'instansi',
      title: 'Instansi',
      type: 'item',
      url: '/kemiskinan/dashboard/instansi',
      icon: IconBuildingSkyscraper
    },
    {
      id: 'program',
      title: 'Program',
      type: 'item',
      url: '/kemiskinan/dashboard/program',
      icon: IconApps
    },
    {
      id: 'kegiatan',
      title: 'Kegiatan',
      type: 'item',
      url: '/kemiskinan/dashboard/kegiatan',
      icon: IconBox
    },
    {
      id: 'sub-kegiatan',
      title: <FormattedMessage id="sub-kegiatan" defaultMessage="Sub Kegiatan" />,
      type: 'item',
      url: '/kemiskinan/dashboard/sub-kegiatan',
      icon: IconSitemap,
      breadcrumbs: false
    }
    // {
    //   id: 'penerima-manfaat',
    //   title: <FormattedMessage id="penerima-manfaat" defaultMessage="Tagging Data" />,
    //   type: 'item',
    //   url: '/kemiskinan/dashboard/penerima-manfaat',
    //   icon: IconBookmarks,
    //   breadcrumbs: false
    // }
  ]
};

export default masterKemiskinan;
