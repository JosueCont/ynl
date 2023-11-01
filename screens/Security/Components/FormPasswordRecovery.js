import * as React from "react";
import {
  Button,
  FormControl,
  Image,
  Input,
  ScrollView,
  Text,
  View,
} from "native-base";
import logo from "../../../assets/new_logo.png";
import { useFormik } from "formik";
import { t } from "i18n-js";
import * as Yup from "yup";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../../utils/Colors";
import InputField from "../../../components/InputField";

export default ({ onRegister, loading }) => {
  const formik = useFormik({
    //const {handleSubmit, errors, setFieldValue, touched}
    initialValues: {
      email: "",
    },
    onSubmit: (formValue) => {
      onRegister(formValue);
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("error_email_invalid"))
        .required(t("error_email_required")),
    }),
    enableReinitialize: false,
  });

  return (
    <ScrollView _contentContainerStyle={{ flexGrow: 1,paddingTop:100 }} flex={1} mx={6}>
      <View flex={0.5} >
        <Image
            style={{ alignSelf: 'center',marginBottom:20 }}
            width={70}
            height={70}
            source={logo} alt="img" />
      </View>
      <View flex={1}>
        <View flex={1}>
          <Text fontSize={16} textAlign={"center"} mb={4}>
            {t("login_recover_password")}
          </Text>
          <FormControl isInvalid={formik.errors.email} mb={3}>
            <InputField
              name="email"
              formik={formik}
              borderRadius={20}
              height={50}
              placeholder={t("email")}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {/* <Input
                            borderRadius={20}
                            height={50}
                            placeholder={t('email')}
                            autoCapitalize="none"
                            onChangeText={text => setFieldValue('email', text)}
                            value={touched.email}
                            autoCorrect={false}
                        /> */}
            <FormControl.ErrorMessage>
              {formik.errors.email}
            </FormControl.ErrorMessage>
          </FormControl>

          <Button
            isLoading={loading}
            disabled={loading}
            onPress={formik.handleSubmit}
            style={{
              width: "100%",
              height: 40,
              backgroundColor: "black",
              borderRadius: 10,
              marginBottom: 15,
            }}
          >
            <Text
              color={Colors.white}
              //isLoading={loading}
              fontSize={"md"}
              textAlign={"center"}
              marginY={"auto"}
            >
              {t("continue")}
            </Text>
          </Button>

          {/*<Button isLoading={loading} mt="2" onPress={handleSubmit} colorScheme="orange">*/}
          {/*    {t('continue')}*/}
          {/*</Button>*/}
        </View>
      </View>
    </ScrollView>
  );
};
