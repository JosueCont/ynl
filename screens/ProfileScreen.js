import React, {useEffect, useState} from "react";
import {ScrollView, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {Button, Checkbox, FormControl, Icon, Input, Stack, Text, View} from "native-base";
import {Entypo} from "@expo/vector-icons";
import {Colors} from "../utils/Colors";
import ApiApp from "../utils/ApiApp";
import {useIsFocused} from "@react-navigation/native";
import ModalPasswordUpdate from "./Modals/ModalPasswordUpdate";


const ProfileScreen = ({authDuck, navigation}) => {

    const isFocused = useIsFocused();
    const [name, setName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [gender, setGender] = useState(null);
    const [loading, setLoading] = useState(null);
    const [modalPasswordUpdateVisible, setModalPasswordUpdateVisible] = useState(null);

    useEffect(() => {
        if (isFocused) {
            getProfileFunction()
        }
    }, [isFocused])

    const getProfileFunction = async () => {
        try {
            const response = await ApiApp.getProfile(authDuck.user.id)
            setValues(response)
        } catch (ex) {
            console.log(ex)
        }
    }

    const updateProfileFunction = async () => {
        try {
            setLoading(true)
            let data = {
                firstName: name,
                lastName: lastName,
                email: email,
                gender: gender
            }
            const response = await ApiApp.updateProfile(authDuck.user.id, data)
            setValues(response)
        } catch (ex) {
            console.log(ex.response)
        } finally {
            setLoading(false)
        }
    }

    const setValues = (response) => {
        setName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
        setGender(response.data.gender)
    }


    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={{backgroundColor: Colors.white}}>

            <View style={{width: 200, height: 200, alignSelf: 'center', alignItems: 'center'}} mt={5} mb={10}>
                <View width={'100%'} height={'100%'} bgColor={'white'} alignItems={'center'} justifyContent={'center'}
                      borderRadius={100} borderWidth={2}
                      borderColor={"red.200"}>
                    <Icon as={Entypo} name="camera" size={20}/>
                    <Text fontSize={12}>Sube tu foto aquí</Text>

                </View>
            </View>
            <View flex={1} alignItems={'center'}>
                <Stack space={4} w="90%">
                    <FormControl isInvalid w="100%">
                        <Input size={'2xl'} height={50} mb={4} placeholder={'Nombre(s)'} borderRadius={25}
                               placeholderTextColor={Colors.red} textAlign={'center'}
                               value={name}
                               onChangeText={val => setName(val)}
                        />
                        <Input size={'2xl'} height={50} mb={4} placeholder={'Apellidos'}
                               borderRadius={20}
                               placeholderTextColor={Colors.red} textAlign={'center'}
                               value={lastName}
                               onChangeText={val => setLastName(val)}
                        />
                        <Input size={'2xl'} height={50} mb={4} placeholder={'Correo electrónico'}
                               borderRadius={20}
                               placeholderTextColor={Colors.red} textAlign={'center'}
                               value={email}
                               onChangeText={val => setEmail(val)}
                        />
                        {/*<Input size={'2xl'} height={50} mb={4} placeholder={'Contraseña'} borderRadius={20}*/}
                        {/*       placeholderTextColor={Colors.red} textAlign={'center'}/>*/}
                        {/*<Input size={'2xl'} height={50} mb={6} placeholder={'Confirmar contraseña'} borderRadius={20}*/}
                        {/*       placeholderTextColor={Colors.red} textAlign={'center'}/>*/}
                        <View mb={8}>
                            <Text textAlign={'center'} fontSize={24} color={Colors.red} mb={4}>Género</Text>
                            <View flexDir={'row'} justifyContent={'space-between'} px={20}>
                                <Checkbox value="danger" colorScheme="orange" isChecked={gender === 0 ? true : false}
                                          onChange={(v) => {
                                              setGender(v ? 0 : 1)
                                          }}>
                                    Mujer
                                </Checkbox>
                                <Checkbox value="info" colorScheme="orange" isChecked={gender === 1 ? true : false}
                                          onChange={(v) => {
                                              setGender(v ? 1 : 0)
                                          }}>
                                    Hombre
                                </Checkbox>
                            </View>

                        </View>

                        <TouchableOpacity style={{marginVertical: 20}}
                                          onPress={() => setModalPasswordUpdateVisible(true)}>
                            <Text textAlign={'center'} size={'md'} color={Colors.red}>Actualizar contraseña</Text>
                        </TouchableOpacity>
                        <Button isLoading={loading} colorScheme={'orange'} onPress={() => updateProfileFunction()}
                                mb={4}>Actualizar</Button>

                        <ModalPasswordUpdate visible={modalPasswordUpdateVisible}
                                             setVisible={setModalPasswordUpdateVisible}></ModalPasswordUpdate>
                    </FormControl>

                </Stack>
            </View>
        </ScrollView>
    )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck
    }
}


export default connect(mapState)(ProfileScreen);