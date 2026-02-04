import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/logo1.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.appName}>MyApp</Text>
            <Text style={styles.loading}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 15,
    },
    appName: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    loading: {
        fontSize: 14,
        color: '#777',
    },
});
