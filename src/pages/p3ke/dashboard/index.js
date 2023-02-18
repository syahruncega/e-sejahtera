// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import DashboardP3KEAdmin from 'components/dashboard/P3KE/Beranda/Admin/DashboardP3KEAdmin';
import useAuth from 'hooks/useAuth';
import DashboardP3KEMahasiswa from 'components/dashboard/P3KE/Beranda/Mahasiswa/DashboardP3KEMahasiswa';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <Page title="Dashboard P3KE">
      {user.role === 'admin' && <DashboardP3KEAdmin />} {user.role === 'mahasiswa' && <DashboardP3KEMahasiswa />}
    </Page>
  );
};

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
