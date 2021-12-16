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
    Modal,
    Pressable,
    CheckBox,
    TextInput
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Item, Input, Icon, Button, Text, List, ListItem, Body, Left, Right, Thumbnail } from 'native-base';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { IMAGE } from '../../../constants/Image';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import Carousel from 'react-native-banner-carousel';
import Carousel from 'react-native-snap-carousel';
import StarRating from 'react-native-star-rating';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import AnimatedLoader from 'react-native-animated-loader';
import RNExitApp from 'react-native-exit-app';
import CustomTab from '../../CustomTab';
import CustomHeader from '../../CustomeHeader';
import Menu from '../feed/Menu';
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

const horizontalMargin = 5;
const slideWidth = 300;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 0.5;
const itemHeight = 200;


//const entities = new Entities();
export class DineinResturentDetails extends Component {
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
            modalVisible: false,
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
                            source={require('../../../../assets/restaurant-pic.png')}
                            style={{
                                width: BannerWidth - 25,
                                height: BannerHeight + 20,
                                resizeMode: 'cover',
                                borderRadius: 10,

                            }}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                height: 17,
                                width: 80,
                                borderRadius: 5,
                                right: -10,
                                top: 0,
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 2000,
                            }}>

                            <View style={{ backgroundColor: '#2F3237', padding: 5, height: responsiveHeight(2.8), width: responsiveWidth(10), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5, borderRadius: 5 }}>
                                <Text style={{ color: '#FFFFFF' }}>4.5</Text>
                                <Image source={require('../../../../assets/star.png')} style={{ height: 10, width: 10, resizeMode: 'contain' }} largeHeap="true" />
                            </View>

                        </View>

                        <View
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
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../../../assets/image6.png')} style={{ height: responsiveHeight(12), width: responsiveWidth(20), resizeMode: 'contain', margin: 5, borderRadius: 5 }} />
                                <View style={{ flexDirection: 'column', padding: 10, width: responsiveWidth(55), }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: responsiveWidth(48), fontSize: responsiveFontSize(2), }}>
                                            <Text style={{ fontSize: responsiveFontSize(2.3), color: '#FFFFFF', fontWeight: 'bold', marginRight: 5, marginTop: 5, }}>Campus Cafe</Text>
                                        </View>
                                    </View>

                                    <View style={{ fontSize: responsiveFontSize(1.5), marginTop: 5 }}>
                                        <Text style={{ fontSize: responsiveFontSize(1.7), color: '#C4C4C4', marginRight: 5, }}>Airport Road,Kuwait</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', borderRadius: 5, alignItems: 'center' }}>
                                        <Image
                                            source={IMAGE.ICON_CLOCK}
                                            resizeMode='contain'
                                            style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                        />
                                        <Text style={{ color: '#FFFFFF', marginLeft: 5 }}>Open: 9:00AM - 11:00PM</Text>
                                    </View>


                                </View>
                            </View>

                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', margin: 15 }}>
                        <TouchableOpacity >
                            <View style={styles.activeMenuView}>
                                <Text style={styles.activeMenuText}>Floor </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.inactiveMenuView}>
                                <Text style={styles.inactiveMenuText}>Menu </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <View style={styles.inactiveMenuView}>
                                <Text style={styles.inactiveMenuText}>Review </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <View style={styles.inactiveMenuView}>
                                <Text style={styles.inactiveMenuText}>Info </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', margin: 15 }}>

                        <TouchableOpacity >
                            <View style={styles.activeMenuView2}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Image
                                        source={IMAGE.ICON_COUPON_BADGE}
                                        resizeMode='contain'
                                        style={{ width: 50, height: 50, borderRadius: 25 }}
                                    />
                                    <Text style={styles.activeMenuText2}>Floor 1</Text>
                                    <TouchableWithoutFeedback>
                                        <Badge style={{ backgroundColor: '#2F3237', }}>
                                            <Text style={{ color: 'white' }}>Book Now</Text>
                                        </Badge>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <View style={styles.inactiveMenuView2}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Image
                                        source={IMAGE.ICON_COUPON_BADGE}
                                        resizeMode='contain'
                                        style={{ width: 50, height: 50, borderRadius: 25 }}
                                    />
                                    <Text style={styles.inactiveMenuText2}>Floor 1</Text>
                                    <TouchableWithoutFeedback>
                                        <Badge style={{ backgroundColor: '#F2F2F2', borderColor: '#2F3237', borderWidth: 1 }}>
                                            <Text style={{ color: '#2F3237' }}>Book Now</Text>
                                        </Badge>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <View style={styles.inactiveMenuView2}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Image
                                        source={IMAGE.ICON_COUPON_BADGE}
                                        resizeMode='contain'
                                        style={{ width: 50, height: 50, borderRadius: 25 }}
                                    />
                                    <Text style={styles.inactiveMenuText2}>Floor 1</Text>
                                    <TouchableWithoutFeedback>
                                        <Badge style={{ backgroundColor: '#F2F2F2', borderColor: '#2F3237', borderWidth: 1 }}>
                                            <Text style={{ color: '#2F3237' }}>Book Now</Text>
                                        </Badge>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </TouchableOpacity>


                    </View>
                    <Text style={styles.portionHeaderText}>Select Date and Time</Text>

                    <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 15, paddingRight: 15, paddingTop: 10, marginBottom: 5, justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={styles.backbutton}>
                            <View style={{ backgroundColor: '#F2F2F2', borderRadius: 5, width: responsiveWidth(92), marginRight: 15, }}>
                                <Item>
                                    <Input placeholder="Enter Your Date and Time"
                                        onChangeText={(text) => this.setState({ search: text })}
                                        value={this.state.search}
                                    // onKeyPress={() => {
                                    //     if (this.state.search == "") {
                                    //         this.setState({
                                    //             search: ''
                                    //         })
                                    //     } else {
                                    //         this.handlesearch()
                                    //     }
                                    // }}
                                    />
                                    <View style={{ backgroundColor: '#2F3237', width: responsiveWidth(10), height: responsiveHeight(6.5), alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 5, borderBottomRightRadius: 5 }}>
                                        <Image
                                            source={IMAGE.ICON_CALENDER}
                                            resizeMode='contain'
                                            style={{ width: 20, height: 20, }}
                                        />
                                    </View>
                                </Item>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.portionHeaderText}>Select Available Table</Text>
                    <View style={styles.button_view}>
                        <Button block style={styles.buttonsubmit} onPress={() => this.setState({ modalVisible: true })}>
                            <Text style={{ color: '#fff' }}>Book Now</Text>
                        </Button>
                    </View>
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        this.setState({ modalVisible: false })
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{
                                position: 'absolute', height: 30, width: 30,
                                borderRadius: 15, backgroundColor: 'rgba(255, 255, 255,0.8)', right: 15, top: 20, alignItems: 'center', justifyContent: 'center', zIndex: 2000
                            }}>
                                <Pressable onPress={() => {
                                    this.setState({ modalVisible: false });
                                }}>
                                    <View style={{ height: 30, width: 30, backgroundColor: '#FFF', borderRadius: 5, justifyContent: 'center', alignItems: 'center', shadowOpacity: 0.8, elevation: 4 }}>
                                        <FontAwesomeIcon name="times" size={20} color="#A9A9A9" onPress={() => this.setState({ modalVisible: false })} />
                                    </View>
                                </Pressable>
                            </View>
                            <View style={{ height: responsiveHeight(99), width: responsiveWidth(88) }}>
                                <ScrollView>
                                    <Text style={styles.portionHeaderText}>Select Date and Time</Text>
                                    <View style={styles.GalleryBox}>
                                        <Calendar
                                            style={{

                                            }}
                                            markingType={'period'}
                                            // markedDates={{

                                            //     '2021-09-20': { textColor: 'green' },
                                            //     '2021-09-22': { startingDay: true, color: '#CCCCCC', textColor: 'white' },
                                            //     '2021-09-23': { selected: true, endingDay: true, color: '#CCCCCC', textColor: 'white' },
                                            //     '2021-09-04': { disabled: true, startingDay: true, color: '#CCCCCC', endingDay: true, textColor: 'white' }
                                            // }}
                                            theme={{
                                                arrowColor: '#2F3237',
                                            }}
                                        />
                                    </View>
                                    <View style={styles.GalleryBox2}>
                                        <View style={{flexDirection:'row',margin:10,marginTop:10,justifyContent:'space-evenly'}}>
                                        <TouchableWithoutFeedback>
                                            <Badge style={{ backgroundColor: '#FFFFFF', borderColor: '#2F3237', borderWidth: 1 }}>
                                                <Text style={{ color: '#2F3237' }}>1PM - 2PM</Text>
                                            </Badge>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback>
                                            <Badge style={{ backgroundColor: '#FFFFFF', borderColor: '#2F3237', borderWidth: 1 }}>
                                                <Text style={{ color: '#2F3237' }}>2PM - 3PM</Text>
                                            </Badge>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback>
                                            <Badge style={{ backgroundColor: '#FFFFFF', borderColor: '#2F3237', borderWidth: 1 }}>
                                                <Text style={{ color: '#2F3237' }}>3PM - 4PM</Text>
                                            </Badge>
                                        </TouchableWithoutFeedback>
                                        </View>
                                        <View style={{flexDirection:'row',margin:10,justifyContent:'space-evenly'}}>
                                        <TouchableWithoutFeedback>
                                            <Badge style={{ backgroundColor: '#EBE1D7',  }}>
                                                <Text style={{ color: '#2F3237' }}>4PM - 5PM</Text>
                                            </Badge>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback>
                                            <Badge style={{ backgroundColor: '#FFFFFF', borderColor: '#2F3237', borderWidth: 1 }}>
                                                <Text style={{ color: '#2F3237' }}>5PM - 6PM</Text>
                                            </Badge>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback>
                                            <Badge style={{ backgroundColor: '#FFFFFF', borderColor: '#2F3237', borderWidth: 1 }}>
                                                <Text style={{ color: '#2F3237' }}>6PM - 7PM</Text>
                                            </Badge>
                                        </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                    <View style={styles.button_view2}>
                                        <Button block style={styles.buttonsubmit2} onPress={() => this.logins()}>
                                            <Text style={{ color: '#fff' }}>Add to Cart</Text>
                                        </Button>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </Modal>
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
        margin: 5,
        backgroundColor: '#FFF',
        shadowOpacity: 0.8,
        elevation: 4,
        height: responsiveHeight(48),
        width: responsiveWidth(85),
        alignItems: 'center'
    },
    GalleryBox2: {
        margin: 5,
        backgroundColor: '#FFF',
        shadowOpacity: 0.8,
        elevation: 4,
        height: responsiveHeight(15),
        width: responsiveWidth(85),
        
    },
    GalleryImg: {
        //marginTop: 1,
        borderRadius: 20,

        borderColor: '#f8668b',
    },
    SingelImgBanner: {
        backgroundColor: '#F2F2F2',
        marginTop: 30,
        borderColor: '#F2F2F2',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        width: BannerWidth - 20,
        height: BannerHeight,
        borderRadius: 15,
        marginBottom: 10,
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
        width: responsiveWidth(48),
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
        fontWeight: 'bold',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
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
        height: 100,
        width: 100,
        resizeMode: 'contain',
        margin: 5,
        borderRadius: 100 / 2
    },
    activeMenuView: {
        paddingLeft: 5,
        paddingRight: 5,
        height: responsiveHeight(5),
        width: responsiveWidth(21),
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
        width: responsiveWidth(21),
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
        paddingLeft: 5,
        paddingRight: 5,
        height: responsiveHeight(20),
        width: responsiveWidth(29),
        marginRight: 10,
        backgroundColor: '#EBE1D7',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 8
    },
    activeMenuText2: {
        fontSize: responsiveFontSize(2.3),
        color: '#4F4F4F',
        marginTop: 10,
        marginBottom: 10
    },
    inactiveMenuView2: {
        paddingLeft: 5,
        paddingRight: 5,
        height: responsiveHeight(20),
        width: responsiveWidth(29),
        marginRight: 10,
        backgroundColor: '#F2F2F2',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 8

    },
    inactiveMenuText2: {
        fontSize: responsiveFontSize(2.3),
        color: '#4F4F4F',
        marginTop: 10,
        marginBottom: 10
    },
    //modal 
    centeredView: {
        //flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    button_view: {
        marginLeft: 20,
        marginRight: 10,
        marginTop: 30,
        marginBottom: 30,
        alignItems: 'center',
        flex: 1,
    },
    buttonsubmit: {
        backgroundColor: '#2F3237',
        borderRadius: 10,
        height: responsiveHeight(6),
        width: responsiveWidth(90),
    },
    button_view2: {
        marginLeft: 75,
        //marginRight: 50,
        marginTop: 30,
        marginBottom: 30,
        alignItems: 'center',
        flex: 1,
    },
    buttonsubmit2: {
        backgroundColor: '#2F3237',
        borderRadius: 10,
        height: responsiveHeight(6),
        width: responsiveWidth(50),
    },
    GalleryBoxModal: {
        backgroundColor: '#FFF',
        shadowOpacity: 0.8,
        elevation: 4,

        width: responsiveWidth(87),
        borderRadius: 5,

        padding: 10
    },
    searchSection: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E4E4E4',
        height: responsiveHeight(12),
        width: responsiveWidth(87),
        borderRadius: 5,
        marginBottom: 20,
        marginTop: 10,
    },
    input: {
        flex: 1,
        //paddingTop: 10,
        //paddingRight: 10,
        //paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#E4E4E4',
        color: '#424242',
    },

});
