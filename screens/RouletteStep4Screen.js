import React, {useEffect, useState} from "react";
import {Button, Image, KeyboardAvoidingView, ScrollView, Text, TextArea, View} from "native-base";
import {connect} from "react-redux";
import {Keyboard, Platform, TouchableWithoutFeedback} from "react-native";
import {getDay, getMonth} from '../utils/functions'
import {saveEmotion} from "../redux/ducks/feelingsDuck";
import ScreenBaseV1 from "./Components/ScreenBaseV1";
import _ from "lodash";
import {t} from 'i18n-js';
import {emotionStatusAction} from "../redux/ducks/authDuck";
import { SafeAreaView } from "react-native-safe-area-context";

const RouletteStep4Screen = ({navigation, route, saveEmotion, authDuck, emotionStatusAction}) => {

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
      <ScreenBaseV1 color={"#" + route.params.color}>
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
                  style={styles.shadow}
                  fontSize={18}
                  textAlign={"center"}
                  color={"white"}
                  mb={4}
                >
                    {t('roulette_today_yourfeel')}
                </Text>

                <View
                  w={200}
                  h={200}
                  bgColor={"white"}
                  borderRadius={100}
                  mb={4}
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
                <Text
                  mb={4}
                  fontSize={40}
                  color={"white"}
                  alignContent={"center"}
                  style={styles.shadow}
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                >{`${
                  route.params.emotion &&
                  route.params.emotion.attributes.name.toUpperCase()
                }`}</Text>

                <View
                  mb={6}
                  style={{ height: 100, width: 100 }}
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
                      {getMonth()}
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
                </View>
              </View>

              <View mb={6} alignItems={"center"}>
                <Text
                  bold
                  color={"#FFF"}
                  mt={2}
                  style={styles.shadow}
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
                  value={comment}
                  backgroundColor={"#FFF"}
                  borderRadius={10}
                  w="90%"
                  maxW="400"
                  returnKeyType={"done"}
                  multiline={true}
                />
                <View style={{ width: "90%" }} flexDirection={"row-reverse"}>
                  <Text fontSize="xs">{comment.length} / 254</Text>
                </View>
              </View>

              <View mb={6} mx={4}>
                <Button
                  isLoading={loading}
                  size="md"
                  style={{ borderColor: "orange", borderWidth: 0.5 }}
                  shadow={5}
                  colorScheme={"orange"}
                  onPress={() => saveFeelings()}
                >
                    {t('roulette_finish')}
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