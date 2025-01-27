﻿## Application Miamze
<a name="readme-top"></a>

<br />
  <h3 align="center">Application Miamze</h3>

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
         <a href="#ajouter-un-environnement-sur-son-profil-aws">Ajouter un environnement sur son profil aws</a>
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

- [Accéder à l'application côté aws sso](https://miamze.awsapps.com/start/#/)

- **Production** : [Lien Production](https://production.d3ckf36uaz2dch.amplifyapp.com/)
- **Développement** : [Lien Développement](https://develop.d27slxhbjbcdgx.amplifyapp.com/)

<p align="right">(<a href="#readme-top">revenir en haut</a>)</p>


## Prerequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine locale :
1. Nodejs v20.*
```sh
node -v
```
2. AWS
https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
```sh
amplify --version
```


Configurer le SSO AWS :
1. ouvrir le fichier config de AWS
```sh
cd .aws
```
   Sur vscode :
```sh
code config
```
2. Ajoutez vos profils aws, vous trouverez les informations tel sur l'url : https://miamze.awsapps.com/start/#/
 ```sh
[profile default]
sso_session = recipes-sso
sso_account_id = votre_id
sso_role_name = votre_role
region = eu-west-3
output = json
credential_process = aws configure export-credentials

[sso-session recipes-sso]
sso_region=eu-west-3
sso_start_url=https://miamze.awsapps.com/start
sso_registration_scopes=sso:account:access
```

3. Connectez-vous grâce au SSO (valable une journée)
Si vous avez un profile default :
 ```sh
aws sso login
```

Si vous n'avez pas de profile default :
 ```sh
aws sso login --profile mon-profile
```

Récupérer le projet :
```sh
amplify pull
```
Choisissez le profil-credentials > recipes-develop > app<id> > et faites entrer sur toutes les options

Maintenant que vous avez récupéré le projet et les fichiers cachées aws, on va supprimer les fichiers potentiellement modifiés pour ne pas avoir de conflit dès le début 
```sh
git reset --hard HEAD
```

Et c'est bon, lancez le projet
```sh
npm run dev
```
<p align="right">(<a href="#readme-top">revenir en haut</a>)</p>




## Ajouter un environnement sur son profil aws

Créer un environnement sur votre profil :
1. S'assurer sur quel env aws on est
```sh
amplify status
```

2. Créer un environnement dédié sur votre profil
```sh
amplify env add mon-env
```

3. Pousser le paramétrage des autres environnement sur le votre (environ 30min d'attente)
```sh
amplify push
```

4. De même, créez 2 groups cognito, le groupe "Admins" qui a la priorité 1, et le groupe "Members" qui a la priorité 2. Si vous souhaitez que votre account de test soit admin, ajoutez le au groupe admins. ATTENTION lorsque vous appliquez un nouveau rôle vous devez vous déconnecter de l'application coté client et vous reconnecter pour appliquer les nouvelles permissions.

5. Enfin, toujours dans cognito, dans user pool propriety associez une lambda au post confirmation, qui se nomme create-profile-onSignup

6. Retourner sur votre ide
```sh
npm run dev
```

### Commencer une feature

Important : personne ne doit développer sur l'environnement develop ou production, ni sur leurs branches respectives 
Une feature = une branche + un env 

1. S'assurer sur quel env aws on est
```sh
amplify status
```

1. Créer un environnement dédié sur votre profil
<a href="#lancer-le-projet-en-local">Voir la section dédiée à cette étape</a>

2. Créer votre branch Github de feature
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

1. Basculez sur l'env develop
```sh
amplify env checkout develop
```
2. Supprimez votre environnement local de feature
```sh
amplify env remove mon-env
```
3. Vérifiez bien que dans amplify/team-provider-info.json vous n'avez plus votre environnement de feature
4. Commitez vos changes 
```sh
git add .
git commit -m "[ADD] précision"
git push origin feature/ma-branche-temporaire
```
5. Sur Gitub lancez une Pull request sur la branch Develop et attendez que Ronan valide le merge

<p align="right">(<a href="#readme-top">retour en haut</a>)</p>

## Contact

Si vous avez une question contactez-moi sans hésiter sur **ronanscotet467@gmail.com**

Quelques commandes utiles : 
supprimer une branche distante : 
```sh
git push origin --delete branche-a-supprimer
```

checker le profile aws sso actuel
```sh
aws configure list --profile ronan
```

Lister les env local
```sh
aws env list
```

Si vous perdez votre team-provider.json et que vous avez un env local qui tourne vous ne devez le supprimer pour en créer un nouveau, pour se faire vous ne pourrez pas le faire en ligne de commande, aller sur votre env depuis la console (ouvrez l'app que vous avez build sur amplify, onglmet backend environnements), cliquez sur actions puis supprimer (atendez environ 20 minutes), puis aller dans votre dossier amplify > .config > local-aws-info.json, et supprimer votre env local du fichier. Vous devez être sur un autre environnements pour le faire.

<p align="right">(<a href="#readme-top">revenir en haut</a>)</p>