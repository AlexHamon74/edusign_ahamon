# 📚 Application de Gestion de Présences

Cette application Symfony permet de gérer la présence des élèves à des cours via un système de QR Code. 
Elle fournit une API REST, dashboard d’administration via EasyAdmin et un application mobile avec React Native.

---

## 📦 Installation et Test

1. Installation de l'application Symfony  
```bash
git clone <repo>
composer install
```

N'oublie pas de configurer ta base de données dans `.env.local` et d'exécuter :  
```bash
php bin/console d:d:c
php bin/console d:m:m
php bin/console d:f:l
```

2. Installation de l'application ReactNative
```bash
npm install
```  

3. Tester en local
Dans le fichier `lib/api.ts` du projet ReactNative, modifier cette ligne avec l'adresse Ip de votre pc :
`baseURL: 'http://adresseIp:8000/api'`
Lancez ensuite vos serveur Symfony et ReactNative
```bash
# Dans le dossier Symfony
php -S 0.0.0.0:8000 -t public
# ou
symfony server:start --allow-http --bind=0.0.0.0

# Dans le dossier React Native
npx expo start
```
> ⚠️ Votre téléphone doit être connecté au même réseau Wi-Fi que votre ordinateur.

## 🚀 Fonctionnalités

- 📦 API RESTful exposée avec **API Platform**
- 📸 Génération de **QR Code** par cours pour valider la présence
- 📝 Authentification JWT pour reconnaitre le le user qui scanne le Qr Code
- ✅ Enregistrement de la présence via une route sécurisée
- 📊 Interface d'administration via **EasyAdmin**
- 🧑‍🎓 Gestion des **élèves** (Users) et des **cours** (Lessons)

---

## 🛣️ Routes API importantes

> Ces routes sont générées automatiquement via les annotations `#[ApiResource]` ou définies manuellement.

### 📸 GET `/api/presence/lessons/{id}/qrcode`

- 📤 Génère un QR Code associé à un cours et pointant vers `/api/presence/lessons/{id}/sign`

### 🔐 POST `/api/presence/lessons/{id}/sign`

- 📝 Récupère le token JWT du de l'utilisateur connecté
- ✅ Valide la présence de l'utilisateur connecté au bon cours
- 🔐 Sécurisée (`ROLE_USER`)
- 📥 Exécutée quand l'utilisateur scanne le QR Code

## 🛠️ Dashboard d’Administration (EasyAdmin)

Accès via `/admin`.

## 🧪 Exemple d’usage

1. Un admin crée un **cours** et assignes des **élèves** dans le dashboard.
2. Un QR Code est généré pour le cours.
3. Les élèves scannent le QR Code pour **valider leur présence**.
