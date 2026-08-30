// Extra blocks for the sub-pages: how the job runs, what the price covers, and
// what we are typically called to in each borough. Kept apart from the main copy
// files so those stay readable.

// slug -> { process: [[krok, popis]], included: [string] }
export const SERVICE_EXTRA = {
  WC: {
    process: [
      ['Zistíme, čo presne uniká', 'Odklopíme nádržku a pozrieme, či ide o napúšťací ventil, vypúšťacie tesnenie alebo prasknutú keramiku. Kým to nevieme, nič nemeníme.'],
      ['Poviem cenu a možnosti', 'Dozviete sa, či sa oplatí oprava alebo výmena celého WC — aj s dôvodom, nie len s číslom.'],
      ['Opravíme a odskúšame', 'Po zásahu necháme nádržku napustiť a spláchnuť niekoľkokrát, aby sa prípadná netesnosť ukázala hneď, nie o týždeň.'],
    ],
    included: ['Obhliadka a diagnostika poruchy', 'Bežné náhradné diely vozíme so sebou', 'Odskúšanie tesnosti po oprave', 'Upratanie pracovného miesta'],
  },
  montazbaterii: {
    process: [
      ['Overíme typ a rozteč', 'Podľa fotky alebo na mieste zistíme, či stačí výmena kartuše a či nová batéria sadne na existujúce pripojenie.'],
      ['Vyberiete si model', 'Ak batériu kupujeme my, pošlem fotky s cenami. Vyberiete si a privezieme ju už na montáž.'],
      ['Namontujeme a odskúšame', 'Starú odpojíme, novú osadíme, skontrolujeme tesnosť pod tlakom a vyskúšame obe teploty.'],
    ],
    included: ['Odpojenie a odvoz starej batérie', 'Kontrola rohových ventilov', 'Skúška tesnosti pod tlakom', 'Poradenstvo pri výbere modelu'],
  },
  Krtkovanie: {
    process: [
      ['Zistíme, kde je príčina', 'Pýtam sa, či sa spomaľuje jedno zariadenie alebo viac naraz. Podľa toho vieme, či ide o sifón alebo o stúpačku.'],
      ['Prečistíme strojovo', 'Špirálou zoškrabeme usadeninu po celom obvode potrubia až po pôvodný priemer — nie len prierazom uprostred nánosu.'],
      ['Overíme prietok', 'Necháme odtiecť väčšie množstvo vody, aby bolo vidieť, že potrubie odteká naplno a nie len chvíľu.'],
    ],
    included: ['Posúdenie príčiny upchatia', 'Strojové prečistenie potrubia', 'Kontrola prietoku po zásahu', 'Odporúčanie, ako predísť opakovaniu'],
  },
  kurenie: {
    process: [
      ['Prejdeme sústavu', 'Zistíme, či ide o vzduch, zatuhnutý ventil alebo pokles tlaku — príznaky sa na prvý pohľad podobajú, riešenie nie.'],
      ['Odvzdušníme a nastavíme', 'Sústavu odvzdušníme, doplníme tlak a skontrolujeme, či radiátory hrejú rovnomerne.'],
      ['Vymeníme, čo nedrží', 'Zatuhnuté termostatické ventily alebo netesniace spoje vymeníme, aby sa problém o mesiac nevrátil.'],
    ],
    included: ['Kontrola tlaku v sústave', 'Odvzdušnenie radiátorov', 'Preverenie termostatických hlavíc', 'Odporúčanie ďalšieho postupu'],
  },
  bojler: {
    process: [
      ['Posúdime, či sa oplatí opraviť', 'Rozhoduje stav nádoby. Ak je chybné teleso alebo termostat, oprava je výrazne lacnejšia než nový kus.'],
      ['Odpojíme a vymeníme', 'Starý bojler vypustíme, odpojíme a zložíme. Nový osadíme vrátane poistného ventilu a pripojenia.'],
      ['Napustíme a odskúšame', 'Nádobu napustíme, skontrolujeme tesnosť spojov a necháme dobehnúť prvý ohrev.'],
    ],
    included: ['Posúdenie stavu nádoby', 'Odvoz starého bojlera', 'Kontrola poistného ventilu', 'Skúška tesnosti a prvý ohrev'],
  },
  sprchovekuty: {
    process: [
      ['Pripravíme odpad a rozvody', 'Skontrolujeme výšku odpadu — pri panelovej zástavbe práve ona rozhoduje, aký typ vaničky je možný.'],
      ['Osadíme vaničku do roviny', 'Vanička musí sedieť presne. Nepresnosť pár milimetrov znamená vodu na podlahe.'],
      ['Zasilikónujeme a odskúšame', 'Škáru stiahneme po celom obvode a kút necháme napustený, aby sa prípadná netesnosť prejavila u nás.'],
    ],
    included: ['Demontáž pôvodnej vane alebo kútu', 'Príprava odpadu a rozvodov', 'Osadenie do roviny', 'Silikónovanie a skúška tesnosti'],
  },
  prackaumyvacka: {
    process: [
      ['Skontrolujeme prípojku', 'Pozrieme, či je uzatvárací ventil funkčný a či prívodná hadica nie je stvrdnutá alebo popraskaná.'],
      ['Zapojíme na vodu a odpad', 'Odpad vedieme cez slučku, aby sa odpadová voda nemohla vrátiť späť do spotrebiča.'],
      ['Pustíme skúšobný cyklus', 'Kým program nedobehne, neodchádzame — spoje treba vidieť pod záťažou, nie nasucho.'],
    ],
    included: ['Kontrola alebo doplnenie rohového ventilu', 'Zapojenie na vodu aj odpad', 'Vedenie hadíc bez zalomenia', 'Skúšobný cyklus a kontrola spojov'],
  },
  prackaumyvacka_wemr: {
    process: [
      ['Skontrolujeme prípojku', 'Overíme funkčnosť uzatváracieho ventilu a stav prívodnej hadice.'],
      ['Zapojíme spotrebič', 'Pripojíme na vodu aj odpad tak, aby sa hadice po zasunutí spotrebiča nezalomili.'],
      ['Odskúšame pod záťažou', 'Pustíme skúšobný cyklus a skontrolujeme spoje.'],
    ],
    included: ['Kontrola prípojky', 'Zapojenie na vodu a odpad', 'Skúšobný cyklus', 'Kontrola tesnosti'],
  },
  montazdrezu: {
    process: [
      ['Pripravíme osadenie', 'Skontrolujeme výrez v doske alebo upevnenie v stene, aby drez či umývadlo držali natrvalo.'],
      ['Utesníme po obvode', 'Pri dreze je tesnenie kritické — voda v drevotrieske znamená dosku na výmenu, nie na opravu.'],
      ['Pripojíme a odskúšame', 'Osadíme sifón so správnym spádom, pripojíme batériu a necháme odtiecť vodu.'],
    ],
    included: ['Demontáž a odvoz starého kusa', 'Utesnenie po obvode', 'Osadenie sifónu so spádom', 'Pripojenie batérie'],
  },
  sifon: {
    process: [
      ['Zistíme, čo netesní', 'Rozoberieme sifón a pozrieme, či ide o prasknutú stenu, stvrdnuté tesnenie alebo povolenú maticu.'],
      ['Vymeníme a nastavíme spád', 'Nový sifón osadíme tak, aby držal vodný uzáver a zároveň voľne odtekal.'],
      ['Prekontrolujeme odpad za sifónom', 'Pri tejto príležitosti pozrieme aj potrubie ďalej — býva tam usadenina, ktorá spomaľuje odtok.'],
    ],
    included: ['Demontáž starého sifónu', 'Nový sifón bežného typu', 'Kontrola odpadu za sifónom', 'Skúška tesnosti'],
  },
  ventily: {
    process: [
      ['Odstavíme prívod', 'Zistíme, kadiaľ sa dá voda uzavrieť. Pri starších bytoch to nebýva samozrejmosť a treba to vyriešiť vopred.'],
      ['Vymeníme uzáver', 'Starý ventil odstránime aj s usadeninou a osadíme nový, ktorý po rokoch nezatuhne.'],
      ['Odskúšame pod tlakom', 'Vodu pustíme a skontrolujeme spoj aj samotné uzatváranie.'],
    ],
    included: ['Odstavenie prívodu vody', 'Nový ventil bežného typu', 'Kontrola spoja pod tlakom', 'Overenie funkčnosti uzáveru'],
  },
  geberit: {
    process: [
      ['Otvoríme revíznym otvorom', 'Vo väčšine prípadov sa dá k mechanizmu dostať bez zásahu do obkladu — presne na to je otvor pod tlačidlom.'],
      ['Vymeníme vnútorný diel', 'Netesniace vypúšťacie tesnenie alebo napúšťací ventil vymeníme; pri starších modeloch diel dohľadáme.'],
      ['Nastavíme a odskúšame', 'Nastavíme množstvo splachovanej vody a niekoľkokrát spláchneme, aby bolo isté, že do misy netečie.'],
    ],
    included: ['Prístup cez revízny otvor', 'Diagnostika mechanizmu', 'Nastavenie množstva vody', 'Opakovaná skúška splachovania'],
  },
  cerpadla: {
    process: [
      ['Zmeriame tlak a spínanie', 'Časté spínanie býva chybou tlakovej nádoby, nie čerpadla. Rozdiel sa dá zistiť meraním, nie odhadom.'],
      ['Opravíme alebo vymeníme', 'Podľa nálezu doplníme predtlak, opravíme netesnosť na saní alebo vymeníme čerpadlo za správne dimenzované.'],
      ['Odskúšame v prevádzke', 'Systém necháme bežať a sledujeme, či tlak drží a čerpadlo spína v rozumných intervaloch.'],
    ],
    included: ['Meranie tlaku a kontrola spínania', 'Kontrola tlakovej nádoby', 'Posúdenie sania a netesností', 'Poradenstvo pri výbere výkonu'],
  },
  silikonovanie: {
    process: [
      ['Odstránime starú škáru', 'Kompletne, nie len povrchovo. Nový silikón nanesený na starý nemá na čom držať a pleseň pod ním rastie ďalej.'],
      ['Vyčistíme a odmastíme podklad', 'Podklad musí byť suchý a čistý, inak škára do roka odskočí v rohoch.'],
      ['Nanesieme a stiahneme', 'Použijeme sanitárny silikón s protiplesňovou prísadou a škáru stiahneme do rovnomerného tvaru.'],
    ],
    included: ['Odstránenie starého silikónu', 'Vyčistenie a odmastenie podkladu', 'Sanitárny silikón s protiplesňovou prísadou', 'Rovnomerné stiahnutie škáry'],
  },
};

