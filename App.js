import React from 'react';
import { View, Image, Dimensions, SafeAreaView, ScrollView, AsyncStorage,StyleSheet,StatusBar } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, List, ListItem } from 'native-base';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { IMAGE } from './src/constants/Image';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SplashScreen from 'react-native-splash-screen';
import AppIntroSlider from 'react-native-app-intro-slider';
import b from './src/component/BaseUrl';
import MyContext from './src/component/MyContext';

//import {Provider} from 'react-redux';
//import store from './store';

import {
  SideMenu, Home,SearchLocation, Discover, Search,
  ResturantListReadyCook,ReadyToCookDetails,ConferenceRoom,ResturantListOpenBuffet,OpenBuffetCoupon,CouponDetails,Notification, ResturantList,DineinResturentDetails,DineinFoodDetails, WishlistScreen, Order, SingleOrder, Account,EditAccount, Address,Card,OrderMeal,MyFavResturant,OrderMealDetails,ChangePassword,MyBooking, Login, Register, PassChangeOne, PassChangeTwo
} from './src/component'
import MyCartScreen from './src/component/tabs/feed/MyCartScreen';
import ProductDetailsScreen from './src/component/tabs/feed/ProductDetailsScreen';
var languagerrrrrrrrrr;
var homeBarLabel;
var categoryBarLabel;
var orderBarLabel;
var accountBarLabel; 

AsyncStorage.getItem('language', (err, languageres) => {
 
  console.log(languageres, 'language from apppppppppppppppppppppppppppppppppppppppp');
  if (languageres == '' || languageres == null || languageres == 'ar') {
    console.log('console from if checking ');
    languagerrrrrrrrrr = 'ar';
    homeBarLabel = 'الصفحة الرئيسية';
    categoryBarLabel = 'الفئة';
    orderBarLabel = 'طلب';
    accountBarLabel = 'الحساب';        
  } else {
    console.log('console from else checking ');
     languagerrrrrrrrrr = 'en';  
      homeBarLabel = 'Home';
      categoryBarLabel = 'Category';
      orderBarLabel = 'Order';
      accountBarLabel = 'Account';
  }  

});  
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      language: '',
     
    };
  }
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();

    setInterval(() => {
      this.abc();
      this.languageCheck();
    }, 1000);
  }
  
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }
  abc() {


    AsyncStorage.getItem('cartsession', (err, cartres) => {

      let newProduct = JSON.parse(cartres);
      //console.log(newProduct.length);
      if (newProduct !== null) {
        this.setState({
          count: newProduct.length,

        })
      } else {
        this.setState({
          count: 0,

        })
      }


    });


  }

  languageCheck() {
    AsyncStorage.getItem('language', (err, languageres) => {
      //console.log(languageres + "language from home screen");

      if (languageres == '' || languageres == null) {
        // let homeBarLabel = 'الصفحة الرئيسية';
        // let categoryBarLabel = 'الفئة';
        // let orderBarLabel = 'طلب';
        // let accountBarLabel = 'الحساب';

        this.setState({
          language: 'ar',
        });
      } else {
        // let homeBarLabel = 'Home';
        // let categoryBarLabel = 'Category';
        // let orderBarLabel = 'Order';
        // let accountBarLabel = 'Account';
        this.setState({
          language: languageres,
         
        });
      }
    });
  }

  render() {
   
      return (


        // <Provider store={store}>
        <MyContext.Provider value={this.state.count}>
          {/* <StatusBar backgroundColor="#000" /> */}
          <AppNavigator />
        </MyContext.Provider>
        // </Provider>
      );
   
  }
}

const navOptionHandler = (navigation) => ({
  header: null
})

const FeedStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: navOptionHandler
  },
  // FeedDetails: {
  //   screen: FeedDetails,
  //   navigationOptions: navOptionHandler
  // },
  // ProductDetails: {
  //   screen: ProductDetailsScreen,
  //   navigationOptions: navOptionHandler
  // },
  // Products: {
  //   screen: ProductsScreen,
  //   navigationOptions: navOptionHandler
  // },
  // ProductsBrand: {
  //   screen: ProductsBrandScreen,
  //   navigationOptions: navOptionHandler
  // },
  // Address: {
  //   screen: Address,
  //   navigationOptions: navOptionHandler
  // },

})



const CartStack = createStackNavigator({
  MyCart: {
    screen: MyCartScreen,
    navigationOptions: navOptionHandler
  }
})

