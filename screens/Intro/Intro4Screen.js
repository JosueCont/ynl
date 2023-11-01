import React from "react";
import { ImageBackground } from "react-native";
import bgIntro4 from "../../assets/bgIntro4.jpg";
import { Image, Text, View } from "native-base";
import { t } from "i18n-js";
import logoSmall from "../../assets/logoSmall.png";
import { Colors } from "../../utils/Colors";

const Intro4Screen = () => {
  return (
    <View flex={1} style={{ backgroundColor: Colors.yellowV2 }}>
      <ImageBackground
        source={bgIntro4}
        style={{ flex: 1 }}
        resizeMode={"contain"}
      >
        <View flex={1} alignItems={"center"} justifyContent={"flex-end"}>
          <Image source={logoSmall} alt="img"></Image>
        </View>
        <View flex={1}>
          <Text color={"white"} size={"lg"} textAlign={"center"} px={4} mt={4}>
            {t("intro4_text")}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Intro4Screen;
