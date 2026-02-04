import { StyleSheet, Text, View } from 'react-native';

type Props = {
    title: string;
};

export default function AppHeader({ title }: Props) {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: '#4f46e5',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
