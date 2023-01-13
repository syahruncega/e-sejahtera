// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconApps, IconReportAnalytics } from '@tabler/icons';

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const dpl = {
  id: 'dpl',
  title: <FormattedMessage id="dpl" defaultMessage="DPL" />,
  icon: IconApps,
  type: 'group',
  children: [
    {
      id: 'progres-mahasiswa',
      title: <FormattedMessage id="progres-mahasiswa" defaultMessage="Progres Mahasiswa" />,
      type: 'item',
      url: '/progres-mahasiswa',
      icon: IconReportAnalytics
    }
  ]
};

export default dpl;
