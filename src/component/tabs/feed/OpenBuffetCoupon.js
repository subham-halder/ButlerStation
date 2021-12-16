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
export class OpenBuffetCoupon extends Component {
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
        setTimeout(() => this._scrollView.getScrollResponder().scrollTo({ x: 0, y: 0, animated: true }), 0);

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
                                <FontAwesomeIcon name="map-marker" size={20} color="#A9A9A9" />
                            </View>
                        </View>
                        <View style={{ flex: 1, marginLeft: 20, flexDirection: 'column' }}>
                            <Text style={{ fontSize: responsiveFontSize(2.5), color: '#2B2B2B' }}>Kuwait City</Text>
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#727272' }}>Soudi Arabia</Text>
                        </View>
                        <View style={styles.settingicon}>
                            <View style={{ height: 40, width: 40, backgroundColor: '#FFF', borderRadius: 5, justifyContent: 'center', alignItems: 'center', shadowOpacity: 0.8, elevation: 4 }}>
                                <FontAwesomeIcon name="ellipsis-h" size={20} color="#A9A9A9" onPress={() => this.props.navigation.openDrawer()} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.SingelImgBanner}>
                        <Image
                            source={require('../../../../assets/buffet-resturant.png')}
                            style={{
                                width: BannerWidth - 20,
                                height: BannerHeight,
                                resizeMode: 'cover',
                                borderRadius: 15,

                            }}
                        />
                        {/* <View
              style={{
                position: 'absolute',
                height: 20,
                //width: 80,
                //borderRadius: 15,
                left: 10,
                top: 40,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000,
              }}>
              <View style={{ width: responsiveWidth(40), marginLeft: 10, marginTop: 25 }}>
                <Text style={{ color: '#000000', fontWeight: 'bold', alignSelf: 'flex-start', textAlign: 'left', fontSize: responsiveFontSize(2.5) }}>Book the Perfect Place for your Evening</Text>
                <Text style={{ color: '#747474', fontSize: responsiveFontSize(1.8), alignSelf: 'flex-start', textAlign: 'left' }}>There are many variations of passages of Lorem Ipsum available.</Text>
              </View>
            </View> */}
                        {/* <View
              style={{
                position: 'absolute',
                height: 20,
                //width: 80,
                //borderRadius: 15,
                left: 10,
                bottom: 30,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000,
              }}>
              <TouchableWithoutFeedback>
                <Badge style={{ backgroundColor: '#2F3237', marginLeft: 10 }}>
                  <Text style={{ color: 'white' }}>Read More..</Text>
                </Badge>
              </TouchableWithoutFeedback>
            </View> */}

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 15, paddingRight: 15, paddingTop: 15, justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={styles.backbutton}>
                            <View style={{ backgroundColor: '#F2F2F2', borderRadius: 5, width: responsiveWidth(45), height: responsiveHeight(6), marginRight: 10, justifyContent: 'center' }}>
                                <Dropdown
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                    label='Select Date'
                                    data={data}
                                    containerStyle={{ marginLeft: 10, marginBottom: 15, }}
                                />
                            </View>
                        </View>

                        {/* <View style={{ flex: 1, }}>
                            <View style={{ backgroundColor: '#2F3237', width: responsiveWidth(10), height: responsiveHeight(6.5), alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                                <Image style={{
                                    height: responsiveHeight(5), width: responsiveWidth(5), resizeMode: 'contain',
                                }} source={require('../../../../assets/group-vector.png')} />
                            </View>
                        </View> */}
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref={(view) => this._scrollView = view}>
                            <View style={{ flexDirection: 'row', margin: 20 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ResturantListOpenBuffet')}>
                                    <View style={styles.inactiveMenuView2}>

                                        <Text style={styles.inactiveMenuText2}>Resturant </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('OpenBuffetCoupon')}>
                                    <View style={styles.activeMenuView2}>
                                        <Text style={styles.activeMenuText2}>Coupon </Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </ScrollView>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref={(view) => this._scrollView = view}>
                        <View style={{ flexDirection: 'row', margin: 20, }}>
                            <TouchableOpacity>
                                <View style={styles.activeMenuView}>
                                    <Text style={styles.activeMenuText}>Breakfast </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.inactiveMenuView}>
                                    <Text style={styles.inactiveMenuText}>Lunch </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <View style={styles.inactiveMenuView}>
                                    <Text style={styles.inactiveMenuText}>Snacks </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <View style={styles.inactiveMenuView}>
                                    <Text style={styles.inactiveMenuText}>Dinner </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CouponDetails')}>
                        <View style={styles.GalleryBox}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15,marginTop:10 }}>
                                <View style={{ width: responsiveWidth(15) }}>
                                    <Image
                                        source={IMAGE.ICON_COUPON_BADGE}
                                        resizeMode='contain'
                                        style={{ width: 50, height: 50, marginLeft: 10 }}
                                    />
                                </View>
                                <View style={{ width: responsiveWidth(70) }}>
                                    <Text style={styles.userNmae}>Gift Card valued at KD 50 or 10% off at Khyber Sarhad Resturant </Text>
                                </View>
                            </View>
                            <View style={{ height: 1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: '#CFCFCF', borderStyle: 'dashed', zIndex: 0, }}>
                                <View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 1, backgroundColor: 'white', zIndex: 1 }} />
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 10, justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'column', }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: responsiveFontSize(5), marginRight: 5 }}>10%</Text><Text>Off</Text>
                                    </View>
                                    <Text style={{ marginLeft: 8 }}>KD 120.00</Text>
                                </View>
                                <View style={{ flexDirection: 'column',justifyContent:'center',alignItems:'flex-end' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center',marginBottom:10 }}>
                                        <Text style={{ color: '#C7C7C7' }}>Valid Until </Text><Text style={{ color: '#0EAE44' }}>04 June 2021</Text>
                                    </View>
                                    <View>
                                        <TouchableWithoutFeedback>
                                            <Badge style={{ backgroundColor: '#2F3237', }}>
                                                <Text style={{ color: 'white' }}>Buy Now</Text>
                                            </Badge>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CouponDetails')}>
                        <View style={styles.GalleryBox}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15,marginTop:10 }}>
                                <View style={{ width: responsiveWidth(15) }}>
                                    <Image
                                        source={IMAGE.ICON_COUPON_BADGE2}
                                        resizeMode='contain'
                                        style={{ width: 50, height: 50, marginLeft: 10 }}
                                    />
                                </View>
                                <View style={{ width: responsiveWidth(70) }}>
                                    <Text style={styles.userNmae}>Gift Card valued at KD 50 or 10% off at Khyber Sarhad Resturant </Text>
                                </View>
                            </View>
                            <View style={{ height: 1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: '#CFCFCF', borderStyle: 'dashed', zIndex: 0, }}>
                                <View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 1, backgroundColor: 'white', zIndex: 1 }} />
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 10, justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'column', }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: responsiveFontSize(5), marginRight: 5 }}>20%</Text><Text>Off</Text>
                                    </View>
                                    <Text style={{ marginLeft: 8 }}>KD 120.00</Text>
                                </View>
                                <View style={{ flexDirection: 'column',justifyContent:'center',alignItems:'flex-end' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center',marginBottom:10 }}>
                                        <Text style={{ color: '#C7C7C7' }}>Valid Until </Text><Text style={{ color: '#0EAE44' }}>04 June 2021</Text>
                                    </View>
                                    <View>
                                        <TouchableWithoutFeedback>
                                            <Badge style={{ backgroundColor: '#2F3237', }}>
                                                <Text style={{ color: 'white' }}>Buy Now</Text>
                                            </Badge>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>

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
        height: responsiveHeight(22),
        width: responsiveWidth(90),
        //flexDirection: 'row',
        marginLeft: 20,
    },
    GalleryImg: {
        //marginTop: 1,
        borderRadius: 20,

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
        fontSize: responsiveFontSize(2.3),
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
    moreImg: {
        height: responsiveHeight(10),
        width: responsiveWidth(10),
        resizeMode: 'contain',
        margin: 5,
        borderRadius: 5
    },
    activeMenuView: {
        paddingLeft: 5,
        paddingRight: 15,
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
