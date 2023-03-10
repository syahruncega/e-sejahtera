import { memo, useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Typography, useMediaQuery } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import { LAYOUT_CONST } from 'constant';
import { HORIZONTAL_MAX_ITEM } from 'config';
import useConfig from 'hooks/useConfig';
import { useRouter } from 'next/router';
import { menuItemsKemiskinan, menuItemsP3KE, menuItemsStunting } from 'menu-items';
import useAuth from 'hooks/useAuth';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuth();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const menuToShow = useMemo(() => {
    if (router.pathname.startsWith('/kemiskinan')) {
      return menuItemsKemiskinan;
    }
    if (router.pathname.startsWith('/p3ke')) {
      return menuItemsP3KE;
    }
    return menuItemsStunting;
  }, [router.pathname]);

  const { layout } = useConfig();

  // last menu-item to show in horizontal menu bar
  const lastItem = layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd ? HORIZONTAL_MAX_ITEM : null;

  let lastItemIndex = menuToShow.items.length - 1;
  let remItems = [];
  let lastItemId;

  if (lastItem && lastItem < menuToShow.items.length) {
    lastItemId = menuToShow.items[lastItem - 1].id;
    lastItemIndex = lastItem - 1;
    remItems = menuToShow.items.slice(lastItem - 1, menuToShow.items.length).map((item) => ({
      title: item.title,
      elements: item.children
    }));
  }

  const navItems = menuToShow.items.slice(0, lastItemIndex + 1).map((item) => {
    switch (item.type) {
      case 'group':
        if (!item.roles) {
          return <NavGroup key={item.id} item={item} lastItem={lastItem} remItems={remItems} lastItemId={lastItemId} />;
        }
        if (item.roles?.includes(user.role)) {
          return <NavGroup key={item.id} item={item} lastItem={lastItem} remItems={remItems} lastItemId={lastItemId} />;
        }
        return null;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default memo(MenuList);