// slug -> list of jobs we are typically called to in that borough
export const DISTRICT_EXTRA = {
  staremesto: ['Netesniace kohúty a staré uzávery', 'Výmena batérií a WC v starších bytoch', 'Prečistenie odpadov s dlhou prevádzkou', 'Príprava rozvodov pred rekonštrukciou', 'Servis kúrenia v starších sústavách', 'Riešenie odstavenia vody so správcom'],
  ruzinov: ['Výmena bojlerov po skončení životnosti', 'Zapojenie práčok a umývačiek', 'Opravy WC a podomietkových nádržiek', 'Montáž sprchových kútov pri prerábke', 'Výmena batérií v kúpeľni aj kuchyni', 'Dokončovacie práce v novostavbách'],
  petrzalka: ['Výmena vane za sprchový kút v bytovom jadre', 'Prečistenie odpadov a stúpačiek', 'Opravy splachovania vrátane Geberitu', 'Výmena batérií aj s nákupom modelu', 'Zapojenie práčky a umývačky', 'Výmena rohových ventilov'],
  novemesto: ['Riešenie slabého tlaku vody', 'Servis čerpadiel v rodinných domoch', 'Odvzdušnenie a vyváženie kúrenia', 'Výmena radiátorov pri rekonštrukcii', 'Opravy batérií a WC v bytoch', 'Výmena bojlerov a ohrievačov'],
  karlovaves: ['Výmena batérií a sifónov', 'Montáž sprchových kútov na Dlhých dieloch', 'Prečistenie upchatých odpadov', 'Silikónovanie vane a sprchy', 'Čerpadlá pri domoch na svahu', 'Opravy splachovania'],
  dubravka: ['Výmena batérií a kartuší', 'Prečistenie kuchynských odpadov', 'Výmena sifónov pod drezom a umývadlom', 'Opravy WC a splachovania', 'Zapojenie spotrebičov na vodu', 'Výmena bojlerov'],
  raca: ['Rozvody a uzávery v rodinných domoch', 'Vonkajšie výtoky a ich zazimovanie', 'Servis a výmena čerpadiel', 'Odvzdušnenie väčších sústav kúrenia', 'Dokončovacie práce v novostavbách', 'Bežné opravy batérií a WC'],
  vrakuna: ['Opravy WC a batérií v bytoch', 'Prečistenie odpadov a stúpačiek', 'Výmena bojlerov s odvozom starého', 'Zapojenie práčok vrátane ventilu', 'Rozvody a uzávery v rodinných domoch', 'Výmena sifónov'],
  podunajskebiskupice: ['Výmena zatuhnutých uzáverov', 'Opravy podomietkových nádržiek', 'Rozvody v starších rodinných domoch', 'Prečistenie odpadov', 'Servis kúrenia', 'Výmena batérií a sifónov'],
  devin: ['Domáce vodárne a studňové čerpadlá', 'Tlakové nádoby a kolísavý tlak', 'Vonkajšie výtoky a zazimovanie', 'Rozvody vedené v zemi', 'Servis kúrenia v rodinných domoch', 'Výmena bojlerov'],
  devinskanovaves: ['Montáž sprchových kútov v bytoch', 'Výmena batérií a sifónov', 'Prečistenie odpadov', 'Kúrenie v starších sústavách', 'Zapojenie spotrebičov', 'Výmena bojlerov s odvozom'],
  lamac: ['Opravy batérií a splachovania', 'Zatuhnuté termostatické hlavice', 'Výmena sifónov a uzáverov', 'Silikónovanie vane a sprchy', 'Príprava pred rekonštrukciou kúpeľne', 'Prečistenie odpadov'],
  zahorskabystrica: ['Dokončovacie práce v novostavbách', 'Montáž batérií a osadenie sanity', 'Čerpadlá a tlakové nádoby', 'Rozvody vedené v zemi', 'Vonkajšie výtoky a zazimovanie', 'Servis kúrenia'],
  vajnory: ['Vonkajšie výtoky v záhradách', 'Zazimovanie potrubia pred mrazmi', 'Čerpadlá a domáce vodárne', 'Odvzdušnenie a vyváženie kúrenia', 'Výmena uzáverov v rodinných domoch', 'Bežné opravy batérií a WC'],
  jarovce: ['Rozvody a uzávery v rodinných domoch', 'Čerpadlá a tlakové nádoby', 'Prečistenie odpadov', 'Servis kúrenia', 'Výmena batérií a sifónov', 'Opravy WC'],
  rusovce: ['Opravy splachovačov vrátane Geberitu', 'Čerpadlá a domáce vodárne', 'Rozvody vedené v zemi', 'Výmena uzáverov', 'Servis kúrenia', 'Bežné opravy batérií'],
  cunovo: ['Čerpadlá a kolísavý tlak zo studne', 'Tlakové nádoby a predtlak', 'Odvzdušnenie a vyváženie kúrenia', 'Rozvody a uzávery', 'Výmena batérií a sifónov', 'Opravy WC'],
};

