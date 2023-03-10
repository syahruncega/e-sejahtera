// ==============================|| MENU ITEMS ||============================== //

import adminKemiskinan from './kemiskinan/admin';
import mainKemiskinan from './kemiskinan/main';
import masterKemiskinan from './kemiskinan/master';
import adminP3KE from './p3ke/admin';
import mainP3KE from './p3ke/main';

export const menuItemsP3KE = {
  items: [mainP3KE, adminP3KE]
};

export const menuItemsKemiskinan = {
  items: [mainKemiskinan, masterKemiskinan, adminKemiskinan]
};

export const menuItemsStunting = {
  items: [adminP3KE]
};
