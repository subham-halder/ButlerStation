import React, { Component } from 'react';
import {
    StyleSheet,
    StatusBar,
    Icon,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    AsyncStorage,
    Alert,
    Button,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';

class BaseUrl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: '',
            isLoading: false,
        };
    }

    abc() {
        return 'https://albaghlisponge.com';
    }

    render() {
        const vv = 9;
        return ( <View style = {{ flex: 1 } } >
            <Text > { vv } </Text>{' '} </View>
        );
    }
}

const b = new BaseUrl();
export default b;