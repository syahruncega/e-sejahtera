// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const EvaluasiPage = () => {
  const pageProps = {
    title: 'Evaluasi',
    navigation: [
      {
        title: 'Evaluasi',
        url: '/kemiskinan/dashboard/evaluasi'
      }
    ]
  };

  return (
    <Page {...pageProps}>
      <></>
    </Page>
  );
};

EvaluasiPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default EvaluasiPage;
