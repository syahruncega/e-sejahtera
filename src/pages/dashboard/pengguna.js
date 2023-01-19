// material-ui
import { Grid, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'components/ui-component/cards/MainCard';
import { FormattedMessage } from 'react-intl';
import SearchIcon from '@mui/icons-material/Search';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import { useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import FormPengguna from 'components/form/FormPengguna';

// ==============================|| SAMPLE PAGE ||============================== //

const PenggunaPage = () => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  return (
    <Page
      title="Pengguna"
      navigation={[
        {
          title: <FormattedMessage id="pengguna" defaultMessage="Pengguna" />,
          url: '/dashboard/pengguna'
        }
      ]}
    >
      <MainCard>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Instansi"
              value={search}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
            <Tooltip title="Copy">
              <IconButton size="large">
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print">
              <IconButton size="large">
                <PrintIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filter">
              <IconButton size="large">
                <FilterListIcon />
              </IconButton>
            </Tooltip>

            {/* product add & dialog */}
            <FormPengguna />
          </Grid>
        </Grid>
      </MainCard>
    </Page>
  );
};

PenggunaPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default PenggunaPage;
