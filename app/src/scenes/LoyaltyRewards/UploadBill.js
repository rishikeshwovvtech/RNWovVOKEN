import R from '../../R';
import React, {Component} from 'react';
import scale from '../../utils/Scale';
import {Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import styles from './UploadBillStyle';
import DatePicker from 'react-native-datepicker';

export default class UploadBill extends Component {
  constructor(props) {
    super(props);
    this.state = {date: '02-08-2020'};
  }

  fname = () => {
    const {value} = this.state;
    console.log('email is ' + value);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.insideView}>
          <View style={styles.bigView}>
            <Text style={styles.textView}>Upload Bill via</Text>
            <Image source={R.images.Camera} style={styles.logoImage} />
          </View>

          <View style={styles.upperView}>
            <Text style={{}}>Bill details will be entered automatically*</Text>

            <Text>on capture of photo</Text>
          </View>

          <View style={styles.smallView}>
            <Text style={styles.billText}>Bill Number</Text>

            <TextInput
              placeholder="  12345"
              style={styles.TextinputStyle}
              onChangeText={(value) => this.setState({value})}
            />
          </View>

          <View style={styles.smallView}>
            <Text style={styles.billText}>Store Name</Text>

            <TextInput
              placeholder="Spykar Jeans"
              style={styles.TextinputStyle}
              onChangeText={(value) => this.setState({value})}
            />
          </View>

          <View style={styles.smallView}>
            <Text style={styles.billText}>Bill Amount</Text>

            <TextInput
              placeholder="₹ 10,000"
              style={styles.TextinputStyle}
              onChangeText={(value) => this.setState({value})}
            />
          </View>
          <View style={styles.midView}>
            <Text style={styles.gstText}>Bill Amount should exclude GST</Text>
          </View>
          <View style={styles.smallView}>
            <Text style={styles.billText}>Bill Date</Text>

            <DatePicker
              style={{
                width: scale(220),
                height: scale(50),
                marginLeft: scale(25),
                color: 'red',
              }}
              date={this.state.date}
              mode="date"
              placeholder="selectDate"
              placeholderTextColor="red"
              format="DD-MM-YYYY"
              minDate="01-01-2020"
              maxDate="01-01-2025"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 5,
                  top: 4,
                },
                dateInput: {
                  borderColor: R.colors.grey,
                  borderWidth: scale(1),
                  borderRadius: scale(15),
                 // left: 5,
                  fontSize: 20,
                  color: R.colors.grey,
                  position: 'absolute',
                  width: 210,
                  height: scale(40),
                  paddingRight: 40,
                  //marginLeft: scale(5),
                  justifyContent: 'center',
                },
              }}
              onDateChange={(date) => {
                this.setState({date: date});
              }}
            />
          </View>

          <View style={styles.theView}>
            <TouchableOpacity style={styles.opacityView}
                              onPress={() => this.props.navigation.navigate('UploadedBillHistory')}>
              <Text style={styles.buttonView}>SUBMIT </Text>
            </TouchableOpacity>

            <Text style={styles.lastText}>
              * If any detail is missing the User needs to enter it manually.
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
