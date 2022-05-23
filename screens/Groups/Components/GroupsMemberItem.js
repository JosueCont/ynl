import {Avatar, Text, View} from "native-base";
import imageLogo from '../../../assets/logo.png'
import {Colors} from "../../../utils/Colors";
import {TouchableOpacity} from "react-native";

const GroupsMemberItem = ({title, pending = true}) => {
    return (
        <TouchableOpacity style={{flex: 1}}>
            <View flexDir={'row'} my={3} borderBottomWidth={0.5} borderBottomColor={Colors.red} mx={2} pb={4}>
                <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                    <Avatar size="md" source={imageLogo} style={{opacity: pending ? 0.5 : 1}}/>
                </View>
                <View flex={1} justifyContent={'center'}>
                    <Text fontSize={16} style={{opacity: pending ? 0.5 : 1}} color={Colors.red}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default GroupsMemberItem;