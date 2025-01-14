import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { HStack, Image, View } from 'native-base'
import { Dimensions } from "react-native";
import Lines from '../assets/lineas.png'
import { Colors } from '../utils/Colors';


const FooterLines = () => {
    const screenWidth = Dimensions.get("window").width;
    return (
        <View style={{ backgroundColor:Colors.black, position:'absolute', zIndex:-1, bottom:0, justifyContent:'center' }}>
            <Image alt='lines' resizeMode="contain" width={screenWidth} height={150} style={styles.linesImg}  source={Lines} />
            <HStack justifyContent={'center'} width={Dimensions.get('window').width}>
                <Text style={{ position:'absolute', bottom:20 }}>
                    Your Now Limitless
                </Text>
            </HStack>
        </View>
    )
}

export default FooterLines

const styles = StyleSheet.create({
    linesImg:{
        position: 'absolute',
        bottom:0,
        zIndex: -10
    }
})