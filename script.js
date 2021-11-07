/* Création de la fonction générale */
function carnetContact() {
  /* Récupération des éléments du DOM */
  let nomForm = document.querySelector(".nom");
  let prenomForm = document.querySelector(".prenom");
  let emailForm = document.querySelector(".email");
  let telForm = document.querySelector(".telephone");
  let buttonSubmit = document.querySelector(".submit");
  let divForm = document.querySelector(".form");
  let divContact = document.querySelector(".contact");
  let formContact = document.querySelector(".form");
  let formSelect = document.querySelector(".select");
  let optionParticulier = document.querySelector(".particulier");
  let optionProfessionnel = document.querySelector(".professionnel");

  // Crétion de la variable du localStorage
  let tableau = JSON.parse(localStorage.getItem("@sauvegarde"));

  // Si le local storage est plein alors on appel la fonction showContact sinon on défini l'array à vide
  if (tableau) {
    showContact();
  } else {
    tableau = [];
  }

  /* Création de l'évenement au clique du bouton */
  formContact.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = new FormData(formContact);

    let formObjet = {};

    if (data.get("select") == "particulier") {
      // Création d'un contact perso
      formObjet = new ContactPerso(
        data.get("nom"),
        data.get("prenom"),
        data.get("email"),
        data.get("telephone"),
        data.get("select"),
        data.get("perso")
      );
    } else {
      // Création d'un contact pro
      formObjet = new ContactPro(
        data.get("nom"),
        data.get("prenom"),
        data.get("email"),
        data.get("telephone"),
        data.get("select"),
        data.get("entreprise")
      );
    }

    // Push dans un tableau des données récupérées précédement
    tableau.push(formObjet);
    // Affichage des données
    showContact();
    // Sauvegarde des donnéess
    save();

    // formContact.reset ();
  });

  // class contructeur contact
  class ContactGeneral {
    constructor(name, prenom, email, telephone, select) {
      this.name = name;
      this.prenom = prenom;
      this.email = email;
      this.telephone = telephone;
      this.select = select;
    }
  }

  // class constructeur perso
  class ContactPerso extends ContactGeneral {
    constructor(name, prenom, email, telephone, select, adresse) {
      super(name, prenom, email, telephone, select);
      this.adresse = adresse;
    }
  }

  // class constructeur pro
  class ContactPro extends ContactGeneral {
    constructor(name, prenom, email, telephone, select, entreprise) {
      super(name, prenom, email, telephone, select);
      this.entreprise = entreprise;
    }
  }

  // Création de la fonction permettant d'afficher les données
  function showContact() {
    // Définir content en null
    let content = "";

    // foreach pour récupérer chaque élément du tableau
    tableau.forEach((element) => {
      if (element.select == "particulier") {
        content +=
          "-----------------------------------" +
          `<p>Nom: ${element.name} </p>` +
          `<p>Prenom: ${element.prenom} </p>` +
          `<p>E-mail: ${element.email} </p>` +
          `<p>Tél: ${element.telephone} </p>` +
          `<p>Adresse: ${element.adresse}</p>` +
          ` <button class="deleteButton">SUPPRIMER</button>` +
          ` </br> ` +
          ` </br> `;

        // Insertion du contenu HTML au sein de la div
        divContact.innerHTML = content;
      } else {
        content +=
          "-----------------------------------" +
          `<p>Nom: ${element.name} </p>` +
          `<p>Prenom: ${element.prenom} </p>` +
          `<p>E-mail: ${element.email} </p>` +
          `<p>Tél: ${element.telephone} </p>` +
          `<p>Nom entreprise: ${element.entreprise}` +
          ` <button class="deleteButton">SUPPRIMER</button>` +
          ` </br> ` +
          ` </br> `;

        // Insertion du contenu HTML au sein de la div
        divContact.innerHTML = content;
      }
    });

    // Récupération du button depuis le DOM
    let deleteButton = document.querySelectorAll(".deleteButton");

    // Crétion du forEach pour déclencher un évènement sur tous les boutons
    deleteButton.forEach((button, index) => {
      // Création de l'addEventListner sur chaque bouton
      button.addEventListener("click", function () {
        // Supression de l'élément du tableau
        tableau.splice(index, 1);
        // Sauvegarde des nouvelles valeurs
        save();
        // Re affichage des éléments
        showContact();
      });
    });
  }

  //Création de la fonction pour la sauvegarde des éléments sur le localStoragd
  function save() {
    localStorage.setItem("@sauvegarde", JSON.stringify(tableau));
  }
}

carnetContact();

//Autres possibilités

// if (data.get("select") == "particulier") {
//   formObjet = new ContactPerso(
//     data.get("perso"),
//     data.get("nom"),
//     data.get("prenom"),
//     data.get("email"),
//     data.get("telephone"),
//     data.get("select"),
//   );
// } else if (data.get("select") == "professionnel") {
//   formObjet = new ContactPro(
//     data.get("entreprise"),
//     data.get("nom"),
//     data.get("prenom"),
//     data.get("email"),
//     data.get("telephone"),
//     data.get("select")
//   );
// } else {
//   alert("Veuillez choisir un champ");
// }

// function ContactGeneral(name, prenom, email, telephone, select) {
//   this.name = name;
//   this.prenom = prenom;
//   this.email = email;
//   this.telephone = telephone;
//   this.select = select
// }

// // let newContactGeneral = new ContactGeneral();

// function ContactPerso(adresse, name, prenom, email, telephone, select) {
//   ContactGeneral.call(this, name, prenom, email, telephone, select);
//   this.adresse = adresse;
// }

// function ContactPro(entreprise, name, prenom, email, telephone, select) {
//   ContactGeneral.call(this, name, prenom, email, telephone, select);
//   this.entreprise = entreprise;
// }

/* Création de l'évènement sur le button "submit" */
//   buttonSubmit.addEventListener("click", function () {
//     /* création de l'objet littéral permettant de recupérer les valeurs du formulaire */
//     let form = {
//       nom: nomForm.value,
//       prenom: prenomForm.value,
//       email: emailForm.value,
//       tel: telForm.value,

//       identite: function () {
//         return `Je m'appelle ${this.nom},  ${this.prenom}, mon adresse mail est la suivante : ${this.email} et mon numéro de téléphone est : ${this.tel}`;
//       },
//     };

//     // nomForm.value = "";
//     // prenomForm.value = "";
//     // emailForm.value = "";
//     // telForm.value = "";
//   });
