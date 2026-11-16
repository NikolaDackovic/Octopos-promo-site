OCTOPOS PROMO - promo.octopos.rs
=================================

POSTAVLJANJE
1. Ceo sadržaj foldera prebaciti na server (koren sajta promo.octopos.rs).
2. Nije potreban build ni Node - čist HTML/CSS/JS.
3. Fontovi (Sora, DM Sans) su lokalno u assets/fonts.

STRANICE
index.html  - promo stranica sa modulima
api.html    - Octopos API dokumentacija (otvara se sa kartice "API konektor", iz menija i iz footera)

STRUKTURA
config.js       - PODEŠAVANJA FORME (vidi dole)
modules.js      - podaci o modulima (SR + EN), slike, linkovi
i18n.js         - prevodi promo stranice (SR + EN)
app.js          - logika promo stranice
styles.css      - dizajn i animacije (zajednički za obe stranice)
api.css, api.js, api-i18n.js - API stranica (api-i18n.js sadrži SR/EN tekstove dokumentacije)
assets/images/integrations - isečeni logoi integracija (Wolt, Glovo, Protel...)
assets/images/cover-*.jpg  - kompozitne slike modula (uređaji, kiosk, QR...)
robots.txt, sitemap.xml    - za Google (uključuje i api.html)

KONTAKT FORMA (config.js)
Sajt je statičan, pa forma šalje JSON (POST) na adresu iz config.js.
- formEndpoint prazan  -> klik na "Pošalji upit" otvara mail program sa popunjenom porukom
                          (radi odmah, ali zavisi od toga da li posetilac ima podešen mail).
- Preporuka: Web3Forms (besplatno, bez servera)
    1) na web3forms.com unesite podrska@octopos.rs i dobijete access key na mail
    2) u config.js: formEndpoint: "https://api.web3forms.com/submit", formAccessKey: "KLJUC"
- Alternativa: sopstveni endpoint (npr. ASP.NET na vašem serveru) koji prima
  { name, surname, email, message, language, page } i šalje mail. Mora da dozvoli CORS za promo.octopos.rs.
- Zaštita od botova: skriveno "honeypot" polje; validacija imena, prezimena, emaila i poruke.
- "Zatražite aktivaciju" u detaljima modula vodi na formu i upisuje naziv modula u poruku.
- Sa API stranice: index.html?inquiry=api#kontakt popunjava upit za demo token.

JEZIK
- SR podrazumevano, EN preko prekidača ili ?lang=en (važi i za api.html). Izbor se pamti.

MODULI (modules.js)
- images: [{ src, sr, en, pos, fit }] - prva slika je naslovna.
    pos: "center" za kompozitne slike; fit: "contain" za uske snimke telefona.
- page: "api.html" -> kartica vodi na posebnu stranicu umesto prozora sa detaljima.
- features: lista ekrana [{ title, text }] koja se prikazuje kao "Ekrani kase" (koristi je modul Kasa).
- qr: slika QR koda koja se prikazuje u detaljima (QR poručivanje -> naruci.octopos.rs/phone).
- demoUrl, videoUrl - dugmad se pojavljuju automatski.
- Direktan link ka modulu: promo.octopos.rs/#modul-<slug> (npr. #modul-kiosk)


NAPOMENE
- Brojevi u hero animaciji (porudžbine, promet) su dekorativni.
- Logoi integracija su isečeni iz dostavljene slike; za oštriji prikaz zameniti originalnim logoima.
