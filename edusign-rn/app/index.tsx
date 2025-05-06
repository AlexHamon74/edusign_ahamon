import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import QrScanner from '../components/QrScanner';
import api from '../lib/api';
import { getToken, getUsernameFromToken, logout } from '../lib/auth';

// Interface pour les données des cours
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
    const [showScanner, setShowScanner] = useState(false);

    // Initialisation des données utilisateur et cours
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

    // Déconnexion de l'utilisateur
    const handleLogout = async () => {
        await logout();
        router.replace('/login');
    };

    // Gestion du scan du QR code
    const handleQrScanned = async (data: string) => {
        try {
            setShowScanner(false);

            // Extraire l'ID depuis l'URL du QR code
            const match = data.match(/\/lessons\/(\d+)\/sign/);
            const lessonId = match ? match[1] : null;

            if (!lessonId) {
                throw new Error('QR code invalide.');
            }

            await api.post(`/presence/lessons/${lessonId}/sign`, {
                qrData: data,
            });

            Alert.alert('Succès', 'Présence enregistrée !');
        } catch (error) {
            console.error('Erreur lors du scan :', error);
            Alert.alert('Erreur', "Échec de l'enregistrement de la présence.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {showScanner ? (
                <QrScanner
                    onScanned={handleQrScanned}
                    onClose={() => setShowScanner(false)}
                />
            ) : (
                <>
                    <View style={styles.header}>
                        <Text style={styles.logoText}>Pseudosign</Text>
                    </View>

                    <Text style={styles.greeting}>Bienvenue, {username} 👋</Text>

                    <Text style={styles.heading}>📚 Cours disponibles</Text>

                    {/* Bouton pour scanner un QR code */}
                    <TouchableOpacity
                        onPress={() => setShowScanner(true)}
                        style={styles.scanButton}
                    >
                        <Text style={styles.scanButtonText}>📷 Scanner un QR Code</Text>
                    </TouchableOpacity>

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

                    {/* Bouton de déconnexion */}
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                            <Text style={styles.logoutButtonText}>Se déconnecter</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </ScrollView>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9fafb',
        flexGrow: 1,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logoText: {
        fontSize: 36,
        fontWeight: '700',
        color: '#6200ee',
    },
    greeting: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 30,
        color: '#333',
    },
    heading: {
        fontSize: 20,
        fontWeight: '500',
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
    scanButton: {
        backgroundColor: '#6200ee',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 6,
    },
    scanButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    logoutButton: {
        backgroundColor: '#ff5252',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        marginTop: 'auto', // Ce style permet de pousser le bouton en bas
        marginBottom: 16,
    },
});
