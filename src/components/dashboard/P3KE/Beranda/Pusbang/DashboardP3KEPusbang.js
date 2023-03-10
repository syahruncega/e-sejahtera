import { Avatar, CardMedia, Grid, Typography, useTheme } from '@mui/material';
import MainCard from 'components/ui-component/cards/MainCard';
import ImagePlaceholder from 'components/ui-component/cards/Skeleton/ImagePlaceholder';
import useAuth from 'hooks/useAuth';
import useConfig from 'hooks/useConfig';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';

const User1 = '/assets/images/users/img-user.png';
const Cover = '/assets/images/welcome-back.png';

const DashboardP3KEPusbang = () => {
  const theme = useTheme();
  const { profil, user } = useAuth();
  const { borderRadius } = useConfig();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard
          contentSX={{
            p: 1.5,
            paddingBottom: '0px !important',
            [theme.breakpoints.down('lg')]: {
              textAlign: 'center'
            }
          }}
        >
          {isLoading ? (
            <ImagePlaceholder
              sx={{
                borderRadius: `${borderRadius}px`,
                overflow: 'hidden',
                mb: 3,
                height: { xs: 85, sm: 150, md: 260 }
              }}
            />
          ) : (
            <CardMedia sx={{ borderRadius: `${borderRadius}px`, overflow: 'hidden', mb: 3 }}>
              <Image
                alt="Welcome-back"
                src={Cover}
                quality={100}
                layout="responsive"
                width={1600}
                height={344}
                placeholder="blur"
                blurDataURL={Cover}
              />
            </CardMedia>
          )}
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={3}>
              {isLoading ? (
                <ImagePlaceholder
                  sx={{
                    justifyContent: 'flex-end',
                    [theme.breakpoints.down('lg')]: {
                      margin: '-70px auto 0'
                    },
                    [theme.breakpoints.down('md')]: {
                      margin: '-60px auto 0'
                    },
                    width: { xs: 72, sm: 100, md: 140 },
                    height: { xs: 72, sm: 100, md: 140 }
                  }}
                />
              ) : (
                <Avatar
                  alt="User 1"
                  src={User1}
                  sx={{
                    margin: '-70px 0 20px auto',
                    borderRadius: '16px',
                    [theme.breakpoints.down('lg')]: {
                      margin: '-70px auto 0'
                    },
                    [theme.breakpoints.down('md')]: {
                      margin: '-60px auto 0'
                    },
                    width: { xs: 72, sm: 100, md: 140 },
                    height: { xs: 72, sm: 100, md: 140 }
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={7}>
                  <Typography variant="h5">{profil?.namaLengkap}</Typography>
                  <Typography variant="subtitle2">{user?.role}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <></>
      </Grid>
    </Grid>
  );
};

export default DashboardP3KEPusbang;
