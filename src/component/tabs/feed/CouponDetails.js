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
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Item, Input, Icon, Button, Text, List, ListItem, Body, Left, Right, Thumbnail } from 'native-base';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown';
// import Carousel from 'react-native-banner-carousel';
import Carousel from 'react-native-snap-carousel';
import StarRating from 'react-native-star-rating';
import AnimatedLoader from 'react-native-animated-loader';
import RNExitApp from 'react-native-exit-app';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import CustomTab from '../../CustomTab';
import CustomHeader from '../../CustomeHeader';
import { IMAGE } from '../../../constants/Image';
import b from '../../BaseUrl';
import { NavigationEvents } from 'react-navigation';
import { Badge } from 'native-base';
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
let data = [{
    value: 'Banana',
}, {
    value: 'Mango',
}, {
    value: 'Pear',
}];

const horizontalMargin = 5;
const slideWidth = 300;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 0.5;
const itemHeight = 200;


//const entities = new Entities();
export class CouponDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: '',
            banarimage: '',
            banarimage1: '',
            banner_heading1: '',
            banner_text1: '',
            banner_link_text1: '',
            banarimage2: '',
            banner_heading2: '',
            banner_text2: '',
            banner_link_text2: '',
            category_slug_link1: '',
            category_slug_link2: '',
            banner_link_url1: '',
            banner_link_url2: '',
            banarimage3: '',
            props_name1: '',
            props_name2: '',
            banner_link_type1: '',
            banner_link_type2: '',
            category_slug_name_link1: '',
            category_slug_name_link2: '',
            dataSourceCategory: [],
            dataSourceFeaturedCategory: [],
            dataSourceFeaturedProduct: [],
            dataSourceReview: [],
            dataSourceNewArival: [],
            dataSourceNewDeals: [],
            dataSourceBlogs: [],
            dataSourceTopRatedProduct: [],
            dataSourceBestSellingProduct: [],
            offer: [],
            slider: [],
            isLoading: false,
            checkbanner: false,
            checkpopular: false,
            checknewarival: false,
            checknewdeals: false,
            checkreview: false,
            checkblog: false,
            // count: '',
            //refreshing: false,
            //setRefreshing: false,
        };
    }

    componentDidMount() {
        this.languageCheck();
        YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);
        setInterval(() => {
            this.languageCheck();
        }, 1000);
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


    componentWillUnmount() {

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
                            <Text style={{ fontSize: responsiveFontSize(2.5), color: '#2B2B2B', fontWeight: 'bold' }}>Coupon Details</Text>
                        </View>
                        <View style={styles.settingicon}>
                            <View style={{ height: 40, width: 40, backgroundColor: '#FFF', borderRadius: 5, justifyContent: 'center', alignItems: 'center', shadowOpacity: 0.8, elevation: 4 }}>
                                <FontAwesomeIcon name="ellipsis-h" size={20} color="#A9A9A9" onPress={() => this.props.navigation.openDrawer()} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.GalleryBox}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, marginTop: 10 }}>
                            <View style={{ width: responsiveWidth(25), marginRight: 10 }}>
                                <Image
                                    source={IMAGE.ICON_COUPON_BADGE}
                                    resizeMode='contain'
                                    style={{ width: 90, height: 90, marginLeft: 10 }}
                                />
                            </View>
                            <View style={{ width: responsiveWidth(60) }}>
                                <Text style={styles.userNmae}>Gift Card valued at KD 50 or 10% off at Khyber Sarhad Resturant  </Text>
                            </View>
                        </View>
                        <View style={{ height: 1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: '#CFCFCF', borderStyle: 'dashed', zIndex: 0, }}>
                            <View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 1, backgroundColor: 'white', zIndex: 1 }} />
                        </View>
                        <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10, }}>
                            <Text style={{ color: '#5B5B5B', textAlign: 'center', }}>Pamper yourself and those around you with this meal Enough for 8 Persons from AL-Warda AL-Shamiya Restaurant.</Text>
                        </View>
                        <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 15, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Text style={{ color: '#696969', textAlign: 'right' }}>-8 meat Kabab</Text>
                                <Text style={{ color: '#696969', textAlign: 'left' }}>-6 chciken Kabab</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Text style={{ color: '#696969', textAlign: 'right' }}>-3 tikka</Text>
                                <Text style={{ color: '#696969', textAlign: 'left' }}>-1 Arayes</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Text style={{ color: '#696969' }}>-3 Shish tawook</Text>
                                <Text style={{ color: '#696969' }}> -1 grilled chicken</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Text style={{ color: '#696969' }}>-1 garlic</Text>
                                <Text style={{ color: '#696969' }}>-1 Hummus</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Text style={{ color: '#696969' }}>-1 metabl</Text>
                                <Text style={{ color: '#696969' }}>-1 salad</Text>
                            </View>
                        </View>
                        <View style={{ height: 1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: '#CFCFCF', borderStyle: 'dashed', zIndex: 0, }}>
                            <View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 1, backgroundColor: 'white', zIndex: 1 }} />
                        </View>
                        <View style={{ marginLeft: 20, marginRight: 10, marginTop: 10, marginBottom: 15, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#2F3237', fontWeight: '700', marginRight: 20 }}>Price: KD 120.00</Text>
                            <Text style={{ color: '#686868', fontWeight: '100', fontSize: responsiveFontSize(1.8), textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>KD 150.00</Text>
                        </View>
                        <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ backgroundColor: '#EBE1D7', padding: 5, borderRadius: 5, marginRight: 10 }}>
                                    <FontAwesomeIcon name="minus" size={15} color="#000000" />
                                </View>
                                <Text style={{ marginRight: 10, fontSize: responsiveFontSize(2.5) }}>1</Text>
                                <View style={{ backgroundColor: '#EBE1D7', padding: 5, borderRadius: 5, marginRight: 0 }}>
                                    <FontAwesomeIcon name="plus" size={15} color="#000000" />
                                </View>
                            </View>
                            <View style={styles.activeMenuView}>
                                <Text style={styles.activeMenuText}>Buy Now</Text>
                            </View>
                        </View>
                        <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ alignItems: 'flex-start' }}>
                                <Image
                                    source={IMAGE.ICON_SHARE}
                                    resizeMode='contain'
                                    style={{ width: 20, height: 20, }}
                                />
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: '#B7B7B7' }}>Time left:</Text><Text style={{ color: '#0EAE44' }}> 20:45:00</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Image
                                    source={IMAGE.ICON_INFO_FADE}
                                    resizeMode='contain'
                                    style={{ width: 20, height: 20, }}
                                />
                            </View>
                        </View>
                    </View>
                    <Text style={styles.portionHeaderText}>Detail Information</Text>
                    <View style={styles.GalleryBox2}>
                        <View style={{ marginTop: 10, borderBottomColor: '#E3E3E3', borderBottomWidth: 1, paddingBottom: 20, margin: 10 }}>

                            <Text style={{ color: '#2F3237', fontSize: responsiveFontSize(2.3), marginLeft: 10 }}>Grand Total:</Text>
                            <Text style={{ color: '#656565', fontSize: responsiveFontSize(2), marginLeft: 10 }}>Valid From : 5 March 2021</Text>
                            <Text style={{ color: '#656565', fontSize: responsiveFontSize(2), marginLeft: 10 }}>Valid To : 5 April 2021</Text>
                            <Text style={{ color: '#656565', fontSize: responsiveFontSize(2), marginLeft: 10 }}>Value : KD 28</Text>
                        </View>
                        <View style={{ marginTop: 10, borderBottomColor: '#E3E3E3', borderBottomWidth: 1, paddingBottom: 20, margin: 10 }}>

                            <Text style={{ color: '#2F3237', fontSize: responsiveFontSize(2.3), marginLeft: 10 }}>The Deal:</Text>
                            <Text style={{ color: '#656565', fontSize: responsiveFontSize(2), marginLeft: 10 }}>Save 64% and Enjoy a Delicious Maki Platter from Hot Pot Restaurant, Get KD28 Value for Only KD9.9</Text>

                        </View>
                        <View style={{ marginTop: 10, paddingBottom: 20, margin: 10 }}>

                            <Text style={{ color: '#2F3237', fontSize: responsiveFontSize(2.3), marginLeft: 10 }}>Features & Specifications:</Text>
                            <Text style={{ color: '#656565', fontSize: responsiveFontSize(2), marginLeft: 10 }}>- To inquire: 55558093</Text>
                            <Text style={{ color: '#656565', fontSize: responsiveFontSize(2), marginLeft: 10 }}>- Advanced reservation is required</Text>
                            <Text style={{ color: '#656565', fontSize: responsiveFontSize(2), marginLeft: 10 }}>- Working Times from: 11 AM to 8 pM</Text>
                            <Text style={{ color: '#656565', fontSize: responsiveFontSize(2), marginLeft: 10 }}>- Can not be used with another offers</Text>
                            <Text style={{ color: '#656565', fontSize: responsiveFontSize(2), marginLeft: 10 }}>- No cash back</Text>
                            <Text style={{ color: '#656565', fontSize: responsiveFontSize(2), marginLeft: 10 }}>- Working Times from: 11 AM to 8 PM</Text>

                        </View>
                    </View>
                    <Text style={styles.portionHeaderText}>Direction</Text>
                    <View style={styles.SingelImgBanner}>
                        <Image
                            source={require('../../../../assets/map-example.png')}
                            style={{
                                width: BannerWidth - 30,
                                height: BannerHeight,
                                resizeMode: 'cover',
                                
                            }}
                        />
                        {/* <MapView
                            initialRegion={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        /> */}
                    </View>

                </ScrollView>

                <AnimatedLoader
                    visible={this.state.isLoading}
                    source={require("../../../../loader.json")}
                    overlayColor="rgba(255,255,255,1)"
                    animationStyle={styles.lottie}
                    speed={2}
                />
                {/* <CustomTab/> */}
                {/* ------------------------custome tab section----------------- */}


                {/* ------------------------custome tab section----------------- */}
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
        margin: 10,
        backgroundColor: '#FFF',
        shadowOpacity: 0.8,
        elevation: 4,
        height: responsiveHeight(58),
        width: responsiveWidth(90),
        //flexDirection: 'row',
        marginLeft: 20,
        borderRadius: 10
    },
    GalleryBox2: {
        margin: 10,
        backgroundColor: '#FFF',
        shadowOpacity: 0.8,
        elevation: 4,
        height: responsiveHeight(48),
        width: responsiveWidth(90),
        //flexDirection: 'row',
        marginLeft: 20,
        borderRadius: 10
    },
    GalleryImg: {
        //marginTop: 1,
        borderRadius: 20,

        borderColor: '#f8668b',
    },
    SingelImgBanner: {
        backgroundColor: '#F2F2F2',
        marginBottom: 20,
        borderColor: '#F2F2F2',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        width: BannerWidth - 30,
        height: BannerHeight,
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
        //width: responsiveWidth(48),
        fontSize: responsiveFontSize(2),
        //textAlign: 'center',
    },
    GallerydescText1: {
        //height: responsiveHeight(3),
        //width: responsiveWidth(30),
        fontSize: responsiveFontSize(1.5),
        marginTop: 5
        //textAlign: 'center',
    },
    GallerydescText2: {
        //height: responsiveHeight(3),
        //width: responsiveWidth(30),
        fontSize: responsiveFontSize(1.5),
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center'
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
        fontSize: responsiveFontSize(2.5),
        fontWeight: '900',
        marginLeft: 5,
        marginRight: 5,

        //textAlign: 'center'
    },
    userdesNmae1: {
        fontSize: responsiveFontSize(1.7),
        color: '#6B6B6B',
        marginLeft: 5,
        marginRight: 5,
        //textAlign: 'center'
    },
    userdesNmae2: {
        fontSize: responsiveFontSize(1.8),
        color: '#6B6B6B',
        marginLeft: 5,
        marginRight: 5,
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
        marginLeft: 20,
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
    moreImg: {
        height: responsiveHeight(10),
        width: responsiveWidth(10),
        resizeMode: 'contain',
        margin: 5,
        borderRadius: 5
    },
    activeMenuView: {
        paddingLeft: 5,
        paddingRight: 10,
        height: responsiveHeight(4),
        backgroundColor: '#2F3237',
        justifyContent: 'center',
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
        paddingRight: 15,
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
    },
    activeMenuView2: {
        //paddingLeft: 5,
        paddingRight: 5,
        //height: responsiveHeight(3),
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderBottomColor: '#000000',
        borderBottomWidth: 2,
    },
    activeMenuText2: {
        fontSize: responsiveFontSize(2.3),
        color: '#000000',
        fontWeight: 'bold',
        marginLeft: 5
    },
    inactiveMenuView2: {
        //paddingLeft: 5,
        paddingRight: 5,
        //height: responsiveHeight(5),
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',

    },
    inactiveMenuText2: {
        fontSize: responsiveFontSize(2.3),
        color: '#A1A1A1',
        marginLeft: 5
    },

});
