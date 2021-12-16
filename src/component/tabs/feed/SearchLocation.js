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
    YellowBox,
    TextInput,
    PermissionsAndroid
} from 'react-native';
//import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Item, Input, Icon, Button, Text, List, ListItem, Body, Left, Right, Thumbnail, Tab, Tabs, Badge } from 'native-base';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AnimatedLoader from 'react-native-animated-loader';
import RNExitApp from 'react-native-exit-app';
import CustomTab from '../../CustomTab';
import CustomHeader from '../../CustomeHeader';
import b from '../../BaseUrl';
import { IMAGE } from '../../../constants/Image';
import { NavigationEvents } from 'react-navigation';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Callout, Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { fetchGetMethod, fetchLocationData } from '../../../Services/ApiFunction';
const { width, height } = Dimensions.get('window');


const Entities = require('html-entities').XmlEntities;
const Context = React.createContext('default value');
let myMap;
let placesRef;
navigator.geolocation = require('@react-native-community/geolocation');


//const entities = new Entities();
export class SearchLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: '',
            city: '',
            lat: '',
            lng: '',
            data: '',
            address: '',
            pin: {
                latitude: 23.4241,
                longitude: 53.8478,
                latitudeDelta: 18,
                longitudeDelta: 18,
            },
            region: {
                latitude: 23.4241,
                longitude: 53.8478,
                latitudeDelta: 18,
                longitudeDelta: 18,
            }
        };
    }

    componentDidMount() {
        this.onGps();
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

    onGps = () => {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
        })
            .then((data) => {
                this.getFineLocation();
                //console.log("data", data)
                this.getCurrentLocation();
            })
            .catch((error) => {
                this.getFineLocation();
                console.log("Gps error", error)
            });
    }

    submit = () => {
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', data);
        // if (state == '' && city == '') {
        //     setTimeout(() => {
        //         props.route.params.returnData(data);
        //         props.navigation.goBack();
        //     }, 500)
        // } else {
        //     var add = state + ', ' + city;
        //     setTimeout(() => {
        //         props.route.params.returnData(add);
        //         props.navigation.goBack();
        //     }, 500)
        // }

    }

    getCurrentLocation = () => {
        //setLoder(true);
        Geolocation.getCurrentPosition(
            info => {

                //console.log('Cordinates', info)
                const { coords } = info;
                this.setState({ lat: coords.latitude })
                this.setState({ lng: coords.longitude })
                this.setState({
                    pin: {
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        latitudeDelta: 18,
                        longitudeDelta: 18,
                    }
                })
                //setLoder(false)
                fetchLocationData(`latlng=${coords.latitude},${coords.longitude}&key=`, '')
                    .then(response => {
                        //console.log("Property Response", response);
                        console.log("Property Response my location", response.data.results[0].formatted_address);
                        if (response.status == 200) {
                            // props.navigation.navigate('SelectLocation', { data: response.data.results[0] });
                            //props.route.params.returnData(response.data.results[0]);
                            this.setState({ address: response.data.results[0].formatted_address })
                            placesRef && placesRef.setAddressText(response.data.results[0].formatted_address)
                            //props.navigation.goBack();
                        }
                    })
                    .catch(response => {
                        console.log("Property loading faild", response);
                    })
            },
            error => { console.log('Cordinates error', error) },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        )
    }

    getFineLocation = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            console.log("Permission", granted)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            } else {
                console.log("Location access denied");
            }
        } catch (error) {
            console.log(error);
        }
    };

    getData = (data, details) => {
        //console.log("data", data, "details", details);

        //setCity(data.terms[data.terms.length - 3].value);
        //setSatate(data.terms[data.terms.length - 2].value);
        this.setState({ data: data });
    }


    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    keyboardShouldPersistTaps='always'
                    listViewDisplayed={false}
                    data={[{}]}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => (
                        <View>
                            <View style={{ marginVertical: 30, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => {

                                    //getCurrentLocation();
                                }}>
                                    <Image source={require('../../../../assets/locicon.png')} style={{ height: 70, width: 70 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                {/* <Image source={require('../../Assets/locicon2.png')} style={{ height: 22, width: 22, marginRight: 10 }} /> */}
                                <Text style={{ fontSize: 26, }}>Select Your Location</Text>
                            </View>
                            <View style={{ marginHorizontal: 20 }}>
                                <View style={{ marginTop: 30, marginBottom: 10 }}>
                                    <GooglePlacesAutocomplete
                                        ref={ref => { placesRef = ref }}
                                        placeholder='Search'
                                        enableHighAccuracyLocation={true}
                                        fetchDetails={true}
                                        // GooglePlacesSearchQuery={{
                                        //     rankby: "distance",
                                        // }}
                                        onPress={(data, details = null) => {
                                            this.getData(data, details)
                                            //console.log(data, details);
                                            this.setState({
                                                pin: {
                                                    latitude: details.geometry.location.lat,
                                                    longitude: details.geometry.location.lng,
                                                    latitudeDelta: 18,
                                                    longitudeDelta: 18,
                                                }
                                            })

                                        }}
                                        // textInputProps={{
                                        //     value: address,
                                        //     onChangeText: (text) => {              
                                        //         if (text === "") setAddress('');  
                                        //    }
                                        //   }}
                                        getDefaultValue={() => this.state.address}
                                        enablePoweredByContainer={false}
                                        styles={{
                                            textInput: {
                                                justifyContent: 'flex-start',
                                                borderRadius: 10,
                                                paddingHorizontal: 18,
                                                fontSize: 18,
                                                height: 55,
                                                elevation: 5,
                                                backgroundColor: '#fff',
                                                fontWeight: 'normal',
                                                color: '#000',
                                            },
                                            listView: {
                                                color: 'black', //To see where exactly the list is
                                                zIndex: 1000, //To popover the component outwards
                                                position: 'absolute',
                                                top: 58,
                                            },
                                        }}
                                        query={{
                                            key: 'AIzaSyDomb3zIdWGfNn5koi80qjNZCLUNLEbDQ4',
                                            language: 'en',
                                            location: `${this.state.region.latitude}, ${this.state.region.longitude}`
                                        }}
                                    />
                                    {/* <FontAwesome5 name='times-circle' color='#333' size={25} style={{ elevation: 6, right: 10, position: 'absolute', top: 15 }}/>  */}
                                </View>
                                {/* <View style={{ marginTop: 10, zIndex: 0 }}>
                                <TouchableOpacity onPress={() => onGps()} style={{ borderRadius: 10, paddingHorizontal: 18, height: 55, elevation: 5, backgroundColor: '#fff', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, color: '#a7a7a7' }}>Search Nearby</Text>
                                    <FontAwesome5 name='crosshairs' color='#333' size={25} />
                                </TouchableOpacity>
                            </View> */}

                                <MapView
                                    ref={ref => myMap = ref}
                                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                    style={{ height: 300 }}
                                    initialRegion={this.state.pin}
                                    region={this.state.pin}
                                >

                                    <Marker
                                        coordinate={this.state.pin}
                                        pinColor="black"
                                        draggable={true}
                                        onDragStart={(e) => {
                                            console.log("Drag Start", e.nativeEvent.coordinate)
                                        }}
                                        onDragEnd={(e) => {
                                            this.setState({
                                                pin: {
                                                    latitude: e.nativeEvent.coordinate.latitude,
                                                    longitude: e.nativeEvent.coordinate.longitude,
                                                    latitudeDelta: 18,
                                                    longitudeDelta: 18,
                                                }
                                            })

                                        }}
                                    >
                                        <Callout>
                                            <Text>your delivery address</Text>
                                        </Callout>
                                    </Marker>
                                    <Circle
                                        center={this.state.pin}
                                        radius={50000}
                                    />
                                </MapView>
                                <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, fontFamily: 'Poppins-Bold', fontWeight: 'normal' }}>Or</Text>
                                </View>
                                <View style={{ marginVertical: 10, zIndex: 0 }}>
                                    <TextInput
                                        placeholder="State"
                                        value={this.state.state}
                                        onChangeText={(e) => this.setState({ state: e })}
                                        style={{ borderRadius: 10, paddingHorizontal: 18, fontSize: 18, height: 55, elevation: 5, backgroundColor: '#fff', fontFamily: 'Poppins-Regular', fontWeight: 'normal', color: '#000' }} />
                                    <FontAwesome5 name='times-circle' color='#333' size={20} style={{ elevation: 6, right: 10, position: 'absolute', top: 15 }} onPress={() => setSatate('')} />
                                </View>
                                <View style={{ marginVertical: 10, zIndex: 0 }}>
                                    <TextInput
                                        placeholder="City"
                                        value={this.state.city}
                                        onChangeText={(e) => this.setState({ city: e })}
                                        style={{ borderRadius: 10, paddingHorizontal: 18, fontSize: 18, height: 55, elevation: 5, backgroundColor: '#fff', fontFamily: 'Poppins-Regular', fontWeight: 'normal', color: '#000' }} />
                                    <FontAwesome5 name='times-circle' color='#333' size={20} style={{ elevation: 6, right: 10, position: 'absolute', top: 15 }} onPress={() => setCity('')} />
                                </View>
                                <TouchableOpacity onPress={() => this.submit()} style={{ marginTop: 10, zIndex: 0, backgroundColor: '#f49081', borderRadius: 15, height: 55, justifyContent: 'center', elevation: 5 }}>
                                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontFamily: 'NotoSerif-Regular' }}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});
