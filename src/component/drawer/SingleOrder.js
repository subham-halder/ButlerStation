import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, BackHandler, AsyncStorage, FlatList, ScrollView, ImageBackground, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { TouchableOpacity, TapGestureHandler } from 'react-native-gesture-handler';
import b from '../BaseUrl';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AnimatedLoader from "react-native-animated-loader";
import CustomHeader from '../CustomeHeader';
import { IMAGE } from '../../../src/constants/Image';

const { width, height } = Dimensions.get("window");
const BannerWidth = Dimensions.get('window').width - 20;
const BannerHeight = 150;
const Entities = require('html-entities').XmlEntities;

export class SingleOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productlist: '',
            itemlist: '',
            orderid: '',
            orderdate: '',
            currency: '',
            orderstatus: '',
            paymethod: '',
            billname: '',
            billsname: '',
            billemail: '',
            billcountry: '',
            billcity: '',
            billphone: '',
            billpin: '',
            subtotal: '',
            isLoading: false,
            data_emty_check: false,
            language: '',
        };
    }


    componentDidMount() {
        // console.log("order detail");
        this.setState({ isLoading: true });
        this.getSingleOrder();
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

    getSingleOrder = async () => {

        const { navigation } = this.props;
        AsyncStorage.getItem('auth_hash', (err, res) => {
            AsyncStorage.getItem('guest_id', (err, guest_res) => {
                let usersauth = JSON.parse(res);
                let guestauth = guest_res;
                //let usersauth = 'c2b0f186be07f44db79871873bce26c7';
                const order_id = navigation.getParam('orderid', 'NO-ID');
                //console.log(usersauth + '/'+  order_id);
                if (guestauth == null) {
                    const baseUrl = b.abc();
                    const url = `${baseUrl}/wp-json/albaghlisponge/order/getsingle`;

                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json', 
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            auth_hash: usersauth,
                            o_id: order_id,
                        })
                    })
                        .then((response) => response.json())
                        .then((resp) => {
                            if (resp.error == false) {
                                this.setState({
                                    productlist: resp.orders,
                                    itemlist: resp.orders.items,
                                    orderid: order_id,
                                    orderdate: resp.orders.order_created,
                                    orderstatus: resp.orders.order_status,
                                    currency: resp.orders.currency,
                                    paymethod: resp.orders.payment_method,
                                    billfname: resp.orders.address.billing.first_name,
                                    billsname: resp.orders.address.billing.last_name,
                                    billemail: resp.orders.address.billing.email,
                                    billcountry: resp.orders.address.billing.country,
                                    billcity: resp.orders.address.billing.city,
                                    billphone: resp.orders.address.billing.phone,
                                    billpin: resp.orders.address.billing.postcode,
                                    subtotal: resp.orders.subtotal,
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
                } else {
                    const baseUrl = b.abc();
                    const url = `${baseUrl}/wp-json/albaghlisponge/order/guest/getsingle`;

                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: guestauth,
                            o_id: order_id,
                        })
                    })
                        .then((response) => response.json())
                        .then((resp) => {
                            if (resp.error == false) {
                                this.setState({
                                    productlist: resp.orders,
                                    itemlist: resp.orders.items,
                                    orderid: order_id,
                                    orderdate: resp.orders.order_created,
                                    orderstatus: resp.orders.order_status,
                                    currency: resp.orders.currency,
                                    paymethod: resp.orders.payment_method,
                                    billfname: resp.orders.address.billing.first_name,
                                    billsname: resp.orders.address.billing.last_name,
                                    billemail: resp.orders.address.billing.email,
                                    billcountry: resp.orders.address.billing.country,
                                    billcity: resp.orders.address.billing.city,
                                    billphone: resp.orders.address.billing.phone,
                                    billpin: resp.orders.address.billing.postcode,
                                    subtotal: resp.orders.subtotal,
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
                }
            });
        });
    }


    renderCategory = ({ item }) => {
        const entities = new Entities();
        return (
            <View>
                {this.state.language == 'ar' ? (
                    <View style={styles.childdiv3_rtl} elevation={5}>
                        <Image source={{ uri: item.thumb }} style={styles.moreImg} />
                        <View style={{ flexDirection: 'column', padding: 20, width: responsiveWidth(55), justifyContent: 'space-between' }}>
                            <Text style={styles.userNmae}>{entities.decode(item.name)}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <Text>:السعر</Text>
                                <Text style={styles.price}>{entities.decode(this.state.currency)} {item.item_total}</Text>
                                <Text>كمية : </Text>
                                <View style={{ backgroundColor: 'rgba(255,66,84,0.8)', height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 15, margin: 2, color: 'white' }}>{item.qty}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ) : (
                        <View style={styles.childdiv3} elevation={5}>
                            <Image source={{ uri: item.thumb }} style={styles.moreImg} />
                            <View style={{ flexDirection: 'column', padding: 20, width: responsiveWidth(55), justifyContent: 'space-between' }}>
                                <Text style={styles.userNmae}>{entities.decode(item.name)}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                    <Text>Price : </Text>
                                    <Text style={styles.price}>{entities.decode(this.state.currency)} {item.item_total}</Text>
                                    <Text>Qty : </Text>
                                    <View style={{ backgroundColor: 'rgba(255,66,84,0.8)', height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 15, margin: 2, color: 'white' }}>{item.qty}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container} >
                {this.state.language == 'ar' || this.state.language == ''? (
                    <CustomHeader title="تفاصيل طلبك" navigation={this.props.navigation} />
                ) : (
                        <CustomHeader title="Your Order Details" navigation={this.props.navigation} />
                    )}
                <ScrollView style={{ backgroundColor: '#fff', margin: 5, flex: 1, }}>
                    <View style={styles.maindiv}>
                        {this.state.language == 'ar' || this.state.language == ''? (
                            <View style={styles.childdiv_rtl} elevation={5}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'relative' }}>
                                    <View style={{ flexDirection: 'column', padding: 10, justifyContent: 'space-between' }}>
                                        <Text style={styles.userNmae}>رقم التعريف الخاص بالطلب : {this.state.orderid} </Text>
                                        <Text style={styles.userNmae}>تاريخ الطلب : {this.state.orderdate} </Text>
                                        {/* <Text style={styles.userNmae}>Order Status : <Text style={{ color: 'green' }}>{'\u2B24'}</Text> Processing </Text> */}
                                        <Text style={styles.userNmae}>طريقة الدفع او السداد : {this.state.paymethod}</Text>
                                        <View style={{ backgroundColor: '#ff4254', width: responsiveWidth(85), height: responsiveHeight(5), borderRadius: 15, margin: 5, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}>
                                            <Text style={styles.statusprice}>مجموع : {this.state.subtotal}</Text>
                                            {this.state.orderstatus == 'processing' ? (
                                                <Text style={styles.userstatusNmae}> الحالة : <Text style={{ color: 'green' }}>{'\u2B24'}</Text> Processing </Text>
                                            ) : (
                                                    <Text style={styles.userstatusNmae}> الحالة : <Text style={{ color: '#722f37' }}>{'\u2B24'}</Text> {this.state.orderstatus} </Text>
                                                )}
                                        </View>
                                    </View>
                                </View>

                            </View>
                        ) : (
                                <View style={styles.childdiv} elevation={5}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'relative' }}>
                                        <View style={{ flexDirection: 'column', padding: 10, justifyContent: 'space-between' }}>
                                            <Text style={styles.userNmae}>Order Id : {this.state.orderid} </Text>
                                            <Text style={styles.userNmae}>Order Date : {this.state.orderdate} </Text>
                                            {/* <Text style={styles.userNmae}>Order Status : <Text style={{ color: 'green' }}>{'\u2B24'}</Text> Processing </Text> */}
                                            <Text style={styles.userNmae}>Payment Method : {this.state.paymethod}</Text>
                                            <View style={{ backgroundColor: '#ff4254', width: responsiveWidth(85), height: responsiveHeight(5), borderRadius: 15, margin: 5, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}>
                                                <Text style={styles.statusprice}>TOTAL : {this.state.subtotal}</Text>
                                                {this.state.orderstatus == 'processing' ? (
                                                    <Text style={styles.userstatusNmae}> Status : <Text style={{ color: 'green' }}>{'\u2B24'}</Text> Processing </Text>
                                                ) : (
                                                        <Text style={styles.userstatusNmae}> Status : <Text style={{ color: '#722f37' }}>{'\u2B24'}</Text> {this.state.orderstatus} </Text>
                                                    )}
                                            </View>
                                        </View>
                                    </View>

                                </View>
                            )}

                        {this.state.language == 'ar' || this.state.language == ''? (
                            <Text style={styles.portionHeaderText}> معلومات الشحن والفواتير</Text>
                        ) : (
                                <Text style={styles.portionHeaderText}> SHIPPING & BILLING INFO</Text>
                            )}
                        {this.state.language == 'ar' || this.state.language == ''? (
                            <View style={styles.childdiv2_rtl} elevation={5}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'relative' }}>
                                    <View style={{ flexDirection: 'column', padding: 10, justifyContent: 'space-between' }}>
                                        <Text style={styles.userNmae}>اسم : {this.state.billfname} {this.state.billsname} </Text>
                                        <Text style={styles.userNmae}>البريد الإلكتروني : {this.state.billemail} </Text>
                                        <Text style={styles.userNmae}>بلد : {this.state.billcountry} </Text>
                                        <Text style={styles.userNmae}>مدينة : {this.state.billcity} </Text>
                                        <Text style={styles.userNmae}>هاتف : {this.state.billphone} </Text>
                                        <Text style={styles.userNmae}>الرقم السري : {this.state.billpin} </Text>
                                    </View>
                                </View>

                            </View>
                        ) : (
                                <View style={styles.childdiv2} elevation={5}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'relative' }}>
                                        <View style={{ flexDirection: 'column', padding: 10, justifyContent: 'space-between' }}>
                                            <Text style={styles.userNmae}>Name : {this.state.billfname} {this.state.billsname} </Text>
                                            <Text style={styles.userNmae}>Email : {this.state.billemail} </Text>
                                            <Text style={styles.userNmae}>Country : {this.state.billcountry} </Text>
                                            <Text style={styles.userNmae}>City : {this.state.billcity} </Text>
                                            <Text style={styles.userNmae}>Phone : {this.state.billphone} </Text>
                                            <Text style={styles.userNmae}>Pin code : {this.state.billpin} </Text>
                                        </View>
                                    </View>

                                </View>
                            )}
                        {this.state.language == 'ar' || this.state.language == ''? (
                            <Text style={styles.portionHeaderText}> العناصر في طلبك</Text>
                        ) : (
                                <Text style={styles.portionHeaderText}> ITEMS IN YOUR ORDER</Text>
                            )}
                        <FlatList
                            data={this.state.itemlist}
                            renderItem={this.renderCategory}
                            keyExtractor={(item, index) => index}
                            showsVerticalScrollIndicator={false}
                        />


                        {/* <View style={styles.childdiv3} elevation={5}>
                                         <Image source={IMAGE.ICON_WISH} style={styles.moreImg} />
                                         <View style={{ flexDirection: 'column', padding: 5, width: responsiveWidth(55), justifyContent: 'space-between' }}>
                                             <Text style={styles.userNmae}>hfghgfh </Text>
                                             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                 <Text style={styles.price}>$ 56</Text>
                                                <View style={{ backgroundColor: 'rgba(255, 0, 0,0.8)', height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }}>
                                                     <Text style={{ fontSize: 15, margin: 2, color: 'white' }}>3</Text>
                                                 </View>
                                             </View>
                                         </View>
                                    </View> */}
                        <View style={styles.childdiv4} elevation={5}>
                            {this.state.language == 'ar' || this.state.language == ''? (
                                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>{this.state.subtotal}المبلغ الإجمالي لهذا الطلب هو {this.state.subtotal}</Text>
                            ) : (
                                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>Total Amount of this Order is {this.state.subtotal}</Text>
                                )}
                        </View>
                        {/* {this.state.orderstatus == 'processing' ? (
                            <Button block style={{ marginTop: 20, borderRadius: 15, backgroundColor: '#ff4254' }} >
                                {this.state.language == 'ar' || this.state.language == ''? (
                                    <Text style={{ color: '#fff' }}>الغاء الطلب</Text>
                                ) : (
                                        <Text style={{ color: '#fff' }}>Cancel Order</Text>
                                    )}
                            </Button>
                        ) : (
                                <View></View>
                            )} */}
                    </View>
                </ScrollView>
                <AnimatedLoader
                    visible={this.state.isLoading}
                    overlayColor="rgba(255,255,255,1)"
                    source={require("../../../loader.json")}
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
        //flex:1
    },
    childdiv: {
        flexDirection: 'row',
        height: responsiveHeight(19),
        backgroundColor: '#eef3f7',
        margin: 5,
        borderRadius: 6
    },
    childdiv_rtl: {
        flexDirection: 'row-reverse',
        height: responsiveHeight(19),
        backgroundColor: '#eef3f7',
        margin: 5,
        borderRadius: 6
    },
    childdiv2: {
        flexDirection: 'row',
        height: responsiveHeight(30),
        backgroundColor: '#eef3f7',
        margin: 5,
        borderRadius: 6
    },
    childdiv2_rtl: {
        flexDirection: 'row-reverse',
        height: responsiveHeight(30),
        backgroundColor: '#eef3f7',
        margin: 5,
        borderRadius: 6
    },
    childdiv3: {
        flexDirection: 'row',
        height: responsiveHeight(17),
        backgroundColor: '#eef3f7',
        margin: 5,
        borderRadius: 6
    },
    childdiv3_rtl: {
        flexDirection: 'row-reverse',
        height: responsiveHeight(17),
        backgroundColor: '#eef3f7',
        margin: 5,
        borderRadius: 6
    },
    childdiv4: {
        flexDirection: 'row',
        height: responsiveHeight(4),
        backgroundColor: '#eef3f7',
        margin: 5,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
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
        color: 'red'
    },
    userNmae: {
        fontSize: responsiveFontSize(2),
        fontStyle: 'normal',
        color: 'gray'
    },
    portionHeaderText: {
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 10,
        color: '#ff4254',

        fontSize: responsiveFontSize(2)
    },
    lottie: {
        width: 100,
        height: 100
    },
    userstatusNmae: {
        fontSize: responsiveFontSize(2),
        fontStyle: 'normal',
        color: '#fff'
    },
    statusprice: {
        //marginTop: 10,
        color: '#fff'
    },

});
