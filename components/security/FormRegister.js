import * as React from "react";
import {Button, FormControl, Image, Input, Text, View} from "native-base";
import logo from '../../assets/YNL.gif'
import {useFormik} from 'formik';
import * as Yup from 'yup'
import {t} from "i18n-js";
import { Linking } from 'react-native';


export default ({onRegister, loading}) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: ''
        },
        onSubmit: (formValue) => {
            onRegister(formValue)
        },
        validateOnChange: false,
        validationSchema: Yup.object({
            email: Yup.string().email("El email no es correcto").required("El email es obligatorio."),
            password: Yup.string().required("La contraseña es obligatoria").min(8, "La contraseña debe ser de al menos 8 caracteres."),
            repeatPassword: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref('password')], "Las contraseñas tienen que ser iguales."),
        })
    });

    return (
        <View flex={1}>
            <View flex={0.5}>
                <Image source={logo} alt="img"/>
            </View>
            <View flex={1} mx={6}>
                <Text fontSize={16} textAlign={'center'} mb={4}>
                    {t('login_register')}
                </Text>
                <View>
                    <FormControl isInvalid={formik.errors.email} mb={3}>
                        <Input
                            borderRadius={20}
                            height={50}
                            autoCapitalize="none"
                            onChangeText={text => formik.setFieldValue('email', text)}
                            placeholder={t('email')}
                            autoCorrect={false}
                        />
                        <FormControl.ErrorMessage>
                            {formik.errors.email}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.errors.password} mb={3}>
                        <Input borderRadius={20} height={50} type="password" placeholder={t('password')}
                               onChangeText={text => formik.setFieldValue('password', text)}/>
                        <FormControl.ErrorMessage>
                            {formik.errors.password}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.errors.repeatPassword} mb={3}>

                        <Input borderRadius={20} height={50} type="password"
                               placeholder={t('profile_confirm_password')}
                               onChangeText={text => formik.setFieldValue('repeatPassword', text)}/>
                        <FormControl.ErrorMessage>
                            {formik.errors.repeatPassword}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <Text underline
                        size={'md'}
                        onPress={() => Linking.openURL('https://www.grupohuman.com/aviso-privacidad')}>
                    Aviso de privacidad
                    </Text>
                    <Button isLoading={loading} mt="2"
                            onPress={formik.handleSubmit} colorScheme="orange">
                        {t('continue')}
                    </Button>

                </View>
            </View>
        </View>
    );
};
