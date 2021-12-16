import React, { Component } from 'react';
import {

    View,
    StyleSheet,
    Dimensions,
    Image,
    BackHandler,
    AsyncStorage,
    FlatList,
    ScrollView,
    Animated,
    ImageBackground,
    Alert,
    RefreshControl,
    TouchableWithoutFeedback,
    StatusBar,
    YellowBox,
    CheckBox,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Item, Input, Icon, Button, Text, List, ListItem, Body, Left, Right, Thumbnail, Tab, Tabs, Badge } from 'native-base';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import Carousel from 'react-native-banner-carousel';
import Carousel from 'react-native-snap-carousel';
import StarRating from 'react-native-star-rating';
import AnimatedLoader from 'react-native-animated-loader';
import RNExitApp from 'react-native-exit-app';
import CustomTab from '../../CustomTab';
import CustomHeader from '../../CustomeHeader';
import b from '../../BaseUrl';
import { IMAGE } from '../../../constants/Image';
import { NavigationEvents } from 'react-navigation';
const { width, height } = Dimensions.get('window');
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 180.5;
// const images = [
//   'https://swissmade.direct/wp-content/uploads/2019/05/fd.png',
//   'https://swissmade.direct/wp-content/uploads/2019/03/banner.png',
//   'https://swissmade.direct/wp-content/uploads/2018/05/banner-4-sm-1.png',
// ];

const Entities = require('html-entities').XmlEntities;
const Context = React.createContext('default value');
const slider = [

    {
        "image_url": "https://albaghlisponge.com/wp-content/uploads/2021/07/Rest-Master-Cover-1-1.jpg",
        "slider_heading1": "Dining Table",
        "slider_heading2": "Cement",
        "slider_link_type": "product",
        "product_link": 7782
    },
    {
        "image_url": "https://albaghlisponge.com/wp-content/uploads/2021/07/Rest-Master-Cover2.jpg",
        "slider_heading1": "Mattress",
        "slider_heading2": "Rest Master",
        "slider_link_type": "product",
        "product_link": 5707
    },
    {
        "image_url": "https://albaghlisponge.com/wp-content/uploads/2021/07/Rest-Master-Cover2.jpg",
        "slider_heading1": "Mattress",
        "slider_heading2": "Rest Master",
        "slider_link_type": "product",
        "product_link": 5707
    }
];

const horizontalMargin = 5;
const slideWidth = 300;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 0.5;
const itemHeight = 200;


