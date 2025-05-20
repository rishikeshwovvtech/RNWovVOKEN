import {StyleSheet} from 'react-native';
//local import
import R from '../../../R';

export default StyleSheet.create({
  profileinfobox: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
  },
  profileDetailsContainer: {
    flex: 2.2,
    marginHorizontal: '5%',
    marginVertical: '0%',
  },
  profileContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  silvrText: {
    fontSize: 14,
    fontFamily: R.fonts.primaryBold,
    color: '#EAC583',
  },
  name: {
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.hp('2.2%'),
    paddingTop: '7%',
    color: R.themes.accountTextColour,
  },
  emailText: {
    fontFamily: R.fonts.primaryRegular,
    fontSize: R.dimensions.hp('1.8%'),
    marginVertical: '2%',
    color: R.themes.accountTextColour,
  },
  detailsView: {
    marginVertical: '2.8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsView1: {
    marginVertical: '2.8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    marginBottom: '2.5%',
    justifyContent: 'space-between',
  },

  CardContainer: {
    flex: 0.8,
    alignItems: 'center',
    marginTop: '18%',
    margin: '5%',
    padding: '2%',
    backgroundColor: R.themes.backgroundColor,
    borderRadius: R.dimensions.hp('4%'),
    borderWidth: R.dimensions.hp('0.5%'),
    borderColor: R.themes.boxBackgroundColour,
  },

  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  reward: {
    marginVertical: '-2%',
  },

  rewardDetailContainer: {
    flexDirection: 'row',
    paddingRight: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rewardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: '2%',
    padding: '2%',
    borderRadius: R.dimensions.hp('5%'),
  },
  rewardCoin: {
    width: R.dimensions.hp('2.2%'),
    height: R.dimensions.hp('2.2%'),
    alignSelf: 'center',
  },

  profileContainer: {
    height: R.dimensions.wp(19),
    width: R.dimensions.wp(26),
    borderRadius: R.dimensions.hp('10%'),
    borderWidth: R.dimensions.hp('0.5%'),
    position: 'absolute',
    borderColor: R.colors.lightgrey,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: '5%',
  },
});
