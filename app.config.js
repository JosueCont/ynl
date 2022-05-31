const commonConfig = {
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
    buildNumber: "9",
    supportsTablet: false,
    bundleIdentifier: "com.hiumanlab.ynl"
};

const android = {
    versionCode: 3,
    adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
    },
    package: "com.hiumanlab.ynl",
    permissions: []
};

module.exports = () => {
    if (process.env.APP_ENV === "ios") {
        return {
            ...commonConfig,
            name: "Your Next Level",
            slug: "ynl",
            version: "1.0.0",
            ios: ios,
        };
    } else if (process.env.APP_ENV === "android") {
        return {
            ...commonConfig,
            name: "Your Next Level",
            slug: "ynl",
            version: "1.0.0",
            android: android,
        };
    } else if (process.env.APP_ENV === "expo") {
        return {
            ...commonConfig,
            name: "Your Next Level",
            slug: "ynl-dev",
            version: "1.0.0",
            ios: ios,
            android: android,
        };
    }
};