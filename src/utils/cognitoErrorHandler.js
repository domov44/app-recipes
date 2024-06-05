export function handleCognitoError(error) {
    let errorMessage = 'Une erreur inconnue est survenue. Veuillez réessayer.';

    switch (error.message) {
        case 'Incorrect username or password.':
            errorMessage = 'Le nom d\'utilisateur ou le mot de passe est incorrect.';
            break;
        case 'Password attempts exceeded':
            errorMessage = 'Trop de tentatives. Veuillez réessayer plus tard.';
            break;
        case 'Password did not conform with policy: Password not long enough':
            errorMessage = 'Le mot de passe n\'est pas assez sécurisé, il faut au moins 8 caractères.';
            break;
        case 'User already exists':
            errorMessage = 'Ce pseudo est déjà pris, choisissez en un autre.';
            break;
        case 'Invalid verification code provided, please try again.':
            errorMessage = 'Code de vérification incorrect. Veuillez vérifier et réessayer.';
            break;
        case 'Invalid code provided, please request a code again.':
            errorMessage = 'Code de vérification invalide. Veuillez en redemander un nouveau.';
            break;
        case 'Invalid email address format.':
            errorMessage = 'L\'adresse email n\'est pas dans un formal valide.';
            break;
        case 'User does not exist.':
            errorMessage = 'Cet utilisateur n\'existe pas.';
            break;
        default:
            console.log(error);
            break;
    }

    return errorMessage;
}
