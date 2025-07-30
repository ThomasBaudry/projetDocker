# Tests de l'Application

Ce dossier contient les tests pour vérifier que votre application fonctionne correctement.

## Types de tests

### 1. Tests simples (simple.test.js)
- Tests rapides qui utilisent **supertest**
- Ne nécessitent pas de lancer le serveur manuellement
- Testent directement l'application Express
- **Recommandés pour le développement quotidien**

### 2. Tests end-to-end (app.test.js)
- Tests complets qui utilisent **Puppeteer**
- Lancent automatiquement le serveur
- Testent l'application dans un vrai navigateur
- Plus lents mais plus proches de l'expérience utilisateur

## Tests effectués

Tous les tests vérifient que :
- ✅ La page principale contient le texte "Hey"
- ✅ La page a le bon titre "Title"
- ✅ La page répond correctement (status HTTP 200)
- ✅ Le HTML est valide

## Comment lancer les tests

```bash
# Lancer tous les tests
npm test

# Lancer les tests en mode watch (relance automatiquement)
npm run test:watch

# Lancer seulement les tests simples
npx jest tests/simple.test.js

# Lancer seulement les tests end-to-end
npx jest tests/app.test.js
```

## Résultats attendus

Quand vous lancez `npm test`, vous devriez voir :
```
✓ La page principale doit répondre avec un status 200
✓ La page principale doit contenir le texte "Hey"
✓ La page principale doit avoir le bon titre
✓ La page principale doit être du HTML valide
✓ Le contenu de la page doit contenir exactement "Hey" dans le body
✓ La page doit contenir le texte "Hey"
✓ La page doit avoir le bon titre
✓ La page doit répondre avec un status 200 ou 304

Test Suites: 2 passed, 2 total
Tests: 8 passed, 8 total
```

## Dépendances utilisées

- **Jest** : Framework de test
- **Supertest** : Pour tester les API HTTP
- **Puppeteer** : Pour les tests end-to-end avec un navigateur