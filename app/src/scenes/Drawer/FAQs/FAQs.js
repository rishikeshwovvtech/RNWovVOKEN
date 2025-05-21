import React, {useState, useContext} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {AuthContext} from '../../../context/auth/AuthContext';

//local import
import R from '../../../R';
import styles from './FAQStyle';
import {RootView, CategoryList} from '../../../components';
import {
  FCM_BASE_OPEN_API_URL,
  OPEN_API_TENANT_ID,
  USER_BASE_OPEN_API_URL,
} from '../../../utils/Constants';

import {ActivityIndicator} from 'react-native';
import {horizontalScale} from '../../../../res/scale';
import {useFocusEffect} from '@react-navigation/native';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';
import {SearchInputComponent} from '../../../components/SearchInputComponent';
import SubHeader from '../../../components/SubHeader';

export const FAQs = (props) => {
  const {authAction, authState} = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState([]);
  const [selectedItem, setSelectedItem] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [categoryDataList, setcategoryDataList] = useState(['All']);
  const [responseDataList, setresponseDataList] = useState('');
  const [showResponseDataList, setShowResponseDataList] = useState('');
  const [ShowLoader, setShowLoader] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      FAQsDATA();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      ScreenAnalytics('FAQs', authState?.userToken, authState?.userId)
        .then((res) => {})
        .catch((e) => {});
    }, []),
  );

  const onPressHandler = (item) => {
    if (responseDataList) {
      setSearchText('');
      setSelectedItem(item);

      const currentQuestionsAndAnswers = responseDataList.filter((e) => {
        if (e.atrbt_Dtl_Desc == item) {
          return e;
        } else if (item == 'All') {
          return e;
        }
      });
      setShowResponseDataList(currentQuestionsAndAnswers);
    }
  };

  const customHeader = (section, index, isActive) => {
    const splitted = section?.attribute_Value.split(',');
    const splitted1 = splitted[0].split(':');
    let title = splitted1[1].replace(/[']/g, '');

    return (
      <View
        style={[
          styles.headerMainView,
          index === 0 ? null : styles.headerMainView2,
        ]}
      >
        <View style={{flex: 7}}>
          <Text style={styles.headerText}>{title.trim()}</Text>
        </View>
        <View style={styles.headerImg}>
          <Image
            style={styles.headerIcon}
            source={isActive ? R.images.Arrow : R.images.BottomArrow}
          />
        </View>
      </View>
    );
  };

  const customContent = (section) => {
    const splitted = section?.attribute_Value?.split('description:');

    let description = splitted[1]?.replace(/[']/g, '');
    let description1 = description?.replace(/[,}]/g, '');

    return (
      <View style={styles.contentMainView}>
        <Text multiline={true} style={styles.contentText}>
          {description1?.trim()}
        </Text>
      </View>
    );
  };

  const handleSearchBar = () => {
    if (responseDataList) {
      setSelectedItem('All');
      if (searchText.trim() == '') {
        return true;
      } else {
        let result = responseDataList.filter((o) => {
          if (
            o?.attribute_Value
              .split(',')?.[0]
              .toLowerCase()
              .includes(searchText.toLowerCase())
          ) {
            return o;
          }
        });
        setShowResponseDataList(result);
      }
    }
  };

  const FAQsDATA = () => {
    setSearchText('');
    setSelectedItem('All');
    var data = JSON.stringify({
      ach_Desc: 'FAQs',
      ach_Prefix: '23001',
      entity_Name: 'Branch_MsT',
      row_Code: authState?.mallDetails?.oko_Row_Code,
      hdr_approve_Status: '1',
      hdr_acd_Status: '1',
      dtl_approve_Status: '1',
      dtl_acd_Status: '1',
      pageUrl: 'HomescreenV2',
    });
    setShowLoader(true);
    var config = {
      method: 'post',

      url: authState.userToken
        ? USER_BASE_OPEN_API_URL + 'HomescreenV2?' + OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL + 'HomescreenV2?' + OPEN_API_TENANT_ID,

      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl: 'HomescreenV2',
        event: 'FAQPage',
        action: 'onLoadFAQ',
      },
      data: data,
    };
    fetchApiService(config, authAction, authState)
      .then(function (response) {
        setShowLoader(false);
        // console.log("FAQsDATA config ",config);

        // console.log("FAQsDATA response ",response);

        let temp = response?.data?.data?.Response;
        temp = temp.filter((i) => typeof i === 'object');

        setresponseDataList(temp);
        const unique1 = [
          'All',
          ...new Set(temp?.map((item) => item?.atrbt_Dtl_Desc)),
        ];
        setcategoryDataList(unique1);

        const currentQuestionsAndAnswers = temp.filter((e) => {
          return e;
        });
        setShowResponseDataList(currentQuestionsAndAnswers);
      })
      .catch(function (error) {
        setShowLoader(false);
      });
  };

  return (
    <>
      <SubHeader title={'FAQs'} />
      <ScrollView
        style={{
          height: '100%',
          backgroundColor: R.themes.backgroundColor,
        }}
      >
        <RootView customStyle={{flex: 0}}>
          <SearchInputComponent
            onPress={() => responseDataList && handleSearchBar(searchText)}
            onSubmitEditing={(event) => {
              handleSearchBar(event.nativeEvent.text);
            }}
            onEndEditing={(event) => {
              handleSearchBar(event.nativeEvent.text);
            }}
            onChangeText={(searchText) => {
              setSearchText(searchText);
            }}
            value={searchText}
            placeholder={'"Search Your Queries"'}
          />

          {ShowLoader ? (
            <View
              style={{
                flex: 1,
                marginTop: '60%',
                position: 'absolute',
                justifyContent: 'center',
                alignSelf: 'center',
                zIndex: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: R.themes.backgroundColor,
                  padding: '5%',
                  borderRadius: 8,
                  width: horizontalScale(300),
                  alignItems: 'center',
                }}
              >
                <ActivityIndicator
                  size={'large'}
                  color={R.themes.boxBackgroundColour}
                />
                <Text
                  style={{
                    marginTop: '5%',
                    fontSize: horizontalScale(12),
                    fontFamily: R.fonts.primaryRegular,
                    textAlign: 'center',
                  }}
                >
                  Loading
                </Text>
              </View>
            </View>
          ) : (
            <>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingVertical: '5%',
                  marginLeft: 10,
                  paddingRight: '5%',
                }}
              >
                {categoryDataList.map((item) => {
                  return (
                    <CategoryList
                      onPress={() => onPressHandler(item)}
                      name={item}
                      customStyle={[
                        styles.categoryList,
                        {
                          backgroundColor:
                            selectedItem == item
                              ? 'rgba(154, 0, 147, 1)'
                              : 'rgba(154, 0, 147, 0.2)',
                        },
                      ]}
                      customTxtStyle={{
                        color:
                          selectedItem == item
                            ? R.themes.backgroundColor
                            : R.themes.headerBackgroundColor,
                      }}
                    />
                  );
                })}
              </ScrollView>
              <ScrollView contentContainerStyle={{paddingTop: '10%'}}>
                {showResponseDataList ? (
                  <Accordion
                    sections={showResponseDataList}
                    renderHeader={customHeader}
                    renderContent={customContent}
                    activeSections={activeSection}
                    touchableComponent={TouchableOpacity}
                    onChange={(section) => setActiveSection(section)}
                  />
                ) : null}
                <>
                  <View style={styles.divider} />
                  <Text style={styles.otherQueryText}>
                    For any other queries please reach out to our support team
                    at helpdesk@wovvtech.com
                  </Text>
                </>
              </ScrollView>
            </>
          )}
        </RootView>
      </ScrollView>
    </>
  );
};
