import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
    title: string;
    onPress: () => void;
};

export default function AppButton({ title, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4f46e5',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
