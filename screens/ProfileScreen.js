import React from "react";
import {ScrollView} from "react-native";
import {connect} from "react-redux";
import {Button, Checkbox, FormControl, HStack, Icon, Input, Stack, Text, View} from "native-base";
import {Entypo} from "@expo/vector-icons";


const ProfileScreen = ({authDuck, navigation}) => {

    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={{backgroundColor: '#F2F2F2'}}>

            <View style={{width: 150, height: 150, alignSelf: 'center', alignItems: 'center'}} mt={5} mb={20}>
                <View mb={5}>
                    <Text fontSize={20}>Perfil</Text>
                </View>
                <View width={'100%'} height={'100%'} bgColor={'white'} alignItems={'center'} justifyContent={'center'}
                      borderRadius={100} borderWidth={2}
                      borderColor={"red.200"}>
                    <Icon as={Entypo} name="camera" size={8}/>

                </View>
            </View>
            <View flex={1} alignItems={'center'}>
                <Stack space={4} w="90%">
                    <FormControl isInvalid w="100%">
                        <FormControl.Label>Username</FormControl.Label>
                        <Input variant="underlined" size="md" mb={2}/>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input variant="underlined" size="md" mb={6}/>
                        <FormControl.Label>Teléfono</FormControl.Label>
                        <Input variant="underlined" size="md" mb={6}/>
                        <View flexDir={'row'} justifyContent={'space-between'} mb={4}>
                            <Checkbox value="danger" colorScheme="orange" defaultIsChecked>
                                Mujer
                            </Checkbox>
                            <Checkbox value="info" colorScheme="orange" defaultIsChecked>
                                Hombre
                            </Checkbox>
                            <Checkbox value="orange" colorScheme="orange" defaultIsChecked>
                                Prefiero no decir
                            </Checkbox>
                        </View>
                        <Button colorScheme={'red'} onPress={() => {
                        }} mb={4}>Registrarme</Button>
                        <HStack space={6}>
                            <Checkbox shadow={2} value="test" colorScheme={'orange'}
                                      accessibilityLabel="This is a dummy checkbox"
                                      defaultIsChecked>
                                No compartir mis datos con mis grupos
                            </Checkbox>
                        </HStack>
                    </FormControl>

                </Stack>
            </View>
        </ScrollView>
    )
}

const mapState = (state) => {
    return {}
}


export default connect(mapState)(ProfileScreen);