import React, {useEffect, useRef, useState} from 'react';
import {Button, Image, Text, View} from "native-base";
import {Keyboard, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback} from "react-native";
import {Colors} from "../../utils/Colors";
import PhoneInput from "react-native-phone-number-input";
import ApiApp from "../../utils/ApiApp";
import ModalError from "../Modals/ModalError";
import phoneImage from '../../assets/phoneVerification.png'

const PhoneScreen = ({navigation}) => {
    const [value, setValue] = useState(null);
    const phoneInput = useRef();
    const [formattedValue, setFormattedValue] = useState(null);
    const [modalErrorVisible, setModalErrorVisible] = useState(null);
    const [textException, setTextException] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {backgroundColor: Colors.red}
        })
    }, [])

    const phoneAction = async (val) => {
        try {
            let data = {
                phone: val
            }
            const response = await ApiApp.registerPhone(data)
            console.log(response.data)
            navigation.navigate('VerificationCodeScreen', {phone: val})
        } catch (ex) {
            setTextException(ex.response.data.error.message)
            setModalErrorVisible(true)
        }

    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
            }}>

                <KeyboardAvoidingView flex={1} behavior={'padding'}>
                    <View flex={1} bgColor={Colors.red} alignItems={'center'} justifyContent={'center'}
                          borderBottomRadius={60}>
                        <Image source={phoneImage} width={150} height={150} alt="img"></Image>
                        <Text color={'white'}>Verifica </Text>
                        <Text color={'white'} size={'md'}>tu cuenta añadiendo tu teléfono</Text>
                    </View>
                    <View flex={1} mx={10}>
                        <View mt={10} justifyContent={'center'}>
                            <PhoneInput
                                ref={phoneInput}
                                defaultValue={value}
                                defaultCode="MX"
                                layout={'first'}
                                onChangeText={(text) => {
                                    setValue(text);
                                }}
                                onChangeFormattedText={(text) => {
                                    setFormattedValue(text);
                                }}
                                withDarkTheme
                                withShadow
                                autoFocus={true}
                            />
                        </View>
                        <View>
                            <Button mt="2" colorScheme="orange" onPress={() => phoneAction(formattedValue)}>
                                Continuar
                            </Button>
                        </View>
                    </View>
                    <ModalError text={textException} setVisible={setModalErrorVisible}
                                visible={modalErrorVisible}></ModalError>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>

        </SafeAreaView>
    )
}


export default PhoneScreen;