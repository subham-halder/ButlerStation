import React, { Component } from 'react';
import { StyleSheet, StatusBar, Icon, Image, ImageBackground, Dimensions, ScrollView, TouchableOpacity, KeyboardAvoidingView, TextInput, AsyncStorage, Alert, View, ActivityIndicator } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { Button, Text } from 'native-base';
import AwesomeAlert from 'react-native-awesome-alerts';
import AnimatedLoader from "react-native-animated-loader";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import b from '../BaseUrl';
import CustomHeader from '../CustomeHeader';

const { height, width } = Dimensions.get('window')


export class PassChangeOne extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      showAlert: false,
      Msg: '',
      isLoading: true,
      isLoading_new: false,
      language: '',
    };
  }


  async componentDidMount() {
    //this.isLoggedin();
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
          isLoading: false,
        });
      } else {
        var lang = languageres;
        this.setState({
          language: languageres,
          isLoading: false,
        });
      }
    });
  }

  isLoggedin = async () => {
    AsyncStorage.getItem('usersid', (err, res) => {
      if (res != null) {
        this.props.navigation.navigate('Home');
      }
    });
  }

  login = async () => {

    if (this.state.email == "") {
      //alert("Choose Registration Type");
      if (this.state.language == 'ar') {
        this.setState({ Msg: "لا يمكنك ترك الرسالة خالية" });
      } else {
        this.setState({ Msg: "Email should not be blank" });
      }
      this.showAlert();
    } else {
      const baseUrl = b.abc();
      this.setState({ isLoading_new: true });
      const url = `${baseUrl}/wp-json/albaghlisponge/user/coderequest`;
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
        })
      })

        .then((response) => response.json())
        .then((res) => {
          //console.log(res.user.id);
          if (res.error == false) {
            this.setState({ isLoading_new: false });
            this.props.navigation.navigate('PassChangeTwo');
            //alert('Please Check Your Email');
            if (this.state.language == 'ar') {
              this.setState({ Msg: "تفقد بريدك الالكتروني من فضلك" });
            } else {
              this.setState({ Msg: 'Please Check Your Email' });
            }


          } else if (res.error == true) {
            this.setState({ isLoading_new: false });
            if (this.state.language == 'ar') {
              this.setState({ Msg: "هناك خطأ ما" });
            } else {
              this.setState({ Msg: "Something went wrong" });
            }
            this.showAlert();
          }
        })
        .done();
    }


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
      <View style={styles.container}>
        <View style={styles.firstdiv}>
          <ImageBackground source={require('../../../assets/backgroundLogin.jpg')} style={styles.backgroundImage} >
            {/* <CustomHeader navigation={this.props.navigation} isLogin={true} /> */}
            <View style={styles.SigninView}>
              {/* <Text style={styles.SigninText}>LOGIN </Text> */}
              <Image style={styles.header_icon} source={require('../../../assets/header-logo.png')} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 120 }}>

            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
              <Text style={{ color: '#9F958B', fontSize: responsiveFontSize(3) }}>Forget Password</Text>
            </View>

            <View style={{ flex: 1, alignItems: 'center', marginTop: 30 }}>
             
               
                <View style={styles.searchSection}>
                  <FontAwesomeIcon name="envelope" size={20} style={styles.searchIcon} color="#7C7C7C"/>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#7C7C7C"
                    value={this.state.email}
                    onChangeText={(email) => { this.setState({ email }) }}
                    underlineColorAndroid="transparent"
                  />
                </View>
             
              <View style={styles.button_view}>
                <Button block style={styles.button} >
                  {this.state.language == 'ar' || this.state.language == '' ? (
                    <Text style={{ color: '#fff' }}>تسجيل الدخول</Text>
                  ) : (
                    <Text style={{ color: '#fff' }}>Send OTP</Text>
                  )}
                </Button>
              </View>


              {/* {this.state.language == 'ar' || this.state.language == '' ? (
              <Text style={styles.createaccount} onPress={() => this.props.navigation.navigate('Login')}>ليس لديك ملف تعريف؟<Text style={{ color: '#828282', fontWeight: 'bold' }}> سجل</Text></Text>
            ) : (
              <Text style={styles.createaccount} onPress={() => this.props.navigation.navigate('Login')}>Already have an Account?<Text style={{ color: '#828282', fontWeight: 'bold' }}> Log In</Text></Text>
            )} */}
              {/* <View style={{ position: 'absolute', top: "50%", right: 0, left: 0 }}>
                <ActivityIndicator animating={this.state.isLoading} size="large" color="red" />
              </View> */}
              <AnimatedLoader
                visible={this.state.isLoading}
                overlayColor="rgba(255,255,255,1)"
                source={require("../../../loader.json")}
                animationStyle={styles.lottie}
                speed={1}
              />
              <AnimatedLoader
                visible={this.state.isLoading_new}
                overlayColor="rgba(255,255,255,1)"
                source={require("../../../loader.json")}
                animationStyle={styles.lottie}
                speed={1}
              />

            </View>

          </ImageBackground>
        </View>
        {/* <View style={styles.seconddiv}>
        <View style={styles.facebookdiv}>
          <Text style={styles.createaccount} onPress={() => this.props.navigation.navigate('Register')}>Create an Account</Text>
          
        </View>
      </View> */}

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title=""
          messageStyle={{ fontSize: responsiveFontSize(2) }}
          message={Msg}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText={this.state.language == 'ar' || this.state.language == '' ? ("موافق") : ("OK")}
          cancelButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBE1D7',
  },
  firstdiv: {
    height: responsiveHeight(100),
    backgroundColor: '#fff',
  },
  backgroundImage: {
    resizeMode: 'cover',
    flex: 1,
  },
  SigninView: {
    alignItems: 'center',
    marginTop: height * 0.1
  },
  SigninText: {
    color: '#fff',
    fontSize: responsiveFontSize(5),
  },
  TextInput: {
    height: responsiveHeight(7),
    width: responsiveWidth(80),
    fontSize: responsiveFontSize(2),
    borderWidth: 0,
    backgroundColor: '#fff',
    borderColor: '#eaeaea',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },
  TextInput_rtl: {
    height: responsiveHeight(7),
    width: responsiveWidth(80),
    fontSize: responsiveFontSize(2),
    borderWidth: 0,
    backgroundColor: '#fff',
    borderColor: '#eaeaea',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    textAlign: 'right'
  },
  button_view: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 30,
    marginBottom: 30
  },
  button: {
    backgroundColor: '#2F3237',
    borderRadius: 30,
    height: responsiveHeight(7),
    width: responsiveWidth(50),
  },
  forgotText: {
    color: '#454545',
    //fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
    marginTop: 10,
    marginLeft: 210
  },
  seconddiv: {
    height: responsiveHeight(25),
    backgroundColor: '#a5a2db',
  },
  facebookdiv: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  createaccount: {
    color: '#828282',
    fontSize: responsiveFontSize(2),
    // borderBottomColor: 'lightgray',
    // borderBottomWidth: 1,
    marginBottom: 40,
    marginTop: 20
  },
  header_icon: {
    height: responsiveHeight(13),
    width: responsiveWidth(55),
    marginLeft: -60,
    resizeMode: 'contain',
  },
  social_icon: {
    height: responsiveHeight(7),
    width: responsiveWidth(15),
    //margin: 10,
    resizeMode: 'contain',
  },
  lottie: {
    width: 100,
    height: 100,

  },
  searchSection: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: responsiveHeight(7),
    width: responsiveWidth(80),
    borderRadius: 5,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});