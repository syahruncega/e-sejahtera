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
    title: 'Data P3KE Kecamatan Balaesang',
    jumlahKelurga: '3900',
    jumlahIndividu: '16762',
    categories: [
      'Labean',
      'Lombonga',
      'Malino',
      'Mapane Tambu',
      'Meli',
      'Sibayu',
      'Sibualong',
      'Simagaya',
      'Sipure',
      'Siweli',
      'Tambu',
      'Tovia Tambu',
      'Kampung Baru Sibayu'
    ],
    initSeries: [
      {
        name: 'Keluarga',
        data: [186, 526, 387, 480, 185, 341, 282, 195, 286, 182, 477, 202, 402]
      },
      {
        name: 'Individu',
        data: [817, 2379, 1693, 1891, 843, 1421, 1203, 828, 1142, 725, 2011, 1004, 1669]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Balaesang Tanjung',
    jumlahKelurga: '2475',
    jumlahIndividu: '10179',
    categories: ['Kamonji', 'Ketong', 'Malei', 'Manimbaya', 'Palau', 'Pomolulu', 'Rano', 'Walandano'],
    initSeries: [
      {
        name: 'Keluarga',
        data: [276, 408, 396, 268, 218, 369, 322, 218]
      },
      {
        name: 'Individu',
        data: [1019, 1592, 1640, 1107, 944, 1641, 1302, 934]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Banawa',
    jumlahKelurga: '3937',
    jumlahIndividu: '17652',
    categories: [
      'Boneoge',
      'Boya',
      'Ganti',
      'Gunung Bale',
      'Kabonga Besar',
      'Kabonga Kecil',
      'Labuan Bajo',
      'Loli Dondo',
      'Loli Oge',
      'Loli Pesua',
      'Loli Saluran',
      'Loli Tasiburi',
      'Maleni',
      'Tanjung Batu'
    ],
    initSeries: [
      {
        name: 'Keluarga',
        data: [375, 124, 680, 167, 495, 192, 137, 184, 389, 345, 192, 387, 227, 43]
      },
      {
        name: 'Individu',
        data: [1742, 619, 3025, 810, 2144, 939, 683, 807, 1580, 1491, 857, 1623, 1084, 248]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Banawa Selatan',
    jumlahKelurga: '4420',
    jumlahIndividu: '18144',
    categories: [
      'Bambarimi',
      'Lalombi',
      'Lembasada',
      'Lumbu Tarombo',
      'Lumbulama',
      'Lumbumamara',
      'Malino',
      'Mbuwu',
      'Ongulara',
      'Salumpaku',
      'Salungkaenu',
      'Salusumpu',
      'Sarombaya',
      'Surumana',
      'Tanamea',
      'Tanampulu',
      'Tolongano',
      'Tosale',
      'Watatu'
    ],
    initSeries: [
      {
        name: 'Keluarga',
        data: [119, 387, 109, 174, 218, 315, 480, 280, 167, 184, 191, 149, 219, 268, 183, 152, 278, 406, 390]
      },
      {
        name: 'Individu',
        data: [523, 1626, 527, 764, 764, 1254, 1891, 1135, 661, 716, 730, 647, 781, 1131, 816, 654, 1142, 1679, 1730]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Banawa Tengah',
    jumlahKelurga: '2147',
    jumlahIndividu: '8886',
    categories: ['Kola-Kola', 'Lampo', 'Limboro', 'Lumbudolo', 'Mekar Baru', 'Powelua', 'Salubomba', 'Towale'],
    initSeries: [
      {
        name: 'Keluarga',
        data: [287, 202, 351, 131, 111, 438, 269, 358]
      },
      {
        name: 'Individu',
        data: [1123, 792, 1478, 572, 464, 1699, 1176, 1582]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Dampelas',
    jumlahKelurga: '4521',
    jumlahIndividu: '19147',
    categories: [
      'Budi Mukti',
      'Kambayang',
      'Karya Mukti',
      'Lembah Mukti',
      'Long',
      'Malonas',
      'Pani$I',
      'Parisan Agung',
      'Ponggerang',
      'Rerang',
      'Sabang',
      'Sioyong',
      'Talaga'
    ],
    initSeries: [
      {
        name: 'Keluarga',
        data: [377, 169, 417, 335, 162, 498, 369, 266, 427, 494, 170, 489, 348]
      },
      {
        name: 'Individu',
        data: [1415, 716, 1772, 1353, 683, 2112, 1551, 1094, 1767, 2111, 735, 2200, 1638]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Labuan',
    jumlahKelurga: '2467',
    jumlahIndividu: '10438',
    categories: ['Labuan', 'Labuan Kungguma', 'Labuan Lelea', 'Labuan Lumbubaka', 'Labuan Panimba', 'Labuan Salumbone', 'Labuan Toposo'],
    initSeries: [
      {
        name: 'Keluarga',
        data: [367, 277, 284, 122, 504, 350, 563]
      },
      {
        name: 'Individu',
        data: [1656, 1114, 1276, 468, 2203, 1473, 2248]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Pinembani',
    jumlahKelurga: '1035',
    jumlahIndividu: '4180',
    categories: ['Palintuma', 'Gimpubia', 'Dangara$A', 'Bambakanini', 'Bambakaenu', 'Tomodo', 'Kanagalongga', 'Karavia', 'Tavanggeli'],
    initSeries: [
      {
        name: 'Keluarga',
        data: [265, 146, 56, 91, 52, 118, 135, 104, 68]
      },
      {
        name: 'Individu',
        data: [1060, 565, 246, 373, 257, 504, 507, 436, 232]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Rio Pakava',
    jumlahKelurga: '3064',
    jumlahIndividu: '12413',
    categories: [
      'Bonemarawa',
      'Bukit Indah',
      'Lalundu',
      'Mbulawa',
      'Minti Makmur',
      'Ngovi',
      'Pakava',
      'Panca Mukti',
      'Pantolobete',
      'Polando Jaya',
      'Polanto Jaya',
      'Rio Mukti',
      'Tinauka',
      'Towiora'
    ],
    initSeries: [
      {
        name: 'Keluarga',
        data: [278, 177, 426, 141, 105, 216, 357, 139, 28, 171, 83, 306, 316, 214]
      },
      {
        name: 'Individu',
        data: [1041, 675, 1711, 579, 491, 873, 1397, 584, 580, 656, 399, 1237, 1245, 954]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Sindue',
    jumlahKelurga: '3334',
    jumlahIndividu: '14125',
    categories: [
      'Ape Maliko',
      'Dalaka',
      'Enu',
      'Gumbasa',
      'Kavaya',
      'Lero',
      'Lero Tatari',
      'Marana',
      'Masaingi',
      'Sumari',
      'Taripa',
      'Toaya',
      'Toaya Vunta'
    ],
    initSeries: [
      {
        name: 'Keluarga',
        data: [154, 273, 360, 185, 265, 397, 328, 219, 191, 175, 94, 401, 292]
      },
      {
        name: 'Individu',
        data: [600, 1143, 1526, 745, 1013, 1675, 1378, 874, 792, 794, 366, 1848, 1371]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Sindue Tobata',
    jumlahKelurga: '1779',
    jumlahIndividu: '7825',
    categories: ['Alindau', 'Oti', 'Sikara Tobata', 'Sindosa', 'Sipeso', 'Tamarenja'],
    initSeries: [
      {
        name: 'Keluarga',
        data: [488, 476, 355, 116, 128, 216]
      },
      {
        name: 'Individu',
        data: [2276, 2074, 1510, 459, 595, 911]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Sindue Tombusabora',
    jumlahKelurga: '2414',
    jumlahIndividu: '10191',
    categories: ['Batusuya', 'Batusuya Go$O', 'Kaliburu', 'Kaliburu Kata', 'Saloya', 'Tibo'],
    initSeries: [
      {
        name: 'Keluarga',
        data: [501, 259, 383, 149, 491, 631]
      },
      {
        name: 'Individu',
        data: [2233, 1170, 1470, 667, 1969, 2682]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Sirenja',
    jumlahKelurga: '3625',
    jumlahIndividu: '15641',
    categories: [
      'Balintuma',
      'Dampal',
      'Jonooge',
      'Lende',
      'Lende Tovea',
      'Lompio',
      'Ombo',
      'Sibado',
      'Sipi',
      'Tanjung Padang',
      'Tompe',
      'Tondo',
      'Ujumbou'
    ],
    initSeries: [
      {
        name: 'Keluarga',
        data: [178, 123, 138, 270, 335, 230, 154, 418, 479, 314, 344, 247, 395]
      },
      {
        name: 'Individu',
        data: [801, 533, 617, 1140, 1355, 953, 660, 1899, 1916, 1399, 1502, 1140, 1726]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Sojol',
    jumlahKelurga: '3389',
    jumlahIndividu: '13770',
    categories: ['Balukang', 'Balukang Ii', 'Bou', 'Bukit Harapan', 'Pangalasiang', 'Samalili', 'Siboang', 'Siwalempu', 'Tonggolobibi'],
    initSeries: [
      {
        name: 'Keluarga',
        data: [453, 369, 503, 122, 368, 364, 377, 406, 427]
      },
      {
        name: 'Individu',
        data: [1838, 1623, 2131, 474, 1434, 1479, 1459, 1741, 1591]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Sojol Utara',
    jumlahKelurga: '1184',
    jumlahIndividu: '4984',
    categories: ['Bengkoli', 'Lenju', 'Ogoamas I', 'Ogoamas Ii', 'Pesik'],
    initSeries: [
      {
        name: 'Keluarga',
        data: [176, 221, 318, 333, 140]
      },
      {
        name: 'Individu',
        data: [692, 881, 1356, 1430, 625]
      }
    ]
  },
  {
    title: 'Data P3KE Kecamatan Tanantovea',
    jumlahKelurga: '2330',
    jumlahIndividu: '9653',
    categories: [
      'Bale',
      'Guntarano',
      'Nupa Bomba',
      'Wani Dua',
      'Wani Lumbumpetigo',
      'Wani Satu',
      'Wani Tiga',
      'Wombo',
      'Wombo Kalonggo',
      'Wombo Mpanau'
    ],
    initSeries: [
      {
        name: 'Keluarga',
        data: [269, 327, 533, 155, 267, 119, 87, 235, 107, 231]
      },
      {
        name: 'Individu',
        data: [1083, 1256, 2234, 801, 1097, 580, 353, 893, 448, 908]
      }
    ]
  }
];

export default function DonggalaTabs() {
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
          <Tab label="Balaesang" {...a11yProps(0)} />
          <Tab label="Balaesang Tanjung" {...a11yProps(1)} />
          <Tab label="Banawa" {...a11yProps(2)} />
          <Tab label="Banawa Selatan" {...a11yProps(3)} />
          <Tab label="Banawa Tengah" {...a11yProps(4)} />
          <Tab label="Dampelas" {...a11yProps(5)} />
          <Tab label="Labuan" {...a11yProps(6)} />
          <Tab label="Pinembani" {...a11yProps(7)} />
          <Tab label="Rio Pakava" {...a11yProps(8)} />
          <Tab label="Sindue" {...a11yProps(9)} />
          <Tab label="Sindue Tobata" {...a11yProps(10)} />
          <Tab label="Sindue Tombusabora" {...a11yProps(11)} />
          <Tab label="Sirenja" {...a11yProps(12)} />
          <Tab label="Sojol" {...a11yProps(13)} />
          <Tab label="Sojol Utara" {...a11yProps(14)} />
          <Tab label="Tanantovea" {...a11yProps(15)} />
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
