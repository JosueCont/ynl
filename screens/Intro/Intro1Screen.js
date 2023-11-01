import React from "react";
import { ImageBackground } from "react-native";
import bgIntro from "../../assets/bgIntro1.jpg";
import { Image, Text, View } from "native-base";
import { t } from "i18n-js";
import logoSmall from "../../assets/logoSmall.png";
import { Colors } from "../../utils/Colors";

const Intro1Screen = () => {
  return (
    <View flex={1} style={{ backgroundColor: Colors.yellowV2 }}>
      <ImageBackground
        source={bgIntro}
        style={{ flex: 1 }}
        resizeMode={"contain"}
      >
        <View flex={1} alignItems={"center"} justifyContent={"flex-end"}>
          <Image source={logoSmall} alt="img"></Image>
        </View>
        <View flex={1}>
          <Text color={"white"} textAlign={"center"} size={"lg"} px={15} mt={4}>
            {t("intro1_text")}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Intro1Screen;
