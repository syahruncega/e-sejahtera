// material-ui
import { Avatar, Button, Grid, Stack, TextField, Typography } from '@mui/material';

// project imports
import useAuth from 'hooks/useAuth';
import SubCard from 'components/ui-component/cards/SubCard';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// assets
const Avatar1 = '/assets/images/users/avatar-1.png';

// ==============================|| PROFILE 3 - PROFILE ||============================== //

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item sm={6} md={4}>
        <SubCard title="Foto Profil" contentSX={{ textAlign: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Avatar alt="User 1" src={Avatar1} sx={{ width: 100, height: 100, margin: '0 auto' }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" align="center">
                Upload/Ubah Foto Profil
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <AnimateButton>
                <Button variant="contained" size="small">
                  Upload Avatar
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
      <Grid item sm={6} md={8}>
        <SubCard title="Edit Detail Akun">
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <TextField id="outlined-basic1" fullWidth label="Nama Lengkat" defaultValue={user.name} helperText="Helper text" />
            </Grid>
            <Grid item xs={12}>
              <TextField id="outlined-basic6" fullWidth label="Email" defaultValue="name@example.com" />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField id="outlined-basic4" fullWidth label="Universitas" defaultValue="Universitas Tadulako" />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField id="outlined-basic5" fullWidth label="NIM/Stambuk" defaultValue="F55120" />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField id="outlined-basic7" fullWidth label="Nomor HP" defaultValue="4578-420-410 " />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField id="outlined-basic8" fullWidth label="Tanggal Lahir" defaultValue="31/01/2001" />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row">
                <AnimateButton>
                  <Button variant="contained">Ubah Detail</Button>
                </AnimateButton>
              </Stack>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
