import { StyleSheet, View } from 'react-native';

type Props = {
    children: React.ReactNode;
    center?: boolean; // 👈 optional
};

export default function ScreenContainer({ children, center = false }: Props) {
    return (
        <View
            style={[
                styles.outer,
                center && styles.centerVertical, // 👈 conditional
            ]}
        >
            <View style={styles.inner}>{children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    outer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    centerVertical: {
        justifyContent: 'center', // 👈 vertical centering
    },
    inner: {
        width: '100%',
        maxWidth: 420,
        padding: 20,
    },
});
