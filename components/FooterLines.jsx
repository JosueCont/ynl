import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { Image, View } from 'native-base'
import { Dimensions } from "react-native";
import Lineas from '../assets/lineas.png'
import { Colors } from '../utils/Colors';


const FooterLines = ({bottom=60, ...props}) => {
    const screenWidth = Dimensions.get("window").width;
    return (
        <View style={{ position:'absolute', zIndex:-1, bottom:0 }}>
            <Image alt='lines' width={screenWidth} height={100} resizeMode='stretch' style={[styles.linesImg, {bottom: bottom } ]}  source={Lineas} />
        </View>
    )
}

export default FooterLines

const styles = StyleSheet.create({
    linesImg:{
        position: 'absolute',
        zIndex: -10
    }
})