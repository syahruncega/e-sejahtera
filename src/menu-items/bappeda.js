// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconApps, IconChecks, IconTable, IconUserSearch } from '@tabler/icons';

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const bappeda = {
  id: 'bappeda',
  title: <FormattedMessage id="bappeda" defaultMessage="BAPPEDA" />,
  icon: IconApps,
  type: 'group',
  children: [
    {
      id: 'data-p3ke',
      title: <FormattedMessage id="data-p3ke" defaultMessage="Data P3KE" />,
      type: 'item',
      url: '/data-p3ke',
      icon: IconTable
    },
    {
      id: 'survey-p3ke',
      title: <FormattedMessage id="survey-p3ke" defaultMessage="Survey P3KE" />,
      type: 'item',
      url: '/survey-p3ke',
      icon: IconUserSearch
    },
    {
      id: 'validasi-p3ke',
      title: <FormattedMessage id="validasi-p3ke" defaultMessage="Validasi P3KE" />,
      type: 'item',
      url: '/validasi-p3ke',
      icon: IconChecks
    }
  ]
};

export default bappeda;
