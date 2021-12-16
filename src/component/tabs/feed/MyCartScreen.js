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
    CheckBox,
    TextInput,
    Modal,

} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Item, Input, Icon, Button, Text, List, ListItem, Body, Left, Right, Thumbnail, Tab, Tabs, Badge } from 'native-base';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
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
const radio_props = [
    { label: '', value: 0 },

];

const horizontalMargin = 5;
const slideWidth = 300;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 0.5;
const itemHeight = 200;


//const entities = new Entities();

class MyCartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: '',
            slider: [],
            isLoading: false,
            isSelected1: false,
            isSelected2: false,
            value: 0,
            modalVisible: false,
        };
    }

    componentDidMount() {
        //this.languageCheck();
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
                            <Text style={{ fontSize: responsiveFontSize(2.5), color: '#2B2B2B', fontWeight: 'bold' }}>Cart</Text>
                        </View>
                        <View style={styles.settingicon}>
                            <View style={{ height: 40, width: 40, backgroundColor: '#FFF', borderRadius: 5, justifyContent: 'center', alignItems: 'center', shadowOpacity: 0.8, elevation: 4 }}>
                                <FontAwesomeIcon name="ellipsis-h" size={20} color="#A9A9A9" onPress={() => this.props.navigation.openDrawer()} />
                            </View>
                        </View>
                    </View>
                    <View style={{ margin: 20, }}>
                        <View style={styles.GalleryBox}>
                            <View style={{ borderBottomColor: '#E3E3E3', borderBottomWidth: 1, paddingBottom: 20, alignItems: 'center', margin: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 5, }}>
                                    <View style={{ alignItems: "flex-start" }}>
                                        <Image source={require('../../../../assets/resturent1.png')} style={styles.moreImg} />
                                    </View>
                                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'baseline' }}>
                                        <Text style={{ color: '#000000', fontSize: responsiveFontSize(2.5), fontWeight: '900' }}>Budda Bowl Rice</Text>
                                        <View style={{ flexDirection: 'row', }}>
                                            <View style={{ borderColor: '#B9B2AB', borderWidth: 0.5, padding: 3, borderRadius: 50, marginRight: 5 }}>
                                                <Image
                                                    source={IMAGE.ICON_BOWL1}
                                                    resizeMode='contain'
                                                    style={{ width: 15, height: 15 }}
                                                />
                                            </View>
                                            <View style={{ borderColor: '#B9B2AB', borderWidth: 0.5, padding: 3, borderRadius: 50, marginRight: 5 }}>
                                                <Image
                                                    source={IMAGE.ICON_BOWL2}
                                                    resizeMode='contain'
                                                    style={{ width: 15, height: 15 }}
                                                />
                                            </View>
                                            <View style={{ borderColor: '#B9B2AB', borderWidth: 0.5, padding: 3, borderRadius: 50, marginRight: 5 }}>
                                                <Image
                                                    source={IMAGE.ICON_BOWL3}
                                                    resizeMode='contain'
                                                    style={{ width: 15, height: 15 }}
                                                />
                                            </View>
                                        </View>
                                        <Text style={{ color: '#000000', fontSize: responsiveFontSize(2.5), fontWeight: '900' }}>KD 25.00</Text>
                                    </View>
                                    <View style={{ alignItems: "flex-end" }}>
                                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <View style={{ alignItems: "flex-end" }}>
                                                <Image
                                                    source={IMAGE.ICON_RECYCLE}
                                                    resizeMode='contain'
                                                    style={{ width: 20, height: 20 }}
                                                />
                                            </View>
                                            <View style={{ alignItems: "flex-end" }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ backgroundColor: '#EBE1D7', padding: 5, borderRadius: 5, marginRight: 10 }}>
                                                        <FontAwesomeIcon name="minus" size={15} color="#000000" />
                                                    </View>
                                                    <Text style={{ marginRight: 10, fontSize: responsiveFontSize(2.5) }}>2</Text>
                                                    <View style={{ backgroundColor: '#EBE1D7', padding: 5, borderRadius: 5, marginRight: 0 }}>
                                                        <FontAwesomeIcon name="plus" size={15} color="#000000" />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.searchSection}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter Speacial Instruction"
                                        placeholderTextColor="#7C7C7C"
                                        value={this.state.email}
                                        onChangeText={(email) => { this.setState({ email }) }}
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
                            </View>
                            <View style={{ borderBottomColor: '#E3E3E3', borderBottomWidth: 1, paddingBottom: 20, alignItems: 'center', margin: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 5, }}>
                                    <View style={{ alignItems: "flex-start" }}>
                                        <Image source={require('../../../../assets/resturent1.png')} style={styles.moreImg} />
                                    </View>
                                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'baseline' }}>
                                        <Text style={{ color: '#000000', fontSize: responsiveFontSize(2.5), fontWeight: '900' }}>Budda Bowl Rice</Text>
                                        <View style={{ flexDirection: 'row', }}>
                                            <View style={{ borderColor: '#B9B2AB', borderWidth: 0.5, padding: 3, borderRadius: 50, marginRight: 5 }}>
                                                <Image
                                                    source={IMAGE.ICON_BOWL1}
                                                    resizeMode='contain'
                                                    style={{ width: 15, height: 15 }}
                                                />
                                            </View>
                                            <View style={{ borderColor: '#B9B2AB', borderWidth: 0.5, padding: 3, borderRadius: 50, marginRight: 5 }}>
                                                <Image
                                                    source={IMAGE.ICON_BOWL2}
                                                    resizeMode='contain'
                                                    style={{ width: 15, height: 15 }}
                                                />
                                            </View>
                                            <View style={{ borderColor: '#B9B2AB', borderWidth: 0.5, padding: 3, borderRadius: 50, marginRight: 5 }}>
                                                <Image
                                                    source={IMAGE.ICON_BOWL3}
                                                    resizeMode='contain'
                                                    style={{ width: 15, height: 15 }}
                                                />
                                            </View>
                                        </View>
                                        <Text style={{ color: '#000000', fontSize: responsiveFontSize(2.5), fontWeight: '900' }}>KD 25.00</Text>
                                    </View>
                                    <View style={{ alignItems: "flex-end" }}>
                                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <View style={{ alignItems: "flex-end" }}>
                                                <Image
                                                    source={IMAGE.ICON_RECYCLE}
                                                    resizeMode='contain'
                                                    style={{ width: 20, height: 20 }}
                                                />
                                            </View>
                                            <View style={{ alignItems: "flex-end" }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ backgroundColor: '#EBE1D7', padding: 5, borderRadius: 5, marginRight: 10 }}>
                                                        <FontAwesomeIcon name="minus" size={15} color="#000000" />
                                                    </View>
                                                    <Text style={{ marginRight: 10, fontSize: responsiveFontSize(2.5) }}>2</Text>
                                                    <View style={{ backgroundColor: '#EBE1D7', padding: 5, borderRadius: 5, marginRight: 0 }}>
                                                        <FontAwesomeIcon name="plus" size={15} color="#000000" />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.searchSection}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter Speacial Instruction"
                                        placeholderTextColor="#7C7C7C"
                                        value={this.state.email}
                                        onChangeText={(email) => { this.setState({ email }) }}
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#F2F2F2', borderRadius: 5, width: responsiveWidth(90), marginTop: 10 }}>
                            <Item>
                                <Input placeholder="Coupon Code"
                                    onChangeText={(text) => this.setState({ search: text })}
                                    value={this.state.search}
                                />

                                <Text style={{ marginRight: 10, color: '#32353A', fontSize: responsiveFontSize(2), fontWeight: '900' }}>Apply</Text>
                            </Item>
                        </View>
                        <Text style={styles.portionHeaderText}>Payment Summary</Text>
                        <View style={styles.GalleryBox}>
                            <View style={{ margin: 10, borderBottomColor: '#E3E3E3', borderBottomWidth: 1, paddingBottom: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                                    <View>
                                        <Text style={{ color: '#ABABAB', fontSize: responsiveFontSize(2) }}>Sub Total</Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: '#ABABAB', fontSize: responsiveFontSize(2) }}>KD 50.00</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                                    <View>
                                        <Text style={{ color: '#ABABAB', fontSize: responsiveFontSize(2) }}>Coupon Discount</Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: '#ABABAB', fontSize: responsiveFontSize(2) }}>KD 60.00</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                                    <View>
                                        <Text style={{ color: '#ABABAB', fontSize: responsiveFontSize(2) }}>Delivery Fees</Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: '#ABABAB', fontSize: responsiveFontSize(2) }}>KD 10.00</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ margin: 10, paddingBottom: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                                    <View>
                                        <Text style={{ color: '#2F3237', fontSize: responsiveFontSize(2.5) }}>Grand Total</Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: '#2F3237', fontSize: responsiveFontSize(2.5) }}>KD 120</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={IMAGE.ICON_DELIVERY_MAN}
                                resizeMode='contain'
                                style={{ width: 30, height: 30 }}
                            />
                            <Text style={{ color: '#D19A68', marginLeft: 5 }}>Remaining amount is KD 150 for Free Shipping</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <View style={styles.button_view2}>
                                <Button block style={styles.buttonsubmit2} onPress={() => this.logins()}>
                                    <Text style={{ color: '#2F3237' }}>+Add Item</Text>
                                </Button>
                            </View>
                            <View style={styles.button_view}>
                                <Button block style={styles.buttonsubmit} onPress={() => this.logins()}>
                                    <Text style={{ color: '#fff' }}>Checkout</Text>
                                </Button>
                            </View>
                        </View>
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

