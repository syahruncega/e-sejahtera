// assets
import { IconBuildingSkyscraper, IconDashboard, IconTarget } from '@tabler/icons';

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const masterData = {
  id: 'master-data',
  title: 'Master Data',
  type: 'group',
  children: [
    {
      id: 'bidang-urusan',
      title: 'Bidang Urusan',
      type: 'item',
      url: '/kemiskinan/dashboard/bidang-urusan',
      icon: IconTarget
    },
    {
      id: 'instansi',
      title: 'Instansi',
      type: 'item',
      url: '/kemiskinan/dashboard/instansi',
      icon: IconBuildingSkyscraper
    }
  ]
};

export default masterData;
