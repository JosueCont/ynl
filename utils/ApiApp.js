import APIKit, { baseURL } from "./AxiosApi";
import _ from "lodash";
import moment from "moment";
import jwt_decode from 'jwt-decode';

class ApiApp {
  static ApisType = (url, method = "post", params = {}, formdata = null) => {
    let task = "";
    switch (method) {
      case "post":
        if (formdata) {
          task = APIKit.post(url, params, formdata);
        } else {
          task = APIKit.post(url, params);
        }
        break;
      case "put":
        task = APIKit.put(url, params);
        break;
      case "get":
        task = APIKit.get(url);
        break;
      case "delete":
        task = APIKit.delete(url);
        break;
      case "patch":
        task = APIKit.patch(url, params);
        break;
    }
    return task;
  };

  static getRoulette = () => {
    return ApiApp.ApisType(`/api/feeling/geRoulette/`, "get");
  };

  static sendPushToken = (data) => {
    return ApiApp.ApisType(`/api/push-tokens`, "post", data);
  };

  static registerPhone = (data) => {
    return ApiApp.ApisType(`/api/phone-verifications`, "post", data);
  };

  static registerPhoneVerify = (data) => {
    return ApiApp.ApisType(`/api/phone-verifications/verify`, "post", data);
  };

  static register = (data) => {
    return ApiApp.ApisType(`/api/auth/local/register`, "post", data);
  };

  static deleteAccount = (userId) => {
    return ApiApp.ApisType(`/api/auth/deleteAccount`, "post", {userId: userId});
  };

  static getEmotionStatus = (userId, site) => {
    if(site?.id)
    {
      return ApiApp.ApisType(
        `/api/feeling-records?filters[user][id][$eq]=${userId}&filters[site[id][$eq]=${site.id}&filters[createdAt][$gte]=${moment().format(
          "YYYY-MM-DD"
        )}&sort[0]=createdAt:desc&pagination[page]=1&pagination[pageSize]=1`,
        "get"
      );
    }
    else{
      return ApiApp.ApisType(
        `/api/feeling-records?filters[user][id][$eq]=${userId}&filters[createdAt][$gte]=${moment().format(
          "YYYY-MM-DD"
        )}&sort[0]=createdAt:desc&pagination[page]=1&pagination[pageSize]=1`,
        "get"
      );
    }
    
  };

  ///AUTH

  static loginWithEmail = (data) => {
    return ApiApp.ApisType("/api/auth/local", "post", data);
  };

  static loginWithKhonnect = (data) => {
    return ApiApp.ApisType("/api/auth/khonnect", "post", data);
  };

  static loginWithApple = async (access_token) => {

    const token_des = jwt_decode(access_token.identityToken)
    let request = {
      typeAccess: 'apple',
      username : access_token.email ? access_token.email : token_des.email,
      firstName : access_token.fullName?.givenName ? access_token.fullName.givenName : "",
      lastName : access_token.fullName?.familyName ? access_token.fullName.familyName: ""
    }
    // return ApiApp.ApisType(
    //   `/api/auth/apple/callback?access_token=${access_token}`,
    //   "get"
    // );
    return ApiApp.ApisType(
      `/api/auth/register`,
      "post",request
    );
  };

  static loginWithGoogle = (access_token) => {
    // return ApiApp.ApisType(
    //   `/api/auth/google/callback?access_token=${access_token}`,
    //   "get"
    // );
    return ApiApp.ApisType(
      `/api/auth/register`,
      "post",{typeAccess: 'google', token: access_token}
    );
  };

  static loginWithLinked = (access_token) => {
    return ApiApp.ApisType(
      `/api/auth/linkedin/callback?access_token=${access_token}`,
      "get"
    );
  };

  static loginWithLinkedData = (access_token) => {
    return APIKit.get(
      `https://api.linkedin.com/v2/me?oauth2_access_token=${access_token}`
    );
  };