//const entities = new Entities();
export class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: '',
            slider: [],
            isLoading: false,
            isSelected1: false,
            isSelected2: false,
        };
    }

    componentDidMount() {
        this.languageCheck();
        YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);
        this.setState({ isLoading: false });
        this.handleConnectionChange();
        const { navigation } = this.props;

    }

    handleConnectionChange = () => {
        fetch('https://www.google.com/', {
            mode: 'no-cors',
        })
            .then(() => {

            }).catch(() => {

                Alert.alert(
                    '',
                    'No Internet Connection',
                    [

                        {
                            text: 'OK', onPress: () => {
                                RNExitApp.exitApp();
                            }
                        },
                    ],
                    { cancelable: false },
                )

                //
            })
    }

    languageCheck() {
        AsyncStorage.getItem('language', (err, languageres) => {
            //console.log(languageres + "language from home screen");

            if (languageres == '' || languageres == null) {

                this.setState({
                    language: 'ar',
                });
            } else {
                var lang = languageres;
                this.setState({
                    language: languageres,
                });
            }
        });
    }

    check1() {
        if (this.state.isSelected1 == true) {
            this.setState({ isSelected1: false })
        } else {
            this.setState({ isSelected1: true })
        }

    }
    check2() {
        if (this.state.isSelected2 == true) {
            this.setState({ isSelected2: false })
        } else {
            this.setState({ isSelected2: true })
        }

    }

    render() {

        return (
            <View style={styles.container}>

                {/* <CustomHeader
          title="Feed"
          isHome={true}
          navigation={this.props.navigation}
        /> */}
                {/* </Context.Provider> */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{}}>
                    <StatusBar backgroundColor="#fff" />
                    <View style={styles.ProfileSettingcontainer}>
                        <View style={styles.backbutton}>
                            <View style={{ height: 40, width: 40, backgroundColor: '#E4E4E4', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={IMAGE.ICON_ARROW}
                                    resizeMode='contain'
                                    style={{ width: 20, height: 20 }}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontSize: responsiveFontSize(2.5), color: '#2B2B2B', fontWeight: 'bold' }}>My Account</Text>
                        </View>
                        <View style={styles.settingicon}>
                            <View style={{ height: 40, width: 40, backgroundColor: '#FFF', borderRadius: 5, justifyContent: 'center', alignItems: 'center', shadowOpacity: 0.8, elevation: 4 }}>
                                <FontAwesomeIcon name="ellipsis-h" size={20} color="#A9A9A9" onPress={() => this.props.navigation.openDrawer()} />
                            </View>
                        </View>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', margin: 20 }}>
                            <View style={styles.activeMenuView}>
                                <Image
                                    source={IMAGE.ICON_ACCOUNT_MENU}
                                    resizeMode='contain'
                                    style={{ width: responsiveWidth(4), height: responsiveHeight(4), }}
                                />
                                <Text style={styles.activeMenuText}>My Account </Text>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Address')}>
                                <View style={styles.inactiveMenuView}>
                                    <Image
                                        source={IMAGE.ICON_MAP}
                                        resizeMode='contain'
                                        style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                    />
                                    <Text style={styles.inactiveMenuText}>Save Address </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Card')}>
                            <View style={styles.inactiveMenuView}>
                                <Image
                                    source={IMAGE.ICON_CREDIT_CARD}
                                    resizeMode='contain'
                                    style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                />
                                <Text style={styles.inactiveMenuText}>Save Credit Card </Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderMeal')}>
                            <View style={styles.inactiveMenuView}>
                                <Image
                                    source={IMAGE.ICON_ORDER_LIST}
                                    resizeMode='contain'
                                    style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                />
                                <Text style={styles.inactiveMenuText}>Order Meal </Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('MyBooking')}>
                            <View style={styles.inactiveMenuView}>
                                <Image
                                    source={IMAGE.ICON_BOOKING}
                                    resizeMode='contain'
                                    style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                />
                                <Text style={styles.inactiveMenuText}>My Booking </Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('MyFavResturant')}>
                            <View style={styles.inactiveMenuView}>
                                <Image
                                    source={IMAGE.ICON_FAVOURITE}
                                    resizeMode='contain'
                                    style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                />
                                <Text style={styles.inactiveMenuText}>My Favourite Restaurant </Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangePassword')}>
                            <View style={styles.inactiveMenuView}>
                                <Image
                                    source={IMAGE.ICON_LOCK}
                                    resizeMode='contain'
                                    style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                />
                                <Text style={styles.inactiveMenuText}>Change Password </Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <View style={styles.Profilecontainer}>

                        <View style={styles.Profileimagecontainer}>

                            <View>
                                <Image style={styles.UserImage} resizeMode="cover" source={require('../../../../assets/pic-6.jpg')} />

                                <View style={{
                                    position: 'absolute', height: 25, width: 25,
                                    borderRadius: 8, backgroundColor: '#2F3237', right: -5, bottom: -5, alignItems: 'center', justifyContent: 'center', zIndex: 2000
                                }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EditAccount')}>
                                        <Image
                                            source={IMAGE.ICON_PENCIL}
                                            resizeMode='contain'
                                            style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                        />
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View style={{ marginTop: 10, }}>
                                <Text style={styles.UserName}>John Doe</Text>
                            </View>
                            <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Image
                                    source={IMAGE.ICON_MAP}
                                    resizeMode='contain'
                                    style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                />
                                <Text style={{ fontSize: responsiveFontSize(2), color: '#A9A9A9', marginLeft: 5 }}>Kuwait</Text>
                            </View>

                        </View>


                    </View>
                    <Text style={styles.portionHeaderText}>Personal Information</Text>
                    <View style={{ marginLeft: 15, marginBottom: 10 }}>
                        <Text style={{ color: '#9B9B9B', fontSize: responsiveFontSize(2) }}>Name</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: responsiveWidth(90), borderBottomColor: '#CFCFCF', borderBottomWidth: 0.5 }}>
                            <View style={{ alignItems: "flex-start", marginBottom: 5 }}>
                                <Text style={{ color: '#424242', fontSize: responsiveFontSize(2.7), fontWeight: '100' }}>John Doe</Text>
                            </View>
                            <View style={{ alignItems: "flex-end", marginBottom: 5 }}>
                                <Image
                                    source={IMAGE.ICON_ACCOUNT_MENU}
                                    resizeMode='contain'
                                    style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginLeft: 15, marginBottom: 10 }}>
                        <Text style={{ color: '#9B9B9B', fontSize: responsiveFontSize(2) }}>Email</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: responsiveWidth(90), borderBottomColor: '#CFCFCF', borderBottomWidth: 0.5 }}>
                            <View style={{ alignItems: "flex-start", marginBottom: 5 }}>
                                <Text style={{ color: '#424242', fontSize: responsiveFontSize(2.7), fontWeight: '100' }}>Johndoe@gmail.com</Text>
                            </View>
                            <View style={{ alignItems: "flex-end", marginBottom: 5 }}>
                                <Image
                                    source={IMAGE.ICON_EMAIL}
                                    resizeMode='contain'
                                    style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginLeft: 15, marginBottom: 10 }}>
                        <Text style={{ color: '#9B9B9B', fontSize: responsiveFontSize(2) }}>Phone</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: responsiveWidth(90), borderBottomColor: '#CFCFCF', borderBottomWidth: 0.5 }}>
                            <View style={{ alignItems: "flex-start", marginBottom: 5 }}>
                                <Text style={{ color: '#424242', fontSize: responsiveFontSize(2.7), fontWeight: '100' }}>+91 5687134565</Text>
                            </View>
                            <View style={{ alignItems: "flex-end", marginBottom: 5 }}>
                                <Image
                                    source={IMAGE.ICON_PHONE}
                                    resizeMode='contain'
                                    style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginLeft: 15, marginBottom: 10 }}>
                        <Text style={{ color: '#9B9B9B', fontSize: responsiveFontSize(2) }}>Date of Birth</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: responsiveWidth(90), borderBottomColor: '#CFCFCF', borderBottomWidth: 0.5 }}>
                            <View style={{ alignItems: "flex-start", marginBottom: 5 }}>
                                <Text style={{ color: '#424242', fontSize: responsiveFontSize(2.7), fontWeight: '100' }}>05-06-1992</Text>
                            </View>
                            <View style={{ alignItems: "flex-end", marginBottom: 5 }}>
                                <Image
                                    source={IMAGE.ICON_CALENDER}
                                    resizeMode='contain'
                                    style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginLeft: 15, marginBottom: 10 }}>
                        <Text style={{ color: '#9B9B9B', fontSize: responsiveFontSize(2) }}>Gender</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: responsiveWidth(90), borderBottomColor: '#CFCFCF', borderBottomWidth: 0.5 }}>
                            <View style={{ alignItems: "flex-start", marginBottom: 5 }}>
                                <Text style={{ color: '#424242', fontSize: responsiveFontSize(2.7), fontWeight: '100' }}>Male</Text>
                            </View>
                            <View style={{ alignItems: "flex-end", marginBottom: 5 }}>
                                <Image
                                    source={IMAGE.ICON_GENDER}
                                    resizeMode='contain'
                                    style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 12, }}>
                        <CheckBox
                            value={this.state.isSelected1}
                            onValueChange={(isSelected) => this.check1()}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>Subscribe to SMS</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 12, }}>
                        <CheckBox
                            value={this.state.isSelected2}
                            onValueChange={(isSelected2) => this.check2()}
                            style={styles.checkbox}
                            color="default"
                        />
                        <Text style={styles.label}>Subscribe to Newsletter</Text>
                    </View>
                </ScrollView>

                <AnimatedLoader
                    visible={this.state.isLoading}
                    source={require("../../../../loader.json")}
                    overlayColor="rgba(255,255,255,1)"
                    animationStyle={styles.lottie}
                    speed={2}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    div2: {
        backgroundColor: '#fff',
        alignItems: 'center',
        width: BannerWidth,
    },
    div2Text: {
        margin: 10,
        fontSize: responsiveFontSize(1.5),
    },
    div3_active: {
        backgroundColor: '#EBE1D7',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,
        // marginTop: 10,
        borderRadius: 5,
        flexDirection: 'row',
        width: responsiveWidth(25),
        height: responsiveHeight(12),
        justifyContent: 'center'
    },
    div3: {
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,
        // marginTop: 10,
        borderRadius: 5,
        flexDirection: 'row',
        width: responsiveWidth(25),
        height: responsiveHeight(12),
        justifyContent: 'center'
    },
    div3image: {
        height: 40,
        width: 40,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 8,
        overflow: 'hidden',
    },
    div3image_new: {
        height: responsiveHeight(15),
        width: responsiveWidth(30),
        //borderRadius: 63,
        borderWidth: 0.5,
        borderColor: '#fff',
        marginLeft: 10,
        // marginRight: 10,
        marginTop: 8,
        overflow: 'hidden',
        backgroundColor: 'white',

    },
    div4: {
        flexDirection: 'row',
        marginRight: 10,
    },

    GalleryBox: {
        //margin: 10,
        backgroundColor: '#F2F2F2',
        borderRadius: 3,
        height: responsiveHeight(27),
        width: responsiveWidth(44.5),

    },
    GalleryImg: {
        //marginTop: 1,
        borderRadius: 3,

        borderColor: '#f8668b',
    },
    SingelImgBanner: {
        backgroundColor: '#F2F2F2',
        marginTop: 20,
        borderColor: '#F2F2F2',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        width: BannerWidth - 20,
        height: BannerHeight,
        borderRadius: 15,
    },
    SingelImg: {
        height: responsiveHeight(15),
        width: responsiveWidth(44.5),
        resizeMode: 'cover',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    GalleryText: {
        // height: responsiveHeight(3),
        width: responsiveWidth(32),
        fontSize: responsiveFontSize(2),
        //textAlign: 'center',
    },
    GallerydescText: {
        //height: responsiveHeight(3),
        width: responsiveWidth(30),
        fontSize: responsiveFontSize(1.5),

        //textAlign: 'center',
    },
    amount: {
        //borderColor: 'red',
        height: responsiveHeight(3.5),
        // borderWidth: .5,
        borderRadius: 3,
        // alignItems: 'center',
        //justifyContent: 'center',
        //marginTop: 15,
        paddingLeft: 5,
        paddingRight: 5
    },
    quoteBox: {
        marginLeft: 10,
        marginRight: 5,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 3,
        height: responsiveHeight(32),
        width: responsiveWidth(95),
    },
    quotename: {
        color: 'gray',
        marginTop: 20,
        marginBottom: 20,
    },
    quote: {
        color: 'gray',
        marginTop: 10,

        fontSize: responsiveFontSize(1.5),
    },
    BlogBox: {
        marginLeft: 10,
        //marginBottom: 10,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 3,
        height: responsiveHeight(30),
        width: responsiveWidth(45.7),
    },
    backgroundImage: {
        resizeMode: 'contain',
        flex: 1,
    },
    blackeffect: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 3,
        flex: 1,
    },
    blogtext1: {
        color: '#2ff4fd',
        marginTop: 10,

        fontSize: responsiveFontSize(1.7),
    },
    blogtext2: {
        color: '#fff',
        marginTop: 10,
        marginBottom: 20,

        fontSize: responsiveFontSize(1.5),
    },
    lastdiv: {
        flexDirection: 'row',
        marginBottom: 10,
        marginRight: 10,
    },
    cate_text: {
        fontSize: responsiveFontSize(1.9),
        marginTop: 5,
        marginBottom: 5,
        color: '#2F3237',
        paddingLeft: 3
    },
    cate_text_new: {
        fontSize: responsiveFontSize(1.5),
        marginTop: 5,
        marginBottom: 5,
        color: '#000',
    },
    userNmae: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        //textAlign: 'center'
    },
    userdesNmae: {
        fontSize: responsiveFontSize(1.7),
        color: '#6B6B6B',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        //textAlign: 'center'
    },
    amountuserNmae: {
        fontSize: responsiveFontSize(2),
        color: '#363636',

    },

    portionHeaderTextforar: {
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10,
        color: '#000',
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold'
    },
    lottie: {
        width: 100,
        height: 100,

    },
    discountprice: {
        textDecorationLine: 'line-through',
        fontSize: responsiveFontSize(2),
        marginLeft: 5,
        marginRight: 5,
    },
    containertab: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        height: responsiveHeight(8),
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent:'space-between',
        backgroundColor: '#EBEBEB'
    },
    button: {
        width: responsiveWidth(17),
        //height: responsiveHeight(50),
        marginLeft: 6,
        marginRight: 6,
        //paddingLeft: 22,
        //paddingRight: 22,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ProfileSettingcontainer: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    settingicon: {
        alignItems: "flex-end"
    },
    backbutton: {
        alignItems: "flex-start"
    },
    portionHeaderText: {
        marginLeft: 15,
        marginBottom: 10,
        marginTop: 10,
        color: '#000',
        fontSize: responsiveFontSize(3),
        fontWeight: '500'
    },
    slide: {
        width: itemWidth,
        height: itemHeight,
        paddingHorizontal: horizontalMargin
        // other styles for the item container
    },
    slideInnerContainer: {
        width: slideWidth,
        flex: 1
        // other styles for the inner container
    },
    Profilecontainer: {
        flex: 1,
        flexDirection: 'row',

        alignItems: 'center',
        justifyContent: 'center'
    },
    Profileimagecontainer: {
        alignItems: 'center',
        justifyContent: 'center'

    },
    UserImage: {
        alignSelf: 'center',
        marginTop: 15,
        width: 120,
        height: 120,
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#F2F2F2',
    },
    UserName: {

        fontWeight: '500',
        color: '#303030',
        fontSize: responsiveFontSize(3),
        padding: 3,
        marginLeft: 5,
        marginRight: 5
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
        color: '#7D7D7D'
    },
    activeMenuView: {
        paddingLeft: 5,
        paddingRight: 5,
        height: responsiveHeight(5),
        marginRight: 10,
        backgroundColor: '#2F3237',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 8
    },
    activeMenuText: {
        fontSize: responsiveFontSize(2.3),
        color: '#EBE1D7',
        marginLeft: 5
    },
    inactiveMenuView: {
        paddingLeft: 5,
        paddingRight: 5,
        height: responsiveHeight(5),
        marginRight: 10,
        backgroundColor: '#F2F2F2',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 8
    },
    inactiveMenuText: {
        fontSize: responsiveFontSize(2.3),
        color: '#A1A1A1',
        marginLeft: 5
    }

});
