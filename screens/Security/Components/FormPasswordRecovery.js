import * as React from "react";
import {Button, FormControl, Image, Input, ScrollView, Text, View} from "native-base";
import logo from '../../../assets/YNL.gif'
import {useFormik} from 'formik';
import * as Yup from 'yup'


export default ({onRegister, loading}) => {


    const {handleSubmit, errors, setFieldValue, touched} = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: (formValue) => {
            onRegister(formValue)
        },
        validateOnChange: false,
        validationSchema: Yup.object({
            email: Yup.string().email("El email no es correcto").required("El email es obligatorio"),
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
                    <Text fontSize={16} textAlign={'center'} mb={4}>Recuperar contraseña</Text>
                    <FormControl isInvalid={errors.email} mb={3}>
                        <Input
                            borderRadius={20}
                            height={50}
                            placeholder={'Correo electrónico'}
                            autoCapitalize="none"
                            onChangeText={text => setFieldValue('email', text)}
                            value={touched.email}
                            autoCorrect={false}
                        />
                        <FormControl.ErrorMessage>
                            {errors.email}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <Button isLoading={loading} mt="2" onPress={handleSubmit} colorScheme="orange">
                        Continuar
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
};
