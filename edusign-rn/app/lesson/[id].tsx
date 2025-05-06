import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import QrScanner from '../../components/QrScanner';
import api from '../../lib/api';

export default function LessonDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showScanner, setShowScanner] = useState(false);

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

  const handleQrScanned = async (data: string) => {
    try {
      setShowScanner(false);
      await api.post(`/presence/lessons/${id}/sign`, {
        qrData: data,
      });
      Alert.alert('Succès', 'Présence enregistrée !');
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur', 'Échec de l'enregistrement de la présence.");
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (!lesson) {
    return (
      <View style={styles.centered}>
        <Text>Ce cours est introuvable.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showScanner ? (
        <QrScanner onScanned={handleQrScanned} onClose={() => setShowScanner(false)} />
      ) : (
        <>
          <Text style={styles.title}>{lesson.name}</Text>
          <Text style={styles.subtitle}>
            Nombre d'inscrits : {lesson.userLessons.length}
          </Text>
          <Button title="📷 Scanner un QR Code" onPress={() => setShowScanner(true)} />
        </>
      )}
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
