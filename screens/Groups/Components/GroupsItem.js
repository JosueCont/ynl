import {Icon, Text, View} from "native-base";
import {Colors} from "../../../utils/Colors";
import {TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

const GroupsItem = ({groupId, title, navigation, acceptInvite = false, token = null, acceptAction, deleteAction}) => {
    return (
        <TouchableOpacity style={{flex: 1}} disabled={acceptInvite}
                          onPress={() => navigation.navigate('GroupsDetailsScreen', {groupId: groupId})}>
            <View flexDir={'row'} my={3} borderBottomWidth={0.5} borderBottomColor={Colors.red} mx={2} pb={4}>
                <View flex={0.4} alignItems={'center'} justifyContent={'center'}>

                    <View style={{width: 35, height: 35}} backgroundColor={Colors.red} borderRadius={20}
                          alignItems={'center'} justifyContent={'center'}>
                        <Icon as={MaterialIcons} name={'group'} color={'white'} fontSize={20}></Icon>
                    </View>

                </View>
                <View flex={1} justifyContent={'center'}>
                    <Text fontSize={16} color={Colors.red}>{title}</Text>
                </View>
                {
                    acceptInvite === true ?
                        <View flex={0.4} flexDir={'row'}>

                            <View flex={1} alignItems={'center'} justifyContent={'center'}>
                                <TouchableOpacity onPress={() => acceptAction(token, 1)} style={{
                                    height: 25,
                                    width: 25,
                                    backgroundColor: Colors.red,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 15
                                }}>
                                    <Icon as={MaterialIcons} name={'check'} color={'white'} fontSize={14}></Icon>
                                </TouchableOpacity>
                            </View>
                            <View flex={1} alignItems={'center'} justifyContent={'center'}>
                                <TouchableOpacity onPress={() => acceptAction(token, 0)} style={{
                                    height: 25,
                                    width: 25,
                                    backgroundColor: Colors.red,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 15
                                }}>
                                    <Icon as={MaterialIcons} name={'close'} color={'white'} fontSize={14}></Icon>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <View flex={0.4} flexDir={'row'}>

                            <View flex={1} alignItems={'center'} justifyContent={'center'}>

                            </View>
                            <View flex={1} alignItems={'center'} justifyContent={'center'}>
                                <TouchableOpacity onPress={() => deleteAction(groupId)} style={{
                                    height: 25,
                                    width: 25,
                                    backgroundColor: Colors.red,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 15
                                }}>
                                    <Icon as={MaterialIcons} name={'close'} color={'white'} fontSize={14}></Icon>
                                </TouchableOpacity>
                            </View>
                        </View>
                }


            </View>
        </TouchableOpacity>
    )
}

export default GroupsItem;