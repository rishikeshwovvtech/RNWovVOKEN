import {BASE_URL} from '../../../utils/Constants';
import {fetchApiService} from '../../../internetconnection/CommonApiService';

export const fetchPartyCode = async (userId, accessToken, action,authState) => {
  let result, error;
  var data = JSON.stringify({
    entityName: 'party1',
    action: 'payload',
    pageUrl: 'FetchPartyCode',
    event: 'replaceWithAuth',
    formData: {
      Id: userId,
    },
  });

  var config = {
    method: 'post',
    url: BASE_URL,
    headers: {
      access_Token: accessToken,
      userid: userId,
      'Content-Type': 'application/json',
    },
    data: data,
  };

  await fetchApiService(config, action,authState)
    .then(async (response) => {
      result = response?.data.data?.WovV_User_MsT[0]?.party_Code;
    })
    .catch((e) => {
      error = e;
    });
  return {result, error};
};
