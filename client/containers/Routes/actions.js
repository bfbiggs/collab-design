import * as types from './actionTypes';
import config from '../../config';
import handleErrors from '../../utils/handleErrors';

const setRoutes = routes => {
  return { type: types.FETCH_ROUTES_SUCCESS, routes };
};

const setError = error => {
  return { type: types.FETCH_ROUTES_ERROR, error };
};

const getPath = url => {
  return url.substr(url.indexOf('/', 7) + 1);
};

// const getWpAccessToken = () => {
//   const params = {
//     grant_type: 'client_credentials',
//     client_id: 'zk1o1P2jRAuODoHUFikVIujg73jMuCH3WJsYyvhp',
//     client_secret: '5MdIaVDQeYLWt5cA8wmD84H5Na3lFlLL8ZuiV889',
//   };
//   const oauthParams = Object.keys(params)
//     .map(key => {
//       return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
//     })
//     .join('&');

//   return new Promise((resolve, reject) => {
//     let access_token = null;
//     fetch(config.WP_OAUTH_URL, {
//       method: 'POST',
//       mode: 'cors',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//       },
//       body: oauthParams,
//     })
//       .then(handleErrors)
//       .then(res => res.json())
//       .then(json => {
//         return json;
//       });

// if (location.hash) {
//   parseHash(location.hash)
//     .then(token => setSessionAccessToken(token))
//     .then(token => resolve(token))
//     .catch(error => {
//       reject(error);
//     });
// }
// if (sessionStorage.getItem(ACCESS_TOKEN)) {
//   auth_token = sessionStorage.getItem(ACCESS_TOKEN);
//   resolve(sessionStorage.getItem(ACCESS_TOKEN));
// }
//   });
// };

const filterRouteData = menuData => {
  return menuData.map(item => {
    if (item.children) {
      item.children.map(child => {
        if (child.children) {
          child.children.map(grandchild => {
            grandchild.path = getPath(grandchild.url);
            return grandchild;
          });
        }
        child.path = getPath(child.url);
        return child;
      });
    }
    item.path = getPath(item.url);
    return item;
  });
};

const fetchRoutes = () => dispatch => {
  dispatch({ type: types.FETCH_ROUTES_PENDING });

  return fetch(config.MENUS_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      const data = filterRouteData(json.items);
      dispatch(setRoutes(data));
      return data;
    })
    .catch(error => dispatch(setError(error)));

  // return getWpAccessToken()
  //   .then(token => {
  //     const url = `${config.MENUS_URL}?access_token=${token}`;
  //     return fetch(url, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //   })
  //   .then(handleErrors)
  //   .then(res => res.json())
  //   .then(json => {
  //     const data = filterRouteData(json.items);
  //     dispatch(setRoutes(data));
  //     return data;
  //   })
  //   .catch(error => dispatch(setError(error)));
};

export default fetchRoutes;
