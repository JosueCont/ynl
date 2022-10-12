import React from "react";
import {Avatar, Box, Button, FlatList, HStack, Spacer, Text, VStack, ScrollView} from "native-base";
import {Ionicons} from "@expo/vector-icons";
import {connect} from "react-redux";
import {t} from 'i18n-js';
import {getUsersByUserName} from "../../../redux/ducks/groupDuck";
import {TouchableOpacity} from "react-native";
import NoDataIcon from "../../../components/Shared/NoDataIcon";

const GroupsListUsers = ({usersSelected, groupDuck, registerGroup, isUserSelected, addUserToList,adding, isAddMembers}) => {
    return (
        <VStack w={'100%'} flex={1}>
            <HStack mb={5} w={'100%'}>
                <ScrollView _contentContainerStyle={{alignItems: 'center', backgroundColor: 'white'}} horizontal={true}>
                    {
                        usersSelected && usersSelected.map((ele, i) => {
                            return (
                                <Text key={i} borderRadius={20}
                                        style={{backgroundColor: '#FD5535', padding: 5, color: 'white'}} fontSize={10}
                                        ml={1}>
                                    {ele.username}
                                </Text>
                            )
                        })
                    }
                </ScrollView>
            </HStack>




            <FlatList style={{height:400}} ListEmptyComponent={<NoDataIcon text={t('groups_no_find_friends')}/>} data={groupDuck.users} renderItem={({item}) =>
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
                                    <Ionicons size={20} color={'red'} name="ios-checkmark-circle"/>
                                    : <Ionicons size={20} color={'red'} name="ios-radio-button-off-outline"/>
                            }
                        </HStack>
                    </TouchableOpacity>

                </Box>} keyExtractor={item => item.id}/>
                
            {isAddMembers && <Button isLoading={adding} onPress={registerGroup} isDisabled={usersSelected.length <= 0} size="lg" colorScheme={'orange'}
                    m={3}>
                {t('add')}
            </Button>}
            {!isAddMembers && <Button isLoading={adding} onPress={registerGroup} isDisabled={usersSelected.length <= 0} size="lg" colorScheme={'orange'}
                    m={3}>
                {t('create')}
            </Button>}
        </VStack>
    )
}


const mapState = (state) => {
    return {
        authDuck: state.authDuck,
        groupDuck: state.groupDuck
    }
}


export default connect(mapState, {getUsersByUserName})(GroupsListUsers);
