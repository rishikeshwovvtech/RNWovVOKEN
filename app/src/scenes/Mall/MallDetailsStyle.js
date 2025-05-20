import {StyleSheet} from 'react-native';
import scale from '../../utils/Scale';
import R from '../../R';


export default StyleSheet.create({
    Home_screen_image:{
        height: scale(250),
        width: scale(375),
    },
    rate:{
        flexDirection: 'row',
        backgroundColor:R.colors.voilet,
        margin: scale(20),
        padding:scale(8),
        alignSelf: 'flex-end',
        borderRadius:scale(4)
    },
    rateText:{
        fontSize: scale(12),
        fontWeight:'bold',
        marginLeft: scale(5),
        color: R.colors.white,marginRight: scale(5),
    },
    rateImage:{
        width: scale(14),
        height: scale(14),
    },
    locationImage:{
        marginLeft: scale(10),
        width: scale(22),
        height: scale(22),
    },
    locationText:{
        fontSize: scale(12),
        marginLeft: scale(5),
        color: R.colors.black,
    },
    heartImage:{
        marginLeft: scale(50),
        width: scale(20),
        height: scale(20),
    },
    viewContainer:{
        flexDirection: 'row',
        marginTop: scale(20),
        marginBottom: scale(20)
    },
    childContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: scale(10),
        marginRight: scale(10),
    },
    containerView:{
        backgroundColor: R.colors.white,
        width: scale(100),
        height: scale(25),
        borderRadius: scale(18),
    },
    containerImage:{
        width: scale(14),
        height: scale(14),
        alignSelf: 'center',
        marginLeft: scale(5),
    },
    containerText:{
        fontSize: scale(10),
        color: R.colors.black,
        marginLeft: scale(5),
        opacity: scale(1),
        marginRight: scale(5),
    },
    container:{
        flexDirection: 'row',
        width: scale(100),
        height: scale(25),
        borderRadius: scale(18),
        justifyContent: 'center',
        backgroundColor: R.colors.voilet,
        padding: scale(5),
    },
    rightTickImage:{
        width: scale(12),
        height: scale(12),
        alignSelf: 'center',
    },
    childView:{
        height: scale(65),
        margin:scale(20),
        borderRadius:scale(15),
        width: scale(340),
        backgroundColor:R.colors.white,
        flexDirection: 'row',
        justifyContent:'space-around'
    },
    childViewImage:{
        height: scale(25),
        alignSelf: 'center',
        width: scale(25),
        marginTop: scale(10)
    },
    childViewText:{
        fontSize: scale(10),
        alignSelf: 'center',
        justifyContent:'center',
        marginBottom: scale(10),
        color: R.colors.black,
        marginTop: scale(2)
    },
    interestView:{
        marginLeft: scale(10),
        width: scale(80),
        borderRadius:scale(10),
        height: scale(80),
        alignSelf: 'center',
        marginTop: scale(15),
        backgroundColor:R.colors.white
    },
    interestImage:{
        alignSelf: 'center',
        margin: scale(10),
        width: scale(60),
        height: scale(60),
    },
    interestText:{
        fontSize: scale(10),
        fontWeight:'bold',
        marginTop: scale(5),
        alignSelf: 'center',
        color: R.colors.black,
    },
    hightlightView:{
        backgroundColor:R.colors.pink,
        width: scale(60),
        height: scale(20),
        position: 'absolute',
        bottom: 0,
        borderTopRightRadius:scale(18),
    },
    hightlightText:{
        fontSize: scale(10),
        fontWeight:'bold',
        alignSelf: 'center',
        marginLeft: scale(10),
        marginTop: scale(5),
        color: R.colors.white,
    },
    offercontainer:{
        marginTop: scale(20),
        borderBottomWidth: scale(0.3),
        borderBottomColor: R.colors.coolGrey,
        paddingBottom: scale(10),
    },
    offerText:{
        fontSize: scale(10),
        alignSelf: 'center',
        color: R.colors.coolGrey,
    },
    view:{
        flexDirection: 'row',
        marginTop: scale(30),
        marginBottom: scale(10),
    },
    viewTitle:{
        fontSize: scale(16),
        fontWeight: 'bold',
        marginLeft: scale(15),
        color: R.colors.black,
    },
    ratingView:{
        flexDirection: 'row',
        backgroundColor: R.colors.voilet,
        marginLeft: scale(20),
        padding: scale(3),
        alignSelf: 'flex-end',
        borderRadius: scale(4),
    },
    viewText:{
        fontSize: scale(10),
        alignSelf: 'center',
        color: R.colors.coolGrey,
        marginLeft: scale(5),
    },
    dropDownImage:{
        width: scale(14),
        height: scale(14),
        marginLeft: scale(130),
    },
    Starview:{
        flexDirection: 'row',
        marginLeft: scale(20),
        marginRight: scale(20),
        borderBottomWidth: scale(0.3),
        borderBottomColor: R.colors.coolGrey,
        paddingBottom: scale(10),
    },
    StarImage:{
        marginLeft: scale(10),
        width: scale(30),
        height: scale(30),
    },
    reviewImage:{
        width: scale(22),
        height: scale(21),
        marginLeft: scale(21),
        alignSelf: 'center',
    },
    customTxtStyle:{
        fontSize: scale(10),
        color: R.colors.white,
        opacity: scale(1),
    },
    customStyle:{
        marginLeft: scale(80),
        backgroundColor: R.colors.voilet,
        alignSelf: 'center',
        width: scale(60),
        height: scale(20),
    },
    dropDownarrow:{
        width: scale(14),
        height: scale(14),
        marginLeft: scale(10),
        alignSelf: 'center',
    },
    reviewstyle:{
        alignSelf: 'center',
        height: scale(45),
        width: '95%',
        borderBottomWidth: scale(0.8),
        borderBottomColor: R.colors.voilet,
        color: R.colors.voilet,
        fontSize: scale(15),
    },
    avatar:{
        width: scale(25),
        height: scale(25),
        marginLeft: scale(21),
        alignSelf: 'center',
    },
    name:{
        fontSize: scale(14),
        color: R.colors.black,
        fontWeight: 'bold',
    },
    text:{
        color: R.colors.coolGrey,
        fontSize: scale(10),
        opacity: 0.4,
    },
    detailText:{
        fontSize: scale(10),
        marginTop: scale(5),
        margin: scale(15),
        alignSelf: 'center',
        color: R.colors.coolGrey,
    }

});
