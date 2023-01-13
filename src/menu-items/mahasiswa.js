// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconApps, IconChecks, IconUserSearch } from '@tabler/icons';

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const mahasiswa = {
  id: 'mahasiswa',
  title: <FormattedMessage id="mahasiswa" defaultMessage="Mahasiswa" />,
  icon: IconApps,
  type: 'group',
  children: [
    // {
    //   id: 'survey-p3ke',
    //   title: <FormattedMessage id="survey-p3ke" defaultMessage="Survey P3KE" />,
    //   type: 'item',
    //   url: '/survey-p3ke',
    //   icon: IconUserSearch
    // },
    {
      id: 'verifikasi-p3ke',
      title: <FormattedMessage id="verifikasi-p3ke" defaultMessage="Verifikasi P3KE" />,
      type: 'item',
      url: '/dashboard/verifikasi-p3ke',
      icon: IconChecks
    }
  ]
};

export default mahasiswa;
