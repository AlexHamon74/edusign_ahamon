import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { getToken, logout } from '../lib/auth';

export default function HomeScreen() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const t = await getToken();
      if (!t) {
        router.replace('/login');
      } else {
        setToken(t);
      }
    })();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {token ? (
        <>
          <Text>Bienvenue ! Token chargé ✅</Text>
          <Button title="Se déconnecter" onPress={handleLogout} />
        </>
      ) : (
        <Text>Chargement...</Text>
      )}
    </View>
  );
}
