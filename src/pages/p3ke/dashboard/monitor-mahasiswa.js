// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import useGuard from 'hooks/useGuard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const MonitorMahasiswaPage = () => {
  useGuard(['dosen']);
  return (
    <Page title="Monitor Mahasiswa">
      <></>
    </Page>
  );
};

MonitorMahasiswaPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default MonitorMahasiswaPage;
