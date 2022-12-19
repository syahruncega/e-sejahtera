import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Alert,
  AlertTitle,
  CardContent,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'components/ui-component/cards/MainCard';
import { getLokasi } from 'store/slices/lokasi';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import { SyncOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import FormProgram from 'components/form/FormProgram';
import { useRouter } from 'next/router';

// table sort
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) =>
  order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// table header options
const headCells = [
  {
    id: 'kabupatenKota',
    numeric: false,
    label: 'Kabupaten / Kota',
    align: 'left'
  },
  {
    id: 'kecamatan',
    numeric: false,
    label: 'Kecamatan',
    align: 'left'
  },
  {
    id: 'desaKelurahan',
    numeric: false,
    label: 'Desa / Kelurahan',
    align: 'left'
  }
];

// ==============================|| TABLE HEADER TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected }) => (
  <Toolbar
    sx={{
      p: 0,
      pl: 2,
      pr: 1,
      color: numSelected > 0 ? 'secondary.main' : 'inherit'
    }}
  >
    {numSelected > 0 ? (
      <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="h4" component="div">
        {numSelected} Selected
      </Typography>
    ) : (
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        Nutrition
      </Typography>
    )}

    {numSelected > 0 && (
      <Tooltip title="Delete">
        <IconButton size="large">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}
  </Toolbar>
);

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

// ==============================|| TABLE HEADER ||============================== //

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, theme, selected }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ pl: 3 }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {numSelected > 0 && (
          <TableCell padding="none" colSpan={7}>
            <EnhancedTableToolbar numSelected={selected.length} />
          </TableCell>
        )}
        {numSelected <= 0 &&
          headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.align}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Typography component="span" sx={{ display: 'none' }}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Typography>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        {numSelected <= 0 && (
          <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900' }}>
              Aksi
            </Typography>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  theme: PropTypes.object,
  selected: PropTypes.array,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

// ==============================|| PRODUCT LIST ||============================== //

const LokasiDetailSubKegiatanPage = () => {
  const theme = useTheme();

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState('');
  const [filteredData, setFilteredData] = React.useState([]);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const { isLoading, isError, data: lokasi, error } = useQuery(['lokasi'], () => getLokasi(router.query));

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (event) => {
    const newString = event.target.value;
    setSearch(newString || '');

    if (newString) {
      const newRows = lokasi.filter((row) => {
        let matches = true;

        const properties = ['kabupaten', 'indikator_kinerja_lokasi'];
        let containsQuery = false;

        properties.forEach((property) => {
          if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
            containsQuery = true;
          }
        });

        if (!containsQuery) {
          matches = false;
        }
        return matches;
      });
      setFilteredData(newRows);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedId = lokasi.map((n) => n.name);
      setSelected(newSelectedId);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    if (event.target.value) setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lokasi.length) : 0;

  return (
    <Page
      title="Lokasi"
      navigation={[
        {
          title: <FormattedMessage id="subKegiatan" defaultMessage="Sub Kegiatan" />,
          url: '/dashboard/sub-kegiatan'
        },
        {
          title: <FormattedMessage id="detailsubKegiatan" defaultMessage="Detail Sub Kegiatan" />,
          url: `/dashboard/sub-kegiatan/detail?sub_kegiatanId=${isLoading ? '' : lokasi[0].detail_sub_kegiatan.sub_kegiatanId}`
        },
        {
          title: <FormattedMessage id="lokasiDetailSubKegiatan" defaultMessage="Lokasi" />,
          url: router.asPath
        }
      ]}
    >
      <MainCard content={false}>
        <Alert severity="info" color="secondary" variant="outlined" sx={{ borderColor: 'secondary.main', marginX: 4, marginTop: 2 }}>
          <AlertTitle>Sub Kegiatan:</AlertTitle>
          kfjsdfls
        </Alert>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
                onChange={handleSearch}
                placeholder="Cari Program"
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
              <FormProgram />
            </Grid>
          </Grid>
        </CardContent>

        {/* table */}
        {isLoading ? (
          <>Loading</>
        ) : (
          <>
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={search ? filteredData.length : lokasi.length}
                  theme={theme}
                  selected={selected}
                />
                <TableBody>
                  {stableSort(search ? filteredData : lokasi, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      if (typeof row === 'number') return null;
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={index} selected={isItemSelected}>
                          <TableCell padding="checkbox" sx={{ pl: 3 }} onClick={(event) => handleClick(event, row.id)}>
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId
                              }}
                            />
                          </TableCell>
                          <TableCell component="th" id={labelId} scope="row" sx={{ cursor: 'pointer' }}>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900',
                                textDecoration: 'none'
                              }}
                            >
                              {row.kota_kabupaten.nama}
                            </Typography>
                          </TableCell>
                          <TableCell>{row.kecamatan.nama}</TableCell>
                          <TableCell>{row.kelurahan.nama}</TableCell>
                          <TableCell align="center" sx={{ pr: 3 }}>
                            <Box sx={{ display: 'flex' }}>
                              <Tooltip title="Update Pagu">
                                <IconButton onClick={() => {}} size="medium">
                                  <SyncOutlined
                                    fontSize="small"
                                    aria-controls="menu-popular-card-1"
                                    aria-haspopup="true"
                                    sx={{ color: 'grey.500' }}
                                  />
                                </IconButton>
                              </Tooltip>
                              <>
                                <IconButton onClick={handleMenuClick} size="medium">
                                  <MoreHorizOutlinedIcon
                                    fontSize="small"
                                    aria-controls="menu-popular-card-1"
                                    aria-haspopup="true"
                                    sx={{ color: 'grey.500' }}
                                  />
                                </IconButton>
                                <Menu
                                  id="menu-popular-card-1"
                                  anchorEl={anchorEl}
                                  keepMounted
                                  open={Boolean(anchorEl)}
                                  onClose={handleClose}
                                  variant="selectedMenu"
                                  anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                  }}
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                  }}
                                  sx={{
                                    '& .MuiMenu-paper': {
                                      boxShadow: theme.customShadows.z1
                                    }
                                  }}
                                >
                                  <FormProgram isEdit lokasi={row} />
                                  <MenuItem onClick={handleClose}> Hapus</MenuItem>
                                </Menu>
                              </>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* table pagination */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={search ? filteredData.length : lokasi.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </MainCard>
    </Page>
  );
};

LokasiDetailSubKegiatanPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default LokasiDetailSubKegiatanPage;
