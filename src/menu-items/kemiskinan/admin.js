// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconKey, IconBug, IconUserCheck, IconUserCircle } from '@tabler/icons';

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const adminKemiskinan = {
  id: 'admin',
  title: 'Admin',
  icon: IconKey,
  type: 'group',
  children: [
    {
      id: 'pengguna',
      title: 'Pengguna',
      type: 'item',
      icon: IconUserCircle,
      breadcrumbs: false,
      url: '/kemiskinan/dashboard/pengguna'
    }
  ]
};

export default adminKemiskinan;
