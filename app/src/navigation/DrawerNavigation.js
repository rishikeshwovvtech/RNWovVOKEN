import * as React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {HeaderTitle} from '../components/HeaderTitle';
import R from '../R';
const stack = createStackNavigator();
import BottomTabsNavigator from './BottomTabsNavigator';
const Drawer = createDrawerNavigator();
import ShoppingList from '../scenes/ShoppingList/ShoppingList';
import CheckIns from '../scenes/Drawer/Check-ins';
import {FAQs} from '../scenes/Drawer/FAQs';
import HelpCenter from '../scenes/Drawer/HelpCenter';
import Refer_a_Friend from '../scenes/Drawer/Refer_a_Friend';
import Settings from '../scenes/Drawer/Settings';
import TermsConditions from '../scenes/Drawer/Terms_&_Conditions';
import Stores from '../scenes/Drawer/Stores';
import RateUs from '../scenes/Drawer/RateUs';
import Feedback from '../scenes/Drawer/Feedback';
import UploadedBillHistory from '../scenes/Home/UploadedBillHistory';

const CheckInsNavigator = ({navigation}) => {
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
        name="CheckIns"
        component={CheckIns}
        options={{
          headerTitle: () => <HeaderTitle title={'CheckIns'} />,
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
const FAQsNavigator = ({navigation}) => {
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
        name="FAQs"
        component={FAQs}
        options={{
          headerTitle: () => <HeaderTitle title={'FAQs'} />,
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
const HelpCenterNavigator = ({navigation}) => {
  return (
    <stack.Navigator
      screenOptions={{
        //  headerBackTitleVisible: false,
        headerTintColor: R.colors.white,
        headerStyle: {
          backgroundColor: R.colors.voilet,
        },
      }}>
      <stack.Screen
        name="HelpCenter"
        component={HelpCenter}
        options={{
          // headerTitle: () => <HeaderTitle title={'HelpCenter'} />,
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

const Refer_a_FriendNavigator = ({navigation}) => {
  return (
    <stack.Navigator
      screenOptions={{
        //headerBackTitleVisible: false,
        headerTintColor: R.colors.white,
        headerStyle: {
          backgroundColor: R.colors.voilet,
        },
      }}>
      <stack.Screen
        name="Refer_a_Friend"
        component={Refer_a_Friend}
        options={{
          //headerTitle: () => <HeaderTitle title={'Refer_a_Friend'} />,
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
const SettingsNavigator = ({navigation}) => {
  return (
    <stack.Navigator
      screenOptions={{
        //headerBackTitleVisible: false,
        headerTintColor: R.colors.white,
        headerStyle: {
          backgroundColor: R.colors.voilet,
        },
      }}>
      <stack.Screen
        name="Settings"
        component={Settings}
        options={{
          // headerTitle: () => <HeaderTitle title={'Settings'} />,
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
const TermsConditionsNavigator = ({navigation}) => {
  return (
    <stack.Navigator
      screenOptions={{
        //headerBackTitleVisible: false,
        headerTintColor: R.colors.white,
        headerStyle: {
          backgroundColor: R.colors.voilet,
        },
      }}>
      <stack.Screen
        name="TermsConditions"
        component={TermsConditions}
        options={{
          //  headerTitle: () => <HeaderTitle title={'TermsConditions'} />,
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
const StoresNavigator = ({navigation}) => {
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
        name="Stores"
        component={Stores}
        options={{
          //headerTitle: () => <HeaderTitle title={'Stores'} />,
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
const RateUsNavigator = ({navigation}) => {
  return (
    <stack.Navigator
      screenOptions={{
        //headerBackTitleVisible: false,
        headerTintColor: R.colors.white,
        headerStyle: {
          backgroundColor: R.colors.voilet,
        },
      }}>
      <stack.Screen
        name="Rate Us"
        component={RateUs}
        options={{
          // headerTitle: () => <HeaderTitle title={'RateUs'} />,
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
const FeedbackNavigator = ({navigation}) => {
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
        name="Feedback/Survey"
        component={Feedback}
        options={{
          // headerTitle: () => <HeaderTitle title={'Feedback'} />,
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

const UploadedBillsNavigator = ({navigation}) => {
  return (
    <stack.Navigator
      screenOptions={{
        //headerBackTitleVisible: false,
        headerTintColor: R.colors.white,
        headerStyle: {
          backgroundColor: R.colors.voilet,
        },
      }}>
      <stack.Screen
        name="Uploaded Bills"
        component={UploadedBillHistory}
        options={{
          //  headerTitle: () => <HeaderTitle title={'UploadedBills'} />,
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
const ShoppingListNavigator = ({navigation}) => {
  return (
    <stack.Navigator
      screenOptions={{
        //headerBackTitleVisible: false,
        headerTintColor: R.colors.white,
        headerStyle: {
          backgroundColor: R.colors.voilet,
        },
      }}>
      <stack.Screen
        name="Shopping List"
        component={ShoppingList}
        options={{
          // headerTitle: () => <Header title={'ShoppingList'} />,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={R.images.Back}
                tintColor={R.colors.white}
                style={{margin: 10, width: 18, height: 20}}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </stack.Navigator>
  );
};

export default function DrawerNavigation() {
  return (
    // <NavigationContainer>
    <Drawer.Navigator
      drawerContentOptions={{
        // activeTintColor: '#1496ad',
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: R.colors.black,
        },
      }}>
      <Drawer.Screen name=" " component={BottomTabsNavigator} />
      <Drawer.Screen
        name="ShoppingList"
        component={ShoppingListNavigator}
        options={{
          drawerLabel: 'ShoppingList',
          drawerIcon: ({color, size}) => (
            <Image
              //tintColor={color}
              source={R.images.ShoppingList}
              style={{height: 18, width: 18}}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="UploadedBills"
        component={UploadedBillsNavigator}
        options={{
          drawerLabel: 'UploadedBills',
          drawerIcon: ({color, size}) => (
            <Image
              //tintColor={color}
              source={R.images.UploadedBills}
              style={{height: 18, width: 18}}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="CheckIns"
        component={CheckInsNavigator}
        options={{
          drawerLabel: 'CheckIns',
          drawerIcon: ({color, size}) => (
            <Image
              //tintColor={color}
              source={R.images.Location}
              style={{height: 18, width: 18}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Refer_a_Friend"
        component={Refer_a_FriendNavigator}
        options={{
          drawerLabel: 'Refer_a_Friend',
          drawerIcon: ({color, size}) => (
            <Image
              //tintColor={color}
              source={R.images.Refer_a_Friend}
              style={{height: 18, width: 18}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Stores"
        component={StoresNavigator}
        options={{
          drawerLabel: 'Stores',
          drawerIcon: ({color, size}) => (
            <Image
              //  tintColor={color}
              source={R.images.Favorite_Heart}
              style={{height: 18, width: 18}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="HelpCenter"
        component={HelpCenterNavigator}
        options={{
          drawerLabel: 'HelpCenter',
          drawerIcon: ({color, size}) => (
            <Image
              //tintColor={color}
              source={R.images.HelpCenter}
              style={{height: 18, width: 18}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="RateUs"
        component={RateUsNavigator}
        options={{
          drawerLabel: 'RateUs',
          drawerIcon: ({color, size}) => (
            <Image
              //tintColor={color}
              source={R.images.RateUs}
              style={{height: 18, width: 18}}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Feedback"
        component={FeedbackNavigator}
        options={{
          drawerLabel: 'Feedback',
          drawerIcon: ({color, size}) => (
            <Image
              // tintColor={color}
              source={R.images.Feedback_Survey}
              style={{height: 18, width: 18}}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({color, size}) => (
            <Image
              //tintColor={color}
              source={R.images.Settings}
              style={{height: 18, width: 18}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="TermsConditions"
        component={TermsConditionsNavigator}
        options={{
          drawerLabel: 'TermsConditions',
          drawerIcon: ({color, size}) => (
            <Image
              //  tintColor={color}
              source={R.images.TermsConditions}
              style={{height: 18, width: 18}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="FAQs"
        component={FAQsNavigator}
        options={{
          drawerLabel: 'FAQs',
          drawerIcon: ({color, size}) => (
            <Image
              //  tintColor={color}
              source={R.images.FAQs}
              style={{height: 18, width: 18}}
            />
          ),
        }}
      />
    </Drawer.Navigator>
    // </NavigationContainer>
  );
}
