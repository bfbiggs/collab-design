const API_URL = process.env.NODE_ENV === 'production'
  ? 'http://collab-ui-server-1.us-west-2.elasticbeanstalk.com'
  : 'http://127.0.0.1:3300';


const config = {
  MENUS_URL: `${API_URL}/menu`,
  COMPONENTS_URL: `${API_URL}/components`,
  PAGES_URL: `${API_URL}/pages`,
};

export default config;
