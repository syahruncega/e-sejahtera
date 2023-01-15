// material-ui
import { Divider, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';

// assets
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

// ===========================|| DASHBOARD ANALYTICS - TOTAL REVENUE CARD ||=========================== //

const DaftarWilayah = () => {
  const successSX = { color: 'success.dark' };
  const errorSX = { color: 'error.main' };

  return (
    <MainCard title="Wilayah" content={false}>
      <PerfectScrollbar style={{ height: '560px' }}>
        <List
          component="nav"
          aria-label="main mailbox folders"
          sx={{
            '& svg': {
              width: 32,
              my: -0.75,
              ml: -0.75,
              mr: 0.75
            }
          }}
        >
          <ListItemButton>
            {/* <ListItemIcon>
              <ArrowDropUpIcon sx={successSX} />
            </ListItemIcon> */}
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Bitcoin</span>
                  {/* <Typography sx={successSX}>+ $145.85</Typography> */}
                </Stack>
              }
            />
          </ListItemButton>
          <Divider />
        </List>
      </PerfectScrollbar>
    </MainCard>
  );
};

export default DaftarWilayah;