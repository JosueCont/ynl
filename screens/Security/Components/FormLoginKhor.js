import * as React from "react";
import {Button, FormControl, Image, Input, ScrollView, Text, View} from "native-base";
import logo from '../../../assets/YNL.gif'
import {useFormik} from 'formik';
import * as Yup from 'yup'
import {getShadowCircleStyle} from "../../../utils/functions";
import {Colors} from "../../../utils/Colors";


export default ({onRegister, loading,step,...props}) => {


    const {handleSubmit, errors, setFieldValue, touched} = useFormik({
        initialValues: {
            identifier: '',
            password:''
        },
        onSubmit: (formValue) => {
            onRegister(formValue)
        },
        validateOnChange: false,
        validationSchema: Yup.object({
            identifier: Yup.string().email("El email no es correcto").required("El email es obligatorio"),
            password: step ===2 &&  Yup.string().required("La contraseña es obligatoria"),
        }),
        enableReinitialize: false
    });


    return (
        <ScrollView _contentContainerStyle={{flexGrow: 1}} flex={1} mx={6}>

            <View flex={1}>
                <Image source={logo} alt="img"/>
            </View>
            <View flex={1}>
                <View flex={1}>
                    <Text fontSize={16} textAlign={'center'} mb={4}>Ingresa tu usuario Khor</Text>
                    <FormControl isInvalid={errors.email} mb={3}>
                        <Input
                            borderRadius={20}
                            height={50}
                            placeholder={'Correo electrónico'}
                            autoCapitalize="none"
                            onChangeText={text => setFieldValue('identifier', text)}
                            value={touched.identifier}
                            autoCorrect={false}
                        />
                        <FormControl.ErrorMessage>
                            {errors.identifier}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    {
                       step===2 &&  <FormControl isInvalid={errors.password} mb={2}>
                            <View flex={1} style={getShadowCircleStyle(5, 5)}>
                                <Input
                                    height={50}
                                    placeholder={'Contraseña'}
                                    type="password"
                                    onChangeText={text => setFieldValue('password', text)}
                                    value={touched.password}
                                    returnKeyType={'done'}
                                    bgColor={'white'}
                                    borderRadius={20}
                                    color={Colors.red}
                                />
                            </View>
                            <FormControl.ErrorMessage>
                                {errors.password}
                            </FormControl.ErrorMessage>

                        </FormControl>
                    }

                    <Button isLoading={loading} mt="2" onPress={handleSubmit} colorScheme="orange">
                        Continuar
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
};
