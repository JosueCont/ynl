import React from "react";
import {Image, View, Text, Stack} from "native-base";
import empty from "../../assets/empty.png";


const NoDataIcon=({text='Sin Datos'})=>{
    return <View flex={1} alignItems={'center'} alignContent={'center'}>
        <Stack alignItems={'center'}>
            <Image source={empty} tintColor={'#CCCCCC'} alt="img" />
            <Text color={'#CCCCCC'} style={{textAlign:'center'}} size={'sm'} >{text}</Text>
        </Stack>
    </View>
}

export default NoDataIcon;