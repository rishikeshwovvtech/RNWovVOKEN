import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Modal,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-remix-icon';
import CheckBox from '@react-native-community/checkbox';
//local import
import {firebase} from '@react-native-firebase/database';

import styles from './EditProfileStyle';
import {
  RootView,
  ProfileTextInput,
  BackHeader,
  SimpleButton,
  Loader,
  CModalForProfile,
} from '../../../components/index';
import R from '../../../R';
import {AuthContext} from '../../../context/auth/AuthContext';
import {
  TENANT_ID,
  AUTH_BASE_URL,
  IMAGE_CDN_URL,
  IS_CDN,
} from '../../../utils/Constants';

import {dimensions} from '../../../../res/dimensions';
import DatePicker from 'react-native-date-picker';
import {CEditModal} from './CEditModal';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import {useFocusEffect} from '@react-navigation/native';
import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';
import SubHeader from '../../../components/SubHeader';

export const EditProfile = ({navigation}) => {
  const {authState, authAction} = useContext(AuthContext);

  var userDOA =
    authState?.userObject?.data?.userDOA != null &&
    authState?.userObject?.data?.userDOA != 'null'
      ? formatDate(authState?.userObject?.data?.userDOA, 'data from DOA')
      : authState?.userObject?.data?.userDOA;
  var userGender = authState?.userObject?.data?.userGender;
  var birthDate =
    (authState?.userObject?.birthDate != 'null' &&
      authState?.userObject?.birthDate != null) ||
    (authState?.userObject?.data?.birthDate != null &&
      authState?.userObject?.data?.birthDate != 'null')
      ? formatDate(
          authState?.userObject?.birthDate == null
            ? authState?.userObject?.data?.birthDate
            : authState?.userObject?.birthDate,
          'data from DOb',
        )
      : authState?.userObject?.birthDate == null ||
        authState?.userObject?.birthDate == 'null'
      ? authState?.userObject?.data?.birthDate
      : authState?.userObject?.birthDate;

  var fullName = authState?.userObject?.fullName;
  var email = authState?.userObject?.email;
  var phoneNumber = authState?.userObject?.mobilePhone;

  function formatDate(input, data) {
    var datePart = input.match(/\d+/g),
      year = datePart[0], // get only two digits
      month = datePart[1],
      day = datePart[2];
    return day + '-' + month + '-' + year;
  }
  const [name, setName] = useState(fullName);
  const [ShowLoader, setShowLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMaleSelected, setMaleSelection] = useState(false);
  const [isFemealeSelected, setFemaleSelection] = useState(false);
  const [isOtherSelected, setOtherSelection] = useState(false);
  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [ErrorModalMessage, setErrorModalMessage] = useState(null);
  const [ShowErrorModalCamera, setShowErrorModalCamera] = useState(false);
  const [ErrorModalMessageCamera, setErrorModalMessageCamera] = useState(null);
  const [genderSelecteddata, setGenderSelected] = useState(null);
  const [ShowCEditModal, setCEditModal] = useState(false);
  const [isEditName, setisEditName] = useState(true);
  const [Updatedpoints, setUpdatedpoints] = useState(0);
  const [date, setDate] = useState(new Date('2020-01-01'));
  const [open, setOpen] = useState(false);
  const [Adate, setADate] = useState(new Date('2020-01-01'));
  const [Aopen, setAOpen] = useState(false);
  const [newDate, setnewDate] = useState(null);
  const [AnewDate, setAnewDate] = useState(null);
  const [apinewDate, setapinewDate] = useState(null);
  const [apiAnewDate, setapiAnewDate] = useState(null);
  const [gendereditable, setgendereditable] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // getDatabaseValue();

      ScreenAnalytics('Edit_Profile', authState?.userToken, authState?.userId)
        .then((res) => {})
        .catch((e) => {});

      return () => {};
    }, []),
  );

  useEffect(() => {
    if (
      userGender != 'null' &&
      userGender != 'undefined' &&
      userGender != null &&
      userGender != undefined
    ) {
      setgendereditable(true);
      if (userGender == 0) {
        setFemaleSelection(true);
      } else if (userGender == 1) {
        setMaleSelection(true);
      } else if (userGender == 2) {
        setOtherSelection(true);
      }
    }

    return () => {};
  }, []);

  /////////////// update user info /////////

  const newupdateProfile = () => {
    if (
      apinewDate != null &&
      !isOlderThanAgeRestriction(newDate, ageristriction)
    ) {
      setErrorModalMessage(
        'Please enter a valid date of birth. You must be 18 years or above to register on NexusOne App !!',
      ),
        setShowErrorModal(true);
    } else {
      var email = (authState?.userObject?.email).toString();
      var partyDOB = apinewDate != null ? apinewDate.toString() : 'null';
      var partyAnniversary =
        apiAnewDate != null ? apiAnewDate.toString() : 'null';
      var genderSelected =
        genderSelecteddata != null ? genderSelecteddata.toString() : 'null';
      var username = name != null ? name.toString() : '';

      var data = JSON.stringify({
        emailid: email,
        branchCode: authState?.mallDetails?.oko_Row_Code.toString(),
        Id: authState.PartyCode.toString() || authState.partyCode.toString(),
        MobNo: phoneNumber,
        partyDOB: partyDOB,
        partyAnniversary: partyAnniversary,
        partyGender: genderSelected,
        partyName: username,
        signUp: '0',
        pageUrl: 'AddingPointsV2',
      });
      console.log('🚀 ~ EditProfile.js:169 ~ newupdateProfile ~ data:', data);

      setShowLoader(true);
      var config = {
        method: 'post',
        url: `${AUTH_BASE_URL}/ipos/rest/fusionAuth/AddingPointsV2?tenantId=_${TENANT_ID}`,
        headers: {
          access_Token: authState.userToken,
          userid: authState.userId,
          'Content-Type': 'application/json',
          pageUrl: 'AddingPointsV2',
          event: 'EditProfileScreen',
          action: 'onClickSave',
        },
        data: data,
      };
      setShowLoader(true);
      fetchApiService(config, authAction, authState)
        .then(async function (response) {
          console.log('🚀 ~ EditProfile.js:187 ~ response:', response);
          setShowLoader(false);
          //console.log("edit profile response ",response);
          //console.log("edit profile response?.data ",response?.data);

          if (response?.data?.[0] == 'User updated successfully....') {
            let userInfo = {
              ...authState,
              userObject: response?.data?.user?.user,
            };
            if (response?.data?.user?.user) {
              await authAction.setData(userInfo);

              if (response?.data?.dwg_point) {
                setUpdatedpoints(response?.data?.dwg_point),
                  setisEditName(false),
                  setCEditModal(true);
              } else {
                setisEditName(true), setCEditModal(true);
              }
            }
          } else if (response?.data?.['5001'] == 'User Already updated ....') {
            setErrorModalMessage(response?.data?.['5001']);
            setShowErrorModal(true);
          }
        })
        .catch(function (error) {
          console.log('edit profile error ', error);
          setShowLoader(false);
        });
    }
  };

  /////////////// end update user info /////////
  ///////////////////// update profile flow ///////////////
  const gotoPickImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
      multiple: false,
      compressImageQuality: 0.9,
      cropperActiveWidgetColor: R.themes.boxBackgroundColour,
    })
      .then((image) => {
        try {
          apiEditProfile('data:image/png;base64,' + image.data, image.mime);
        } catch (error) {}
        setVisible(false);
      })
      .catch((e) => {
        setShowErrorModal(true), setErrorModalMessage(e.toString());
      });
  };
  const gotoCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
      multiple: false,
      compressImageQuality: 0.9,
    })
      .then((image) => {
        try {
          apiEditProfile('data:image/png;base64,' + image.data, image.mime);
        } catch (error) {
          console.log('🚀 ~ EditProfile.js:255 ~ .then ~ error:', error);
        }
        setVisible(false);
      })
      .catch((e) => {
        console.log('🚀 ~ EditProfile.js:260 ~ gotoCamera ~ e:', e);
        setShowErrorModalCamera(true), setErrorModalMessageCamera(e.toString());
      });
  };
  const apiEditProfile = (base64, type) => {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const data = JSON.stringify({
      action: IS_CDN ? 'payload' : 'payloadRuleWithTid',
      pageUrl: IS_CDN ? 'saveProfileImageV2' : 'saveProfileImage',
      entityName: 'Party_Head_MsT',
      event: IS_CDN ? 'replaceWithAuth' : 'JR_566',
      formList: [
        {
          tenantId: TENANT_ID,
          image_data_Json: [
            {
              name: `${result}.${type.split('/')[1]}`,
              type: type,
              folderName: 'Profile_Image',
              content: base64,
            },
          ],
          userId: (authState?.userId).toString(),
          Branch_Code: authState?.mallDetails?.oko_Row_Code,
          fusionauthUserId: (authState?.userObject?.id).toString(),
          setFields: [
            {
              name: 'party_User_Code_Updt',
              value: '897738268503676',
            },
            {
              name: 'party_Thumnil',
              value: '',
            },
            {
              name: 'party_TS_Edited',
              value: '',
            },
          ],
        },
      ],
    });

    const config = {
      method: 'post',
      url: IS_CDN
        ? `${AUTH_BASE_URL}/ipos/rest/fusionAuth/profileImageCDN?tenantId=_${TENANT_ID}`
        : `${AUTH_BASE_URL}/ipos/rest/fusionAuth/profileImage?tenantId=_${TENANT_ID}`,
      headers: {
        access_Token: authState?.userToken,
        userid: authState?.userId,
        'Content-Type': 'application/json',
        pageUrl: 'profileImageCDN',
        event: 'EditProfileScreen',
        action: 'onLoad',
      },

      data: data,
    };
    setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then(async (response) => {
        console.log('🚀 ~ EditProfile.js:331 ~ .then ~ response:', response);
        setShowLoader(false);
        let userInfo = {
          ...authState,
          userObject: response.data.data,
        };
        await authAction.setData(userInfo);
        navigation.goBack();
      })
      .catch((error) => {
        console.log('🚀 ~ EditProfile.js:340 ~ apiEditProfile ~ error:', error);
        setShowLoader(false);
      });
  };

  const renderModal = () => {
    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType={'slide'}
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1}}
          onPress={() => setVisible(false)}
        />
        <View
          style={{
            backgroundColor: 'white',
            paddingTop: 12,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '30%',
          }}
        >
          <View
            style={{
              width: 70,
              height: 10,
              backgroundColor: 'gray',
              marginLeft: '42%',
              borderRadius: 10,
            }}
          />

          <View style={{marginTop: 40}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <TouchableOpacity onPress={gotoCamera} style={{margin: '5%'}}>
                <View
                  style={{
                    alignItems: 'center',
                    padding: '2%',
                  }}
                >
                  <Icon
                    name="ri-camera-fill"
                    size={R.dimensions.wp(10)}
                    color={R.themes.boxBackgroundColour}
                  />
                  <Text
                    style={{
                      color: R.themes.boxBackgroundColour,
                      marginTop: '5%',
                    }}
                  >
                    TAKE PICTURE
                  </Text>
                  <Text style={{color: R.themes.boxBackgroundColour}}>
                    FROM CAMERA
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={gotoPickImage} style={{margin: '5%'}}>
                <View style={{alignItems: 'center', padding: '2%'}}>
                  <Icon
                    name="ri-gallery-fill"
                    size={R.dimensions.wp(10)}
                    color={R.themes.boxBackgroundColour}
                  />
                  <Text
                    style={{
                      color: R.themes.boxBackgroundColour,
                      alignSelf: 'center',
                      marginTop: '5%',
                    }}
                  >
                    ADD FROM
                  </Text>
                  <Text
                    style={{
                      color: R.themes.boxBackgroundColour,
                      alignSelf: 'center',
                    }}
                  >
                    {' '}
                    GALLERY
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  ///////////////////// end update profile flow ///////////////
  ///////////////////////////// check box flow ////////////////////////
  const Selected_checkbox = (id) => {
    if (genderSelecteddata == 1) {
      setMaleSelection(false);
      setFemaleSelection(false);
      setOtherSelection(false);
      setGenderSelected('null');
    } else {
      setMaleSelection(true);
      setFemaleSelection(false);
      setOtherSelection(false);
      setGenderSelected(1);
    }
  };
  const Selected_Fcheckbox = (id) => {
    if (genderSelecteddata == 0) {
      setMaleSelection(false);
      setFemaleSelection(false);
      setOtherSelection(false);
      setGenderSelected('null');
    } else {
      setMaleSelection(false);
      setFemaleSelection(true);
      setOtherSelection(false);
      setGenderSelected(0);
    }
  };
  const Selected_Ocheckbox = (id) => {
    if (genderSelecteddata == 2) {
      setMaleSelection(false);
      setFemaleSelection(false);
      setOtherSelection(false);
      setGenderSelected('null');
    } else {
      setMaleSelection(false);
      setFemaleSelection(false);
      setOtherSelection(true);
      setGenderSelected(2);
    }
  };
  const Radio_Buttons_Design = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            height: 20,
            marginTop: 20,
            justifyContent: 'space-between',
            width: '80%',
            alignSelf: 'center',
            alignItems: 'flex-start',
          }}
        >
          <Text
            style={{
              color: R.themes.darkTextColor,
              fontFamily: R.fonts.primaryBold,
              fontSize: dimensions.h2,
              fontWeight: 'bold',
            }}
          >
            Gender
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 20,
            marginTop: 10,
            justifyContent: 'space-between',
            width: '80%',
            alignSelf: 'center',
            alignItems: 'center',
            zIndex: 2,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
            }}
          >
            <CheckBox
              disabled={gendereditable}
              value={isMaleSelected}
              onValueChange={Selected_checkbox}
              tintColors={{true: R.themes.darkTextColor}}
              onAnimationType={'fill'}
              offAnimationType={'fill'}
              onCheckColor={R.themes.darkTextColor}
              onTintColor={R.themes.darkTextColor}
              style={{height: 20, borderRadius: 12}}
            />

            <Text
              style={{
                start: -5,
                color: R.themes.darkTextColor,
                fontFamily: R.fonts.primaryRegular,
                fontSize: dimensions.h1,
              }}
            >
              Male
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
            }}
          >
            <CheckBox
              disabled={gendereditable}
              value={isFemealeSelected}
              onValueChange={Selected_Fcheckbox}
              tintColors={{true: R.themes.darkTextColor}}
              onAnimationType={'fill'}
              offAnimationType={'fill'}
              onCheckColor={R.themes.darkTextColor}
              onTintColor={R.themes.darkTextColor}
              style={{height: 20}}
            />

            <Text
              style={{
                start: -5,
                color: R.themes.darkTextColor,
                fontFamily: R.fonts.primaryRegular,
                fontSize: dimensions.h1,
              }}
            >
              Female
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
            }}
          >
            <CheckBox
              disabled={gendereditable}
              value={isOtherSelected}
              onValueChange={Selected_Ocheckbox}
              tintColors={{true: R.themes.darkTextColor}}
              onAnimationType={'fill'}
              offAnimationType={'fill'}
              onCheckColor={R.themes.darkTextColor}
              onTintColor={R.themes.darkTextColor}
              style={{height: 20}}
            />

            <Text
              style={{
                start: -5,
                color: R.themes.darkTextColor,
                fontFamily: R.fonts.primaryRegular,
                fontSize: dimensions.h1,
              }}
            >
              Others
            </Text>
          </View>
        </View>
      </>
    );
  };
  /////////////////////////// end of check box flow //////////////////////////

  //////////////// DOB And DOA /////////////////////
  const dateChangeFun = (date, type) => {
    var datee = date.getDate().toString().padStart(2, '0'); //Current Date
    var month = (date.getMonth() + 1).toString().padStart(2, '0'); //Current Month
    var year = date.getFullYear();
    if (type === 1) {
      setOpen(false);
      setDate(date);
      setnewDate(datee + '-' + month + '-' + year);
      setapinewDate(year + '-' + month + '-' + datee);
    } else {
      setAOpen(false);
      setADate(date);
      setAnewDate(datee + '-' + month + '-' + year);
      setapiAnewDate(year + '-' + month + '-' + datee);
    }
  };
  //////////////// end DOB And DOA /////////////////////

  //////////////// Age Validation code ///////////

  const getDatabaseValue = () => {
    setShowLoader(true);
    const database = firebase
      .app()
      .database('https://nexusone-5f77e-default-rtdb.firebaseio.com/');

    database
      .ref('nexusone')

      .once('value')
      .then((snapshot) => {
        setAgeristriction(snapshot.toJSON().appConfig.ageRestrictionValue);

        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  const [ageristriction, setAgeristriction] = useState(18);

  function isOlderThanAgeRestriction(dateOfBirth, ageRestriction) {
    let date_parts = dateOfBirth.split('-');
    let year = date_parts[2];
    let month = date_parts[1];
    let day = date_parts[0];
    const currentDate = new Date();
    // Calculate the age difference in years
    const ageDiff = currentDate.getFullYear() - year;
    // Check if the birthday has already occurred this year
    const hasBirthdayOccurred =
      currentDate.getMonth() + 1 > month ||
      (currentDate.getMonth() + 1 === month && currentDate.getDate() >= day);
    // Adjust the age difference if the birthday has not occurred yet this year
    const adjustedAgeDiff = hasBirthdayOccurred ? ageDiff : ageDiff - 1;
    // Compare the adjusted age difference with the age restriction
    return adjustedAgeDiff >= ageRestriction;
  }

  return (
    <>
      <BackHeader title={'Edit Profile'} navigation={navigation} />
      <SubHeader navigation={navigation} title={'Edit Profile'} />
      <RootView>
        <KeyboardAvoidingView
          style={styles.mainContainer}
          keyboardVerticalOffset={Platform.select({ios: 0, android: 5})}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView>
            {renderModal()}
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  height: R.dimensions.wp(40),
                  width: R.dimensions.wp(40),
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: R.themes.darkTextColor,
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: '5%',
                }}
              >
                <Image
                  resizeMode={'contain'}
                  source={
                    authState?.userObject?.imageUrl == '' ||
                    authState?.userObject?.imageUrl == null
                      ? R.images.defaultUser
                      : authState?.userObject?.imageUrl.includes(
                          'Profile_Image',
                        )
                      ? {
                          uri:
                            (IS_CDN ? IMAGE_CDN_URL : AUTH_BASE_URL) +
                            authState?.userObject?.imageUrl,
                        }
                      : {uri: authState?.userObject?.imageUrl}
                  }
                  style={{
                    height: R.dimensions.wp(40),
                    width: R.dimensions.wp(40),
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => setVisible(true)}
                style={styles.circleStyle}
              >
                <Image source={R.images.Camera} style={styles.cameraImage} />
              </TouchableOpacity>
            </View>

            <View style={styles.profileDetailsContainer}>
              <ProfileTextInput
                defaultValue={fullName}
                title="Name"
                editable={true}
                onChangeText={(text) => setName(text)}
                multiline={false}
              />

              <View style={styles.detailsView}>
                <ProfileTextInput
                  title="Email"
                  editable={false}
                  value={email}
                  multiline={true}
                />
              </View>

              <View style={styles.detailsView}>
                <ProfileTextInput
                  title="Phone Number"
                  editable={false}
                  defaultValue={phoneNumber}
                  multiline={false}
                />
              </View>

              <View style={{width: '76%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: R.themes.backgroundColor,
                    borderRadius: R.themes.theme == 'dark' ? 10 : null,
                    //paddingVertical: '5%',
                    width: dimensions.wp(80),
                    height: dimensions.hp(7),
                    marginVertical: '3%',
                    alignSelf: 'center',
                    alignItems: 'center',
                    borderColor: R.themes.darkTextColor,
                    borderWidth: R.themes.theme == 'dark' ? null : 1,
                  }}
                >
                  {birthDate != 'null' && birthDate != null ? (
                    <Text
                      style={{
                        color: R.colors.black,
                        width: ' 80%',
                        marginHorizontal: '10%',
                        start: -10,
                      }}
                    >
                      {birthDate}
                    </Text>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                        }}
                        onPress={() => [
                          setOpen(true),
                          // setshowDatePicker(!showDatePicker),
                        ]}
                      >
                        {newDate ? (
                          <Text
                            style={{
                              color: R.colors.black,
                              width: ' 80%',
                              marginHorizontal: '6%',
                            }}
                          >
                            {newDate}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: R.colors.black,
                              width: ' 80%',
                              marginHorizontal: '6%',
                            }}
                          >
                            Date of Birth
                          </Text>
                        )}

                        <Image
                          source={R.images.calender}
                          resizeMode="contain"
                          style={{
                            height: 23,
                            width: 23,

                            //end: 30,
                          }}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  width: '80%',
                  alignSelf: 'center',
                }}
              >
                {open ? (
                  <DatePicker
                    maximumDate={new Date()}
                    style={{
                      backgroundColor: R.themes.backgroundColor,
                      // borderColor: R.colors.darkviolet,
                    }}
                    dividerHeight={20}
                    androidVariant="nativeAndroid"
                    textColor={R.themes.darkCardBackgroundColor}
                    modal={true}
                    theme={'light'}
                    open={open}
                    mode="date"
                    date={date}
                    onConfirm={(date) => {
                      dateChangeFun(date, 1);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                ) : null}
              </View>

              <View style={{width: '76%', marginTop: '3%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: R.themes.backgroundColor,
                    marginVertical: '3%',
                    borderRadius: R.themes.theme == 'dark' ? 10 : null,
                    width: dimensions.wp(80),
                    height: dimensions.hp(7),
                    alignSelf: 'center',
                    alignItems: 'center',
                    borderColor: R.themes.darkTextColor,
                    borderWidth: R.themes.theme == 'dark' ? null : 1,
                  }}
                >
                  {userDOA != 'null' && userDOA != null ? (
                    <Text
                      style={{
                        color: R.colors.black,
                        width: ' 80%',
                        marginHorizontal: '10%',
                        start: -10,
                      }}
                    >
                      {userDOA}
                    </Text>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                        }}
                        onPress={() => [setAOpen(true)]}
                      >
                        {AnewDate ? (
                          <Text
                            style={{
                              color: R.colors.black,
                              width: ' 80%',
                              marginHorizontal: '6%',
                            }}
                          >
                            {AnewDate}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: R.colors.black,
                              width: ' 80%',
                              marginHorizontal: '6%',
                            }}
                          >
                            Anniversary Date (Optional)
                          </Text>
                        )}

                        <Image
                          source={R.images.calender}
                          resizeMode="contain"
                          style={{
                            height: 23,
                            width: 23,
                          }}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '80%',
                  alignSelf: 'center',
                }}
              >
                {Aopen ? (
                  <DatePicker
                    maximumDate={new Date()}
                    style={{
                      backgroundColor: R.themes.backgroundColor,
                    }}
                    dividerHeight={20}
                    androidVariant="nativeAndroid"
                    textColor={R.themes.darkCardBackgroundColor}
                    modal={true}
                    theme={'light'}
                    open={Aopen}
                    mode="date"
                    date={Adate}
                    onConfirm={(Adate) => {
                      dateChangeFun(Adate, 2);
                    }}
                    onCancel={() => {
                      setAOpen(false);
                    }}
                  />
                ) : null}
              </View>

              <Radio_Buttons_Design />
            </View>

            <View style={styles.buttonContainer}>
              <SimpleButton
                onPress={() => newupdateProfile()}
                title={'Save'}
                customTxtStyle={styles.buttontext}
                customStyle={styles.saveButton}
              />
            </View>
            {authState?.userObject?.data?.social != 'Active' && (
              <TouchableOpacity
                onPress={() => navigation.navigate('SetNewPassword')}
              >
                <Text style={styles.reset}>Change Password</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
        <Loader isVisible={ShowLoader} />
        <CModalForProfile
          isVisible={ShowErrorModal}
          modalMsg={ErrorModalMessage}
          onPressModal={() => setShowErrorModal(!ShowErrorModal)}
          isForm={'Signup'}
        />
        <CModalForProfile
          isVisible={ShowErrorModalCamera}
          modalMsg={ErrorModalMessageCamera}
          onPressModal={() => setShowErrorModalCamera(!ShowErrorModalCamera)}
          isForm={'Signup'}
        />
        <CEditModal
          isVisible={ShowCEditModal}
          isNameEdited={isEditName}
          userPoints={Updatedpoints}
          onPressModal={() => [
            setCEditModal(!ShowCEditModal),
            setisEditName(!isEditName),
            navigation.goBack(),
          ]}
        />
      </RootView>
    </>
  );
};
