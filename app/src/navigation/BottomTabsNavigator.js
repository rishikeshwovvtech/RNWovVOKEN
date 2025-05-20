import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {CardStyleInterpolators} from '@react-navigation/stack';
//local imports
// import {Directory} from '../scenes/Mall/MallDetails/MallDetails';
import {BrandListing} from '../scenes/Mall/BrandListing/BrandListing';
import {BrandDetails} from '../scenes/Mall/BrandDetails/BrandDetails';
import {Home} from '../scenes/Home/Home';
import NewVoucherDetails from '../scenes/Loyalty/VoucherDetail/NewVoucherDetail';
import {Offer} from '../scenes/Offer/Offer/Offer';
import {BrandOffers} from '../scenes/Offer/ViewAllCategoryOffers';
import {TabBar} from '../components/index';
import {SocialFeeds} from '../scenes/SocialFeeds/SocialFeeds';
import {OfferByCategory} from '../scenes/Offer/OfferByCategory';
import {Amenities} from '../scenes/Mall/Amenities/Amenities';
import {MapFirstPage} from '../scenes/Maps/MapFirstPage';
import {UploadBillCapture} from '../scenes/Loyalty/UploadBillCapture/UploadBillCapture';
import {SmartParking} from '../scenes/SmartParking/SmartParking/SmartParking';
import {SmartParkingTwo} from '../scenes/SmartParking/SmartParkingTwo/SmartParkingTwo';
import {SmartParkingThree} from '../scenes/SmartParking/SmartParkingThree/SmartParkingThree';
import {RewardsLanding} from '../scenes/Loyalty/RewardLanding/RewardsLanding';
import {RewardsDetail} from '../scenes/Loyalty/RewardsDetail/RewardsDetail';
import {Directory} from '../scenes/Mall/MallDetails/MallDetails';
import {TourGuideZone, useTourGuideController} from 'rn-tourguide';

const stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const BottomTabsNavigator = () => {
  const {tourKey} = useTourGuideController();
  return (
    <Tab.Navigator
      backBehavior="history"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      screenOptions={{headerShown: false}}
      lazy={true}
      tabBar={(props) => <TabBar data={props} />}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen
        name="Explore"
        component={MallDetailsNavigator}
        options={() => ({
          tabBarButton: (props) => (
            <TourGuideZone
              zone={3}
              text={
                'Hey there! Welcome|Check the latest offers on your favourite brands!|2/4'
              }
              shape="circle"
              tourKey={tourKey}
            />
          ),
        })}
      />
      <Tab.Screen name="Scan" component={QrCodeNavigator} />
      <Tab.Screen name="Navigate" component={MapFirstPage} />
      <Tab.Screen name="Rewards" component={RewardNavigator} />
    </Tab.Navigator>
  );
};

const QrCodeNavigator = ({navigation}) => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <stack.Screen name="UploadBillCapture" component={UploadBillCapture} />
    </stack.Navigator>
  );
};

const MallDetailsNavigator = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <stack.Screen name="Explore" component={Directory} />
      <stack.Screen name="BrandListing" component={BrandListing} />
      <stack.Screen name="BrandDetails" component={BrandDetails} />
      <stack.Screen name="Offer" component={Offer} />
      <stack.Screen name="BrandOffers" component={BrandOffers} />
      <stack.Screen name="OfferByCategory" component={OfferByCategory} />
      <stack.Screen name="SocialFeed" component={SocialFeeds} />
      <stack.Screen name="Amenities" component={Amenities} />
    </stack.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <stack.Screen name="HomePage" component={Home} />
      <stack.Screen name="BrandListing" component={BrandListing} />
      <stack.Screen name="BrandDetails" component={BrandDetails} />
      <stack.Screen name="Offer" component={Offer} />
      <stack.Screen name="BrandOffers" component={BrandOffers} />
      <stack.Screen name="OfferByCategory" component={OfferByCategory} />
      <stack.Screen name="SmartParking" component={SmartParking} />
      <stack.Screen name="SmartParkingTwo" component={SmartParkingTwo} />
      <stack.Screen name="SmartParkingThree" component={SmartParkingThree} />
      <stack.Screen name="SocialFeed" component={SocialFeeds} />
      <stack.Screen name="Amenities" component={Amenities} />
    </stack.Navigator>
  );
};
const RewardNavigator = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <stack.Screen name="Rewards" component={RewardsLanding} />
      <stack.Screen name="RewardsDetail" component={RewardsDetail} />
      <stack.Screen name="VoucherDetails" component={NewVoucherDetails} />
    </stack.Navigator>
  );
};
