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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import b from '../BaseUrl';
import CustomHeader from '../CustomeHeader';
const { height, width } = Dimensions.get('window')

export class PassChangeTwo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      code: '',
      pass: '',
      conf_password: '',
      showAlert: false,
      Msg: '',
      isLoading: true,
      language: '',
      isLoading_new: false,
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
      if(this.state.language == 'ar'){
        this.setState({ Msg: "لا يمكنك ترك الرسالة خالية"});
      }else{
        this.setState({ Msg: "Email should not be blank" });
      }
      this.showAlert();
    } else if (this.state.code == "") {
      //alert("Choose Registration Type");
     
      if(this.state.language == 'ar'){
        this.setState({ Msg: "يجب ألا يكون الرمز فارغًا"});
      }else{
        this.setState({ Msg: "Code should not be blank" });
      }
      this.showAlert();
    } else if (this.state.pass == "") {
      //alert("Choose Registration Type");
      if(this.state.language == 'ar'){
        this.setState({ Msg: "يجب ألا تكون كلمة المرور فارغة"});
      }else{
        this.setState({ Msg: "Password should not be blank" });
      }
      this.showAlert();
    } else if (this.state.conf_password == "") {
      //alert("Choose Registration Type");
      
      if(this.state.language == 'ar'){
        this.setState({ Msg: "يجب ألا يكون حقل تأكيد كلمة المرور فارغًا"});
      }else{
        this.setState({ Msg: "Confirm Password should not be blank" });
      }
      this.showAlert();
    } else if (this.state.pass != this.state.conf_password) {
      //alert("Choose Registration Type");
    
      if(this.state.language == 'ar'){
        this.setState({ Msg: "يجب مطابقة كلمة المرور وتأكيد كلمة المرور"});
      }else{
        this.setState({ Msg: "Password And Confirm Password should be matched" });
      }
      this.showAlert();
    } else {
      const baseUrl = b.abc();
      this.setState({ isLoading_new: true });
      const url = `${baseUrl}/wp-json/albaghlisponge/user/resetpass`;
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          code: this.state.code,
          new_pass: this.state.pass,
          conf_new_pass: this.state.conf_password,
        })
      })

        .then((response) => response.json())
        .then((res) => {
          //console.log(res.user.id);
          if (res.error == false) {
            this.setState({ isLoading_new: false });
            if(this.state.language == 'ar'){
              this.setState({ Msg: "إعادة تعيين كلمة المرور بنجاح"});
            }else{
              this.setState({ Msg: "password reset successfully" });
            }
            this.props.navigation.navigate('Login');

          } else if (res.error == true) {
            this.setState({ isLoading_new: false });
            if(this.state.language == 'ar'){
              this.setState({ Msg: "هناك خطأ ما"});
            }else{
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
         {this.state.language == 'ar' || this.state.language == ''? (
        <CustomHeader title="هل نسيت كلمة المرور" navigation={this.props.navigation} />
        ) : (
        <CustomHeader title="Forgot Password" navigation={this.props.navigation} />
          )}
        <View style={styles.firstdiv}>
          <ImageBackground source={require('../../../assets/background.jpg')} style={styles.backgroundImage} >
            <View style={styles.SigninView}>
              <Image style={styles.header_icon} source={require('../../../assets/header-logo.png')} />
              {this.state.language == 'ar' || this.state.language == ''? (
                <Text style={styles.SigninText}>التحقق من الرمز </Text>
              ) : (
                  <Text style={styles.SigninText}>CODE VERIFICATION </Text>
                )}
            </View>
            <View style={{  justifyContent: 'center', alignItems: 'center',marginTop:15 }}>

              {this.state.language == 'ar' || this.state.language == ''? (
                <TextInput placeholder="البريد الإلكتروني"
                  placeholderTextColor="#306ab3"
                  style={styles.TextInput_rtl}
                  onChangeText={(email) => this.setState({ email })}
                  value={this.state.email}
                  autoCapitalize="none"
                  underlineColorAndroid='transparent' />
              ) : (
                  <TextInput placeholder="Email"
                    placeholderTextColor="#306ab3"
                    style={styles.TextInput}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    autoCapitalize="none"
                    underlineColorAndroid='transparent' />
                )}
                {this.state.language == 'ar' || this.state.language == ''? (
              <TextInput placeholder="الشفرة"
                placeholderTextColor="#306ab3"
                style={styles.TextInput_rtl}
                onChangeText={(code) => this.setState({ code })}
                value={this.state.code}
                autoCapitalize="none"
                underlineColorAndroid='transparent' />
                ) : (
                  <TextInput placeholder="Code"
                  placeholderTextColor="#306ab3"
                  style={styles.TextInput}
                  onChangeText={(code) => this.setState({ code })}
                  value={this.state.code}
                  autoCapitalize="none"
                  underlineColorAndroid='transparent' />
                  )}
                  {this.state.language == 'ar' || this.state.language == ''? (
              <TextInput placeholder="كلمة مرور جديدة"
                placeholderTextColor="#306ab3"
                style={styles.TextInput_rtl}
                //secureTextEntry={true}
                onChangeText={(pass) => this.setState({ pass })}
                value={this.state.pass}
                underlineColorAndroid='transparent' />
                ) : (
<TextInput placeholder="New Password"
                placeholderTextColor="#306ab3"
                style={styles.TextInput}
                //secureTextEntry={true}
                onChangeText={(pass) => this.setState({ pass })}
                value={this.state.pass}
                underlineColorAndroid='transparent' />
                  )}  
                  {this.state.language == 'ar' || this.state.language == ''? (
              <TextInput placeholder="تأكيد كلمة المرور"
                placeholderTextColor="#306ab3"
                style={styles.TextInput_rtl}
                //secureTextEntry={true}
                onChangeText={(conf_password) => this.setState({ conf_password })}
                value={this.state.conf_password}
                underlineColorAndroid='transparent' />
                ) : (
<TextInput placeholder="Confirm Password"
                placeholderTextColor="#306ab3"
                style={styles.TextInput}
                //secureTextEntry={true}
                onChangeText={(conf_password) => this.setState({ conf_password })}
                value={this.state.conf_password}
                underlineColorAndroid='transparent' />
                  )} 

              <View style={styles.button_view}>
                <Button block style={styles.button} onPress={() => this.login()}>
                {this.state.language == 'ar' || this.state.language == ''? (
                  <Text style={{ color: '#fff' }}>غير كلمة السر</Text>
                  ) : (
<Text style={{ color: '#fff' }}>CHANGE PASSWORD</Text>
                    )}
                </Button>
              </View>
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
            <Image style={styles.header_icon} source={require('../../../assets/header-logo.png')} />
          </View>
        </View> */}
        {this.state.language == 'ar' || this.state.language == '' ? (
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title=""
          messageStyle={{ fontSize: responsiveFontSize(2) }}
          message={Msg}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText="موافق"
          cancelButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
        ) : (
          <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title=""
          messageStyle={{ fontSize: responsiveFontSize(2) }}
          message={Msg}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText="OK"
          cancelButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
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
    backgroundColor: '#fe4155',
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
    marginTop: 10
  },
  SigninText: {
    color: '#306ab3',
    fontSize: responsiveFontSize(4),
    marginTop: 10
  },
  TextInput: {
    height: responsiveHeight(8),
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
    height: responsiveHeight(8),
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
    height: responsiveHeight(10),
    width: responsiveWidth(60),
  },
  button: {
    backgroundColor: '#fe4155',
    borderColor: '#fff',
    borderWidth: 1
  },
  forgotText: {
    color: '#fff',
    //fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
    margin: 15
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
    color: '#fff',
    fontSize: responsiveFontSize(2),
    // borderBottomColor: 'lightgray',
    // borderBottomWidth: 1,
    marginBottom: 40,
    marginTop: 20
  },
  header_icon: {
    height: responsiveHeight(10),
    width: responsiveWidth(60),
    //margin: 10,
    resizeMode: 'contain',
  },
  social_icon: {
    height: responsiveHeight(10),
    width: responsiveWidth(30),
    //margin: 10,
    resizeMode: 'contain',
  },
  lottie: {
    width: 100,
    height: 100
  }
});