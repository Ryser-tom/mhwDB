// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app = new Framework7({
  root: '#app', // App root element
  id: 'net.tomryser.mhwdb', // App bundle ID
  name: 'MHW dataBase', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function() {
    return {};
  },
  // App root methods
  methods: {},
  // App routes
  routes: routes,

  panel: {
    swipe: 'left'
  }
});

// create searchbar
var searchbar = app.searchbar.create({
  el: '.searchbar',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});

// Init/Create main view
var mainView = app.views.create('.view-main');
