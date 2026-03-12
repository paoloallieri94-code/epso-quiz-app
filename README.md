# EPSO AD5 Quiz App

App di quiz interattivi per la preparazione al concorso EPSO/AD/427/26 - Amministratori AD5

## 🚀 Deployment su GitHub Pages

### Prerequisiti
- Node.js (versione 14 o superiore)
- Account GitHub
- Git installato sul tuo computer

### Istruzioni Passo-Passo

#### 1. Prepara il progetto localmente

```bash
# Estrai lo ZIP e naviga nella cartella
cd epso-quiz-app

# Installa le dipendenze
npm install
```

#### 2. Configura il tuo username GitHub

Apri il file `package.json` e modifica la riga:
```json
"homepage": "https://TUO-USERNAME.github.io/epso-quiz-app"
```

Sostituisci `TUO-USERNAME` con il tuo username GitHub effettivo.

#### 3. Crea il repository su GitHub

1. Vai su [github.com](https://github.com)
2. Clicca su "New repository" (pulsante verde)
3. Nome repository: `epso-quiz-app`
4. Lascia **deselezionato** "Initialize this repository with a README"
5. Clicca "Create repository"

#### 4. Collega e pubblica il progetto

```bash
# Inizializza Git (se non già fatto)
git init

# Aggiungi tutti i file
git add .

# Fai il primo commit
git commit -m "Initial commit - EPSO Quiz App"

# Aggiungi il repository remoto (sostituisci TUO-USERNAME con il tuo username GitHub)
git remote add origin https://github.com/TUO-USERNAME/epso-quiz-app.git

# Pubblica sul branch main
git branch -M main
git push -u origin main
```

#### 5. Deploy su GitHub Pages

```bash
npm run deploy
```

Questo comando:
- Compila l'app in versione ottimizzata
- Crea un branch `gh-pages`
- Pubblica automaticamente su GitHub Pages

#### 6. Attiva GitHub Pages (solo la prima volta)

1. Vai sul tuo repository GitHub
2. Clicca su "Settings" (Impostazioni)
3. Nel menu laterale, clicca su "Pages"
4. In "Source", dovrebbe essere già selezionato `gh-pages` branch
5. Clicca "Save" se necessario

#### 7. Accedi alla tua app

Dopo qualche minuto, la tua app sarà disponibile su:
```
https://TUO-USERNAME.github.io/epso-quiz-app
```

## 🔄 Aggiornare l'app dopo modifiche

Ogni volta che fai modifiche al codice:

```bash
# Salva le modifiche
git add .
git commit -m "Descrizione delle modifiche"
git push

# Rideploy su GitHub Pages
npm run deploy
```

## 🛠️ Comandi Disponibili

- `npm start` - Avvia l'app in modalità sviluppo (localhost:3000)
- `npm run build` - Compila l'app per la produzione
- `npm run deploy` - Deploy su GitHub Pages
- `npm test` - Esegue i test

## 📋 Struttura del Progetto

```
epso-quiz-app/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Componente principale con tutta la logica
│   ├── App.css         # Stili dell'applicazione
│   └── index.js        # Entry point
├── package.json        # Dipendenze e configurazione
└── README.md          # Questo file
```

## 🎯 Caratteristiche

- ✅ 3 categorie di quiz (Ragionamento, Conoscenza UE, Competenze Digitali)
- ✅ 5 domande per categoria con spiegazioni dettagliate
- ✅ Sistema di punteggio con soglia di superamento al 50%
- ✅ Interfaccia moderna e responsive
- ✅ Visualizzazione risultati con riepilogo risposte

## 🐛 Risoluzione Problemi

### "npm: command not found"
- Installa Node.js da [nodejs.org](https://nodejs.org)

### Errore durante `npm install`
- Prova a cancellare `node_modules` e `package-lock.json`, poi riesegui `npm install`

### L'app non si vede su GitHub Pages
- Controlla che il branch `gh-pages` sia stato creato
- Verifica nelle Settings > Pages che sia configurato correttamente
- Aspetta qualche minuto dopo il deploy (può richiedere fino a 10 minuti)

### URL non funziona
- Verifica di aver sostituito `TUO-USERNAME` nel package.json con il tuo username GitHub
- Assicurati che il nome del repository sia esattamente `epso-quiz-app`

## 📧 Supporto

Per problemi o domande, apri una Issue sul repository GitHub.

## 📝 Licenza

Progetto creato per la preparazione al concorso EPSO AD5.
