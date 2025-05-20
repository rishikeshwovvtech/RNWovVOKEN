import React, {useRef, useState} from 'react';
import {BackHeader, RootView} from '../../components';
import WebView from 'react-native-webview';
import R from '../../R';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Text,
  Image,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import {useFocusEffect} from '@react-navigation/native';
import {navigate} from '../../utils/NavigationService';
import checkInternetStatus from '../../internetconnection/inConnectionOn';
import SubHeader from '../../components/SubHeader';

export const SocialFeeds = ({navigation, route}) => {
  const {data} = route.params;
  let facebookUrl = encodeURI(data['bm.branch_soc_fb']);
  let twitterUrl = data['bm.branch_soc_twit'];
  let instagramUrl = data.instagram_link;
  const [isWorking, setIsInternetWorking] = useState(null);
  const [CurrentSelection, setCurrentSelection] = useState(0);

  const headerSocialData = [
    {
      id: 0,
      iconName: R.images.facebook_logo,
      name: 'Facebook',
      data: data['bm.branch_soc_fb'],
    },
    // {
    //   id: 1,
    //   iconName: 'ri-twitter-fill',
    //   name: 'Twitter',
    //   data: data['bm.branch_Soc_Twit'],
    // },
    {
      id: 1,
      iconName: R.images.instagram_logo,
      name: 'Instagram',
      data: data.instagram_link,
    },
  ];

  const handleNavigate = () => {
    navigate('NewInternetScreen');
    setShowLoader(false);
  };
  const webViewRef = useRef();

  function internetCheck() {
    checkInternetStatus().then((isWorking) => {
      setIsInternetWorking(isWorking);
      if (!isWorking) {
        handleNavigate();
      } else {
        setShowLoader(false);
      }
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      internetCheck();
      webViewRef?.current?.reload();
    }, []),
  );

  const renderFacebookWebView = () => {
    return facebookUrl.includes('https://www.facebook.com') ? (
      <WebView
        ref={(ref) => (webViewRef.current = ref)}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={{flex: 1}}>
            <ActivityIndicator
              size={'large'}
              color={R.themes.boxBackgroundColour}
            />
          </View>
        )}
        source={{
          html: `<iframe src="https://www.facebook.com/plugins/page.php?href=${facebookUrl}&locale=en_US&tabs=timeline&width=340&height=600&small_header=true&adapt_container_width=false&hide_cover=false&show_facepile=false&appId=2271038246560184" width="340" height="600" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`,
        }}
        onError={(syntheticEvent) => {
          const {nativeEvent} = syntheticEvent;
          internetCheck();
        }}
        style={{
          height: '100%',
          width: R.dimensions.wp(275),
        }}
      />
    ) : (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: R.themes.boxBackgroundColour, fontSize: 20}}>
          Currenlty Not Available
        </Text>
      </View>
    );
  };
  // const rendeTwitterWebView = () => {
  //   return (
  //     <WebView
  //       startInLoadingState={true}
  //       renderLoading={() => (
  //         <View style={{flex: 1}}>
  //           <ActivityIndicator size={'large'} color="#db4712" />
  //         </View>
  //       )}
  //       source={{
  //         html: `<a class="twitter-timeline" data-lang="en" data-theme="light" href=${twitterUrl}>Tweets by TwitterDev</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
  //       }}
  //       style={{
  //         marginTop: 10,
  //         height: '100%',
  //         width: '100%',
  //       }}
  //     />
  //   );
  // };
  const renderInstagramWebView = () => {
    return instagramUrl.includes('https://www.instagram.com') ? (
      <WebView
        ref={(ref) => (webViewRef.current = ref)}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={{flex: 1, justifyContent: 'center'}}>
            {/* <ActivityIndicator
              size={'large'}
              color={R.themes.boxBackgroundColour}
            /> */}
            <Image
              source={R.images.loaderNexus}
              style={{width: 50, height: 50}}
            />
          </View>
        )}
        injectedJavaScript={
          'function removeHeader(){header=document.getElementsByClassName("NXc7H  f11OC X6gVd"),header[0].parentNode.removeChild(header[0])}function removeFooter(){footer=document.getElementsByClassName("_8Rna9 _09ncq  pC2e0 GhZ_W"),footer[0].parentNode.removeChild(footer[0])}removeHeader(),removeFooter();document.addEventListener("scroll",function(e){document.getElementsByTagName("body")[0].style="overflow:scroll",body=document.getElementsByClassName("RnEpo   _Yhr4     "),body[0].parentNode.removeChild(body[0])},!0);'
        }
        onError={(syntheticEvent) => {
          const {nativeEvent} = syntheticEvent;
          internetCheck();
        }}
        style={{width: '100%', height: '100%'}}
        source={{uri: instagramUrl}}
      />
    ) : (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: R.themes.boxBackgroundColour, fontSize: 20}}>
          Currenlty Not Available
        </Text>
      </View>
    );
  };
  const renderFeed = () => {
    switch (CurrentSelection) {
      case 0:
        return renderFacebookWebView();
      // case 1:
      //   return rendeTwitterWebView();
      case 1:
        return renderInstagramWebView();
    }
  };

  return (
    <>
      <BackHeader navigation={navigation} />
      <SubHeader title={'Social Feeds'} />
      <RootView>
        <View style={styles.headerView}>
          {headerSocialData.map((item, index) => {
            return (
              item.data != null && (
                <TouchableOpacity
                  onPress={() => [internetCheck(), setCurrentSelection(index)]}
                  style={[
                    styles.iconStyle,
                    {
                      borderBottomColor:
                        CurrentSelection === index
                          ? R.themes.boxBackgroundColour
                          : R.colors.grey,
                      backgroundColor:
                        CurrentSelection === index
                          ? R.themes.darkCardBackgroundColor
                          : R.themes.backgroundColor,
                    },
                  ]}
                >
                  <Image
                    source={item.iconName}
                    resizeMode={'contain'}
                    style={{
                      height: R.dimensions.hp('5%'),
                      width: R.dimensions.wp('5%'),
                      tintColor:
                        CurrentSelection === index
                          ? R.themes.lightCardBackgroundColor
                          : R.colors.grey,
                    }}
                  />
                  {/* <Icon
                    name={item.iconName}
                    size="31"
                    color={
                      CurrentSelection === index
                        ? R.themes.bannerBackgroundColour
                        : R.colors.grey
                    }
                  /> */}
                </TouchableOpacity>
              )
            );
          })}
        </View>
        <View style={{flex: 8}}>{renderFeed()}</View>
      </RootView>
    </>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flex: 0.75,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    flex: 1,
    alignItems: 'center',
    //  / paddingBottom: '2%',
    borderBottomWidth: 2,
  },
});
