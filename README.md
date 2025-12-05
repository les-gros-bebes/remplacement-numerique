# Remplacement Numérique

Remplacement Numérique est un Visual Novel dans lequel le joueur est assisté par un mage venu d'un monde numérique idéal dans sa quête d'éduquer à la souveraineté numérique et responsabiliser les élèves, enseignants et familles des établissements scolaires français

## Membres

Ecole CNAM ISI Strasbourg, 3ème année.

- Robin Bechlem
- Ian Bellot
- Alizée Hett
- Maël Ehrhard
- Axel Munch
- Alexandre Offerle
- Mathilde

## Liens

- GitHub [https://github.com/les-gros-bebes/remplacement-numerique](https://github.com/les-gros-bebes/remplacement-numerique)
- Application déployée [https://nuit-difficile-pour-les-gros-bebes.netlify.app](https://nuit-difficile-pour-les-gros-bebes.netlify.app)

## Features réalisées

Le jeu est séparé en 5 zones, accessibles depuis la carte globale. Chacune correspond à une thématique liée à la démarche NIRD

- Salle de classe - système d'exploitation
- Bureau du directeur - gestionnaire de mots de passe
- Préau - [Défi \"Hidden Snake 📦\"](https://nuit-difficile-pour-les-gros-bebes.netlify.app/preau)
- CDI - navigation internet & [Défi \"On veut du gros pixel ! ✨🎮👾🕹️\"](https://nuit-difficile-pour-les-gros-bebes.netlify.app/cdi)
- Gymnase - [Défi \"🏆 Devenez le CTO de Votre Santé Posturale\"](https://nuit-difficile-pour-les-gros-bebes.netlify.app/gymnase)

En plus des zones, le défi "Chat'bruti" est accessible en cliquant sur le bouton en bas à droite de la fenêtre

## Assets

Main theme: Alexandr Zhelanov [https://soundcloud.com/alexandr-zhelanov](https://soundcloud.com/alexandr-zhelanov) (CC-BY 4.0)

## Défi \"Hidden Snake 📦\"

Attraper le serpent sur la page Préau pour déclencher le mini jeu Snake

## Défi "On veut du gros pixel ! ✨🎮👾🕹️"

### 🥚 Easter Eggs & Interactions

| Trigger               | Action            | Description                                    |
| :-------------------- | :---------------- | :--------------------------------------------- |
| **Menu "Actions"**    | 🧱 **Tetris**     | Lance un clone de Tetris en React.             |
| **Touche F3**         | 🕺 **Rick Roll**  | Ouvre une vidéo YouTube surprise.              |
| **Touche F4**         | 🪟 **Windows 95** | Lance la simulation de bureau Windows 95.      |
| **Label "F3=Exit"**   | 🕺 **Rick Roll**  | Alternative au raccourci clavier.              |
| **Label "F4=Prompt"** | 🪟 **Windows 95** | Alternative au raccourci clavier.              |
| **Bouton 'x'**        | 🏠 **Home**       | Redirige l'utilisateur vers la page d'accueil. |

### 💥 Séquence "Critical Error"

Si l'utilisateur atteint l'étape `system_access`, une animation d'erreur critique se déclenche :

1.  Écran rouge clignotant.
2.  Message "BLACKROCK SYSTEMS DOWN".
3.  Compte à rebours de 3 secondes.
4.  Redirection forcée vers `/home`.

### 👹 Doom (WebAssembly Port)

Le portage du légendaire **DOOM (1993)**, exécuté directement dans le navigateur via WebAssembly via l'easter egg Windows 95.

#### Architecture Technique

- **Moteur** : Portage WASM de `doomgeneric` (basé sur les travaux de _Diekmann_).
- **Fichiers** :
  - `doom.wasm` : Le binaire du jeu compilé.
  - `doom.js` : Le "glue code" JavaScript pour l'instanciation WASM.
  - `doom1.wad` : Les données du jeu (Shareware version).
- **Rendu** : Canvas HTML5 (`<canvas>`) avec rendu pixelisé (`imageRendering: "pixelated"`).

### 🎮 Contrôles (Clavier)

Le jeu a été adapté pour supporter les layouts modernes (ZQSD) et classiques.

| Action                | Touche Principale | Touche Alternative |
| :-------------------- | :---------------- | :----------------- |
| **Avancer**           | `Z` / `W`         | `Flèche Haut`      |
| **Reculer**           | `S`               | `Flèche Bas`       |
| **Gauche**            | `Q` / `A`         | `Flèche Gauche`    |
| **Droite**            | `D`               | `Flèche Droite`    |
| **Tirer**             | `Espace`          | `Ctrl`             |
| **Ouvrir / Utiliser** | `E`               | -                  |
| **Courir**            | `Shift`           | -                  |
| **Changer d'arme**    | `1` - `7`         | -                  |
| **Menu**              | `Echap`           | -                  |
| **Valider**           | `Entrée`          | -                  |

## Défi \"🏆 Devenez le CTO de Votre Santé Posturale\"

Questionnaire détaillé sur le Gymnase, puis présentation d'entrainements et d'articles liés.
La routine d'entrainement permet une séance de sport complète liée aux réponses au formulaire.

## Chat\'bruti

Icône chatbot en bas à droite de l'écran pour activer le chatbot.
Le chatbot répond par oui ou par non de manière originale.
