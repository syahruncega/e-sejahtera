import Image from 'next/image';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';

// third-party
// import NumberFormat from 'react-number-format';

// project imports
import { gridSpacing } from 'store/constant';
import FormProfilMahasiswa from './dashboard/Profil/FormProfilMahasiswa';
import FormProfilDosen from './dashboard/Profil/FormProfilDosen';
import useAuth from 'hooks/useAuth';
import FormProfilAdmin from './dashboard/Profil/FormProfilAdmin';
import FormProfilPusbang from './dashboard/Profil/FormProfilPusbang';
import FormProfilAnalis from './dashboard/Profil/FormProfilAnalis';

// assets
const mailImg = '/assets/images/img-contact-mail.svg';

// ===========================|| CONTACT CARD - FORMS ||=========================== //

const BiodataCard = () => {
  const theme = useTheme();
  const { user } = useAuth();

  return (
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
                Lengkapi Biodata
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: 400, lineHeight: 1.4, [theme.breakpoints.up('md')]: { my: 0, mx: 12.5 } }}
                color="white"
              >
                Selamat datang, silahkan masukkan biodata anda sebelum melanjutkan.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ position: 'relative', display: { xs: 'none', lg: 'block' } }}>
          <Box
            sx={{
              marginBottom: -0.625,
              position: 'absolute',
              bottom: -90,
              right: '0',
              width: 400,
              maxWidth: '100%',
              animation: '5s wings ease-in-out infinite'
            }}
          >
            <Image src={mailImg} alt="Berry Dashboard" layout="intrinsic" width="400" height="270" />
          </Box>
        </Grid>
        <Grid item xs={10} sx={{ mb: -37.5 }}>
          <Card sx={{ mb: 6.25 }} elevation={4}>
            <CardContent sx={{ p: 4 }}>
              {user.role === 'admin' && <FormProfilAdmin />}
              {user.role === 'mahasiswa' && <FormProfilMahasiswa />}
              {user.role === 'dosen' && <FormProfilDosen />}
              {user.role === 'pusbang' && <FormProfilPusbang />}
              {user.role === 'analis' && <FormProfilAnalis />}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BiodataCard;
