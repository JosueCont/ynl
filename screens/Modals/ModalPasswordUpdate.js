import React, {useState} from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from "./ModalStyleSheet";
import {Button, FormControl, Icon, Input, Text, View} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";
import {Colors} from "../../utils/Colors";
import {useFormik} from "formik";
import * as Yup from "yup";

const ModalPasswordUpdate = ({visible, setVisible, action}) => {
    const [oldPassword, setOldPassword] = useState(null)
    const [password, setPassword] = useState(null)
    const [passwordConfirm, setPasswordConfirm] = useState(null)

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            password: '',
            repeatPassword: ''
        },
        onSubmit: (formValue) => {
            action(formValue.oldPassword, formValue.password, formValue.repeatPassword)
        },
        validateOnChange: false,
        validationSchema: Yup.object({
            oldPassword: Yup.string().required("La contraseña es obligatoria"),
            password: Yup.string().required("La contraseña es obligatoria").min(8, "La contraseña debe ser de al menos 8 caracteres."),
            repeatPassword: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref('password')], "Las contraseñas tienen que ser iguales."),
        })
    });

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
                        <FormControl isInvalid={formik.errors.oldPassword} mb={2}>
                            <Input
                                type="password"
                                onChangeText={val => {
                                    formik.setFieldValue('oldPassword', val)
                                }}
                                //value={oldPassword}
                                size={'md'}
                                height={50}
                                placeholder={'Contraseña anterior'}
                                borderRadius={25}
                                placeholderTextColor={Colors.red}
                                textAlign={'center'}
                            />
                            <FormControl.ErrorMessage>
                                {formik.errors.oldPassword}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.errors.password} mb={2}>
                            <Input
                                type="password"
                                onChangeText={val => {
                                    formik.setFieldValue('password', val)
                                }}
                                size={'md'}
                                height={50}

                                placeholder={'Contraseña nueva'}
                                borderRadius={25}
                                placeholderTextColor={Colors.red}
                                textAlign={'center'}
                            />
                            <FormControl.ErrorMessage>
                                {formik.errors.password}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.errors.repeatPassword} mb={2}>

                            <Input type="password"
                                   onChangeText={val => {
                                       formik.setFieldValue('repeatPassword', val)
                                   }}
                                   size={'md'}
                                   height={50}
                                   placeholder={'Confirmar contraseña nueva'}
                                   borderRadius={25}
                                   placeholderTextColor={Colors.red}
                                   textAlign={'center'}
                            />
                            <FormControl.ErrorMessage>
                                {formik.errors.repeatPassword}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <View flexDir={'row'} mt={4}>
                            <View flex={1} mr={1}>
                                <Button size={'sm'} colorScheme={'orange'} onPress={() => {
                                    setVisible(false)
                                }}>Cancelar</Button>
                            </View>
                            <View flex={1} ml={1}>
                                <Button size={'sm'} colorScheme={'orange'}
                                        onPress={() => {
                                            formik.handleSubmit();
                                        }}>Actualizar</Button>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>

    );
};

export default ModalPasswordUpdate;