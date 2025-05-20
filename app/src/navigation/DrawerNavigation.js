import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {CardStyleInterpolators} from '@react-navigation/stack';
//local imports
import {BottomTabsNavigator} from './BottomTabsNavigator';
import {FAQs} from '../scenes/Drawer/FAQs/FAQs';
import {TermsConditions} from '../scenes/Drawer/TermsConditions';
import {AboutUs} from '../scenes/Drawer/AboutUs';
import {CustomDrawer} from '../components/CustomDrawer';
import {BackHeader} from '../components/BackHeader';
import {ContactUs} from '../scenes/Drawer/ContactUs';
import {AccountProfile} from '../scenes/Account/AccountProfile/AccountProfile';
import {AccountDeletionPage} from '../scenes/Account/AccountProfile/AccountDeletionPage';
import TopTabNavigation from '../scenes/Loyalty/SubmittedBillHistory/TopTabNavigation';
import {PrivacyPolicy} from '../scenes/Drawer/PrivacyPolicy';

import {FavouriteBrand} from '../scenes/Wishlist/WishList';
import {TransactionHistory} from '../scenes/Loyalty/TransactionHistory/TransactionHistory';
import {SpecialReward} from '../scenes/Loyalty/SpecialReward/SpecialReward';
import {SignupVoucher} from '../scenes/Auth/SignupVoucher';
import SubHeader from '../components/SubHeader';
import {UploadBillCapture} from '../scenes/Loyalty/UploadBillCapture/UploadBillCapture';
import GenerateRewardCode from '../scenes/Loyalty/RewardCode/GenerateRewardCode';
const Drawer = createDrawerNavigator();

export const DrawerNavigation = ({navigation}) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
        drawerType: 'front',
        swipeEdgeWidth: 0,
        gestureEnabled: false,
      }}
      backBehavior="history"
      drawerContent={(props) => (
        <CustomDrawer {...props} navigation={navigation} />
      )}
      lazy={true}
      drawerStyle={{
        backgroundColor: 'transparent',
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        width: '70%',
      }}
      edgeWidth={0}
    >
      <Drawer.Screen
        name="BottomTabsNavigator"
        component={BottomTabsNavigator}
      />
      <Drawer.Screen
        name="AccountProfile"
        component={AccountProfile}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader
              title={'My Account'}
              navigation={navigation}
              customOnPress={() => navigation.navigate('Home')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AccountDeletionPage"
        component={AccountDeletionPage}
      />

      <Drawer.Screen name="TransactionHistory" component={TransactionHistory} />
      <Drawer.Screen name="SignupVoucher" component={SignupVoucher} />
      <Drawer.Screen name="SpecialReward" component={SpecialReward} />
      <Drawer.Screen name="FavouriteBrand" component={FavouriteBrand} />
      <Drawer.Screen
        name="TopTabNavigation"
        component={TopTabNavigation}
        options={{
          headerShown: true,
          header: () => (
            <>
              <BackHeader
                navigation={navigation}
                customOnPress={() => navigation.goBack()}
              />
              <SubHeader title={'Submitted Bill History'} />
            </>
          ),
        }}
      />
      <Drawer.Screen name="UploadBillCapture" component={UploadBillCapture} />

      <Drawer.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader
              title={'About Us'}
              navigation={navigation}
              customOnPress={() => navigation.navigate('Home')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader
              title={'Contact Us'}
              navigation={navigation}
              customOnPress={() => navigation.navigate('Home')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="TermsConditions"
        component={TermsConditions}
        options={{
          drawerLabel: 'Terms & Conditions',
          headerShown: true,
          header: () => (
            <BackHeader
              title={'Terms and Conditions'}
              navigation={navigation}
              customOnPress={() => navigation.navigate('Home')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          drawerLabel: 'Privacy Policy',
          headerShown: true,
          header: () => (
            <BackHeader
              title={'Privacy Policy'}
              navigation={navigation}
              customOnPress={() => navigation.navigate('Home')}
            />
          ),
        }}
      />

<Drawer.Screen
        name="GenerateRewardCode"
        component={GenerateRewardCode}
        options={{
          drawerLabel: 'My Reward Code',
          // headerShown: true,
          // header: () => (
          //   <BackHeader
          //     title={'Reward Code'}
          //     navigation={navigation}
          //     customOnPress={() => navigation.navigate('Home')}
          //   />
          // ),
        }}
      />
      <Drawer.Screen
        name="FAQs"
        component={FAQs}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader
              title={'FAQs'}
              navigation={navigation}
              customOnPress={() => navigation.navigate('Home')}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
