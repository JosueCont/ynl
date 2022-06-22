import React, {useEffect, useState} from 'react';
import {Button, Image, Text, View} from "native-base";
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell,} from 'react-native-confirmation-code-field';
import {KeyboardAvoidingView, SafeAreaView} from "react-native";
import {Colors} from "../../utils/Colors";
import {styles} from "./VerificationCodeStyleSheet";
import ApiApp from "../../utils/ApiApp";
import {connect} from "react-redux";
import {registerAction} from "../../redux/ducks/authDuck";
import ModalError from "../Modals/ModalError";
import sendCodeImage from "../../assets/sendCode.png";

const CELL_COUNT = 4;


const VerificationCodeScreen = ({navigation, route, authDuck, registerAction}) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const [modalErrorVisible, setModalErrorVisible] = useState(null);
    const [textException, setTextException] = useState(null);


    useEffect(() => {
        navigation.setOptions({
            headerStyle: {backgroundColor: Colors.red}
        })
    }, [])

    const verify = async () => {
        try {
            let data = {
                phone: route.params.phone,
                code: value
            }
            const response = await ApiApp.registerPhoneVerify(data)
            // console.log(response.data, 35)
            const {verified} = response.data.data.attributes;
            if (verified === true) {

                const {email, password} = authDuck.registerData;
                await registerAction({
                    username: email.replace(/@.*$/, ""),
                    email: email,
                    password: password
                })

                navigation.navigate('SuccessScreen')


            }
        } catch (e) {
            //console.log(typeof ex)
            console.log('verify error =>',e.toString())
            if (typeof e === 'object') {
                setTextException(e.response.data.error.message)
            } else {
                setTextException(e.toString())
            }
            setModalErrorVisible(true)
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView flex={1} behavior={'padding'}>
                <View flex={1} bgColor={Colors.red} alignItems={'center'} justifyContent={'center'}
                      borderBottomRadius={60}>
                    <Image source={sendCodeImage} width={150} height={150} alt="img"></Image>
                    <Text color={'white'}>Código de verificacion</Text>
                    <Text color={'white'} size={'md'}>Te hemos enviado un código por mensaje</Text>
                </View>
                <View flex={1} mx={10}>
                    <View flex={1} justifyContent={'center'}>
                        <CodeField
                            ref={ref}
                            {...props}
                            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                            value={value}
                            onChangeText={setValue}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType={'oneTimeCode'}
                            renderCell={({index, symbol, isFocused}) => (
                                <Text
                                    key={index}
                                    style={[styles.cell, isFocused && styles.focusCell]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor/> : null)}
                                </Text>
                            )}
                        />
                    </View>
                    <View>
                        <Button isLoading={false} mt="2" colorScheme="orange" onPress={() => verify()}>
                            Terminar
                        </Button>
                    </View>
                </View>

                <ModalError visible={modalErrorVisible} setVisible={setModalErrorVisible}
                            text={textException}></ModalError>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck
    }
}


export default connect(mapState, {registerAction})(VerificationCodeScreen);