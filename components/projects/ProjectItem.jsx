import { View, VStack, HStack, Text, Image, Progress } from 'native-base'
import { StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import {Colors} from '../../utils/Colors'
import { baseURL } from '../../utils/AxiosApi'
import {getProgressProject} from '../../utils/functions'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';


const ProjectItem = ({project}) => {

    const navigation = useNavigation()

    const goToProject = () => {
        navigation.navigate("ProjectForm",{
            project_id: project.id,
          })
    }

    
  return (
    <TouchableOpacity onPress={() => goToProject()}>
        <LinearGradient
        // Button Linear Gradient
        colors={['#5E5C5C', '#131212']}
        style={styles.cardProject}
        >
            <VStack>
                <HStack>
                    <VStack width={'50%'} alignItems={'center'} justifyContent={'center'} >
                        <Text style={styles.titleProject}>
                            { project?.attributes?.name }
                        </Text>
                    </VStack>
                    <Image 
                        style={styles.imageProject}
                        resizeMode='center'
                        source={{ uri: baseURL+ project?.attributes?.image?.data?.attributes?.url }} />
                </HStack>
                <Progress value={getProgressProject(project)} mt={2} size={'md'} bgColor={Colors.secondary} _filledTrack={{bg: Colors.orange }} />
            </VStack>
        
        </LinearGradient>
    </TouchableOpacity>
  )
}

export default ProjectItem

const styles = StyleSheet.create({
    cardProject:{
        width:'100%',
        paddingHorizontal:10,
        paddingVertical:10,
        backgroundColor:'gray',
        //background: 'transparent linear-gradient(180deg, #5E5C5C 0%, #131212 100%) 0% 0% no-repeat padding-box',
        borderRadius: 12
    },
    titleProject:{
        paddingVertical:10,
        letterSpacing: 0,
        color: '#FFFFFF',
        opacity: 1,
        fontSize:20,
        resizeMode: 'cover',
        fontWeight:'bold'
    },
    imageProject:{
        borderRadius:12,
        width: '50%',
        height: 100
    },
})