import React, {useRef, useState} from 'react';
import {Button, Icon, Text, View} from "native-base";
import {Keyboard, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback} from "react-native";
import {Colors} from "../../utils/Colors";
import PhoneInput from "react-native-phone-number-input";
import ApiApp from "../../utils/ApiApp";
import ModalError from "../Modals/ModalError";
import {MaterialIcons} from "@expo/vector-icons";

const PhoneScreen = ({navigation}) => {
    const [value, setValue] = useState(null);
    const phoneInput = useRef();
    const [formattedValue, setFormattedValue] = useState(null);
    const [modalErrorVisible, setModalErrorVisible] = useState(null);
    const [textException, setTextException] = useState(null);

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
        <SafeAreaView style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
            }}>

                <KeyboardAvoidingView flex={1} behavior={'padding'}>
                    <View flex={1} bgColor={Colors.red} alignItems={'center'} justifyContent={'center'}
                          borderBottomRadius={40}>
                        <Icon as={MaterialIcons} name={'phone'} size={'5xl'} color={'white'}/>
                        <Text color={'white'}>Verifica tu número</Text>
                        <Text color={'white'} size={'md'}>Por favor digita tu número telefónico</Text>
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