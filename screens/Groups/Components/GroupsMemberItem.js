import {Avatar, Text, View, Badge, Icon} from "native-base";
import imageLogo from '../../../assets/logo.png'
import {Colors} from "../../../utils/Colors";
import {TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

const GroupsMemberItem = ({title, pending = true, isOwner, deleteAction, thisOwner}) => {
    return (
        (pending && !isOwner)? <></>:  <TouchableOpacity style={{flex: 1}} disabled={true}>
            <View flexDir={'row'} flex={1} my={3} borderBottomWidth={0.5} borderBottomColor={Colors.red} mx={2} pb={4}>
                <View flex={0.2} alignItems={'center'} justifyContent={'center'}>
                    <Icon as={MaterialIcons} name={'account-circle'}  size={'lg'}/>
                </View>
                <View flex={0.8} justifyContent={'center'} alignItems={'flex-start'}>
                    <Text fontSize={12}  color={Colors.red}>{title}</Text>
                    {
                        pending && <Badge width={'100%'} colorScheme={"info"}>{pending?'Pendiente por aceptar':''}</Badge>
                    }
                    

                </View>
                {isOwner && !pending && !thisOwner &&
                        <View flex={0.2} alignItems={'flex-end'} justifyContent={'center'}>
                            <TouchableOpacity onPress={() => deleteAction()} style={{
                                height: 25,
                                width: 25,
                                backgroundColor: Colors.red,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 15
                            }}>
                                <Icon as={MaterialIcons} name={'delete'} color={'white'} fontSize={14}/>
                            </TouchableOpacity>
                        </View>}
            </View>
        </TouchableOpacity>
    )
}

export default GroupsMemberItem;