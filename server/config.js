require('dotenv').config();
const WP_URL = process.env.WP_URL || 'https://collabuiwp.wpengine.com';

const config = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/collabui',
  PORT: process.env.PORT || 3300,
  WP_URL: WP_URL,
  WP_OAUTH_URL: `${WP_URL}/?oauth=token`,
  WP_CONTENT_URL: `${WP_URL}/wp-json/wp/v2/pages`,
  WP_MENUS_URL: `${WP_URL}/wp-json/wp-api-menus/v2/menus/2`,
  WP_FORMS_URL: `${WP_URL}/wp-json/gf/v2`,
  VARIATIONS: ['core', 'react', 'angular', 'angularjs'],
  WP_CLIENT_ID: process.env.WP_CLIENT_ID,
  WP_CLIENT_SECRET: process.env.WP_CLIENT_SECRET,

};

export default config;
