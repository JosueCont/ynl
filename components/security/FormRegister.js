import * as React from "react";
import { Box,Image, Heading,HStack,Text, VStack, FormControl, Input, Button, Center, NativeBaseProvider, Link } from "native-base";
import logo from '../../assets/YNL.gif'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import {useEffect} from "react";



export default (props) => {
    const FormRegister = () => {
        const formik = useFormik({
            initialValues:{
                email:'',
                password:'',
                repeatPassword:''
            },
            onSubmit:(formValue)=>{
                props.onRegister(formValue)
            },
            validateOnChange:false,
            validationSchema: Yup.object({
                email: Yup.string().email("El email no es correcto").required("El email es obligatorio"),
                password: Yup.string().required("La contraseña es obligatoria"),
                repeatPassword: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref('password')], "Las contraseñas tienen que ser iguales"),
            })
        });


        return <Center w="100%">
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
                    REGISTRO
                </Heading>

                <VStack space={3} mt="5">
                    <VStack>
                        <FormControl isInvalid={formik.errors.email}>
                            <FormControl.Label >Email</FormControl.Label>
                            <Input
                                autoCapitalize="none"
                                onChangeText={text=> formik.setFieldValue('email',text)}

                            />
                            <FormControl.ErrorMessage>
                                {formik.errors.email}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.errors.password}>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input type="password" onChangeText={text=> formik.setFieldValue('password',text)}/>
                            <FormControl.ErrorMessage>
                                {formik.errors.password}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.errors.repeatPassword}>
                            <FormControl.Label>Repetir Password</FormControl.Label>
                            <Input type="password" onChangeText={text=> formik.setFieldValue('repeatPassword',text)}/>
                            <FormControl.ErrorMessage>
                                {formik.errors.repeatPassword}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <Button isLoading={props.loading} isLoadingText={'Registrando'} mt="2" onPress={formik.handleSubmit} colorScheme="red">
                            Registrarme
                        </Button>
                    </VStack>

                </VStack>
            </Box>
        </Center>;
    };

    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <FormRegister />
            </Center>
        </NativeBaseProvider>
    );
};
