// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const RealisasiPage = () => {
  const pageProps = {
    title: 'Realisasi',
    navigation: [
      {
        title: 'Realisasi',
        url: '/kemiskinan/dashboard/realisasi'
      }
    ]
  };

  return (
    <Page {...pageProps}>
      <></>
    </Page>
  );
};

RealisasiPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default RealisasiPage;
