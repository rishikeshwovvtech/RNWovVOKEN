import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  ImageBackground,
  BackHandler,
} from 'react-native';
import {useRoute} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
//local import
import R from '../../../R';
import styles from './RewardsLandingStyle';
import {AuthContext} from '../../../context/auth/AuthContext';
import {AUTH_BASE_URL, BASE_URL, TENANT_ID} from '../../../utils/Constants';

import {CustomSlider} from '../../../components/CustomSlider';
import {ActivityIndicator} from 'react-native';
import {horizontalScale} from '../../../../res/scale';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import {dimensions} from '../../../../res/dimensions';

export const RewardsPreloginLanding = ({navigation}) => {
  const {authAction, authState} = useContext(AuthContext);
  const [ShowLoader, setShowloader] = useState(false);
  const [instructionData, setInstructionData] = useState(false);
  const routeName = useRoute();

  ///////////////////// useFocusEffect to call api functions //////////////

  useFocusEffect(
    React.useCallback(() => {
      apiVouchersCategories();
      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, [
      authState?.userId,
      authState?.mallDetails?.oko_Row_Desc,
      authState?.userObject?.imageUrl,
      authState?.userObject,
      authState?.parkingDetails,
    ]),
  );

  const backAction = () => {
    if (routeName?.name != 'HomePage') {
      navigation.navigate('HomePage');
      return true;
    } else {
      BackHandler.exitApp();
      return true;
    }
  };

  const apiVouchersCategories = () => {
    let data = JSON.stringify({
      branch_Code: authState?.mallDetails?.oko_Row_Code,
      program_Name: 'ShopAndWin',
      tenantId: `${TENANT_ID}`,
      pageUrl:'getListOfSlab',
    });

    let config = {
      method: 'post',
      url: `${AUTH_BASE_URL}/ipos/rest/fusionAuth/getListOfSlab?tenantId=_${TENANT_ID}`,

      headers: {
        'Content-Type': 'application/json',
        pageUrl:'getListOfSlab',
        event:'RewardsPrelogin',
        action:'voucherCategories'
      },
      data: data,
    };
    setShowloader(true);
   fetchApiService(config, authAction,authState)
      .then(function (response) {
        setShowloader(false);
        const jsonObject = response.data;
        const dailySlabDisplayTexts = jsonObject.Lpt_Promo_Dtl.dailySlab.map(
          (item) => item.displayText,
        );
        const monthlySlabDisplayTexts =
          jsonObject.Lpt_Promo_Dtl.monthlySlab.map((item) => item.displayText);
        const yearlySlabDisplayTexts = jsonObject.Lpt_Promo_Dtl.yearlySlab.map(
          (item) => item.displayText,
        );

        const allDisplayTexts = dailySlabDisplayTexts.concat(
          monthlySlabDisplayTexts,
          yearlySlabDisplayTexts,
        );
        // Alternatively, you can use the spread operator:
        // const allDisplayTexts = [...dailySlabDisplayTexts, ...monthlySlabDisplayTexts, ...yearlySlabDisplayTexts];
        setInstructionData(allDisplayTexts);
      })
      .catch(function (error) {
        setShowloader(false);
      });
  };

  ///////////////////////// Main Return VIew ////////////////////////////////

  function LoaderWithoutBGDesign() {
    return (
      <View
        style={{
          padding: '5%',
          borderRadius: 8,
          width: horizontalScale(300),
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: '10%',
        }}
      >
        {/* <ActivityIndicator
          size={'large'}
          color={R.themes.boxBackgroundColour}
        /> */}
        <Image source={R.images.loaderNexus} style={{width: 50, height: 50}} />
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
        <View style={styles.linergradientinner}>
          <Image source={R.images.Infoicon} style={styles.infoicon} />

          <Text style={styles.cardSubtitleFooter}>
            Didn't earn a reward today? Don’t be sad , we have added your spends
            and you are still in the race to earn exciting monthly and yearly
            rewards. Keep shopping with Nexus Malls for #HarDinKuchNaya.{' '}
          </Text>
        </View>

        {/* </ImageBackground> */}
      </View>
    );
  }
  return (
    <View style={{backgroundColor: R.colors.primaryBrand2}}>
      <View>
        <CustomSlider
          isServerURL={false}
          data={[
            R.images.Shopandwin1,
            R.images.Shopandwin2,
            R.images.Shopandwin3,
          ]}
        />
      </View>
      <ImageBackground
        source={R.images.CardMaskReward}
        style={styles.contentContainerBox}
        imageStyle={{borderRadius: 10}}
      >
        {ShowLoader ? (
          <LoaderWithoutBGDesign />
        ) : (
          <FlatList
            style={{flex: 0.5}}
            ListHeaderComponent={
              <Text style={styles.flatlistHeaderText}>
                Shop & Win Program Instructions
              </Text>
            }
            data={instructionData}
            renderItem={({item, index}) => (
              <LinearGradient
                // colors={['#FFACF5', '#E973FF', '#FF67F3']}
                colors={['#97298C', '#882180', '#610E61']}
                // colors={[ (102.28deg, #EF65D9 7.85%, rgba(244, 0, 244, 0.723958) 103.96%, #F50AD0 103.97%)]}
                style={
                  index % 2 == 0 ? styles.leftAlignText : styles.rightAlignText
                }
              >
                <Image source={R.images.NexusLogo} style={styles.nexuslogo} />
                <Text style={styles.contentTitle}>{item}</Text>
              </LinearGradient>
            )}
          />
        )}
      </ImageBackground>
      <FooterNote />
    </View>
  );
};
