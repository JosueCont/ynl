import React, { useEffect, useState } from "react";
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
  Spinner,
  Text,
  View,
  VStack,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
//import * as Google from 'expo-google-app-auth';
import * as Google from "expo-auth-session/providers/google";
import { getShadowCircleStyle, resolvePlatform } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import loginImage from "../../assets/login.png";
import linkedInImage from "../../assets/linkedin.png";
import iconKhor from "../../assets/khoricon.png";
import googleImage from "../../assets/google.png";
import appleImage from "../../assets/iconapple.png";
import i18n, { t } from "i18n-js";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import WebView from "react-native-webview";
import querystring from "querystring";
import InputField from "../InputField";
import { color } from "react-native-reanimated";

export default (props) => {
  const navigation = useNavigation();
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [token, setToken] = useState("");
  const [openLinkedIn, setOpenLinkedIn] = useState(false);
  const [request, responseGoogle, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "139145047906-9r09uc555jsi528qnrbjs440g84h1okt.apps.googleusercontent.com",
    androidClientId:
      "139145047906-u7lpmp4vuhk0cd3hc88f3k8tv9afe01b.apps.googleusercontent.com",
    expoClientId:
      "139145047906-8teh3chgt6as7mnhg7c5mrco0fka7bea.apps.googleusercontent.com",
  });
  const [accessToken, setAccessTockenGoogle] = useState();
  const REDIRECT_URI = "https://ynl-api.herokuapp.com/api/connect/linkedin/"; // this needs to be the same as your linkedin app panel
  const CLIENT_ID = "86mom3hfgl2rvj"; // you can get it from the linked in apps panel
  const CLIENT_SECRET = "z7YYg1E3i39fI9Kf"; // you can get it from the linked in apps panel
  const AUTH_BASE = "https://www.linkedin.com/oauth/v2/authorization";
  //https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86mom3hfgl2rvj&redirect_uri=https://ynl-api.herokuapp.com/api/connect/linkedin/&state=foobar&scope=r_liteprofile
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (formValue) => {
      props.onLogin(formValue);
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("error_email_invalid"))
        .required(t("error_email_required")),
      password: Yup.string().required(t("error_password_required")),
    }),
  });
  // const {touched, handleSubmit, errors, setFieldValue} = useFormik({
  //     initialValues: {
  //         email: '',
  //         password: ''
  //     },
  //     onSubmit: (formValue) => {
  //         props.onLogin(formValue)
  //     },
  //     validateOnChange: false,
  //     validationSchema: Yup.object({
  //         email: Yup.string().email(t('error_email_invalid')).required(t('error_email_required')),
  //         password: Yup.string().required(t('error_password_required')),
  //     })
  // });

  const qs = [
    `response_type=code`,
    `client_id=${CLIENT_ID}`,
    `redirect_uri=${REDIRECT_URI}`,
    `state=123456`,
    `scope=r_liteprofile`,
  ];
  const AUTH_ENDPOINT = `${AUTH_BASE}?${qs.join("&")}`;
  const linkedInLogin = ({ url }) => {
    if (!url) return;
    console.log(url);
    //The browser has redirected to our url of choice, the url would look like:
    //http://your.redirect.url?code=<access_token>&state=<anyauthstate-this-is-optional>
    const matches = url.match(REDIRECT_URI);
    const matchesRed = url.match("ynl-api.herokuapp");
    const matchesCancel = url.match("login-cancel");
    const matchesRedirect = url.match("session_redirect");
    const matchesAuthCancel = url.match("authorization-cancel");
    const matchesLogin = url.match("session_redirect");
    console.log("MATCHES::: " + matches);
    console.log("MATCHES CANCEL:::" + matchesCancel);
    console.log("MATCHES AUTHCANCEL:::" + matchesAuthCancel);
    console.log("MATCHES REDIR:::" + matchesRed);
    console.log("MATCHES LOGIN:::" + matchesLogin);
    console.log("TOKEN:::" + token);

    if ((matchesCancel || matchesAuthCancel) && matchesLogin == null) {
      console.log(matchesLogin == null);
      setOpenLinkedIn(false);
      return;
    }

    if ((matches || matchesRed) && token == "") {
      // We have the correct URL, parse it out to get the token
      const obj = querystring.parse(url.split("?").pop());
      console.log("OBJ::" + JSON.stringify(obj));
      if (obj.code) {
        console.log(obj.code);
        setToken(obj.code);
        props.onLoginLinked(obj.code);
        setOpenLinkedIn(false);
      }
      if (obj.access_token) {
        console.log(obj.access_token);
        setToken(obj.access_token);
        props.onLoginLinked(obj.access_token);
        setOpenLinkedIn(false);
      }

      if (obj.error) {
        setOpenLinkedIn(false);
      }
    }
  };

  useEffect(() => {
    if (responseGoogle?.type === "success") {
      setAccessTockenGoogle(responseGoogle.authentication.idToken);
      getUserData(responseGoogle.authentication.idToken);
    }
  }, [responseGoogle]);

  const getUserData = async (idToken) => {
    try {
      setGoogleSubmitting(true);
      // console.log(responseGoogle.authentication.state);
      // let userInfo = await fetch(`https://www.googleapis.com/userinfo/v2/me/`,{ //${response.authentication.state}?personFields=birthdays,genders&access_token=${response.authentication.accessToken}
      //     headers: {Authorization: `Bearer ${responseGoogle.authentication.accessToken}`}
      // })
      // let UserDataGoogle;
      await props.onLoginGoogle(idToken);
      setGoogleSubmitting(false);
      // userInfo.json().then(data=>{
      //     // UserDataGoogle = data;
      //     // setGoogleSubmitting(false);
      //     // console.log(data)
      // }).catch(e => {
      //     console.log('FormLogin userInfo error => ',e.toString())
      // })
    } catch (e) {
      console.log("FormLogin getUserData error => ", e.toString());
    }
  };

  const handleLoginGoogle = async () => {
    try {
      setGoogleSubmitting(true);
      const config = {
        iosClientId: `139145047906-9r09uc555jsi528qnrbjs440g84h1okt.apps.googleusercontent.com`,
        androidClientId: `139145047906-u7lpmp4vuhk0cd3hc88f3k8tv9afe01b.apps.googleusercontent.com`,
        scopes: ["profile", "email"],
      };
      const { type, accessToken, user } = await Google.logInAsync(config);
      if (type === "success") {
        const { email, name, photoUrl } = user;
        console.log("userData", email, name, photoUrl);
        console.log("accessToken", accessToken);
        props.onLoginGoogle(accessToken);
      } else {
        let texterror = t("login_canceled");
        alert(texterror);
      }
    } catch (e) {
      console.log("handleLoginGoogle error =>", e.toString());
    } finally {
      setGoogleSubmitting(false);
    }
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} px="1">
        {openLinkedIn && (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={stylesLI.container2}>
              <WebView
                style={stylesLI.wv}
                source={{ uri: AUTH_ENDPOINT }}
                javaScriptEnabled
                domStorageEnabled
                onNavigationStateChange={linkedInLogin}
              ></WebView>
            </View>
          </SafeAreaView>
        )}
        {!openLinkedIn && (
          <ScrollView p={10} px={5} bounces={false} flexGrow={1} width={"85%"}>
            <View flex={0.3} alignItems={"center"} justifyContent={"center"}>
              <Image
                source={loginImage}
                style={{ resizeMode: "contain" }}
                w={resolvePlatform(250, 200)}
                h={resolvePlatform(250, 200)}
                alt="img"
              />
            </View>
            <View flex={1}>
              <Text textAlign={"center"} fontSize={42}>
                {t("login_hello")}
              </Text>
              <Text textAlign={"center"} color={Colors.yellowV2} fontSize={24}>
                {t("login_how_are_you")}
              </Text>
              <VStack space={3} mt="5">
                <FormControl isInvalid={formik.errors.email} mb={2}>
                  <View flex={1} style={getShadowCircleStyle(5, 5)}>
                    <InputField
                      name="email"
                      formik={formik}
                      height={50}
                      autoCapitalize="none"
                      placeholder={t("email")}
                      autoCorrect={false}
                      // onChangeText={text => setFieldValue('email', text.trim())}
                      returnKeyType={"done"}
                      bgColor={"white"}
                      borderRadius={20}
                    />
                    {/* <Input
                                            height={50}
                                            autoCapitalize="none"
                                            placeholder={t('email')}
                                            autoCorrect={false}
                                            onChangeText={text => setFieldValue('email', text.trim())}
                                            value={touched.email}
                                            returnKeyType={'done'}
                                            bgColor={'white'}
                                            borderRadius={20}
                                        /> */}
                  </View>
                  <FormControl.ErrorMessage>
                    {formik.errors.email}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.errors.password} mb={2}>
                  <View flex={1} style={getShadowCircleStyle(5, 5)}>
                    <InputField
                      name="password"
                      formik={formik}
                      height={50}
                      placeholder={t("password")}
                      type="password"
                      returnKeyType={"done"}
                      bgColor={"white"}
                      borderRadius={20}
                    />
                    {/* <Input
                        height={50}
                        placeholder={t("password")}
                        type="password"
                        onChangeText={(text) =>
                          setFieldValue("password", text.trim())
                        }
                        value={touched.password}
                        returnKeyType={"done"}
                        bgColor={"white"}
                        borderRadius={20}
                      /> */}
                  </View>
                  <FormControl.ErrorMessage>
                    {formik.errors.password}
                  </FormControl.ErrorMessage>
                </FormControl>
                <Button
                  mt={2}
                  mb={1}
                  isLoading={props.loading}
                  isLoadingText={t("starting")}
                  onPress={formik.handleSubmit}
                  backgroundColor={Colors.black}
                >
                  {t("login_session")}
                </Button>

                <HStack justifyContent={"center"}>
                  <Link
                    onPress={() =>
                      navigation.navigate("PasswordRecoveryScreen")
                    }
                    mb={4}
                    _text={{
                      fontSize: "xs",
                      fontWeight: "500",
                      color: Colors.yellowV2,
                    }}
                    alignSelf="flex-end"
                    mt="1"
                  >
                    <Text style={{color: Colors.yellowV2, fontSize:12}}>{t("login_forgot_password")}</Text>
                  </Link>
                </HStack>
                <HStack justifyContent="center">
                  
                  <Button
                    size="sm"
                    onPress={() => navigation.navigate("Register")}
                    variant="link"
                  >
                    <Text style={{color: Colors.yellowV2}}>{t("login_register")}</Text>
                  </Button>
                </HStack>
                <View flexDir={"row"} mb={2}>
                  <TouchableOpacity
                    onPress={() => {
                      setToken("");
                      navigation.navigate("SiteListKhor");
                    }}
                    style={[
                      {
                        flex: 1,
                        alignItems: "center",
                      },
                      getShadowCircleStyle(10, 10),
                    ]}
                  >
                    <Image source={iconKhor} w={10} h={10} alt="img"></Image>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      promptAsync({ showInRecents: true });
                    }}
                    flex={1}
                    alignItems={"center"}
                    justifyContent={"center"}
                    style={[
                      {
                        flex: 1,
                        alignItems: "center",
                      },
                      getShadowCircleStyle(10, 10),
                    ]}
                  >
                    <Image source={googleImage} w={10} h={10} alt="img"></Image>
                  </TouchableOpacity>

                  {Platform.OS === "ios" && (
                    <TouchableOpacity
                      onPress={props.onLoginApple}
                      flex={1}
                      alignItems={"center"}
                      justifyContent={"center"}
                      style={[
                        {
                          flex: 1,
                          alignItems: "center",
                        },
                        getShadowCircleStyle(10, 10),
                      ]}
                    >
                      <Image
                        source={appleImage}
                        w={10}
                        h={10}
                        alt="img"
                      ></Image>
                    </TouchableOpacity>
                  )}

                  {/*{*/}
                  {/*    Platform.OS ==='ios' &&*/}
                  {/*     <AppleAuthentication.AppleAuthenticationButton*/}
                  {/*        buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}*/}
                  {/*        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}*/}
                  {/*        cornerRadius={3}*/}
                  {/*        style={styles.appleButton}*/}
                  {/*        onPress={() => this.loginWithApple()}*/}
                  {/*    />*/}

                  {/*}*/}
                </View>
              </VStack>
            </View>
          </ScrollView>
        )}
      </Center>
    </NativeBaseProvider>
  );
};

const stylesLI = StyleSheet.create({
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    marginTop: 30,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#00ff00",
    width: Dimensions.get("window").width,
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  wv: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    borderWidth: 1,
    borderColor: "#333",
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalView: {
    height: "auto",
    width: "92%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
});
