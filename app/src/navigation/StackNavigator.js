import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {CardStyleInterpolators} from '@react-navigation/stack';
//local imports
import {DrawerNavigation} from './DrawerNavigation';

import {UploadedBillHistory} from '../scenes/Loyalty/UploadedBillHistory/UploadedBillHistory';
import {EditProfile} from '../scenes/Account/EditProfile/EditProfile';
import {Card} from '../scenes/Account/Card/Card';
import {Notification} from '../scenes/Account/Notification/Notification';
import {SetNewPassword} from '../scenes/Auth/SetNewPassword/SetNewPassword';
import {BackHeader} from '../components/BackHeader';
import {FavouriteBrand} from '../scenes/Wishlist/WishList';
import {WovVMaps} from '../scenes/WovVMaps/WovVMaps';
import {WovvMapsDirections} from '../scenes/WovVMaps/WovVMapsDirections';
import {WovVMapSearch} from '../scenes/WovVMaps/WovVMapSearch';
import {NotificationWebView} from '../scenes/Notification/NoitificationWebView';
import {NewInternetScreen} from '../internetconnection/NewInternetScreen';
import {UploadBillCapture} from '../scenes/Loyalty/UploadBillCapture/UploadBillCapture';
import {FyndWebView} from '../scenes/Fynd/FyndWebView';
import {UploadBillPreview} from '../scenes/Loyalty/UploadBillCapture/UploadBillPreview';

const MainStack = createStackNavigator();

export const StackNavigator = ({navigation}) => {
  return (
    <MainStack.Navigator
      lazy={true}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <MainStack.Screen name="DrawerNavigation" component={DrawerNavigation} />
      <MainStack.Screen name="Favourites" component={FavouriteBrand} />
      <MainStack.Screen name="MapNavigation" component={WovVMaps} />
      <MainStack.Screen name="FyndWebView" component={FyndWebView} />

      <MainStack.Screen
        name="WovvMapsDirections"
        component={WovvMapsDirections}
      />
      <MainStack.Screen name="WovVMapSearch" component={WovVMapSearch} />
      <MainStack.Screen name="SetNewPassword" component={SetNewPassword} />
      <MainStack.Screen
        name="UploadedBillHistory"
        component={UploadedBillHistory}
      />
      <MainStack.Screen name="EditProfile" component={EditProfile} />
      <MainStack.Screen name="Card" component={Card} />
      <MainStack.Screen
        name="NewInternetScreen"
        component={NewInternetScreen}
      />
      <MainStack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader title={'Notifications'} navigation={navigation} />
          ),
        }}
      />
      <MainStack.Screen
        name="NotificationWebView"
        component={NotificationWebView}
      />
      <MainStack.Screen
        name="UploadBillCapture"
        component={UploadBillCapture}
      />
      <MainStack.Screen
        name="UploadBillPreview"
        component={UploadBillPreview}
      />
    </MainStack.Navigator>
  );
};
