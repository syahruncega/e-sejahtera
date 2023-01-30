// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import DashboardP3KEAdmin from 'components/dashboard/P3KE/Beranda/Admin/DashboardP3KEAdmin';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => (
  <Page title="Dashboard P3KE">
    <DashboardP3KEAdmin />
  </Page>
);

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
