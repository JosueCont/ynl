import React, {useEffect} from 'react'
import {Box, HStack, Icon, Image, Progress, Spacer, Stack, Text, View, VStack} from "native-base";
import historyIcon from "../assets/bxhistory.png";
import {TouchableOpacity} from "react-native";
import arrowIcon from "../assets/arrow_right.png";
import {MaterialIcons} from "@expo/vector-icons";


const FeelingCard = ({feelingCard,user}) => {


    useEffect(() => {
        console.log(feelingCard)
    }, [])

    return (
         <Box  pl="4" pr="5" py="2">
             {
                 feelingCard?.most_select?.count >0 &&
                 <HStack space={3} w={'100%'} justifyContent="space-between">
                     <Image size="60px" source={{uri:feelingCard?.most_select?.icon}} alt="img"/>
                     <VStack w={'80%'} h={'50px'}>
                         <Text style={{color:`#${feelingCard?.most_select?.color}`}} ml={3} fontSize={"sm"}>
                             Más frecuente:  {feelingCard?.most_select?.name}
                         </Text>
                         <Stack direction={"row"}>
                             <Text ml={3} fontSize={"sm"}>
                                 {user?.firstName} {' '+Math.round(feelingCard.percent)}%
                             </Text>
                         </Stack>
                         <Progress
                             size={"md"}
                             colorScheme={Math.round(feelingCard.percent)>50?'green':'red'}
                             value={Math.round(feelingCard.percent)}
                         />
                         <View flexDirection={'row'}>
                             <View style={{flex:1}}>
                                 <Icon
                                     as={MaterialIcons}
                                     name="minimize"
                                     size={3}
                                 />
                             </View>

                             <View  style={{flex:1}}>
                                 <Icon
                                     as={MaterialIcons}
                                     name="add"
                                     style={{alignSelf: "flex-end"}}
                                     size={3}
                                 />
                             </View>
                         </View>

                     </VStack>

                     <TouchableOpacity>
                         {/*<Image size="20px" mt={5} source={arrowIcon} alt="img"/>*/}
                     </TouchableOpacity>
                     <Spacer/>
                 </HStack>
             }
        </Box>
    )
}

const styleSelect = {
    border: 'red',
    padding: 10
}

export default FeelingCard;
