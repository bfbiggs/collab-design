const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.collab-ui.com'
  : 'http://127.0.0.1:3300';


const config = {
  MENUS_URL: `${API_URL}/menu`,
  COMPONENTS_URL: `${API_URL}/components`,
  PAGES_URL: `${API_URL}/pages`,
};

export default config;
