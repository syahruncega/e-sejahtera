import { useMemo } from 'react';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Button, CardMedia, Container, Grid, Link, Stack, Typography } from '@mui/material';

// third party
import { motion } from 'framer-motion';
import useConfig from 'hooks/useConfig';

// project imports
import AnimateButton from 'components/ui-component/extended/AnimateButton';

// assets
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const TechLight = '/assets/images/landing/tech-light.svg';
const TechDark = '/assets/images/landing/tech-dark.svg';
const dashboard = '/assets/images/landing/hero-dashboard.png';
const widget1 = '/assets/images/landing/hero-widget-1.png';
const widget2 = '/assets/images/landing/hero-widget-2.png';
const BgDark = '/assets/images/landing/bg-hero-block-dark.png';
const BgLight = '/assets/images/landing/bg-hero-block-light.png';
const Icon1 = 'assets/images/landing/3d/icon-1.png';
const Icon2 = 'assets/images/landing/3d/icon-2.png';
const Icon3 = 'assets/images/landing/3d/icon-3.png';

// styles
const HeaderImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  borderRadius: 20,
  transform: 'scale(1.7)',
  transformOrigin: theme.direction === 'rtl' ? '100% 50%' : '0 50%',
  [theme.breakpoints.down('xl')]: {
    transform: 'scale(1.5)'
  },
  [theme.breakpoints.down('lg')]: {
    transform: 'scale(1.2)'
  }
}));

const HeaderAnimationImage = styled('img')({
  maxWidth: '100%',
  filter: 'drop-shadow(0px 0px 50px rgb(33 150 243 / 30%))'
});

// ==============================|| LANDING - HEADER PAGE ||============================== //

const HeaderSection = () => {
  const theme = useTheme();
  const { rtlLayout } = useConfig();
  const headerSX = { fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem', lg: '3.5rem' } };

  const HeaderAnimationImagememo = useMemo(
    () => (
      <HeaderAnimationImage
        src={theme.palette.mode === 'dark' ? BgDark : BgLight}
        alt="Berry"
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'absolute',
          filter: 'none',
          bottom: { md: 0 },
          right: 0,
          width: '50%',
          transformOrigin: '50% 50%',
          transform: rtlLayout ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      />
    ),
    [rtlLayout, theme]
  );

  return (
    <Container sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: { xs: 10, sm: 6, md: 0 }, mb: { xs: 2.5, md: 10 } }}>
        <Grid item xs={12} md={5}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', stiffness: 150, damping: 30 }}
              >
                <Stack spacing={1}>
                  <Typography textAlign={{ xs: 'center', md: 'left' }} variant="h1" sx={headerSX}>
                    Selamat Datang di Portal Web
                  </Typography>
                  <Typography textAlign={{ xs: 'center', md: 'left' }} variant="h1" color="primary" sx={headerSX}>
                    e-Sejahtera
                  </Typography>
                </Stack>
              </motion.div>
            </Grid>
            <Grid item xs={12} sx={{ mt: -2.5, textAlign: { xs: 'center', md: 'left' } }}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', stiffness: 150, damping: 30, delay: 0.2 }}
              >
                <Typography
                  textAlign={{ xs: 'center', md: 'left' }}
                  color="text.primary"
                  variant="body1"
                  sx={{ fontSize: { xs: '1rem', md: '1.125rem' } }}
                >
                  Berry is React based Dashboard template which helps you to build faster and beautiful web applications.
                </Typography>
              </motion.div>
            </Grid>
            {/* <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', stiffness: 150, damping: 30, delay: 0.4 }}
              >
                <Grid container spacing={2} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Grid item>
                    <AnimateButton>
                      <Button
                        component={Link}
                        href="/dashboard/default"
                        target="_blank"
                        size="large"
                        variant="contained"
                        color="secondary"
                        startIcon={<PlayArrowIcon />}
                      >
                        Live Preview
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item>
                    <Button component={Link} href="https://links.codedthemes.com/hsqll" target="_blank" size="large">
                      Purchase Now
                    </Button>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid> */}
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', stiffness: 150, damping: 30, delay: 0.6 }}
              >
                <Stack direction="row" spacing={2} alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }}>
                  <CardMedia
                    component="img"
                    image={theme.palette.mode === 'dark' ? TechDark : TechLight}
                    alt="Berry Tech"
                    sx={{ width: { xs: '75%', sm: '50%', md: '75%' } }}
                  />
                </Stack>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {HeaderAnimationImagememo}
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeaderSection;