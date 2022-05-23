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
import {getShadowCircleStyle, resolvePlatform} from "../../utils/functions";
//import LinkedInModal from 'react-native-linkedin'
import {Colors} from "../../utils/Colors";
import loginImage from '../../assets/login.png';
import facebookImage from '../../assets/facebook.png'
import linkedInImage from '../../assets/linkedin.png'
import googleImage from '../../assets/google.png'

import {Dimensions, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import WebView from "react-native-webview";
import querystring from 'querystring';


export default (props) => {
    const navigation = useNavigation();
    const [googleSubmitting, setGoogleSubmitting] = useState(false)
    const [token, setToken] = useState('')
    const [openLinkedIn, setOpenLinkedIn] = useState(false)


     const REDIRECT_URI = "https://ynl-api.herokuapp.com/api/connect/linkedin/"; // this needs to be the same as your linkedin app panel
    const CLIENT_ID = "86mom3hfgl2rvj"; // you can get it from the linked in apps panel
    const CLIENT_SECRET = "z7YYg1E3i39fI9Kf"; // you can get it from the linked in apps panel
    const AUTH_BASE = "https://www.linkedin.com/oauth/v2/authorization";
    //https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86mom3hfgl2rvj&redirect_uri=https://ynl-api.herokuapp.com/api/connect/linkedin/&state=foobar&scope=r_liteprofile


     const qs = [
        `response_type=code`,
        `client_id=${CLIENT_ID}`,
        `redirect_uri=${REDIRECT_URI}`,
        `state=123456`,
        `scope=r_liteprofile`,
      ];
      const AUTH_ENDPOINT = `${AUTH_BASE}?${qs.join('&')}`


    const linkedInLogin = ({ url }) => {
        if (!url) {
          return;
        }
        console.log(url);
        //The browser has redirected to our url of choice, the url would look like:
        //http://your.redirect.url?code=<access_token>&state=<anyauthstate-this-is-optional>
        const matches = url.match(REDIRECT_URI);
        const matchesRed = url.match('ynl-api.herokuapp');
        const matchesCancel = url.match('login-cancel');
        const matchesRedirect = url.match('session_redirect');
        const matchesAuthCancel = url.match('authorization-cancel');
        const matchesLogin = url.match('session_redirect');
        console.log("MATCHES::: "+matches);
        console.log("MATCHES CANCEL:::"+ matchesCancel);
        console.log("MATCHES AUTHCANCEL:::"+ matchesAuthCancel);
        console.log("MATCHES REDIR:::"+ matchesRed);
        console.log("MATCHES LOGIN:::"+ matchesLogin);
        console.log("TOKEN:::"+token);

        if((matchesCancel || matchesAuthCancel) && matchesLogin==null){
            console.log(matchesLogin == null);
            setOpenLinkedIn(false);
            return;
        }

        if ((matches || matchesRed) && token=='') {
          // We have the correct URL, parse it out to get the token
          const obj = querystring.parse(url.split('?').pop());
          console.log("OBJ::"+JSON.stringify(obj));
          if (obj.code) {
              console.log(obj.code)
              setToken(obj.code);
              props.onLoginLinked(obj.code);
              setOpenLinkedIn(false);
          }
          if (obj.access_token) {
              console.log(obj.access_token)
              setToken(obj.access_token);
              props.onLoginLinked(obj.access_token);
              setOpenLinkedIn(false);
          }

          if(obj.error){
            setOpenLinkedIn(false);
          }
        }
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
                                    borderRadius={20}
                                    color={Colors.red}
                                    placeholderTextColor={Colors.red}
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
                                    borderRadius={20}
                                    color={Colors.red}
                                    placeholderTextColor={Colors.red}
                                />
                            </View>
                            <FormControl.ErrorMessage>
                                {formik.errors.password}
                            </FormControl.ErrorMessage>

                        </FormControl>
                        <Button mt={2} mb={2} isLoading={props.loading} isLoadingText={'Iniciando'}
                                onPress={formik.handleSubmit}
                                colorScheme='orange'>
                            Iniciar
                        </Button>
                        <Link onPress={() => navigation.navigate('PasswordRecoveryScreen')} mb={4} _text={{
                            fontSize: "xs",
                            fontWeight: "500",
                            color: Colors.red
                        }} alignSelf="flex-end" mt="1">
                            ¿Olvidaste tu contraseña?
                        </Link>
                        <View flexDir={'row'} mb={2}>
                            <TouchableOpacity onPress={() => {
                                setOpenLinkedIn(true);
                                setToken('');
                            }}
                                              style={[{flex: 1, alignItems: 'center'}, getShadowCircleStyle(10, 10)]}>
                                <Image source={linkedInImage} w={10} h={10}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity alignItems={'center'} justifyContent={'center'}
                                              style={[{flex: 1, alignItems: 'center'}, getShadowCircleStyle(10, 10)]}>
                                <Image source={facebookImage} w={10} h={10}></Image>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleLoginGoogle} flex={1} alignItems={'center'}
                                              justifyContent={'center'}
                                              style={[{flex: 1, alignItems: 'center'}, getShadowCircleStyle(10, 10)]}>
                                <Image source={googleImage} w={10} h={10}></Image>
                            </TouchableOpacity>
                        </View>

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

                { openLinkedIn &&
                    <SafeAreaView style={{flex: 1}}>
                        <View style={stylesLI.container2}>
                            <WebView style={stylesLI.wv}
                                source={{uri: AUTH_ENDPOINT}}
                                javaScriptEnabled
                                domStorageEnabled
                                onNavigationStateChange={linkedInLogin}
                                >
                            </WebView>
                        </View>
                    </SafeAreaView>
                }
                {!openLinkedIn && <FormLogin/>}
            </Center>
        </NativeBaseProvider>
    );
};

const stylesLI = StyleSheet.create({
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        marginTop: 30,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
      },
      modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#00ff00',
        width: Dimensions.get("window").width,
      },
      text: {
        color: '#3f2949',
        marginTop: 10,
      },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    wv: {
      flex: 1,
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      //marginVertical: 20,
      borderWidth: 1,
      borderColor: '#333'
    },
    mv: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'rgba(0,0,0,0.7)'
    },
    modalView: {
        height: 'auto',
        width:'92%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        //fontFamily: 'LinotteBold',
        fontSize: 20,
        //color: Colors.purple

    }
  });
