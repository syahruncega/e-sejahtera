import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party

import dynamic from 'next/dynamic';

// project imports
import useConfig from 'hooks/useConfig';
import MainCard from 'components/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import SkeletonP3KEBarChart from 'components/ui-component/cards/Skeleton/SkeletonP3KEBarChart';
import { IconHome, IconUsers } from '@tabler/icons';
import Router from 'next/router';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const P3KEBarChart = () => {
  const [isLoading, setLoading] = useState(true);
  const [series, setSeries] = useState([]);

  const theme = useTheme();
  const { navType, rtlLayout } = useConfig();

  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;

  const [options, setOptions] = useState({});

  useEffect(() => {
    setSeries([
      {
        name: 'Keluarga',
        data: [29995, 44656, 27029, 46034, 25503, 22722, 17756, 20995, 73611, 29951, 33522, 12011, 20155]
      },
      {
        name: 'Individu',
        data: [124634, 182756, 112209, 193999, 107660, 98341, 72158, 80607, 288129, 114613, 133868, 46496, 80419]
      }
    ]);
    setOptions(() => ({
      chart: {
        height: 480,
        type: 'bar',
        id: 'bar-chart',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        },
        events: {
          xAxisLabelClick: (val) => {
            if (val.target.textContent === 'Donggala') Router.push('/dashboard/stats/donggala');
            else if (val.target.textContent === 'Sigi') Router.push('/dashboard/stats/sigi');
          }
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      legend: {
        show: true,
        fontFamily: `'Roboto', sans-serif`,
        position: 'bottom',
        offsetX: 20,
        labels: {
          useSeriesColors: false,
          colors: grey500
        },
        markers: {
          width: 16,
          height: 16,
          radius: 5
        },
        itemMargin: {
          horizontal: 15,
          vertical: 8
        }
      },
      colors: [secondaryMain, primaryDark, secondaryMain, secondaryLight],
      xaxis: {
        type: 'category',
        categories: [
          'Kota Palu',
          'Banggai',
          'Poso',
          'Donggala',
          'Tolitoli',
          'Buol',
          'Morowali',
          'Banggai Kepulauan',
          'Parigi Moutong',
          'Tojo Una-Una',
          'Sigi',
          'Banggai Laut',
          'Morowali Utara'
        ]
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary],
            cssClass: 'apexcharts-xaxis-label'
          }
        }
      },
      grid: {
        show: true,
        borderColor: navType === 'dark' ? darkLight + 20 : grey200
      },
      tooltip: {
        theme: navType === 'dark' ? 'dark' : 'light'
      },

      fill: {
        type: 'solid'
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%'
        }
      }
    }));
    setLoading(false);
  }, [navType, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, grey500]);

  return (
    <>
      {isLoading ? (
        <SkeletonP3KEBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Data P3KE Sulawesi Tengah</Typography>
                    </Grid>
                    <Grid item>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                          sx={{
                            width: 40,
                            height: 40,
                            color: theme.palette.secondary.main,
                            borderRadius: '12px',
                            padding: 1,
                            backgroundColor:
                              theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.secondary.light
                          }}
                        >
                          <IconHome stroke={2} />
                        </Typography>

                        <Typography ml={1} mr={4} variant="h3">
                          378.915
                        </Typography>
                        <Typography
                          sx={{
                            width: 40,
                            height: 40,
                            color: theme.palette.primary.main,
                            borderRadius: '12px',
                            padding: 1,
                            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary.light
                          }}
                        >
                          <IconUsers stroke={2} />
                        </Typography>
                        <Typography ml={1} variant="h3">
                          1.635.889
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                // backgroundColor: 'yellow',
                // '& .apexcharts-legend-text': { marginLeft: rtlLayout ? '8px' : 'initial' },
                '.apexcharts-xaxis-label': { cursor: 'pointer' }
              }}
            >
              <ReactApexChart options={options} series={series} type="bar" height={480} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

P3KEBarChart.propTypes = {};

export default P3KEBarChart;
