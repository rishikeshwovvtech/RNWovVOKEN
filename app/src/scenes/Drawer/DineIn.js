import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
//local import
import {RootView, BackHeader, Loader} from '../../components/index';
import {DINE_IN_URL} from '../../utils/Constants';

export const DineIn = ({navigation}) => {
  const [ShowLoader, setShowLoader] = useState(false);

  const handleSubmit = () => {
    setShowLoader(true);
    closeLoaderIn5Seconds();
  };

  const closeLoaderIn5Seconds = () => {
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
  };
  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <>
      <BackHeader navigation={navigation} title={'#SafeMealsAtElante'} />
      <RootView>
        <Loader isVisible={ShowLoader} />
        <WebView source={{uri: DINE_IN_URL}} />
      </RootView>
    </>
  );
};
