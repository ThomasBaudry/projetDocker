const request = require('supertest');
const express = require('express');
const path = require('path');

// Créer l'application Express pour les tests
const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));

describe('Tests simples de l\'application', () => {
    test('La page principale doit répondre avec un status 200', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });

    test('La page principale doit contenir le texte "Hey"', async () => {
        const response = await request(app).get('/');
        expect(response.text).toContain('Hey');
    });

    test('La page principale doit avoir le bon titre', async () => {
        const response = await request(app).get('/');
        expect(response.text).toContain('<title>Title</title>');
    });

    test('La page principale doit être du HTML valide', async () => {
        const response = await request(app).get('/');
        expect(response.text).toContain('<!DOCTYPE html>');
        expect(response.text).toContain('<html lang="en">');
        expect(response.text).toContain('</html>');
    });

    test('Le contenu de la page doit contenir exactement "Hey" dans le body', async () => {
        const response = await request(app).get('/');
        // Extraire le contenu du body
        const bodyMatch = response.text.match(/<body[^>]*>(.*?)<\/body>/s);
        expect(bodyMatch).toBeTruthy();
        const bodyContent = bodyMatch[1].trim();
        expect(bodyContent).toBe('Hey');
    });
});