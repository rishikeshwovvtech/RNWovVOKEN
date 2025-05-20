import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {useRoute} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
//local import
import R from '../../../R';
import {RootView, BackHeader, Loader} from '../../../components/index';
import styles from './SpecialRewardStyle';
import {AuthContext} from '../../../context/auth/AuthContext';
import {BASE_URL, TENANT_ID, AUTH_BASE_URL} from '../../../utils/Constants';
import {horizontalScale} from '../../../../res/scale';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import {dimensions} from '../../../../res/dimensions';
import LinearGradient from 'react-native-linear-gradient';

import moment from 'moment';
import {CTA_firebaseAnalytics} from '../../../components/Analytics/CTAAnalytics';
import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';

export const SpecialReward = ({navigation}) => {
  const {authAction, authState} = useContext(AuthContext);
  const [ShowLoader, setShowLoader] = useState(false);
  const [specialRewards, setSpecialRewards] = useState(false);
  ///////////////////// useFocusEffect to call api functions //////////////

  useFocusEffect(
    React.useCallback(() => {
      ScreenAnalytics(
        'Special_Rewards_Screen',
        authState?.userToken,
        authState?.userId,
      )
        .then((res) => {})
        .catch((e) => {});
      apiSpecialRewards();
    }, [
      authState?.userId,
      authState?.mallDetails?.oko_Row_Desc,
      authState?.userObject?.imageUrl,
      authState?.userObject,
    ]),
  );

  const apiSpecialRewards = () => {
    var data = JSON.stringify({
      party_Code: (authState.PartyCode || authState.partyCode).toString(),
      lpt_promo_Code: '2100009',
      pageUrl:'specialRewardList',
    });

    var config = {
      method: 'post',
      url: `${AUTH_BASE_URL}/ipos/rest/fusionAuth/specialRewardList?tenantId=_${TENANT_ID}`,
      headers: {
        access_Token: authState.userToken,
        userid: authState.userId,
        'Content-Type': 'application/json',
        pageUrl:'specialRewardList',
        event:'SpecialRewardsPage',
        action:'onLoadSpecialRewards'
      },
      data: data,
     
    };
    setShowLoader(true);
   fetchApiService(config, authAction,authState)
      .then(function (response) {
        setShowLoader(false);
        setSpecialRewards(response.data.data);
      })
      .catch(function (error) {
        setShowLoader(false);
      });
  };

  //////////////////////////// All Rewards list view ///////////////////////////
  function isDateInFuture(targetDate) {
    const currentDate = new Date();

    // Extract day, month, and year
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Note: months are zero-based
    const year = currentDate.getFullYear();

    // Format the date
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;

    return formattedDate > targetDate;
  }
  const renderList = ({item}) => {
    const dateChecker = isDateInFuture(item?.['valid_To']);
    return (
      <TouchableOpacity
        style={{borderRadius: 6}}
        onPress={() => {
          CTA_firebaseAnalytics(
            item.categoryToShow,
            'Special_Rewards_Screen',
            authState?.userToken,
            authState?.userId,
            authState?.mallDetails?.oko_Row_Desc,
            '',
            '',
          )
            .then((res) => {})
            .catch((e) => {}),
            !dateChecker &&
              navigation.navigate('VoucherDetails', {
                active_Category_Name: false,
                voucher_Type_Code: item?.['vb.voucher_Type_Code'],
                voucher_Point: item?.['vb.voucher_Point'],
                voucher_Amt: item?.['vb.voucher_Amt'],
                valid_To: item?.['valid_To'],
                voucher_Code: item?.['voucher_Code'],
                voucher_book_id: item?.['vb.Id'],
              });
        }}
      >
        <ImageBackground
          source={R.images.vouchercardmask}
          style={styles.rewardCardmaskContainer}
          imageStyle={{resizeMode: 'stretch'}}
        >
          <View style={{flexDirection: 'row'}}>
            <View style={styles.rewardTextLeftDetails}>
              <Text style={styles.rewardNumberText}>{item.categoryToShow}</Text>

              <Text style={styles.rewardNumberText}>|</Text>

              <Text style={styles.rewardNumberText}>{item.validTo1}</Text>
            </View>

            <View style={styles.rewardTextRightDetails}>
              <Text style={styles.cardRightText}>View Details</Text>
            </View>
          </View>

          <View style={styles.claimedRedeemedView}>
            <Image
              source={R.images.circleTick}
              style={styles.tickImage}
            ></Image>

            <Text style={styles.claimedRedeemText}>Claimed</Text>

            <Image
              source={R.images.arrow_right}
              style={styles.arrow_right}
            ></Image>

            {item.status == 'Redeemed' ? (
              <Image
                source={R.images.circleTick}
                style={styles.tickImage}
              ></Image>
            ) : (
              <Image
                source={R.images.circlePurple}
                style={styles.tickImage}
              ></Image>
            )}
            <Text style={styles.claimedRedeemText}>Collected</Text>
          </View>
        </ImageBackground>
        {dateChecker && (
          <ImageBackground
            source={R.images.Expiredshopcardmask}
            style={{
              height: R.dimensions.hp('8.5%'),
              width: R.dimensions.wp('95%'),
              alignSelf: 'center',
              bottom: 10,
              position: 'absolute',
              opacity: 0.5,
              alignSelf: 'center',
              marginLeft: 4,
            }}
            imageStyle={{
              resizeMode: 'stretch',
              borderRadius: 3,
            }}
          ></ImageBackground>
        )}
      </TouchableOpacity>
    );
  };

  ///////////////////////// Main Return VIew ////////////////////////////////

  function LoaderView() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <ActivityIndicator
          size={'large'}
          color={R.themes.boxBackgroundColour}
        />
        <Text
          style={{
            marginTop: '5%',
            fontSize: horizontalScale(12),
            fontFamily: R.fonts.primaryRegular,
            textAlign: 'center',
          }}
        >
          Loading
        </Text> */}
        <Image source={R.images.loaderNexus} style={{width: 50, height: 50}} />
      </View>
    );
  }

  function TransactionListDesign() {
    return (
      <View style={{paddingVertical: '2%'}}>
        <FlatList
          data={specialRewards}
          renderItem={renderList}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }

  function FooterNote() {
    return (
      <View
        style={[
          styles.linergradientwrapper,
          {
            bottom: '2%',
            width:
              authState?.userToken == null
                ? dimensions.wp(95)
                : dimensions.wp(92),
          },
        ]}
      >
        <LinearGradient
          colors={['#9A2B8E', '#CD44B7', '#580A5A']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          locations={[0, 0.0605, 1]}
        >
          <View style={styles.linergradientinner}>
            <Image source={R.images.Infoicon} style={styles.infoicon} />
            {authState.userToken != null ? (
              <Text style={styles.cardSubtitleFooter}>
                Want to check bill status?{' '}
                <TouchableOpacity
                  onPress={() => {
                    CTA_firebaseAnalytics(
                      'Go_to_bill_history_Clicked',
                      'Special_Rewards',
                      authState?.userToken,
                      authState?.userId,
                      authState?.mallDetails?.oko_Row_Desc,
                    )
                      .then((res) => {})
                      .catch((e) => {});

                    navigation.navigate('DrawerNavigation', {
                      screen: 'TopTabNavigation',
                    });
                  }}
                >
                  <Text style={styles.footermaskSubtext}>
                    Go to bill history
                  </Text>
                </TouchableOpacity>
              </Text>
            ) : (
              <Text style={styles.cardSubtitleFooter}>
                Didn't earn a reward today? Don’t be sad , we have added your
                spends and you are still in the race to earn exciting monthly
                and yearly rewards. Keep shopping with Nexus Malls for
                #HarDinKuchNaya.{' '}
              </Text>
            )}
          </View>
        </LinearGradient>
        {/* </ImageBackground> */}
      </View>
    );
  }
  function HeaderButtonClick() {
    if (authState?.userToken == null) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'AuthNavigator',
            params: {
              screen: 'Login',
            },
          },
        ],
      });
    } else {
      navigation.navigate('DrawerNavigation', {
        screen: 'TopTabNavigation',
      });
    }
  }
  return (
    <>
      <BackHeader title={'Special Rewards'} navigation={navigation} />
      <RootView>
        {ShowLoader ? (
          <LoaderView />
        ) : (
          <ScrollView>
            <View style={styles.mainContainer}>
              <TransactionListDesign />
              {/* ************************** empty data **************************  */}
              {!specialRewards && (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: '30%',
                    paddingHorizontal: '15%',
                  }}
                >
                  <Image
                    source={R.images.vouchernotavailableimage}
                    style={{
                      height: 80,
                      width: 80,
                      marginVertical: '5%',
                    }}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 15,
                      color: R.colors.coolGrey,
                      fontFamily: R.fonts.primaryRegular,
                      paddingVertical: '3%',
                    }}
                  >
                    No data !!{' '}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
        <FooterNote />
      </RootView>
    </>
  );
};
