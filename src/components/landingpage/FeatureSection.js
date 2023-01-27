import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Typography, Stack, CardMedia } from '@mui/material';

// project imports
import FadeInWhenVisible from './Animation';
import SubCard from 'components/ui-component/cards/SubCard';
import Avatar from 'components/ui-component/extended/Avatar';
import Logo from 'components/ui-component/Logo';
import Image from 'next/image';
import Link from 'Link';

// assets
const Icon1 = 'assets/images/landing/3d/icon-1.png';
const Icon2 = 'assets/images/landing/3d/icon-2.png';
const Icon3 = 'assets/images/landing/3d/icon-3.png';

const OfferCard = ({ title, caption, image, href }) => {
  const theme = useTheme();
  const AvaterSx = { background: 'transparent', color: theme.palette.secondary.main, width: 140, height: 140 };
  return (
    <FadeInWhenVisible>
      <Link href={href} sx={{ textDecoration: 'none' }}>
        <SubCard
          sx={{
            bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.100',
            borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.divider,
            '&:hover': { bgcolor: theme.palette.mode === 'dark' ? 'primary.main' : 'primary.light' },
            height: '100%'
          }}
        >
          <Stack spacing={4} alignItems="center">
            <Avatar variant="rounded" sx={AvaterSx}>
              <CardMedia component="img" src={image} alt="Beautiful User Interface" />
            </Avatar>
            <Stack spacing={2} alignItems="center">
              <Typography variant="h3" sx={{ fontWeight: 500, textDecoration: 'none' }}>
                {title}
              </Typography>
              {/* <Typography variant="body2" sx={{ fontSize: '1rem', textAlign: 'center' }}>
              {caption}
            </Typography> */}
            </Stack>
          </Stack>
        </SubCard>
      </Link>
    </FadeInWhenVisible>
  );
};

OfferCard.propTypes = {
  title: PropTypes.string,
  caption: PropTypes.string,
  image: PropTypes.string,
  href: PropTypes.string
};

// =============================|| LANDING - FEATURE PAGE ||============================= //

const FeatureSection = () => (
  <Container>
    <Grid container spacing={7.5} justifyContent="center">
      <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
        <Grid item sx={{ mb: 3 }}>
          <Image src="/e-sejahtera-logo.svg" width="300px" height="69" />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={5} sx={{ '&> .MuiGrid-root > div': { height: '100%' } }}>
          <Grid item md={4} sm={6}>
            <OfferCard
              title="Kemiskinan"
              caption="Berry can improve the user experience of your web application by providing a clear and intuitive layout, and consistent look and feel."
              image={Icon1}
              href="/kemiskinan/login"
            />
          </Grid>
          <Grid item md={4} sm={6}>
            <OfferCard
              title="P3KE"
              caption="Berry can save developers time and effort by providing a pre-built user interface, allowing them to focus on other aspects of the project."
              image={Icon2}
              href="/p3ke/login"
            />
          </Grid>
          <Grid item md={4} sm={6}>
            <OfferCard
              title="Stunting"
              caption="Berry simplifies admin panel development with easy theme setup and clear code with flexible layouts options."
              image={Icon3}
              href="/coming-soon"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Container>
);

export default FeatureSection;
