import {fetchApiService} from '../internetconnection/CommonApiService';

fetchApiService(config)
  .then((response) => {
    //  console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    //console.log(error);
  });
