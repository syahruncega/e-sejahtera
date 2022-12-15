// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconKey, IconBug, IconUserCheck } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconBug,
  IconUserCheck
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const admin = {
  id: 'admin',
  title: <FormattedMessage id="admin" defaultMessage="Admin" />,
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'pengguna',
      title: <FormattedMessage id="pengguna" defaultMessage="Pengguna" />,
      type: 'item',
      icon: icons.IconUserCheck,
      breadcrumbs: false,
      url: '/pengguna'
    }
  ]
};

export default admin;
