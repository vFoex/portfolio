   # 🚀 Portfolio Valentin Foex

Portfolio moderne centré sur les projets, construit avec Next.js et Sanity CMS.

## Démarrage Rapide

### 1. Installer les dépendances
```bash
npm install
```

### 2. Lancer le serveur
```bash
npm run dev
```

Visitez http://localhost:3000

### 3. Remplir vos projets

**Obtenir un token Sanity :**
1. Allez sur https://www.sanity.io/manage
2. Sélectionnez votre projet
3. API → Tokens → Add API token
4. Permission : **Editor**
5. Copiez le token

**Ajouter le token dans `.env.local` :**
```env
SANITY_API_TOKEN="votre_token_ici"
```

**Remplir les projets automatiquement :**
```bash
npm run seed
```

Cela ajoutera automatiquement vos 5 projets du CV :
- ✅ LaTomate Chrome Extension
- ✅ Binance Trading Bot  
- ✅ Queens Game Web App
- ✅ Pokémon GO-Style Mobile Game
- ✅ Recipe Recommendation Platform

### 4. Gérer le contenu

Allez sur http://localhost:3000/studio pour :
- Ajouter des images à vos projets
- Modifier les descriptions
- Ajouter de nouveaux projets
- Réorganiser l'ordre

## Fonctionnalités

- 🎨 Design moderne minimaliste (fond noir)
- 📱 Responsive design
- 🖼️ Support d'images et galeries
- 📝 Descriptions riches avec PortableText
- 🔗 Liens GitHub et Live Demo
- 🏷️ Tags de technologies
- 📊 Statut des projets (In Progress / Completed)
- ⭐ Projets featured

## Structure

```
app/
  page.tsx              # Page d'accueil avec liste des projets
  project/[slug]/       # Page de détail de chaque projet
  studio/               # Interface admin Sanity
sanity/
  schemas/project.ts    # Schéma des projets
scripts/
  seed-projects.ts      # Script pour remplir les données
```

## Déploiement

Déployez sur Vercel en un clic :
1. Push sur GitHub
2. Import sur Vercel
3. Ajoutez les variables d'environnement
4. Deploy!

