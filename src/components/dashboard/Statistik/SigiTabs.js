import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SubCard from 'components/ui-component/cards/SubCard';
import WilayahChart from './WilayahChart';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

const dataKecamatan = [
  {
    title: 'Data P3KE Kecamatan Dolo',
    jumlahKelurga: '3661',
    jumlahIndividu: '14692',
    categories: [
      'Kabobona',
      'Karawana',
      'Kotapulu',
      'Kotarindau',
      'Langaleso',
      'Maku',
      'Panturabate',
      'Potoya',
      'Soulowe',
      'Tulo',
      'Watubula'
    ],
    initSeries: [
      {
        name: 'Keluarga',
        data: [319, 233, 131, 320, 409, 326, 154, 317, 508, 708, 236]
      },
      {
        name: 'Individu',
        data: [1396, 958, 565, 1430, 1558, 1266, 543, 1281, 1985, 2781, 919]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Dolo Barat',
    jumlahKelurga: '2031',
    jumlahIndividu: '8548',
    categories: [
      'Balamoa',
      'Balaroa Pewenu',
      'Balumpewa',
      'Bobo',
      'Kaleke',
      'Kaluku Tinggu',
      'Luku',
      'Mantikole',
      'Pesaku',
      'Pewunu',
      'Rarampadende',
      'Sibonu'
    ],
    initSeries: [
      {
        name: 'Keluarga',
        data: [118, 156, 117, 312, 301, 84, 98, 281, 214, 194, 252, 62]
      },
      {
        name: 'Individu',
        data: [481, 662, 439, 1393, 1324, 375, 391, 1057, 938, 847, 1032, 255]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Dolo Selatan',
    jumlahKelurga: '2599',
    jumlahIndividu: '10268',
    categories: ['Balongga', 'Baluase', 'Bangga', 'Bulubete', 'Jono', 'Poi', 'Pulu', 'Ramba', 'Rogo', 'Sambo', 'Walatana', 'Wisolo'],
    initSeries: [
      {
        name: 'Keluarga',
        data: [107, 472, 145, 246, 151, 194, 244, 124, 213, 213, 257, 233]
      },
      {
        name: 'Individu',
        data: [460, 1885, 592, 1049, 547, 700, 946, 497, 911, 848, 1052, 781]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Gumbasa',
    jumlahKelurga: '1737',
    jumlahIndividu: '6935',
    categories: ['Kalawara', 'Kalawara', 'Omu', 'Pakuli', 'Pakuli Utara', 'Pandere', 'Simoro', 'Tuwa'],
    initSeries: [
      {
        name: 'Keluarga',
        data: [151, 224, 289, 196, 455, 157, 265]
      },
      {
        name: 'Individu',
        data: [616, 947, 1219, 781, 1645, 650, 1077]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Kinovaro',
    jumlahKelurga: '1968',
    jumlahIndividu: '7308',
    categories: ['Balane', 'Bolobia', 'Daenggune', 'Doda', 'Kalora', 'Kanuna', 'Kayumpia', 'Porame', 'Rondingo', 'Uwemanje'],
    initSeries: [
      {
        name: 'Keluarga',
        data: [182, 64, 207, 261, 301, 231, 123, 224, 110, 265]
      },
      {
        name: 'Individu',
        data: [731, 232, 762, 954, 1156, 865, 372, 927, 373, 936]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Kulawi',
    jumlahKelurga: '2495',
    jumlahIndividu: '9957',
    categories: [
      'Banggaiba',

      'Boladangko',
      'Bolapapu',
      'Lonca',
      'Marena',
      'Mataue',
      'Namo',
      'Poleroa Makuhi',
      'Rantewulu',
      'Salua',
      'Siwongi',
      'Sungku',
      'Tangkulowi',
      'Toro',
      'Towulu',
      'Winatu'
    ],
    initSeries: [
      {
        name: 'Keluarga',
        data: [82, 116, 165, 96, 44, 43, 257, 124, 137, 277, 87, 236, 52, 382, 269, 128]
      },
      {
        name: 'Individu',
        data: [320, 421, 706, 404, 203, 184, 1024, 511, 472, 1093, 356, 922, 198, 1627, 998, 518]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Kulawi Selatan',
    jumlahKelurga: '1170',
    jumlahIndividu: '5065',
    categories: [
      'Gimpu',
      'Lawua',
      'Lempelero',
      'Moa',
      'O$O Parese',
      'Palamaki',
      'Pilimakujawa',
      'Salutome',
      'Tompi Bugis',
      'Tomua',
      'Wangka',
      'Watukilo'
    ],
    initSeries: [
      {
        name: 'Keluarga',
        data: [113, 140, 228, 92, 94, 31, 113, 86, 27, 117, 33, 96]
      },
      {
        name: 'Individu',
        data: [515, 592, 964, 401, 391, 134, 487, 384, 121, 505, 140, 431]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Lindu',
    jumlahKelurga: '819',
    jumlahIndividu: '3498',
    categories: ['Anca', 'Langko', 'Olu', 'Puroo', 'Tomado'],
    initSeries: [
      {
        name: 'Keluarga',
        data: [108, 122, 244, 135, 210]
      },
      {
        name: 'Individu',
        data: [473, 543, 1027, 563, 892]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Marawola',
    jumlahKelurga: '1953',
    jumlahIndividu: '8282',
    categories: [
      'Baliase',
      'Beka',
      'Binangga',
      'Bomba',
      'Boyabaliase',
      'Lebanu',
      'Padende',
      'Sibedi',
      'Sunju',
      'Tinggede',
      'Tinggede Selatan'
    ],
    initSeries: [
      {
        name: 'Keluarga',
        data: [149, 419, 242, 122, 102, 97, 136, 188, 139, 154, 205]
      },
      {
        name: 'Individu',
        data: [671, 1785, 1007, 501, 429, 345, 586, 751, 617, 723, 867]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Marawola Barat',
    jumlahKelurga: '1207',
    jumlahIndividu: '4308',
    categories: [
      'Dombu',
      'Lemosiranindi',
      'Lewara',
      'Matantimali',
      'Ongulero',
      'Panasibaja',
      'Soi',
      'Taipanggabe',
      'Wawujai',
      'Wayu',
      'Wiapore',
      'Wugaga'
    ],
    initSeries: [
      {
        name: 'Keluarga',
        data: [108, 119, 173, 97, 62, 113, 111, 45, 119, 64, 72, 124]
      },
      {
        name: 'Individu',
        data: [369, 483, 558, 306, 207, 376, 365, 152, 489, 224, 234, 545]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Nokilalaki',
    jumlahKelurga: '726',
    jumlahIndividu: '2979',
    categories: ['Bulili', 'Kadidia', 'Kamarora A', 'Kamarora B', 'Sopu'],
    initSeries: [
      {
        name: 'Keluarga',
        data: [207, 74, 210, 162, 73]
      },
      {
        name: 'Individu',
        data: [838, 282, 936, 610, 313]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Palolo',
    jumlahKelurga: '4610',
    jumlahIndividu: '18351',
    categories: [
      'Ampera',
      'Bahagia',
      'Bakubakulu',
      'Berdikari',
      'Bobo',
      'Bunga',
      'Kapirowe',
      'Karunia',
      'Lembantongoa',
      'Makmur',
      'Patimbe',
      'Rahmat',
      'Ranteleda',
      'Rejeki',
      'Sarumana',
      'Sejahtera',
      'Sigimpu',
      'Sintuwu',
      'Tanah Harapan',
      'Tongoa',
      'Ue Rani',
      'Uwe Nuni'
    ],
    initSeries: [
      {
        name: 'Keluarga',
        data: [126, 140, 237, 115, 312, 218, 159, 170, 365, 292, 209, 252, 148, 183, 94, 238, 163, 237, 99, 397, 91, 519]
      },
      {
        name: 'Individu',
        data: [534, 552, 923, 467, 1393, 850, 638, 700, 1456, 1209, 774, 991, 618, 752, 335, 1025, 604, 945, 395, 1605, 350, 1982]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Pipikoro',
    jumlahKelurga: '1729',
    jumlahIndividu: '6553',
    categories: [
      'Banasu',
      'Kalamanta',
      'Kantewu',
      'Kantewu Ii',
      'Koja',
      'Lawe',
      'Lonebasa',
      'Mamu',
      'Mapahi',
      'Masewo',
      'Morui',
      'Morui Ii',
      'Onu',
      'Peana',
      'Pelempea',
      'Poluroa',
      'Porelea',
      'Porelea Ii',
      'Tuwo Tanijaya'
    ],
    initSeries: [
      {
        name: 'Keluarga',
        data: [56, 75, 120, 68, 144, 83, 144, 73, 66, 49, 57, 66, 152, 140, 82, 61, 129, 115, 49]
      },
      {
        name: 'Individu',
        data: [216, 252, 433, 224, 629, 321, 601, 260, 244, 193, 226, 283, 553, 539, 264, 193, 518, 444, 160]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Sigi Biromaru',
    jumlahKelurga: '5491',
    jumlahIndividu: '21892',
    categories: [
      'Bora',
      'Jono Oge',
      'Kalukubula',
      'Lolu',
      'Loru',
      'Maranatha',
      'Mpanau',
      'Ngatabaru',
      'Olobuju',
      'Pombewe',
      'Sidera',
      'Sidondo I',
      'Sidondo Ii',
      'Sidondo Iii',
      'Sidondo Iv',
      'Watunonju'
    ],
    initSeries: [
      {
        name: 'Keluarga',
        data: [322, 197, 774, 583, 424, 529, 146, 247, 256, 385, 434, 488, 106, 221, 196, 183]
      },
      {
        name: 'Individu',
        data: [1373, 787, 3396, 2459, 1634, 1925, 670, 905, 941, 1512, 1710, 1771, 443, 831, 768, 767]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Tanambulava',
    jumlahKelurga: '1326',
    jumlahIndividu: '5232',
    categories: ['Lambara', 'Sibalaya Barat', 'Sibalaya Selatan', 'Sibalaya Utara', 'Sibowi'],
    initSeries: [
      {
        name: 'Keluarga',
        data: [213, 298, 108, 240, 467]
      },
      {
        name: 'Individu',
        data: [853, 1100, 435, 1010, 1834]
      }
    ]
  }
];

export default function SigiTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <SubCard>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 660 }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Dolo" {...a11yProps(0)} />
          <Tab label="Dolo Barat" {...a11yProps(1)} />
          <Tab label="Dolo Selatan" {...a11yProps(2)} />
          <Tab label="Gumbasa" {...a11yProps(3)} />
          <Tab label="Kinovaro" {...a11yProps(4)} />
          <Tab label="Kulawi" {...a11yProps(5)} />
          <Tab label="Kulawi Selatan" {...a11yProps(6)} />
          <Tab label="Lindu" {...a11yProps(7)} />
          <Tab label="Marawola" {...a11yProps(8)} />
          <Tab label="Marawola Barat" {...a11yProps(9)} />
          <Tab label="Nokilalaki" {...a11yProps(10)} />
          <Tab label="Palolo" {...a11yProps(11)} />
          <Tab label="Pipikoro" {...a11yProps(12)} />
          <Tab label="Sigi Biromaru" {...a11yProps(13)} />
          <Tab label="Tanambulava" {...a11yProps(14)} />
        </Tabs>
        {dataKecamatan.map((kecamatan, index) => (
          <TabPanel key={kecamatan.title} value={value} index={index}>
            <WilayahChart
              isLoading={isLoading}
              title={kecamatan.title}
              jumlahKelurga={kecamatan.jumlahKelurga}
              jumlahIndividu={kecamatan.jumlahIndividu}
              categories={kecamatan.categories}
              initSeries={kecamatan.initSeries}
            />
          </TabPanel>
        ))}
      </Box>
    </SubCard>
  );
}
