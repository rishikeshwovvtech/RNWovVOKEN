import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, TouchableOpacity} from 'react-native';
import R from '../R';
import Home from '../scenes/Home/Home';
import Map from '../scenes/Maps/MapsFirst';
import QrCode from '../scenes/ShoppingList/QrCode';
import Explore from '../scenes/ExploreScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {HeaderTitle} from '../components/HeaderTitle';
const stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import Event from '../scenes/Events/EventScreenFirst';
import LoyaltyRewards from '../scenes/LoyaltyRewards/LoyaltyRewards';


const HomeNavigator = ({navigation}) => {
  return (
    <stack.Navigator
      screenOptions={{
        //headerBackTitleVisible: false,
        headerTintColor: R.colors.black,
        headerStyle: {
          backgroundColor: R.colors.voilet,
        },
      }}>
      <stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <HeaderTitle title={'Home'} />,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Image
                source={R.images.Menu}
                tintColor={R.colors.white}
                style={{margin: 10, width: 22, height: 20}}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </stack.Navigator>
  );
};

const MapNavigator = ({navigation}) => {
  return (
    <stack.Navigator
      screenOptions={{
        //headerBackTitleVisible: false,
        headerTintColor: R.colors.black,
        headerStyle: {
          backgroundColor: R.colors.voilet,
        },
      }}>
      <stack.Screen
        name="Map"
        component={Map}
        options={{
          headerTitle: () => <HeaderTitle title={'Home'} />,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Image
                source={R.images.Menu}
                tintColor={R.colors.white}
                style={{margin: 10, width: 22, height: 20}}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </stack.Navigator>
  );
};

const ExploreNavigator = ({navigation}) => {
  return (
    <stack.Navigator
      screenOptions={{
        //headerBackTitleVisible: false,
        headerTintColor: R.colors.black,
        headerStyle: {
          backgroundColor: R.colors.voilet,
        },
      }}>
      <stack.Screen
        name="Explore"
        component={Explore}
        options={{
          headerTitle: () => <HeaderTitle title={'Explore'} />,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Image
                source={R.images.Menu}
                tintColor={R.colors.white}
                style={{margin: 10, width: 22, height: 20}}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </stack.Navigator>
  );
};
const QrCodeNavigator = ({navigation}) => {
  return (
    <stack.Navigator
      screenOptions={{
        // headerBackTitleVisible: false,
        headerTintColor: R.colors.black,
        headerStyle: {
          backgroundColor: R.colors.voilet,
        },
      }}>
      <stack.Screen
        name="QrCode"
        component={QrCode}
        options={{
          headerTitle: () => <HeaderTitle title={'Explore'} />,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Image
                source={R.images.Menu}
                tintColor={R.colors.white}
                style={{margin: 10, width: 22, height: 20}}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </stack.Navigator>
  );
};

const EventNavigator = ({navigation}) => {
  return (
    <stack.Navigator
      screenOptions={{
        //  headerBackTitleVisible: false,
        headerTintColor: R.colors.black,
        headerStyle: {
          backgroundColor: R.colors.voilet,
        },
      }}>
      <stack.Screen
        name="Event"
        component={Event}
        options={{
          headerTitle: () => <HeaderTitle title={'Home'} />,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Image
                source={R.images.Menu}
                tintColor={R.colors.white}
                style={{margin: 10, width: 22, height: 20}}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </stack.Navigator>
  );
};
const OkenNavigator = ({navigation}) => {
  return (
    <stack.Navigator
      screenOptions={{
        // headerBackTitleVisible: false,
        headerTintColor: R.colors.black,
        headerStyle: {
          backgroundColor: R.colors.voilet,
        },
      }}>
      <stack.Screen
        name="Oken"
        component={LoyaltyRewards}
        options={{
          headerTitle: () => <HeaderTitle title={'Home'} />,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Image
                source={R.images.Menu}
                tintColor={R.colors.white}
                style={{margin: 10, width: 22, height: 20}}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </stack.Navigator>
  );
};
export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: R.colors.voilet,
        style: {
          paddingBottom: 5,
          height: 65,
        },
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Image
              tintColor={color}
              source={R.images.Home_Inactive}
              style={{height: 28, width: 28}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Map"
        component={MapNavigator}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({color, size}) => (
            <Image
              tintColor={color}
              source={R.images.Map_Inactive}
              style={{height: 28, width: 28}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreNavigator}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({color, size}) => (
            <Image
              tintColor={color}
              source={R.images.Explore_Inactive}
              style={{height: 28, width: 28}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="QrCode"
        component={QrCodeNavigator}
        options={{
          tabBarLabel: 'QrCode',
          tabBarIcon: ({color, size}) => (
            <Image
              tintColor={color}
              source={R.images.QRCode_Inactive}
              style={{height: 28, width: 28}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Event"
        component={EventNavigator}
        options={{
          tabBarLabel: 'Event',
          tabBarIcon: ({color, size}) => (
            <Image
              tintColor={color}
              source={R.images.Events_Inactive}
              style={{height: 28, width: 28}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Oken"
        component={OkenNavigator}
        options={{
          tabBarLabel: 'Oken',
          tabBarIcon: ({color, size}) => (
            <Image
              tintColor={color}
              source={R.images.OKEN_Inactive}
              style={{height: 28, width: 28}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
