/*
 * OCTOPOS MODULI - podaci (SR / EN)
 * ---------------------------------------------------------------
 * Svaki modul ima zajednička polja i tekstove po jeziku (sr / en).
 *  - category : ključ kategorije (prevodi su u i18n.js -> categories)
 *  - visual   : animirana ilustracija koja se prikazuje kada modul nema slike
 *  - images   : niz slika { src, sr, en } - sr/en su ALT opisi
 *  - videoUrl : YouTube / Vimeo link ili lokalni .mp4 (npr. ./assets/videos/kiosk.mp4)
 *  - demoUrl  : opcioni link ka živom demo prikazu
 *  - page     : modul se otvara kao posebna stranica (npr. API -> api.html)
 *  - show     : opciono, šta se prikazuje u sekciji "U akciji" ({ visual: true } = animacija); inače images
 *  - images[].full: originalni snimak koji se otvara uveliko (images[].src je slika u okviru monitora/telefona)
 *  - cover    : spojena slika za karticu u gridu ("Pronađite svoj sledeći modul"); fx = animacija preko nje
 *    (pojedinačne slike iz images idu u sekciju "U akciji" i u galeriju detalja)
 *  - visualTime: koliko ms traje slajd sa animacijom (podrazumevano 7500)
 *  - visualFirst: true -> prvi slajd kartice je animacija (Android naplata, Status displej)
 *  - images[].bg: boja pozadine za fit:"contain" slike (npr. "#ffffff" za fotografije uređaja)
 *  - features : opciono, lista ekrana/funkcija [{ title, text }] prikazana u detaljima (npr. Kasa)
 *  - qr       : slika QR koda koja se prikazuje u detaljima modula (skeniraj i probaj)
 *  - images[].pos: "center" za kompozitne slike, images[].fit: "contain" za uske/visoke snimke
 * Napomena: u tekstovima koristiti običnu crticu "-", ne dugu crtu.
 */
