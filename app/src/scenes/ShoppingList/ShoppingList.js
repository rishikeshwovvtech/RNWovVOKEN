import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import scale from '../../utils/Scale';
import R from '../../R';
import CheckBox from 'react-native-check-box';
import SimpleButton from '../../components/SimpleButton';
import styles from './ShoppingListStyle';
import ChooseMall from '../../components/ChooseMall';
export default class ShoppingList extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: true,
    };
  }
  render() {
    return (
      <View style={styles.rootView}>

        <ChooseMall
          imgLeft={R.images.TargetLocation}
          placeholder={'Choose mall'}
          title="Change"
        />

        <ScrollView>
          <View style={styles.rootView}>
            <SimpleButton
              title="Create New Shopping List"
              customTxtStyle={styles.listCustomTextStyle}
              customStyle={styles.listCustomStyle}
            />

            <View style={styles.shoppingListFirstView}>
              <View style={styles.titleTextView}>
                <Text style={styles.title}>Shopping List 1</Text>
                <Text style={styles.dateTitle}>Last updated 20/5/2020</Text>
              </View>
              <Image source={R.images.Approve} style={styles.approveImage} />
              <Image source={R.images.Share} style={styles.shareImage} />
            </View>
            <View style={styles.childView}>
              <View style={styles.childContainer}>
                <View style={styles.titleTextView}>
                  <Text style={styles.title}>Shopping List 2</Text>
                  <Text style={styles.dateTitle}>Last updated 20/5/2020</Text>
                </View>
                <CheckBox
                  style={styles.checkBoxStyle}
                  onClick={() => {
                    this.setState({
                      isChecked: !this.state.isChecked,
                    });
                  }}
                  rightTextStyle={{color: R.colors.white}}
                  rightText={'Select All'}
                  isChecked={this.state.isChecked}
                  checkedImage={
                    <Image
                      source={R.images.Checkbox_Blank}
                      style={styles.checkBoxImage}
                    />
                  }
                  unCheckedImage={
                    <Image
                      source={R.images.Checkbox}
                      style={styles.checkBoxImage}
                    />
                  }
                />
                <Image source={R.images.Share} style={styles.shareImage} />
              </View>
              <View style={styles.newItemView}>
                <Image source={R.images.Add_1} style={styles.addImage} />
                <Text style={styles.addItemText}>Add new item</Text>
                <Image
                  source={R.images.ScanCode}
                  style={styles.scanCodeImage}
                />
                <Text style={styles.scanItemText}>Scan item</Text>
              </View>
              <View style={styles.container}>
                <View style={styles.view}>
                  <Image
                    source={R.images.Checkbox_Blank}
                    tintColor={R.colors.coolGrey}
                    style={styles.checkboxBlankImage}
                  />
                  <Text style={styles.text}>Clothing</Text>
                  <Image
                    source={R.images.DropDownarrow}
                    style={styles.dropDownarrowImage}
                  />

                  <Image
                    source={R.images.Delete}
                    style={styles.dropDownarrowImage}
                  />
                  <Image
                    source={R.images.ScanCode}
                    style={{
                      marginLeft: scale(75),
                      width: scale(18),
                      height: scale(18),
                      alignSelf: 'center',
                    }}
                  />
                  <Text style={styles.scanItemText}>Scan item</Text>
                </View>
                <View style={styles.firstTextView}>
                  <Image
                    source={R.images.Checkbox}
                    style={styles.checkboxImage}
                  />
                  <Text style={styles.checkboxText}>Jeans</Text>
                </View>
                <View style={styles.textView}>
                  <Image
                    source={R.images.Checkbox}
                    style={styles.checkboxImage}
                  />
                  <Text style={styles.checkboxText}>T-shirt</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: scale(30),
                    marginTop: scale(10),
                  }}>
                  <Image
                    source={R.images.Checkbox}
                    style={styles.checkboxImage}
                  />
                  <Text style={styles.checkboxText}>Cap</Text>
                </View>
              </View>
              <View style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={R.images.Checkbox_Blank}
                    tintColor={R.colors.coolGrey}
                    style={styles.checkboxBlankImage}
                  />
                  <Text style={styles.text}>Food & Beverages</Text>
                  <Image
                    source={R.images.DropDownarrow}
                    style={styles.dropDownarrowImage}
                  />
                  <Image
                    source={R.images.Delete}
                    style={styles.dropDownarrowImage}
                  />
                  <Image
                    source={R.images.ScanCode}
                    style={{
                      marginLeft: scale(20),
                      width: scale(18),
                      height: scale(18),
                      alignSelf: 'center',
                    }}
                  />
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: scale(14),
                      marginLeft: scale(10),
                      color: R.colors.black,
                    }}>
                    Scan item
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: scale(30),
                    marginTop: scale(20),
                  }}>
                  <Image
                    source={R.images.Checkbox_Blank}
                    tintColor={R.colors.coolGrey}
                    style={styles.checkboxImage}
                  />
                  <Text style={styles.checkboxText}>Apple</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: scale(30),
                    marginTop: scale(10),
                  }}>
                  <Image
                    source={R.images.Checkbox_Blank}
                    tintColor={R.colors.coolGrey}
                    style={styles.checkboxImage}
                  />
                  <Text style={styles.checkboxText}>Banana</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: scale(30),
                    marginTop: scale(10),
                  }}>
                  <Image
                    source={R.images.Checkbox_Blank}
                    tintColor={R.colors.coolGrey}
                    style={styles.checkboxImage}
                  />
                  <Text style={styles.checkboxText}>Frooti</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: scale(30),
                    marginTop: scale(10),
                  }}>
                  <Image
                    source={R.images.Checkbox_Blank}
                    tintColor={R.colors.coolGrey}
                    style={styles.checkboxImage}
                  />
                  <Text style={styles.checkboxText}>Amul shakti milk</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: scale(30),
                    marginTop: scale(10),
                  }}>
                  <Image
                    source={R.images.Checkbox_Blank}
                    tintColor={R.colors.coolGrey}
                    style={styles.checkboxImage}
                  />
                  <Text style={styles.checkboxText}>Tomato</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
