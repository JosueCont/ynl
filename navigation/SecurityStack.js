import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "../screens/Security/LoginScreen";

const Stack = createStackNavigator();

export function SecurityStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen name={"Login"}
            component={LoginScreen}
            options={{title:'login'}}
            />
        </Stack.Navigator>
    )
}