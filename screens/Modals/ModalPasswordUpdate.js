import React, {useState} from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from "./ModalStyleSheet";
import {Button, FormControl, Icon, Input, Text, View} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";
import {Colors} from "../../utils/Colors";
import {useFormik} from "formik";
import {t} from 'i18n-js';
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
            oldPassword: Yup.string().required(t('error_password_required')).min(8, t('error_password_minimun')),
            password: Yup.string().required(t('error_password_required')).min(8, t('error_password_minimun')),
            repeatPassword: Yup.string().required(t('error_password_required')).min(8, t('error_password_minimun')).oneOf([Yup.ref('password')], t('error_passwords_haveto_equal')),
        })
    });

    return (
        <Modal
            animationType={'slide'}
            transparent={true}
            visible={visible}
            onRequestClose={() => {
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
                        <Text textAlign={'center'} color={Colors.red} fontSize={22} mb={4}>{t('profile_upd_pass')}</Text>
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
                                placeholder={t('profile_previus_password')}
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

                                placeholder={t('profile_new_password')}
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
                                   placeholder={t('profile_confirm_password')}
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
                                }}>{t('cancel')}</Button>
                            </View>
                            <View flex={1} ml={1}>
                                <Button size={'sm'} colorScheme={'orange'}
                                        onPress={() => {
                                            formik.handleSubmit();
                                        }}>{t('update')}</Button>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>

    );
};

export default ModalPasswordUpdate;