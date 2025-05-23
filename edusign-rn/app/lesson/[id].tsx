import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View
} from 'react-native';
import api from '../../lib/api';

export default function LessonDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [lesson, setLesson] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Récupération des détails du cours
    useEffect(() => {
        if (!id) return;
        const fetchLesson = async () => {
            try {
                const response = await api.get(`/lessons/${id}`);
                setLesson(response.data);
            } catch (e) {
                console.error('Erreur chargement du cours', e);
            } finally {
                setLoading(false);
            }
        };
        fetchLesson();
    }, [id]);


    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#6200ee" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{lesson.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9fafb',
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 10,
        color: '#1e293b',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
        color: '#334155',
    },
});
