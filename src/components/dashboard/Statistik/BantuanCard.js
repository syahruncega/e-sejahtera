// material-ui
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import SubCard from 'components/ui-component/cards/SubCard';

// table data
const createData = (kecamatan, bpnt, bpum, bst, pkh, sembako, colorClass = '') => ({
  kecamatan,
  bpnt,
  bpum,
  bst,
  pkh,
  sembako,
  colorClass
});

const rows = [createData('Balaesang', '3', '4', '7', '2', '1'), createData('Balaesang Tanjung', '7', '2', '4', '8', '3')];

// ===========================|| DATA WIDGET - PRODUCT SALES CARD ||=========================== //

const BantuanCard = () => (
  <SubCard title="Jumlah Penerima Bantuan" content={false}>
    <Grid sx={{ p: 2.5 }} container direction="row" justifyContent="space-around" alignItems="center">
      <Grid item>
        <Grid container direction="column" spacing={1} alignItems="center" justifyContent="center">
          <Grid item>
            <Typography component="div" variant="subtitle2">
              BPNT
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="div" variant="h3">
              20
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={1} alignItems="center" justifyContent="center">
          <Grid item>
            <Typography component="div" variant="subtitle2">
              BPUM
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="div" variant="h3">
              40
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={1} alignItems="center" justifyContent="center">
          <Grid item>
            <Typography component="div" variant="subtitle2">
              BST
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="div" variant="h3">
              50
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={1} alignItems="center" justifyContent="center">
          <Grid item>
            <Typography component="div" variant="subtitle2">
              PKH
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="div" variant="h3">
              60
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={1} alignItems="center" justifyContent="center">
          <Grid item>
            <Typography component="div" variant="subtitle2">
              Sembako
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="div" variant="h3">
              70
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <PerfectScrollbar style={{ padding: 0 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>Kecamatan</TableCell>
              <TableCell align="right" sx={{ pr: 3 }}>
                BPNT
              </TableCell>
              <TableCell align="right" sx={{ pr: 3 }}>
                BPUM
              </TableCell>
              <TableCell align="right" sx={{ pr: 3 }}>
                BST
              </TableCell>
              <TableCell align="right" sx={{ pr: 3 }}>
                PKH
              </TableCell>
              <TableCell align="right" sx={{ pr: 3 }}>
                Sembako
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell sx={{ pl: 3 }}>
                  <span className={row.colorClass}>{row.kecamatan}</span>
                </TableCell>
                <TableCell align="right" sx={{ pr: 3 }}>
                  <span>{row.bpnt}</span>
                </TableCell>
                <TableCell align="right" sx={{ pr: 3 }}>
                  <span>{row.bpum}</span>
                </TableCell>
                <TableCell align="right" sx={{ pr: 3 }}>
                  <span>{row.bst}</span>
                </TableCell>
                <TableCell align="right" sx={{ pr: 3 }}>
                  <span>{row.pkh}</span>
                </TableCell>
                <TableCell align="right" sx={{ pr: 3 }}>
                  <span>{row.sembako}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PerfectScrollbar>
  </SubCard>
);

export default BantuanCard;
