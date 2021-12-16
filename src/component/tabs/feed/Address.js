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
export class Address extends Component {
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
                            <Text style={{ fontSize: responsiveFontSize(2.5), color: '#2B2B2B', fontWeight: 'bold' }}>Address</Text>
                        </View>
                        <View style={styles.settingicon}>
                            <View style={{ height: 40, width: 40, backgroundColor: '#FFF', borderRadius: 5, justifyContent: 'center', alignItems: 'center', shadowOpacity: 0.8, elevation: 4 }}>
                                <FontAwesomeIcon name="ellipsis-h" size={20} color="#A9A9A9" onPress={() => this.props.navigation.openDrawer()} />
                            </View>
                        </View>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', margin: 20 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Account')}>
                                <View style={styles.inactiveMenuView}>
                                    <Image
                                        source={IMAGE.ICON_ACCOUNT_MENU}
                                        resizeMode='contain'
                                        style={{ width: responsiveWidth(4), height: responsiveHeight(4), }}
                                    />
                                    <Text style={styles.inactiveMenuText}>My Account </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Address')}>
                                <View style={styles.activeMenuView}>
                                    <Image
                                        source={IMAGE.ICON_MAP}
                                        resizeMode='contain'
                                        style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                    />
                                    <Text style={styles.activeMenuText}>Save Address </Text>
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
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{ margin: 20, flexDirection: 'row', }}>
                            <View style={styles.GalleryBox}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 20 }}>
                                    <View style={{ alignItems: "flex-start" }}>
                                        <RadioForm
                                            radio_props={radio_props}
                                            initial={0}
                                            buttonColor={'#000'}
                                            borderWidth={1}
                                            buttonInnerColor={'#000'}
                                            buttonOuterColor={this.state.value === 0 ? '#000' : '#000'}
                                            buttonSize={10}
                                            buttonOuterSize={20}
                                            labelColor={'#000'}
                                            onPress={(value) => { this.setState({ value: value }) }}
                                        />
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'baseline' }}>
                                        <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: 'bold' }}>Home</Text>
                                    </View>
                                    <View style={{ alignItems: "flex-end" }}>
                                        <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
                                            <Image
                                                source={IMAGE.ICON_MENU_DOT}
                                                resizeMode='contain'
                                                style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 40, width: responsiveWidth(38) }}>
                                    <Image
                                        source={IMAGE.ICON_PHONE}
                                        resizeMode='contain'
                                        style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                    />
                                    <Text style={{ marginLeft: 5, color: '#A9A9A9' }}>+91 4498767654</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 40, width: responsiveWidth(38) }}>
                                    <Image
                                        source={IMAGE.ICON_MAP}
                                        resizeMode='contain'
                                        style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                    />
                                    <Text style={{ marginLeft: 5, color: '#A9A9A9' }}>52 Riverside,Norcross,GA30085</Text>
                                </View>

                            </View>
                            <View style={styles.GalleryBox}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 20 }}>
                                    <View style={{ alignItems: "flex-start" }}>
                                        <RadioForm
                                            radio_props={radio_props}
                                            initial={1}
                                            buttonColor={'#000'}
                                            borderWidth={1}
                                            buttonInnerColor={'#000'}
                                            buttonOuterColor={this.state.value === 0 ? '#000' : '#000'}
                                            buttonSize={10}
                                            buttonOuterSize={20}
                                            labelColor={'#000'}
                                            onPress={(value) => { this.setState({ value: value }) }}
                                        />
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'baseline' }}>
                                        <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: 'bold' }}>Office</Text>
                                    </View>
                                    <View style={{ alignItems: "flex-end" }}>
                                        <Image
                                            source={IMAGE.ICON_MENU_DOT}
                                            resizeMode='contain'
                                            style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 40, width: responsiveWidth(38) }}>
                                    <Image
                                        source={IMAGE.ICON_PHONE}
                                        resizeMode='contain'
                                        style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                    />
                                    <Text style={{ marginLeft: 5, color: '#A9A9A9' }}>+91 4498767654</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 40, width: responsiveWidth(38) }}>
                                    <Image
                                        source={IMAGE.ICON_MAP}
                                        resizeMode='contain'
                                        style={{ width: responsiveWidth(4), height: responsiveHeight(4) }}
                                    />
                                    <Text style={{ marginLeft: 5, color: '#A9A9A9' }}>52 Riverside,Norcross,GA30085</Text>
                                </View>
                            </View>
                        </View>

                    </ScrollView>

                    <Text style={styles.portionHeaderText}>Personal Information</Text>

                    <View style={{ flex: 1, alignItems: 'center', marginTop: 30 }}>
                        <View style={styles.searchSection}>
                            <Image
                                source={IMAGE.ICON_MAP}
                                resizeMode='contain'
                                style={styles.searchIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Address"
                                placeholderTextColor="#7C7C7C"
                                value={this.state.email}
                                onChangeText={(email) => { this.setState({ email }) }}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={styles.searchSection}>
                            <Image
                                source={IMAGE.ICON_MAP}
                                resizeMode='contain'
                                style={styles.searchIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Post Code"
                                placeholderTextColor="#7C7C7C"
                                value={this.state.email}
                                onChangeText={(email) => { this.setState({ email }) }}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={styles.searchSection}>
                            <Image
                                source={IMAGE.ICON_MAP}
                                resizeMode='contain'
                                style={styles.searchIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="City"
                                placeholderTextColor="#7C7C7C"
                                value={this.state.email}
                                onChangeText={(email) => { this.setState({ email }) }}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={styles.searchSection}>
                            <Image
                                source={IMAGE.ICON_MAP}
                                resizeMode='contain'
                                style={styles.searchIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="State"
                                placeholderTextColor="#7C7C7C"
                                value={this.state.email}
                                onChangeText={(email) => { this.setState({ email }) }}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={styles.searchSection}>
                            <Image
                                source={IMAGE.ICON_PHONE}
                                resizeMode='contain'
                                style={styles.searchIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Phone Number"
                                placeholderTextColor="#7C7C7C"
                                value={this.state.email}
                                onChangeText={(email) => { this.setState({ email }) }}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={styles.searchSection}>
                            <Image
                                source={IMAGE.ICON_PHONE}
                                resizeMode='contain'
                                style={styles.searchIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Floor"
                                placeholderTextColor="#7C7C7C"
                                value={this.state.email}
                                onChangeText={(email) => { this.setState({ email }) }}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={styles.searchSection}>
                            <Image
                                source={IMAGE.ICON_APARTMENT}
                                resizeMode='contain'
                                style={styles.searchIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Apartment No"
                                placeholderTextColor="#7C7C7C"
                                value={this.state.email}
                                onChangeText={(email) => { this.setState({ email }) }}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={styles.searchSection}>
                            <Image
                                source={IMAGE.ICON_ROUTE}
                                resizeMode='contain'
                                style={styles.searchIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Avenue"
                                placeholderTextColor="#7C7C7C"
                                value={this.state.email}
                                onChangeText={(email) => { this.setState({ email }) }}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={styles.searchSection}>
                            <Image
                                source={IMAGE.ICON_BUILDING}
                                resizeMode='contain'
                                style={styles.searchIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Building"
                                placeholderTextColor="#7C7C7C"
                                value={this.state.email}
                                onChangeText={(email) => { this.setState({ email }) }}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', marginLeft: 12, }}>
                            <CheckBox
                                value={this.state.isSelected1}
                                onValueChange={(isSelected) => this.check1()}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>Home</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 12, }}>
                            <CheckBox
                                value={this.state.isSelected2}
                                onValueChange={(isSelected2) => this.check2()}
                                style={styles.checkbox}
                                color="default"
                            />
                            <Text style={styles.label}>Office</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 12, }}>
                        <CheckBox
                            value={this.state.isSelected1}
                            onValueChange={(isSelected) => this.check1()}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>Make this is your default address</Text>
                    </View>
                    <View style={styles.button_view}>
                        <Button block style={styles.buttonsubmit} onPress={() => this.logins()}>
                            <Text style={{ color: '#fff' }}>Save</Text>
                        </Button>
                    </View>
                </ScrollView>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({ modalVisible: false });
                    }}>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => { this.setState({ modalVisible: false }) }}
                    >
                        <View
                            style={{
                                height: '20%',
                                width: '50%',
                                marginTop: '12%',
                                marginLeft: 'auto',
                                backgroundColor: 'rgba(255,255,255,1)'
                            }}>
                            <View style={{
                                position: 'absolute', height: 30, width: 30,
                                borderRadius: 15, backgroundColor: 'rgba(255, 255, 255,0.8)', right: 15, top: 15, alignItems: 'center', justifyContent: 'center', zIndex: 2000
                            }}>
                                {/* <TouchableOpacity onPress={() => {
                                        this.setState({ modalVisible: false });
                                    }}>
                                        <FontAwesomeIcon name='times' color={'black'} size={25} />
                                    </TouchableOpacity> */}
                            </View>
                            <TouchableOpacity onPress={() => { this.logout() }} >
                                <View style={{ marginLeft: 20, marginTop: 50, alignItems: 'center', flexDirection: 'row' }}>
                                    <FontAwesomeIcon name='sign-out' color={'black'} size={25} />
                                    <Text style={{ fontSize: 20, marginLeft: 25 }}>Logout</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
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
        marginRight: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        height: responsiveHeight(23),
        width: responsiveWidth(55),
        shadowOpacity: 0.8,
        elevation: 4

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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E4E4E4',
        height: responsiveHeight(7),
        width: responsiveWidth(90),
        borderRadius: 5,
        marginBottom: 20,
    },
    searchIcon: {
        padding: 10,
        margin: 10,
        height: responsiveHeight(4),
        width: responsiveWidth(4),
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#E4E4E4',
        color: '#424242',
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

});