// const mapDispatchToProps = (dispatch)=>{
//     return {
//         removeItem:(product) => dispatch({type:'REMOVE_FROM_CART',payload:product})
//     }
// }

//export default connect(null,mapDispatchToProps)(MyCartScreen);
export default MyCartScreen;

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

        backgroundColor: '#FFFFFF',
        borderRadius: 3,

        width: responsiveWidth(90),
        shadowOpacity: 0.8,
        elevation: 4,
        marginBottom: 10

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
        //marginLeft: 20,
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
    },
    searchSection: {
        //flex: 1,
        justifyContent: 'center',

        backgroundColor: '#E4E4E4',
        height: responsiveHeight(6),
        width: responsiveWidth(85),
        borderRadius: 5,
        marginTop: 10
    },
    cardSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E4E4E4',
        height: responsiveHeight(7),
        width: responsiveWidth(90),
        borderRadius: 5,
        marginBottom: 20,
    },
    searchSection_row1: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E4E4E4',
        height: responsiveHeight(7),
        width: responsiveWidth(44),
        borderRadius: 5,
        marginBottom: 20,
        marginRight: 8
    },
    searchSection_row2: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E4E4E4',
        height: responsiveHeight(7),
        width: responsiveWidth(44),
        borderRadius: 5,
        marginBottom: 20,
        //marginRight:8
    },
    searchIcon: {
        padding: 10,
        margin: 10,
        height: responsiveHeight(3),
        width: responsiveWidth(3),
    },
    cardIcon: {
        height: responsiveHeight(3),
        width: responsiveWidth(3),
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#E4E4E4',
        color: '#424242',
    },
    button_view: {

        marginRight: 10,
        marginTop: 30,
        marginBottom: 30,
        alignItems: 'center',
        flex: 1,
    },
    buttonsubmit: {
        backgroundColor: '#2F3237',
        borderRadius: 8,
        height: responsiveHeight(7),
        width: responsiveWidth(44),
    },
    button_view2: {

        marginRight: 10,
        marginTop: 30,
        marginBottom: 30,
        alignItems: 'center',
        flex: 1,
    },
    buttonsubmit2: {
        borderWidth:.5,
        borderColor:'#2F3237',
        backgroundColor: '#fff',
        borderRadius: 8,
        height: responsiveHeight(7),
        width: responsiveWidth(44),
    },
    moreImg: {
        height: 70,
        width: 70,
        resizeMode: 'contain',
        margin: 5,
        borderRadius: 50,

    },

});
