import React, {useState, useContext} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
//local import
import {Loader, RootView} from '../../components/index';
import R from '../../R';
import {
  FCM_BASE_OPEN_API_URL,
  OPEN_API_TENANT_ID,
  USER_BASE_OPEN_API_URL,
} from '../../utils/Constants';
import {AuthContext} from '../../context/auth/AuthContext';
import {useFocusEffect} from '@react-navigation/native';
import {fetchApiService} from '../../internetconnection/CommonApiService';

import RenderHTML from 'react-native-render-html';
import {ScreenAnalytics} from '../../components/Analytics/ScreenAnalytics';
import SubHeader from '../../components/SubHeader';
export const TermsConditions = (props) => {
  const [tandcText, settandcText] = useState('');
  const {authAction, authState} = useContext(AuthContext);

  const [ShowLoader, setShowLoader] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (authState?.mallDetails?.oko_Row_Code != null) {
        api_TermsAndConditions();
      }
    }, [authState?.mallDetails?.oko_Row_Code]),
  );

  useFocusEffect(
    React.useCallback(() => {
      ScreenAnalytics(
        'Terms_Conditions',
        authState?.userToken,
        authState?.userId,
      )
        .then((res) => {})
        .catch((e) => {});
    }, []),
  );

  const api_TermsAndConditions = async () => {
    const oko_Row_Code = authState?.mallDetails?.oko_Row_Code.toString();

    let data = JSON.stringify({
      pageUrl: 'Homescreen',
      ach_Desc: 'Terms and Conditions',
      ach_Prefix: '23003',
      entity_Name: 'Branch_MsT',
      row_Code: oko_Row_Code,
      hdr_approve_Status: '0,1',
      hdr_acd_Status: '0,1',
      dtl_approve_Status: '0,1',
      dtl_acd_Status: '0,1',
    });
    let config = {
      method: 'post',
      url: authState.userToken
        ? USER_BASE_OPEN_API_URL + 'Homescreen?' + OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL + 'Homescreen?' + OPEN_API_TENANT_ID,
      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl: 'Homescreen',
        event: 'T&CPage',
        action: 'onLoadT&C',
      },

      data: data,
    };
    setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then(function (response) {
        setShowLoader(false);

        if (response?.data?.message?.type === 'SUCCESS') {
          settandcText(response?.data?.data?.Response[0].attribute_Value);
        }
      })
      .catch(function (error) {
        setShowLoader(false);
      });
  };

  return (
    <>
      <SubHeader title={'Terms and Conditions'} />
      <RootView>
        <ScrollView
          style={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
        >
          <Loader isVisible={ShowLoader} />
          <RenderHTML source={{html: tandcText}} tagsStyles={tagsStyles} />
        </ScrollView>
      </RootView>
    </>
  );
};

const tagsStyles = {
  p: {
    whiteSpace: 'normal',
    color: R.themes.accountTextColour,
    fontSize: 13,
    fontWeight: '400',
  },
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    paddingHorizontal: '6%',
    paddingBottom: '8%',
    marginBottom: '5%',
    flexWrap: 'wrap',
  },
  contentText: {
    // color: R.themes.darkTextColor,
    // fontSize: R.dimensions.hp(2),
    // fontFamily: R.fonts.primaryRegular,
    // marginTop: '3%',
    // textAlign: 'auto',
  },
});
