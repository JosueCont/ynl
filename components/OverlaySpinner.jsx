import { StyleSheet, View } from 'react-native'
import React from 'react'
import { fontSize, zIndex } from 'styled-system'
import { Spinner, Text } from 'native-base'
import { Colors } from '../utils/Colors'

const OverlaySpinner = () => {
  return (
    <View style={styles.overlay} >
        <Text style={styles.text}>Cargando...</Text>
        <Spinner size={'lg'} />
    </View>
  )
}

export default OverlaySpinner

const styles = StyleSheet.create({
    text: {
        color:Colors.white,
        fontSize:20
    },
    overlay: {
        zIndex:10,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,.5)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})