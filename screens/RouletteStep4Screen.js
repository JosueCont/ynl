import React, {useEffect, useState} from "react";
import {Button, Image, KeyboardAvoidingView, ScrollView, Text, TextArea, View} from "native-base";
import {connect} from "react-redux";
import {Keyboard, Platform, TouchableWithoutFeedback} from "react-native";
import {getDay, translateEmotions} from '../utils/functions'
import {saveEmotion} from "../redux/ducks/feelingsDuck";
import ScreenBaseV1 from "./Components/ScreenBaseV1";
import _ from "lodash";
import {t} from 'i18n-js';
import {Colors} from "../utils/Colors";
import {emotionStatusAction} from "../redux/ducks/authDuck";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import Style from '../utils/styles'
import { useFonts } from 'expo-font';

const RouletteStep4Screen = ({navigation, route, saveEmotion, authDuck, emotionStatusAction}) => {

    const [fontsLoaded] = useFonts({
      'SultanNahia': require('../assets/fonts/SultanNahia.ttf'),
      'Amberla': require('../assets/fonts/Amberla.otf'),
    }); 
    const [loading, setLoading] = useState(false)
    const [comment, setComment] = useState("")

    useEffect(() => {
        console.log("route.params.color =====>", route.params);
        /* navigation.setOptions({
            headerStyle: {backgroundColor: '#' + route.params.color}
        }) */
        setComment("")
    }, [route.params.emotion.id])

    const saveFeelings = async () => {
        try {
            setLoading(true)

            let data = {
                label: route.params.emotion.attributes.name,
                feeling: route.params.emotion.id,
                user: authDuck.user.id,
                comments: comment?.trim(),
            }
            if (authDuck?.userSiteConfig?.id) {
                data.site = authDuck?.userSiteConfig?.id;
            }
            //console.log("🚀 ~ file: RouletteStep4Screen.js ~ line 36 ~ saveFeelings ~ data", data)

            console.log('data===', {data})
            let res = await saveEmotion({data})

            if (res) {
              //console.log("🚀 ~ file: RouletteStep4Screen.js ~ line 42 ~ saveFeelings ~ userSiteConfig", userSiteConfig)
              if (authDuck.userSiteConfig?.id) {
                await emotionStatusAction(authDuck.user.id, authDuck.userSiteConfig)
              }
              else{
                await emotionStatusAction(authDuck.user.id)
              }
                
                navigation.reset({
                    index: 0,
                    routes: [{name: 'HomeScreen'}],
                });
            }
        } catch (e) {
            console.log('saveFeelings error =>', e.toString());
        } finally {
            setLoading(false)
        }
    }

    return (
      <ScreenBaseV1 > 
        {/*  color={"#" + route.params.color} */}
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
        <ScrollView showsVerticalScrollIndicator={false}
        >
        <KeyboardAvoidingView
          style={{ flex: 1, width: "100%" }}
          behavior={Platform.OS === "ios" ? "position" : ""}
          keyboardVerticalOffset={100}
        >
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={true}
          >
            <View flex={1} mx={4} style={{ flexDirection: 'column' }}>
              <View flex={1} alignItems={"center"} mt={10}>
                <Text
                  //style={styles.shadow}
                  fontSize={18}
                  textAlign={"center"}
                  color={Colors.black}
                >
                    {t('today')}
                </Text>
                <Text
                fontSize={18}
                 color={Colors.black} style={{marginTop:0}}  textAlign={'center'}>{moment().format('LL')}</Text>
                 
                 <Text
                fontSize={14}
                 color={Colors.black} style={{marginTop:0, marginBottom:-2}}  textAlign={'center'}>{t('i_feel')}</Text>

                <View
                  w={250}
                  h={250}
                  bgColor={"white"}
                  borderRadius={100} 
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  {_.has(
                    route.params,
                    "parent.attributes.animation.data.attributes.url"
                  ) && (
                    <Image
                      source={{
                        uri: route.params.parent.attributes.animation.data
                          .attributes.url,
                      }}
                      style={{
                        width: "80%",
                        height: 250,
                        resizeMode: "contain",
                      }}
                      alt="img"
                    ></Image>
                  )}
                </View>
                {fontsLoaded ? <Text
                  
                  fontSize={50}
                  color={Colors.black}
                  alignContent={"center"} 
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                  style={{fontFamily: 'SultanNahia', marginTop:-20}}
                >{`${
                  route.params.emotion &&
                  translateEmotions(route.params.emotion.attributes.name).toUpperCase()
                }`}</Text> : <Text 
                fontSize={40}
                color={Colors.black}
                alignContent={"center"} 
                numberOfLines={1}
                adjustsFontSizeToFit={true}
              >{`${
                route.params.emotion &&
                translateEmotions(route.params.emotion.attributes.name).toUpperCase()
              }`}</Text>}

                {/* <View
                  mb={6}
                  style={{ height: 100, width: 100, borderColor: "orange", borderWidth: 0.5 }}
                  bgColor={"#fff"}
                  borderRadius={10}
                  overflow={"hidden"}
                >
                  <View flex={1} bgColor={"#ff0000"} p={1}>
                    <Text
                      textAlign={"center"}
                      color={"white"}
                      fontSize={12}
                      style={{ fontWeight: "bold" }}
                    >
                      {moment().format('MMMM')}
                    </Text>
                  </View>
                  <View
                    flex={3}
                    p={1}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Text
                      color={"black"}
                      style={{ fontWeight: "bold" }}
                      fontSize={42}
                    >
                      {getDay()}
                    </Text>
                  </View>
                </View> */}
              </View>

              <View mb={6} alignItems={"center"}>
                <Text
                  //bold
                  color={Colors.black}
                  mt={2}
                  //style={styles.shadow}
                  style={{fontFamily: 'Amberla', fontSize:24, marginTop:5}}
                  mb={2}
                >
                    {t('roulette_share_why')}
                </Text>
                <TextArea
                  h={20}
                  number
                  onChangeText={(text) =>
                    text.length <= 254 && setComment(text)
                  }
                  placeholder={t('write_here')}
                  value={comment}
                  backgroundColor={"#FFF"}
                  borderRadius={18}
                  borderColor={Colors.yellowV2}
                  borderWidth={4}
                  w="75%"
                  maxW="400"
                  returnKeyType={"done"}
                  multiline={true}
                />
                <View style={{ width: "70%" }} flexDirection={"row-reverse"}>
                  <Text fontSize="xs">{comment.length} / 254</Text>
                </View>
              </View>

              <View mb={6} mx={4} style={{ paddingLeft:80, paddingRight:80}}>
                <Button
                  isLoading={loading}
                  size="md"
                  //style={{ borderColor: "orange", borderWidth: 0.5 }}
                  style={Style.buttonGray}
                  shadow={5}
                  colorScheme={"orange"}
                  onPress={() => saveFeelings()}
                >
                    {t('roulette_get_into')}
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
        </SafeAreaView>
      </ScreenBaseV1>
    );
}

const mapState = (state) => {
    return {
        productsDuck: state.productsDuck,
        authDuck: state.authDuck
    }
}


const styles = {
    shadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.50)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        paddingTop: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        justifyContent: "center",
        height: 80,
        width: 80,
    },
    textDay: {
        color: 'black',
        fontSize: 30,
        position: 'relative',
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textMonth: {
        color: 'white',
        fontSize: 15,
        marginTop: 10,
        textAlign: 'center'
    }
};


export default connect(mapState, {saveEmotion, emotionStatusAction})(RouletteStep4Screen);