// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconApps, IconBox, IconHelp, IconSitemap, IconBuildingSkyscraper } from '@tabler/icons';

// constant
const icons = {
  IconDashboard,
  IconApps,
  IconHelp,
  IconSitemap,
  IconBuildingSkyscraper,
  IconBox
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const mainMenu = {
  id: 'mainmenu',
  title: <FormattedMessage id="mainmenu" defaultMessage="Menu" />,
  icon: IconApps,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: true
    },
    {
      id: 'program',
      title: <FormattedMessage id="program" defaultMessage="Program" />,
      type: 'item',
      url: '/dashboard/program',
      icon: icons.IconApps,
      breadcrumbs: true
    },
    {
      id: 'kegiatan',
      title: <FormattedMessage id="Kegiatan" defaultMessage="Kegiatan" />,
      type: 'item',
      url: '/dashboard/kegiatan',
      icon: icons.IconBox,
      breadcrumbs: true
    },
    {
      id: 'subkegiatan',
      title: <FormattedMessage id="subkegiatan" defaultMessage="Sub Kegiatan" />,
      type: 'item',
      url: '/dashboard/sub-kegiatan',
      icon: icons.IconSitemap,
      breadcrumbs: true
    },
    {
      id: 'instansi',
      title: <FormattedMessage id="instansi" defaultMessage="Instansi" />,
      type: 'item',
      url: '/dashboard/instansi',
      icon: icons.IconBuildingSkyscraper,
      breadcrumbs: true
    }
  ]
};

export default mainMenu;
