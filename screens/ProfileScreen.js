import React from "react";
import {ScrollView} from "react-native";
import {connect} from "react-redux";
import {Button, Checkbox, FormControl, HStack, Icon, Input, Stack, Text, View} from "native-base";


const ProfileScreen = ({authDuck, navigation}) => {

    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={{backgroundColor: '#F2F2F2'}}>

            <View style={{width: 150, height: 150, alignSelf: 'center', alignItems: 'center'}} mt={5} mb={20}>
                <View mb={5}>
                    <Text>Perfil</Text>
                </View>
                <View width={'100%'} height={'100%'} bgColor={'white'} alignItems={'center'} justifyContent={'center'}
                      borderRadius={100} borderWidth={2}
                      borderColor={"red.200"}>
                    <Icon type="FontAwesome" name="home" color={'red.200'}/>

                </View>
            </View>
            <View flex={1} alignItems={'center'}>
                <Stack space={4} w="90%">
                    <FormControl isInvalid w="100%">
                        <FormControl.Label>User Name</FormControl.Label>
                        <Input variant="underlined" size="md" mb={2}/>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input variant="underlined" size="md" mb={6}/>
                        <HStack direction={{
                            base: "column",
                            md: "row"
                        }} space={3} alignItems="flex-start">
                            <Checkbox value="danger" colorScheme="danger" defaultIsChecked>
                                Danger
                            </Checkbox>
                            <Checkbox value="info" colorScheme="info" defaultIsChecked>
                                Info
                            </Checkbox>
                            <Checkbox value="orange" colorScheme="orange" defaultIsChecked>
                                Orange
                            </Checkbox>
                            <Checkbox value="purple" colorScheme="purple" defaultIsChecked>
                                Purple
                            </Checkbox>
                        </HStack>
                        <Button colorScheme={'red'} onPress={() => {
                        }} mb={2}>Registrarme</Button>
                        <HStack space={6}>
                            <Checkbox shadow={2} value="test" accessibilityLabel="This is a dummy checkbox"
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