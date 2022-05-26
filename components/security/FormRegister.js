import * as React from "react";
import {Box, Button, Center, FormControl, Heading, Image, Input, VStack} from "native-base";
import logo from '../../assets/YNL.gif'
import {useFormik} from 'formik';
import * as Yup from 'yup'


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
        <Center flex={1} px="3">
            <Center w="100%">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }}>
                        <VStack alignItems={'center'}>
                            <Image source={logo}/>
                        </VStack>
                    </Heading>
                    <Heading mt="1" _dark={{
                        color: "warmGray.200"
                    }} color="coolGray.600" fontWeight="medium" size="xs">
                        Registrarme
                    </Heading>

                    <VStack space={3} mt="5">
                        <VStack>
                            <FormControl isInvalid={formik.errors.email} mb={3}>
                                <Input
                                    borderRadius={20}
                                    height={50}
                                    autoCapitalize="none"
                                    onChangeText={text => formik.setFieldValue('email', text)}
                                    placeholder={'Correo electrónico'}
                                    autoCorrect={false}
                                />
                                <FormControl.ErrorMessage>
                                    {formik.errors.email}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={formik.errors.password} mb={3}>
                                <Input borderRadius={20} height={50} type="password" placeholder={'Contraseña'}
                                       onChangeText={text => formik.setFieldValue('password', text)}/>
                                <FormControl.ErrorMessage>
                                    {formik.errors.password}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={formik.errors.repeatPassword} mb={3}>

                                <Input borderRadius={20} height={50} type="password"
                                       placeholder={'Confirmar contraseña'}
                                       onChangeText={text => formik.setFieldValue('repeatPassword', text)}/>
                                <FormControl.ErrorMessage>
                                    {formik.errors.repeatPassword}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <Button isLoading={loading} mt="2"
                                    onPress={formik.handleSubmit} colorScheme="orange">
                                Continuar
                            </Button>
                        </VStack>

                    </VStack>
                </Box>
            </Center>
        </Center>
    );
};
