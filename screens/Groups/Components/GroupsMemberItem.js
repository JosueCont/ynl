import {Avatar, Text, View, Badge, Icon} from "native-base";
import imageLogo from '../../../assets/logo.png'
import {Colors} from "../../../utils/Colors";
import {TouchableOpacity} from "react-native";
import {t} from 'i18n-js';
import {MaterialIcons, MaterialCommunityIcons} from "@expo/vector-icons";

const GroupsMemberItem = ({title, pending = true, isOwner, deleteAction, thisOwner, emailConfirmation, thisCurrentUser}) => {
    return (
        (pending && !isOwner)? <></>:  <TouchableOpacity style={{flex: 1}} disabled={true}>
            <View flexDir={'row'} flex={1} my={3} borderBottomWidth={0.5} borderBottomColor={Colors.red} mx={2} pb={4}>
                <View flex={0.2} alignItems={'center'} justifyContent={'center'}>
                    <Icon as={MaterialIcons} name={'account-circle'}  size={'lg'}/>
                </View>
                <View flex={0.8} justifyContent={'center'} alignItems={'flex-start'}>
                    <Text fontSize={12}  color={Colors.red}>{title}</Text>
                    <View flexDir={"row"} flex={1}>
                    {
                        pending && <Badge width={'85%'} colorScheme={"info"}>{pending?t('groups_pending_to_accept'):''}</Badge>
                    }
                    {
                        pending && <TouchableOpacity onPress={() => emailConfirmation()} style={{
                            paddingStart: 5,
                            justifyContent: 'center',
                            borderRadius: 15
                        }}>
                            <MaterialCommunityIcons name="email-send-outline" size={24} color="black" />
                        </TouchableOpacity>
                    }
                    </View>
                    

                </View>
                {((isOwner && !pending && !thisOwner) || (!isOwner && thisCurrentUser)) &&
                        <View flex={0.2} alignItems={'flex-end'} justifyContent={'center'}>
                            <TouchableOpacity onPress={() => {
                                if (!isOwner && thisCurrentUser){
                                    deleteAction(false)
                                }else{
                                    deleteAction(true)
                                }
                            }} style={{
                                height: 25,
                                width: 25,
                                backgroundColor: Colors.red,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 15
                            }}>
                                {
                                    !isOwner && thisCurrentUser ? 
                                    <MaterialCommunityIcons name="exit-run" size={20} color="white" />
                                    :
                                    <Icon as={MaterialIcons} name={'delete'} color={'white'} fontSize={14}/>
                                }
                            </TouchableOpacity>
                        </View>}
            </View>
        </TouchableOpacity>
    )
}

export default GroupsMemberItem;