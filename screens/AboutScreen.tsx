import { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Linking,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import AppHeader from '../components/AppHeader';
import ScreenContainer from '../components/ScreenContainer';
import api from '../services/api';

type University = {
    name: string;
    web_pages: string[];
};

export default function AboutScreen() {
    const [country, setCountry] = useState('India');
    const [universities, setUniversities] = useState<University[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchUniversities = () => {
        if (!country.trim()) return;

        setLoading(true);
        api
            .get(`http://universities.hipolabs.com/search?country=${country}`)
            .then(res => setUniversities(res.data))
            .catch(err => console.log('University API error:', err))
            .finally(() => setLoading(false));
    };

    return (
        <View style={{ flex: 1 }}>
            <AppHeader title="Universities by Country 🎓" />

            <ScreenContainer>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Enter country name"
                        value={country}
                        onChangeText={setCountry}
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.button} onPress={fetchUniversities}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#4f46e5" />
                ) : (
                    <FlatList
                        data={universities}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text
                                    style={styles.link}
                                    onPress={() => Linking.openURL(item.web_pages[0])}
                                >
                                    {item.web_pages[0]}
                                </Text>
                            </View>
                        )}
                    />
                )}
            </ScreenContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
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
    },
    link: {
        color: '#4f46e5',
        marginTop: 4,
    },
});
