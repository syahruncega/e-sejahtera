// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconApps, IconBox, IconHelp, IconSitemap, IconBuildingSkyscraper, IconFocus2 } from '@tabler/icons';

// constant
const icons = {
  IconDashboard,
  IconApps,
  IconHelp,
  IconSitemap,
  IconBuildingSkyscraper,
  IconBox,
  IconFocus2
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const opd = {
  id: 'opd',
  title: <FormattedMessage id="opd" defaultMessage="OPD" />,
  icon: IconApps,
  type: 'group',
  children: [
    // {
    //   id: 'dashboard',
    //   title: <FormattedMessage id="dashboard" />,
    //   type: 'item',
    //   url: '/dashboard',
    //   icon: icons.IconDashboard
    // },
    {
      id: 'bidang-urusan',
      title: <FormattedMessage id="bidang-urusan" defaultMessage="Bidang Urusan" />,
      type: 'item',
      url: '/dashboard/bidang-urusan',
      icon: icons.IconFocus2
    },
    {
      id: 'instansi',
      title: <FormattedMessage id="instansi" defaultMessage="Instansi" />,
      type: 'item',
      url: '/dashboard/instansi',
      icon: icons.IconBuildingSkyscraper
    },
    {
      id: 'program',
      title: <FormattedMessage id="program" defaultMessage="Program" />,
      type: 'item',
      url: '/dashboard/program',
      icon: icons.IconApps
    },
    {
      id: 'kegiatan',
      title: <FormattedMessage id="kegiatan" defaultMessage="Kegiatan" />,
      type: 'item',
      url: '/dashboard/kegiatan',
      icon: icons.IconBox
    },
    {
      id: 'sub-kegiatan',
      title: <FormattedMessage id="sub-kegiatan" defaultMessage="Sub Kegiatan" />,
      type: 'item',
      url: '/dashboard/sub-kegiatan',
      icon: icons.IconSitemap,
      breadcrumbs: false
    }
  ]
};

export default opd;
