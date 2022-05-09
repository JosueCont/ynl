import {Avatar, Text, View} from "native-base";
import imageLogo from '../../../assets/logo.png'
import {Colors} from "../../../utils/Colors";

const GroupsItem = ({title}) => {
    return (
        <View flexDir={'row'} my={3} borderBottomWidth={0.5} borderBottomColor={Colors.red} mx={2} pb={4}>
            <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                <Avatar size="md" source={imageLogo}/>
            </View>
            <View flex={1} justifyContent={'center'}>
                <Text>{title}</Text>
            </View>

        </View>
    )
}

export default GroupsItem;