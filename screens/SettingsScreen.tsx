// Public Holidays Screen using Holidays API

import { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import AppHeader from '../components/AppHeader';
import ScreenContainer from '../components/ScreenContainer';
import api from '../services/api';

type Country = {
    countryCode: string;
    name: string;
};

type Holiday = {
    date: string;
    name: string;
    localName: string;
};

export default function SettingsScreen() {
    const [countryName, setCountryName] = useState('');
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchHolidays = async () => {
        if (!countryName.trim()) {
            setError('Please enter a country name');
            return;
        }

        setLoading(true);
        setError('');
        setHolidays([]);

        try {
            // 1️⃣ Get supported countries
            const countriesRes = await api.get<Country[]>(
                'https://date.nager.at/api/v3/AvailableCountries'
            );

            // 2️⃣ Match country name (case-insensitive)
            const matchedCountry = countriesRes.data.find(
                (c) => c.name.toLowerCase() === countryName.trim().toLowerCase()
            );

            if (!matchedCountry) {
                setError('Country not supported by the Holidays API');
                setLoading(false);
                return;
            }

            // 3️⃣ Fetch holidays using country code
            const holidaysRes = await api.get<Holiday[]>(
                `https://date.nager.at/api/v3/PublicHolidays/2026/${matchedCountry.countryCode}`
            );

            if (holidaysRes.data.length === 0) {
                setError('No holidays available for this country');
            } else {
                setHolidays(holidaysRes.data);
            }
        } catch {
            setError('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <AppHeader title="Public Holidays 🌍" />

            <ScreenContainer>
                {/* Search Bar */}
                <View style={styles.searchRow}>
                    <TextInput
                        placeholder="Enter country name (e.g. United States)"
                        value={countryName}
                        onChangeText={setCountryName}
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.button} onPress={fetchHolidays}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>

                {/* Loading / Error / Data */}
                {loading ? (
                    <ActivityIndicator size="large" color="#4f46e5" />
                ) : error ? (
                    <Text style={styles.error}>{error}</Text>
                ) : (
                    <FlatList
                        data={holidays}
                        keyExtractor={(item, index) => `${item.date}-${index}`}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                {/* English name */}
                                <Text style={styles.name}>{item.name}</Text>

                                {/* Local name (optional) */}
                                {item.localName !== item.name && (
                                    <Text style={styles.local}>
                                        ({item.localName})
                                    </Text>
                                )}

                                <Text style={styles.date}>{item.date}</Text>
                            </View>
                        )}
                    />
                )}
            </ScreenContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    searchRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 10,
        marginRight: 8,
    },
    button: {
        backgroundColor: '#4f46e5',
        paddingHorizontal: 16,
        justifyContent: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    card: {
        backgroundColor: '#f9fafb',
        padding: 14,
        borderRadius: 12,
        marginBottom: 10,
    },
    name: {
        fontWeight: '600',
        fontSize: 15,
    },
    local: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 2,
    },
    date: {
        marginTop: 4,
        color: '#374151',
    },
    error: {
        color: '#dc2626',
        textAlign: 'center',
        marginTop: 20,
    },
});
