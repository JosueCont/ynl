const commonConfig = {
    name: "Your Next Level",
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
        URL_IMAGES: "https://ynl-api.herokuapp.com"
    }
};

const ios = {
    buildNumber: "24",
    supportsTablet: false,
    bundleIdentifier: "com.hiumanlab.ynl",
    usesAppleSignIn: true,
};

const android = {
    versionCode: 18,
    adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundImage: "./assets/adaptive-icon-bg.png"
    },
    package: "com.hiumanlab.ynl",
    googleServicesFile: "./google-services.json",
    permissions: [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "INTERNET",
        "ACCESS_MEDIA_LOCATION"
    ]
};

module.exports = () => {
    if (process.env.APP_ENV === "ios") {
        return {
            ...commonConfig,
            slug: "ynl",
            version: "1.0.0",
            ios: ios,
        };
    } else if (process.env.APP_ENV === "android") {
        return {
            ...commonConfig,
            slug: "ynl",
            version: "1.0.0",
            android: android,
        };
    } else if (process.env.APP_ENV === "expo") {
        return {
            ...commonConfig,
            slug: "ynl-dev",
            version: "1.0.0",
            ios: ios,
            android: android,
        };
    }
};