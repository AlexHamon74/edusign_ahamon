# 📚 Application de Gestion de Présences

Cette application Symfony permet de gérer la présence des élèves à des cours via un système de QR Code. 
Elle fournit une API REST, dashboard d’administration via EasyAdmin et un application mobile avec React Native.

---

## 📦 Installation

```bash
git clone <repo>
composer install
```

N'oublie pas de configurer ta base de données dans .env.local et d'exécuter :  
```bash
php bin/console d:m:m
php bin/console d:f:l
```


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
