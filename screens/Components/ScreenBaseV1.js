import React from 'react';
import { SafeAreaView} from "react-native";
import { View} from "native-base";


const ScreenBaseV1 = ({children, color = 'white'}) => {
    return (


        <SafeAreaView style={{flex: 1, backgroundColor: color}}>
                <View flex={1} alignItems={'center'} justifyContent={'center'} bgColor={color}>
                    {children}
                </View>

        </SafeAreaView>

    )
}

export default ScreenBaseV1;