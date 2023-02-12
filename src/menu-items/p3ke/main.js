// third-party

// assets
import { IconDashboard, IconUserCheck, IconUserSearch, IconChecks } from '@tabler/icons';

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const mainP3KE = {
  id: 'main',
  title: 'Menu',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/p3ke/dashboard',
      icon: IconDashboard
    },
    {
      id: 'verifikasi-p3ke',
      title: 'Verifikasi P3KE',
      type: 'item',
      url: '/p3ke/dashboard/verifikasi-p3ke',
      icon: IconUserCheck,
      roles: ['admin', 'mahasiswa']
    },
    // {
    //   id: 'verifikasi-monev',
    //   title: <FormattedMessage id="verifikasi-monev" defaultMessage="Verifikasi Monev" />,
    //   type: 'item',
    //   url: '/p3ke/dashboard/verifikasi-monev',
    //   icon: IconChecklist
    // }
    {
      id: 'monitor-mahasiswa',
      title: 'Monitor Mahasiswa',
      type: 'item',
      url: '/p3ke/dashboard/monitor-mahasiswa',
      icon: IconUserSearch,
      roles: ['admin', 'dosen']
    },
    {
      id: 'monitor-dosen',
      title: 'Monitor Dosen',
      type: 'item',
      url: '/p3ke/dashboard/monitor-dosen',
      icon: IconUserSearch,
      roles: ['admin', 'pusbang']
    },
    {
      id: 'hasil-verifikasi',
      title: 'Hasil Verifikasi',
      type: 'item',
      url: '/p3ke/dashboard/hasil-verifikasi',
      icon: IconChecks,
      roles: ['admin', 'mahasiswa']
    }
  ]
};

export default mainP3KE;
