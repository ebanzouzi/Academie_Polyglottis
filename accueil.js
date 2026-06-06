document.addEventListener("DOMContentLoaded", () => {
  // --- GESTION DES LIENS ACTIFS BASÉE SUR L'URL ---
  const navLinks = document.querySelectorAll("header nav ul li a");
  const currentUrl = window.location.pathname; // Récupère le nom du fichier actuel

  navLinks.forEach((link) => {
    // On retire d'abord toute classe active existante par défaut dans le HTML
    link.classList.remove("active");

    // On compare l'URL actuelle avec l'attribut href du lien
    // On utilise "endsWith" pour gérer les chemins relatifs
    if (currentUrl.endsWith(link.getAttribute("href"))) {
      link.classList.add("active");
    }
    // Cas particulier pour l'accueil si l'URL est vide ou juste "/"
    else if (
      (currentUrl === "/" || currentUrl === "") &&
      link.getAttribute("href") === "index.html"
    ) {
      link.classList.add("active");
    }
  });

  // --- ANIMATION MACHINE À ÉCRIRE RENOUVELABLE ---
  // --- ANIMATION MACHINE À ÉCRIRE RENOUVELABLE ---
  function initTypewriter() {
    const typingDelay = 100;
    const pauseDelay = 2000;

    // Détection des zones de texte spécifiques pour chaque page
    const h1Home = document.querySelector(".hero-content h1");
    const targetServices = document.getElementById("text-target");
    const targetFormations = document.getElementById("text-target-formations");
    const targetContact = document.getElementById("text-target-contact"); // Cible Contact

    // --- 1. ANIMATION ACCUEIL ---
    // On vérifie qu'on n'est ni sur Services, ni sur Formations, ni sur Contact
    if (h1Home && !targetServices && !targetFormations && !targetContact) {
      const fullText = "Académie Polyglottis";

      function startHomeTyping() {
        let index = 0;
        let greenSpan = null;
        h1Home.innerHTML = "";

        function typeWriterHome() {
          if (index < fullText.length) {
            if (index === 9) {
              greenSpan = document.createElement("span");
              greenSpan.className = "green";
              h1Home.appendChild(greenSpan);
            }

            if (greenSpan) {
              greenSpan.textContent += fullText.charAt(index);
            } else {
              h1Home.textContent += fullText.charAt(index);
            }
            index++;
            setTimeout(typeWriterHome, typingDelay);
          } else {
            setTimeout(startHomeTyping, pauseDelay + 1000);
          }
        }
        typeWriterHome();
      }
      startHomeTyping();
    }

    // --- 2. ANIMATION SERVICES ---
    if (targetServices) {
      const part1 = "Deux univers, un même objectif : ";
      const part2 = "Votre réussite.";

      function startServicesTyping() {
        let charIndex = 0;
        let isPart1Finished = false;
        targetServices.innerHTML = "";

        function typeWriterServices() {
          if (!isPart1Finished) {
            if (charIndex < part1.length) {
              targetServices.innerHTML += part1.charAt(charIndex);
              charIndex++;
              setTimeout(typeWriterServices, typingDelay);
            } else {
              isPart1Finished = true;
              charIndex = 0;
              targetServices.innerHTML +=
                '<span class="green" id="green-part"></span>';
              setTimeout(typeWriterServices, pauseDelay);
            }
          } else {
            const greenSpan = document.getElementById("green-part");
            if (greenSpan && charIndex < part2.length) {
              greenSpan.innerHTML += part2.charAt(charIndex);
              charIndex++;
              setTimeout(typeWriterServices, typingDelay);
            } else if (greenSpan && charIndex >= part2.length) {
              setTimeout(startServicesTyping, pauseDelay);
            }
          }
        }
        typeWriterServices();
      }
      startServicesTyping();
    }

    // --- 3. ANIMATION FORMATIONS ---
    if (targetFormations) {
      const formText = "Développez vos compétences sans frontières.";

      function startFormationsTyping() {
        let index = 0;
        targetFormations.innerHTML = "";

        function typeWriterFormations() {
          if (index < formText.length) {
            targetFormations.innerHTML += formText.charAt(index);
            index++;
            setTimeout(typeWriterFormations, typingDelay);
          } else {
            setTimeout(startFormationsTyping, pauseDelay + 1500);
          }
        }
        typeWriterFormations();
      }
      startFormationsTyping();
    }

    // --- 4. ANIMATION CONTACT ---
    if (targetContact) {
      const contactText = "Contactez l'Académie".replace(/\|$/, "");

      function startContactTyping() {
        let index = 0;
        targetContact.innerHTML = "";

        function typeWriterContact() {
          if (index < contactText.length) {
            targetContact.innerHTML += contactText.charAt(index);
            index++;
            setTimeout(typeWriterContact, typingDelay);
          } else {
            setTimeout(startContactTyping, pauseDelay + 1500);
          }
        }
        typeWriterContact();
      }
      startContactTyping();
    }
  }

  // On lance la détection
  initTypewriter();

  // --- ANIMATION D'APPARITION (REVEAL) ---
  // (On garde la même logique pour les autres éléments)
  const elementsToAnimate = [
    document.querySelector(".motto"),
    document.querySelector(".hero-content p"),
    document.querySelector(".preview"),
    document.querySelector(".hero-content button"),
  ];

  elementsToAnimate.forEach((el, i) => {
    if (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.8s ease-out";

      setTimeout(
        () => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        },
        500 + i * 200,
      );
    }
  });

  // --- GESTION DU MENU HAMBURGER ---
  const menuToggle = document.getElementById("mobile-menu");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", (e) => {
      // Empêche le clic de se propager (optionnel mais plus propre)
      e.stopPropagation();

      // On bascule la classe active
      navMenu.classList.toggle("active");

      // Animation de l'icône
      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      }
      console.log(
        "Menu cliqué, classe active :",
        navMenu.classList.contains("active"),
      );
    });
  }

  // On peut ajouter un délai pour que l'utilisateur ait le temps de voir
  setTimeout(() => {
    animateCounter("count1", 500, 2000); // 500 étudiants en 2 secondes
    animateCounter("count2", 12, 2000); // 12 langues en 2 secondes
    animateCounter("count3", 98, 2000); // 98% de satisfaction
  }, 1000);

  // 1. Configuration de l'observateur
  const observerOptions = {
    threshold: 0.15, // Déclenche quand 15% de l'élément est visible
    rootMargin: "0px 0px -100px 0px", // Un peu avant la fin de l'écran
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // On ajoute la classe qui déclenche l'animation CSS
        entry.target.classList.add("reveal-visible");
      }
    });
  }, observerOptions);

  // 2. Sélection large des éléments à animer (Accueil + About)
  // On cible les cartes, les images, et les blocs de texte
  const elements2ToAnimate = document.querySelectorAll(
    ".value, .team, .image-about, .preview-content, .preview-content1, .preview-content2, .goal-left, .gr1, .stat-item, .before-footer, .services .cards .card, .services .choice .choice-container .choice-cards",
  );

  elements2ToAnimate.forEach((el) => {
    // On s'assure que l'élément est bien caché au départ
    el.classList.add("reveal-hidden");
    // On lance l'observation
    scrollObserver.observe(el);
  });

  // Pop-up de consentement aux cookies
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");

  // Vérifie si l'utilisateur a déjà accepté les cookies
  if (!localStorage.getItem("cookiesAcceptes")) {
    // Si non, on affiche le bandeau après un léger délai de 1 seconde
    setTimeout(() => {
      cookieBanner.style.display = "block";
    }, 1000);
  }

  // Action lors du clic sur le bouton "Accepter"
  acceptBtn.addEventListener("click", function () {
    // On stocke le choix dans le navigateur de l'utilisateur
    localStorage.setItem("cookiesAcceptes", "true");
    // On cache le bandeau
    cookieBanner.style.display = "none";
  });
});

