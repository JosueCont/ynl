import APIKit from "./AxiosApi";
import _ from "lodash";

class ApiApp {
    static ApisType = (url, method = "post", params = {}) => {
        console.log('url:', url, method, params)
        switch (method) {
            case "post":
                return APIKit.post(url, params);
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


    ///AUTH

    static loginWithEmail = (data) => {
        return ApiApp.ApisType('/api/auth/local', 'post', data)
    }

    static loginWithGoogle = (access_token) => {
        return ApiApp.ApisType(`/api/auth/google/callback?access_token=${access_token}`, 'get')
    }


    static saveFeelAspects = (data) => {
        return ApiApp.ApisType('/api/feel-aspects', 'post', data)
    }

    static getFeelings = (userId) => {
        return ApiApp.ApisType(`/api/feel-aspects?filters[user][id][$eq]=${userId}&pagination[page]=1&pagination[pageSize]=1&sort[0]=updatedAt:desc`, 'get')
    }

    //hace una busqueda basada en la palabra que le pasen como texto (username)
    static getUsersByUsername = (usernameLike = '') => {
        console.log(usernameLike)
        return ApiApp.ApisType(`/api/users?filters[username][$contains]=${usernameLike}`, 'get')
    }

    static getMyGroups = (userId = '') => {
        let url = `/api/groups?populate=*&filters[owner][id][$eq]=${userId}`
        console.log(url)
        return ApiApp.ApisType(url, 'get')
    }

    static getGroups = () => {
        return ApiApp.ApisType(`/api/groups?populate=*`, 'get')
    }


    static saveFeeling = (data) => {
        return ApiApp.ApisType('/api/feeling-records', 'post', data)
    }

    ///examples
    static getUserProfile = (data) => {
        return ApiApp.ApisType("/person/person/save_person_jwt/", "post", data);
    };

    static updateProfile = (data) => {
        return ApiApp.ApisType(`/person/person/${data.id}/`, "put", data);
    };

    static updatePhoto = (data) => {
        return ApiApp.ApisType(
            `/person/person/update_pthoto_person/`,
            "post",
            data
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


    static register = (data) => {
        return ApiApp.ApisType(`/api/auth/local/register`, 'post', data)
    }

    static resolveError = async (response) => {
        if (response.status <= 500) {
            if (_.has(response.data, 'error')) {
                return response.data.error.message;
            } else {
                return response.data;
            }
        }
    }
}

export default ApiApp;