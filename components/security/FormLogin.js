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
    View,
    VStack,
    Modal
} from "native-base";
import logo from '../../assets/YNL.gif'
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import * as Yup from 'yup'
import * as Google from 'expo-google-app-auth';
//import LinkedInModal from 'react-native-linkedin'
import {resolvePlatform} from "../../utils/functions";
import {Colors} from "../../utils/Colors";

import { StyleSheet, Text, View as V, SafeAreaView } from 'react-native';
import WebView from "react-native-webview";
import querystring from 'querystring';
import {Dimensions} from "react-native";



export default (props) => {
    const navigation = useNavigation();
    const [googleSubmitting, setGoogleSubmitting] = useState(false)
    const [token, setToken] = useState('')
    const [openLinkedIn, setOpenLinkedIn] = useState(false) 
    

     const REDIRECT_URI = "https://ynl-api.herokuapp.com/api/connect/linkedin/"; // this needs to be the same as your linkedin app panel 
    const CLIENT_ID = "86mom3hfgl2rvj"; // you can get it from the linked in apps panel
    const CLIENT_SECRET = "z7YYg1E3i39fI9Kf"; // you can get it from the linked in apps panel
    const AUTH_BASE = "https://www.linkedin.com/oauth/v2/authorization";

    

     const qs = [
        `response_type=code`,
        `client_id=${CLIENT_ID}`,
        `scope=r_liteprofile`,
        `state=123456`,
        `redirect_uri=${REDIRECT_URI}`,
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
        const matchesCancel = url.match('login-cancel');
        const matchesRedirect = url.match('session_redirect');
        const matchesAuthCancel = url.match('authorization-cancel');
        console.log("MATCHES::: "+matches);
        console.log("MATCHES CANCEL:::"+ url.match('login-cancel'));

        if(matchesCancel || matchesAuthCancel && !matchesRedirect){
            setOpenLinkedIn(false);
            return; 
        }

        if (matches && matches.length) {
          // We have the correct URL, parse it out to get the token
          const obj = querystring.parse(url.split('?').pop());
          console.log("OBJ::"+JSON.stringify(obj));
          if (obj.code) {
              console.log(obj.code)
              setToken(obj.code);
              setOpenLinkedIn(false);
          }
          if (obj.access_token) {
              console.log(obj.access_token)
              setToken(obj.access_token);
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


        return <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                {/*<Heading flex={1} size="lg" fontWeight="600" color="coolGray.800" _dark={{*/}
                {/*    color: "warmGray.50"*/}
                {/*}}>*/}
                {/*    <VStack flex={1} alignItems={'center'}>*/}
                {/*       */}
                {/*    </VStack>*/}
                {/*</Heading>*/}
                <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                    <Image source={logo} w={resolvePlatform(250, 200)} h={resolvePlatform(250, 200)}/>
                </View>
                <View flex={1}>


                    <Heading mt="1" _dark={{
                        color: "warmGray.200"
                    }} color="coolGray.600" fontWeight="medium" size="xs">
                        Sign in to continue!
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormControl isInvalid={formik.errors.email}>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input autoCapitalize="none"
                                   autoCorrect={false}
                                   onChangeText={text => formik.setFieldValue('email', text)} returnKeyType={'done'}/>
                            <FormControl.ErrorMessage>
                                {formik.errors.email}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.errors.password}>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input type="password"
                                   onChangeText={text => formik.setFieldValue('password', text)}
                                   returnKeyType={'done'}/>
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
                        <Button mt="1" isLoading={props.loading} isLoadingText={'Iniciando'} onPress={handleLoginGoogle}
                                colorScheme="orange">
                            Login con Google
                        </Button>
                        <Button mt="1" isLoading={props.loading} isLoadingText={'Iniciando'} onPress={linkedInLogin}
                                colorScheme="orange">
                            Login con LinkedIn
                        </Button>
                       
                        <HStack justifyContent="center">
                            <Button size="sm" colorScheme={'orange'} onPress={() => navigation.navigate('Register')}
                                    variant="link">
                                Registrarme
                            </Button>
                        </HStack>
                    </VStack> 
                </View>
            </Box>
        </Center>;
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
