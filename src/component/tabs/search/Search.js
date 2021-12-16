import React from 'react';
import { View, StyleSheet, Dimensions, Image, BackHandler, AsyncStorage, FlatList, ScrollView, ImageBackground, TextInput, Alert, ActivityIndicator, StatusBar } from 'react-native';
import CustomHeader from '../../CustomeHeader';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AnimatedLoader from "react-native-animated-loader";
import b from '../../BaseUrl';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import AwesomeAlert from 'react-native-awesome-alerts';
import { Container, Header, Item, Input, Icon, Button, Text, List, ListItem, Body, Left, Right, Thumbnail } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Entities = require('html-entities').XmlEntities;

export class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productlist: '',
            productlistsearch: '',
            isLoading: false,
            isnewLoading: false,
            search: '',
            data_emty_check: false,
            search_view: false,
            language: '',
        };
    }


    componentDidMount() {
       // this.setState({ isLoading: true });
        this.languageCheck();
    
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

   
    fillup(text) {
        this.setState({
            search: text
        })
        //this.handlesearch();
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
        const { showAlert } = this.state;
        const { Msg } = this.state;
        return (
            <View style={styles.container} >
               
               
                <View style={{ position: 'absolute', top: "50%", right: 0, left: 0 }}>
                    <ActivityIndicator animating={this.state.isLoading} size="large" color="#ff4254" />
                </View> 
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
            visible={this.state.isnewLoading}
            source={require("../../../../loader.json")}
            overlayColor="rgba(255,255,255,1)"
            animationStyle={styles.lottie}
            speed={1}
        />
            </View>
        )
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
        height: responsiveHeight(8),
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
        margin: 5
    },
    price: {
        marginTop: 10,
        color: 'red'
    },
    SingelImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',


    },
    portionHeaderText: {
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 10,
        color: '#514A5D',

        fontSize: responsiveFontSize(2)
    },
    lottie: {
        width: 100,
        height: 100
    }

});