  static getHomeData = (userId, site) => {
    if (site?.id) {
      return ApiApp.ApisType(
        `/api/home/user_main?userId=${userId}&siteId=${site?.id}`,
        "get"
      );
    } else {
      return ApiApp.ApisType(`/api/home/user_main?userId=${userId}`, "get");
    }
  };

  static saveFeelAspects = (data) => {
    return ApiApp.ApisType("/api/feel-aspects", "post", data);
  };

  static getFeelings = (userId, site) => {
    //alert(site.id)
    if (site?.id) {
      return ApiApp.ApisType(
        `/api/feel-aspects?filters[user][id][$eq]=${userId}&filters[site][id][$eq]=${site.id}&pagination[page]=1&pagination[pageSize]=1&sort[0]=updatedAt:desc`,
        "get"
      );
    }
    else{
      return ApiApp.ApisType(
        `/api/feel-aspects?filters[user][id][$eq]=${userId}&pagination[page]=1&pagination[pageSize]=1&sort[0]=updatedAt:desc`,
        "get"
      );
    }

    


  };

  static getFeelingsV2 = (query = "") => {
    return ApiApp.ApisType("/api/feelings?" + query, "get");
  };

  static getFeelingsV3 = (query = "") => {
    return ApiApp.ApisType("/api/feelings?populate=*", "get");
  };

  //hace una busqueda basada en la palabra que le pasen como texto (username)
  static getUsersByUsername = (usernameLike = "", site) => {
    // console.log('aqui pasa')
    return ApiApp.ApisType(
        `/api/users?filters[$or][0][username][$contains]=${usernameLike}&filters[$or][1][email][$contains]=${usernameLike}&filters[$and][1][blocked]=false`,
        "get"
    );
    // if (site?.id) {
    //   return ApiApp.ApisType(
    //     `/api/users?filters[$or][0][username][$contains]=${usernameLike}&filters[$or][1][email][$contains]=${usernameLike}&filters[sites][app_id][$eq]=${site.app_id}`,
    //     "get"
    //   );
    // } else {
    //   return ApiApp.ApisType(
    //     `/api/users?filters[$or][0][username][$contains]=${usernameLike}&filters[$or][1][email][$contains]=${usernameLike}`,
    //     "get"
    //   );
    // }
  };

  static getMyGroups = (userId, site = null) => {
    if (site?.app_id) {
      let url = `/api/listByUserId?userId=${userId}&appId=${site.app_id}`; //&siteId=${site.id}
      return ApiApp.ApisType(url, "get");
    }
    else{
      let url = `/api/listByUserId?userId=${userId}`;
      return ApiApp.ApisType(url, "get");
    }
    
  };

  static getGroupsRequests = (userId, site=null) => {

    let url = '';

    // if(site?.id){
    //   url = `api/group-requests?populate=*&filters[user][id][$eq]=${userId}&filters[site][id][$eq]=${site.id}`
    //   console.log('url_invitaciones:::::::', url, JSON.stringify(site))
    // }else{
      url = `/api/group-requests?populate=*&filters[user][id][$eq]=${userId}`;
    // }

    console.log('url-->',url)
    return ApiApp.ApisType(url, "get");
  };

  static groupAcceptInvite = (token, accept) => {
    let url = `api/accept_invite?token=${token}&accept=${accept}`;
    return ApiApp.ApisType(url, "get");
  };

  static getGroups = () => {
    return ApiApp.ApisType(`/api/groups?populate=*`, "get");
  };

  static getGroupMembers = (groupId) => {
    return ApiApp.ApisType(`/api/group_detail?id=${groupId}`, "get");
  };

  static createGroup = (data) => {
    return ApiApp.ApisType("/api/create-group", "post", data);
  };

  static updGroup = (groupId, data) => {
    return ApiApp.ApisType(`/api/groups/${groupId}/`, "put", data);
  };

  static saveFeeling = (data) => {
    return ApiApp.ApisType("/api/feeling-records", "post", data);
  };

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
    return ApiApp.ApisType(`/api/upload/`, "post", data, {
      headers: {
        "Content-type": `multipart/form-data;`,
      },
    });
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

