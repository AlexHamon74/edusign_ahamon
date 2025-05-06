import { CameraView, PermissionStatus, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  onScanned: (data: string) => void;
  onClose: () => void;
}

export default function QrScanner({ onScanned, onClose }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission || permission.status !== PermissionStatus.GRANTED) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!scanned) {
      setScanned(true);
      onScanned(data);
    }
  };

  if (!permission) {
    return (
      <View style={styles.centered}>
        <Text>Chargement des permissions caméra...</Text>
      </View>
    );
  }

  if (permission.status === PermissionStatus.DENIED) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>
          Permission caméra refusée. Veuillez l'autoriser dans les réglages.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={handleBarCodeScanned}
      />
      <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
        <Text style={styles.closeText}>✕ Fermer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  closeBtn: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#000000aa',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
});
