const commonConfig = {
    name: "YNL",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
        image: "./assets/splash.png",
        resizeMode: "cover",
        backgroundColor: "#ffffff"
    },
    plugins: [
        [
            "expo-image-picker",
            {
                "photosPermission": "The app accesses your photos to let you share them with your friends."
            }
        ],
        [
            "expo-build-properties",
            {
                "android": {
                    "kotlinVersion": "1.6.21"
                }
            }
        ]
    ],
    updates: {
        fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
        "**/*"
    ],

    web: {
        favicon: "./assets/favicon.png"
    },
    extra: {
        production: false,
        URL: "https://ynl-api.herokuapp.com/",
        URL_IMAGES: "https://ynl-api.herokuapp.com",
        eas: {
            //projectId: "e40cc408-c905-40aa-8963-026e5b773e54"
           projectId: "a72f473a-2218-4a3a-8a61-c00f72861e6a"
        }

    }
};

const ios = {
    buildNumber: "47",
    supportsTablet: false,
    bundleIdentifier: "com.hiumanlab.ynl",
    usesAppleSignIn: true,
};

const android = {
    versionCode: 47,
    icon: "./assets/icon.png",
    adaptiveIcon: {
        "foregroundImage": "./assets/icon.png", //here put your icon
        "backgroundColor": "#F4B21D"
      },
    // adaptiveIcon: {
    //     foregroundImage: "./assets/adaptive-icon.png",
    //     backgroundImage: "./assets/adaptive-icon-bg.png"
    // },
    package: "com.hiumanlab.ynl",
    googleServicesFile: "./google-services.json",
    permissions: [
        "INTERNET",
        "ACCESS_MEDIA_LOCATION"
    ]
};

module.exports = () => {
    if (process.env.APP_ENV === "ios") {
        return {
            ...commonConfig,
            slug: "ynl",
            version: "2.1.4",
            ios: ios,
        };
    } else if (process.env.APP_ENV === "android") {
        return {
            ...commonConfig,
            slug: "ynl",
            version: "2.1.4",
            android: android
        };
    } else if (process.env.APP_ENV === "expo") {
        return {
            ...commonConfig,
            slug: "ynl-dev",
            version: "2.1.4",
            ios: ios,
            android: android,
        };
    }else if (process.env.APP_ENV === "OTA") {
        return {
            ...commonConfig,
            slug: "ynl",
            version: "2.1.4",
            android: android,
            ios: ios,
        };
    }
};