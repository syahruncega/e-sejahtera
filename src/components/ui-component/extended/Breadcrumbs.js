import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Link from 'Link';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

// project imports
import { BASE_PATH } from 'config';
import { gridSpacing } from 'store/constant';

// assets
import { IconTallymark1 } from '@tabler/icons';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

const linkSX = {
  display: 'flex',
  color: 'grey.900',
  textDecoration: 'none',
  alignContent: 'center',
  alignItems: 'center'
};

// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbs = ({ card, divider, icon, icons, maxItems, navigation, rightAlign, separator, title, titleBottom, ...others }) => {
  const theme = useTheme();

  const iconStyle = {
    marginRight: theme.spacing(0.75),
    marginTop: `-${theme.spacing(0.25)}`,
    width: '16px',
    height: '16px',
    color: theme.palette.secondary.main
  };

  // item separator
  const SeparatorIcon = separator;
  const separatorIcon = separator ? <SeparatorIcon stroke={1.5} size="16px" /> : <IconTallymark1 stroke={1.5} size="16px" />;

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;

  breadcrumbContent = (
    <Card
      sx={{
        marginBottom: card === false ? 0 : theme.spacing(gridSpacing),
        border: card === false ? 'none' : '1px solid',
        borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75,
        background: card === false ? 'transparent' : theme.palette.background.default
      }}
      {...others}
    >
      <Box sx={{ p: 2, pl: card === false ? 0 : 2 }}>
        <Grid
          container
          direction={rightAlign ? 'row' : 'column'}
          justifyContent={rightAlign ? 'space-between' : 'flex-start'}
          alignItems={rightAlign ? 'center' : 'flex-start'}
          spacing={1}
        >
          {title && !titleBottom && (
            <Grid item>
              <Typography variant="h3" sx={{ fontWeight: 500 }}>
                {title}
              </Typography>
            </Grid>
          )}
          <Grid item>
            <MuiBreadcrumbs
              sx={{ '& .MuiBreadcrumbs-separator': { width: 16, ml: 1.25, mr: 1.25 } }}
              aria-label="breadcrumb"
              maxItems={maxItems || 8}
              separator={separatorIcon}
            >
              <Typography component={Link} href="/dashboard" color="inherit" variant="subtitle1" sx={linkSX}>
                {icons && <HomeTwoToneIcon sx={iconStyle} />}
                {icon && <HomeIcon sx={{ ...iconStyle, mr: 0 }} />}
                {!icon && 'Dashboard'}
              </Typography>
              {navigation.map((val) => (
                <Typography key={val.title} component={Link} href={val.url} variant="subtitle1" sx={linkSX}>
                  {val.title}
                </Typography>
              ))}
            </MuiBreadcrumbs>
          </Grid>
          {title && titleBottom && (
            <Grid item>
              <Typography variant="h3" sx={{ fontWeight: 500 }}>
                {title}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
      {card === false && divider !== false && <Divider sx={{ borderColor: theme.palette.primary.main, mb: gridSpacing }} />}
    </Card>
  );

  return breadcrumbContent;
};

Breadcrumbs.propTypes = {
  card: PropTypes.bool,
  divider: PropTypes.bool,
  icon: PropTypes.bool,
  icons: PropTypes.bool,
  maxItems: PropTypes.number,
  navigation: PropTypes.array,
  rightAlign: PropTypes.bool,
  separator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  title: PropTypes.string,
  titleBottom: PropTypes.bool
};

export default Breadcrumbs;
