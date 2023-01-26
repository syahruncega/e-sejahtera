import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import {
  Alert,
  AlertTitle,
  Box,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TableContainer,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'components/ui-component/cards/MainCard';

// assets
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import { deleteInstansi, getInstansi } from 'store/slices/instansi';
import FormInstansi from 'components/form/FormInstansi';
import DeleteDialog from 'components/dialog/DeleteDialog';
import { useMemo, useState } from 'react';
import AppTable from 'components/AppTable';
import useDebounce from 'hooks/useDebounce';
import { getBidangUrusan } from 'store/slices/bidang-urusan';

const TaggingDataPage = () => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  const pageProps = {
    title: 'Tagging Data',
    navigation: [{ title: <FormattedMessage id="tagging-data" defaultMessage="Tagging Data" />, url: '/dashboard/tagging-data' }]
  };

  // Error
  // if (fetchInstansi.isError) {
  //   return (
  //     <Page {...pageProps}>
  //       <Alert severity="error">
  //         <AlertTitle>Error</AlertTitle>
  //         {fetchInstansi.error.message}
  //       </Alert>
  //     </Page>
  //   );
  // }

  // Success
  return (
    <>
      <Page {...pageProps}>
        <MainCard content={false}>
          <Typography>Hmm</Typography>
        </MainCard>
      </Page>
    </>
  );
};

TaggingDataPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TaggingDataPage;
