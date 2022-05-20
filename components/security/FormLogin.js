import React, {useState} from "react";
import {
    Button,
    Center,
    FormControl,
    HStack,
    Image,
    Input,
    Link,
    NativeBaseProvider,
    ScrollView,
    Text,
    View,
    VStack
} from "native-base";
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import * as Yup from 'yup'
import * as Google from 'expo-google-app-auth';
import LinkedInModal from 'react-native-linkedin'
import {getShadowCircleStyle, resolvePlatform} from "../../utils/functions";
import {Colors} from "../../utils/Colors";
import loginImage from '../../assets/login.png';
import facebookImage from '../../assets/facebook.png'
import linkedInImage from '../../assets/linkedin.png'
import googleImage from '../../assets/google.png'

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


        return (
            <ScrollView p={10} bounces={false} flexGrow={1}>
                {/*<Heading flex={1} size="lg" fontWeight="600" color="coolGray.800" _dark={{*/}
                {/*    color: "warmGray.50"*/}
                {/*}}>*/}
                {/*    <VStack flex={1} alignItems={'center'}>*/}
                {/*       */}
                {/*    </VStack>*/}
                {/*</Heading>*/}
                <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                    <Image source={loginImage} style={{resizeMode: 'contain'}} w={resolvePlatform(250, 200)}
                           h={resolvePlatform(250, 200)}/>
                </View>
                <View flex={1}>


                    <Text textAlign={'center'} color={Colors.red} fontSize={42}>¡Hola!</Text>
                    <Text textAlign={'center'} color={Colors.red} fontSize={24}>¿Cómo te sientes?</Text>

                    <Text textAlign={'center'} textDecorationLine={'underline'} fontSize={12}>Iniciar sesión</Text>

                    <VStack space={3} mt="5">
                        <FormControl isInvalid={formik.errors.email}>
                            <View flex={1} mb={4} style={getShadowCircleStyle(5, 5)}>
                                <Input
                                    height={50}
                                    autoCapitalize="none"
                                    placeholder={'Correo electrónico'}
                                    autoCorrect={false}
                                    onChangeText={text => formik.setFieldValue('email', text)}
                                    returnKeyType={'done'}
                                    bgColor={'white'}
                                />
                            </View>
                            <FormControl.ErrorMessage>
                                {formik.errors.email}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.errors.password}>
                            <View flex={1} mb={4} style={getShadowCircleStyle(5, 5)}>
                                <Input
                                    height={50}
                                    placeholder={'Contraseña'}
                                    type="password"
                                    onChangeText={text => formik.setFieldValue('password', text)}
                                    returnKeyType={'done'}
                                    bgColor={'white'}
                                />
                            </View>
                            <FormControl.ErrorMessage>
                                {formik.errors.password}
                            </FormControl.ErrorMessage>
                            <Link _text={{
                                fontSize: "xs",
                                fontWeight: "500",
                                color: Colors.red
                            }} alignSelf="flex-end" mt="1">
                                Forget Password?
                            </Link>
                        </FormControl>
                        <Button mt="1" isLoading={props.loading} isLoadingText={'Iniciando'}
                                onPress={formik.handleSubmit}
                                colorScheme='orange'>
                            Iniciar
                        </Button>

                        <View flexDir={'row'}>
                            <View flex={1} alignItems={'center'} justifyContent={'center'}
                                  style={getShadowCircleStyle(10, 10)}>
                                <Image source={facebookImage} w={10} h={10}></Image>
                            </View>
                            <View flex={1} alignItems={'center'} justifyContent={'center'}
                                  style={getShadowCircleStyle(10, 10)}>
                                <Image source={linkedInImage} w={10} h={10}></Image>
                            </View>
                            <View flex={1} alignItems={'center'} justifyContent={'center'}
                                  style={getShadowCircleStyle(10, 10)}>
                                <Image source={googleImage} w={10} h={10}></Image>
                            </View>
                        </View>
                        <Button mt="1" isLoading={props.loading} isLoadingText={'Iniciando'} onPress={handleLoginGoogle}
                                colorScheme="orange">
                            Login con Google
                        </Button>
                        <Button mt="1" isLoading={props.loading} isLoadingText={'Iniciando'} onPress={linkedInLogin}
                                colorScheme="orange">
                            Login con LinkedIn
                        </Button>
                        <LinkedInModal
                            clientID={clientID}
                            clientSecret={clientSecret}
                            redirectUri={redirectUri}
                            onSuccess={token => console.log('token linkedin', token)}
                        />
                        <HStack justifyContent="center">
                            <Button size="sm" colorScheme={'orange'} onPress={() => navigation.navigate('Register')}
                                    variant="link">
                                Registrarme
                            </Button>
                        </HStack>
                    </VStack>
                </View>
            </ScrollView>
        );
    };


    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <FormLogin/>
            </Center>
        </NativeBaseProvider>
    );
};
