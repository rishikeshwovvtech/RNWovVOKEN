import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
//local import
import styles from './NotificationStyle';
import R from '../../../R';
import {NotificationData, RootView} from '../../../components/index';

export const Notification = () => {
  const [todayData] = useState([
    {
      id: '1',
      title: 'Nexus Grand Central Mall, Navi Mumbai',
      message:
        'Bill no. 123456 is auto uploaded points will be added on approval',
      time: '17:20',
    },
    {
      id: '2',
      title: 'Nexus Grand Central Mall, Navi Mumbai',
      message:
        'Bill no. 123456 is auto uploaded points will be added on approval',
      time: '17:20',
    },
    {
      id: '3',
      title: 'Nexus Grand Central Mall, Navi Mumbai',
      message:
        'Bill no. 123456 is auto uploaded points will be added on approval',
      time: '17:20',
    },
    {
      id: '4',
      title: 'Nexus Grand Central Mall, Navi Mumbai',
      message:
        'Bill no. 123456 is auto uploaded points will be added on approval',
      time: '17:20',
    },
  ]);
  const [yestadayData] = useState([
    {
      id: '1',
      title: 'Nexus Grand Central Mall, Navi Mumbai',
      message: 'thanks for visiting the Nexus',
      time: '06:20',
    },
    {
      id: '2',
      title: 'Nexus Grand Central Mall, Navi Mumbai',
      message: 'thanks for visiting the Nexus',
      time: '06:20',
    },
    {
      id: '3',
      title: 'Nexus Grand Central Mall, Navi Mumbai',
      message: 'thanks for visiting the Nexus',
      time: '06:20',
    },
    {
      id: '4',
      title: 'Nexus Grand Central Mall, Navi Mumbai',
      message: 'thanks for visiting the Nexus',
      time: '06:20',
    },
  ]);
  return (
    <RootView>
      <ScrollView>
        <View>
          {/* <Text style={styles.dayText}>Today</Text>  */}
          <FlatList
            horizontal={false}
            data={todayData}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <NotificationData
                title={item.title}
                time={item.time}
                message={item.message}
              />
            )}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.divider} />
        </View>
        {/* <View>
        <Text style={styles.dayText}>Welcome to Notification</Text> 
          <View style={styles.view}>
            <Image
              source={R.images.Notification}
              resizeMode={'contain'}
              style={styles.image}
            />
            <Text style={styles.favouriteText}>No Notification Found</Text>
            <Text style={styles.text}>
              We will notify you when something new arrive!!
            </Text>
          </View>
          <FlatList
            horizontal={false}
            data={yestadayData}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <NotificationYestadayData
                title={item.title}
                time={item.time}
                message={item.message}
              />
            )}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.divider} />
          <TouchableOpacity>
            <Text style={styles.titletext}>Mark all as read</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </RootView>
  );
};
