// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconKey, IconBug, IconUserCheck, IconUserCircle } from '@tabler/icons';

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const adminP3KE = {
  id: 'admin',
  title: <FormattedMessage id="admin" defaultMessage="Admin" />,
  icon: IconKey,
  type: 'group',
  children: [
    {
      id: 'pengguna',
      title: <FormattedMessage id="pengguna" defaultMessage="Pengguna" />,
      type: 'item',
      icon: IconUserCircle,
      breadcrumbs: false,
      url: '/p3ke/dashboard/pengguna'
    }
  ]
};

export default adminP3KE;
