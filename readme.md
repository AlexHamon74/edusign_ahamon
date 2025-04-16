# 📱 Tester la présence via QR Code sur téléphone

Objectif : Un élève est par défault absent et on veux qu'il soit présent s'il scanne le QRcode avec son téléphone.

---

## Étapes :

1. **Modifier l'URL dans `QrCodeController.php` :**

Décommenter ce code :
```php
    $ip = '10.26.131.145';
    $port = 8000;
    $url = "http://$ip:$port/api/eleves/{$eleve->getId()}/sign";
```

2. **Lancer le serveur Symfony en local :**
```
php -S 0.0.0.0:8000 -t public
```

3. **Depuis ton PC :**  
Ouvre le QR code dans le navigateur  
👉 http://localhost:8000/api/eleves/1/qr-code


5. **Depuis ton téléphone :**  
Scanne le QR code  
Cela aura pour effet de requêter la route http://10.26.131.145:8000/api/eleves/1/sign  
✅ L’élève est marqué présent 🎉
