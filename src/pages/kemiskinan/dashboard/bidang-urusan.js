// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const BidangUrusanPage = () => {
  const pageProps = {
    title: 'Bidang Urusan',
    navigation: [
      {
        title: 'Bidang Urusan',
        url: '/kemiskinan/dashboard/bidang-urusan'
      }
    ]
  };

  return (
    <Page {...pageProps}>
      <></>
    </Page>
  );
};

BidangUrusanPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default BidangUrusanPage;
