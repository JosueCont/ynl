import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text, Center, FormControl, Input, Modal, Button, useToast } from 'native-base'
import { getUrlImage } from '../../utils/functions'
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../utils/Colors';
import { createProject } from '../../redux/ducks/projectsDuck'
import { useDispatch, useSelector } from 'react-redux';
import ApiApp from '../../utils/ApiApp';
import mime from 'react-native-mime-types'
import { useNavigation } from '@react-navigation/native';


const ModalNewProject = ({isOpen=false, closeModal=null}) => {

    const dispatch = useDispatch()
    const saving = useSelector(state => state?.projectsDuck?.saving)
    const user_id = useSelector(state => state?.authDuck?.user.id)

    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState(null);
    const toast = useToast()
    const navigation = useNavigation();

    useEffect(() => {
      if(isOpen === false){
        setFormData({})
      }
    }, [isOpen])
    

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
            setFormData({...formData, image: result.assets[0] })
            /* setImage(result.assets[0]); */
        }
      };

    useEffect(() => {
      setFormData({...formData, user: user_id})
    }, [user_id])
    

    const validate = () => {
        if (formData.name === undefined) {
          setErrors({ ...errors,
            name: 'Debes escribir un nombre'
          });
          return false;
        }
        return true;
    };
    
    const createNewProject = async () => {
        let project_id = await dispatch(createProject(formData))
        if(!project_id){
          toast.show({title: "La creación del proyecto falló, intenta con una imagen diferente"})
          return
        }
        setFormData({user: user_id})
        setImage(null)
        if(project_id){
          onCloseModal()
            navigation.navigate("ProjectForm",{
                project_id: project_id,
              })
        }

    }

    const onSubmit = () => {
        validate() ? createNewProject() : console.log('Validation Failed');
    };

    const onCloseModal = () => {
      setFormData({ ...formData, image: null, user: user_id })
      setImage(null)
      closeModal()

    }

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} >
        <Modal.Content maxWidth="400px">
           <Modal.CloseButton />
            <Modal.Header>Nuevo proyecto</Modal.Header>
            <Modal.Body>
                <Center>
                    <Image
                        alt='project' 
                        backgroundColor={'red.200'}
                        width={100}
                        height={100}
                        source={{ uri: getUrlImage(formData?.image?.uri) }}
                    />
                    <TouchableOpacity margin onPress={pickImage} style={{ paddingHorizontal:10, paddingVertical:2 }}>
                        <Text textDecorationLine={'underline'} >
                            Cargar imagen
                        </Text>
                    </TouchableOpacity>
                </Center>
                <FormControl isRequired isInvalid={'name' in errors}>
                    <FormControl.Label>Nombre</FormControl.Label>
                    <Input value={formData?.name} onChangeText={value => setFormData({ ...formData, name: value })} />
                    {'name' in errors && <FormControl.ErrorMessage>{errors?.name}</FormControl.ErrorMessage>}
                </FormControl>
                <Button mt="5" isLoading={saving} onPress={onSubmit} borderRadius={10} backgroundColor={Colors.orange} colorScheme="cyan">
                    Agregar
                </Button>
            </Modal.Body>
        </Modal.Content>
    </Modal>
  )
}

export default ModalNewProject

const styles = StyleSheet.create({})