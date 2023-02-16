// assets
import { IconKey, IconBug, IconUserCheck, IconUserCircle } from '@tabler/icons';

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const adminP3KE = {
  id: 'admin',
  title: 'Admin',
  icon: IconKey,
  type: 'group',
  roles: ['admin'],
  children: [
    {
      id: 'pengguna',
      title: 'Pengguna',
      type: 'item',
      icon: IconUserCircle,
      breadcrumbs: false,
      url: '/p3ke/dashboard/pengguna'
    }
  ]
};

export default adminP3KE;
