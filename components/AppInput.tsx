import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export default function AppInput(props: TextInputProps) {
    return (
        <TextInput
            {...props}
            style={styles.input}
            placeholderTextColor="#999"
        />
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
    },
});
