import * as React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../scenes/Auth/SplashScreen';
import Login from '../scenes/Auth/Login';
import Index from '../scenes/Auth/SegmentedControlTab/Index';
import Location from '../scenes/Auth/Location';
import {NavigationContainer} from '@react-navigation/native';
import MallDetails from '../scenes/Mall/MallDetails';
import EventScreenFirst from '../scenes/Events/EventScreenFirst';
import R from '../R';
import {HeaderTitle} from '../components/HeaderTitle';
import {Image, TouchableOpacity} from 'react-native';
import {Header} from '../components/Header';
const MainStack = createStackNavigator();
import DrawerNavigation from './DrawerNavigation';
const stack = createStackNavigator();
import AfterRedeemPoints from '../scenes/LoyaltyRewards/LoyaltyRewardsThird';
import EventScreenThird from '../scenes/Events/EventScreenThird';
import EventScreenSecond from '../scenes/Events/EventScreenSecond';
import EventScreenFourth from '../scenes/Events/EventScreenFourth';
import EventScreenFifth from '../scenes/Events/EventScreenFifth';
import EventScreenSix from '../scenes/Events/EventScreenSix';
import SmartParking from '../scenes/Mall/SmartParking';
import Offer from '../scenes/Offer';
import LoyaltyRewardsSecond from '../scenes/LoyaltyRewards/LoyaltyRewardsSecond';
import RedeemVoucher from '../scenes/LoyaltyRewards/LoyaltyRewardsFirst';
import UploadBill from '../scenes/LoyaltyRewards/UploadBill';
import UploadedBillHistory from '../scenes/Home/UploadedBillHistory';
import UploadBillViaPhoto from '../scenes/LoyaltyRewards/UploadBillViaPhoto';
import SocialMedia from '../scenes/SocialMedia';
import AutoUploadBill from '../scenes/LoyaltyRewards/AutoUploadBill';
import SmartParkingFour from '../scenes/Mall/SmartParkingFour';
import SmartParkingTwo from '../scenes/Mall/SmartParkingTwo';
import SmartParkingThree from '../scenes/Mall/SmartParkingThree';
import MapsThird from '../scenes/Maps/MapThird';
import Mapfour from '../scenes/Maps/MapFour';
import MapFifth from '../scenes/Maps/MapFifth';
const MallDetailsNavigator = ({navigation}) => {
  return (
    <stack.Navigator
      screenOptions={{
        // headerBackTitleVisible: false,
        headerTintColor: R.colors.white,
        headerStyle: {
          backgroundColor: R.colors.voilet,
        },
      }}>
      <stack.Screen
        name="Seawoods Grand Central Mall"
        component={MallDetails}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                tintColor={R.colors.white}
                source={R.images.Back}
                style={{margin: 10, width: 18, height: 20}}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </stack.Navigator>
  );
};
const UploadBillNavigator = ({navigation}) => {
  return (
    <stack.Navigator
      screenOptions={{
        // headerBackTitleVisible: false,
        headerTintColor: R.colors.white,
        headerStyle: {
          backgroundColor: R.colors.voilet,
        },
      }}>
      <stack.Screen
        name="UploadBill"
        component={UploadBill}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                tintColor={R.colors.white}
                source={R.images.Back}
                style={{margin: 10, width: 18, height: 20}}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </stack.Navigator>
  );
};
const MainNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerTintColor: R.colors.white,
        headerStyle: {
          backgroundColor: R.colors.voilet,
        },
      }}>
      <MainStack.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="EventScreenFirst"
        component={EventScreenFirst}
        options={{
          headerTitle: () => <HeaderTitle title={'EventScreenFirst'} />,
          headerLeft: () => (
            <TouchableOpacity>
              <Image
                source={R.images.Menu}
                tintColor={R.colors.white}
                style={{margin: 10, width: 22, height: 20}}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <MainStack.Screen
        name="MallDetails"
        component={MallDetailsNavigator}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="UploadBill"
        component={UploadBillNavigator}
        options={{headerShown: false}}
      />

      {/*   //textin*/}
      <MainStack.Screen
        name="UploadedBillHistory"
        component={UploadedBillHistory}
        options={{
          headerTitle: () => <Header title={'UploadedBillHistory'} />,
        }}
      />
      <MainStack.Screen
        name="MapFifth"
        component={MapFifth}
        options={{
          headerTitle: () => <Header title={'MapFifth'} />,
        }}
      />
      <MainStack.Screen
        name="Mapfour"
        component={Mapfour}
        options={{
          headerTitle: () => <Header title={'Mapfour'} />,
        }}
      />
      <MainStack.Screen
        name="MapsThird"
        component={MapsThird}
        options={{
          headerTitle: () => <Header title={'MapsThird'} />,
        }}
      />
      <MainStack.Screen
        name="SmartParkingFour"
        component={SmartParkingFour}
        options={{
          headerTitle: () => <Header title={'SmartParkingFour'} />,
        }}
      />
      <MainStack.Screen
        name="SmartParkingTwo"
        component={SmartParkingTwo}
        options={{
          headerTitle: () => <Header title={'SmartParkingTwo'} />,
        }}
      />
      <MainStack.Screen
        name="SmartParkingThree"
        component={SmartParkingThree}
        options={{
          headerTitle: () => <Header title={'SmartParkingThree'} />,
        }}
      />
      <MainStack.Screen
        name="AutoUploadBill"
        component={AutoUploadBill}
        options={{
          headerTitle: () => <Header title={'AutoUploadBill'} />,
        }}
      />
      <MainStack.Screen
        name="LoyaltyRewardsSecond"
        component={LoyaltyRewardsSecond}
        options={{
          headerTitle: () => <Header title={'LoyaltyRewardsSecond'} />,
        }}
      />
      <MainStack.Screen
        name="SocialMedia"
        component={SocialMedia}
        options={{
          headerTitle: () => <Header title={'SocialMedia'} />,
        }}
      />
      <MainStack.Screen
        name="UploadBillViaPhoto"
        component={UploadBillViaPhoto}
        options={{
          headerTitle: () => <HeaderTitle title={'UploadBillViaPhoto'} />,
        }}
      />
      <MainStack.Screen
        name="RedeemVoucher"
        component={RedeemVoucher}
        options={{
          headerTitle: () => <HeaderTitle title={'RedeemVoucher'} />,
        }}
      />
      <MainStack.Screen
        name="Offer"
        component={Offer}
        options={{
          headerTitle: () => <HeaderTitle title={'Offer'} />,
        }}
      />
      <MainStack.Screen
        name="RedeemPoints"
        component={LoyaltyRewardsSecond}
        options={{
          headerTitle: () => <HeaderTitle title={'LoyaltyRewardsSecond'} />,
        }}
      />
      <MainStack.Screen
        name="AfterRedeemPoints"
        component={AfterRedeemPoints}
        options={{
          headerTitle: () => <HeaderTitle title={'AfterRedeemPoints'} />,
        }}
      />

      <MainStack.Screen
        name="EventScreenSecond"
        component={EventScreenSecond}
        options={{
          headerTitle: () => <HeaderTitle title={'EventScreenSecond'} />,
        }}
      />

      <MainStack.Screen
        name="EventScreenThird"
        component={EventScreenThird}
        options={{
          headerTitle: () => <HeaderTitle title={'EventScreenThird'} />,
        }}
      />
      <MainStack.Screen
        name="EventScreenFourth"
        component={EventScreenFourth}
        options={{
          headerTitle: () => <HeaderTitle title={'EventScreenFourth'} />,
        }}
      />
      <MainStack.Screen
        name="EventScreenFifth"
        component={EventScreenFifth}
        options={{
          headerTitle: () => <HeaderTitle title={'EventScreenFifth'} />,
        }}
      />
      <MainStack.Screen
        name="EventScreenSix"
        component={EventScreenSix}
        options={{
          headerTitle: () => <HeaderTitle title={'EventScreenSix'} />,
        }}
      />
      <MainStack.Screen
        name="SmartParking"
        component={SmartParking}
        options={{
          headerTitle: () => <HeaderTitle title={'SmartParking'} />,
        }}
      />
    </MainStack.Navigator>
  );
};

const StackNavigation = () => {
  return (
    <NavigationContainer>
      {/* <StatusBar backgroundColor="#9400d3" /> */}
      <MainStack.Navigator headerMode="none">
        <MainStack.Screen name="SplashScreen" component={SplashScreen} />
        <MainStack.Screen name="Login" component={Login} />
        <MainStack.Screen name="Index" component={Index} />
        <MainStack.Screen name="Location" component={Location} />
        <MainStack.Screen name="MainNavigator" component={MainNavigator} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
