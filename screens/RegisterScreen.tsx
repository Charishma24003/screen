import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text } from 'react-native';
import { RootStackParamList } from '../types/navigation';

import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';

import ScreenContainer from '../components/ScreenContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
    return (
        <ScreenContainer center>
            <Text style={styles.title}>Register</Text>

            <AppInput placeholder="Name" />
            <AppInput placeholder="Mobile / Email" />
            <AppInput placeholder="Password" secureTextEntry />
            <AppInput placeholder="Confirm Password" secureTextEntry />

            <AppButton
                title="Register"
                onPress={() => navigation.replace('Login')}
            />
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
