import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, BackHandler, AsyncStorage, FlatList, ScrollView, ImageBackground, TextInput, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { TapGestureHandler } from 'react-native-gesture-handler';
import b from '../BaseUrl';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AnimatedLoader from "react-native-animated-loader";
import CustomHeader from '../CustomeHeader';
import { IMAGE } from '../../../src/constants/Image';

const { width, height } = Dimensions.get("window");
const BannerWidth = Dimensions.get('window').width - 20;
const BannerHeight = 150;
const Entities = require('html-entities').XmlEntities;

export class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productlist: '',
            isLoading: false,
            data_emty_check: false,
            language: '',
            login_chk: false
        };
    }


    componentDidMount() {
        this.setState({ isLoading: true });
        this.getOrder();
        this.languageCheck();
        this.isLoggedin();
        // setInterval(() => {

        // }, 1000);
    }

    languageCheck() {
        AsyncStorage.getItem('language', (err, languageres) => {
            //console.log(languageres + "language from order screen");
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

    isLoggedin() {
        AsyncStorage.getItem('usersid', (err, res) => {
            AsyncStorage.getItem('auth_hash', (err, res2) => {
                //console.log("IsLoginCheck" + res);
                if (res == null && res2 == null) {
                    AsyncStorage.removeItem('usersid');
                    AsyncStorage.removeItem('auth_hash');
                    //AsyncStorage.clear();
                    this.setState({

                        login_chk: true
                    });
                } else {
                    this.setState({
                        login_chk: false
                    });
                }
            });
        });
    }

    getOrder = async () => {

        AsyncStorage.getItem('auth_hash', (err, res) => {
            AsyncStorage.getItem('guest_id', (err, guest_res) => {
                const baseUrl = b.abc();
                let usersauth = JSON.parse(res);
                let guestauth = guest_res;
                //let guestauth = 'anis.elvirainfotech@gmail.com';
                console.log(usersauth, 'auth hash for user');
                console.log(guestauth, 'email for guest user');
                const timestamp = Math.round(new Date().getTime() / 1000);
                if (guestauth == null) {
                    var url = `${baseUrl}/wp-json/albaghlisponge/user/orders?a=${timestamp}&auth_hash=${usersauth}`
                } else {
                    var url = `${baseUrl}/wp-json/albaghlisponge/user/orders?a=${timestamp}&guest_auth_hash=${guestauth}`
                }

                //const url = `https://elvirainfotechcloud.com/testing-wp/wp-json/swissmade/user/orders/?auth_hash=c2b0f186be07f44db79871873bce26c7` 
                fetch(url)
                    .then((response) => response.json())
                    .then((resp) => {
                        //console.log(resp);
                        if (resp.error == false) {
                            this.setState({
                                productlist: resp.orders,
                                isLoading: false
                            });
                        } else {
                            this.setState({
                                isLoading: false,
                                data_emty_check: true
                            });
                            //alert(resp.error_msg)
                        }

                    })
                    .catch(err => {
                        alert("Something Went Wrong");
                    });
            });
        });
    }


    renderCategory = ({ item }) => {
        const entities = new Entities();
        const orderid = item.order_id;
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('SingleOrder', { orderid })}>
                <View style={styles.childdiv} elevation={5}>
                    {this.state.language == 'ar' ?
                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', position: 'relative' }}>
                            <View style={{ flexDirection: 'column', padding: 10, justifyContent: 'space-between' }}>
                                <Text style={styles.userNmae}>رقم التعريف الخاص بالطلب : {item.order_id} </Text>
                                <Text style={styles.userNmae}>تاريخ الطلب : {item.order_created} </Text>

                                <Text style={styles.userNmae}>طريقة الدفع او السداد : {item.payment_method} </Text>
                                <View style={{ backgroundColor: '#ff4254', width: responsiveWidth(90), height: responsiveHeight(5), borderRadius: 15, margin: 5, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}>
                                    <Text style={styles.price}>مجموع : {entities.decode(item.currency)} {item.total}</Text>
                                    {
                                        item.order_status == 'processing' ?
                                            <Text style={styles.userstatusNmae}> الحالة : <Text style={{ color: 'green' }}>{'\u2B24'}</Text> معالجة </Text>
                                            :
                                            <Text style={styles.userstatusNmae}> الحالة : <Text style={{ color: '#722f37' }}>{'\u2B24'}</Text> {item.order_status} </Text>

                                    }
                                </View>
                            </View>
                        </View>
                        :
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'relative' }}>
                            <View style={{ flexDirection: 'column', padding: 10, justifyContent: 'space-between' }}>
                                <Text style={styles.userNmae}>Order Id : {item.order_id} </Text>
                                <Text style={styles.userNmae}>Order Date : {item.order_created} </Text>

                                <Text style={styles.userNmae}>Payment Method : {item.payment_method} </Text>
                                <View style={{ backgroundColor: '#ff4254', width: responsiveWidth(90), height: responsiveHeight(5), borderRadius: 15, margin: 5, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}>
                                    <Text style={styles.price}>TOTAL : {entities.decode(item.currency)} {item.total}</Text>
                                    {
                                        item.order_status == 'processing' ?
                                            <Text style={styles.userstatusNmae}> Status : <Text style={{ color: 'green' }}>{'\u2B24'}</Text> Processing </Text>
                                            :
                                            <Text style={styles.userstatusNmae}> Status : <Text style={{ color: '#722f37' }}>{'\u2B24'}</Text> {item.order_status} </Text>

                                    }
                                </View>
                            </View>
                        </View>
                    }
                    {/* <Icon name='keyboard-arrow-right' color={'black'} size={27} style={{ position: 'absolute', right: 5, marginTop: 35 }} onPress={() => this.props.navigation.navigate('SingleOrder', { orderid })} /> */}
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container} >
                {this.state.language == 'ar' || this.state.language == ''? (
                    <CustomHeader title="طلبك" navigation={this.props.navigation} />
                ) : (
                    <CustomHeader title="Your Order" navigation={this.props.navigation} />
                )}
                {
                    this.state.data_emty_check ?
                        <View style={{ backgroundColor: '#fff', margin: 5, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {this.state.language == 'ar' || this.state.language == ''? (
                                <Text style={{ fontSize: responsiveFontSize(3), padding: 10 }}>لم يتم إجراء أي طلب حتى الآن</Text>
                            ) : (
                                <Text style={{ fontSize: responsiveFontSize(3), padding: 10 }}>No order has been made yet</Text>
                            )}
                            <View style={{ justifyContent: 'center' }}>
                                {this.state.language == 'ar' || this.state.language == ''? (
                                    <Button info onPress={() => this.props.navigation.navigate('Home')} style={{ backgroundColor: '#ff4254' }}><Text> تصفح المنتجات </Text></Button>
                                ) : (
                                    <Button info onPress={() => this.props.navigation.navigate('Home')} style={{ backgroundColor: '#ff4254' }}><Text> Browse Products </Text></Button>
                                )}
                            </View>
                        </View>
                        :
                        <FlatList
                            data={this.state.productlist}
                            renderItem={this.renderCategory}
                            keyExtractor={(item, index) => index}
                            showsVerticalScrollIndicator={false}
                        />

                }
                <AnimatedLoader
                    visible={this.state.isLoading}
                    source={require("../../../loader.json")}
                    overlayColor="rgba(255,255,255,1)"
                    animationStyle={styles.lottie}
                    speed={1}
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
    maindiv: {

    },
    childdiv: {
        flexDirection: 'row',
        height: responsiveHeight(20),
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
        height: responsiveHeight(15),
        width: responsiveWidth(25),
        resizeMode: 'contain',
        margin: 5,
        borderRadius: 5
    },
    navItemStyle: {
        margin: 5
    },
    price: {
        //marginTop: 10,
        color: '#fff'
    },
    userNmae: {
        fontSize: responsiveFontSize(2),
        fontStyle: 'normal',
        color: '#000'
    },
    userstatusNmae: {
        fontSize: responsiveFontSize(2),
        fontStyle: 'normal',
        color: '#fff'
    },
    lottie: {
        width: 100,
        height: 100
    }

});
