import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  FlatList,
  Image,
  Keyboard,
} from 'react-native';
//local imports
import R from '../../../R';
import {
  BASE_URL,
  IMAGE_CDN_URL_TENANT_ID,
  IS_CDN,
  Register_ID,
  IMAGE_URL,
  USER_BASE_OPEN_API_URL,
  FCM_BASE_OPEN_API_URL,
  OPEN_API_TENANT_ID,
  AUTH_BASE_URL,
  USER_APP_ID,
  Temp_Token,
} from '../../../utils/Constants';
import {fetchApiService} from '../../../internetconnection/CommonApiService';

import {AuthContext} from '../../../context/auth/AuthContext';
import {TextInput} from 'react-native-gesture-handler';
import RemixIcon from 'react-native-remix-icon';
import messaging from '@react-native-firebase/messaging';

export const CustomCountryCodeTextInput = (props) => {
  const [showDropDown, setShowDropdown] = useState(false);
  const [options, setOptions] = useState([]);
  const [filteredData, setFilteredData] = useState(options);
  const [showLoader, setShowLoader] = useState('');
  const [HidePassword, setHidePassword] = useState(false);
  const {authAction, authState} = useContext(AuthContext);
  const apiCountryCodeList = (
    access_Token = '',
    FcmId = '',
    appAuthGenerate = false,
  ) => {
    // console.log("access_Token , fcmid , appAuthGenerate ",
    //   access_Token ,"\n" ,FcmId ,"\n", appAuthGenerate
    // );

    const data = JSON.stringify({
      entityName: 'Country_MsT',
      action: 'payloadRuleWithTid',
      pageUrl: 'Fetchcountry_mst',
      event: 'JR_1538',
      formData: {},
    });

    const config = {
      method: 'post',
      url: authState.userToken
        ? USER_BASE_OPEN_API_URL + 'Fetchcountry_mst?' + OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL + 'Fetchcountry_mst?' + OPEN_API_TENANT_ID,

      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : appAuthGenerate === true
          ? access_Token
          : authState?.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: appAuthGenerate === true ? FcmId : authState?.fcmId}),
        'Content-Type': 'application/json',
        pageUrl: 'Fetchcountry_mst',
        event: 'CountryCodeSelectScreen',
        action: 'onLoadCountryCode',
      },
      data: data,
    };
    setShowLoader(true);

    fetchApiService(config, authAction, authState)
      .then((response) => {
        //console.log("country code ",response.data.data);

        //console.log("country code Response ",response.data.data?.Response);

        setOptions(response.data.data.Response);
        setFilteredData(response.data.data.Response);

        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  const handleDropdown = () => {
    setShowDropdown(false);
  };

  const appAuthTokenGenerator = async () => {
    //console.log("authState.tempAuthToken null appAuthTokenGenerator");
    setShowLoader(true);
    const fcmToken = await messaging().getToken();
    let data = JSON.stringify({
      FcmId: fcmToken,
      pageUrl: 'AppAuthGenrator',
      //FcmId:12453768769
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url:
        AUTH_BASE_URL +
        '/ipos/rest/domainAuth/AppAuthGenrator?' +
        OPEN_API_TENANT_ID,
      headers: {
        'Content-Type': 'application/json',
        access_Token: Temp_Token,
        Register_Id: Register_ID,
        user_App_ID: USER_APP_ID,
        pageUrl: 'AppAuthGenrator',
        event: 'Loginscreen',
        action: 'onAppAuthTokenGenerate',
      },
      data: data,
    };
    fetchApiService(config, authAction, authState)
      .then(async function (response) {
        console.log(
          '🚀 ~ CustomCountryCodeTextInput.js:130 ~ response:',
          response,
        );
        //console.log("response?.data ",response?.data);

        if (response?.data?.message?.type === 'SUCCESS') {
          //console.log("appAuthTokenGenerator ",response?.data?.data);

          const {access_Token, FcmId} = response?.data?.data;

          // const {access_Token} = response?.data?.data;
          await authAction.setData({
            ...authState,
            tempAuthToken: access_Token,
            fcmId: FcmId,
            // fcmId:12453768769
          });
          setShowLoader(true);
          Keyboard.dismiss(), setShowDropdown(true);
          apiCountryCodeList(access_Token, FcmId, true);
        }
      })
      .catch(function (error) {
        //console.log("error ",error );
        setShowDropdown(false), setShowLoader(false);
      });
  };

  return (
    <View style={[styles.mainView, {...props.customMainViewStyle}]}>
      {props.title && <Text style={styles.textInputTitle}>{props.title}</Text>}
      <View
        style={[styles.textInputStyleView, {...props.customTextInputStyleView}]}
      >
        <TouchableOpacity
          style={styles.countrySelectionView}
          onPress={() => {
            //console.log("appAuthTokenGenerator authState?.tempAuthToken ",authState?.tempAuthToken),

            props?.appAuthGenerate == true
              ? //console.log("appAuthTokenGenerator TRUE"),

                (setShowDropdown(true),
                setShowLoader(true),
                appAuthTokenGenerator())
              : //console.log("appAuthTokenGenerator FALSE"),

                (Keyboard.dismiss(),
                setTimeout(() => {
                  apiCountryCodeList(), setShowDropdown(true);
                }, 500));
          }}
        >
          <Text style={styles.countrySelectionText}>{props.country}</Text>
          <RemixIcon
            name={'ri-arrow-down-s-line'}
            style={styles.counrtySelectionImage}
            color={R.themes.darkIconColor}
            size={R.dimensions.hp('3%')}
          />
        </TouchableOpacity>
        <View style={styles.divider} />
        <TextInput
          //selectionColor={R.themes.darkButtonColor}
          textAlign="left"
          autoCompleteType={'email'}
          style={styles.textInputStyle}
          defaultValue={props.defaultValue}
          onChangeText={props.onChangeText}
          placeholder={'Phone Number'}
          keyboardType={'numeric'}
          value={props.value}
          ref={props.ref}
          autoCapitalize={'none'}
          textAlignVertical={'top'}
          multiline={props.multiline}
          onEndEditing={props.onEndEditing}
          onFocus={() => handleDropdown()}
          onBlur={() => handleDropdown()}
          editable={props.editable}
          numberOfLines={props.numberOfLines}
          underlineColor="transparent"
          underlineColorAndroid="transparent"
          placeholderTextColor={R.colors.black}
          maxLength={props.maxLength}
          minHeight={
            Platform.OS === 'ios' && props.numberOfLines
              ? 20 * props.numberOfLines
              : null
          }
          cursorColor={R.themes.accountTextColour}
        />
        {props.greenCheck && (
          <View
            style={[styles.secureTextEntry, {...props.customSecureTextEntry}]}
          >
            <RemixIcon
              name={'ri-check-line'}
              size={R.dimensions.hp('3%')}
              color={R.colors.green}
              onPress={() => setHidePassword(!HidePassword)}
              style={{paddingHorizontal: '2%'}}
            />
          </View>
        )}
        {props.showSendOtpBtn && (
          <TouchableOpacity
            onPress={props.otpBtnOnPress}
            style={styles.secureTextEntry}
          >
            <Text style={styles.otpBtnText}>Send OTP</Text>
          </TouchableOpacity>
        )}
      </View>
      {props.showErrorText && (
        <Text style={styles.errorText}>Enter valid Mobile Number</Text>
      )}
      {showDropDown && (
        <View
          style={{
            paddingLeft: '5%',
            width: R.dimensions.wp(80),
            height: R.dimensions.wp(60),
            alignItems: 'center',
            borderColor: R.themes.borderColor,
            borderWidth: 1,
            marginHorizontal: '5%',
            marginVertical: '2%',
            alignSelf: 'center',
          }}
        >
          {showLoader ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            >
              {/* <ActivityIndicator
                size={'small'}
                color={R.themes.boxBackgroundColour}
              /> */}
              <Image
                source={R.images.loaderNexus}
                style={{width: 50, height: 50}}
              />
            </View>
          ) : (
            <FlatList
              data={filteredData}
              extraData={filteredData}
              nestedScrollEnabled
              style={{height: R.dimensions.wp(60)}}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <View style={styles.itemContainer}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    key={item.value}
                    onPress={() => {
                      props.onSelect(
                        '+' + item.country_TEL_Code,
                        item.country_NUM_Code,
                        item.Id,
                      );
                      props.onChangeText('');
                      handleDropdown();
                    }}
                    style={styles.dropdownItem}
                  >
                    <Image
                      source={{
                        uri:
                          (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                          '/' +
                          item.flag_Image,
                      }}
                      style={{width: 22, height: 22, resizeMode: 'contain'}}
                    />
                    <Text style={styles.dropdownLabel}>
                      {item.country_ISO_3} (+{item.country_TEL_Code})
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: '5%',
    marginVertical: '2.5%',
  },
  textInputStyleView: {
    marginHorizontal: '5%',
    borderColor: R.themes.borderColor,
    borderWidth: 1,
    flexDirection: 'row',
  },
  divider: {
    borderWidth: 0.5,
    borderColor: R.themes.borderColor,
    marginVertical: '4%',
  },
  countrySelectionView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginHorizontal: '5%',
  },
  countrySelectionText: {
    fontFamily: R.fonts.primaryRegular,
    fontSize: R.dimensions.wp(4),
    paddingRight: '1%',
  },
  counrtySelectionImage: {
    width: R.dimensions.wp(5),
    height: R.dimensions.wp(5),
  },
  textInputTitle: {
    fontSize: R.dimensions.wp(3.2),
    color: R.themes.darkTextColor,
    marginLeft: '1%',
  },
  textInputStyle: {
    color: R.themes.darkTextColor,
    paddingTop: Platform.OS == 'ios' ? '5%' : '4%',
    paddingHorizontal: '5%',
    paddingBottom: Platform.OS == 'ios' ? '5%' : '2%',
    fontFamily: R.fonts.primaryRegular,
    fontSize: R.dimensions.wp(4),
    flex: 1,
  },
  errorText: {
    marginTop: '3%',
    marginHorizontal: '5%',
    color: R.themes.darkTextColor,
    fontSize: R.dimensions.wp(3),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%',
    width: '100%',
  },
  dropdownItem: {
    padding: 10,
    borderBottomColor: R.themes.borderColor,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  dropdownLabel: {
    fontSize: 14,
    marginHorizontal: 10,
  },
  otpBtnText: {
    fontSize: R.dimensions.wp(3.2),
    color: R.themes.darkTextColor,
  },
  secureTextEntry: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    end: 20,
  },
});
