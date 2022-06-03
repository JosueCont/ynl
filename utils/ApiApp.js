import APIKit, {baseURL} from "./AxiosApi";
import _ from "lodash";
import moment from "moment";

class ApiApp {
    static ApisType = (url, method = "post", params = {}, formdata = null) => {
        console.log('url:', url, method, params)


        switch (method) {
            case "post":
                if (formdata) {
                    return APIKit.post(url, params, formdata);
                } else {
                    return APIKit.post(url, params);
                }

                break;
            case "put":
                return APIKit.put(url, params);
                break;
            case "get":
                return APIKit.get(url);
                break;
            case "delete":
                return APIKit.delete(url);
                break;
            case "patch":
                return APIKit.patch(url);
                break;
        }
    };


    static sendPushToken = (data) => {
        return ApiApp.ApisType(`/api/push-tokens`, 'post', data)
    }

    static registerPhone = (data) => {
        return ApiApp.ApisType(`/api/phone-verifications`, 'post', data)
    }

    static registerPhoneVerify = (data) => {
        return ApiApp.ApisType(`/api/phone-verifications/verify`, 'post', data)
    }


    static register = (data) => {
        return ApiApp.ApisType(`/api/auth/local/register`, 'post', data)
    }

    static getEmotionStatus = (userId) => {
        return ApiApp.ApisType(`/api/feeling-records?filters[user][id][$eq]=${userId}&filters[createdAt][$gte]=${moment().format('YYYY-MM-DD')}&sort[0]=createdAt:desc&pagination[page]=1&pagination[pageSize]=1`, 'get')

    }

    ///AUTH

    static loginWithEmail = (data) => {
        return ApiApp.ApisType('/api/auth/local', 'post', data)
    }

    static loginWithGoogle = (access_token) => {
        return ApiApp.ApisType(`/api/auth/google/callback?access_token=${access_token}`, 'get')
    }

    static loginWithLinked = (access_token) => {
        return ApiApp.ApisType(`/api/auth/linkedin/callback?access_token=${access_token}`, 'get')
    }

    static loginWithLinkedData = (access_token) => {
        return APIKit.get(`https://api.linkedin.com/v2/me?oauth2_access_token=${access_token}`)
    }

    static getHomeData = (userId) => {
        return ApiApp.ApisType(`/api/home/user_main?userId=${userId}`, 'get')
    }

    static saveFeelAspects = (data) => {
        return ApiApp.ApisType('/api/feel-aspects', 'post', data)
    }

    static getFeelings = (userId) => {
        return ApiApp.ApisType(`/api/feel-aspects?filters[user][id][$eq]=${userId}&pagination[page]=1&pagination[pageSize]=1&sort[0]=updatedAt:desc`, 'get')
    }

    static getFeelingsV2 = (query = '') => {
        return ApiApp.ApisType('/api/feelings?' + query, 'get')
    }

    static getFeelingsV3 = (query = '') => {
        return ApiApp.ApisType('/api/feelings?populate=*', 'get')
    }

    //hace una busqueda basada en la palabra que le pasen como texto (username)
    static getUsersByUsername = (usernameLike = '') => {
        return ApiApp.ApisType(`/api/users?filters[$or][0][username][$contains]=${usernameLike}&filters[$or][1][email][$contains]=${usernameLike}`, 'get')
    }

    static getMyGroups = (userId) => {
        let url = `/api/listByUserId?userId=${userId}`
        return ApiApp.ApisType(url, 'get')
    }

    static getGroupsRequests = (userId) => {
        let url = `/api/group-requests?populate=*&filters[user][id][$eq]=${userId}`
        return ApiApp.ApisType(url, 'get')
    }

    static groupAcceptInvite = (token, accept) => {
        let url = `api/accept_invite?token=${token}&accept=${accept}`
        return ApiApp.ApisType(url, 'get')
    }

    static getGroups = () => {
        return ApiApp.ApisType(`/api/groups?populate=*`, 'get')
    }

    static getGroupMembers = (groupId) => {
        return ApiApp.ApisType(`/api/group_detail?id=${groupId}`, 'get')
    }

    static createGroup = (data) => {
        return ApiApp.ApisType('/api/create-group', 'post', data)
    }


    static saveFeeling = (data) => {
        return ApiApp.ApisType('/api/feeling-records', 'post', data)
    }

    ///examples
    static getUserProfile = (data) => {
        return ApiApp.ApisType("/person/person/save_person_jwt/", "post", data);
    };

    static updateProfile = (userId, data) => {
        return ApiApp.ApisType(`/api/users/${userId}`, "put", data);
    };

    static updatePassword = (data) => {
        return ApiApp.ApisType(`/api/auth/change-password`, "post", data);
    };


    static updatePhoto = (data) => {
        return ApiApp.ApisType(
            `/api/upload/`,
            "post",
            data, {
                headers: {
                    'Content-type': `multipart/form-data;`,

                }
            }
        );
    };

    static getComunication = (data) => {
        return ApiApp.ApisType(
            `/noticenter/user-notification/get_notification_user/`,
            "post",
            {person: data}
        );
    };

    static changeStatusComunication = (id, data) => {
        return ApiApp.ApisType(`/noticenter/user-notification/${id}/`, "put", data);
    };

    static getPayrollVouchers = (data) => {
        return ApiApp.ApisType(`/payroll/payroll-voucher/?${data}`, "get");
    };


    static getProfile = (userId) => {
        return ApiApp.ApisType(`/api/users/${userId}?populate=avatar`, "get");
    };


    static resolveError = async (response) => {
        if (response.status <= 500) {
            if (_.has(response.data, 'error')) {
                return response.data.error.message;
            } else {
                return response.data;
            }
        }
    }


    /**
     * Estadisticas
     */

    static getHistoryFeelings = async (startDate, endDate, userId) => {
        return ApiApp.ApisType(`/api/feeling-records?populate[feeling][populate][parent][populate][parent][populate][icon]=*&filters[createdAt][$gte]=${startDate}&filters[createdAt][$lt]=${endDate}&filters[user][id]=${userId}`, "get");
    }

    static getUserProgress = async (userID = '', option = '') => {
        console.log(`/api/progress/user_progress?userId=${userID}&option=${option}`)
        return ApiApp.ApisType(`/api/progress/user_progress?userId=${userID}&option=${option}`, 'get');
    }

    static forgotPassword = (data) => {
        return ApiApp.ApisType(`/api/auth/forgot-password`, 'post', data);

    }

    static groupsDelete = (groupId) => {
        return ApiApp.ApisType(`/api/groups/${groupId}`, 'delete');
    }

    static groupStats=(groupId, option)=>{
        return ApiApp.ApisType(`/api/getFeelingUsers?groupId=${groupId}&option=${option}`, 'get');
    }

    static getUserByEmail=(email)=>{
        return ApiApp.ApisType(`/api/users?filters[$and][0][email][$eq]=${email}`, 'get');
    }

    static deleteMemberGroup = (data) => {
        return ApiApp.ApisType(`/api/delete-member-group`, 'post', data);
    }

    static _baseURL = baseURL;


}

export default ApiApp;