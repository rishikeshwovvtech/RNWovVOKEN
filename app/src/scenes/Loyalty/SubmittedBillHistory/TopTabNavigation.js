import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import R from '../../../R';

import ApproveScreen from './ApproveScreen/ApproveScreen';
import InProgressScreen from './InProgressScreen';
import RejectedScreen from './RejectedScreen';

const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigation({navigation}) {
  return (
    <Tab.Navigator
      lazy={true}
      initialRouteName="ApproveScreen"
      tabBarOptions={{
        activeTintColor: R.themes.circular_border,
        inactiveTintColor: R.themes.accountTextColour,
        allowFontScaling: false,

        style: {
          backgroundColor: R.themes.backgroundColor,
        },
        labelStyle: {
          textAlign: 'center',

          // color:'#000000',
          fontFamily: R.fonts.primaryBold,

          // textTransform: 'uppercase',
          textTransform: 'none',
        },

        indicatorStyle: {
          borderBottomColor: R.themes.yellowPetalcolor,

          borderBottomWidth: 3,
        },
      }}
    >
      <Tab.Screen
        name="ApproveScreen"
        component={ApproveScreen}
        options={{
          tabBarLabel: 'Approved',
        }}
      />

      {/* <Tab.Screen name="Home">
        {(props) => <InProgressScreen {...props} extraData={'aaa'} />}
      </Tab.Screen> */}

      <Tab.Screen
        name="InProgressScreen"
        component={InProgressScreen}
        // initialParams={network: 'jdbc'}
        options={{
          tabBarLabel: 'In Progress',
        }}
      />
      <Tab.Screen
        name="RejectedScreen"
        component={RejectedScreen}
        options={{
          tabBarLabel: 'Rejected',
        }}
      />
    </Tab.Navigator>
  );
}
