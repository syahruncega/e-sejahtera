// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import DashboardAdmin from 'components/dashboard/Landing/Admin/DashboardAdmin';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => (
  <Page title="Default Dashboard">
    <DashboardAdmin />
  </Page>
);

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