  static getProfile = (userId) => {
    let url = `/api/users/${userId}?populate[avatar][sort]=id:desc`;
    return ApiApp.ApisType(url, "get");
  };

  static resolveError = async (response) => {
    if (response.status <= 500) {
      if (_.has(response.data, "error")) {
        return response.data.error.message;
      } else {
        return response.data;
      }
    }
  };

  /**
   * Estadisticas
   */

  static getHistoryFeelings = async (startDate, endDate, userId, site) => {
    if (site?.id) {
      console.log(
        "🚀 ~ file: ApiApp.js ~ line 209 ~ ApiApp ~ getHistoryFeelings= ~ id",
        startDate,
        endDate,
        userId,
        site?.id
      );
      return ApiApp.ApisType(
        `/api/feeling-records?populate[feeling][populate][parent][populate][icon]=*&filters[createdAt][$gte]=${startDate}&filters[createdAt][$lt]=${endDate}&filters[user][id]=${userId}&filters[site][id][$eq]=${site?.id}`,
        "get"
      );
    } else {
      return ApiApp.ApisType(
        `/api/feeling-records?populate[feeling][populate][parent][populate][icon]=*&filters[createdAt][$gte]=${startDate}&filters[createdAt][$lt]=${endDate}&filters[user][id]=${userId}`,
        "get"
      );
    }
  };

  static getUserProgress = async (userID = "", site = null, option = "") => { 
    //console.log("🚀 ~ file: ApiApp.js ~ line 254 ~ ApiApp ~ getUserProgress= ~ site", site, option, userID)
    if (site?.id) { 
      return ApiApp.ApisType(
        `/api/progress/user_progress?userId=${userID}&option=${option}&siteId=${site?.id}`,
        "get"
      );
    } else {
      return ApiApp.ApisType(
        `/api/progress/user_progress?userId=${userID}&option=${option}`,
        "get"
      );
    }
  };

  static getLastEmotion = async (userID = "", site = null, option = "") => { 
    console.log("🚀 ~ file: ApiApp.js ~ line 254 ~ ApiApp ~ getUserProgress= ~ site", site, option, userID)
    if (site?.id) { 
      return ApiApp.ApisType(
        `/api/feeling-records/getLastEmotion`,
        "post",
        { userId: userID,
          siteId: site?.id,
          option: option,
         }
      );
    } else {
      return ApiApp.ApisType(
        `/api/feeling-records/getLastEmotion`,
        "post",
        { userId: userID, 
          option: option,
         }
      );
    }
  };

  static forgotPassword = (data) => {
    return ApiApp.ApisType(`/api/auth/forgot-password`, "post", data);
  };

  static groupsDelete = (groupId) => {
    return ApiApp.ApisType(`/api/groups/${groupId}`, "delete");
  };

  static groupStats = (groupId, option) => {
    return ApiApp.ApisType(
      `/api/getFeelingUsers?groupId=${groupId}&option=${option}`,
      "get"
    );
  };

  static getUserByEmail = (email) => {
    return ApiApp.ApisType(
      `/api/users?filters[$and][0][email][$eq]=${email}`,
      "get"
    );
  };

  static deleteMemberGroup = (data) => {
    return ApiApp.ApisType(`/api/delete-member-group`, "post", data);
  };

  static reSendEmailMemberGroup = (data) => {
    return ApiApp.ApisType(`/api/group-request/resendInvitation`, "post", data);
  };

  static addMemberGroup = (data) => {
    return ApiApp.ApisType(`/api/add-member-group`, "post", data);
  };

  /// Login Khor
  static getSitesKhor = (data) => {
    return ApiApp.ApisType(`/api/auth/sites`, "post", data);
  };


  /* Phrases */
  static getUserDayPhrase = (userID) => {
    return ApiApp.ApisType(`/api/day-phrases/getUserDayPhrase/${userID}/`, "get");
  };


