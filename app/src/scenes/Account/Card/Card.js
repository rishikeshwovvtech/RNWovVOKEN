import React, {useState} from 'react';
import {View, FlatList, TouchableOpacity, Text, ScrollView} from 'react-native';
import styles from './CardStyle';

import {RootView, AddCard} from '../../../components/index';
// TODO is this useful remove this and its style if not
export const Card = () => {
  const [data] = useState([
    {
      id: '1',
      image: {
        uri: 'https://picsum.photos/200',
      },
    },
    {
      id: '2',
      image: {
        uri: 'https://picsum.photos/200',
      },
    },
  ]);

  return (
    <RootView>
      <ScrollView>
        <FlatList
          data={data}
          renderItem={({item}) => <AddCard image={item.image} />}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttontext}>Add New Card</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </RootView>
  );
};
