import React, {useEffect, useState} from "react";
import {Button, FormControl, Image, Input, Text, View, Checkbox, Spacer} from "native-base";
import logo from '../../assets/new_logo.png'
import {useFormik} from 'formik';
import * as Yup from 'yup'
import {t} from "i18n-js";
import {Linking, TouchableOpacity} from 'react-native';
import {getShadowCircleStyle} from "../../utils/functions";
import {Colors} from "../../utils/Colors";
import InputField from '../InputField';

export default ({onRegister, loading}) => {

    const [privacidad, setPrivacidad] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: ''
        },
        onSubmit: (formValue) => {
            onRegister(formValue)
        },
        validateOnChange: false,
        validationSchema: Yup.object({
            email: Yup.string().email("El email no es correcto").required("El email es obligatorio."),
            password: Yup.string().required("La contraseña es obligatoria").min(8, "La contraseña debe ser de al menos 8 caracteres."),
            repeatPassword: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref('password')], "Las contraseñas tienen que ser iguales."),
        })
    });

    return (
      <View flex={1}>
        <View flex={0.5}>
          <Image
              style={{ alignSelf: 'center' }}
              height={77}
              width={77}
              source={logo} alt="YNL" />
        </View>
        <View flex={1} mx={6}>
          <Text fontSize={16} textAlign={"center"} mb={4}>
            {t("login_register")}
          </Text>
          <View>
            <FormControl isInvalid={formik.errors.email} mb={3}>
              <InputField
                name="email"
                formik={formik}
                borderRadius={20}
                height={50}
                autoCapitalize="none"
                placeholder={t("email")}
                autoCorrect={false}
              />
              {/* <Input
                            borderRadius={20}
                            height={50}
                            autoCapitalize="none"
                            onChangeText={text => formik.setFieldValue('email', text.trim())}
                            placeholder={t('email')}
                            autoCorrect={false}
                        /> */}
              <FormControl.ErrorMessage>
                {formik.errors.email}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.password} mb={3}>
              <InputField
                name="password"
                formik={formik}
                borderRadius={20}
                height={50}
                type="password"
                placeholder={t("password")}
              />
              {/* <Input
                borderRadius={20}
                height={50}
                type="password"
                placeholder={t("password")}
                onChangeText={(text) =>
                  formik.setFieldValue("password", text.trim())
                }
              /> */}
              <FormControl.ErrorMessage>
                {formik.errors.password}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.repeatPassword} mb={3}>
              <InputField
                name="repeatPassword"
                formik={formik}
                borderRadius={20}
                height={50}
                type="password"
                placeholder={t("profile_confirm_password")}
              />
              {/* <Input
                borderRadius={20}
                height={50}
                type="password"
                placeholder={t("profile_confirm_password")}
                onChangeText={(text) =>
                  formik.setFieldValue("repeatPassword", text.trim())
                }
              /> */}
              <FormControl.ErrorMessage>
                {formik.errors.repeatPassword}
              </FormControl.ErrorMessage>
            </FormControl>
            <View
              flexDirection={"row"}
              style={{ paddingTop: 10, paddingBottom: 10 }}
            >
              <Checkbox
                colorScheme="orange"
                size={"md"}
                isChecked={privacidad}
                onChange={(v) => {
                  setPrivacidad(v);
                }}
              >
                <Text size={"md"}>{" He leído y acepto el "}</Text>
              </Checkbox>

              <Text
                underline
                size={"md"}
                onPress={() =>
                  Linking.openURL("https://www.grupohuman.com/aviso-privacidad")
                }
              >
                aviso de privacidad
              </Text>
            </View>

            <TouchableOpacity
              onPress={formik.handleSubmit}
              disabled={!privacidad}
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "black",
                borderRadius: 10,
                marginBottom: 15,
                opacity: privacidad ? 1 : 0.5,
              }}
            >
              <Text
                color={Colors.white}
                isLoading={loading}
                fontSize={"md"}
                textAlign={"center"}
                marginY={"auto"}
              >
                {t("continue")}
              </Text>
            </TouchableOpacity>

            {/*<Button isLoading={loading} mt="2" disabled={!privacidad}*/}
            {/*        onPress={formik.handleSubmit} colorScheme={privacidad?'orange':'gray'}>*/}
            {/*    {t('continue')}*/}
            {/*</Button>*/}
          </View>
        </View>
      </View>
    );
};
