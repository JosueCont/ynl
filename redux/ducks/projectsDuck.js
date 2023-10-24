import ApiApp from "../../utils/ApiApp";
/* import {loadingOverlay} from './authDuck' */
import mime from 'react-native-mime-types'

const initialData = {
    loading:false,
    saving: false,
    projects: [],
}

const LOADING = 'LOADING';
const SET_PROJECTS = 'SET_PROJECTS'
const SAVING = "SAVING"

const projectsDuck = (state = initialData, action) => {
    switch (action.type) {
        case LOADING:
            return {...state, loading: action.payload}
        case SAVING: 
            return {...state, saving: action.payload}
        case SET_PROJECTS:
            return {...state, projects: action.payload}
        default:
            return state
    }
}

export const getProjects = (user_id) => async (dispatch) => {
    try {
        dispatch({type: LOADING, payload: true })
        let response = await ApiApp.getProjects(user_id)
        if(response?.status === 200){
            dispatch({type:SET_PROJECTS, payload: response?.data?.data})
        }
        dispatch({type: LOADING, payload: false });
        return true
    }catch (e) {
        dispatch({type: LOADING, payload: false });
        console.log('getReport error =>', e.toString())
        return false
    }
}

export const createProject = (data) => async (dispatch) => {
    try {
        dispatch({type: SAVING, payload: true})
        const newFormData = new FormData()
        let photo = null
        let image = null
        if(data.image){
            photo = {
                uri: data?.image.uri,
                name: data?.image.uri.split('/').pop(),
                type: mime.lookup(data?.image.uri),
            };
            newFormData.append('files', photo);
            const respimage = await ApiApp.uploadImage(newFormData)
            
            if(respimage.status === 200){
                image = respimage.data[0].id
            }
        }
        const resp = await ApiApp.createProject({data:{name: data?.name, image: image, user: data?.user}})
        console.log('=============>',{data:{name: data?.name, image: image, user: data?.user}} )
        dispatch({type: SAVING, payload: false})
        return resp?.data?.data?.id
    } catch (error) {
        console.log('error', error)
        dispatch({type: SAVING, payload: false})
        return false
    }
}

export const getProjectId = (project_id) => async (dispatch) => {
    try {
        dispatch({type: LOADING, payload: true })
        let response = await ApiApp.getProjectId(project_id)
        dispatch({type: LOADING, payload: false });
        if(response?.status === 200){
            return response?.data?.data
        }
        
    }catch (e) {
        dispatch({type: LOADING, payload: false });
        console.log('getReport error =>', e.toString())
        return false
    }
}

export const updProject = (project_id, data) => async (dispatch) => {
    try {
        //dispatch({type: SAVING, payload: true })
        let response = await ApiApp.updProject(project_id, data)
        //dispatch({type: SAVING, payload: false });
        if(response?.status === 200){
            console.log(response?.data?.data)
            return response?.data?.data
        }
        
    }catch (e) {
        dispatch({type: SAVING, payload: false });
        console.log('getReport error =>', e.toString())
        return false
    }
}
export const deleteProject = async(project_id)  => {
    try {
        //alert(`projectId API ${project_id}`)
        //dispatch({type: SAVING, payload: true })
        let response = await ApiApp.delProject(project_id)
        //dispatch({type: SAVING, payload: false });
        if(response?.status === 200){
            console.log(response?.data?.data)
            return response?.data?.data
        }
        
    }catch (e) {
        console.log('deleteReport error =>', e.toString())
        return false
    }
}

export default projectsDuck;