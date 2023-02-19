// material-ui
import { styled } from '@mui/material/styles';

// project imports
import LAYOUT from 'constant';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import AppBar from 'components/ui-component/extended/AppBar';
import BiodataCard from 'components/BiodataCard';
import ProfileGuard from 'utils/route-guard/ProfileGuard';

// assets
const headerBackground = '/assets/images/header-bg.jpg';

const HeaderWrapper = styled('div')(({ theme }) => ({
  backgroundImage: `url(${headerBackground})`,
  backgroundSize: '100% 600px',
  backgroundAttachment: 'fixed',
  backgroundRepeat: 'no-repeat',
  textAlign: 'center',
  paddingTop: 30,
  [theme.breakpoints.down('md')]: {
    paddingTop: 0
  }
}));

// ============================|| CONTACT US MAIN ||============================ //

const BiodataPage = () => (
  <Page title="Biodata">
    <HeaderWrapper>
      <AppBar />
      <BiodataCard />
    </HeaderWrapper>
  </Page>
);

BiodataPage.getLayout = function getLayout(page) {
  return (
    <Layout variant={LAYOUT.minimal}>
      <ProfileGuard>{page}</ProfileGuard>
    </Layout>
  );
};

export default BiodataPage;
