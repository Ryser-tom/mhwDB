routes = [
  {
    path: '/',
    templateUrl: './index.html',
    on: {
      pageAfterIn: () => {
        getListArmor();
      }
    }
  },
  {
    path: '/weapons/',
    templateUrl: './pages/weapons.html',
    on: {
      pageAfterIn: () => {
        getListWeapon();
      }
    }
  },
  {
    path: '/items/',
    templateUrl: './pages/items.html',
    on: {
      pageAfterIn: () => {
        getListItem();
      }
    }
  },
  {
    name: 'armor',
    path: '/armor/:armorId',
    templateUrl: './pages/armor.html',
    on: {
      pageInit: (e, page) => {
        const armorId = page.route.params.armorId;
        if (armorId != null) {
          displayArmor(armorId);
        }
      }
    }
  },
  {
    name: 'weapon',
    path: '/weapon/:weaponId',
    templateUrl: './pages/weapon.html',
    on: {
      pageInit: (e, page) => {
        const weaponId = page.route.params.weaponId;
        if (weaponId != null) {
          displayWeapon(weaponId);
        }
      }
    }
  },
  {
    name: 'item',
    path: '/item/:itemId',
    templateUrl: './pages/item.html',
    on: {
      pageInit: (e, page) => {
        const itemId = page.route.params.itemId;
        if (itemId != null) {
          displayItem(itemId);
        }
      }
    }
  }
];
