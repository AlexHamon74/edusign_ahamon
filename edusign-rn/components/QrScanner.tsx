import { CameraView, PermissionStatus, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    onScanned: (data: string) => void;
    onClose: () => void;
}

export default function QrScanner({ onScanned, onClose }: Props) {
    const [permission, requestPermission] = useCameraPermissions();
    const scannedRef = useRef(false);
    const [_, setDummyState] = useState(false);

    // Demande de permission caméra 
    useEffect(() => {
        if (!permission || permission.status !== PermissionStatus.GRANTED) {
            requestPermission();
        }
    }, [permission]);

    // Réinitialise le scanner si la permission change
    const handleBarCodeScanned = ({ data }: { data: string }) => {
        if (!scannedRef.current) {
            scannedRef.current = true;
            onScanned(data);
        }
    };

    if (!permission) {
        return (
            <View style={styles.centered}>
                <Text style={styles.permissionText}>Chargement des permissions caméra...</Text>
            </View>
        );
    }

    // Vérifie si la permission est accordée
    if (permission.status === PermissionStatus.DENIED) {
        return (
            <View style={styles.centered}>
                <Text style={styles.permissionDenied}>
                    Permission caméra refusée. Veuillez l'autoriser dans les réglages.
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.fullscreen}>
            <CameraView
                style={StyleSheet.absoluteFill}
                barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                onBarcodeScanned={handleBarCodeScanned}
            />
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>✕ Fermer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fullscreen: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'flex-end',
    },
    overlay: {
        width: '100%',
        paddingHorizontal: 24,
        paddingBottom: 40,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    closeButton: {
        backgroundColor: '#ffffffcc',
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 14,
        elevation: 5,
    },
    closeButtonText: {
        color: '#111827',
        fontSize: 16,
        fontWeight: '600',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9fafb',
    },
    permissionText: {
        fontSize: 16,
        color: '#374151',
    },
    permissionDenied: {
        fontSize: 16,
        color: '#ef4444',
        textAlign: 'center',
    },
});
