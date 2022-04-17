import APIKit from "./AxiosApi";

class ApiApp {
    static ApisType = (url, method = "post", params = {}) => {
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

    static loginWithEmail=(data)=>{
        return ApiApp.ApisType('/api/auth/local', 'post',data)
    }


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
            { person: data }
        );
    };

    static changeStatusComunication = (id, data) => {
        return ApiApp.ApisType(`/noticenter/user-notification/${id}/`, "put", data);
    };

    static getPayrollVouchers = (data) => {
        return ApiApp.ApisType(`/payroll/payroll-voucher/?${data}`, "get");
    };

}

export default ApiApp;