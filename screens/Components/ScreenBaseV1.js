import React from 'react';
import {KeyboardAvoidingView, SafeAreaView} from "react-native";
import { View} from "native-base";


const ScreenBaseV1 = ({children, color = 'white'}) => {
    return (
        <KeyboardAvoidingView style={{flex:1}}>

        <SafeAreaView style={{flex: 1, backgroundColor: color}}>
                <View flex={1} alignItems={'center'} justifyContent={'center'} bgColor={color}>
                    {children}
                </View>

        </SafeAreaView>
        </KeyboardAvoidingView>

    )
}

export default ScreenBaseV1;