  /* Objetivos */
  static getGoalCategories = () => {
    return ApiApp.ApisType(`/api/goal-categories?filters[is_active][$eq]=true&populate=*`, "get");
  }

  static getDateGoal = (date, user_id) => {
    
    return ApiApp.ApisType(`/api/daily-goals/?filters[target_date][$eq]=${date}&filters[users_permissions_user][id][$eq]=${user_id}&populate[goal_category][populate][0]=icon&populate[goal_category][populate][1]=icon_white`, "get");
  }

  static saveDailyGoals = (data) => {
    return ApiApp.ApisType(`/api/daily-goals/save/`, "post", data);
  }

  static getGoalsReport = (data) => {
    return ApiApp.ApisType(`/api/daily-goals/${data?.userId}/report/?dateOne=${data?.dateOne}&dateTwo=${data?.dateTwo}`, "get");
  }

  /* Projectos */
  static getProjects = (user_id) => {
    return ApiApp.ApisType(`/api/projects/?filters[user][id][$eq]=${user_id}&populate=*`, "get");
  }

  static uploadImage = (data) => {
    return ApiApp.ApisType(`/api/upload/`, "post", data, {
      headers: {
        "Content-type": `multipart/form-data;`,
      },
    });
  };

  static createProject = (data) => {  
    return ApiApp.ApisType(`/api/projects/`, "post", data)
  }

  static getProjectId = (project_id) => {
    return ApiApp.ApisType(`/api/projects/${project_id}`, "get");
  }

  static updProject = (project_id, data) => {
    console.log(`/api/projects/${project_id}/`)
    return ApiApp.ApisType(`/api/projects/${project_id}/`, "put", data);
  }

  static delProject = (project_id) => {
    console.log(`/api/projects/${project_id}`)
    return ApiApp.ApisType(`/api/projects/${project_id}`, "delete");
  }

  /* UserBooks */
  static getUserBooks = (user_id) => {
    return ApiApp.ApisType(`/api/user-books/getBooks/${user_id}`, "get");
  }

  /* Books */
  static getPagesBook = (book_code) => {
    return ApiApp.ApisType(`/api/book-pages/?populate=*&filters[book][code]=${book_code}&sort=page&pagination[page]=1&pagination[pageSize]=1000`, "get");
  }

  /* Markers */
  static getMarkers = (user_id, book_code) => {
    return ApiApp.ApisType(`/api/markers?filters[users_permissions_user][id][$eq]=${user_id}&filters[book][code][$eq]=${book_code}&populate=*`, "get");
  }

  static addMarker = (data) => {
    return ApiApp.ApisType(`/api/markers`, "post", data);
  }

  static updLastPageRead = (data) => {
    return ApiApp.ApisType(`/api/user-books/updLastPage`, "post", data);
  }
  static postStreakDay = (data) => {
    return ApiApp.ApisType('/api/streak-day/save/', "post" , data);
  }

  static getGoalDaily = (data) => {
    return ApiApp.ApisType('/api/daily-goals/lastSuccess/','post',data);
  }

  static getDaysInRow = (data) => {
    return ApiApp.ApisType('/api/streak-days-record/week/', 'post', data);
  }

  static getMaxStreak = (data) => {
    return ApiApp.ApisType('/api/streak-day/getMaxStreak/', 'post', data)
  }

  static getFriendsSuggestions = (data) => {
    return ApiApp.ApisType('/api/user-site-configs/friendsSuggestions/', 'post', data)
  }

  static followFriend = (data) => {
    return ApiApp.ApisType('/api/follow/follow/', 'post', data);
  }

  static unFollowFriend = (data) => {
    return ApiApp.ApisType('/api/follow/unFollow/', 'post', data)
  }

  static getValidateSuscription = (id) => {
    return ApiApp.ApisType(`/api/user-subscription-validate/${id}`, 'get');
  }

  static getModulesSuscription = (id) => {
    return ApiApp.ApisType(`api/user-subscription-modules/${id}`, 'get');
  }

  static _baseURL = baseURL;
}

export default ApiApp;
