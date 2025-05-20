import React, {Component} from 'react';
import Location from '../../components/LocationComponent';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import styles from './EventScreenSecondStyle';
import R from '../../R';
import scale from '../../utils/Scale';
import SimpleButton from '../../components/SimpleButton';
import Accordion from 'react-native-collapsible/Accordion';
export default class EventScreenSecond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showView: true,
      switchArrow: false,
      hide: false,
      activeSections: [],
      spaceSections: [],
    };
  }

  _renderHeader = (section, index, isActive) => {
    return (
      <View style={styles.moreText}>
        <Text style={styles.moreT}>{section.title}</Text>
        {!isActive && (
          <Image style={styles.arrowV} source={R.images.BottomArrow} />
        )}
        {isActive && <Image style={styles.arrowV} source={R.images.Arrow} />}
      </View>
    );
  };

  _customHeader = (section, index, isActive) => {
    return (
      <View style={styles.moreText}>
        <Text style={styles.moreT}>{section.title}</Text>
        {!isActive && (
          <Image style={styles.arrowV} source={R.images.BottomArrow} />
        )}
        {isActive && <Image style={styles.arrowV} source={R.images.Arrow} />}
      </View>
    );
  };

  _renderContent = (section) => {
    return (
      <View>
        <View style={styles.commonV}>
          <Image source={R.images.Music} style={styles.logoView} />
          <Text style={styles.commText}>Bollywood, Indianpop</Text>
        </View>

        <View style={styles.commonV}>
          <Image source={R.images.Translate} style={styles.logoView} />
          <Text style={styles.commText}>Hindi , English</Text>
        </View>

        <View style={styles.commonV}>
          <Image source={R.images.Avatar} style={styles.logoView} />
          <Text style={styles.commText}>18+</Text>
        </View>

        <View style={styles.commonV}>
          <Image source={R.images.OnlineStream} style={styles.logoView} />
          <Text style={styles.commText}>Online Streaming</Text>
        </View>
      </View>
    );
  };

  _customContent = (section) => {
    return (
      <View>
        <Text style={styles.text}>{section.contentFirst}</Text>

        <Text style={styles.text}>{section.contentSecond}</Text>
      </View>
    );
  };

  _updateSections = (activeSections) => {
    this.setState({activeSections});
  };

  _updateSpaces = (spaceSections) => {
    this.setState({spaceSections});
  };

  render() {
    const SECTIONS = [
      {
        title: 'More Information',
      },
    ];

    const SPACES = [
      {
        title: 'About',
        contentFirst:
          'Are you a Music fan Are you a Music fan Are you a Music fan',
        contentSecond:
          'Are you a Music fan Are you a Music fan  Are you a Music fan',
      },
      {
        title: 'Benefits',
        contentFirst: 'Benefits \n Benefits Benefits Benefits Benefits',
        contentSecond: 'Benefits Benefits Benefits Benefits',
      },
      {
        title: 'FAQ "s',
        contentFirst: 'FAQ \n \n FAQ FAQ FAQ FAQ',
        contentSecond: 'FAQ FAQ',
      },

      {
        title: 'Terms & Conditions',
        contentFirst: 'Terms & Conditions',
        contentSecond: 'Terms & Conditions',
      },
    ];

    return (
      <View style={styles.mainView}>
        <ScrollView>
          <Location
            imgRight={R.images.TargetLocation}
            imgLeft={R.images.Location}
            placeholder={'Navi Mumbai'}
            placeholderTextColor={R.colors.black}
            title={'Change'}
            onPress={() => this.toggleModal()}
          />

          <Image source={R.images.SGC_Events} style={styles.SGC_Events} />

          <TouchableOpacity style={styles.opacityView}>
            <Text style={styles.musictext}>Music Show</Text>
          </TouchableOpacity>

          <Text style={styles.insideView}>Famous Music Event-2020</Text>

          <View style={styles.initialView}>
            <Image source={R.images.Calender} style={styles.calImg} />

            <Text style={styles.datetext}>On May 31,2020 IST</Text>

            <Image source={R.images.Clock} style={styles.clockV} />

            <Text style={styles.timetext}>08:00 - 11:00 PM</Text>
          </View>

          <Accordion
            sections={SECTIONS}
            activeSections={this.state.activeSections}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
          />

          <Image
            source={R.images.SGC_Events}
            style={{
              width: scale(380),
              height: scale(120),
              backgroundColor: 'red',
            }}
          />

          <Accordion
            sections={SPACES}
            activeSections={this.state.spaceSections}
            renderHeader={this._customHeader}
            renderContent={this._customContent}
            onChange={this._updateSpaces}
          />

          <View style={styles.twoView}>
            <Text style={styles.buttonView}>₹ 200</Text>

            <SimpleButton
              title="BOOK"
              onPress={() => this.props.navigation.navigate('EventScreenThird')}
              customStyle={styles.ButtonView}
              customTxtStyle={{color: R.colors.white, fontSize: scale(18)}}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}