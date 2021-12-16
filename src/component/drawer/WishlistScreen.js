import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, BackHandler, AsyncStorage, FlatList, ScrollView, ImageBackground, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { TouchableOpacity, TapGestureHandler } from 'react-native-gesture-handler';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AnimatedLoader from "react-native-animated-loader";
import AwesomeAlert from 'react-native-awesome-alerts';
import CustomHeader from '../CustomeHeader';
import { Button, Text } from 'native-base';
import b from '../BaseUrl';
import { IMAGE } from '../../../src/constants/Image';
const { width, height } = Dimensions.get("window");
const BannerWidth = Dimensions.get('window').width - 20;
const BannerHeight = 150;
const Entities = require('html-entities').XmlEntities;

export class WishlistScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productlist: '',
            isLoading: false,
            data_emty_check: false,
            showAlert: false,
            showAlert1: false,
            Msg: '',
            p_id: '',
            language: '',
        };
    }


    componentDidMount() {
        this.setState({ isLoading: true });
        this.getWishlistItem();
        setInterval(() => {
            this.languageCheck();
        }, 1000);
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

    getWishlistItem = async () => {

        AsyncStorage.getItem('usersid', (err, res) => {
            let usersid = JSON.parse(res);
            //console.log(usersid);
            const baseUrl = b.abc();
            const timestamp = Math.round(new Date().getTime() / 1000);
            const url = `${baseUrl}/wp-json/albaghlisponge/wishlist/product_list?a=${timestamp}&user_id=${usersid}`
            fetch(url)
                .then((response) => response.json())
                .then((resp) => {
                    //console.log(resp, 'getWishlistItem');
                    if (resp.success != true) {
                        this.setState({
                            productlist: resp,
                            isLoading: false
                        });

                    } else {
                        this.setState({
                            isLoading: false,
                            data_emty_check: true
                        });
                        //alert(resp.success_msg);
                    }

                })
                .catch(err => {
                    alert("Something Went Wrong");
                });
        });
    }

    trashItem = (p_id) => {
        /*Alert.alert(
            '',
            'Are You Want To Remove From Wishlist?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        AsyncStorage.getItem('usersid', (err, res) => {
                            let usersid = JSON.parse(res);
                            let prodid = p_id;
                            const baseUrl = b.abc();
                            const url = `${baseUrl}/wp-json/swissmade/wishlist/delete_product?prod_id=${prodid}&user_id=${usersid}`

                            fetch(url)
                                .then((response) => response.json())
                                .then((resp) => {
                                    //console.log(resp);
                                    if (resp.success == true) {
                                        this.setState({ Msg: resp.success_msg });
                                        this.showAlert();
                                        //alert(resp.success_msg);
                                        this.getWishlistItem();
                                    } else {
                                        //alert(resp.error_msg);
                                        this.setState({ Msg: resp.error_msg });
                                        this.showAlert();
                                    }

                                })
                                .catch(err => {
                                    alert("Something Went Wrong");
                                });
                        });
                    }
                },
            ],
            { cancelable: false },
        )*/
        this.setState({ p_id: p_id });
        this.showAlert1();
    }


    renderCategory = ({ item }) => {
        const entities = new Entities();
        const id = item.prod_id;
        const img = { uri: item.thumbnail_url };
        return (

            <View style={styles.childdiv} elevation={5} >
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetails', { id })}>
                    <Image source={img} style={styles.moreImg} />
                </TouchableOpacity>
                {/* <View style={{ flexDirection: 'column', padding: 5, width: responsiveWidth(55), justifyContent: 'space-between' }}> */}
                <View style={{ padding: 5, width: responsiveWidth(55), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.userNmae}>{entities.decode(item.title)} </Text>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.price}>{entities.decode(item.original_currency)} {item.original_price}</Text>

                    </View> */}
                </View>
                <FontAwesomeIcon style={styles.navItemStyle} name="times-circle" size={22} onPress={() => this.trashItem(item.prod_id)} />

            </View>

        )
    }

    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };
    showAlert1 = () => {
        this.setState({
            showAlert1: true
        });
    };
    hideAlert1 = () => {
        this.setState({
            showAlert1: false
        });
    };
    remove_whishlist_item = () => {
        this.setState({isLoading: true});
        AsyncStorage.getItem('usersid', (err, res) => {
            let usersid = JSON.parse(res);
            let prodid = this.state.p_id;
            const baseUrl = b.abc();
            const url = `${baseUrl}/wp-json/albaghlisponge/wishlist/delete_product?prod_id=${prodid}&user_id=${usersid}`

            fetch(url)
                .then((response) => response.json())
                .then((resp) => {
                    console.log(resp);
                    if (resp.success == true) {
                        this.setState({isLoading: false});
                        if (this.state.language == 'ar') {
                            this.setState({ Msg: "تم حذف المنتج بنجاح من قائمك المفضلة" });
                        } else {
                            this.setState({ Msg: "The product has been successfully removed from your wishlist" });
                        }
                        this.showAlert();
                        //alert(resp.success_msg);
                        this.getWishlistItem();
                    } else {
                        this.setState({isLoading: false});
                        //alert(resp.error_msg);
                        this.setState({ Msg: resp.error_msg });
                        this.showAlert();
                    }

                })
                .catch(err => {
                    alert("Something Went Wrong");
                });
        });
    }
    render() {
        const { showAlert } = this.state;
        const { showAlert1 } = this.state;
        const { Msg } = this.state;
        return (
            <View style={styles.container} >
                {this.state.language == 'ar' || this.state.language == ''? (
                    <CustomHeader title="قائمة الرغبات" navigation={this.props.navigation} />
                ) : (
                    <CustomHeader title="Wishlist" navigation={this.props.navigation} />
                )}
                <View style={{ backgroundColor: '#fff', margin: 5, flex: 1 }}>
                    {
                        this.state.data_emty_check ?
                            <View style={{ backgroundColor: '#fff', margin: 5, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={IMAGE.ICON_WISH}
                                    resizeMode='contain'
                                    style={{ width: 60, height: 60 }}
                                />
                                {this.state.language == 'ar' || this.state.language == ''? (
                                    <Text style={{ fontSize: responsiveFontSize(3), padding: 10 }}>قائمة الرغبات الخاصة بك فارغة حاليا</Text>
                                ) : (
                                    <Text style={{ fontSize: responsiveFontSize(3), padding: 10 }}>Your wishlist is currently empty</Text>
                                )}
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    {this.state.language == 'ar' || this.state.language == ''? (
                                        <Button info style={{ backgroundColor: '#ff4254' }} onPress={() => this.props.navigation.navigate('Home')}><Text> العودة الى المتجر </Text></Button>
                                    ) : (
                                        <Button info style={{ backgroundColor: '#ff4254' }} onPress={() => this.props.navigation.navigate('Home')}><Text> Return To Shop </Text></Button>
                                    )}
                                </View>
                            </View>
                            :
                            <ScrollView>
                                <View style={{ backgroundColor: '#fff', margin: 5, flex: 1 }}>
                                    <View style={styles.maindiv}>
                                        <FlatList
                                            data={this.state.productlist}
                                            renderItem={this.renderCategory}
                                            keyExtractor={(item, index) => index}
                                            showsVerticalScrollIndicator={false}
                                        />


                                    </View>
                                </View>
                            </ScrollView>
                    }
                </View>
                <AnimatedLoader
                    visible={this.state.isLoading}
                    overlayColor="rgba(255,255,255,1)"
                    source={require("../../../loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                />
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title=""
                    messageStyle={{ fontSize: responsiveFontSize(2) }}
                    message={Msg}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    cancelText={this.state.language == 'ar' || this.state.language == '' ? ("حسنا") : ("OK")}
                    cancelButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        this.hideAlert();
                    }}
                    onConfirmPressed={() => {
                        this.hideAlert();

                    }}
                />
                {this.state.language == 'ar' || this.state.language == ''? (
                    <AwesomeAlert
                        show={showAlert1}
                        showProgress={false}
                        title="هل تريد إزالة من قائمة الرغبات"
                        message=""
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="لا ، إلغاء"
                        confirmText="نعم ، احذفها"
                        confirmButtonColor="#DD6B55"
                        cancelButtonTextStyle={{ color: "#000" }}
                        onCancelPressed={() => {
                            this.hideAlert1();
                        }}
                        onConfirmPressed={() => {
                            this.hideAlert1();
                            this.remove_whishlist_item();

                        }}
                    />
                ) : (
                    <AwesomeAlert
                        show={showAlert1}
                        showProgress={false}
                        title="Are You Want To Remove From Wishlist?"
                        message=""
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="No, cancel"
                        confirmText="Yes, delete it"
                        confirmButtonColor="#DD6B55"
                        cancelButtonTextStyle={{ color: "#000" }}
                        onCancelPressed={() => {
                            this.hideAlert1();
                        }}
                        onConfirmPressed={() => {
                            this.hideAlert1();
                            this.remove_whishlist_item();

                        }}
                    />

                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    maindiv: {
        //height: responsiveHeight(56.6),

    },
    childdiv: {
        flexDirection: 'row',
        height: responsiveHeight(17.9),
        backgroundColor: '#eef3f7',
        margin: 5,
        borderRadius: 6
    },
    TextInput: {
        height: responsiveHeight(7),
        width: responsiveWidth(60),
        alignSelf: 'stretch',
        fontSize: responsiveFontSize(2),
        borderWidth: 0,
        backgroundColor: '#fff',
        borderColor: '#eaeaea',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10
    },
    moreImg: {
        height: responsiveHeight(16),
        width: responsiveWidth(28),
        resizeMode: 'contain',
        margin: 5,
        borderRadius: 5
    },
    navItemStyle: {
        margin: -5,
        marginTop: 5
    },
    price: {
        marginTop: 10,
        color: 'red'
    },
    lottie: {
        width: 100,
        height: 100
    }

});