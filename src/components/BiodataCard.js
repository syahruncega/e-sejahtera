import Image from 'next/image';
import React from 'react';
import Link from 'Link';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Box,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material';

// third-party
// import NumberFormat from 'react-number-format';

// project imports
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import FormProfilMahasiswa from './dashboard/Profil/FormProfilMahasiswa';

// assets
const mailImg = '/assets/images/img-contact-mail.svg';

// select options
const currencies = [
  {
    value: '1',
    label: 'Below $1000'
  },
  {
    value: '2',
    label: '$1000 - $5000'
  },
  {
    value: '3',
    label: 'Not specified'
  }
];

const sizes = [
  {
    value: '1',
    label: '1 - 5'
  },
  {
    value: '2',
    label: '5 - 10'
  },
  {
    value: '3',
    label: '10+'
  }
];

// ===========================|| CONTACT CARD - FORMS ||=========================== //

const BiodataCard = () => {
  const theme = useTheme();

  const [budget, setBudget] = React.useState(1);
  const handleChange = (event) => {
    setBudget(Number(event.target.value));
  };

  const [size, setSize] = React.useState(1);
  const handleChange1 = (event) => {
    setSize(Number(event.target.value));
  };

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
              <FormProfilMahasiswa />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BiodataCard;
