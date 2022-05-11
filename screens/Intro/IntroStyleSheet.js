import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',

    },
    header: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#375177",
        marginBottom: 10
    },
    description: {
        fontSize: 12,
        padding: 5
    },
    startBtn: {
        backgroundColor: "#90bdff",
        borderRadius: 50,
        padding: 10,
        width: "50%",
        alignItems: "center",
        marginTop: 50
    },
    startText: {
        color: "white"
    },
    contentContainer: {
        borderWidth: 2,
        borderColor: '#CCC',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        flex: 1,
        height: "100%",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 320,
        height: 320,
        marginVertical: 32,
    },
    text: {
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
    },
    title: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
    },
    buttonCircle: {
        width: 30,
        height: 30,
        backgroundColor: 'red',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        right: 20
    }
});