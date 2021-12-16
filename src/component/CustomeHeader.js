import React from 'react';
import { Container, Header, Left, Body, Right, Button, Title, Text, List, ListItem, ActionSheet } from 'native-base';
import {
  Platform,
  StyleSheet,
  Image,
  View, TouchableOpacity, Alert, AsyncStorage, StatusBar, Modal, TouchableHighlight, TouchableWithoutFeedback
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IMAGE } from '../../src/constants/Image';
import MyContext from './MyContext';

//import {connect} from 'react-redux'; 

// const mapStateToProps = (state) => {
//   return {
//     cartItems: state
//   }
// }

//const Context = React.createContext('tset');

class CustomHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //count: '',
      modalVisible: false,
      lang: ''

    };
  }

  async componentDidMount() {
    this.languageCheck();
    setInterval(() => {
      this.languageCheck();
    }, 10000);

  }

  languageCheck() {
    AsyncStorage.getItem('language', (err, languageres) => {
      //console.log(languageres + "language from home screen");

      if (languageres == '' || languageres == null) {

        this.setState({
          lang: 'ar',
        });
      } else {
        var lang = languageres;
        this.setState({
          lang: languageres,
        });
      }
    });
  }

  langchangeToEn() {
    AsyncStorage.setItem('language', 'en');
    this.setState({ modalVisible: false });
    this.props.navigation.push("Home");
  }

  langchangeToAr() {
    AsyncStorage.setItem('language', 'ar');
    this.setState({ modalVisible: false });
    this.props.navigation.push("Home");
  }

  // abc() {
  //   AsyncStorage.getItem('auth_hash', (err, res) => {
  //     AsyncStorage.getItem('cartsession', (err, cartres) => {
  //       let newProduct = JSON.parse(cartres);
  //       //console.log(cartres);
  //       if (newProduct == '' || newProduct == null) {
  //         fetch('https://swissmade.direct/wp-json/swissmade/cart/items', {
  //           method: 'POST',
  //           headers: {
  //             'Accept': 'application/json',
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             auth_hash: JSON.parse(res)
  //           }),
  //         })

  //           .then((response) => response.json())
  //           .then((resp) => {

  //             if (resp.error == false) {
  //               //console.log(resp.items.length);
  //               this.setState({
  //                 count: resp.items.length
  //               })
  //             } else {
  //               this.setState({
  //                 count: 0
  //               })
  //             }

  //           })
  //           .catch(err => {

  //           });
  //       } else {
  //         this.setState({
  //           count: newProduct.length
  //         })
  //       }
  //     });
  //   });

  // }
  render() {
    let { title, isHome, isLogin, isMyCart } = this.props;

    return (
      <View>
        {this.state.lang == 'en' ? (
          <Header style={{ backgroundColor: '#fff' }}>
            <StatusBar backgroundColor="#ff4254" />
            <Left>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('MyCart')}>
                  <View style={{ marginLeft: 10, marginRight: 10 }}>
                    <Icon name="shopping-cart" size={22} color={'#0F1E3D'} />
                    <View style={{
                      position: 'absolute', height: 20, width: 20,
                      borderRadius: 15, backgroundColor: 'rgba(15, 30, 61,0.8)', left: 15, bottom: 15, alignItems: 'center', justifyContent: 'center', zIndex: 2000
                    }}>

                      <MyContext.Consumer>
                        {data => <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', marginLeft: -2 }}> {data}</Text>}
                      </MyContext.Consumer>

                    </View>
                  </View>
                </TouchableOpacity>
                <View style={{}}>
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                      this.setState({ modalVisible: false });
                    }}
                  >
                    <TouchableWithoutFeedback onPress={() => this.setState({ modalVisible: false })}>
                      <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                          <View style={{
                            position: 'absolute', height: 30, width: 30,
                            borderRadius: 15, backgroundColor: 'rgba(255, 255, 255,0.8)', right: 15, top: 15, alignItems: 'center', justifyContent: 'center', zIndex: 2000
                          }}>
                            <TouchableOpacity onPress={() => {
                              this.setState({ modalVisible: false });
                            }}>
                              <Icon name='cancel' color={'black'} size={27} />
                            </TouchableOpacity>
                          </View>
                          <View style={{ padding: 30 }}>
                            <TouchableOpacity onPress={() => {
                              this.langchangeToEn();
                            }}>
                              <View style={{ flexDirection: 'row', height: responsiveHeight(8), width: responsiveWidth(40) }}>

                                <Text style={styles.modalText}>ENGLISH</Text>

                                <Image style={{
                                  height: responsiveHeight(3),
                                  width: responsiveWidth(30),
                                  resizeMode: 'contain',

                                }} source={require('../../assets/flags_usa.png')} />
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                              this.langchangeToAr();
                            }}>
                              <View style={{ flexDirection: 'row', height: responsiveHeight(8), width: responsiveWidth(40) }}>

                                <Text style={styles.modalText2}>العربية</Text>

                                <Image style={{
                                  height: responsiveHeight(3),
                                  width: responsiveWidth(30),
                                  resizeMode: 'contain',

                                }} source={require('../../assets/flags_kuwait.png')} />
                              </View>
                            </TouchableOpacity>
                          </View>

                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </Modal>

                  <TouchableHighlight
                    style={styles.openButton}
                    onPress={() => {
                      this.setState({ modalVisible: true });
                    }}
                  >
                    {
                      this.state.lang == 'en' ?
                        <Image style={{
                          height: responsiveHeight(3),
                          width: responsiveWidth(10),
                          resizeMode: 'contain',

                        }} source={require('../../assets/flags_usa.png')} />
                        :
                        <Image style={{
                          height: responsiveHeight(3),
                          width: responsiveWidth(10),
                          resizeMode: 'contain',

                        }} source={require('../../assets/flags_kuwait.png')} />
                    }
                  </TouchableHighlight>
                </View>
              </View>
            </Left>

            <Body>
              {
                isHome ?
                  <View style={{
                    height: 50, width: 60,
                    borderRadius: 15, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginLeft: 160
                  }}>
                    <Image style={{
                      height: responsiveHeight(6),
                      width: responsiveWidth(60),
                      resizeMode: 'contain',
                      //marginLeft: -90,
                    }} source={require('../../assets/header-logo.png')} />
                  </View>
                  :
                  <View style={{ height: 50, width: 150, alignItems: 'center', justifyContent: 'center', marginLeft: 80, }}>
                    <Title style={{ color: '#0F223D' }}>{title}</Title>
                  </View>
              }


            </Body>
            <Right>
              {
                isMyCart ?
                  <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
                    <Icon name='arrow-back' color={'#0F223D'} size={27} />
                  </Button>
                  :

                  isHome || isLogin ?
                    <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                      <Icon name='menu' color={'#0F223D'} size={27} />
                    </Button>
                    :
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                      <Icon name='arrow-back' color={'#0F223D'} size={27} />
                    </Button>

              }

            </Right>

          </Header>
        ) : (
          <Header style={{ backgroundColor: '#fff' }}>
            <StatusBar backgroundColor="#ff4254" />
            <Left>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('MyCart')}>
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                    <Icon name="shopping-cart" size={22} color={'#0F223D'} />
                    <View style={{
                      position: 'absolute', height: 20, width: 20,
                      borderRadius: 15, backgroundColor: 'rgba(15, 30, 61,0.8)', left: 15, bottom: 15, alignItems: 'center', justifyContent: 'center', zIndex: 2000
                    }}>

                      <MyContext.Consumer>
                        {data => <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', marginLeft: -2 }}> {data}</Text>}
                      </MyContext.Consumer>

                    </View>
                </View>
                </TouchableOpacity>
                <View style={{}}>
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                      this.setState({ modalVisible: false });
                    }}
                  >
                    <TouchableWithoutFeedback onPress={() => this.setState({ modalVisible: false })}>
                      <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                          <View style={{
                            position: 'absolute', height: 30, width: 30,
                            borderRadius: 15, backgroundColor: 'rgba(255, 255, 255,0.8)', right: 15, top: 15, alignItems: 'center', justifyContent: 'center', zIndex: 2000
                          }}>
                            <TouchableOpacity onPress={() => {
                              this.setState({ modalVisible: false });
                            }}>
                              <Icon name='cancel' color={'black'} size={27} />
                            </TouchableOpacity>
                          </View>
                          <View style={{ padding: 30 }}>
                            <TouchableOpacity onPress={() => {
                              this.langchangeToEn();
                            }}>
                              <View style={{ flexDirection: 'row', height: responsiveHeight(8), width: responsiveWidth(40) }}>

                                <Text style={styles.modalText}>ENGLISH</Text>

                                <Image style={{
                                  height: responsiveHeight(3),
                                  width: responsiveWidth(30),
                                  resizeMode: 'contain',

                                }} source={require('../../assets/flags_usa.png')} />
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                              this.langchangeToAr();
                            }}>
                              <View style={{ flexDirection: 'row', height: responsiveHeight(8), width: responsiveWidth(40) }}>

                                <Text style={styles.modalText2}>العربية</Text>

                                <Image style={{
                                  height: responsiveHeight(3),
                                  width: responsiveWidth(30),
                                  resizeMode: 'contain',

                                }} source={require('../../assets/flags_kuwait.png')} />
                              </View>
                            </TouchableOpacity>
                          </View>

                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </Modal>

                  <TouchableHighlight
                    style={styles.openButton}
                    onPress={() => {
                      this.setState({ modalVisible: true });
                    }}
                  >
                    {
                      this.state.lang == 'en' ?
                        <Image style={{
                          height: responsiveHeight(3),
                          width: responsiveWidth(10),
                          resizeMode: 'contain',

                        }} source={require('../../assets/flags_usa.png')} />
                        :
                        <Image style={{
                          height: responsiveHeight(3),
                          width: responsiveWidth(10),
                          resizeMode: 'contain',

                        }} source={require('../../assets/flags_kuwait.png')} />
                    }
                  </TouchableHighlight>
                </View>
              </View>
            </Left>
            <Body>
              {
                isHome ?
                  <View style={{
                    height: 50, width: 60,
                    borderRadius: 15, backgroundColor: '#fff', alignItems: 'center', marginLeft: 160, justifyContent: 'center',
                  }}>
                    <Image style={{
                      height: responsiveHeight(6),
                      width: responsiveWidth(60),
                      resizeMode: 'contain',
                      //marginLeft: -90,
                    }} source={require('../../assets/header-logo.png')} />
                  </View>
                  :
                  <View style={{ height: 50, width: 120, alignItems: 'center', justifyContent: 'center', marginLeft: 120, }}>
                    <Title style={{ color: '#0F223D', }}>{title}</Title>
                  </View>
              }


            </Body>
            <Right>
              {
                isMyCart ?
                  <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
                    <Icon name='arrow-back' color={'#0F223D'} size={27} />
                  </Button>
                  :

                  isHome || isLogin ?
                    <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                      <Icon name='menu' color={'#0F223D'} size={27} />
                    </Button>
                    :
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                      <Icon name='arrow-back' color={'#0F223D'} size={27} />
                    </Button>

              }

            </Right>

          </Header>
        )}
      </View>
    );
  }
}


//export default connect(mapStateToProps)(CustomHeader);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#ff929d",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    // backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    //elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',


  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalText2: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 29
  }
});

export default CustomHeader;
