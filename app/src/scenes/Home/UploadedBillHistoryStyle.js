import {StyleSheet,} from 'react-native';
import scale from '../../utils/Scale';
import R from '../../R';


export default StyleSheet.create({
    filterView: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: scale(35),
        marginTop: scale(15),
    },
    filterImage:{
        width: scale(25),
        height: scale(25),
    },
    filterText:{
        fontSize: 15,
        marginLeft: scale(10),
        color: R.colors.black,
    },
    cardView:{
        backgroundColor:R.colors.white,
        width: scale(330),
        height: scale(130),
        padding:scale(5),
        alignSelf: 'center',
        marginTop: scale(15),
        borderRadius: scale(12),
    },
    cardContainer:{
        flexDirection: 'row',
        marginLeft: scale(10),
        marginTop: scale(10),
    },
    view:{
        borderBottomColor:R.colors.coolGrey,
        borderBottomWidth:(0.3),
        paddingBottom:scale(5)
    },
    coinImage:{
        width: scale(20),
        height: scale(20),
    },
    text:{
        fontSize: scale(10),
        marginLeft: scale(30),
        color: R.colors.black,
    },
    billImage:{
        width: scale(70),
        marginLeft: scale(50),
        height: scale(70),
    },
    billText:{
        fontSize: scale(10),
        marginLeft: scale(10),
        color: R.colors.coolGrey,
        opacity:scale(0.5),
    },
    customTxtStyle:{
        fontSize:scale(10),
       // fontWeight:'bold',
        color:R.colors.white
    }

});
