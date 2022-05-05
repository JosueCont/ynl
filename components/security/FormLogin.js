import React, {useState} from "react";
import {
    Box,
    Button,
    Center,
    FormControl,
    Heading,
    HStack,
    Image,
    Input,
    Link,
    NativeBaseProvider,
    VStack
} from "native-base";
import logo from '../../assets/YNL.gif'
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import * as Yup from 'yup'
import * as Google from 'expo-google-app-auth';
import LinkedInModal from 'react-native-linkedin'

export default (props) => {
    const navigation = useNavigation();
    const [googleSubmitting, setGoogleSubmitting] = useState(false)

    const
        clientID = "86jiyo54qdabji",
        clientSecret = "E9PD7bGIvYH6ClWE",
        redirectUri = "http://localhost:1337/";
    /* const { linkedInLogin } = useLinkedIn({
         clientId: '86jiyo54qdabji',
         redirectUri: `http://localhost:1337/api/connect/linkedin/callback`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
         onSuccess: (code) => {
             console.log('success login linkedin',code);
         },
         onError: (error) => {
             console.log(error);
         },
     });*/

    const linkedInLogin = () => {

    }


    const handleLoginGoogle = async () => {
        setGoogleSubmitting(true)
        const config = {
            iosClientId: `139145047906-9r09uc555jsi528qnrbjs440g84h1okt.apps.googleusercontent.com`,
            androidClientId: `139145047906-u7lpmp4vuhk0cd3hc88f3k8tv9afe01b.apps.googleusercontent.com`,
            scopes: ['profile', 'email']
        }

        try {
            const {type, accessToken, user} = await Google.logInAsync(config);
            if (type === 'success') {
                const {email, name, photoUrl} = user;
                console.log('userData', email, name, photoUrl)
                console.log('accessToken', accessToken)
                props.onLoginGoogle(accessToken)
            } else {
                alert('Login cancelado')
            }
        } catch (e) {
            console.log('error login google', e)
        } finally {
            setGoogleSubmitting(false)
        }


    }

    const FormLogin = () => {
        const formik = useFormik({
            initialValues: {
                email: '',
                password: ''
            },
            onSubmit: (formValue) => {
                props.onLogin(formValue)
            },
            validateOnChange: false,
            validationSchema: Yup.object({
                email: Yup.string().email("El email no es correcto").required("El email es obligatorio"),
                password: Yup.string().required("La contraseña es obligatoria"),
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
                    Sign in to continue!
                </Heading>

                <VStack space={3} mt="5">
                    <FormControl isInvalid={formik.errors.email}>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input autoCapitalize="none"
                               onChangeText={text => formik.setFieldValue('email', text)}/>
                        <FormControl.ErrorMessage>
                            {formik.errors.email}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.errors.password}>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input type="password"
                               onChangeText={text => formik.setFieldValue('password', text)}/>
                        <FormControl.ErrorMessage>
                            {formik.errors.password}
                        </FormControl.ErrorMessage>
                        <Link _text={{
                            fontSize: "xs",
                            fontWeight: "500",
                            color: "red.500"
                        }} alignSelf="flex-end" mt="1">
                            Forget Password?
                        </Link>
                    </FormControl>
                    <Button mt="1" isLoading={props.loading} isLoadingText={'Iniciando'} onPress={formik.handleSubmit}
                            colorScheme="red">
                        Iniciar
                    </Button>
                    <Button mt="1" isLoading={props.loading} isLoadingText={'Iniciando'} onPress={handleLoginGoogle}
                            colorScheme="red">
                        Login con Google
                    </Button>
                    <Button mt="1" isLoading={props.loading} isLoadingText={'Iniciando'} onPress={linkedInLogin}
                            colorScheme="red">
                        Login con LinkedIn
                    </Button>
                    <LinkedInModal
                        clientID={clientID}
                        clientSecret={clientSecret}
                        redirectUri={redirectUri}
                        onSuccess={token => console.log('token linkedin', token)}
                    />
                    <HStack justifyContent="center">
                        <Button size="sm" colorScheme={'red'} onPress={() => navigation.navigate('Register')}
                                variant="link">
                            Registrarme
                        </Button>
                    </HStack>
                </VStack>
            </Box>
        </Center>;
    };


    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <FormLogin/>
            </Center>
        </NativeBaseProvider>
    );
};
