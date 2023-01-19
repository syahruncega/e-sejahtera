// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconKey, IconBug, IconUserCheck, IconUserCircle } from '@tabler/icons';

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const admin = {
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
      url: '/dashboard/pengguna'
    }
  ]
};

export default admin;
