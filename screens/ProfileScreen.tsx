import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import AppHeader from '../components/AppHeader';
import ScreenContainer from '../components/ScreenContainer';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
    return (
        <View style={{ flex: 1 }}>
            <AppHeader title="My Profile" />

            <ScreenContainer center>
                {/* Avatar */}
                <View style={styles.avatarContainer}>
                    <Ionicons name="person-circle" size={120} color="#4f46e5" />
                    <Text style={styles.name}>Akshatha Shenoy</Text>
                </View>

                {/* Info Cards */}
                <ProfileItem icon="mail-outline" label="Email" value="akshatha45@gmail.com" />
                <ProfileItem icon="call-outline" label="Mobile" value="9876543210" />

                <AppButton title="Edit Profile" onPress={() => { }} />
                <AppButton title="Back" onPress={() => navigation.goBack()} />
            </ScreenContainer>
        </View>
    );
}

/* 🔹 Reusable profile row */
function ProfileItem({
    icon,
    label,
    value,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: string;
}) {
    return (
        <View style={styles.item}>
            <Ionicons name={icon} size={22} color="#4f46e5" />
            <View style={{ marginLeft: 12 }}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 8,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
    },
    label: {
        fontSize: 12,
        color: '#6b7280',
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
    },
});
