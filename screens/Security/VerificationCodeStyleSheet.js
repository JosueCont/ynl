import {StyleSheet} from "react-native";
import {Colors} from "../../utils/Colors";

export const styles = StyleSheet.create({
    root: {padding: 20, minHeight: 300},
    title: {textAlign: 'center', fontSize: 30},
    fieldRow: {
        marginTop: 20,
        flexDirection: 'row',
        marginLeft: 8,
    },
    cell: {
        width: 55,
        height: 55,
        lineHeight: 55,
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
        marginLeft: 8,
        borderRadius: 6,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: Colors.red
    },
    toggle: {
        width: 55,
        height: 55,
        lineHeight: 55,
        fontSize: 24,
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
});