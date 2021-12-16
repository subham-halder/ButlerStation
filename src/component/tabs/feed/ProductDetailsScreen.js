import React from 'react';
import { Text, View, StyleSheet, Dimensions, Image, BackHandler, AsyncStorage, FlatList, ScrollView, ImageBackground, ActivityIndicator, Alert, Share, Button, TextInput, Modal, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import CustomHeader from '../../CustomeHeader';

//import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container, Header, Content, Tab, Tabs, Badge } from 'native-base';
import AwesomeAlert from 'react-native-awesome-alerts';
import AnimatedLoader from "react-native-animated-loader";
import { Dropdown } from 'react-native-material-dropdown';
import ImageView from "react-native-image-viewing";
import b from '../../BaseUrl';
const Entities = require('html-entities').XmlEntities;
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get("window");
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 300;

class ProductDetailsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            dataSource: [],
            dataDetailsSource: [],
            galleryImage: [],
            title: '',
            variation_attributes: [],
            currency: '',
            price: '',
            sku: '',
            thumbnail: '',
            description: [],
            weightlabel: '',
            weight: '',
            dimensionlabel: '',
            dimension: '',
            rating: '',
            isLoading: true,
            relatedLoading: true,
            issmallLoading: false,
            isImageViewVisible: false,
            product_id: '',
            Msg: '',
            images: [],
            link: '',
            v_id: '',
            v_id_org: '',
            variation_check: false,
            variation_check2: false,
            variation_check3: false,
            customerReviewCheck: false,
            variation_checkbox_item: [],
            variation_checkbox_item2: [],
            variation_checkbox_item3: [],
            dropdown_placeholder: '',
            dropdown_placeholder2: '',
            dropdown_placeholder3: '',
            variation: "",
            variation2: "",
            variation3: "",
            selected_variation_name: "",
            selected_variation2_name: "",
            selected_variation3_name: "",
            variation_list: [],
            variation_key1: "",
            variation_key2: "",
            variation_key3: "",
            comment: '',
            fakeData: [1, 2, 3, 4, 5],
            modalVisible: false,
            commentlist: [],
            discountPrice: false,
            regular_price: '',
            update_chk: 0,
            additional_info: [],
            modalVisible: true,
            login_button: true,
            language: '',
            stock: ''
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('usersid', (err, res) => {
            AsyncStorage.getItem('auth_hash', (err, res2) => {
                //  console.log("IsLoginCheck" + res);
                if (res != null && res2 != null) {
                    this.setState({

                        login_button: false
                    });
                } else {
                    this.setState({

                        login_button: true
                    });
                }
            });
        });
        this.getProductDetails();
        this.getRelatedProduct();
        this.getCustomerReview();
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

    getProductDetails = async () => {
        AsyncStorage.getItem('language', (err, languageres) => {
            if (languageres == '' || languageres == null) {
                var lang = 'ar';
            } else {
                var lang = languageres;
            }
            const baseUrl = b.abc();
            const { navigation } = this.props;
            const product_id = navigation.getParam('id', 'NO-ID');
            console.warn(product_id + 'product idddddddddd');
            const timestamp = Math.round(new Date().getTime() / 1000);
            const url = `${baseUrl}/wp-json/albaghlisponge/single/productV3?a=${timestamp}&p_id=${product_id}&lang=${lang}`

            fetch(url)
                .then(response => response.json())
                .then((responseJson) => {
                    //console.warn(responseJson, 'product details');
                    // console.log(responseJson.products[0].additional_info + "additional infooooooooooooooooooooooooooo");
                    const additional_info_array = Object.values(responseJson.products[0].additional_info);

                    this.setState({

                        additional_info: additional_info_array
                    });
                    //console.log(additional_info_array, 'dsfdsfdsfdsfffffffffffffffffffffffffff');
                    if (responseJson.products[0].variation_attributes != null && responseJson.products[0].additional_info != '') {
                        this.setState({

                            variation_list: responseJson.products[0].variation_attributes.variations
                        });

                        let res_key = responseJson.products[0].variation_attributes.attributes[0];
                        //console.warn(res_key);
                        if (responseJson.products[0].variation_attributes.attributes.length == 2) {
                            this.setState({
                                dropdown_placeholder2: "Select " + responseJson.products[0].variation_attributes.keys[1],
                                dropdown_placeholder: "Select " + responseJson.products[0].variation_attributes.keys[0],
                                variation_key1: responseJson.products[0].variation_attributes.keys[0],
                                variation_key2: responseJson.products[0].variation_attributes.keys[1],
                            });
                            var attr_dropdown_array = [];
                            let count = 0;
                            for (const [key, values] of Object.entries(res_key)) {
                                //count=count + 1;
                                attr_dropdown_array[count] = { label: values, value: key };
                                count++;
                            }
                            //	console.warn(attr_dropdown_array);
                            this.setState({
                                variation_check: true,
                                variation_checkbox_item: attr_dropdown_array,
                                sku: responseJson.products[0].variation_attributes.variations[0].sku
                            });

                            //========================= dropdown 2 ===============================
                            let res_key2 = responseJson.products[0].variation_attributes.attributes[1];
                            //console.warn(res_key);

                            var attr_dropdown_array2 = [];
                            let datacount = 0;
                            for (const [key, values] of Object.entries(res_key2)) {
                                //count=count + 1;
                                attr_dropdown_array2[datacount] = { label: values, value: key };
                                datacount++;
                            }
                            //	console.warn(attr_dropdown_array);
                            this.setState({
                                variation_check2: true,
                                variation_checkbox_item2: attr_dropdown_array2

                            });
                        } else if (responseJson.products[0].variation_attributes.attributes.length == 3) {
                            this.setState({
                                dropdown_placeholder2: "Select " + responseJson.products[0].variation_attributes.keys[1],
                                dropdown_placeholder: "Select " + responseJson.products[0].variation_attributes.keys[0],
                                dropdown_placeholder3: "Select " + responseJson.products[0].variation_attributes.keys[2],
                                variation_key1: responseJson.products[0].variation_attributes.keys[0],
                                variation_key2: responseJson.products[0].variation_attributes.keys[1],
                                variation_key3: responseJson.products[0].variation_attributes.keys[2],
                            });
                            var attr_dropdown_array = [];
                            let count = 0;
                            for (const [key, values] of Object.entries(res_key)) {
                                //count=count + 1;
                                attr_dropdown_array[count] = { label: values, value: key };
                                count++;
                            }
                            //	console.warn(attr_dropdown_array);
                            this.setState({
                                variation_check: true,
                                variation_checkbox_item: attr_dropdown_array,
                                sku: responseJson.products[0].variation_attributes.variations[0].sku
                            });

                            //========================= dropdown 2 ===============================
                            let res_key2 = responseJson.products[0].variation_attributes.attributes[1];
                            //console.warn(res_key);

                            var attr_dropdown_array2 = [];
                            let datacount = 0;
                            for (const [key, values] of Object.entries(res_key2)) {
                                //count=count + 1;
                                attr_dropdown_array2[datacount] = { label: values, value: key };
                                datacount++;
                            }
                            //	console.warn(attr_dropdown_array);
                            this.setState({
                                variation_check2: true,
                                variation_checkbox_item2: attr_dropdown_array2

                            });
                            //========================= dropdown 3 ===============================
                            let res_key3 = responseJson.products[0].variation_attributes.attributes[2];
                            //console.warn(res_key);

                            var attr_dropdown_array3 = [];
                            let data_count = 0;
                            for (const [key, values] of Object.entries(res_key3)) {
                                //count=count + 1;
                                attr_dropdown_array3[data_count] = { label: values, value: key };
                                data_count++;
                            }
                            //	console.warn(attr_dropdown_array);
                            this.setState({
                                variation_check3: true,
                                variation_checkbox_item3: attr_dropdown_array3

                            });
                        } else {
                            this.setState({

                                dropdown_placeholder: "Select " + responseJson.products[0].variation_attributes.keys[0],
                                variation_key1: responseJson.products[0].variation_attributes.keys[0],

                            });
                            var attr_dropdown_array = [];
                            let count = 0;
                            for (const [key, values] of Object.entries(res_key)) {
                                //count=count + 1;
                                attr_dropdown_array[count] = { label: values, value: key };
                                count++;
                            }
                            //	console.warn(attr_dropdown_array);
                            this.setState({
                                variation_check: true,
                                variation_checkbox_item: attr_dropdown_array,
                                sku: responseJson.products[0].variation_attributes.variations[0].sku
                            });
                        }
                    } else {

                        this.setState({

                            sku: responseJson.products[0].sku
                        });
                    }
                    if (responseJson.products[0].discount != false) {
                        this.setState({
                            discountPrice: true
                        })
                    } else {
                        this.setState({
                            discountPrice: false
                        })
                    }
                    // console.log(responseJson.products[0].gallery + 'galary id');
                    // console.log(responseJson.products + 'version id');
                    var array_values = responseJson.products[0].gallery_thumb;
                    this.setState({
                        dataDetailsSource: responseJson.products,
                        product_id: product_id,
                        title: responseJson.products[0].title,
                        link: responseJson.products[0].link,
                        variation_attributes: responseJson.products[0].variation_attributes,
                        currency: responseJson.products[0].currency,
                        price: responseJson.products[0].price,
                        thumbnail: responseJson.products[0].thumbnail,
                        galleryImage: responseJson.products[0].gallery_thumb,
                        description: responseJson.products[0].description,
                        rating: responseJson.products[0].avg_rating,
                        isLoading: false,
                        regular_price: responseJson.products[0].regular_price,

                    })
                    //console.log(responseJson.products[0].additional_info.dimension + 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
                    if (responseJson.products[0].additional_info.weight) {
                        this.setState({
                            weightlabel: responseJson.products[0].additional_info.weight.label,
                            weight: responseJson.products[0].additional_info.weight.value,
                        })
                    } else if (responseJson.products[0].additional_info.dimension) {
                        this.setState({
                            dimensionlabel: responseJson.products[0].additional_info.dimension.label,
                            dimension: responseJson.products[0].additional_info.dimension.value,
                        })
                    }
                    var marray = [];
                    for (let i = 0; i < array_values.length; i++) {
                        marray[i] = {};
                        //marray[i]['source'] = { "uri": array_values[i] };
                        marray[i] = { "uri": array_values[i] };
                    }

                    //console.log(marray);
                    this.setState({
                        images: marray
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        });
    }
    getRelatedProduct = () => {
        const baseUrl = b.abc();
        const { navigation } = this.props;
        const product_id = navigation.getParam('id', 'NO-ID');
        //console.log(product_id);
        const timestamp = Math.round(new Date().getTime() / 1000);
        const url = `${baseUrl}/wp-json/albaghlisponge/products/related?a=${timestamp}&p_id=${product_id}`

        fetch(url)
            .then(response => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                this.state.isLoading = false;
                if (responseJson.error == true) {
                    this.setState({
                        dataSource: '',
                        relatedLoading: false,
                    })
                } else {
                    this.setState({
                        dataSource: responseJson.products,
                        relatedLoading: false,
                    })
                }


            })
            .catch((error) => {
                console.log(error)
            })
    }



    share = async () => {
        try {
            let result = await Share.share({
                message:
                    this.state.link,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }
    go_login() {
        //console.log("ok");

        this.props.navigation.navigate('Login');
    }

    addToCart = () => {

        //console.log(this.state.v_id_org + 'version id');
        //console.log(this.state.price + 'price');
        //this.state.variation_check2 == true &&
        if (this.state.variation_check2 == true && this.state.v_id_org == '' || this.state.v_id_org == 'false') {



            if (this.state.language == 'ar' || this.state.language == '') {
                this.setState({ Msg: "الرجاء تحديد الاختيار" });
            } else {
                this.setState({ Msg: 'Please select variation' });
            }
            this.showAlert();
        } else {
            this.setState({ isLoading: true });

            AsyncStorage.getItem('cartsession', (err, cartres) => {
                let newProduct = JSON.parse(cartres);
                // console.log(newProduct+"testttttttttttttttttttttttt");
                let testnewProduct = [];
                if (newProduct != null && newProduct != "") {


                    for (var i = 0; i < newProduct.length; i++) {

                        const productToBeSaved = { 'p_id': newProduct[i].p_id, 'v_id': newProduct[i].v_id, 'qty': newProduct[i].qty, 'title': newProduct[i].title, 'currency': newProduct[i].currency, 'price': newProduct[i].price, 'thumbnail': newProduct[i].thumbnail, 'variation1': newProduct[i].variation1, 'variation2': newProduct[i].variation2, 'variation3': newProduct[i].variation3, 'variation1_name': newProduct[i].variation1_name, 'variation2_name': newProduct[i].variation2_name, 'variation3_name': newProduct[i].variation3_name, 'variation_key1': newProduct[i].variation_key1, 'variation_key2': newProduct[i].variation_key2, 'variation_key3': newProduct[i].variation_key3 };
                        if (this.state.product_id == newProduct[i].p_id && this.state.v_id == newProduct[i].v_id) {
                            console.log('innnnn');
                            let newqty = newProduct[i].qty + this.state.count;
                            const productToBeSavedNew = { 'p_id': newProduct[i].p_id, 'v_id': newProduct[i].v_id, 'qty': newqty, 'title': newProduct[i].title, 'currency': newProduct[i].currency, 'price': newProduct[i].price, 'thumbnail': newProduct[i].thumbnail, 'variation1': newProduct[i].variation1, 'variation2': newProduct[i].variation2, 'variation3': newProduct[i].variation3, 'variation1_name': newProduct[i].variation1_name, 'variation2_name': newProduct[i].variation2_name, 'variation3_name': newProduct[i].variation3_name, 'variation_key1': newProduct[i].variation_key1, 'variation_key2': newProduct[i].variation_key2, 'variation_key3': newProduct[i].variation_key3 };
                            testnewProduct.push(productToBeSavedNew);
                            this.setState({ update_chk: 1 });
                        } else {
                            this.setState({ update_chk: 0 });
                            testnewProduct.push(productToBeSaved);
                        }

                    }

                    //console.log(this.state.update_chk);
                    if (this.state.update_chk === 0) {
                        //console.log("okkkkkkkkkkk");
                        const productToBeSavedNew = { 'p_id': this.state.product_id, 'v_id': this.state.v_id, 'qty': this.state.count, 'title': this.state.title, 'currency': this.state.currency, 'price': this.state.price, 'thumbnail': this.state.thumbnail, 'variation1': this.state.variation, 'variation2': this.state.variation2, 'variation3': this.state.variation3, 'variation1_name': this.state.selected_variation_name, 'variation2_name': this.state.selected_variation2_name, 'variation3_name': this.state.selected_variation3_name, 'variation_key1': this.state.variation_key1, 'variation_key2': this.state.variation_key2, 'variation_key3': this.state.variation_key3 };
                        testnewProduct.push(productToBeSavedNew);
                    }
                    AsyncStorage.setItem('cartsession', JSON.stringify(testnewProduct));
                    //console.log(id + 'this is it');
                    this.setState({ isLoading: false });

                    if (this.state.language == 'ar' || this.state.language == '') {

                        this.setState({ Msg: "تمت إضافة المنتج بنجاح" });
                    } else {
                        this.setState({ Msg: "Item Added Successfully" });
                    }
                    this.showAlert();
                    var id = this.state.product_id;
                    this.props.navigation.push('ProductDetails', { id });


                } else {

                    const productToBeSavedNew = { 'p_id': this.state.product_id, 'v_id': this.state.v_id, 'qty': this.state.count, 'title': this.state.title, 'currency': this.state.currency, 'price': this.state.price, 'thumbnail': this.state.thumbnail, 'variation1': this.state.variation, 'variation2': this.state.variation2, 'variation3': this.state.variation3, 'variation1_name': this.state.selected_variation_name, 'variation2_name': this.state.selected_variation2_name, 'variation3_name': this.state.selected_variation3_name, 'variation_key1': this.state.variation_key1, 'variation_key2': this.state.variation_key2, 'variation_key3': this.state.variation_key3 };

                    testnewProduct.push(productToBeSavedNew);
                    //console.log(testnewProduct + "jhhjh");
                    AsyncStorage.setItem('cartsession', JSON.stringify(testnewProduct));
                    this.setState({ isLoading: false });
                    if (this.state.language == 'ar' || this.state.language == '') {

                        this.setState({ Msg: "تمت إضافة المنتج بنجاح" });
                    } else {
                        this.setState({ Msg: "Item Added Successfully" });
                    }
                    this.showAlert();
                    var id = this.state.product_id;
                    this.props.navigation.push('ProductDetails', { id });

                }
            });

        }
    }

    addToWishlist = () => {
        if (this.state.variation_check2 == true && this.state.v_id_org == '' || this.state.v_id_org == 'false') {
            if (this.state.language == 'ar' || this.state.language == '') {
                this.setState({ Msg: "الرجاء تحديد الاختيار" });
            } else {
                this.setState({ Msg: 'Please select variation' });
            }
            this.showAlert();
        } else {
            this.setState({ isLoading: true });
            AsyncStorage.getItem('usersid').then((data) => {
                let usersid = JSON.parse(data);
                if (usersid !== null) {
                    let product_id = this.state.product_id;
                    const baseUrl = b.abc();
                    const timestamp = Math.round(new Date().getTime() / 1000);
                    const url = `${baseUrl}/wp-json/albaghlisponge/wishlist/add_product?a=${timestamp}&prod_id=${product_id}&user_id=${usersid}`
                    //console.log(url);
                    fetch(url)
                        .then((response) => response.json())
                        .then((resp) => {

                            if (resp.success == true) {
                                this.setState({ isLoading: false });
                                if (this.state.language == 'ar' || this.state.language == '') {
                                    this.setState({ Msg: "تم إضافة المنتج بنجاح إلى قائمة الرغبات" });
                                } else {
                                    this.setState({ Msg: 'Product is successfully added to the wishlist' });
                                }
                                this.showAlert();
                            } else {
                                this.setState({ isLoading: false });
                                this.setState({ Msg: resp.error_msg });
                                this.showAlert();
                            }

                        })
                        .catch(err => {
                            alert("Something Went Wrong");
                        });
                } else {
                    this.setState({ isLoading: false });
                    this.props.navigation.navigate('Login');
                }
            });

        }
    }

    getCustomerReview = () => {
        const baseUrl = b.abc();
        const { navigation } = this.props;
        const product_id = navigation.getParam('id', 'NO-ID');
        console.log(product_id);
        const url = `${baseUrl}/wp-json/albaghlisponge/product/comments?p_id=${product_id}`

        fetch(url)
            .then(response => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                this.state.isLoading = false;
                if (responseJson.error == false) {
                    this.setState({
                        commentlist: responseJson.comments,
                        customerReviewCheck: true,
                        //isLoading: false,
                    })
                }

            })
            .catch((error) => {
                console.log(error)
            })
    }

    submitCustomerReview = () => {

        if (this.state.comment != '') {
            AsyncStorage.getItem('auth_hash', (err, res) => {
                this.setState({ issmallLoading: true });
                const baseUrl = b.abc();
                const url = `${baseUrl}/wp-json/albaghlisponge/comment/add`;
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        auth_hash: JSON.parse(res),
                        p_id: this.state.product_id,
                        comment_content: this.state.comment,
                    })
                })

                    .then((response) => response.json())
                    .then((res) => {
                        if (res.error == false) {
                            this.setState({ issmallLoading: false });
                            if (this.state.language == 'ar' || this.state.language == '') {
                                this.setState({ Msg: "تم إرسال المراجعة" });
                            } else {
                                this.setState({ Msg: "Review submitted" });
                            }
                            this.showAlert();
                        } else {
                            this.setState({ issmallLoading: false, comment: '' });
                            if (this.state.language == 'ar' || this.state.language == '') {
                                alert('هناك خطأ ما');
                            } else {
                                alert('Something went Wrong');
                            }
                        }
                    })
                    .done();

            });
        } else {
            //alert("Please enter some comment");
            if (this.state.language == 'ar' || this.state.language == '') {
                this.setState({ Msg: "الرجاء إدخال تعليق" });
            } else {
                this.setState({ Msg: "Please enter some comment" });
            }
            this.showAlert();
        }

    }

    rendercommentlist = ({ item }) => {
        return (
            <View style={styles.childdiv} elevation={5}>
                <View style={{ padding: 10, borderBottomColor: '#eaeaea', borderBottomWidth: 1 }}>
                    <Text style={{ fontSize: responsiveFontSize(1.8) }}>{item.comment_author} </Text>
                    <Text style={{ Color: '#eaeaea', fontSize: responsiveFontSize(1.5) }}>{item.comment_content} </Text>
                </View>
            </View>
        )
    }
    renderadditional_infolist = ({ item }) => {
        const entities = new Entities();
        var stripedHtml = item.value.replace(/<[^>]+>/g, '');
        return (

            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={{ fontSize: responsiveFontSize(1.5), fontWeight: 'bold', color: 'black', padding: 2 }}>{item.label}:</Text>
                <Text style={{ fontSize: responsiveFontSize(1.5), color: 'gray', padding: 2 }}>
                    {stripedHtml}
                </Text>
            </View>
        )
    }

    renderRelated = ({ item, index }) => {
        const entities = new Entities();
        var id = item.pid;
        var img = { 'uri': item.thumbnail };
        if (item.thumbnail == null || item.thumbnail == false || item.thumbnail == '') {
            var img = require('../../../../assets/header-logo.png');
        } else {
            var img = { uri: item.thumbnail };
        }
        if (item.discount != false && item.type == "simple") {
            var display_pricie = true;
            var badgeview = true;
        } else {
            var display_pricie = false;
            var badgeview = false;
        }

        if (index <= 5) {
            return (

                // <ShimmerPlaceHolder style={styles.GalleryBox} autoRun={true} visible={!this.state.relatedLoading}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.push('ProductDetails', { id })}>
                    <View style={styles.div4}>
                        <View style={styles.GalleryBox} elevation={5}>
                            {badgeview ? (
                                <View style={{
                                    position: 'absolute', height: 20, width: 40,
                                    borderRadius: 15, left: 12, top: 15, alignItems: 'center', justifyContent: 'center', zIndex: 2000
                                }}>
                                    <Badge>
                                        <Text style={{ color: 'white' }}>Sell</Text>
                                    </Badge>
                                </View>
                            ) : (
                                <View></View>
                            )}
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.GalleryImg}>
                                    <Image source={img} style={styles.SingelImg}></Image>
                                </View>
                                <View style={styles.GalleryText}>
                                    <Text style={styles.userNmae}>{entities.decode(item.title)}</Text>
                                </View>
                                {display_pricie ? (
                                    <View style={styles.amount}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <Text style={styles.discountprice}>{entities.decode(item.currency)} {item.regular_price}</Text>
                                            <Text style={styles.amountuserNmae}>{entities.decode(item.currency)} {item.price}</Text>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={styles.amount}>
                                        {/* <Text style={styles.discountprice}>{entities.decode(item.currency)} {item.price}</Text> */}
                                        <Text style={styles.amountuserNmae}>{entities.decode(item.currency)} {item.price}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                // </ShimmerPlaceHolder>
            )
        }

    }

    renderGalleryImage = ({ item }) => {
        const thmb = { 'uri': item.uri };
        const setImage = () => this.setState({ thumbnail: item.uri });
        return (


            <TouchableWithoutFeedback onPress={setImage}>
                <Image source={thmb} style={styles.moreImg} />
            </TouchableWithoutFeedback>



        );
    };
    valuechange(itemValue, itemIndex, data) {
        //console.log(itemValue);
        //console.log(data);
        /*----------------------------------------- */
        data.map((size, i) => {
            if (size.value == itemValue) {
                //console.log(size.label);
                this.setState({
                    selected_variation_name: size.label
                })
            }
        })
        /*----------------------------------------- */
        //alert(this.state.variation2);
        if (this.state.variation_check2) {
            var arr_key1 = this.state.variation_key1;
            var arr_key2 = this.state.variation_key2;
            for (const [datakey, datavalues] of Object.entries(this.state.variation_list)) {
                //console.log(datavalues2.layers);
                if (datavalues[arr_key1] == this.state.variation2 && datavalues[arr_key2] == itemValue) {
                    console.warn(datavalues.id);
                    this.setState({
                        v_id_org: itemValue,
                        v_id: datavalues.id,
                        price: datavalues.price,
                        sku: datavalues.sku,
                        stock: datavalues.stock
                    })
                }
            }
        } else if (this.state.variation_check3) {
            var arr_key1 = this.state.variation_key1;
            var arr_key2 = this.state.variation_key2;
            var arr_key3 = this.state.variation_key3;
            for (const [datakey, datavalues] of Object.entries(this.state.variation_list)) {
                //console.log(datavalues2.layers);
                if (datavalues[arr_key1] == this.state.variation2 && datavalues[arr_key2] == itemValue && datavalues[arr_key3] == this.state.variation3) {
                    //console.warn(datavalues.id);
                    this.setState({
                        v_id_org: itemValue,
                        v_id: datavalues.id,
                        price: datavalues.price,
                        sku: datavalues.sku,
                        stock: datavalues.stock
                    })
                }
            }

        } else {
            var arr_key1 = this.state.variation_key1;
            for (const [datakey, datavalues] of Object.entries(this.state.variation_list)) {
                //console.log(datavalues2.layers);
                if (datavalues[arr_key1] == itemValue) {
                    console.warn(datavalues.id);
                    this.setState({
                        v_id_org: itemValue,
                        v_id: datavalues.id,
                        price: datavalues.price,
                        sku: datavalues.sku,
                        stock: datavalues.stock
                    })
                }
            }
        }
    }
    valuechange2(itemValue2, itemIndex2, data2) {
        //console.log(itemValue2);
        // console.log(data2);
        data2.map((size, i) => {
            if (size.value == itemValue2) {
                //console.log(size.label); 
                this.setState({
                    selected_variation2_name: size.label
                })
            }
        })
        var arr_key1 = this.state.variation_key1;
        var arr_key2 = this.state.variation_key2;
        for (const [datakey, datavalues] of Object.entries(this.state.variation_list)) {


            //console.log(datavalues2.layers);
            if (datavalues[arr_key1] != "" && datavalues[arr_key2] != "") {
                if (datavalues[arr_key1] == this.state.variation && datavalues[arr_key2] == itemValue2) {
                    //console.warn(this.state.variation_list);


                    this.setState({
                        v_id_org: itemValue2,
                        v_id: datavalues.id,
                        price: datavalues.price,
                        sku: datavalues.sku,


                    })

                }
            } else {
                if (datavalues[arr_key1] == this.state.variation || datavalues[arr_key2] == itemValue2) {
                    //console.warn(this.state.variation_list);


                    this.setState({
                        v_id_org: itemValue2,
                        v_id: datavalues.id,
                        price: datavalues.price,
                        sku: datavalues.sku,


                    })

                }
            }


        }


    }
    valuechange3(itemValue, itemIndex, data3) {
        //alert(itemValue2);
        // alert(this.state.variation);
        //console.warn(this.state.variation_list);
        data3.map((size, i) => {
            if (size.value == itemValue) {
                //console.log(size.label); 
                this.setState({
                    selected_variation3_name: size.label
                })
            }
        })
        var arr_key1 = this.state.variation_key1;
        var arr_key2 = this.state.variation_key2;
        var arr_key3 = this.state.variation_key3;
        for (const [datakey, datavalues] of Object.entries(this.state.variation_list)) {


            //console.log(datavalues2.layers);
            if (datavalues[arr_key1] == this.state.variation && datavalues[arr_key2] == this.state.variation2 && datavalues[arr_key3] == itemValue) {
                //console.warn(this.state.variation_list);


                this.setState({
                    v_id_org: itemValue,
                    v_id: datavalues.id,
                    price: datavalues.price,
                    sku: datavalues.sku,


                })

            }


        }


    }

    increment = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    decrement = () => {
        if (this.state.count >= 2) {
            this.setState({
                count: this.state.count - 1
            })
        }
    }
    openImage = () => {
        this.setState({
            isImageViewVisible: true,
        })

        //console.log(this.state.images);

    }
    closeImage = () => {
        this.setState({
            isImageViewVisible: false,
        })
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

    render() {
        const entities = new Entities();
        const thmb = { 'uri': this.state.thumbnail };
        const { showAlert } = this.state;
        const { Msg } = this.state;
        let data = this.state.variation_checkbox_item;
        let variation_data = this.state.variation_checkbox_item2;
        let variation_data1 = this.state.variation_checkbox_item3;


        return (
            <SafeAreaView style={styles.container}>
                {this.state.language == 'ar' || this.state.language == '' ? (
                    <CustomHeader title="تفاصيل المنتج" navigation={this.props.navigation} />
                ) : (
                    <CustomHeader title="Product Details" navigation={this.props.navigation} />
                )}
                <ScrollView style={{ backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: 'center', marginTop: 5 }}>
                        {/* <ShimmerPlaceHolder style={styles.SingelImgBanner} autoRun={true} visible={!this.state.isLoading}> */}
                        <TouchableOpacity onPress={() => this.openImage()} >
                            <Image source={thmb} style={styles.SingelImgBanner} />
                        </TouchableOpacity>
                        {/* </ShimmerPlaceHolder> */}
                        <FlatList
                            data={this.state.images}
                            renderItem={this.renderGalleryImage}
                            keyExtractor={(item, index) => index}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            removeClippedSubviews={true}
                        />
                        <ImageView
                            images={this.state.images}

                            visible={this.state.isImageViewVisible}
                            onRequestClose={() => this.closeImage()}
                        />
                    </View>
                    {this.state.language == 'ar' || this.state.language == '' ? (
                        <View style={styles.title_view}>
                            <Text style={styles.title_ar}>{entities.decode(this.state.title)}</Text>
                        </View>
                    ) : (
                        <View style={styles.title_view}>
                            <Text style={styles.title}>{entities.decode(this.state.title)}</Text>
                        </View>
                    )}
                    {/* <View style={styles.price_view}>
                        <Text style={styles.price}> 220.00-250.00</Text>
                    </View> */}
                    {this.state.discountPrice == true ? (
                        <View style={styles.title_view}>
                            {this.state.language == 'ar' || this.state.language == '' ? (
                                <View style={{ flex: 1, flexDirection: 'row-reverse' }}>

                                    <Text style={styles.discountprice}>{entities.decode(this.state.currency)} {this.state.regular_price}</Text>
                                    <Text style={styles.price}>{entities.decode(this.state.currency)} {this.state.price}</Text>

                                    <View>
                                        <Icon color="black" name="share" size={20} onPress={() => this.share()} style={{ marginRight: 30 }} />
                                    </View>
                                </View>
                            ) : (

                                <View style={{ flex: 1, flexDirection: 'row' }}>

                                    <Text style={styles.discountprice}>{entities.decode(this.state.currency)} {this.state.regular_price}</Text>
                                    <Text style={styles.price}>{entities.decode(this.state.currency)} {this.state.price}</Text>

                                    <View>
                                        <Icon color="black" name="share" size={20} onPress={() => this.share()} style={{ marginRight: 30 }} />
                                    </View>
                                </View>
                            )}
                        </View>
                    ) : (
                        <View style={styles.title_view}>
                            {this.state.language == 'ar' || this.state.language == '' ? (
                                <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between' }}>

                                    <View style={{ flexDirection: 'column' }}>
                                        {this.state.sku == '' ? (
                                            <View></View>
                                        ) : (
                                            <Text style={styles.sku_ar}>{this.state.sku}</Text>
                                        )}

                                        <Text style={styles.price}>{entities.decode(this.state.currency)} {this.state.price}</Text>
                                    </View>
                                    <View >
                                        <Icon color="black" name="share" size={20} onPress={() => this.share()} style={{ marginRight: 30 }} />
                                    </View>
                                </View>
                            ) : (
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                                    <View style={{ flexDirection: 'column' }}>
                                        {this.state.sku == '' ? (
                                            <View></View>
                                        ) : (
                                            <Text style={styles.sku}>{this.state.sku}</Text>
                                        )}

                                        <Text style={styles.price}>{entities.decode(this.state.currency)} {this.state.price}</Text>
                                    </View>
                                    <View >
                                        <Icon color="black" name="share" size={20} onPress={() => this.share()} style={{ marginRight: 30 }} />
                                    </View>
                                </View>

                            )}
                        </View>
                    )}

                    <View style={styles.share_view} >
                        {
                            this.state.variation_check ?

                                <View style={{ justifyContent: 'center', borderColor: 'gray', borderRadius: 3, borderWidth: .5, marginLeft: 15, marginRight: 15, width: responsiveWidth(50), height: responsiveHeight(8), paddingBottom: 10, paddingLeft: 8, paddingRight: 8 }}>
                                    <Dropdown
                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                        value={this.state.variation}
                                        onChangeText={(itemValue, itemIndex, data) => {

                                            this.valuechange(itemValue, itemIndex, data);

                                            this.setState({ variation: itemValue });
                                        }}
                                        //labelExtractor={({label})=> alert(label)}
                                        label={this.state.dropdown_placeholder}
                                        data={data} />

                                </View>

                                :
                                <View style={{ width: responsiveWidth(50), margin: 10, marginLeft: 15, marginRight: 15 }}></View>
                        }

                        {/* <View>
                            <Icon color="black" name="share" size={20} onPress={() => this.share()} style={{ marginLeft: 60 }} />
                        </View> */}

                    </View>

                    {
                        this.state.variation_check2 ?
                            <View style={styles.share_view} >
                                <View style={{ justifyContent: 'center', borderColor: 'gray', borderRadius: 3, borderWidth: .5, marginLeft: 15, marginRight: 15, width: responsiveWidth(50), height: responsiveHeight(8), paddingBottom: 10, paddingLeft: 8, paddingRight: 8 }}>
                                    <Dropdown
                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                        value={this.state.variation2}
                                        onChangeText={(itemValue, itemIndex, data) => {
                                            this.valuechange2(itemValue, itemIndex, data);

                                            this.setState({ variation2: itemValue });
                                        }}

                                        label={this.state.dropdown_placeholder2}
                                        data={variation_data} />


                                </View>
                            </View>
                            :

                            <View style={{}}></View>

                    }




                    {
                        this.state.variation_check3 ?
                            <View style={styles.share_view} >
                                <View style={{ justifyContent: 'center', borderColor: 'gray', borderRadius: 3, borderWidth: .5, marginLeft: 15, marginRight: 15, width: responsiveWidth(50), height: responsiveHeight(8), paddingBottom: 10, paddingLeft: 8, paddingRight: 8 }}>
                                    <Dropdown
                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                        value={this.state.variation3}
                                        onChangeText={(itemValue, itemIndex, data) => {
                                            this.valuechange3(itemValue, itemIndex, data);

                                            this.setState({ variation3: itemValue });
                                        }}

                                        label={this.state.dropdown_placeholder3}
                                        data={variation_data1} />


                                </View>
                            </View>
                            :

                            <View style={{}}></View>

                    }

                    {this.state.stock == '0' ?
                        <View style={{ height: responsiveHeight(8), width: responsiveWidth(92), backgroundColor: '#ff4254', margin: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold', color: '#fff' }}>Out of stock</Text>
                        </View>
                        :
                        <View style={{ height: responsiveHeight(8), width: responsiveWidth(92), backgroundColor: '#fff', margin: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                            <View style={{ width: responsiveWidth(15), backgroundColor: '#ff4254', height: responsiveHeight(8), borderColor: '#fff', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: responsiveFontSize(2) }}>{this.state.count}</Text>
                            </View>
                            <View style={{ width: responsiveWidth(15), backgroundColor: '#ff4254', height: responsiveHeight(8), borderColor: '#fff', borderWidth: 1 }}>
                                <TouchableOpacity onPress={this.increment}>
                                    <View style={{ backgroundColor: '#ff4254', width: responsiveWidth(15), height: responsiveHeight(4), borderColor: '#fff', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <FontAwesomeIcon name="plus" size={15} color={'#fff'} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.decrement}>
                                    <View style={{ backgroundColor: '#ff4254', width: responsiveWidth(15), height: responsiveHeight(4), borderColor: '#fff', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <FontAwesomeIcon name="minus" size={15} color={'#fff'} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => this.addToCart()}>
                                <View style={{ width: responsiveWidth(40), backgroundColor: '#ff4254', height: responsiveHeight(8), borderColor: '#fff', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    {this.state.language == 'ar' || this.state.language == '' ? (
                                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(2) }}>أضف إلى السلة</Text>
                                    ) : (
                                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(2) }}>ADD TO CART</Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.addToWishlist()}>
                                <View style={{ width: responsiveWidth(20), backgroundColor: '#ff4254', height: responsiveHeight(8), borderColor: '#fff', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesomeIcon name="heart-o" size={25} color={'#fff'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    {this.state.language == 'ar' || this.state.language == '' ? (
                        <Tabs tabContainerStyle={{ height: 30 }} tabBarUnderlineStyle={{ backgroundColor: '#ede3e4' }} style={{ margin: 5, paddingTop: 5, marginRight: 15, marginLeft: 15 }}>
                           <Tab heading={this.state.language == 'ar' || this.state.language == '' ? ("المراجعات") : ("REVIEWS")} activeTextStyle={{ color: 'red', fontSize: responsiveFontSize(1.5) }} textStyle={{ color: 'gray', fontSize: responsiveFontSize(1.5) }} tabStyle={{ backgroundColor: '#fff' }} activeTabStyle={{ backgroundColor: '#ede3e4', borderColor: 'gray', borderWidth: .5 }} >
                                <View style={{ borderWidth: .5, borderColor: 'gray', height: responsiveHeight(30), padding: 20, backgroundColor: '#ede3e4' }}>
                                    <ScrollView nestedScrollEnabled={true}>
                                        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
                                            {this.state.language == 'ar' ? (
                                                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>آراء المستهلكين</Text>
                                            ) : (
                                                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>Customer reviews</Text>
                                            )}
                                        </View>
                                        {this.state.customerReviewCheck == false ? (
                                            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
                                                {this.state.language == 'ar' || this.state.language == '' ? (
                                                    <Text>لا توجد توصيات بعد</Text>
                                                ) : (
                                                    <Text>There are no reviews yet.</Text>
                                                )}
                                            </View>
                                        ) : (
                                            <View></View>
                                        )}

                                        <View style={{ marginBottom: 8 }}>
                                            <FlatList
                                                data={this.state.commentlist}
                                                renderItem={this.rendercommentlist}
                                                keyExtractor={(item, index) => index}
                                                showsVerticalScrollIndicator={false}
                                            />
                                        </View>

                                        {this.state.login_button ? (
                                            this.state.language == 'ar' || this.state.language == '' ? (
                                                <Button
                                                    title="تسجيل الدخول"
                                                    color="#ff4254"
                                                    style={styles.button}
                                                    onPress={() => this.go_login()}
                                                />
                                            ) : (
                                                <Button
                                                    title="Login"
                                                    color="#ff4254"
                                                    style={styles.button}
                                                    onPress={() => this.go_login()}
                                                />
                                            )
                                        ) : (
                                            this.state.language == 'ar' || this.state.language == '' ? (
                                                <View style={{ alignItems: 'center' }}>
                                                    <TextInput placeholder="  أضف تعليقك"
                                                        placeholderTextColor="gray"
                                                        style={styles.TextInput}
                                                        onChangeText={(comment) => this.setState({ comment })}
                                                        value={this.state.comment}
                                                        underlineColorAndroid='transparent' />
                                                    <Button
                                                        title="إرسال"
                                                        color="#ff4254"
                                                        style={styles.button}
                                                        onPress={() => this.submitCustomerReview()}
                                                    />
                                                </View>
                                            ) : (
                                                <View style={{ alignItems: 'center' }}>
                                                    <TextInput placeholder="  Add Your Comment"
                                                        placeholderTextColor="gray"
                                                        style={styles.TextInput}
                                                        onChangeText={(comment) => this.setState({ comment })}
                                                        value={this.state.comment}
                                                        underlineColorAndroid='transparent' />
                                                    <Button
                                                        title="Submit"
                                                        color="#ff4254"
                                                        style={styles.button}
                                                        onPress={() => this.submitCustomerReview()}
                                                    />
                                                </View>
                                            )
                                        )}
                                        <View style={{ position: 'absolute', top: "50%", right: 0, left: 0 }}>
                                            <ActivityIndicator animating={this.state.issmallLoading} size="large" color="red" />
                                        </View>
                                    </ScrollView>
                                    {/* <StarRating
                                        disabled={false}
                                         emptyStar={'ios-star-outline'}
                                         fullStar={'ios-star'}
                                         halfStar={'ios-star-half'}
                                         iconSet={'Ionicons'}
                                         maxStars={5}
                                         rating={this.state.rating}
                                         starSize={20}
                                         fullStarColor={'red'}
                                     /> */}
                                </View>
                            </Tab>
                            <Tab heading={this.state.language == 'ar' || this.state.language == '' ? ("معلومة") : ("INFORMATION")} activeTextStyle={{ color: 'red', fontSize: responsiveFontSize(1.5) }} textStyle={{ color: 'gray', fontSize: responsiveFontSize(1.5) }} tabStyle={{ backgroundColor: '#fff' }} activeTabStyle={{ backgroundColor: '#ede3e4', borderColor: 'gray', borderWidth: .5 }} >
                                <View style={{ borderWidth: .5, borderColor: 'gray', height: responsiveHeight(30), padding: 20, backgroundColor: '#ede3e4' }} nestedScrollEnabled={true}>

                                    <FlatList
                                        data={this.state.additional_info}
                                        renderItem={this.renderadditional_infolist}
                                        keyExtractor={(item, index) => index}
                                        showsVerticalScrollIndicator={false}
                                    />

                                </View>

                            </Tab>
                            <Tab heading={this.state.language == 'ar' || this.state.language == '' ? ("وصف") : ("DESCRIPTION")} activeTextStyle={{ color: 'red', fontSize: responsiveFontSize(1.5) }} textStyle={{ color: 'gray', fontSize: responsiveFontSize(1.5) }} tabStyle={{ backgroundColor: '#fff' }} activeTabStyle={{ backgroundColor: '#ede3e4', borderColor: 'gray', borderWidth: .5 }} >
                                <View style={{ borderWidth: .5, borderColor: 'gray', height: responsiveHeight(30), padding: 20, backgroundColor: '#ede3e4' }}>

                                    <Text style={{ fontSize: responsiveFontSize(1.5), color: 'gray' }}>{this.state.description}</Text>

                                </View>
                            </Tab>
                            
                        </Tabs>
                    ) : (
                        <Tabs tabContainerStyle={{ height: 30 }} tabBarUnderlineStyle={{ backgroundColor: '#ede3e4' }} style={{ margin: 5, paddingTop: 5, marginRight: 15, marginLeft: 15 }}>
                            <Tab heading={this.state.language == 'ar' || this.state.language == '' ? ("وصف") : ("DESCRIPTION")} activeTextStyle={{ color: 'red', fontSize: responsiveFontSize(1.5) }} textStyle={{ color: 'gray', fontSize: responsiveFontSize(1.5) }} tabStyle={{ backgroundColor: '#fff' }} activeTabStyle={{ backgroundColor: '#ede3e4', borderColor: 'gray', borderWidth: .5 }} >
                                <View style={{ borderWidth: .5, borderColor: 'gray', height: responsiveHeight(30), padding: 20, backgroundColor: '#ede3e4' }}>

                                    <Text style={{ fontSize: responsiveFontSize(1.5), color: 'gray' }}>{this.state.description}</Text>

                                </View>
                            </Tab>
                            <Tab heading={this.state.language == 'ar' || this.state.language == '' ? ("معلومة") : ("INFORMATION")} activeTextStyle={{ color: 'red', fontSize: responsiveFontSize(1.5) }} textStyle={{ color: 'gray', fontSize: responsiveFontSize(1.5) }} tabStyle={{ backgroundColor: '#fff' }} activeTabStyle={{ backgroundColor: '#ede3e4', borderColor: 'gray', borderWidth: .5 }} >
                                <View style={{ borderWidth: .5, borderColor: 'gray', height: responsiveHeight(30), padding: 20, backgroundColor: '#ede3e4' }} nestedScrollEnabled={true}>

                                    <FlatList
                                        data={this.state.additional_info}
                                        renderItem={this.renderadditional_infolist}
                                        keyExtractor={(item, index) => index}
                                        showsVerticalScrollIndicator={false}
                                    />

                                </View>

                            </Tab>
                            <Tab heading={this.state.language == 'ar' || this.state.language == '' ? ("المراجعات") : ("REVIEWS")} activeTextStyle={{ color: 'red', fontSize: responsiveFontSize(1.5) }} textStyle={{ color: 'gray', fontSize: responsiveFontSize(1.5) }} tabStyle={{ backgroundColor: '#fff' }} activeTabStyle={{ backgroundColor: '#ede3e4', borderColor: 'gray', borderWidth: .5 }} >
                                <View style={{ borderWidth: .5, borderColor: 'gray', height: responsiveHeight(30), padding: 20, backgroundColor: '#ede3e4' }}>
                                    <ScrollView nestedScrollEnabled={true}>
                                        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
                                            {this.state.language == 'ar' ? (
                                                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>آراء المستهلكين</Text>
                                            ) : (
                                                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>Customer reviews</Text>
                                            )}
                                        </View>
                                        {this.state.customerReviewCheck == false ? (
                                            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
                                                {this.state.language == 'ar' || this.state.language == '' ? (
                                                    <Text>لا توجد توصيات بعد</Text>
                                                ) : (
                                                    <Text>There are no reviews yet.</Text>
                                                )}
                                            </View>
                                        ) : (
                                            <View></View>
                                        )}

                                        <View style={{ marginBottom: 8 }}>
                                            <FlatList
                                                data={this.state.commentlist}
                                                renderItem={this.rendercommentlist}
                                                keyExtractor={(item, index) => index}
                                                showsVerticalScrollIndicator={false}
                                            />
                                        </View>

                                        {this.state.login_button ? (
                                            this.state.language == 'ar' || this.state.language == '' ? (
                                                <Button
                                                    title="تسجيل الدخول"
                                                    color="#ff4254"
                                                    style={styles.button}
                                                    onPress={() => this.go_login()}
                                                />
                                            ) : (
                                                <Button
                                                    title="Login"
                                                    color="#ff4254"
                                                    style={styles.button}
                                                    onPress={() => this.go_login()}
                                                />
                                            )
                                        ) : (
                                            this.state.language == 'ar' || this.state.language == '' ? (
                                                <View style={{ alignItems: 'center' }}>
                                                    <TextInput placeholder="  أضف تعليقك"
                                                        placeholderTextColor="gray"
                                                        style={styles.TextInput}
                                                        onChangeText={(comment) => this.setState({ comment })}
                                                        value={this.state.comment}
                                                        underlineColorAndroid='transparent' />
                                                    <Button
                                                        title="إرسال"
                                                        color="#ff4254"
                                                        style={styles.button}
                                                        onPress={() => this.submitCustomerReview()}
                                                    />
                                                </View>
                                            ) : (
                                                <View style={{ alignItems: 'center' }}>
                                                    <TextInput placeholder="  Add Your Comment"
                                                        placeholderTextColor="gray"
                                                        style={styles.TextInput}
                                                        onChangeText={(comment) => this.setState({ comment })}
                                                        value={this.state.comment}
                                                        underlineColorAndroid='transparent' />
                                                    <Button
                                                        title="Submit"
                                                        color="#ff4254"
                                                        style={styles.button}
                                                        onPress={() => this.submitCustomerReview()}
                                                    />
                                                </View>
                                            )
                                        )}
                                        <View style={{ position: 'absolute', top: "50%", right: 0, left: 0 }}>
                                            <ActivityIndicator animating={this.state.issmallLoading} size="large" color="red" />
                                        </View>
                                    </ScrollView>
                                    {/* <StarRating
                                        disabled={false}
                                         emptyStar={'ios-star-outline'}
                                         fullStar={'ios-star'}
                                         halfStar={'ios-star-half'}
                                         iconSet={'Ionicons'}
                                         maxStars={5}
                                         rating={this.state.rating}
                                         starSize={20}
                                         fullStarColor={'red'}
                                     /> */}
                                </View>
                            </Tab>
                        </Tabs>
                    )}
                    {this.state.dataSource == '' ? (
                        <View></View>
                    ) : (
                        this.state.language == 'ar' || this.state.language == '' ? (
                            <Text style={{ margin: 15, color: 'gray' }}>المنتجات ذات الصلة</Text>
                        ) : (
                            <Text style={{ margin: 15, color: 'gray' }}>RELATED PRODUCT</Text>
                        )
                    )}
                    <View style={{ paddingLeft: 5, paddingRight: 5 }}>

                        <FlatList
                            data={this.state.dataSource}
                            renderItem={this.renderRelated}
                            keyExtractor={(item, index) => index}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                </ScrollView>
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
                <AnimatedLoader
                    visible={this.state.isLoading}
                    source={require("../../../../loader.json")}
                    overlayColor="rgba(255,255,255,1)"
                    animationStyle={styles.lottie}
                    speed={1}
                />
            </SafeAreaView>


        );
    }
}

// const mapDispatchToProps = (dispatch)=>{
//     return {
//         addItemToCart:(product) => dispatch({type:'ADD_TO_CART',payload:product})
//     }
// }

//export default connect(null,mapDispatchToProps)(ProductDetailsScreen);
export default ProductDetailsScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    SingelImgBanner: {
        width: BannerWidth,
        height: BannerHeight,
        resizeMode: 'contain'
    },
    moreImg: {
        height: responsiveHeight(10),
        width: responsiveWidth(20),
        margin: 5,
        borderColor: '#ff4254',
        borderWidth: 1.5,
        borderRadius: 5,
        resizeMode: 'contain'
    },
    title_view: {
        margin: 10,
        marginLeft: 30
    },
    title_view_ar: {
        margin: 10,
        marginRight: 30,

    },
    price_view: {
        marginLeft: 15,
        marginTop: 5
    },
    title_ar: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        textAlign: 'right'
    },
    title: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',

    },
    price: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',

        color: 'red'
    },
    sku: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',

        color: 'gray'
    },
    sku_ar: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        textAlign: 'right',
        color: 'gray'
    },
    share_view: {
        margin: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    PickerInput: {
        height: responsiveHeight(7),
        color: 'gray'
    },
    TextInput: {
        height: responsiveHeight(8),
        width: responsiveWidth(77),
        //alignSelf: 'stretch',
        fontSize: responsiveFontSize(2),
        borderWidth: 0,
        backgroundColor: '#fff',
        borderColor: '#eaeaea',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10
    },
    div4: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 5,
        marginLeft: 5,
        paddingRight: 5
    },

    GalleryBox: {
        marginLeft: 5,
        //margin: 10,
        backgroundColor: '#ffffff',
        borderRadius: 3,
        height: responsiveHeight(38),
        width: responsiveWidth(44.5),
        borderTopWidth: 3,
        borderTopColor: '#ff4254'
    },
    GalleryImg: {
        //marginTop: 1,
        borderRadius: 3,
        borderColor: '#f8668b',

    },
    SingelImg: {
        height: responsiveHeight(22),
        width: responsiveWidth(44.5),
        resizeMode: 'cover',
    },
    GalleryText: {

        height: responsiveHeight(6),
        fontSize: responsiveFontSize(2),
        //textAlign: 'center'
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
    userNmae: {
        fontSize: responsiveFontSize(2),

        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        //textAlign: 'center'
    },
    amountuserNmae: {
        fontSize: responsiveFontSize(2),
        color: '#ff4254',
        marginLeft: 5,
        marginRight: 5,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#1c1d19",
        height: responsiveHeight(100),
        //width: '80%',
        // borderRadius: 10,
        // borderWidth: 1,
        // borderColor: '#fff',
        //marginTop: 80,
        //marginLeft: 40,

    },
    imagemodal: {
        height: 400,
        width: '95%',

    },
    lottie: {
        width: 100,
        height: 100
    },
    discountprice: {
        textDecorationLine: 'line-through',
        fontSize: responsiveFontSize(2),
        marginLeft: 5,
        marginRight: 5,
    }


});
