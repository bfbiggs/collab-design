require('dotenv').config()
const WP_URL = process.env.WP_URL || 'http://wp.collab-ui.dev.cc';

const config = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/collabui',
  PORT: process.env.PORT || 3300,
  WP_OAUTH_URL: `${WP_URL}?oauth=token`,
  WP_CONTENT_URL: `${WP_URL}/wp-json/wp/v2/pages`,
  WP_MENUS_URL: `${WP_URL}/wp-json/wp-api-menus/v2/menus/2`,
  VARIATIONS: ['core', 'react', 'angular', 'angularjs'],
};

export default config;
