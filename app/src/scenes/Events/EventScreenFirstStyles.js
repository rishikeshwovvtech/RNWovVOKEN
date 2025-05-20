import {StyleSheet,} from 'react-native';
import scale from '../../utils/Scale';
import R from '../../R';
import React from 'react';


export default StyleSheet.create({
    modalView:{
        flex: 1,
        backgroundColor:R.colors.white,
        borderRadius:scale(15),
    },
    dayText:{
        alignSelf: 'center',
        fontWeight:'bold',
        paddingTop:scale(5),
        paddingBottom:scale(5),
    },
    notificationView:{
        borderTopWidth:scale(0.5),
        borderTopColor:R.colors.coolGrey,
        marginTop:scale(10),
        flexDirection: 'row',
        paddingTop:scale(20),
    },
    notificationHeadline:{
        fontWeight:'bold',
        fontSize:scale(14),
        color:R.colors.voilet
    },
    notificationMallName:{
        opacity: scale(0.5),
        fontSize: scale(11),
        marginTop:scale(2),
        color: R.colors.coolGrey,
    },
    notificationEventName:{
        marginTop:scale(2),
        fontSize: scale(11),
        fontWeight:'bold',
        color: R.colors.black,
    },
    dateTimeText:{
        marginTop:scale(2),
        fontSize: scale(8),
        color: R.colors.black,
    },
    time:{
        marginLeft:scale(12),
        opacity: scale(0.5),
        fontSize: scale(12),
        color: R.colors.coolGrey,
    },


    Home_screen_image: {
        height: scale(140),
        width: scale(375),
    },
    musicText: {
        fontSize: scale(18),
        fontWeight: 'bold', alignSelf: 'center',
        marginTop: scale(30),
        color: R.colors.white,
        opacity:scale(0.9),

    },
    mallText:{
        fontSize: scale(18),
        alignSelf: 'center',
        color: R.colors.white,
        opacity:scale(0.8),
        marginTop:scale(5),
    },
    container:{
        flexDirection: 'row',
        //justifyContent: 'space-around',
        marginLeft: scale(15),
        marginTop: scale(15),
    },
    customTxtStyle:{
        fontSize: scale(12),
        color: R.colors.white,
        opacity: scale(1),
    },
    customStyle:{
    backgroundColor: R.colors.coolGrey,
        alignSelf: 'center',
        width: scale(95),
        marginLeft: scale(15),
        height: scale(25),
},
    mallName:{
        marginTop: scale(10),
        fontSize: scale(10),
        fontWeight:'bold',
        color: R.colors.black,
    },
    mallAddress:{
        opacity: scale(0.5),
        fontSize: scale(8),
        color: R.colors.coolGrey,
    },
    dateText: {
        fontSize: scale(8),
        color: R.colors.pink,
    },
    priceText:{
        fontSize: scale(8),
        color: R.colors.coolGrey,
    },
    eventImage:{
     height: scale(200),
    width: scale(150),
    },

});

