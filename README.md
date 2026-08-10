# ANDROID-RCLONE ZCORE
### *Le Camion Blindé pour Cloud - Version NetSecurePro*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20Termux-green.svg)]()

**android-rclone** est un fork sécurisé de rclone optimisé pour Android et Termux.  
Conçu pour les environnements **Offline-First, OT-Santé et PME** qui exigent une souveraineté totale des données.

Développé par **NetSecurePro** - `did:zcore:`

---

### **LE PROBLÈME**
Les solutions de backup mobile envoient vos données en clair sur le Cloud.  
Risque Loi 25, fuite PII, dépendance Internet. Inacceptable pour la Santé, Finance, Défense.

### **NOTRE SOLUTION ZCORE**
Un client de synchronisation chiffré, offline, audit trail WORM, pour Android.

#### **CARACTÉRISTIQUES CLÉS**

| **Fonction** | **Détail Technique** | **Bénéfice** |
| --- | --- | --- |
| **Chiffrage Client** | `AES-256 + Crypt` natif rclone | Google/OneDrive ne voient que du bruit |
| **Mode Offline** | `File Queue` + Sync auto à la reconnexion | Fonctionne en zone OT sans réseau |
| **Audit WORM** | `Logs anti-modification` avec hash SHA256 | Conformité Loi 25 et traçabilité |
| **Léger** | `< 20MB` - Optimisé ARM64 | Tourne sur Android 8+ et Termux |
| **Multi-Cloud** | `Drive, OneDrive, S3, Dropbox, FTP` | 0 vendor lock-in |
| **Scriptable** | `crontab + intents Android` | Backup auto quotidien |

---

### **INSTALLATION RAPIDE - 30 SECONDES**

#### **Méthode 1 : Termux - Recommandé**
```bash
pkg update && pkg install git
git clone https://github.com/milyes/android-rclone.git
cd android-rclone
./install.sh
arclone config
```

#### **Méthode 2 : APK Natif**
Téléchargez `android-rclone-v1.0.0.apk` dans https://github.com/milyes/android-rclone/releases

---

### **USAGE ZCORE - EXEMPLES**

#### **1. Backup IA_ZERO.07 Chiffré**
```bash
arclone sync /sdcard/IA_ZERO.07 crypt:backups/IA_ZERO.07 --log-file=/sdcard/zcore.log
```

#### **2. Restauration d'Urgence**
```bash
arclone copy crypt:coffre/ /sdcard/Restore
```

#### **3. Backup Auto Quotidien 2h**
```bash
crontab -e
# Ajouter: 0 2 * * arclone sync /sdcard/NetSecurePro crypt:coffre
```

---

### **ARCHITECTURE DE SÉCURITÉ**

`Appareil Android` → `Chiffrage AES-256 Local` → `Sync rclone` → `Cloud Chiffré`  
`Aucune donnée en clair ne quitte l'appareil.`

Compatible avec l'écosystème *NetSecurePro Identity* : `did:zcore:`

---

### **ROADMAP 2026-2027**
- [ ] **v1.1** : Intégration signature `ML-DSA-87 Dilithium5` pour les credentials
- [ ] **v1.2** : Widget Android 1-clic Backup
- [ ] **v1.3** : UI Graphique complète

---

### **CONTACT & SUPPORT**
**Mohammed Ilyes Zoubirou**  
**Fondateur NetSecurePro**  
Email Pro : `milyes@netsecurepro.ca`  
Page Pro : `https://facebook.netsecurepro.ca`  
Montréal, Québec, Canada

**Licence** : MIT. Utilisation commerciale autorisée.  
**Classification** : Open Source - Niveau Souveraineté
