import React, {useState} from 'react';
import {View, Text, Image, FlatList, ScrollView} from 'react-native';
//local import
import R from '../../../R';
import {horizontalScale} from '../../../../res/scale';
import styles from './UploadedBillHistoryStyle';

import {SimpleButton, Search, RootView} from '../../../components/index';

export const UploadedBillHistory = (props) => {
  const [data, setData] = useState([
    {
      // image: R.images.Uploaded_Bills_History_Bill,
      title: 'Uploaded',
      backgroundColor: R.colors.green,
    },
    {
      //image: R.images.Uploaded_Bills_History_Bill_2,
      title: ' Auto Uploaded',
      backgroundColor: R.colors.voilet,
    },
    {
      //image: R.images.Uploaded_Bills_History_Bill,
      title: 'Uploaded',
      backgroundColor: R.colors.green,
    },
    {
      // image: R.images.Uploaded_Bills_History_Bill_2,
      title: ' Auto Uploaded',
      backgroundColor: R.colors.voilet,
    },
  ]);
  return (
    <RootView />
    // <RootView>
    //   <ScrollView>
    //     <Search
    //       img={R.images.Search}
    //       placeholder={'Search by Bill Number or Store name'}
    //       placeholderTextColor={R.colors.black}
    //     />
    //     <View
    //       style={{
    //         backgroundColor: R.colors.lightBlueGrey,
    //         paddingBottom: horizontalScale(15),
    //       }}>
    //       <View style={styles.filterView}>
    //         <Image
    //           tintColor={R.colors.black}
    //           source={R.images.Filter}
    //           style={styles.filterImage}
    //         />
    //         <Text style={styles.filterText}>Filter</Text>
    //       </View>

    //       <FlatList
    //         data={data}
    //         showsHorizontalScrollIndicator={false}
    //         renderItem={({item} /*this.malldetail(item)*/) => (
    //           <View style={styles.cardView}>
    //             <View style={styles.cardContainer}>
    //               <View style={styles.view}>
    //                 <View style={{flexDirection: 'row'}}>
    //                   <Image
    //                     source={R.images.Coin_Money}
    //                     style={styles.coinImage}
    //                   />
    //                   <Text
    //                     style={{
    //                       fontSize: horizontalScale(10),
    //                       marginLeft: horizontalScale(10),
    //                       color: R.colors.black,
    //                       alignSelf: 'center',
    //                     }}>
    //                     250 points added
    //                   </Text>
    //                 </View>
    //                 <Text style={styles.text}>BIBA</Text>
    //                 <Text style={styles.text}>Seawoods Grand Central Mall</Text>
    //                 <Text style={styles.text}>Navi Mumbai</Text>
    //               </View>
    //               <Image source={item.image} style={styles.billImage} />
    //             </View>
    //             <View
    //               style={{
    //                 flexDirection: 'row',
    //                 marginLeft: horizontalScale(30),
    //                 marginTop: horizontalScale(5),
    //               }}>
    //               <View>
    //                 <Text style={styles.billText}>Bill #098765</Text>
    //                 <Text style={styles.billText}>
    //                   Billing Date: 27/05/2020
    //                 </Text>
    //               </View>
    //               <SimpleButton
    //                 onPress={() => props.navigation.navigate('AutoUploadBill')}
    //                 title={item.title}
    //                 customTxtStyle={styles.customTxtStyle}
    //                 customStyle={{
    //                   marginLeft: horizontalScale(60),
    //                   backgroundColor: item.backgroundColor,
    //                   height: horizontalScale(20),
    //                   width: horizontalScale(90),
    //                 }}
    //               />
    //             </View>
    //           </View>
    //         )}
    //         keyExtractor={(item) => item.id}
    //       />
    //     </View>
    //   </ScrollView>
    // </RootView>
  );
};
