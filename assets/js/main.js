// Le Vino VIP — navigation et formulaire de réservation
// IMPORTANT : remplacez le numéro ci-dessous par le numéro WhatsApp du bar,
// au format international sans +, espace ni tiret (ex. 2250700000000).
const WHATSAPP_NUMBER = "2250799606547";

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) window.lucide.createIcons();

  document.querySelectorAll(".year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const opened = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(opened));
      toggle.innerHTML = opened ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
      if (window.lucide) window.lucide.createIcons();
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = '<i data-lucide="menu"></i>';
      if (window.lucide) window.lucide.createIcons();
    }));
  }

  const dateField = document.getElementById("date-reservation");
  if (dateField) {
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateField.min = localToday;
  }

  const form = document.getElementById("reservation-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const feedback = document.getElementById("form-feedback");
      if (!form.reportValidity()) return;
      if (WHATSAPP_NUMBER === "2250000000000") {
        feedback.textContent = "Le formulaire est prêt. Pour recevoir les demandes, remplacez d'abord le numéro WhatsApp de démonstration dans assets/js/main.js par le vrai numéro du bar.";
        feedback.classList.add("is-warning");
        return;
      }
      const data = new FormData(form);
      const details = [
        "Bonjour Le Vino VIP, je souhaite faire une réservation.",
        "",
        `Nom : ${data.get("nom")}`,
        `Téléphone : ${data.get("telephone")}`,
        `Date : ${data.get("date")}`,
        `Heure : ${data.get("heure")}`,
        `Nombre de personnes : ${data.get("personnes")}`,
        `Type : ${data.get("type")}`,
        `Instagram du client : ${data.get("instagram") || "Non renseigné"}`,
        `Précisions : ${data.get("details") || "Aucune"}`
      ].join("\n");
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(details)}`, "_blank", "noopener,noreferrer");
      feedback.textContent = "Votre demande a été préparée dans WhatsApp. Envoyez le message pour contacter l'établissement.";
      feedback.classList.remove("is-warning");
    });
  }
});