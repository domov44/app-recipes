## Application de recettes
<a name="readme-top"></a>

<br />
  <h3 align="center">Application de recettes</h3>

<details>
  <summary>Sommaires</summary>
  <ol>
    <li>
      <a href="#a-propos-du-projet">A propos de l'application</a>
      <ul>
      <li>
      <a href="#prerequis">Prérequis pour travailler en local</a>
      </li>
        <li>
         <a href="#lancer-le-projet-en-local">Lancer le projet en local</a>
      </li>
      </ul>
    </li>
    <li>
      <a href="#commencer-une-feature">Commencer une feature</a>
    </li>
    <li>
      <a href="#une-fois-la-feature-terminee">Une fois que la feature est trerminée</a>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## A propos du projet

Ce projet est une application SaaS de recette en Next, Express et MySQL.

<p align="right">(<a href="#readme-top">revenir en haut</a>)</p>


## Prerequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine locale :
1. Nodejs v20.*
```sh
node -v
```

2. Avoir Wamp d'installé et d'activé. 
https://www.wampserver.com/

<p align="right">(<a href="#readme-top">revenir en haut</a>)</p>




## Lancer le projet en local

Pour lancer le projet en lcoal suivez ces instructions :
1. Clonez le repo git dans un dossier qui porte le nom du projet
```sh
git clone https://github.com/domov44/app_recettes .
```

2. Ouvrez le projet dans votre IDE

3. Ouvrez un terminal dans le dossier du projet et installez les dépendances du backend puis lancez le 
```sh
cd backend
```

```sh
npm install
```

```sh
npm start
```

4.  Ouvrez un second terminal dans le dossier du projet et installez les dépendances du frontend puis lancez le 
```sh
cd frontend
```

```sh
npm install
```

```sh
npm run dev
```

5.  Initiez la database avec sequelize depuis le dossier backend
```sh
cd backend
```

```sh
npm run db:init
```

6.  Créer 2 fichiers dans le dossier backend, 
Le premier "private_key.pem", et le second "public_key.pem"

7. Générer les 2 clés en 20248 bit sur https://travistidwell.com/jsencrypt/demo/ et les copier dans les fichiers respectifs.

L'application est prête !

### Commencer une feature

Important : personne ne doit développer les branches dev ou production
Une feature = une branche 

1. Créer votre branch Github de feature
```sh
git checkout -b "feature/ma-branche-temporaire"
```

1. S'assurer d'être sur la bonne branch
```sh
git status
```

<p align="right">(<a href="#readme-top">revenir en haut</a>)</p>



## Une fois la feature terminee

Une fois que vous avez terminé la feature et que tout marche sur votre local suivez ces étapes :

1. Commitez vos changes 
```sh
git add .
git commit -m "[ADD] précision"
git push origin feature/ma-branche-temporaire
```
2. Sur Gitub lancez une Pull request sur la branch Develop et attendez que Ronan valide le merge

<p align="right">(<a href="#readme-top">retour en haut</a>)</p>

## Contact

Si vous avez une question contactez-moi sans hésiter sur **ronan@reltim.com**

Quelques commandes utiles : 
supprimer une branche distante : 
```sh
git push origin --delete branche-a-supprimer
```

<p align="right">(<a href="#readme-top">revenir en haut</a>)</p># recipes_app
# app-recipes
