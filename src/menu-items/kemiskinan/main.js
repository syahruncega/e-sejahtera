// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconApps, IconBox, IconHelp, IconSitemap, IconBuildingSkyscraper, IconFocus2, IconBookmarks } from '@tabler/icons';

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const mainKemiskinan = {
  id: 'main',
  title: <FormattedMessage id="main" defaultMessage="Menu" />,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/kemiskinan/dashboard',
      icon: IconDashboard
    },
    {
      id: 'bidang-urusan',
      title: <FormattedMessage id="bidang-urusan" defaultMessage="Bidang Urusan" />,
      type: 'item',
      url: 'kemiskinan/dashboard/bidang-urusan',
      icon: IconFocus2
    },
    {
      id: 'instansi',
      title: <FormattedMessage id="instansi" defaultMessage="Instansi" />,
      type: 'item',
      url: 'kemiskinan/dashboard/instansi',
      icon: IconBuildingSkyscraper
    },
    {
      id: 'program',
      title: <FormattedMessage id="program" defaultMessage="Program" />,
      type: 'item',
      url: 'kemiskinan/dashboard/program',
      icon: IconApps
    },
    {
      id: 'kegiatan',
      title: <FormattedMessage id="kegiatan" defaultMessage="Kegiatan" />,
      type: 'item',
      url: 'kemiskinan/dashboard/kegiatan',
      icon: IconBox
    },
    {
      id: 'sub-kegiatan',
      title: <FormattedMessage id="sub-kegiatan" defaultMessage="Sub Kegiatan" />,
      type: 'item',
      url: 'kemiskinan/dashboard/sub-kegiatan',
      icon: IconSitemap,
      breadcrumbs: false
    },
    {
      id: 'penerima-manfaat',
      title: <FormattedMessage id="penerima-manfaat" defaultMessage="Tagging Data" />,
      type: 'item',
      url: '/kemiskinan/dashboard/penerima-manfaat',
      icon: IconBookmarks,
      breadcrumbs: false
    }
  ]
};

export default mainKemiskinan;
