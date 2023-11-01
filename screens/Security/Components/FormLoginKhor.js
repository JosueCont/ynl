import * as React from "react";
import {
  TouchableOpacity,
} from "react-native";

import {Button, FormControl, Image, Input, ScrollView, Text, View} from "native-base";
import logo from "../../../assets/new_logo.png";
import {useFormik} from 'formik';
import * as Yup from 'yup'
import {getShadowCircleStyle} from "../../../utils/functions";
import {Colors} from "../../../utils/Colors";
import { useEffect } from "react";
import InputField from "../../../components/InputField";

export default ({
  onRegister,
  loading,
  step,
  siteSelected = null,
  sitesLength = 1,
  goStepTwo,
  setEmail,
  email,
  ...props
}) => {
  const formik = useFormik({ //const { handleSubmit, errors, setFieldValue, touched }
    initialValues: {
      identifier: "",
      password: "",
    },
    onSubmit: (formValue) => {
      onRegister(formValue);
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      identifier: Yup.string()
        .email("El email no es correcto")
        .required("El email es obligatorio"),
      password:
        step === 3 && Yup.string().required("La contraseña es obligatoria"),
    }),
    enableReinitialize: false,
  });

  useEffect(() => {
    if(email){
      formik.setFieldValue("identifier", email);
    }
  }, [email]);
  
  const prevStep = () => {
    formik.setFieldValue("password", "");
    goStepTwo();
  }



  //console.log("siteSelected", siteSelected);

  return (
    <ScrollView _contentContainerStyle={{ flexGrow: 1 }} flex={1} mx={6}>
      <View flex={0.5} >
        <Image
            style={{ alignSelf: 'center',marginBottom:20,marginTop:50 }}
            width={70}
            height={70}
            source={logo} alt="img" />
      </View>
      {step !== 2 && (
        <View flex={1}>
          <View flex={1}>
            <Text fontSize={16} textAlign={"center"} mb={4}>
              {siteSelected === null
                ? "Ingresa tu usuario Khor"
                : `Ingresa tu cuenta ${siteSelected?.khor_name}`}
            </Text>
            <FormControl isInvalid={formik.errors.email} mb={3}>
            <InputField
              name="identifier"
              formik={formik}
                borderRadius={20}
                height={50}
                placeholder={"Correo electrónico"}
                autoCapitalize="none" 
                setEmail={setEmail}
                defaultValue={email}
                autoCorrect={false}
              />
              {/* <Input
                borderRadius={20}
                height={50}
                placeholder={"Correo electrónico"}
                autoCapitalize="none"
                onChangeText={(text) => {
                  setFieldValue("identifier", text);
                  setEmail(text);
                }}
                value={touched.identifier}
                defaultValue={email}
                autoCorrect={false}
              /> */}
              <FormControl.ErrorMessage>
                {formik.errors.identifier}
              </FormControl.ErrorMessage>
            </FormControl>
            {step === 3 && (
              <FormControl isInvalid={formik.errors.password} mb={2}>
                <View flex={1} style={getShadowCircleStyle(5, 5)}>
                <InputField
                 name="password"
                 formik={formik}
                    height={50}
                    placeholder={"Contraseña"}
                    type="password"
                    returnKeyType={"done"}
                    bgColor={"white"}
                    borderRadius={20}
                    color={Colors.red}
                  />
                  {/* <Input
                    height={50}
                    placeholder={"Contraseña"}
                    type="password"
                    onChangeText={(text) => setFieldValue("password", text)}
                    value={touched.password}
                    returnKeyType={"done"}
                    bgColor={"white"}
                    borderRadius={20}
                    color={Colors.red}
                  /> */}
                </View>
                <FormControl.ErrorMessage>
                  {formik.errors.password}
                </FormControl.ErrorMessage>
              </FormControl>
            )}

            <Button
              isLoading={loading}
              mt="2"
              onPress={formik.handleSubmit}
              colorScheme="darkBlue"
            >
              Continuar
            </Button>
            {sitesLength > 1 && (
              <TouchableOpacity onPress={() => prevStep()}>
                <Text
                  italic
                  underline
                  textAlign={"center"}
                  mt={10}
                  fontSize={"sm"}
                >
                  Seleccionar otro sitio 
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};
