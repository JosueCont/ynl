import React from 'react';
import {SafeAreaView} from "react-native";
import {View} from "native-base";
import {Colors} from "../../utils/Colors";


const ScreenBaseV1 = ({children}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View flex={1} alignItems={'center'} justifyContent={'center'} bgColor={Colors.white}>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default ScreenBaseV1;