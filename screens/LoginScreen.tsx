import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../types/navigation';

import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';

import ScreenContainer from '../components/ScreenContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
    return (
        <ScreenContainer center>
            <Text style={styles.title}>Login</Text>

            <AppInput placeholder="Mobile / Email" />
            <AppInput placeholder="Password" secureTextEntry />

            <AppButton
                title="Login"
                onPress={() => navigation.replace('Home')}
            />
            <TouchableOpacity>
                <Text style={styles.link}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>Create an account</Text>
            </TouchableOpacity>
        </ScreenContainer>

    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    link: { color: '#4f46e5', marginTop: 10, textAlign: 'center' },
});