const MainTabs = createBottomTabNavigator({
  Feed: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor}) => (
        <Image
          source={IMAGE.ICON_MENU}
          resizeMode='contain'
          style={{width:20,height:20,tintColor: tintColor}}
        />
      )
    },
    
  },
   Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({ tintColor}) => (
        <Image
          source={IMAGE.ICON_SEARCH}
          resizeMode='contain'
          style={{width:20,height:20,tintColor: tintColor}}
        />
        
      )
    },
    
  },
  Discover: {
    screen: Discover,
    navigationOptions: {
      tabBarLabel: 'Discover',
      tabBarIcon: ({ tintColor}) => (
        <Image
          source={IMAGE.ICON_DISCOVER}
          resizeMode='contain'
          style={{width:20,height:20,tintColor: tintColor}}
        />
        
      )
    },
    
  },
  MyCart: {
    screen: MyCartScreen,
    navigationOptions: {
      tabBarLabel: 'Cart',
      tabBarIcon: ({ tintColor}) => (
        <Image
          source={IMAGE.ICON_CART_MENU}
          resizeMode='contain'
          style={{width:20,height:20,tintColor: tintColor}}
        />
        
      )
    },
    
  },
  Account: {
    screen: Account,
    navigationOptions: {
      tabBarLabel: 'Account',
      tabBarIcon: ({ tintColor}) => (
        <Image
          source={IMAGE.ICON_ACCOUNT_MENU}
          resizeMode='contain'
          style={{width:20,height:20,tintColor: tintColor}}
        />
        
      )
    },
    
  },
  
},{
  tabBarOptions: {
    activeTintColor: '#666666',
    inactiveTintColor:'#A9A9A9',
    labelStyle: {
      fontSize: 12,
      paddingVertical: 5,
      margin: -10
    },
    style: {
      backgroundColor: '#EBEBEB',
      height: 60
    },
  }
});


const MainStack = createStackNavigator({
  Home: {
    screen: MainTabs,
    navigationOptions: navOptionHandler
  },
  SearchLocation:{
    screen: SearchLocation,
    navigationOptions: navOptionHandler
  },
  Wishlist: {
    screen: WishlistScreen,
    navigationOptions: navOptionHandler
  },
  Order: {
    screen: Order,
    navigationOptions: navOptionHandler
  },
  SingleOrder: {
    screen: SingleOrder,
    navigationOptions: navOptionHandler
  },
  Account: {
    screen: Account,
    navigationOptions: navOptionHandler
  },
  EditAccount: {
    screen: EditAccount,
    navigationOptions: navOptionHandler
  },
  Search: {
    screen: Search,
    navigationOptions: navOptionHandler
  },
  Address: {
    screen: Address,
    navigationOptions: navOptionHandler
  },
  Card: {
    screen: Card,
    navigationOptions: navOptionHandler
  },
  OrderMeal: {
    screen: OrderMeal,
    navigationOptions: navOptionHandler
  },
  OrderMealDetails: {
    screen: OrderMealDetails,
    navigationOptions: navOptionHandler
  },
  MyFavResturant: {
    screen: MyFavResturant,
    navigationOptions: navOptionHandler
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: navOptionHandler
  },
  MyBooking: {
    screen: MyBooking,
    navigationOptions: navOptionHandler
  },
  MyCart: {
    screen: MyCartScreen,
    navigationOptions: navOptionHandler
  },
  Login: {
    screen: Login,
    navigationOptions: navOptionHandler
  },
  Register: {
    screen: Register,
    navigationOptions: navOptionHandler
  },
  PassChangeOne: {
    screen: PassChangeOne,
    navigationOptions: navOptionHandler
  },
  PassChangeTwo: {
    screen: PassChangeTwo,
    navigationOptions: navOptionHandler
  }, Discover: {
     screen: Discover,
     navigationOptions: navOptionHandler
   },
   ProductDetails: {
     screen: ProductDetailsScreen,
     navigationOptions: navOptionHandler
   },
   ResturantListReadyCook: {
     screen: ResturantListReadyCook,
     navigationOptions: navOptionHandler
   },
   ReadyToCookDetails:{
    screen: ReadyToCookDetails,
    navigationOptions: navOptionHandler
   },
   ConferenceRoom:{
    screen: ConferenceRoom,
    navigationOptions: navOptionHandler
   },
   ResturantListOpenBuffet: {
    screen: ResturantListOpenBuffet,
    navigationOptions: navOptionHandler
  },
  OpenBuffetCoupon:{
    screen: OpenBuffetCoupon,
    navigationOptions: navOptionHandler
  },
  CouponDetails:{
    screen: CouponDetails,
    navigationOptions: navOptionHandler
  },
   ResturantList: {
     screen: ResturantList,
     navigationOptions: navOptionHandler
   },
   DineinResturentDetails: {
    screen: DineinResturentDetails,
    navigationOptions: navOptionHandler
  },
   DineinFoodDetails: {
    screen: DineinFoodDetails,
    navigationOptions: navOptionHandler
  },
  Notification: {
    screen: Notification,
    navigationOptions: navOptionHandler
  },
  
}, { initialRouteName: 'Home' })



  const appDrawer = createDrawerNavigator(
    {
      drawer: MainStack
    },
    {
      contentComponent: SideMenu,
      drawerWidth: Dimensions.get('window').width * 3 / 4,
      drawerBackgroundColor: 'rgba(0,0,0, 0.5)',
      drawerPosition: 'right'
    }
  )



const authStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: navOptionHandler
  },
  Register: {
    screen: Register,
    navigationOptions: navOptionHandler
  },
  PassChangeOne: {
    screen: PassChangeOne,
    navigationOptions: navOptionHandler
  },
  PassChangeTwo: {
    screen: PassChangeTwo,
    navigationOptions: navOptionHandler
  },
  
})

const MainApp = createSwitchNavigator(
  {
    app: appDrawer,
    auth: authStack
  },
  {
    initialRouteName: 'app'
  }
)

const AppNavigator = createAppContainer(MainApp);

const styles = StyleSheet.create({
  
});