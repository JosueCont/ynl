import { HStack, Image, VStack, Text,  } from 'native-base';
import {BackHandler, Platform, Share} from 'react-native';

import React, { Component, useEffect, useState } from 'react'
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

import {Alert, Modal, TouchableOpacity} from "react-native";
import { StyleSheet,  View } from 'react-native'
import newLogo from '../../assets/new_logo.png'
import textOne from '../../assets/una_simple_pregunta.png'
import textTwo from '../../assets/preguntas-09.png'
import shareIcon from '../../assets/Icon-feather-share.png'
import iconClose from '../../assets/icon_close.png'






const ModalDayPhrase = ({phrase = "", visible,onSetVisible, closeModalPhrase, ...props}) => {


    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", onSetVisible(false));
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", onSetVisible(false));
        }
    }, [])

    const share = async () => {
        try {
            const result = await Share.share({
                message:
                phraseConvert(phrase)
              });
              
        } catch (error) {
            console.log(error)
        }
    }

    const phraseConvert = (phrase) => {
        if(/[?!.]$/.test(phrase)) return ( /[?.]$/.test(phrase) ? '¿' : '¡') + phrase.charAt(1).toUpperCase() + phrase.slice(2).toLowerCase()
        else return phrase.charAt(0).toUpperCase() + phrase.slice(1).toLowerCase()
      };

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
                        onPress={() => closeModalPhrase()}
                        style={{ 
                            position:'absolute',
                            top: Platform.OS === 'ios' ? 60 : 20,
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
                        w={'80%'}
                        height={20}
                        resizeMode='contain'
                        source={textOne}
                        alt='question1'
                    />
                    <HStack width={'70%'} justifyContent={'center'} paddingY={10} >
                        <Text fontSize={18} textAlign={'center'} lineHeight={22} > 
                            {phrase}
                        </Text>
                    </HStack>
                    <Image
                        w={'100%'}
                        height={20}
                        resizeMode='contain'
                        source={textTwo}
                        alt='question1'
                    />
                    <TouchableOpacity style={{ 
                        position:'absolute',
                        bottom: 100
                     }}
                     onPress={() => share()}
                     >
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