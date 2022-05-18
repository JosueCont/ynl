import React from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from "./ModalStyleSheet";
import {Button, FormControl, Icon, Input, Text, View} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";
import {Colors} from "../../utils/Colors";

const ModalPasswordUpdate = ({visible, setVisible}) => {
    return (
        <Modal
            animationType={'slide'}
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setVisible(!visible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={{position: 'absolute', right: 10, top: 15}}
                                      onPress={() => setVisible(false)}>
                        <Icon as={MaterialIcons} name={'close'} color={'gray'} size={'xl'}></Icon>
                    </TouchableOpacity>
                    <View mt={5}>
                        <Text textAlign={'center'} color={Colors.red} fontSize={22} mb={4}>Actualizar contraseña</Text>
                    </View>
                    <View p={5} width={'100%'}>
                        <FormControl isInvalid w="100%">
                            <Input size={'md'} height={50} mb={4} placeholder={'Contraseña anterior'} borderRadius={25}
                                   placeholderTextColor={Colors.red} textAlign={'center'}
                            />
                            <Input size={'md'} height={50} mb={4} placeholder={'Contaseña nueva'} borderRadius={25}
                                   placeholderTextColor={Colors.red} textAlign={'center'}
                            />
                            <Input size={'md'} height={50} mb={4} placeholder={'Confirmar contraseña nueva'}
                                   borderRadius={25}
                                   placeholderTextColor={Colors.red} textAlign={'center'}
                            />
                            <View flexDir={'row'} mt={4}>
                                <View flex={1} mr={1}>
                                    <Button size={'sm'} colorScheme={'orange'} onPress={() => {
                                        setVisible(false)
                                    }}>Cancelar</Button>
                                </View>
                                <View flex={1} ml={1}>
                                    <Button size={'sm'} colorScheme={'orange'}
                                            onPress={() => action(value)}>Actualizar</Button>
                                </View>
                            </View>
                        </FormControl>
                    </View>
                </View>
            </View>
        </Modal>

    );
};

export default ModalPasswordUpdate;