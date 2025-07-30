const puppeteer = require('puppeteer');
const { spawn } = require('child_process');

describe('Application Tests', () => {
    let browser;
    let page;
    let server;

    beforeAll(async () => {
        // Démarrer le serveur Express
        server = spawn('node', ['index.js'], {
            cwd: process.cwd(),
            stdio: 'pipe'
        });

        // Attendre que le serveur démarre
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Lancer le navigateur
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        page = await browser.newPage();
    });

    afterAll(async () => {
        // Fermer le navigateur
        if (browser) {
            await browser.close();
        }
        
        // Arrêter le serveur
        if (server) {
            server.kill();
        }
    });

    test('La page doit contenir le texte "Hey"', async () => {
        // Naviguer vers la page
        await page.goto('http://localhost:3000');
        
        // Vérifier que le texte "Hey" est présent
        const pageContent = await page.content();
        expect(pageContent).toContain('Hey');
        
        // Alternative : vérifier avec le texte visible
        const bodyText = await page.evaluate(() => document.body.textContent);
        expect(bodyText.trim()).toBe('Hey');
    });

    test('La page doit avoir le bon titre', async () => {
        await page.goto('http://localhost:3000');
        
        const title = await page.title();
        expect(title).toBe('Title');
    });

    test('La page doit répondre avec un status 200 ou 304', async () => {
        const response = await page.goto('http://localhost:3000');
        expect([200, 304]).toContain(response.status());
    });
});