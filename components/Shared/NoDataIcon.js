import React from "react";
import {Image, View, Text, Stack} from "native-base";
import empty from "../../assets/empty.png";


const NoDataIcon=()=>{
    return <View flex={1} alignItems={'center'} alignContent={'center'}>
        <Stack alignItems={'center'}>
            <Image source={empty} tintColor={'#CCCCCC'} alt="img" />
            <Text color={'#CCCCCC'} style={{fontSize:20}}>Sin Datos</Text>
        </Stack>
    </View>
}

export default NoDataIcon;