window.OCTOPOS_MODULES = [
  {
    id: 12, slug: "kasa", cover: "./assets/images/cover-kasa.jpg", fx: "kasa", category: "ops", icon: "pos", visual: "kds",
    images: [
      { src: "./assets/images/cover-kasa.jpg", pos: "center", sr: "Octopos kasa - touch POS sa ekranom za kucanje računa i mapom stolova", en: "Octopos POS - touch terminal with the order screen and table map" },
      { src: "./assets/images/mon-kasa-racun.jpg", pos: "center", full: "./assets/images/kasa-racun.jpg", sr: "Octopos kasa - ekran za kucanje računa sa grupama i slikama artikala", en: "Octopos POS - order screen with groups and product photos" },
      { src: "./assets/images/mon-kasa-mapa-3.jpg", pos: "center", full: "./assets/images/kasa-mapa-3.jpg", sr: "Octopos kasa - mapa stolova sa šankom, dostavom i zauzetim stolovima", en: "Octopos POS - table map with bar, delivery and occupied tables" },
      { src: "./assets/images/mon-kasa-mapa-1.jpg", pos: "center", full: "./assets/images/kasa-mapa-1.jpg", sr: "Octopos kasa - osnovni ekran sa mapom stolova", en: "Octopos POS - main screen with the table map" },
      { src: "./assets/images/mon-kasa-mapa-2.jpg", pos: "center", full: "./assets/images/kasa-mapa-2.jpg", sr: "Octopos kasa - mapa stolova za lokal sa više sala", en: "Octopos POS - table map for a venue with several rooms" }
    ],
    show: [
      { src: "./assets/images/cover-kasa.jpg", pos: "center", sr: "Octopos kasa - touch POS sa ekranom za kucanje računa i mapom stolova", en: "Octopos POS - touch terminal with the order screen and table map" },
      { src: "./assets/images/mon-kasa-racun.jpg", pos: "center", full: "./assets/images/kasa-racun.jpg", sr: "Octopos kasa - ekran za kucanje računa sa grupama i slikama artikala", en: "Octopos POS - order screen with groups and product photos" }
    ],
    videoUrl: "", demoUrl: "",
    sr: {
      title: "Kasa", tag: "Osnovni modul",
      intro: "Osnovni modul za kucanje računa i porudžbina. Izgled ekrana i akcije koje su dostupne na njemu podešavate sami - od mape stolova do naplate i štampe pazara.",
      purpose: "Kasa je srce Octopos sistema. Konobar ili kasir na njoj kuca porudžbine po stolovima, šalje ih u šank i kuhinju, naplaćuje račune i prati svoj pazar. Ekrani se prilagođavaju objektu: pozadina, mape stolova, raspored, veličina i boja tastera, slike artikala i akcije koje su dostupne korisniku.",
      gains: ["Mape stolova po salama, bašti i spratovima - neograničen broj", "Kucanje računa po grupama, sa slikama artikala", "Napomene uz stavke i razdvojene blokove za šank i kuhinju", "Miks plaćanje: gotovina, kartica, ček", "Pregled računa, storno uz autorizaciju i štampa pazara", "Fiskalne akcije: presek stanja i fiskalni kraj dana"],
      benefits: [
        { title: "Podešavate je sami", text: "Pozadina, raspored tastera, boje, slike artikala i dostupne akcije prilagođavaju se vašem objektu i svakom računaru posebno." },
        { title: "Sto pripada jednom korisniku", text: "Zauzet sto ne može da koristi drugi konobar. Korisnik sa odgovarajućim pravima može da ga otvori, naplati ili preuzme na sebe." },
        { title: "Pazar u svakom trenutku", text: "Konobar vidi svoje zaduženje, razdvojeno po načinima plaćanja, uz informaciju koji stolovi još nisu zatvoreni." }
      ],
      example: "Konobar na mapi bašte klikne na sto 12, otvara račun i kuca dve kafe i palačinke uz napomenu \"bez šećera\". Blok za kafu ide na šank, a palačinke u kuhinju. Kada gost traži račun, bira miks plaćanje - deo gotovinom, deo karticom - a na kraju smene štampa pazar razdvojen po načinima plaćanja.",
      features: [
        { title: "Osnovni ekran", text: "Podesite pozadinsku sliku i akcije na ekranu: kucanje računa, pregled računa za tekući dan, presek stanja i fiskalni kraj dana. Na vrhu su mape ili spisak stolova, a vi birate koja mapa se vidi na kom računaru." },
        { title: "Mapa stolova", text: "Zauzeti stolovi su označeni na mapi. Jednim klikom ulazite u novi račun ili dodajete porudžbinu na postojeći. Sto koji je zauzeo jedan korisnik ne može da koristi drugi, osim korisnika sa posebnim pravima." },
        { title: "Račun", text: "Na vrhu su kategorije i grupe, ispod njih proizvodi izabrane grupe. Veličinu, raspored i boju tastera podešavate sami, a slike artikala pomažu da se artikal brzo pronađe. Desno su račun, korisnik, sto i prethodne porudžbine." },
        { title: "Blok porudžbine", text: "Na bloku su korisnik, sto, vreme i stavke. Uz svaku stavku ide predefinisana napomena ili slobodan tekst, što je važno za hranu i koktele. Porudžbina se može razdvojiti: šank i kuhinja, ili dve pozicije u šanku - kokteli i kafa." },
        { title: "Naplata", text: "Korisnik bira način plaćanja, može da očita karticu za popust ili izabere korisnika popusta. Tu je i miks plaćanje - gotovina, kartica, ček. Za komitenta se iz pregleda računa štampa faktura koja se kasnije razdužuje u administraciji." },
        { title: "Pregled računa", text: "Korisnik vidi sve svoje račune i porudžbine u tekućem danu i ima opcije kao što su štampa pazara, promena šifre, prebacivanje otvorenih računa na drugog korisnika i storniranje uz autorizaciju." },
        { title: "Štampanje pazara", text: "U svakom trenutku korisnik vidi svoje zaduženje - sve što je naplaćeno do tog momenta, razdvojeno po načinima plaćanja, sa ukupnim iznosom i spiskom stolova koji još nisu zatvoreni." }
      ]
    },
    en: {
      title: "POS", tag: "Core module",
      intro: "The core module for entering receipts and orders. You configure the screens and the actions available on them yourself - from the table map to payment and the shift report.",
      purpose: "The POS is the heart of the Octopos system. Waiters and cashiers enter orders by table, send them to the bar and kitchen, take payments and follow their own takings. The screens adapt to your venue: background, table maps, layout, button size and colour, product photos and the actions each user can access.",
      gains: ["Table maps per room, garden and floor - unlimited", "Order entry by group, with product photos", "Item notes and separate tickets for bar and kitchen", "Mixed payment: cash, card, cheque", "Receipt overview, voids with authorisation and shift report", "Fiscal actions: X report and fiscal end of day"],
      benefits: [
        { title: "You set it up", text: "Background, button layout, colours, product photos and available actions are adjusted to your venue and to each computer." },
        { title: "A table belongs to one user", text: "An occupied table cannot be used by another waiter. A user with the right permissions can open it, take payment or take it over." },
        { title: "Takings at any moment", text: "Waiters see what they owe, split by payment method, with a note of which tables are still open." }
      ],
      example: "On the garden map a waiter taps table 12, opens a receipt and enters two coffees and pancakes with the note \"no sugar\". The coffee ticket goes to the bar and the pancakes to the kitchen. When the guest asks for the bill, the waiter picks mixed payment - part cash, part card - and at the end of the shift prints the takings split by payment method.",
      features: [
        { title: "Main screen", text: "Set the background image and on-screen actions: new receipt, today's receipts, X report and fiscal end of day. Table maps or the table list sit at the top, and you choose which map is shown on which computer." },
        { title: "Table map", text: "Occupied tables are marked on the map. One tap opens a new receipt or adds an order to an existing one. A table taken by one user cannot be used by another, except by users with special permissions." },
        { title: "Receipt", text: "Categories and groups are at the top, the products of the selected group below. You set button size, layout and colour, and product photos help staff find items fast. On the right are the receipt, user, table and previous orders." },
        { title: "Order ticket", text: "The ticket shows user, table, time and items. Each item can carry a predefined note or free text - important for food and cocktails. Orders can be split: bar and kitchen, or two bar stations - cocktails and coffee." },
        { title: "Payment", text: "The user picks the payment method, can scan a discount card or pick a discount customer. Mixed payment is available - cash, card, cheque. For business customers an invoice is printed from the receipt overview and settled later in administration." },
        { title: "Receipt overview", text: "Users see all their receipts and orders for the day, with options such as printing takings, changing their PIN, moving open receipts to another user and voiding with authorisation." },
        { title: "Shift report", text: "At any moment users see what they owe - everything charged so far, split by payment method, with a total and a list of tables that are still open." }
      ]
    }
  },
  {
    id: 1, slug: "order-display", cover: "./assets/images/cover-kds.jpg", fx: "kds", category: "ops", icon: "monitor", visual: "kds",
    images: [
      { src: "./assets/images/mon-order-display-tamna.jpg", pos: "center", full: "./assets/images/order-display-tamna.jpg", sr: "Octopos Order display - porudžbine po stolovima, potvrđene zelenom bojom", en: "Octopos Order display - orders by table, confirmed in green" },
      { src: "./assets/images/mon-order-display-kineski.jpg", pos: "center", full: "./assets/images/order-display-kineski.jpg", sr: "Octopos Order display - na kineskom jeziku", en: "Octopos Order display - in Chinese" },
      { src: "./assets/images/mon-order-display-kineski-2.jpg", pos: "center", full: "./assets/images/order-display-kineski-2.jpg", sr: "Octopos Order display - na kineskom - prikaz u mreži", en: "Octopos Order display - in Chinese - grid view" },
      { src: "./assets/images/mon-order-display-arapski-3.jpg", pos: "center", full: "./assets/images/order-display-arapski-3.jpg", sr: "Octopos Order display - na arapskom - potvrđene porudžbine", en: "Octopos Order display - in Arabic - confirmed orders" },
      { src: "./assets/images/mon-order-display-arapski-2.jpg", pos: "center", full: "./assets/images/order-display-arapski-2.jpg", sr: "Octopos Order display - na arapskom - prikaz u mreži", en: "Octopos Order display - in Arabic - grid view" },
      { src: "./assets/images/mon-order-display-arapski-4.jpg", pos: "center", full: "./assets/images/order-display-arapski-4.jpg", sr: "Octopos Order display - na arapskom - precrtane stavke", en: "Octopos Order display - in Arabic - crossed-out items" },
      { src: "./assets/images/mon-order-display-arapski.jpg", pos: "center", full: "./assets/images/order-display-arapski.jpg", sr: "Octopos Order display - na arapskom jeziku", en: "Octopos Order display - in Arabic" },
      { src: "./assets/images/mon-order-display-svetla.jpg", pos: "center", full: "./assets/images/order-display-svetla.jpg", sr: "Octopos Order display - svetla tema", en: "Octopos Order display - light theme" }
    ],
    videoUrl: "", demoUrl: "",
    sr: {
      title: "Order display", tag: "Kuhinja i šank",
      intro: "Digitalni prikaz porudžbina u kuhinji, šanku ili na pomoćnim radnim mestima. Umesto štampanja traka, porudžbine se prikazuju pregledno na monitoru ili tabletu - i na stranim jezicima.",
      purpose: "Display služi da priprema porudžbina bude jasnija, brža i organizovanija. Sistem prikazuje nove narudžbine u realnom vremenu, razdvaja ih po tipu, kuhinji, šanku ili stanici pripreme i omogućava osoblju da menja status porudžbine.",
      gains: ["Manje ili potpuno bez štampanih traka", "Manje gužve i manje grešaka u komunikaciji", "Jasniji redosled pripreme", "Bolju preglednost za kuhinju i šank", "Bržu reakciju osoblja", "Rad i na stranim jezicima - engleski, kineski, arapski..."],
      benefits: [
        { title: "Ušteda na trakama", text: "Ako lokal dnevno štampa veliki broj porudžbina, trošak traka i održavanja štampača postaje stalan. Display taj trošak značajno smanjuje." },
        { title: "Može i za šank", text: "Nije namenjen samo kuhinji - idealan je i za šank, pripremu pića, desert stanicu ili ekspediciju." },
        { title: "Može i ka konobarima", text: "Tablet ili monitor može biti okrenut ka konobarima kako bi odmah videli kada je porudžbina spremna za preuzimanje i posluživanje." }
      ],
      example: "U objektu sa velikim prometom kuhinja dobija porudžbine direktno na monitor, šank ima svoj zaseban ekran za pića, a konobari na pomoćnom ekranu vide kada je porudžbina završena. Time se smanjuje dozivanje između sektora, štedi se vreme i smanjuju se zastoji u špicu."
    },
    en: {
      title: "Order display", tag: "Kitchen and bar",
      intro: "A digital order screen for the kitchen, the bar or any prep station. Instead of printing tickets, orders appear clearly on a monitor or tablet - in foreign languages too.",
      purpose: "The display makes order preparation clearer, faster and better organised. New orders show up in real time, split by type, kitchen, bar or prep station, and staff can change the status of every order.",
      gains: ["Fewer or no printed tickets at all", "Less chaos and fewer communication mistakes", "A clear preparation sequence", "Better overview for kitchen and bar", "Faster staff reaction", "Works in foreign languages too - English, Chinese, Arabic..."],
      benefits: [
        { title: "Save on paper rolls", text: "When a venue prints a lot of orders every day, paper and printer maintenance become a constant cost. The display cuts that cost significantly." },
        { title: "Works for the bar too", text: "It is not only for the kitchen - it is a great fit for the bar, drinks prep, the dessert station or the pass." },
        { title: "Can face the waiters", text: "A tablet or monitor can face the floor staff so they instantly see when an order is ready to be picked up and served." }
      ],
      example: "In a busy venue the kitchen receives orders straight on a monitor, the bar has its own screen for drinks, and waiters see on a helper screen when an order is done. Less shouting between stations, less wasted time and fewer bottlenecks at peak hours."
    }
  },
  {//./assets/images/cover-kiosk.jpg
    id: 2, slug: "kiosk", cover: "./assets/images/kiosk-stoni-crni.jpg", fx: "kiosk", category: "self", icon: "scan", visual: "kiosk",
    images: [
      
      
      { src: "./assets/images/kiosk-stoni-crni.jpg", pos: "center", sr: "Octopos samostojeći kiosk sa terminalom za kartice (4POS-KIOSK-STONI)", en: "Octopos freestanding kiosk with a card terminal" },
      { src: "./assets/images/kiosk-stoni.jpg", pos: "center", fit: "contain", bg: "#ffffff", sr: "Octopos stoni kiosk (HOLA KIOSK 22)", en: "Octopos countertop kiosk with reader and printer" },
      { src: "./assets/images/kiosk-samostojeci.jpg", pos: "center", fit: "contain", bg: "#ffffff", sr: "Octopos samostojeći kiosk (POSSIFLEX )", en: "Octopos freestanding kiosk - order here" },
       { src: "./assets/images/kiosk.jpg", pos: "center", fit: "contain", bg: "#ffffff", sr: "Octopos beli samostojeći kiosk (HOLA KIOSK 32)", en: "Octopos freestanding kiosk - order here" },
       { src: "./assets/images/cover-kiosk.jpg", pos: "center", sr: "Octopos samostojeći kiosk sa terminalom za kartice (4POS - KIOSK)", en: "Octopos freestanding kiosk with a card terminal" },
       
    ], videoUrl: "", demoUrl: "",
    sr: {
      title: "Kiosk za samoporučivanje", tag: "Samousluga",
      intro: "Interaktivni kiosk omogućava gostu da sam pregleda ponudu, napravi porudžbinu i izvrši plaćanje bez čekanja na kasi.",
      purpose: "Kiosk je namenjen lokalima koji žele brži protok gostiju, manje gužve na kasi i moderniji način naručivanja. Posebno je koristan u fast food objektima, food court zonama, pekarama, kioscima i restoranima sa velikim prometom.",
      gains: ["Manje gužve na prodajnom mestu", "Brže naručivanje u špicevima", "Mogućnost samostalnog plaćanja", "Veći kapacitet usluge bez dodatnog opterećenja osoblja", "Profesionalan i moderan utisak na gosta", "Samostalno preuzimanje rutinskog posla na kasi i mogućnost rada 24/7 kada je kiosk dostupan"],
      benefits: [
        { title: "Brža usluga", text: "Gosti ne čekaju da dođu na red za porudžbinu ako mogu sami da naruče." },
        { title: "Veća prosečna porudžbina", text: "Na ekranu je lakše ponuditi dodatke, menije, priloge i akcijske kombinacije." },
        { title: "Manje pritiska na osoblje", text: "Tim je rasterećen kod jednostavnih i ponavljajućih porudžbina." }
      ],
      example: "U lokalu sa velikim prometom jedan deo gostiju koristi kiosk za samostalnu porudžbinu, dok osoblje ostaje fokusirano na pripremu, izdavanje i pomoć gostima kojima je potrebna. Rezultat je manji red, brži protok i bolja iskorišćenost tima."
    },
    en: {
      title: "Self-order kiosk", tag: "Self-service",
      intro: "An interactive kiosk lets guests browse the menu, place an order and pay on their own, without waiting at the counter.",
      purpose: "The kiosk is built for venues that want faster guest flow, shorter queues and a more modern way to order. It works especially well in fast food, food courts, bakeries, kiosks and high-traffic restaurants.",
      gains: ["Shorter queues at the counter", "Faster ordering at peak hours", "Self-service payment", "More capacity without extra staff load", "A professional, modern first impression"],
      benefits: [
        { title: "Faster service", text: "Guests do not have to wait in line when they can order on their own." },
        { title: "Higher average ticket", text: "On screen it is easy to suggest add-ons, menus, sides and combo deals." },
        { title: "Less pressure on staff", text: "Your team is freed from simple, repetitive orders." }
      ],
      example: "In a busy venue part of the guests order on the kiosk, while staff stay focused on preparation, hand-off and helping guests who need it. The result is a shorter queue, faster flow and a better-used team."
    }
  },
  {
    id: 3, slug: "qr-web-ordering", cover: "./assets/images/cover-qr.jpg", fx: "qr", category: "digital", icon: "qr", visual: "qr", qr: "./assets/images/octopos-qr-naruci.png",
    images: [
      { src: "./assets/images/cover-qr.jpg", pos: "center", sr: "Octopos QR poručivanje - QR kod, web meni i porudžbina na telefonu", en: "Octopos QR ordering - QR code, web menu and order on a phone" },
      { src: "./assets/images/tab-qr-meni.jpg", pos: "center", full: "./assets/images/qr-meni.jpg", sr: "Octopos web meni sa slikama i cenama", en: "Octopos web menu with photos and prices" },
      { src: "./assets/images/ph-qr-porudzbina.jpg", pos: "center", full: "./assets/images/qr-porudzbina.jpg", sr: "Octopos web poručivanje - dodavanje artikla u korpu", en: "Octopos web ordering - adding an item to the cart" }
    ], videoUrl: "", demoUrl: "https://naruci.octopos.rs/phone",
    sr: {
      title: "QR i web poručivanje", tag: "Digitalna prodaja",
      intro: "Gost skenira QR kod ili pristupa web meniju, pregleda ponudu, poručuje i plaća direktno sa svog telefona.",
      purpose: "Modul je namenjen objektima koji žele da ubrzaju uslugu za stolom, smanje čekanje na konobara i omoguće digitalan pregled menija i poručivanje. Koristan je i za lokale sa velikim prometom, terase, beach barove i objekte u kojima je brzina usluge posebno važna.",
      gains: ["Brže naručivanje za goste", "Manje čekanja i manje zastoja u komunikaciji", "Digitalni meni bez stalnog štampanja", "Mogućnost plaćanja sa telefona", "Moderniji doživljaj za gosta", "Posebni cenovnici i linkovi za poručivanje za okolne poslovne zgrade"],
      benefits: [
        { title: "Brži obrt stolova", text: "Kada gost ne čeka dugo da vidi meni ili poruči, ceo tok usluge je efikasniji." },
        { title: "Manje štampe", text: "Digitalni meni olakšava izmene cena, ponude i akcija bez ponovnog štampanja." },
        { title: "Bolje iskustvo gosta", text: "Gost dobija pregledan meni, slike, opcije i jednostavniji način poručivanja." }
      ],
      example: "Na svakom stolu nalazi se QR kod. Gost ga skenira, otvara meni, bira artikle, šalje porudžbinu i odmah plaća. Konobar ima više vremena za uslugu, preporuke i rad sa stolovima kojima je potrebna dodatna pažnja."
    },
    en: {
      title: "QR and web ordering", tag: "Digital sales",
      intro: "Guests scan a QR code or open the web menu, browse, order and pay straight from their own phone.",
      purpose: "Built for venues that want faster table service, less waiting for a waiter and a digital menu with ordering. It also suits high-traffic venues, terraces, beach bars and any place where speed of service matters.",
      gains: ["Faster ordering for guests", "Less waiting and fewer communication gaps", "A digital menu with no constant reprinting", "Payment from the phone", "A more modern guest experience", "Dedicated ordering links and price lists for nearby office buildings"],
      benefits: [
        { title: "Faster table turnover", text: "When guests do not wait long to see the menu or order, the whole service flow becomes more efficient." },
        { title: "Less printing", text: "A digital menu makes price, menu and promo changes easy, without reprinting." },
        { title: "Better guest experience", text: "Guests get a clear menu with photos, options and a simpler way to order." }
      ],
      example: "Every table has a QR code. The guest scans it, opens the menu, picks items, sends the order and pays right away. The waiter has more time for service, recommendations and tables that need extra attention."
    }
  },
  {
    id: 4, slug: "android-ordering-payment", category: "mobile", icon: "smartphone", visual: "android", visualFirst: true,
    images: [
      { src: "./assets/images/ph-android.jpg", pos: "center", full: "./assets/images/android-proizvodi.jpg", sr: "Octopos Android aplikacija - izbor proizvoda", en: "Octopos Android app - product selection" }
    ], videoUrl: "", demoUrl: "",
    sr: {
      title: "Android poručivanje i naplata", tag: "Mobilnost",
      intro: "Konobar prima porudžbinu direktno za stolom preko Android uređaja, a u zavisnosti od modela uređaja može odmah i da odštampa fiskalni račun ili izvrši naplatu karticom na licu mesta.",
      purpose: "Ovaj modul je idealan za objekte u kojima je važno da osoblje bude stalno prisutno među gostima, bez vraćanja do stacionarne kase za svaku porudžbinu. Posebno je koristan za bašte, veće restorane, beach barove, bazene i objekte sa većim brojem stolova.",
      gains: ["Brže evidentiranje porudžbina", "Manje hodanja do kase i nazad", "Bržu komunikaciju sa kuhinjom i šankom", "Mogućnost naplate na licu mesta", "Mogućnost štampe fiskalnog računa direktno sa uređaja", "3 u 1 rad: poručivanje, fiskal i kartično plaćanje", "Manje čekanja, više prilika za dodatnu prodaju tokom obilaska stolova"],
      benefits: [
        { title: "Porudžbina odmah ide u sistem", text: "Nema prepisivanja i dodatnih koraka - gost poruči, porudžbina odmah stiže gde treba." },
        { title: "Fiskal sa Android uređaja", text: "Određeni modeli uređaja imaju integrisani štampač, pa račun može odmah da se odštampa." },
        { title: "Naplata karticom na licu mesta", text: "Pojedini uređaji mogu da se integrišu sa bankom i omoguće trenutno kartično plaćanje." }
      ],
      example: "Konobar prima porudžbinu na terasi preko Android uređaja, kuhinja je vidi odmah, a kada gost traži račun, isti uređaj može da posluži za kompletan proces: unos porudžbine, štampu fiskalnog računa i naplatu karticom. Sve se završava za stolom, bez vraćanja do centralne kase."
    },
    en: {
      title: "Android ordering and payment", tag: "Mobility",
      intro: "Waiters take orders right at the table on an Android device and, depending on the model, can instantly print the fiscal receipt or take a card payment on the spot.",
      purpose: "Ideal for venues where staff should stay with the guests instead of walking back to a fixed POS for every order. Especially useful for gardens, larger restaurants, beach bars, pools and venues with many tables.",
      gains: ["Faster order entry", "Less walking to the POS and back", "Faster communication with kitchen and bar", "Payment on the spot", "Fiscal receipt printed straight from the device", "3 in 1: ordering, fiscal receipt and card payment"],
      benefits: [
        { title: "Orders go straight into the system", text: "No rewriting and no extra steps - the guest orders and the order instantly lands where it should." },
        { title: "Fiscal receipt from Android", text: "Some device models have a built-in printer, so the receipt can be printed right away." },
        { title: "Card payment at the table", text: "Some devices can be integrated with the bank for instant card payments." }
      ],
      example: "A waiter takes an order on the terrace with an Android device and the kitchen sees it immediately. When the guest asks for the bill, the same device handles everything: order entry, fiscal receipt and card payment. It all ends at the table, without going back to the main POS."
    }
  },
  {
    id: 5, slug: "order-status-display", category: "ops", icon: "ticket", visual: "status", visualFirst: true, visualTime: 10500,
    images: [
      { src: "./assets/images/mon-status-displej-burger.jpg", pos: "center", full: "./assets/images/status-displej-burger.jpg", sr: "Octopos status displej - u pripremi i završeno", en: "Octopos status display - preparing and ready" },
      { src: "./assets/images/mon-status-displej-tema.jpg", pos: "center", full: "./assets/images/status-displej-tema.jpg", sr: "Octopos status displej - sa animacijom i obojenim kolonama", en: "Octopos status display - with animation and coloured columns" },
      { src: "./assets/images/mon-status-displej-kuvar.jpg", pos: "center", full: "./assets/images/status-displej-kuvar.jpg", sr: "Octopos status displej - tema kuvar", en: "Octopos status display - chef theme" },
      { src: "./assets/images/mon-status-displej.jpg", pos: "center", full: "./assets/images/status-displej.jpg", sr: "Octopos status displej - brojevi porudžbina i vreme", en: "Octopos status display - order numbers and times" }
    ],
    show: [
      { visual: true },
      { src: "./assets/images/mon-status-displej-burger.jpg", pos: "center", full: "./assets/images/status-displej-burger.jpg", sr: "Octopos status displej - u pripremi i završeno", en: "Octopos status display - preparing and ready" },
      { src: "./assets/images/mon-status-displej-tema.jpg", pos: "center", full: "./assets/images/status-displej-tema.jpg", sr: "Octopos status displej - sa animacijom i obojenim kolonama", en: "Octopos status display - with animation and coloured columns" },
      { src: "./assets/images/mon-status-displej-kuvar.jpg", pos: "center", full: "./assets/images/status-displej-kuvar.jpg", sr: "Octopos status displej - tema kuvar", en: "Octopos status display - chef theme" },
      { src: "./assets/images/mon-status-displej.jpg", pos: "center", full: "./assets/images/status-displej.jpg", sr: "Octopos status displej - brojevi porudžbina i vreme", en: "Octopos status display - order numbers and times" }
    ], videoUrl: "", demoUrl: "",
    sr: {
      title: "Displej za status porudžbine", tag: "Pregled za goste i osoblje",
      intro: "Ekran koji prikazuje status porudžbina i obaveštava kada je porudžbina spremna za preuzimanje ili posluženje.",
      purpose: "Namenjen je lokalima sa šalterima, preuzimanjem porudžbina, food court konceptom, fast food objektima, ali i internim prikazima za osoblje. Pomaže da svi imaju jasan pregled toka porudžbina.",
      gains: ["Manje pitanja gostiju \"da li je gotovo\"", "Pregledan tok porudžbina", "Manje zadržavanja oko pulta", "Bolju organizaciju izdavanja", "Pregled za goste ili interno za tim"],
      benefits: [
        { title: "Bolje iskustvo gosta", text: "Gost sam prati status i zna kada da priđe po porudžbinu." },
        { title: "Manje gužve na izdavanju", text: "Nema potrebe da osoblje stalno proziva ili odgovara na ista pitanja." },
        { title: "Može i interno", text: "Ekran se može koristiti i kao pomoćni prikaz zaposlenima." }
      ],
      example: "U objektu sa preuzimanjem hrane gost na velikom ekranu prati broj svoje porudžbine. Kada status postane spremno, prilazi pultu. Time se smanjuje gužva i ubrzava izdavanje."
    },
    en: {
      title: "Order status display", tag: "For guests and staff",
      intro: "A screen that shows the status of orders and lets everyone know when an order is ready for pickup or serving.",
      purpose: "Built for venues with counters, order pickup, food courts and fast food, and also for internal staff views. Everyone gets a clear picture of the order flow.",
      gains: ["Fewer \"is it ready yet\" questions", "A clear order flow", "Less crowding around the counter", "Better organised hand-off", "A view for guests or internally for the team"],
      benefits: [
        { title: "Better guest experience", text: "Guests follow the status themselves and know when to come for their order." },
        { title: "Less crowding at pickup", text: "Staff no longer need to call out numbers or answer the same questions." },
        { title: "Works internally too", text: "The screen can also serve as a helper view for staff." }
      ],
      example: "In a pickup venue the guest follows their order number on a big screen. When the status turns to ready, they walk up to the counter. Less crowding, faster hand-off."
    }
  },
  {
    id: 6, slug: "mobile-business-overview", cover: "./assets/images/cover-analytics.jpg", fx: "analytics", category: "analytics", icon: "chart", visual: "mobile",
    images: [
      { src: "./assets/images/cover-analytics.jpg", pos: "center", sr: "Octopos analitika prodaje na računaru, tabletu i telefonu", en: "Octopos sales analytics on desktop, tablet and phone" },
      { src: "./assets/images/ph-mobilni.jpg", pos: "center", sr: "Octopos mobilni pregled - prodaja po grupama i grafik prodaje na telefonu", en: "Octopos mobile overview - sales by group and sales chart on a phone" },
      { src: "./assets/images/mon-backoffice-prodaja-po-satima.jpg", pos: "center", full: "./assets/images/backoffice-prodaja-po-satima.jpg", sr: "Octopos statistika prodaje po satima", en: "Octopos sales statistics by hour" }
    ],
    videoUrl: "", demoUrl: "",
    sr: {
      title: "Mobilni pregled poslovanja", tag: "Kontrola poslovanja",
      intro: "Pregled ključnih podataka o radu lokala preko telefona, tableta ili računara, bez potrebe da budete fizički prisutni u objektu.",
      purpose: "Modul je namenjen vlasnicima, menadžerima i odgovornim licima koja žele brz i jednostavan uvid u poslovanje, promet, otvorene stolove, izdate račune i druge važne informacije u svakom trenutku.",
      gains: ["Kontrolu poslovanja i kada niste u objektu", "Brži uvid u rad lokacije", "Pregled ključnih pokazatelja sa telefona", "Jednostavnije praćenje više lokacija", "Bržu reakciju kada je potrebno"],
      benefits: [
        { title: "Uvid u realnom vremenu", text: "Važne informacije su dostupne bez poziva i dodatnih provera." },
        { title: "Praktično za više lokacija", text: "Lakše je pratiti rad više objekata iz jednog mesta." },
        { title: "Više kontrole", text: "Vlasnik ili menadžer brže primećuje situacije koje zahtevaju reakciju." }
      ],
      example: "Vlasnik koji nije u lokalu preko telefona proverava promet, otvorene stolove i rad lokacije. Ako primeti odstupanje ili potrebu za intervencijom, može odmah da reaguje."
    },
    en: {
      title: "Mobile business overview", tag: "Business control",
      intro: "Key data about your venue on a phone, tablet or computer, without having to be on site.",
      purpose: "Built for owners, managers and responsible staff who want a quick, simple view of the business, turnover, open tables, issued receipts and other important information at any moment.",
      gains: ["Control even when you are away", "Faster insight into each location", "Key indicators on your phone", "Easier tracking of multiple locations", "Faster reaction when needed"],
      benefits: [
        { title: "Real-time insight", text: "Important information is available without phone calls or extra checks." },
        { title: "Practical for multiple venues", text: "It is easier to follow several venues from one place." },
        { title: "More control", text: "Owners and managers spot situations that need action sooner." }
      ],
      example: "An owner who is not at the venue checks turnover, open tables and the location's activity on the phone. If something looks off, they can react immediately."
    }
  },
  {
    id: 7, slug: "backoffice", cover: "./assets/images/cover-backoffice.jpg", fx: "backoffice", category: "analytics", icon: "layers", visual: "backoffice",
    images: [
      { src: "./assets/images/mon-backoffice-stanje-zaliha.jpg", pos: "center", full: "./assets/images/backoffice-stanje-zaliha.jpg", sr: "Octopos backoffice - stanje zaliha", en: "Octopos backoffice - stock list" },
      { src: "./assets/images/mon-backoffice-prodaja-po-satima.jpg", pos: "center", full: "./assets/images/backoffice-prodaja-po-satima.jpg", sr: "Octopos backoffice - statistika prodaje po satima", en: "Octopos backoffice - sales statistics by hour" },
      { src: "./assets/images/mon-backoffice-specifikacija.jpg", pos: "center", full: "./assets/images/backoffice-specifikacija.jpg", sr: "Octopos backoffice - specifikacija izdatih artikala", en: "Octopos backoffice - issued items report" }
    ],
    videoUrl: "", demoUrl: "",
    sr: {
      title: "Backoffice", tag: "Administracija i analiza",
      intro: "Centralno mesto za robno, finansijsko i operativno upravljanje poslovanjem, pregled izveštaja, zaliha, kalkulacija i dokumentacije.",
      purpose: "Backoffice je namenjen firmama koje žele detaljniju kontrolu robe, zaliha, ulaza, izlaza, kalkulacija, komitenata i izveštaja. Posebno je važan za objekte sa složenijim poslovanjem, više magacina, više lokacija ili većim obimom robe.",
      gains: ["Pregled robnog poslovanja na jednom mestu", "Bolju kontrolu zaliha i kretanja robe", "Izveštaje za analizu poslovanja", "Lakši rad sa kalkulacijama i dokumentima", "Više reda i kontrole u administraciji"],
      benefits: [
        { title: "Manje improvizacije", text: "Procesi postaju jasniji, dokumentovaniji i lakši za praćenje." },
        { title: "Preciznija kontrola robe", text: "Lakše se prati stanje, potrošnja i organizacija nabavke." },
        { title: "Bolja osnova za odluke", text: "Kada su podaci pregledni, lakše je planirati i reagovati." }
      ],
      example: "Menadžment kroz backoffice prati zalihe, ulaze robe, kalkulacije, izveštaje i rad više lokacija. Umesto ručnog skupljanja podataka iz više izvora, sve informacije se nalaze na jednom mestu."
    },
    en: {
      title: "Backoffice", tag: "Administration and analysis",
      intro: "One central place for stock, finance and operations - reports, inventory, costing and documents.",
      purpose: "Backoffice is for companies that want tighter control over goods, stock, receipts, issues, costing, partners and reports. It matters most for venues with more complex operations, several warehouses, several locations or a large volume of goods.",
      gains: ["All stock operations in one place", "Better control of inventory and movement", "Reports for business analysis", "Easier work with costing and documents", "More order and control in administration"],
      benefits: [
        { title: "Less improvisation", text: "Processes become clearer, documented and easier to follow." },
        { title: "Tighter stock control", text: "Stock levels, consumption and purchasing are easier to track." },
        { title: "A better basis for decisions", text: "When data is clear, planning and reacting get easier." }
      ],
      example: "Management uses backoffice to follow stock, goods receipts, costing, reports and the work of several locations. Instead of collecting data by hand from many sources, everything lives in one place."
    }
  },
  {
    id: 8, slug: "qr-bill-check", category: "digital", icon: "receipt", visual: "qrbill",
    images: [], videoUrl: "", demoUrl: "",
    sr: {
      title: "Provera računa preko QR koda", tag: "Pregled za goste",
      intro: "Gost skenira QR kod za svoj sto i u svakom trenutku vidi pregled stavki koje su trenutno evidentirane na računu. Kada se račun naplati i zatvori, QR kod postaje neaktivan.",
      purpose: "Modul je namenjen objektima koji žele veću transparentnost prema gostima i manje dodatnih pitanja prema konobaru. Gost može jednostavno da proveri šta je trenutno uneto na sto, bez čekanja da mu neko donese presek računa.",
      gains: ["Brži uvid gosta u trenutno stanje računa", "Manje pozivanja konobara zbog provere stavki", "Veću transparentnost i sigurnost za gosta", "Modernije korisničko iskustvo", "Automatsku deaktivaciju QR koda nakon naplate"],
      benefits: [
        { title: "Gost ima pregled", text: "U svakom trenutku može da vidi koje su stavke evidentirane na njegovom stolu." },
        { title: "Manje opterećenje za osoblje", text: "Konobari imaju manje prekida zbog dodatnih provera i pitanja oko računa." },
        { title: "QR važi samo dok je račun otvoren", text: "Nakon naplate i zatvaranja računa, QR kod automatski postaje neaktivan." }
      ],
      example: "Za stolom se nalazi QR kod koji gost može da skenira telefonom. Na ekranu dobija pregled svih trenutno unetih stavki za taj sto. Kada račun bude naplaćen, isti QR više ne daje prikaz i postaje neaktivan za dalje korišćenje."
    },
    en: {
      title: "Bill check via QR code", tag: "For guests",
      intro: "Guests scan the QR code on their table and can see the items currently on their bill at any time. Once the bill is paid and closed, the QR code becomes inactive.",
      purpose: "Built for venues that want more transparency for guests and fewer extra questions for waiters. Guests can simply check what is on the table without waiting for someone to bring an interim bill.",
      gains: ["Instant view of the current bill", "Fewer waiter calls just to check items", "More transparency and trust for guests", "A more modern experience", "QR code deactivates automatically after payment"],
      benefits: [
        { title: "Guests stay informed", text: "At any moment they can see which items are recorded on their table." },
        { title: "Less load on staff", text: "Waiters get fewer interruptions for bill checks and questions." },
        { title: "QR valid only while the bill is open", text: "After payment and closing, the QR code automatically becomes inactive." }
      ],
      example: "There is a QR code on the table that the guest scans with a phone. The screen shows every item currently entered for that table. Once the bill is paid, the same QR no longer shows anything and becomes inactive."
    }
  },
  {
    id: 9, slug: "api-connector", category: "integrations", icon: "code", visual: "api", page: "api.html",
    images: [], videoUrl: "", demoUrl: "",
    sr: {
      title: "API konektor", tag: "Integracije",
      intro: "Povežite aplikacije sa Octopos-om: porudžbine, fiskalizacija, kreiranje dokumenata, stanje zaliha, normativi, nabavne cene i izveštaji. Podržana je i uslužna fiskalizacija za internet prodavnice i aplikacije.",
      purpose: "Modul je namenjen firmama koje žele da svoje podatke koriste i van standardnih izveštaja u programu. Pogodan je za povezivanje sa BI alatima, internim sistemima, eksternim platformama i prilagođenim analitičkim rešenjima.",
      gains: ["Mogućnost preuzimanja podataka iz sistema", "Izradu sopstvenih izveštaja i analitike", "Povezivanje sa drugim softverima", "Veću fleksibilnost u obradi podataka", "Osnovu za napredne integracije po potrebi"],
      benefits: [
        { title: "Podaci po meri korisnika", text: "Korisnik nije ograničen samo na gotove izveštaje, već može praviti sopstvene prikaze." },
        { title: "Povezivanje sa drugim sistemima", text: "API omogućava lakšu integraciju sa eksternim softverima i analitičkim alatima." },
        { title: "Veća kontrola nad analizom", text: "Podaci se mogu koristiti za interne analize, dashboard-e i poslovno praćenje po želji." }
      ],
      example: "Korisnik želi da prati prodaju, artikle i druge pokazatelje kroz sopstveni BI alat. Putem API konektora preuzima podatke iz sistema i pravi analitiku i izveštaje tačno prema svojim potrebama i načinu rada."
    },
    en: {
      title: "API connector", tag: "Integrations",
      intro: "Connect your applications to Octopos: orders, fiscalization, document creation, inventory, recipes, cost prices and reports. Fiscalization services are also available for websites and apps.",
      purpose: "Built for companies that want to use their data beyond the standard reports in the software. A good fit for BI tools, internal systems, external platforms and custom analytics.",
      gains: ["Pull data out of the system", "Build your own reports and analytics", "Connect with other software", "More flexibility in data processing", "A foundation for advanced integrations"],
      benefits: [
        { title: "Data shaped your way", text: "You are not limited to built-in reports and can create your own views." },
        { title: "Connect other systems", text: "The API makes integration with external software and analytics tools easier." },
        { title: "More control over analysis", text: "Use the data for internal analysis, dashboards and business tracking as you like." }
      ],
      example: "A customer wants to follow sales, items and other indicators in their own BI tool. Through the API connector they pull the data and build analytics and reports exactly the way they work."
    }
  },
  {
    id: 10, slug: "hotel-pms-connection", category: "integrations", icon: "hotel", visual: "hotel",
    images: [], videoUrl: "", demoUrl: "",
    sr: {
      title: "Konekcija sa hotelskim softverom", tag: "Hotelske integracije",
      intro: "Octopos može da se poveže sa hotelskim PMS rešenjima kao što su Protel, Hotel Sync i Prosoft, kako bi se F&B troškovi iz restorana, bara ili drugih prodajnih mesta vezivali direktno za sobu gosta.",
      purpose: "Modul je namenjen hotelima i smeštajnim objektima koji žele da objedine hotelsko i ugostiteljsko poslovanje. Prodaja iz restorana, bara ili drugih F&B punktova može odmah da se poveže sa smeštajnom jedinicom i hotelskim sistemom.",
      gains: ["Povezivanje F&B prodaje sa hotelskim PMS-om", "Mogućnost knjiženja troška direktno na sobu", "Manje ručnog prenosa podataka", "Brži i jednostavniji rad osoblja", "Bolju usklađenost hotelskog i ugostiteljskog dela poslovanja"],
      benefits: [
        { title: "Trošak ide na sobu", text: "Računi iz restorana ili bara mogu se vezati direktno za gosta i njegovu sobu." },
        { title: "Manje ručnih koraka", text: "Osoblje ne mora dodatno da prenosi ili usklađuje podatke između sistema." },
        { title: "Pogodno za hotelski F&B", text: "Rešenje je korisno za hotele koji imaju restoran, bar, spa ili druge prodajne tačke." }
      ],
      example: "Gost hotela sedi u restoranu i želi da račun prebaci na sobu. Konobar kroz Octopos bira odgovarajuću sobu iz hotelskog PMS-a, a trošak se evidentira u hotelskom sistemu bez dodatnog ručnog unosa."
    },
    en: {
      title: "Hotel software connection", tag: "Hotel integrations",
      intro: "Octopos connects with hotel PMS solutions such as Protel, Hotel Sync and Prosoft, so F&B charges from the restaurant, bar or other outlets post directly to the guest's room.",
      purpose: "Built for hotels and accommodation that want to bring hotel and F&B operations together. Sales from the restaurant, bar or other outlets can be linked to the room and the hotel system instantly.",
      gains: ["F&B sales connected to the hotel PMS", "Charges posted directly to the room", "Less manual data transfer", "Faster, simpler work for staff", "Hotel and F&B operations in sync"],
      benefits: [
        { title: "Charge to room", text: "Restaurant or bar bills can be linked directly to the guest and their room." },
        { title: "Fewer manual steps", text: "Staff do not need to re-enter or reconcile data between systems." },
        { title: "Made for hotel F&B", text: "Useful for hotels with a restaurant, bar, spa or other points of sale." }
      ],
      example: "A hotel guest in the restaurant wants the bill charged to the room. The waiter picks the room from the hotel PMS inside Octopos and the charge is recorded in the hotel system with no extra manual entry."
    }
  },
  {
    id: 11, slug: "multi-location-management", category: "analytics", icon: "network", visual: "multi",
    images: [], videoUrl: "", demoUrl: "",
    sr: {
      title: "Centralno upravljanje za više lokala", tag: "Više lokacija",
      intro: "Ako firma ima više lokala, poslovanje može da se vodi centralno iz jedne baze. Artikli, komitenti, popusti i drugi zajednički podaci unose se jednom, a zatim se distribuiraju na lokacije kojima su potrebni.",
      purpose: "Modul je namenjen lancima, grupacijama i firmama koje upravljaju sa više prodajnih mesta i žele da standardizuju rad. Umesto da se isti podaci održavaju odvojeno na svakoj lokaciji, sve se kontroliše sa jednog centralnog mesta.",
      gains: ["Jednokratno kreiranje artikala za više lokala", "Centralno upravljanje komitentima, popustima i šifarnicima", "Ujednačen rad na svim lokacijama", "Zbirne izveštaje na jednom mestu", "Manje duplog unosa i manje administracije"],
      benefits: [
        { title: "Unos jednom, primena na više mesta", text: "Nema potrebe da se isti artikal, komitent ili popust pravi posebno u svakom lokalu." },
        { title: "Zbirna prodaja na jednom mestu", text: "Promet sa svih lokacija se sinhronizuje i može se pratiti centralno." },
        { title: "Bolja kontrola sistema", text: "Standardizacija podataka i pravila rada olakšava upravljanje većim brojem objekata." }
      ],
      example: "Firma ima pet lokala i želi da svi koriste iste artikle, iste komitente i ista pravila popusta. Podaci se unesu jednom u centralnu bazu, a lokacije koje treba da ih koriste dobijaju ih automatski. Istovremeno, prodaja sa svih lokacija se sinhronizuje u centralu, pa menadžment ima zbirni pregled na jednom mestu."
    },
    en: {
      title: "Central management for multiple venues", tag: "Multiple locations",
      intro: "If your company runs several venues, everything can be managed centrally from one database. Items, partners, discounts and other shared data are entered once and pushed to the locations that need them.",
      purpose: "Built for chains, groups and companies running several points of sale that want to standardise how they work. Instead of maintaining the same data separately at every location, everything is controlled from one central place.",
      gains: ["Create items once for every venue", "Central management of partners, discounts and code lists", "Consistent work across all locations", "Consolidated reports in one place", "Less double entry and less admin"],
      benefits: [
        { title: "Enter once, use everywhere", text: "No need to create the same item, partner or discount separately in every venue." },
        { title: "Consolidated sales in one place", text: "Turnover from every location syncs and can be followed centrally." },
        { title: "Better system control", text: "Standardised data and rules make running many venues easier." }
      ],
      example: "A company has five venues and wants them all to use the same items, partners and discount rules. Data is entered once in the central database and the locations that need it receive it automatically. At the same time, sales from every location sync back to HQ, so management has one consolidated view."
    }
  }
];
