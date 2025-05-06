import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginForm({ onSubmit }: { onSubmit: (u: string, p: string) => void }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/pseudosign.png')} style={styles.logo} />

            <TextInput
                placeholder="Nom d'utilisateur"
                placeholderTextColor="#aaa"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />

            <TextInput
                placeholder="Mot de passe"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={() => onSubmit(username, password)}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9fafb',
        flex: 1,
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    input: {
        width: '100%',
        maxWidth: 360,
        padding: 14,
        borderRadius: 12,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 18,
        fontSize: 16,
    },
    button: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#6200ee',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
    },
});
