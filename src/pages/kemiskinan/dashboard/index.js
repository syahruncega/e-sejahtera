// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import DashboardKemiskinanAdmin from 'components/dashboard/Kemiskinan/Beranda/Admin/DashboardKemiskinanAdmin';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const DashboardKemiskinan = () => (
  <Page title="Dashboard Kemiskinan">
    <DashboardKemiskinanAdmin />
  </Page>
);

DashboardKemiskinan.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default DashboardKemiskinan;
