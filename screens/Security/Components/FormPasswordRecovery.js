import * as React from "react";
import {Button, FormControl, Image, Input, ScrollView, Text, View} from "native-base";
import logo from '../../../assets/YNL.gif'
import {useFormik} from 'formik';
import {t} from 'i18n-js'
import * as Yup from 'yup'
import {TouchableOpacity} from "react-native";
import {Colors} from "../../../utils/Colors";


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
            email: Yup.string().email(t('error_email_invalid')).required(t('error_email_required')),
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
                    <Text fontSize={16} textAlign={'center'} mb={4}>{t('login_recover_password')}</Text>
                    <FormControl isInvalid={errors.email} mb={3}>
                        <Input
                            borderRadius={20}
                            height={50}
                            placeholder={t('email')}
                            autoCapitalize="none"
                            onChangeText={text => setFieldValue('email', text)}
                            value={touched.email}
                            autoCorrect={false}
                        />
                        <FormControl.ErrorMessage>
                            {errors.email}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <TouchableOpacity
                        onPress={handleSubmit} style={{ width:'100%', height:40, backgroundColor: 'black', borderRadius:10, marginBottom:15}}>
                        <Text color={Colors.white} isLoading={loading} fontSize={'md'} textAlign={'center'} marginY={'auto'} >
                            {t('continue')}
                        </Text>
                    </TouchableOpacity>

                    {/*<Button isLoading={loading} mt="2" onPress={handleSubmit} colorScheme="orange">*/}
                    {/*    {t('continue')}*/}
                    {/*</Button>*/}
                </View>
            </View>
        </ScrollView>
    );
};
