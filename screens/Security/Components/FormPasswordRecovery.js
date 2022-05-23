import * as React from "react";
import {Box, Button, Center, FormControl, Heading, Image, Input, VStack} from "native-base";
import logo from '../../../assets/YNL.gif'
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
            email: Yup.string().email("El email no es correcto").required("El email es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria"),
            repeatPassword: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref('password')], "Las contraseñas tienen que ser iguales"),
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
                        Recuperar contraseña
                    </Heading>

                    <VStack space={3} mt="5">
                        <VStack>
                            <FormControl isInvalid={formik.errors.email}>
                                <Input
                                    placeholder={'Correo electrónico'}
                                    autoCapitalize="none"
                                    onChangeText={text => formik.setFieldValue('email', text)}

                                />
                                <FormControl.ErrorMessage>
                                    {formik.errors.email}
                                </FormControl.ErrorMessage>
                            </FormControl>

                            <Button isLoading={loading} isLoadingText={'Registrando'} mt="2"
                                    onPress={formik.handleSubmit} colorScheme="red">
                                Continuar
                            </Button>
                        </VStack>

                    </VStack>
                </Box>
            </Center>
        </Center>
    );
};
