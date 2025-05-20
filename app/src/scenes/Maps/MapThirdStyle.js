import {StyleSheet} from 'react-native';
import R from '../../R';
import scale from '../../utils/Scale';

export default StyleSheet.create({
    mainView: {
        flex:1,
        backgroundColor:R.colors.white
    },
    rootView:{
        height: scale(45),
        width: scale(400),
        backgroundColor: R.colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scale(10),
        paddingBottom: scale(25),
    },
    searchImage:{
        marginTop: scale(10),
        marginLeft: scale(10),
        width: scale(22),
        height: scale(22),
    },
    targetImage:{
        marginTop: scale(10),
        marginLeft: scale(10),
        width: scale(22),
        height: scale(22),
    },
    textInput:{
        borderBottomWidth:scale(0.8),
        borderBottomColor: R.colors.coolGrey,
        marginLeft: scale(10),
        width:'70%',
        height:scale(45)
    },
    view:{
        borderTopWidth: scale(0.3),
        borderTopColor:R.colors.coolGrey,
        marginTop: scale(15),
        alignItems: 'center',
    },
    touchableView:{
        borderBottomWidth:scale(0.3),
        borderBottomColor: R.colors.coolGrey,
        width: scale(320),
        paddingBottom:scale(5),
        flexDirection: 'row',
        marginTop:scale(10),
        justifyContent:'space-between'
    }

})
