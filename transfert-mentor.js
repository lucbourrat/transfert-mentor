// Remplacez 'Prénom Nom' par le nom (du mentor) que vous recherchez
const nomRecherche = 'Prénom Nom';

function enregistrerNomTrouve(nom) {
  // Récupérer les données actuelles du localStorage (s'il y en a)
  const nomsTrouves = JSON.parse(localStorage.getItem('nomsTrouves')) || {};

  if (nomsTrouves[nom]) {
    nomsTrouves[nom] += 1; // Si le nom existe déjà, incrémenter le compteur
  } else {
    nomsTrouves[nom] = 1; // Sinon, initialiser le compteur à 1
  }

  // Enregistrer les données mises à jour dans le localStorage
  localStorage.setItem('nomsTrouves', JSON.stringify(nomsTrouves));
}

function rechercherNom() {
  const spans = document.querySelectorAll('span');
  let contenu = null;
  
  for (const span of spans) {
    if (span.textContent.includes('Suggestion')) {
      contenu = span.firstElementChild.lastElementChild.firstElementChild.textContent.trim();
      break;
    }
  }

  if (contenu) {
    enregistrerNomTrouve(contenu);

    if (contenu.includes(nomRecherche)) {
      console.log('Nom trouvé :', nomRecherche);
    } else {
      console.log('Nom non trouvé, rafraîchissement de la page...');
      location.reload();
    }
  } else {
    console.log('Balise span "Suggestion" non trouvée.');
  }
}

function cliquerSurBouton() {
  const bouton = document.querySelector('[aria-label="Remplacer le mentor"]');
  if (bouton) {
    bouton.click();
    clearInterval(intervalId); // Arrêter la vérification périodique
    setTimeout(rechercherNom, 2000); // Attendre 2 secondes avant de lancer la recherche du nom
  }
}

// Vérifier périodiquement si le bouton est présent et cliquable
const intervalId = setInterval(cliquerSurBouton, 1000); // Vérifier toutes les 1 seconde

// Initialiser les données dans le localStorage si nécessaire
if (!localStorage.getItem('nomsTrouves')) {
  localStorage.setItem('nomsTrouves', JSON.stringify({}));
}
