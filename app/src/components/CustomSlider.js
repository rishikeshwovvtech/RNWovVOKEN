import React, {useState} from 'react';
import {StyleSheet, ImageBackground, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
//local iports
import R from '../R';
import {IMAGE_CDN_URL_TENANT_ID, IS_CDN, IMAGE_URL} from '../utils/Constants';
//TODO optmise the component
export const CustomSlider = ({
  data,

  isServerURL = true,
}) => {
  const [carouselActiveSlide, setCarouselActiveSlide] = useState(0);

  const renderItem = ({item}) => {
    return (
      <ImageBackground
        source={
          isServerURL
            ? {
                uri: (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) + `${item}`,
              }
            : item
        }
        //imageStyle={{borderRadius: 15}}
        style={styles.bImage}
        resizeMode={'stretch'}
      ></ImageBackground>
    );
  };
  return (
    <>
      <Carousel
        layout={'default'}
        data={data}
        sliderWidth={R.dimensions.wp('100%')}
        itemWidth={R.dimensions.wp('100%')}
        renderItem={renderItem}
        loop={true}
        autoplay={true}
        autoplayInterval={5000}
        onSnapToItem={(index) => setCarouselActiveSlide(index)}
      />
      <Pagination
        dotsLength={data?.length}
        activeDotIndex={carouselActiveSlide}
        containerStyle={{
          marginTop: '-5%',
        }}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={{
          backgroundColor: R.themes.boxBackgroundColour,
        }}
        inactiveDotOpacity={0.6}
      />
    </>
  );
};
const styles = StyleSheet.create({
  bImage: {
    alignSelf: 'center',
    height: R.dimensions.hp('28%'),
    width: R.dimensions.wp('100%'),
    //borderRadius: 30,
    //  / marginTop: '1%',
  },
  mainImage: {
    alignSelf: 'center',
    height: R.dimensions.hp('28%'),
    width: R.dimensions.wp('100%'),
    //borderRadius: 30,
    marginTop: '1%',
  },
  dotStyle: {
    width: 10,
    height: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: R.colors.yellow,
  },
});
