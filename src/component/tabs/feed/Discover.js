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
  YellowBox
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Item, Input, Icon, Button, Text, List, ListItem, Body, Left, Right, Thumbnail, Tab, Tabs, Badge } from 'native-base';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
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

const horizontalMargin = 5;
const slideWidth = 300;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 0.5;
const itemHeight = 200;


//const entities = new Entities();
export class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: '',
      banarimage: '',
      banarimage1: '',
      banner_heading1: '',
      banner_text1: '',
      banner_link_text1: '',
      banarimage2: '',
      banner_heading2: '',
      banner_text2: '',
      banner_link_text2: '',
      category_slug_link1: '',
      category_slug_link2: '',
      banner_link_url1: '',
      banner_link_url2: '',
      banarimage3: '',
      props_name1: '',
      props_name2: '',
      banner_link_type1: '',
      banner_link_type2: '',
      category_slug_name_link1: '',
      category_slug_name_link2: '',
      dataSourceCategory: [],
      dataSourceFeaturedCategory: [],
      dataSourceFeaturedProduct: [],
      dataSourceReview: [],
      dataSourceNewArival: [],
      dataSourceNewDeals: [],
      dataSourceBlogs: [],
      dataSourceTopRatedProduct: [],
      dataSourceBestSellingProduct: [],
      offer: [],
      slider: [],
      isLoading: false,
      checkbanner: false,
      checkpopular: false,
      checknewarival: false,
      checknewdeals: false,
      checkreview: false,
      checkblog: false,
      // count: '',
      //refreshing: false,
      //setRefreshing: false,
    };
  }

  componentDidMount() {
    this.languageCheck();
    YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);
    setInterval(() => {
      this.languageCheck();
    }, 1000);
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


  componentWillUnmount() {

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
              <Text style={{ fontSize: responsiveFontSize(2.5), color: '#2B2B2B', fontWeight: 'bold' }}>Discover</Text>
            </View>
            <View style={styles.settingicon}>
              <View style={{ height: 40, width: 40, backgroundColor: '#FFF', borderRadius: 5, justifyContent: 'center', alignItems: 'center', shadowOpacity: 0.8, elevation: 4 }}>
                <FontAwesomeIcon name="ellipsis-h" size={20} color="#A9A9A9" onPress={() => this.props.navigation.openDrawer()} />
              </View>
            </View>
          </View>
          <View style={{ width: responsiveWidth(50), margin: 20 }}>
            <Text style={{ fontSize: responsiveFontSize(4) }}>Hi, What is </Text>
            <Text style={{ fontSize: responsiveFontSize(4), fontWeight: 'bold' }}>your Favourite Food? </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', justifyContent: 'center' }}>
            <View style={{ backgroundColor: '#F2F2F2', borderRadius: 5, width: responsiveWidth(75), marginRight: 5 }}>
              <Item>
                <Input placeholder="Search"
                  onChangeText={(text) => this.setState({ search: text })}
                  value={this.state.search}
                // onKeyPress={() => {
                //     if (this.state.search == "") {
                //         this.setState({
                //             search: ''
                //         })
                //     } else {
                //         this.handlesearch()
                //     }
                // }}
                />

                <FontAwesomeIcon name="search" size={20} style={{ margin: 5, marginRight: 5 }} color={'#414141'} />
              </Item>
            </View>
            <View style={{ backgroundColor: '#2F3237', width: responsiveWidth(10), height: responsiveHeight(6.5), alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
              <Image style={{
                height: responsiveHeight(5), width: responsiveWidth(5), resizeMode: 'contain',
              }} source={require('../../../../assets/filter-vector.png')} />
            </View>
          </View>
          <Text style={styles.portionHeaderText}>Our Services</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.div3_active}>
                <TouchableWithoutFeedback >
                  <View style={{ alignItems: 'center', marginBottom: 2, paddingRight: 2 }} >
                    <Image source={require('../../../../assets/dine2.png')} style={styles.div3image} />
                    <Text style={styles.cate_text}>Dine in</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.div3}>
                <TouchableWithoutFeedback >
                  <View style={{ alignItems: 'center', marginBottom: 2, paddingRight: 2 }} >
                    <Image source={require('../../../../assets/r2.png')} style={styles.div3image} />
                    <Text style={styles.cate_text}>Ready to Cook</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.div3}>
                <TouchableWithoutFeedback >
                  <View style={{ alignItems: 'center', marginBottom: 2, paddingRight: 2 }} >
                    <Image source={require('../../../../assets/b2.png')} style={styles.div3image} />
                    <Text style={styles.cate_text}>Open Buffet</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.div3}>
                <TouchableWithoutFeedback >
                  <View style={{ alignItems: 'center', marginBottom: 2, paddingRight: 2 }} >
                    <Image source={require('../../../../assets/body1.png')} style={styles.div3image} />
                    <Text style={styles.cate_text}>Healthy Corner</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </ScrollView>
          <Tabs tabContainerStyle={{ height: 50, borderRadius: 10, elevation: 0 }} tabBarUnderlineStyle={{ backgroundColor: '#32353A', }} style={{ paddingTop: 5, marginRight: 10, marginLeft: 10, marginTop: 20 }}>
            <Tab heading="Popular" activeTextStyle={{ color: '#414141', fontSize: responsiveFontSize(2.7) }} textStyle={{ color: 'gray', fontSize: responsiveFontSize(2.7) }} tabStyle={{ backgroundColor: '#fff' }} activeTabStyle={{ backgroundColor: '#fff', borderColor: '#32353A', borderWidth: 1, borderTopLeftRadius: 10, }} >
              <View style={{ marginTop: 20, backgroundColor: '#fff' }}>
                <ScrollView nestedScrollEnabled={true}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 10 }}>
                    <TouchableWithoutFeedback>
                      <View style={styles.GalleryBox}>
                        <View
                          style={{
                            position: 'absolute',
                            height: 20,
                            width: 80,
                            borderRadius: 15,
                            right: -15,
                            top: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2000,
                          }}>

                          <Image source={require('../../../../assets/Vectorfill.png')} style={{ height: 20, width: 20, resizeMode: 'contain' }} largeHeap="true" />

                        </View>
                        <View
                          style={{
                            position: 'absolute',
                            height: 17,
                            width: 80,
                            borderRadius: 5,
                            right: -10,
                            top: 80,
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2000,
                          }}>

                          <Badge style={{ backgroundColor: '#fff' }}>
                            <Text style={{ color: '#444444' }}>35 mins</Text>
                          </Badge>

                        </View>
                        <View style={{}}>
                          <View style={styles.GalleryImg}>
                            <Image source={require('../../../../assets/food1.png')} style={styles.SingelImg} largeHeap="true" />
                          </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.GalleryText}>
                              <Text style={styles.userNmae}>Olive Mediterracan</Text>
                            </View>
                            <View style={{ backgroundColor: '#2F3237', padding: 5, height: responsiveHeight(2.8), width: responsiveWidth(10), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5, borderRadius: 5 }}>
                              <Text style={{ color: '#FFFFFF' }}>4.5</Text>
                              <Image source={require('../../../../assets/star.png')} style={{ height: 10, width: 10, resizeMode: 'contain' }} largeHeap="true" />
                            </View>
                          </View>
                          <View style={styles.GallerydescText}>
                            <Text style={styles.userdesNmae}>1st Block 1st Cross,Sycamore</Text>
                          </View>
                          <View style={styles.amount}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                              <Text style={styles.amountuserNmae}>
                                Min order :KD 20.00
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                      <View style={styles.GalleryBox}>
                        <View
                          style={{
                            position: 'absolute',
                            height: 20,
                            width: 80,
                            borderRadius: 15,
                            right: -15,
                            top: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2000,
                          }}>

                          <Image source={require('../../../../assets/Vectorfill.png')} style={{ height: 20, width: 20, resizeMode: 'contain' }} largeHeap="true" />

                        </View>
                        <View
                          style={{
                            position: 'absolute',
                            height: 17,
                            width: 80,
                            borderRadius: 5,
                            right: -10,
                            top: 80,
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2000,
                          }}>

                          <Badge style={{ backgroundColor: '#fff' }}>
                            <Text style={{ color: '#444444' }}>35 mins</Text>
                          </Badge>

                        </View>
                        <View style={{}}>
                          <View style={styles.GalleryImg}>
                            <Image source={require('../../../../assets/food1.png')} style={styles.SingelImg} largeHeap="true" />
                          </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.GalleryText}>
                              <Text style={styles.userNmae}>Olive Mediterracan</Text>
                            </View>
                            <View style={{ backgroundColor: '#2F3237', padding: 5, height: responsiveHeight(2.8), width: responsiveWidth(10), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5, borderRadius: 5 }}>
                              <Text style={{ color: '#FFFFFF' }}>4.5</Text>
                              <Image source={require('../../../../assets/star.png')} style={{ height: 10, width: 10, resizeMode: 'contain' }} largeHeap="true" />
                            </View>
                          </View>
                          <View style={styles.GallerydescText}>
                            <Text style={styles.userdesNmae}>1st Block 1st Cross,Sycamore</Text>
                          </View>
                          <View style={styles.amount}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                              <Text style={styles.amountuserNmae}>
                                Min order :KD 20.00
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TouchableWithoutFeedback>
                      <View style={styles.GalleryBox}>
                        <View
                          style={{
                            position: 'absolute',
                            height: 20,
                            width: 80,
                            borderRadius: 15,
                            right: -15,
                            top: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2000,
                          }}>

                          <Image source={require('../../../../assets/Vectorfill.png')} style={{ height: 20, width: 20, resizeMode: 'contain' }} largeHeap="true" />

                        </View>
                        <View
                          style={{
                            position: 'absolute',
                            height: 17,
                            width: 80,
                            borderRadius: 5,
                            right: -10,
                            top: 80,
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2000,
                          }}>

                          <Badge style={{ backgroundColor: '#fff' }}>
                            <Text style={{ color: '#444444' }}>35 mins</Text>
                          </Badge>

                        </View>
                        <View style={{}}>
                          <View style={styles.GalleryImg}>
                            <Image source={require('../../../../assets/food1.png')} style={styles.SingelImg} largeHeap="true" />
                          </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.GalleryText}>
                              <Text style={styles.userNmae}>Olive Mediterracan</Text>
                            </View>
                            <View style={{ backgroundColor: '#2F3237', padding: 5, height: responsiveHeight(2.8), width: responsiveWidth(10), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5, borderRadius: 5 }}>
                              <Text style={{ color: '#FFFFFF' }}>4.5</Text>
                              <Image source={require('../../../../assets/star.png')} style={{ height: 10, width: 10, resizeMode: 'contain' }} largeHeap="true" />
                            </View>
                          </View>
                          <View style={styles.GallerydescText}>
                            <Text style={styles.userdesNmae}>1st Block 1st Cross,Sycamore</Text>
                          </View>
                          <View style={styles.amount}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                              <Text style={styles.amountuserNmae}>
                                Min order :KD 20.00
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                      <View style={styles.GalleryBox}>
                        <View
                          style={{
                            position: 'absolute',
                            height: 20,
                            width: 80,
                            borderRadius: 15,
                            right: -15,
                            top: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2000,
                          }}>

                          <Image source={require('../../../../assets/Vectorfill.png')} style={{ height: 20, width: 20, resizeMode: 'contain' }} largeHeap="true" />

                        </View>
                        <View
                          style={{
                            position: 'absolute',
                            height: 17,
                            width: 80,
                            borderRadius: 5,
                            right: -10,
                            top: 80,
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2000,
                          }}>

                          <Badge style={{ backgroundColor: '#fff' }}>
                            <Text style={{ color: '#444444' }}>35 mins</Text>
                          </Badge>

                        </View>
                        <View style={{}}>
                          <View style={styles.GalleryImg}>
                            <Image source={require('../../../../assets/food1.png')} style={styles.SingelImg} largeHeap="true" />
                          </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.GalleryText}>
                              <Text style={styles.userNmae}>Olive Mediterracan</Text>
                            </View>
                            <View style={{ backgroundColor: '#2F3237', padding: 5, height: responsiveHeight(2.8), width: responsiveWidth(10), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5, borderRadius: 5 }}>
                              <Text style={{ color: '#FFFFFF' }}>4.5</Text>
                              <Image source={require('../../../../assets/star.png')} style={{ height: 10, width: 10, resizeMode: 'contain' }} largeHeap="true" />
                            </View>
                          </View>
                          <View style={styles.GallerydescText}>
                            <Text style={styles.userdesNmae}>1st Block 1st Cross,Sycamore</Text>
                          </View>
                          <View style={styles.amount}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                              <Text style={styles.amountuserNmae}>
                                Min order :KD 20.00
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </ScrollView>

              </View>
            </Tab>
            <Tab heading="Favourite" activeTextStyle={{ color: '#414141', fontSize: responsiveFontSize(2.7) }} textStyle={{ color: 'gray', fontSize: responsiveFontSize(2.7) }} tabStyle={{ backgroundColor: '#fff' }} activeTabStyle={{ backgroundColor: '#fff', borderColor: '#32353A', borderWidth: 1, }} >
              <View style={{ marginTop: 10, padding: 20, backgroundColor: '#fff' }}>
                <ScrollView nestedScrollEnabled={true}>
                  <Text>First Tabs</Text>
                </ScrollView>

              </View>
            </Tab>
            <Tab heading="All" activeTextStyle={{ color: '#414141', fontSize: responsiveFontSize(2.7) }} textStyle={{ color: 'gray', fontSize: responsiveFontSize(2.7) }} tabStyle={{ backgroundColor: '#fff' }} activeTabStyle={{ backgroundColor: '#fff', borderColor: '#32353A', borderWidth: 1, borderTopRightRadius: 10 }} >
              <View style={{ marginTop: 10, padding: 20, backgroundColor: '#fff' }}>
                <ScrollView nestedScrollEnabled={true}>
                  <Text>First Tabs</Text>
                </ScrollView>

              </View>
            </Tab>
          </Tabs>
        </ScrollView>

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
    //margin: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 3,
    height: responsiveHeight(27),
    width: responsiveWidth(44.5),

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
    marginLeft: 15,
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
  }

});
