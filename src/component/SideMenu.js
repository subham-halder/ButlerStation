import React from 'react';
import { View, Image, Dimensions, SafeAreaView, ScrollView, StyleSheet, AsyncStorage, Alert, TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Text, List, ListItem } from 'native-base';
import { IMAGE } from '../constants/Image';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, TapGestureHandler } from 'react-native-gesture-handler';
export class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login_button: true,
      language: '',
    };
  }
  componentDidMount() {
    //this.setState({ isLoading: true });
    setInterval(() => {
      this.loggedinCheck();
      this.languageCheck();
    }, 1000);

  }
  loggedinCheck() {
    AsyncStorage.getItem('usersid', (err, res) => {
      AsyncStorage.getItem('auth_hash', (err, res2) => {
        //  console.log("IsLoginCheck" + res);
        if (res != null && res2 != null) {
          this.setState({

            login_button: true
          });
        } else {
          this.setState({

            login_button: false
          });
        }
      });
    });

    //console.log(this.state.login_button);
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

  clearAsyncStorage = async () => {
    AsyncStorage.removeItem('usersid');
    AsyncStorage.removeItem('cartsession');
    //AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  }

  chk_router(value) {
    console.log(this.props.navigation.state.routeName);
    if (this.props.navigation.state.routeName == 'app') {
      var pagename = "Login"
      if (value == pagename) {
        this.props.navigation.closeDrawer();
      } else {
        this.props.navigation.closeDrawer();
      }
      this.props.navigation.navigate(value);
    } else {
      if (value == this.props.navigation.state.routeName) {
        this.props.navigation.closeDrawer();
      }
      this.props.navigation.navigate(value);
    }

  }

  render() {

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <View style={{ height: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
          <View style={{}}>
            <Image style={{
              height: responsiveHeight(10), width: responsiveWidth(70), resizeMode: 'contain', 
            }} source={require('../../assets/header-logo.png')} />
          </View>
        </View>

        <ScrollView style={{ paddingTop: 10 }}>
          <TouchableWithoutFeedback onPress={() => this.chk_router("Home")}>
            <View style={styles.navSectionStyle}>
              <View style={styles.iconstyle}>
                
                <Image
                  source={IMAGE.ICON_HOME_MENU}
                  resizeMode='contain'
                  style={{ height: responsiveHeight(5), width: responsiveWidth(5), resizeMode: 'contain', }}
                />
              </View>
              <View>

                <Text style={styles.navItemStyle} >
                  Home
                </Text>

              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.chk_router("ResturantList")}>
            <View style={styles.navSectionStyle}>
              <View style={styles.iconstyle}>
              <Image
                  source={IMAGE.ICON_NOTIFICATION}
                  resizeMode='contain'
                  style={{ height: responsiveHeight(5), width: responsiveWidth(5), resizeMode: 'contain', }}
                />
              </View>
              <View>

                <Text style={styles.navItemStyle} >
                Resturant List
                </Text>

              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.chk_router("ReadyToCookDetails")}>
            <View style={styles.navSectionStyle}>
              <View style={styles.iconstyle}>
              <Image
                  source={IMAGE.ICON_NOTIFICATION}
                  resizeMode='contain'
                  style={{ height: responsiveHeight(5), width: responsiveWidth(5), resizeMode: 'contain', }}
                />
              </View>
              <View>

                <Text style={styles.navItemStyle} >
                  Notification
                </Text>

              </View>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("ResturantList")}>
            <View style={styles.navSectionStyle}>
              <View style={styles.iconstyle}>
              <Image
                  source={IMAGE.ICON_LANGUAGE}
                  resizeMode='contain'
                  style={{ height: responsiveHeight(5), width: responsiveWidth(5), resizeMode: 'contain', }}
                />
              </View>
              <View>

                <Text style={styles.navItemStyle} >
                  Language
                </Text>

              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("DineinResturentDetails")}>
            <View style={styles.navSectionStyle}>
              <View style={styles.iconstyle}>
              <Image
                  source={IMAGE.ICON_HELP}
                  resizeMode='contain'
                  style={{ height: responsiveHeight(5), width: responsiveWidth(5), resizeMode: 'contain', }}
                />
              </View>
              <View>

                <Text style={styles.navItemStyle} >
                  Help
                </Text>

              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("ResturantListReadyCook")}>
            <View style={styles.navSectionStyle}>
              <View style={styles.iconstyle}>
              <Image
                  source={IMAGE.ICON_INFO}
                  resizeMode='contain'
                  style={{ height: responsiveHeight(5), width: responsiveWidth(5), resizeMode: 'contain', }}
                />
              </View>
              <View>

                <Text style={styles.navItemStyle} >
                  About Us
                </Text>

              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("ConferenceRoom")}>
            <View style={styles.navSectionStyle}>
              <View style={styles.iconstyle}>
              <Image
                  source={IMAGE.ICON_POLICY}
                  resizeMode='contain'
                  style={{ height: responsiveHeight(5), width: responsiveWidth(5), resizeMode: 'contain', }}
                />
              </View>
              <View>

                <Text style={styles.navItemStyle} >
                  Policy
                </Text>

              </View>
            </View>
          </TouchableWithoutFeedback>


        </ScrollView>

        <View style={{ bottom: 0, position: 'absolute', width: '100%' }}>

          {this.state.login_button ? (

            <TouchableWithoutFeedback onPress={() => {
              Alert.alert(
                '',
                'Are You Want To Logout?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK', onPress: () => {
                      this.clearAsyncStorage();
                    }
                  },
                ],
                { cancelable: false },
              )
            }}>
              <View style={styles.navSectionStyle}>
                <View style={styles.iconstyle}>
                <Image
                  source={IMAGE.ICON_LOGOUT}
                  resizeMode='contain'
                  style={{ height: responsiveHeight(5), width: responsiveWidth(5), resizeMode: 'contain', }}
                />
                </View>
                <View>

                  <Text style={styles.navItemStyle} >
                    Logout
                  </Text>

                </View>
              </View>
            </TouchableWithoutFeedback>

          ) : (
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Login")}>
              <View style={styles.navSectionStyle}>
                <View style={styles.iconstyle}>
                <Image
                  source={IMAGE.ICON_LOGOUT}
                  resizeMode='contain'
                  style={{ height: responsiveHeight(5), width: responsiveWidth(5), resizeMode: 'contain', }}
                />
                </View>
                <View>

                  <Text style={styles.navItemStyle} >
                    Login
                  </Text>

                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    //backgroundColor: '#ffffff'
  },
  navItemStyle: {
    padding: 10,
    color: '#2B2B2B'
  },
  navItemStylear: {
    padding: 10,
    color: '#2B2B2B'
  },
  navTextStyle: {
    padding: 10,
    color: '#2B2B2B',
    fontSize: 20
  },
  navSectionStyle: {
    flex: 1,
    flexDirection: 'row',
    color: 'white',
    paddingLeft: 10,
    alignItems: 'center'
  },
  navSectionStylear: {
    flex: 1,
    flexDirection: 'row-reverse',
    color: 'white',
    paddingLeft: 10,
    alignItems: 'center'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
  },
  iconstyle: {
    color: 'white',
    //flexDirection: 'row',
    width: responsiveWidth(15),
    marginLeft: 10
  },
  iconstylear: {
    color: 'white',
    //flexDirection: 'row',
    width: responsiveWidth(15)
  },
  footer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  footerText1: {
    flex: 1,
    fontSize: 10,
    marginRight: 20,
    marginLeft: 20
  },
  footerText2: {
    flex: 1,
    textAlign: 'right',
    marginRight: 20,
    color: 'gray',
  },
});