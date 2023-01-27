// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  IconDashboard,
  IconApps,
  IconBox,
  IconHelp,
  IconSitemap,
  IconBuildingSkyscraper,
  IconFocus2,
  IconBookmarks,
  IconUserCheck,
  IconChecklist
} from '@tabler/icons';

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const mainP3KE = {
  id: 'main',
  title: <FormattedMessage id="main" defaultMessage="Menu" />,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: 'p3ke/dashboard',
      icon: IconDashboard
    },
    {
      id: 'verifikasi-p3ke',
      title: <FormattedMessage id="verifikasi-p3ke" defaultMessage="Verifikasi P3KE" />,
      type: 'item',
      url: '/dashboard/verifikasi-p3ke',
      icon: IconUserCheck
    },
    {
      id: 'verifikasi-monev',
      title: <FormattedMessage id="verifikasi-monev" defaultMessage="Verifikasi Monev" />,
      type: 'item',
      url: '/dashboard/verifikasi-monev',
      icon: IconChecklist
    }
  ]
};

export default mainP3KE;
