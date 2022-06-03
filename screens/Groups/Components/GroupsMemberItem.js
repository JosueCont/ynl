import {Avatar, Text, View, Badge, Icon} from "native-base";
import imageLogo from '../../../assets/logo.png'
import {Colors} from "../../../utils/Colors";
import {TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

const GroupsMemberItem = ({title, pending = true, isOwner, deleteAction, thisOwner}) => {
    return (
        <TouchableOpacity style={{flex: 1}} disabled={true}>
            <View flexDir={'row'} flex={1} my={3} borderBottomWidth={0.5} borderBottomColor={Colors.red} mx={2} pb={4}>
                <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                    <Avatar size="md" source={imageLogo} backgroundColor={'#FF5E00'}>
                        {title[0]}
                    </Avatar>
                </View>
                <View flex={0.8} justifyContent={'center'} alignItems={'flex-start'}>
                    <Text fontSize={12} style={{opacity: pending ? 0.5 : 1}} color={Colors.red}>{title}</Text>
                    {
                        pending && isOwner && <Badge width={'60%'} colorScheme={"info"}>{pending?'Pendiente':''}</Badge>
                    }
                    

                </View>
                {isOwner && !thisOwner &&
                        <View flex={0.2} alignItems={'flex-end'} justifyContent={'center'}>
                            <TouchableOpacity onPress={() => deleteAction()} style={{
                                height: 25,
                                width: 25,
                                backgroundColor: Colors.red,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 15
                            }}>
                                <Icon as={MaterialIcons} name={'close'} color={'white'} fontSize={14}></Icon>
                            </TouchableOpacity>
                        </View>}
            </View>
        </TouchableOpacity>
    )
}

export default GroupsMemberItem;