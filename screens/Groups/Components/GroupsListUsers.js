import React from "react";
import {Avatar, Box, Button, FlatList, HStack, Spacer, Text, VStack} from "native-base";
import {Ionicons} from "@expo/vector-icons";
import {connect} from "react-redux";
import {getUsersByUserName} from "../../../redux/ducks/groupDuck";
import {TouchableOpacity} from "react-native";

const GroupsListUsers = ({usersSelected, groupDuck, registerGroup, isUserSelected, addUserToList}) => {
    return (
        <HStack flex={1} w={'100%'}>
            <VStack w={'100%'}>
                <HStack mb={5} w={'100%'}>
                    {
                        usersSelected && usersSelected.map((ele, i) => {
                            return (
                                <Text borderRadius={20}
                                      style={{backgroundColor: '#FD5535', padding: 5, color: 'white'}} fontSize={10}
                                      ml={1}>
                                    {ele.username}
                                </Text>
                            )
                        })
                    }
                </HStack>

                <Text size={'sm'} mb={4}>Sugerencias</Text>
                <FlatList data={groupDuck.users} renderItem={({item}) =>
                    <Box borderBottomWidth="1" _dark={{
                        borderColor: "gray.600"
                    }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                        <TouchableOpacity onPress={() => addUserToList(item)}>
                            <HStack w={'100%'} space={3} justifyContent="space-between">
                                <Avatar bg={'red.100'} mr={1} size="30px"></Avatar>
                                <VStack>
                                    <Text size={'md'} color="coolGray.800" bold>
                                        {item.username}
                                    </Text>
                                    <Text size={'sm'} color="coolGray.800" bold>
                                        {item.email}
                                    </Text>
                                </VStack>
                                <Spacer/>
                                {
                                    isUserSelected(item) ?
                                        <Ionicons size="20" color={'red'} name="ios-checkmark-circle"/>
                                        : <Ionicons size="20" color={'red'} name="ios-radio-button-off-outline"/>
                                }
                            </HStack>
                        </TouchableOpacity>

                    </Box>} keyExtractor={item => item.id}/>
                <Button onPress={registerGroup} isDisabled={usersSelected.length <= 0} size="lg" colorScheme={'red'}
                        m={3}>
                    Crear
                </Button>
            </VStack>
        </HStack>
    )
}


const mapState = (state) => {
    return {
        authDuck: state.authDuck,
        groupDuck: state.groupDuck
    }
}


export default connect(mapState, {getUsersByUserName})(GroupsListUsers);
