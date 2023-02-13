import PropTypes from 'prop-types';
// material-ui
import { Box, FormControl, IconButton, MenuItem, Select, Typography } from '@mui/material';

import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import { useRouter } from 'next/router';

const AppTablePagination = ({ jumlahHalaman, totalData, pageSize, setPageSize, page, setPage }) => {
  const router = useRouter();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Typography>Data per page:</Typography>
      <FormControl sx={{ m: 1, minWidth: 75, mr: 4 }} size="small">
        <Select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
            router.replace({ pathname: router.pathname, query: { pageSize: Number(e.target.value) } }, undefined, {
              shallow: true
            });
          }}
          size="small"
        >
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
      <Typography>{`${page > 1 ? pageSize * (page - 1) + 1 : 1} - ${
        page === jumlahHalaman ? totalData : page * pageSize
      } / ${totalData} data`}</Typography>
      <IconButton
        onClick={() => {
          setPage(page - 1);
          //  router.replace({ pathname: router.pathname, query: { page: page - 1, pageSize } }, undefined, {
          //   shallow: true
          // });
        }}
        disabled={page === 1}
      >
        <IconChevronLeft size={18} />
      </IconButton>
      <IconButton
        onClick={() => {
          setPage(page + 1);
          //  router.replace({ pathname: router.pathname, query: { page: page + 1, pageSize } }, undefined, {
          //   shallow: true
          // });
        }}
        disabled={page === jumlahHalaman}
      >
        <IconChevronRight size={18} />
      </IconButton>
    </Box>
  );
};

AppTablePagination.propTypes = {
  setPageSize: PropTypes.func,
  pageSize: PropTypes.number,
  jumlahHalaman: PropTypes.number,
  totalData: PropTypes.number,
  page: PropTypes.number,
  setPage: PropTypes.func
};

export default AppTablePagination;
