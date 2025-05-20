import {StyleSheet} from 'react-native';
import scale from '../../utils/Scale';
import R from '../../R';

export default StyleSheet.create({
    locationContainer: {
        height: scale(45),
        width: scale(400),
        backgroundColor:R.colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom:scale(10)
    },
    customTextStyle: {
        fontSize:scale(12),
        color:R.colors.white,
        opacity:scale(1),
    },
    targetLocationImage: {
        margin: scale(10),
        width: scale(22),
        height: scale(22)
    },
    customStyle: {
        marginLeft: scale(10),
        backgroundColor:R.colors.voilet,
        alignSelf: 'center',
        width:scale(70),
        height: scale(30),
        marginTop:scale(10),
    },
    rootView: {
        backgroundColor:R.colors.lightBlueGrey,
        flex:1
    },
    listCustomTextStyle: {
        fontSize:scale(13),
        color:R.colors.white,
        opacity:scale(1),
    },
    listCustomStyle: {
        marginLeft: scale(10),
        backgroundColor:R.colors.voilet,
        alignSelf: 'center',
        width:scale(220),
        height: scale(40),
        marginTop:scale(10),
    },
    shoppingListFirstView: {
        backgroundColor:R.colors.white,
        alignSelf: 'center',
        marginTop: scale(10),
        width:scale(345),
        height: 'auto',
        borderRadius:scale(8),
        flexDirection: 'row',
        padding:scale(5)
    },
    titleTextView: {
        marginLeft:scale(5),
        marginTop:scale(5)
    },
    title: {
        fontSize: scale(14),
        fontWeight:'bold',
        color: R.colors.black,
        marginRight: scale(10),
    },
    dateTitle: {
        alignSelf: 'center',
        fontSize: scale(10),
        color: R.colors.coolGrey,
        marginRight: scale(10),
    },
    approveImage: {
        width:scale(25),
        height: scale(25),
        marginLeft:scale(120),
        alignSelf: 'center',
    },

    shareImage: {
        width:scale(25),
        height: scale(25),
        marginLeft:scale(15)
        ,alignSelf: 'center',
    },
    // eslint-disable-next-line no-dupe-keys
    childView: {
        backgroundColor:R.colors.white,
        alignSelf: 'center',
        marginTop: scale(10),
        width:scale(345),
        height: 'auto',
        paddingBottom:scale(30)
    },
    childContainer: {
        flexDirection: 'row',
        padding:scale(5),
        borderBottomColor:R.colors.coolGrey,
        borderBottomWidth:scale(0.3),
        paddingBottom:scale(10),
        borderRadius:scale(8),
    },
    checkBoxStyle:{
        backgroundColor:R.colors.voilet,
        width:scale(120),
        height: scale(30),
        padding:scale(5),
        borderRadius:scale(22),
        marginLeft:scale(30),
        alignSelf: 'center',
        marginTop:scale(5)
    },
    checkBoxImage:{
        width:scale(15),
        height: scale(15),
        alignSelf: 'center',
        marginLeft:scale(5)
    },
    newItemView:{
        flexDirection: 'row',
        padding:scale(5),
        borderBottomColor:R.colors.coolGrey,
        borderBottomWidth:scale(0.3),
        marginTop:scale(10),
        borderRadius:scale(8),
        paddingBottom:scale(10),
    },
    addImage: {
        marginLeft:scale(10),
        width:scale(18),
        height: scale(18),
        alignSelf: 'center',
    },
    addItemText:{
        alignSelf: 'center',
        fontSize: scale(14), marginLeft:scale(10),
        color: R.colors.coolGrey,
    },
    scanCodeImage: {
        marginLeft:scale(90),
        width:scale(18),
        height: scale(18),
        alignSelf: 'center',
    },
    scanItemText:{
        alignSelf: 'center',
        fontSize: scale(12),
        marginLeft:scale(10),
        color: R.colors.black,
    },
    container:{
        padding:scale(5),
        borderBottomColor:R.colors.coolGrey,
        borderBottomWidth:scale(0.3),
        marginTop:scale(10),
        borderRadius:scale(8),
        paddingBottom:scale(10),
    },

    view: {
            flexDirection: 'row',
    },
    checkboxBlankImage:{
        marginLeft:scale(10),
        width:scale(18),
        height: scale(18),
        alignSelf: 'center',
    },
    text:{
        alignSelf: 'center',
        fontSize: scale(14),
        marginLeft:scale(10),
        color: R.colors.coolGrey,
    },
    dropDownarrowImage:{
        marginLeft:scale(5),
        width:scale(18),
        height: scale(18),
        alignSelf: 'center',
    },
    checkboxImage:{
        width:scale(18),
        height: scale(18),
        alignSelf: 'center',
    },
    checkboxText:{
        alignSelf: 'center',
        fontSize: scale(14),
        marginLeft:scale(10),
        color: R.colors.black,
    },
    firstTextView:{
        flexDirection: 'row',
        marginLeft:scale(30),
        marginTop:scale(20),
    },
    textView:{
        flexDirection: 'row',
        marginLeft:scale(30),
        marginTop:scale(10),
    }
});
