import { useRouter } from 'expo-router';
import { Alert, View } from 'react-native';
import LoginForm from '../components/LoginForm';
import { login } from '../lib/auth';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = async (username: string, password: string) => {
    try {
      await login(username, password);
      router.replace('/'); // Redirige vers l'accueil
    } catch (e: any) {
      Alert.alert('Erreur', 'Identifiants invalides');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <LoginForm onSubmit={handleLogin} />
    </View>
  );
}