// Real Google reviews, tagged so each page can show the ones that fit it.
export const REVIEWS = [
  { name: 'Marian', district: 'Dúbravka', slugD: 'dubravka', services: ['montazbaterii'],
    text: 'Veľmi príjemný pán, ktorý vykonal skvelú prácu. Potreboval som vymeniť 2 batérie v kúpeľni. Zavolal som vo štvrtok večer a v piatok ráno som ich mal vymenené. Cenu a presný čas sme si dohodli telefonicky.' },
  { name: 'Elena', district: 'Petržalka', slugD: 'petrzalka', services: ['montazbaterii'],
    text: 'Ďakujem za rýchlu a profesionálnu výmenu batérie. Čo bolo tiež super, batériu som si nemusela sama kupovať — pán vodár ju bol kúpiť sám a ja som si vybrala na základe fotiek a konzultácie s ním.' },
  { name: 'Peter', district: 'Rusovce', slugD: 'rusovce', services: ['geberit', 'WC'],
    text: 'Do hodiny od nahlásenia závady sa v sobotu dostavil pán Tomasz a promptne zabezpečil opravu splachovača Geberit aj s náhradnými dielmi k modelu, ktorý sa už dlhšie nevyrába.' },
  { name: 'Lucia', district: 'Ružinov', slugD: 'ruzinov', services: ['prackaumyvacka', 'prackaumyvacka_wemr', 'montazdrezu'],
    text: 'Ďakujeme za rýchle a profesionálne vymenenie starej umývačky za novú. Pán bol ochotný prísť aj na ďalší deň, keďže nám kvapkalo umývadlo v kúpeľni, a všetko vyriešil k spokojnosti.' },
  { name: 'Barbora', district: 'Podunajské Biskupice', slugD: 'podunajskebiskupice', services: ['WC', 'geberit'],
    text: 'S pánom inštalatérom sme boli veľmi spokojní. Potrebovala som opraviť toaletu, zavolali sme a do hodiny prišiel. Dohodli sme sa na cene a hneď to opravil.' },
  { name: 'Patrik', district: 'Karlova Ves', slugD: 'karlovaves', services: ['montazbaterii'],
    text: 'Cena bola taká, akú sme si dohodli po telefóne. Vodár prišiel hneď nasledujúci deň. Rýchla a kvalitná práca, môžem len odporučiť.' },
];

