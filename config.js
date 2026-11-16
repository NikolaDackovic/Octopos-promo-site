/*
 * OCTOPOS PROMO - podešavanja
 * formEndpoint: adresa na koju forma šalje JSON (POST). Prazno = otvara se mail program (mailto).
 *   Primer sa Web3Forms (besplatno, bez servera):  formEndpoint: "https://api.web3forms.com/submit", formAccessKey: "VAS-KLJUC"
 *   Primer sa sopstvenim API-jem:                  formEndpoint: "https://api.octopos.rs/promo/contact"
 * contactEmail: adresa za mailto rezervu.
 */
window.OCTOPOS_CONFIG = {
  formEndpoint: "/api/contact",
  formAccessKey: "",
  contactEmail: "podrska@octopos.rs"
};
