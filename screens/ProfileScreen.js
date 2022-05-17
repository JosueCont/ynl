import React from "react";
import {ScrollView} from "react-native";
import {connect} from "react-redux";
import {Button, Checkbox, FormControl, Icon, Input, Stack, Text, View} from "native-base";
import {Entypo} from "@expo/vector-icons";
import {Colors} from "../utils/Colors";


const ProfileScreen = ({authDuck, navigation}) => {


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
                               placeholderTextColor={Colors.red} textAlign={'center'}/>
                        <Input size={'2xl'} height={50} mb={4} placeholder={'Apellidos'} borderRadius={20}
                               placeholderTextColor={Colors.red} textAlign={'center'}/>
                        <Input size={'2xl'} height={50} mb={4} placeholder={'Correo electrónico'} borderRadius={20}
                               placeholderTextColor={Colors.red} textAlign={'center'}/>
                        <Input size={'2xl'} height={50} mb={4} placeholder={'Contraseña'} borderRadius={20}
                               placeholderTextColor={Colors.red} textAlign={'center'}/>
                        <Input size={'2xl'} height={50} mb={6} placeholder={'Confirmar contraseña'} borderRadius={20}
                               placeholderTextColor={Colors.red} textAlign={'center'}/>
                        <View mb={8}>
                            <Text textAlign={'center'} fontSize={24} color={Colors.red} mb={4}>Género</Text>
                            <View flexDir={'row'} justifyContent={'space-between'} px={20}>
                                <Checkbox value="danger" colorScheme="orange" defaultIsChecked>
                                    Mujer
                                </Checkbox>
                                <Checkbox value="info" colorScheme="orange" defaultIsChecked>
                                    Hombre
                                </Checkbox>
                            </View>

                        </View>
                        <Button colorScheme={'orange'} onPress={() => {
                        }} mb={4}>Actualizar</Button>

                    </FormControl>

                </Stack>
            </View>
        </ScrollView>
    )
}

const mapState = (state) => {
    return {}
}


export default connect(mapState)(ProfileScreen);