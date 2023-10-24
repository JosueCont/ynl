import { View, VStack, HStack, Text, Image, Progress, Modal } from 'native-base'
import { StyleSheet, TouchableOpacity, Alert} from 'react-native'
import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {Colors} from '../../utils/Colors'
import { baseURL } from '../../utils/AxiosApi'
import {getProgressProject, getUrlImage} from '../../utils/functions'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'
import mime from 'react-native-mime-types'
import { deleteProject } from '../../redux/ducks/projectsDuck'
import ApiApp from "../../utils/ApiApp";
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';
import {Ionicons, AntDesign, MaterialIcons} from "@expo/vector-icons";

const ProjectItem = ({project, refreshProjects}) => {
    const [isDeleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const dispatch = useDispatch()
    const [loadingImage, setLoadingImage] = useState(null);


    const handleDeleteProject = async (projectId) => {
        
      if (isDeleteDialogVisible) { 
        setDeleteDialogVisible(false);
      } else { 
        setDeleteDialogVisible(true);
      }

      //alert(`projectId ${projectId}`)

      await deleteProject(projectId)
      await refreshProjects()

    };

    const navigation = useNavigation();

    const goToProject = () => {
      navigation.navigate("ProjectForm", {
        project_id: project.id,
      });
    };

    const deleteConfirmation = () => {
      Alert.alert("Eliminar proyecto", "¿Esta seguro de eliminar?", [
        {
          text: "Cancelar",
          onPress: () => setDeleteDialogVisible(false),
          style: "cancel",
        },
        { text: "Eliminar", onPress: () => handleDeleteProject(project.id) },
      ]);
    };

    const getFileInfo = async (fileURI) => {
      const fileInfo = await FileSystem.getInfoAsync(fileURI);
      return fileInfo;
    };

    const isLessThanTheMB = (fileSize, smallerThanSizeMB) => {
      const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB;
      console.log("peso", fileSize / 1024 / 1024);
      return isOk;
    };

    const pickImage = async () => {
      try {
        setLoadingImage(true);

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 0.5,
        });

        if (result.cancelled) {
          setLoadingImage(false);
        } else {
          const { uri, type } = result;
          const fileInfo = await getFileInfo(result.uri);

          if (!fileInfo?.size) {
            setLoadingImage(false);
            return;
          }

          const isLt1_5MB = isLessThanTheMB(fileInfo.size, 0.9);

          console.log("fileInfo  =====>", fileInfo);
          console.log("El booleano...: ", isLt1_5MB);

          if (!isLt1_5MB) {
            setLoadingImage(false);
            // setModalErrorText(t('error_image_less_15'))
            // setModalErrorVisible(true)
            // alert(t('error_image_less_15'))
            return;
          }
          updatePhotoFunction(result)
            .then((response) => {
              setLoadingImage(false);
            })
            .catch((e) => {
              setLoadingImage(false);
              console.log(
                "pickImage updatePhotoFunction error => ",
                e.toString()
              );
            });
        }
      } catch (e) {
        console.log("pickImage error =>", e.toString());
      }
    };

    const updatePhotoFunction = async (imagePickerResult) => {
      console.log("imagePickerResult ===>", imagePickerResult);
      try {
        var photo = {
          uri: imagePickerResult.uri,
          name: imagePickerResult.uri.split("/").pop(),
          type: mime.lookup(imagePickerResult.uri),
        };
        //console.log("PhotoUpload",photo);

        const formData = new FormData();

        formData.append("files", photo);
        formData.append("ref", "api::project.project");
        formData.append("refId", project.id);
        formData.append("field", "image");
        
        const response = await ApiApp.updatePhoto(formData);
        //alert(JSON.stringify(response))
        let data = {
          imageId: response.data[0].id,
        };

        //const responseSub = await ApiApp.updateProfile(authDuck.user.id, data)
        //await getProfileFunction(true);
        await refreshProjects()


      } catch (e) {
        console.log("updatePhotoFunction error => ", e.toString());
      }
    };
    
  return (
    <TouchableOpacity onPress={() => goToProject()}>
      <LinearGradient
        // Button Linear Gradient
        colors={["#5E5C5C", "#131212"]}
        style={styles.cardProject}
      >
        <VStack>
          <HStack>
            <VStack
              width={"50%"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text style={styles.titleProject}>
                {project?.attributes?.name}
              </Text>
            </VStack>
             
          
            <TouchableOpacity style={styles.imageContainer} onPress={() => pickImage()}>
              <Image
                style={styles.imageProject}
                resizeMode="center"
                source={{
                  uri: getUrlImage(
                    project?.attributes?.image?.data?.attributes?.url
                  ),
                }}
              />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.deleteIconContainer}
              onPress={deleteConfirmation}
            >
              <MaterialIcons
                size={26}
                color={"white"}
                name="cancel"
                resizeMode="contain"
                pl={14}
                // onPress={() => handleDeleteProject(project.id)}
              />
            </TouchableOpacity>
          </HStack>
          {/* <Modal
            visible={isDeleteConfirmationOpen}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <Text>Are you sure you want to delete this project?</Text>
              <TouchableOpacity onPress={handleConfirmDelete}>
                <Text>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancelDelete}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal> */}
          <Progress
            value={getProgressProject(project)}
            mt={2}
            size={"md"}
            bgColor={Colors.secondary}
            _filledTrack={{ bg: Colors.orange }}
          />
        </VStack>
      </LinearGradient>
    </TouchableOpacity>
  );
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

    editIconContainer: {
        position: 'absolute',
        top: 10, // Adjust the position as needed
        right: 10, // Adjust the position as needed
      },
    deleteIconContainer: {
        position: 'absolute',
        top: -7, // Adjust the position as needed
        left: -7, // Adjust the position as needed
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      imageContainer: {
        width: '100%',
      },
})