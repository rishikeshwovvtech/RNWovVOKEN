import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Share,
  ScrollView,
} from 'react-native';

//local imports
import styles from './AccountProfileStyle';
import {CModal, RootView} from '../../../components/index';
import {AuthContext} from '../../../context/auth/AuthContext';

import {AUTH_BASE_URL, IMAGE_CDN_URL, IS_CDN} from '../../../utils/Constants';

import R from '../../../R';

import {fetchUserPoints} from '../../Auth/API/CommonApiCalls';

import {CTA_firebaseAnalytics} from '../../../components/Analytics/CTAAnalytics';

import SubHeader from '../../../components/SubHeader';
import RemixIcon from 'react-native-remix-icon';

export const AccountProfile = (props) => {
  const {authAction, authState} = useContext(AuthContext);

  const [fullName, setfullName] = useState(authState?.userObject?.fullName);
  const [email, setemail] = useState(authState?.userObject?.email);
  const [contact, setcontact] = useState(
    authState?.userObject?.user?.mobilePhone,
  );
  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [ErrorModalMessage, setErrorModalMessage] = useState(null);

  const getPartyData = async () => {
    const {userPoints} = await fetchUserPoints(
      authState?.userId,
      authState?.userToken,
      authState.PartyCode || authState.partyCode,
      null,
      authAction,
    );
    let userInfo = {
      ...authState,
      userPoints: userPoints,
    };

    authState.isLogInSkipped !== true ? authAction.setData(userInfo) : null;
  };

  const updateuserProfile = () => {
    setfullName(authState?.userObject?.fullName);
    setemail(authState?.userObject?.email);
    setcontact(authState?.userObject?.['mobilePhone']);
  };

  useEffect(() => {
    getPartyData();
    updateuserProfile();
  }, [
    authState?.userObject?.imageUrl,
    authState?.userPoints,
    authState?.mallDetails?.oko_Row_Desc,
    authState?.userObject,
  ]);

  const onShare = async () => {
    try {
      CTA_firebaseAnalytics(
        'Share_App',
        'My_Account',
        authState?.userToken,
        authState?.userId,
        authState?.mallDetails?.oko_Row_Desc,
      )
        .then((res) => {})
        .catch((e) => {});
      const result = await Share.share({
        title: 'App link',
        message:
          'I’m inviting you to use NexusOne app, a simple and easy way to earn points against shopping done at all Nexus malls. On your first signup, you will also earn an exciting reward. https://nexusone.wovvtech.com',
        url: 'https://nexusone.wovvtech.com',
      });
    } catch (error) {
      setErrorModalMessage(error.message);
      setShowErrorModal(true);
    }
  };
  const ProfileItem = ({onPress, icon, title, showArrow = true}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          marginHorizontal: '2%',
          marginVertical: '3%',
        }}
      >
        <View style={{flex: 0.5}}>
          <RemixIcon
            name={icon}
            size={R.dimensions.wp(6)}
            color={R.themes.accountTextColour}
          />
        </View>
        <View
          style={{flex: 3, justifyContent: 'center', alignItems: 'flex-start'}}
        >
          <Text
            style={{
              fontSize: R.dimensions.hp('1.9%'),
              fontFamily: R.fonts.primaryBold,
              color: R.themes.accountTextColour,
            }}
          >
            {title}
          </Text>
        </View>
        <View style={{flex: 0.5, alignItems: 'flex-end'}}>
          {showArrow && (
            <RemixIcon
              name="ri-arrow-right-s-line"
              size={R.dimensions.wp(6)}
              color={R.themes.darkTextColor}
              style={{marginVertical: '2%'}}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SubHeader title={'My Account'} />
      <RootView>
        <ScrollView>
          <View style={styles.CardContainer}>
            <View style={styles.profileContent}>
              <Text style={styles.name}>{fullName}</Text>

              <View style={styles.profileinfobox}>
                {contact == 'NA' ? null : (
                  <View style={styles.contactContainer}>
                    <RemixIcon
                      name="ri-phone-line"
                      color={R.themes.accountTextColour}
                      size={15}
                      style={{marginHorizontal: 5}}
                    />
                    <Text style={styles.emailText}>{contact}</Text>
                  </View>
                )}
                <View style={styles.contactContainer}>
                  <RemixIcon
                    name="ri-mail-line"
                    color={R.themes.accountTextColour}
                    size={15}
                    style={{marginHorizontal: 5}}
                  />
                  <Text style={styles.emailText}>{email}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.profileContainer}>
            <Image
              resizeMode={'contain'}
              source={
                authState?.userObject?.imageUrl == '' ||
                authState?.userObject?.imageUrl == null
                  ? R.images.defaultUser
                  : authState?.userObject?.imageUrl.includes('Profile_Image')
                  ? {
                      uri:
                        (IS_CDN ? IMAGE_CDN_URL : AUTH_BASE_URL) +
                        authState?.userObject?.imageUrl,
                    }
                  : {uri: authState?.userObject?.imageUrl}
              }
              style={{
                height: R.dimensions.wp(25),
                width: R.dimensions.wp(25),
              }}
            />
          </View>

          <View style={styles.profileDetailsContainer}>
            <ProfileItem
              icon={'ri-edit-2-line'}
              title={'Edit Profile'}
              onPress={() => {
                CTA_firebaseAnalytics(
                  'Edit_Profile',
                  'My_Account',
                  authState?.userToken,
                  authState?.userId,
                  authState?.mallDetails?.oko_Row_Desc,
                )
                  .then((res) => {})
                  .catch((e) => {}),
                  props.navigation.navigate('EditProfile');
              }}
            />
            <ProfileItem
              icon={'ri-heart-line'}
              title={'My Favourite Brands'}
              onPress={() => {
                CTA_firebaseAnalytics(
                  'My_Favourite_Brands',
                  'My_Account',
                  authState?.userToken,
                  authState?.userId,
                  authState?.mallDetails?.oko_Row_Desc,
                )
                  .then((res) => {})
                  .catch((e) => {}),
                  props.navigation.navigate('FavouriteBrand');
              }}
            />

            <ProfileItem
              icon={'ri-share-forward-line'}
              title={'Share App'}
              showArrow={false}
              onPress={onShare}
            />

            <ProfileItem
              icon={'delete-bin-5-fill'}
              title={'Delete Account'}
              showArrow={false}
              onPress={() => {
                props.navigation.navigate('AccountDeletionPage');
              }}
            />
            <CModal
              isVisible={ShowErrorModal}
              modalMsg={ErrorModalMessage}
              onPressModal={() => setShowErrorModal(!ShowErrorModal)}
              isForm={'Signup'}
            />
          </View>
        </ScrollView>
      </RootView>
    </>
  );
};
