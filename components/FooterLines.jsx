import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { Image, View } from 'native-base'
import { Dimensions } from "react-native";
import Lines from '../assets/lines.png'


const FooterLines = () => {
    const screenWidth = Dimensions.get("window").width;
    return (
        <View style={{ position:'absolute', zIndex:-1, bottom:0 }}>
            <Image alt='lines' width={screenWidth} style={styles.linesImg}  source={Lines} />
        </View>
    )
}

export default FooterLines

const styles = StyleSheet.create({
    linesImg:{
        position: 'absolute',
        bottom:60,
        zIndex: -10
    }
})