function animateCounter(id, targetValue, duration) {
  let obj = document.getElementById(id);
  let startValue = 0;
  let startTime = null;

  // La fonction qui s'exécute à chaque frame (image) de l'animation
  function step(currentTime) {
    if (!startTime) startTime = currentTime;

    // Calcul du temps écoulé
    const progress = Math.min((currentTime - startTime) / duration, 1);

    // Calcul de la valeur actuelle en fonction de la progression
    const currentValue = Math.floor(progress * targetValue);

    obj.textContent = currentValue + (id === "count3" ? "%" : "+");

    // Si l'animation n'est pas finie, on demande la prochaine frame
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  if (!obj) return;
  window.requestAnimationFrame(step);
}

// ==========================================================================
// GESTION DE L'ACCORDÉON DE LA FAQ (PAGE CONTACT)
// ==========================================================================

// 1. On attend que tout le HTML de la page soit complètement chargé
document.addEventListener("DOMContentLoaded", () => {
  // 2. On récupère toutes les questions de la FAQ (les blocs cliquables)
  const faqQuestions = document.querySelectorAll(".faq-question");

  // Cache initial des réponses en CSS pour éviter les sauts visuels
  // (On applique une transition fluide sur la hauteur et l'opacité via JS)
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const answer = item.querySelector(".faq-answer");
    if (answer) {
      answer.style.maxHeight = "0px";
      answer.style.overflow = "hidden";
      answer.style.transition = "max-height 0.3s ease-out, opacity 0.3s ease";
      answer.style.opacity = "0";
    }
  });

  // 3. On écoute le clic sur chaque question
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      // On récupère le bloc parent (.faq-item) et la réponse associée
      const currentItem = question.parentElement;
      const currentAnswer = currentItem.querySelector(".faq-answer");
      const currentIcon = question.querySelector("i");

      // --- OPTIONNEL : FERMER LES AUTRES QUESTIONS OUVERTES ---
      // Si tu veux qu'une seule question reste ouverte à la fois, active ce bloc :
      /*
      faqItems.forEach((item) => {
        if (item !== currentItem) {
          const answer = item.querySelector(".faq-answer");
          const icon = item.querySelector(".faq-question i");
          if (answer) {
            answer.style.maxHeight = "0px";
            answer.style.opacity = "0";
          }
          if (icon) {
            icon.style.transform = "rotate(0deg)";
          }
        }
      });
      */

      // 4. Vérification : Si la réponse est déjà ouverte, on la ferme
      if (
        currentAnswer.style.maxHeight !== "0px" &&
        currentAnswer.style.maxHeight !== ""
      ) {
        // Fermeture de la réponse
        currentAnswer.style.maxHeight = "0px";
        currentAnswer.style.opacity = "0";

        // On remet la flèche dans sa position initiale (0 degré)
        if (currentIcon) {
          currentIcon.style.transition = "transform 0.3s ease";
          currentIcon.style.transform = "rotate(0deg)";
        }
      } else {
        // 5. Sinon, on ouvre la réponse
        // "scrollHeight" calcul automatiquement la vraie hauteur du texte à l'intérieur
        currentAnswer.style.maxHeight = currentAnswer.scrollHeight + "px";
        currentAnswer.style.opacity = "1";

        // On fait pivoter la flèche de 180 degrés pour indiquer l'ouverture
        if (currentIcon) {
          currentIcon.style.transition = "transform 0.3s ease";
          currentIcon.style.transform = "rotate(180deg)";
        }
      }
    });
  });

  // ==========================================================================
  // SOUBOUMISSION ASYNCHRONE DU FORMULAIRE DE CONTACT (FETCH)
  // ==========================================================================
  const contactForm = document.querySelector(".ap-form"); // Cible la classe de ton formulaire contact.html

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      // 1. On empêche le rechargement brutal de la page
      e.preventDefault();

      // On cible le bouton pour changer son état visuel pendant l'envoi
      const submitBtn = contactForm.querySelector(".form-submit-btn");
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML =
        'Envoi en cours... <i class="fa-solid fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;

      // 2. Récupération des valeurs tapées par l'utilisateur
      const formData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      try {
        // 3. Envoi asynchrone des données au serveur local (port 5000) via FETCH
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        // 4. Traitement de la réponse du serveur
        if (response.ok) {
          // Succès : On affiche un joli message waouh et on vide le formulaire
          //
          // 🚀 CODE PRO : On redirige directement vers la page de remerciement
          window.location.href = "merci.html";
          contactForm.reset();
        } else {
          // Erreur gérée par le backend (ex: manque un champ)
          alert("⚠️ Erreur : " + result.error);
        }
      } catch (error) {
        // En cas de crash réseau total ou si ton serveur est éteint
        console.error("Erreur réseau :", error);
        alert(
          "📢 Nos serveurs sont momentanément indisponibles. Pour une prise en charge immédiate, contactez nos conseillers au Quartier SIC par WhatsApp au +242 06 562 7029.",
        );
      } finally {
        // Quoi qu'il arrive, on remet le bouton à son état d'origine
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }
});

// ==========================================================================
// GESTIONNAIRE D'ONGLETS INTERACTIFS (PAGE PROCÉDURES)
// ==========================================================================
const procTabButtons = document.querySelectorAll(".tabs-switcher .tab-btn");
const procTabPanels = document.querySelectorAll(
  ".tabs-content-wrapper .tab-panel",
);

if (procTabButtons.length > 0 && procTabPanels.length > 0) {
  procTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // 1. Désactive l'état actif sur tous les boutons d'onglets
      procTabButtons.forEach((btn) => btn.classList.remove("active"));
      // 2. Masque l'ensemble des panneaux de contenu
      procTabPanels.forEach((panel) => panel.classList.remove("active"));

      // 3. Assigne la classe active au bouton cliqué
      button.classList.add("active");

      // 4. Récupère l'identifiant du panneau cible et l'affiche
      const targetPanelId = button.getAttribute("data-target");
      const targetedPanel = document.getElementById(targetPanelId);
      if (targetedPanel) {
        targetedPanel.classList.add("active");
      }
    });
  });
}
