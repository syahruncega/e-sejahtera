// material-ui
import { styled, useTheme } from '@mui/material/styles';

// project imports
import LAYOUT from 'constant';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import AppBar from 'components/ui-component/extended/AppBar';
import BiodataCard from 'components/BiodataCard';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Divider, Grid, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { Box } from '@mui/system';
import MainCard from 'components/ui-component/cards/MainCard';
import Link from 'Link';

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

const mediaSX = {
  width: 90,
  height: 80,
  borderRadius: '12px'
};

// ============================|| CONTACT US MAIN ||============================ //

const Atribut = () => {
  const theme = useTheme();
  return (
    <Page title="Atribut">
      <HeaderWrapper>
        {/* <AppBar /> */}
        <Container>
          <Grid container justifyContent="center" spacing={gridSpacing}>
            <Grid item sm={10} md={7} sx={{ mt: { md: 12.5, xs: 2.5 }, mb: { md: 12.5, xs: 2.5 } }}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                  <Typography
                    variant="h1"
                    color="white"
                    component="div"
                    sx={{
                      fontSize: '3.5rem',
                      fontWeight: 900,
                      lineHeight: 1.4,
                      [theme.breakpoints.down('md')]: { fontSize: '1.8125rem', marginTop: '80px' }
                    }}
                  >
                    Atribut
                  </Typography>
                </Grid>
                {/* <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ fontWeight: 400, lineHeight: 1.4, [theme.breakpoints.up('md')]: { my: 0, mx: 12.5 } }}
                    color="white"
                  >
                    Selamat datang, silahkan masukkan biodata anda sebelum melanjutkan.
                  </Typography>
                </Grid> */}
              </Grid>
            </Grid>

            <Grid item xs={10} sx={{ mb: -37.5 }}>
              <Card sx={{ mb: 6.25 }} elevation={4}>
                <CardContent sx={{ p: 4 }}>
                  <MainCard title="Images by freepik.com" content={false}>
                    <CardContent>
                      <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                          <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                              <CardMedia component="img" image="/assets/images/landing/3d/icon-1.png" title="image" sx={mediaSX} />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                              <Grid container spacing={1}>
                                <Grid item xs={12}>
                                  <Link
                                    href="https://www.freepik.com/free-photo/3d-render-checklist-with-target-bullseye-arrow_33062178.htm#query=3d%20target&position=3&from_view=search&track=sph"
                                    target="_blank"
                                    sx={{ textDecoration: 'none' }}
                                  >
                                    <Typography align="left" component="div" variant="subtitle1">
                                      Image by upklyak on Freepik
                                    </Typography>
                                  </Link>
                                  {/* <Typography align="left" component="div" variant="caption">
                                    Video | 14 minutes ago
                                  </Typography> */}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                              <CardMedia component="img" src="/assets/images/landing/3d/icon-2.png" title="image" sx={mediaSX} />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                              <Grid container spacing={1}>
                                <Grid item xs={12}>
                                  <Link
                                    href="https://www.freepik.com/free-psd/3d-illustration-people-with-gadget-use-highspeed-internet_29210313.htm#query=3d&position=2&from_view=author"
                                    target="_blank"
                                    sx={{ textDecoration: 'none' }}
                                  >
                                    <Typography align="left" component="div" variant="subtitle1">
                                      Image by jcomp on Freepik
                                    </Typography>
                                  </Link>
                                  {/* <Typography align="left" component="div" variant="caption">
                                    Video | 14 minutes ago
                                  </Typography> */}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                              <CardMedia component="img" image="/assets/images/landing/3d/icon-3.png" title="image" sx={mediaSX} />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                              <Grid container spacing={1}>
                                <Grid item xs={12}>
                                  <Link
                                    href="https://www.freepik.com/free-vector/3d-illustration-vector-cute-happy-girl-children-with-ice-cream-cone-3d-vector-cartoon-people-design_26538976.htm#page=6&query=3d%20kids&position=24&from_view=search&track=sph"
                                    target="_blank"
                                    sx={{ textDecoration: 'none' }}
                                  >
                                    <Typography align="left" component="div" variant="subtitle1">
                                      Image by felicities on Freepik
                                    </Typography>
                                  </Link>
                                  {/* <Typography align="left" component="div" variant="caption">
                                    Video | 14 minutes ago
                                  </Typography> */}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </MainCard>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </HeaderWrapper>
    </Page>
  );
};

Atribut.getLayout = function getLayout(page) {
  return <Layout variant={LAYOUT.minimal}>{page}</Layout>;
};

export default Atribut;
