import { HStack, Image, VStack, Text } from 'native-base';
import React, { Component, useEffect, useState } from 'react'
import {Alert, Modal, TouchableOpacity} from "react-native";
import { StyleSheet,  View } from 'react-native'
import newLogo from '../../assets/new_logo.png'
import textOne from '../../assets/preguntas-08.png'
import textTwo from '../../assets/preguntas-09.png'
import shareIcon from '../../assets/Icon-feather-share.png'
import iconClose from '../../assets/icon_close.png'


const ModalDayPhrase = ({phrase = "", visible, setVisible, ...props}) => {

    const closeModal = () => {
        setVisible(false)
    }
    

  return (
    <Modal
        animationType={"slide"}
        /* transparent={true} */
        visible={visible}
        /* onRequestClose={() => {
            setVisible(!visible);
        }} */
      >
        <View>
            <HStack h={'100%'} justifyContent={"center"} >
                <VStack alignItems={'center'} w={'100%'} h={'100%'} justifyContent={'center'}  paddingBottom={100} >
                    <TouchableOpacity 
                        onPress={() => closeModal()}
                        style={{ 
                            position:'absolute',
                            top:20,
                            right:20
                    }}>
                        <Image
                            source={iconClose}
                            alt='question1'
                        />
                    </TouchableOpacity>

                    <HStack justifyContent={"center"}>
                        <Image w={50} h={50} source={newLogo} alt="img"
                            style={[
                                {resizeMode: 'cover'}]}
                        />
                    </HStack>
                    <Image
                        h={100}
                        source={textOne}
                        alt='question1'
                    />
                    <HStack width={'70%'} justifyContent={'center'}>
                        <Text fontSize={18} textAlign={'center'} lineHeight={22} > 
                            {phrase}
                        </Text>
                    </HStack>
                    <Image
                        h={100}
                        source={textTwo}
                        alt='question1'
                    />
                    <TouchableOpacity style={{ 
                        position:'absolute',
                        bottom: 100
                     }}>
                        <Image
                            source={shareIcon}
                            alt='question1'
                        />
                    </TouchableOpacity>
                </VStack>
            </HStack>
        </View>
      </Modal>
  )
}

export default ModalDayPhrase

const styles = StyleSheet.create({})