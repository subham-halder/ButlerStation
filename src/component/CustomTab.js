import React from 'react';
import { Container, Header, Left, Body, Right, Button, Title, Text, List, ListItem } from 'native-base';
import {
    Platform,
    StyleSheet,
    Image,
    View, TouchableOpacity, Alert, Dimensions, AsyncStorage, StatusBar
} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
    useResponsiveHeight
} from "react-native-responsive-dimensions";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { IMAGE } from '../../src/constants/Image';
import MyContext from './MyContext';
const { width, height } = Dimensions.get("screen");


class CustomTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //count: '',
        };
    }

    async componentDidMount() {

    }


    render() {

        return (

            <View style={styles.containertab}>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Home")}>
                    <FontAwesomeIcon name="home" size={20} color="#A9A9A9" />
                    <Text style={{ color: '#A9A9A9', fontSize: 10, marginTop: 5 }}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Category")}>
                    <FontAwesomeIcon name="search" size={17} color="#A9A9A9" />
                    <Text style={{ color: '#A9A9A9', fontSize: 10, marginTop: 5 }}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Category")}>
                    <View style={{ backgroundColor: '#2F3237', justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 60 / 2, borderWidth: 3, borderColor: '#fff', }}>
                        {/* <FontAwesomeIcon name="file-search" size={17} color="#A9A9A9" /> */}
                        <Image source={require('../../assets/discover.png')} style={{ resizeMode: 'contain', height: 20, width: 20 }} largeHeap="true" />
                        <Text style={{ color: '#A9A9A9', fontSize: 10, marginTop: 5 }}>Discover</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Order")}>
                    <FontAwesomeIcon name="shopping-cart" size={20} color="#A9A9A9" />
                    <Text style={{ color: '#A9A9A9', fontSize: 10, marginTop: 5 }}>Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Account")}>
                    <FontAwesomeIcon name="user" size={20} color="#A9A9A9" />
                    <Text style={{ color: '#A9A9A9', fontSize: 10, marginTop: 5 }}>Account</Text>
                </TouchableOpacity>
            </View>


        );
    }
}

export default CustomTab;

const styles = StyleSheet.create({
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
});