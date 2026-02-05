import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import AppHeader from '../components/AppHeader';
import ScreenContainer from '../components/ScreenContainer';
import { RootStackParamList } from '../types/navigation';


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {

    useEffect(() => {
        getDevicePushToken();
    }, []);


    return (
        <View style={{ flex: 1 }}>
            <AppHeader title="Welcome, User 👋" />

            <ScreenContainer center>
                <View style={styles.grid}>

                    <MenuCard
                        icon="person-circle-outline"
                        label="Profile"
                        onPress={() => navigation.navigate('Profile')}
                    />

                    <MenuCard
                        icon="calendar-outline"
                        label="Public Holidays"
                        onPress={() => navigation.navigate('Settings')}
                    />

                    <MenuCard
                        icon="school-outline"
                        label="Universities"
                        onPress={() => navigation.navigate('About')}
                    />

                    <MenuCard
                        icon="log-out-outline"
                        label="Logout"
                        onPress={() => navigation.replace('Login')}
                        danger
                    />
                </View>
            </ScreenContainer>
        </View>
    );
}

async function getDevicePushToken() {
    if (!Device.isDevice) {
        console.log('Must use a physical device');
        return;
    }

    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== 'granted') {
        console.log('Permission not granted');
        return;
    }

    const tokenResponse = await Notifications.getExpoPushTokenAsync();
    console.log('Expo Push Token:', tokenResponse.data);
}


/* 🔹 Reusable Menu Card */
function MenuCard({
    icon,
    label,
    onPress,
    danger = false,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
    danger?: boolean;
}) {
    return (
        <TouchableOpacity
            style={[styles.card, danger && styles.dangerCard]}
            onPress={onPress}
        >
            <Ionicons
                name={icon}
                size={32}
                color={danger ? '#dc2626' : '#4f46e5'}
            />
            <Text style={[styles.cardText, danger && styles.dangerText]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: '#f9fafb',
        borderRadius: 14,
        padding: 20,
        alignItems: 'center',
        marginBottom: 16,
        elevation: 3,
    },
    cardText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    dangerCard: {
        backgroundColor: '#fee2e2',
    },
    dangerText: {
        color: '#dc2626',
    },
});
