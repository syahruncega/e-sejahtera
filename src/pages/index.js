// material-ui
import { useTheme, styled } from '@mui/material/styles';

// project imports
import LAYOUT from 'constant';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import HeaderSection from 'components/landingpage/HeaderSection';
import CardSection from 'components/landingpage/CardSection';
import CustomizeSection from 'components/landingpage/CustomizeSection';
import FeatureSection from 'components/landingpage/FeatureSection';
import PreBuildDashBoard from 'components/landingpage/PreBuildDashBoard';
import PeopleSection from 'components/landingpage/PeopleSection';
import StartupProjectSection from 'components/landingpage/StartupProjectSection';
// import IncludeSection from 'components/landingpage/IncludeSection';
// import RtlInfoSection from 'components/landingpage/RtlInfoSection';
import FrameworkSection from 'components/landingpage/FrameworkSection';
import FooterSection from 'components/landingpage/FooterSection';
import Customization from 'layout/Customization';
import AppBar from 'components/ui-component/extended/AppBar';

const HeaderWrapper = styled('div')(({ theme }) => ({
  paddingTop: 30,
  overflowX: 'hidden',
  overflowY: 'clip',
  background:
    theme.palette.mode === 'dark'
      ? theme.palette.background.default
      : `linear-gradient(360deg, ${theme.palette.grey[100]} 1.09%, ${theme.palette.background.paper} 100%)`,
  [theme.breakpoints.down('md')]: {}
}));

const SectionWrapper = styled('div')({
  paddingTop: 100,
  paddingBottom: 100
});

// =============================|| LANDING MAIN ||============================= //

const Landing = () => {
  const theme = useTheme();

  return (
    <Page title="Welcome">
      {/* 1. header and hero section */}
      <HeaderWrapper id="home">
        {/* <AppBar /> */}
        <HeaderSection />
      </HeaderWrapper>

      {/* 3. about section */}
      <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'background.default' }}>
        <FeatureSection />
      </SectionWrapper>

      <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'dark.900', pb: 0 }}>
        <FooterSection />
      </SectionWrapper>
      <Customization />
    </Page>
  );
};

Landing.getLayout = function getLayout(page) {
  return <Layout variant={LAYOUT.minimal}>{page}</Layout>;
};

export default Landing;
