import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../lib/api';
import { getToken, getUsernameFromToken, logout } from '../lib/auth';

interface Lesson {
    id: number;
    name: string;
    userLessons: string;
}

export default function HomeScreen() {
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const token = await getToken();
            if (!token) {
                router.replace('/login');
                return;
            }

            const user = await getUsernameFromToken();
            setUsername(user);

            try {
                const response = await api.get('/lessons');
                setLessons(response.data.member);
            } catch (e) {
                console.error('Erreur chargement des cours', e);
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    const handleLogout = async () => {
        await logout();
        router.replace('/login');
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#6200ee" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.greeting}>Bienvenue, {username} 👋</Text>

            <Text style={styles.heading}>📚 Cours disponibles</Text>

            {lessons.map((lesson) => (
                <TouchableOpacity
                    key={lesson.id}
                    onPress={() => router.push(`/lesson/${lesson.id}`)}
                >
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{lesson.name}</Text>
                        <Text style={styles.cardDescription}>
                            {lesson.userLessons.length} participant(s)
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}

            <Button title="Se déconnecter" onPress={handleLogout} color="#ff5252" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f3f4f6',
        flexGrow: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    greeting: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 16,
        color: '#333',
    },
    heading: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 12,
        color: '#6200ee',
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
});