// Slovak needs the borough name inflected: "do Petržalky", "pre Petržalku".
// Inserting the nominative everywhere read as a grammar mistake.
export const DECL = {
  staremesto: { gen: 'Starého Mesta', acc: 'Staré Mesto' },
  ruzinov: { gen: 'Ružinova', acc: 'Ružinov' },
  petrzalka: { gen: 'Petržalky', acc: 'Petržalku' },
  novemesto: { gen: 'Nového Mesta', acc: 'Nové Mesto' },
  karlovaves: { gen: 'Karlovej Vsi', acc: 'Karlovu Ves' },
  dubravka: { gen: 'Dúbravky', acc: 'Dúbravku' },
  raca: { gen: 'Rače', acc: 'Raču' },
  vrakuna: { gen: 'Vrakune', acc: 'Vrakuňu' },
  podunajskebiskupice: { gen: 'Podunajských Biskupíc', acc: 'Podunajské Biskupice' },
  devin: { gen: 'Devína', acc: 'Devín' },
  devinskanovaves: { gen: 'Devínskej Novej Vsi', acc: 'Devínsku Novú Ves' },
  lamac: { gen: 'Lamača', acc: 'Lamač' },
  zahorskabystrica: { gen: 'Záhorskej Bystrice', acc: 'Záhorskú Bystricu' },
  vajnory: { gen: 'Vajnôr', acc: 'Vajnory' },
  jarovce: { gen: 'Jaroviec', acc: 'Jarovce' },
  rusovce: { gen: 'Rusoviec', acc: 'Rusovce' },
  cunovo: { gen: 'Čunova', acc: 'Čunovo' },
};
