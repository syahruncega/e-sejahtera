// material-ui
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import SubCard from 'components/ui-component/cards/SubCard';

// table data
const createData = (kecamatan, desil1, desil2, desil3, desil4, desil5, colorClass = '') => ({
  kecamatan,
  desil1,
  desil2,
  desil3,
  desil4,
  desil5,
  colorClass
});

const rows = [createData('Balaesang', '3', '4', '7', '2', '1'), createData('Balaesang Tanjung', '7', '2', '4', '8', '3')];

// ===========================|| DATA WIDGET - PRODUCT SALES CARD ||=========================== //

const DesilCard = () => (
  <SubCard title="Desil Kesejahteraan" content={false}>
    <Grid sx={{ p: 2.5 }} container direction="row" justifyContent="space-around" alignItems="center">
      <Grid item>
        <Grid container direction="column" spacing={1} alignItems="center" justifyContent="center">
          <Grid item>
            <Typography component="div" variant="subtitle2">
              Desil 1
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
              Desil 2
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
              Desil 3
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
              Desil 4
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
              Desil 5
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
                Desil 1
              </TableCell>
              <TableCell align="right" sx={{ pr: 3 }}>
                Desil 2
              </TableCell>
              <TableCell align="right" sx={{ pr: 3 }}>
                Desil 3
              </TableCell>
              <TableCell align="right" sx={{ pr: 3 }}>
                Desil 4
              </TableCell>
              <TableCell align="right" sx={{ pr: 3 }}>
                Desil 5
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
                  <span>{row.desil1}</span>
                </TableCell>
                <TableCell align="right" sx={{ pr: 3 }}>
                  <span>{row.desil2}</span>
                </TableCell>
                <TableCell align="right" sx={{ pr: 3 }}>
                  <span>{row.desil3}</span>
                </TableCell>
                <TableCell align="right" sx={{ pr: 3 }}>
                  <span>{row.desil4}</span>
                </TableCell>
                <TableCell align="right" sx={{ pr: 3 }}>
                  <span>{row.desil5}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PerfectScrollbar>
  </SubCard>
);

export default DesilCard;
