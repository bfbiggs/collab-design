const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.collab-ui.com'
  : 'http://127.0.0.1:3300';

const DOWNLOADS_URL = 'https://downloads.collab-ui.com';


const config = {
  COMPONENTS_URL: `${API_URL}/components`,
  ICONS_URL: `${API_URL}/icons`,
  ICONS_DOWNLOADS_URL: `${DOWNLOADS_URL}/icons`,
  MENUS_URL: `${API_URL}/menu`,
  PAGES_URL: `${API_URL}/pages`,

};

export default config;
