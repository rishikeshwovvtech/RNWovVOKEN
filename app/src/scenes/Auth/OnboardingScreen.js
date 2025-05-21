import React, {useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
//local import
import R from '../../R';
import {ScreenAnalytics} from '../../components/Analytics/ScreenAnalytics';
import {useFocusEffect} from '@react-navigation/native';
import RemixIcon from 'react-native-remix-icon';

const slides = [
  {
    image1: R.images.splash_One,
    image: R.images.splash_one,
  },
  {
    image1: R.images.splash_Two,
    image: R.images.splash_three,
  },
  {
    image: R.images.splash_two,
    image1: R.images.splash_Three,
  },
  // {
  //   image: R.images.splash_four,
  //   image1: R.images.splash_Four,
  // },
  {
    image1: R.images.splash_Four,
    image: R.images.splash_five,
  },
];

export const OnBoardingSceen = ({navigation}) => {
  const sliderRef = useRef(null);

  const renderItem = ({item}) => {
    return (
      //       <View  style={{backgroundColor: item.backgroundColor}}>

      // <Image
      //       resizeMode='contain'
      //       source={item.image} style={styles.imgBackground}>
      //         {/* <View style={styles.mainView}>
      //           <Text style={styles.headingText}>"{item.title}"</Text>
      //           <Text style={styles.subHeadingText}>{item.text}</Text>
      //         </View> */}
      //    </Image>
      //       </View>

      <ImageBackground source={item.image} style={styles.imgBackground}>
        {/* <View style={styles.mainView}>
           <Text style={styles.headingText}>"{item.title}"</Text>
           <Text style={styles.subHeadingText}>{item.text}</Text>
        

           
         </View> */}

        <Image
          resizeMode="contain"
          source={item.image1}
          style={{
            width: '95%',
            height: '95%',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        ></Image>
      </ImageBackground>
    );
  };

  const renderDoneButton = () => {
    return (
      <TouchableOpacity
        style={styles.buttonCircle}
        onPress={() => navigation.navigate('Login')}
      >
        <RemixIcon
          name={'ri-check-line'}
          size={R.dimensions.wp(5)}
          color={R.colors.primaryWhite}
        />
      </TouchableOpacity>
    );
  };
  const renderNextButton = () => {
    return (
      <TouchableOpacity disabled={true} style={styles.buttonCircle}>
        <RemixIcon
          name="ri-arrow-right-line"
          size={R.dimensions.wp(5)}
          color={R.colors.primaryWhite}
        />
      </TouchableOpacity>
    );
  };
  const renderSkipButton = () => {
    return (
      <TouchableOpacity
        style={styles.buttonCircle}
        onPress={() => navigation.navigate('Login')}
      >
        <RemixIcon
          name="ri-close-fill"
          size={R.dimensions.wp(5)}
          color={R.colors.primaryWhite}
        />
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      ScreenAnalytics('OnBoarding_Screen', '', '')
        .then((res) => {})
        .catch((e) => {});
    }, []),
  );

  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        dotStyle={{
          backgroundColor: R.colors.transparentWhite,
        }}
        activeDotStyle={{
          backgroundColor: R.themes.backgroundColor,
        }}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        renderSkipButton={renderSkipButton}
        showNextButton={true}
        showSkipButton={true}
        showDoneButton={true}
        ref={sliderRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  mainView: {
    backgroundColor: 'transparent',
    width: R.dimensions.wp(90),
    height: R.dimensions.wp(90),
    borderRadius: 300,
    borderWidth: 2,
    borderColor: R.themes.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
  },
  headingText: {
    paddingStart: '3%',
    paddingEnd: '3%',
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.hp(4.8),
    color: R.themes.backgroundColor,
    // marginEnd: '2%',
    // marginStart: '2%',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  subHeadingText: {
    paddingStart: '3%',
    paddingEnd: '3%',
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.hp(2),
    color: R.themes.backgroundColor,
    // marginEnd: '3%',
    // marginStart: '3%',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  buttonCircle: {
    width: R.dimensions.wp(10),
    height: R.dimensions.wp(10),
    backgroundColor: R.colors.modalBlack,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
