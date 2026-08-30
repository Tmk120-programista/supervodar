// Rewrites the v2 service/district data so every card and chip links to the
// matching landing page, with copy and alt text written for search + humans.
import fs from 'node:fs';

const FILE = 'docs/v2/index.html';
let html = fs.readFileSync(FILE, 'utf8');

// [title, description, image, slug]  — slug '' means no landing page exists yet.
const SERVICES = `  var SERVICES = [
    ['Oprava a výmena WC','Pretekajúce WC, nefunkčné splachovanie alebo prasknutá nádržka. Poruchu nájdeme, opravíme a keď sa neoplatí opravovať, vymeníme celé WC.','a86/a864a51f04e516f7d741c87a51890d0f/876NP3npUMc_2x_1x_1_2x.webp','WC'],
    ['Montáž a výmena batérie','Kvapkajúca batéria vie za rok premrhať tisíce litrov vody. Vymeníme ju v kúpeľni aj kuchyni a poradíme s výberom modelu — aj ju za vás kúpime.','6f9/6f9cc79ea137876fc8c6720ce79708a9/8jQC5RHWuSE_2x_2x.jpg','montazbaterii'],
    ['Krtkovanie potrubia','Upchatý odpad, drez, WC alebo sprcha. Kanalizáciu strojovo prečistíme a odstránime príčinu, nie iba následok.','87e/87ee837172920482c7c9c3d15261dbb8/yzewo1jNMLw_2x_1x.jpg','Krtkovanie'],
    ['Montáž a servis kúrenia','Studený radiátor, zavzdušnené kúrenie alebo netesniaci ventil. Opravíme ústredné kúrenie aj vymeníme radiátory.','b0f/b0f0b80bf3a32a9d7f9e8bec80950bb6/ihx1LdtnGXw_2x_1x_1_1x_11zon_2x.webp','kurenie'],
    ['Bojlery a ohrievače','Bez teplej vody? Opravíme aj vymeníme bojler či prietokový ohrievač vrátane pripojenia na rozvody a elektriku.','9eb/9ebdd3b1839243cc40694e7dafc76cc0/Water-Heater-Repair-Atlanta_2x.jpg','bojler'],
    ['Sprchové kúty','Montáž sprchového kúta na kľúč — rozvody vody, navŕtanie otvorov, osadenie aj finálne silikónovanie.','572/57226e5ac8134d5fe7e368d5d28f7f33/Zrzut_ekranu_2022-02-5_o_23.26.48_2x_1x.png','sprchovekuty'],
    ['Práčky a umývačky','Odborné zapojenie práčky aj umývačky riadu na vodu a odpad. Bez zaplavenej kuchyne a so zárukou tesnosti.','7ae/7aeb816e5c862bea5eb34af126c1e674/9hKbr86_LhA_2x_1x.jpg','prackaumyvacka'],
    ['Montáž drezu a umývadla','Osadenie a pripojenie drezu, umývadla aj batérie. Starý kus odpojíme a odvezieme, po sebe upraceme.','70e/70e52a31f92690f69c237afeb6158a37/BK3h3qXspQU_2x_2x.jpg','montazdrezu'],
    ['Montáž a výmena sifónu','Zapáchajúci alebo tečúci sifón pod umývadlom, drezom či vaňou vymeníme spravidla do pár desiatok minút.','85a/85ac2d1c2f52033d2a6ad4f665369ac6/Zrzut_ekranu_2022-02-5_o_16.18.24_2x_1x.png','sifon'],
    ['Výmena a montáž ventilov','Zatuhnutý alebo netesniaci uzáver vody. Vymeníme rohové, guľové aj hlavné uzávery všetkých druhov.','857/857aa4e08e16683dc331c9d0b0d0e45a/Zrzut_ekranu_2022-02-5_o_23.53.05_2x_1x.png','ventily'],
    ['Oprava Geberit','Servis podomietkových splachovačov Geberit vrátane náhradných dielov — aj k modelom, ktoré sa už nevyrábajú.','811/811c26617281a6b25059051f0c894a8e/1734279928082_2x_2x.jpg','geberit'],
    ['Čerpadlá','Montáž, oprava, výmena aj pravidelný servis čerpadiel. Poradíme s výberom vhodného výkonu.','97a/97af98926313721eaa9b4b39d55086a0/iStock-637862172_1x.jpg','cerpadla'],
    ['Silikónovanie','Plesnivá alebo popraskaná škára pri vani, sprche či kuchynskej linke. Starý silikón odstránime a nanesieme nový.','05a/05a009235a64f7c26638aa740e20e100/silicone_to_shower_door_2x_1x.jpg','silikonovanie'],
    ['Havarijná služba 24/7','Prasknuté potrubie alebo zaplavená kúpeľňa neplánujú termín. Volajte kedykoľvek — cez deň, v noci aj cez sviatok.','b8e/b8ef9ed7cc8cc399917baa5dacff5164/EsKM1ye65bo_2x_1x_11zon_2x.webp','']
  ];`;

const RENDER = `  document.getElementById('sluzby').innerHTML = SERVICES.map(function(s){
    var img = '<img src="'+P+s[2]+'" alt="'+s[0]+' — vodár Bratislava" loading="lazy" width="400" height="152">';
    var tx = '<div class="tx"><h3>'+s[0]+'</h3><p>'+s[1]+'</p></div>';
    // Cards that have a landing page become internal links; the rest stay plain.
    return s[3]
      ? '<a class="svc" href="../'+s[3]+'/">'+img+tx+'</a>'
      : '<article class="svc">'+img+tx+'</article>';
  }).join('');`;

const PARTS = `  var PARTS = [['Staré Mesto','staremesto'],['Ružinov','ruzinov'],['Petržalka','petrzalka'],
    ['Nové Mesto','novemesto'],['Karlova Ves','karlovaves'],['Dúbravka','dubravka'],['Rača','raca'],
    ['Vrakuňa','vrakuna'],['Podunajské Biskupice','podunajskebiskupice'],['Devín','devin'],
    ['Devínska Nová Ves','devinskanovaves'],['Lamač','lamac'],['Záhorská Bystrica','zahorskabystrica'],
    ['Vajnory','vajnory'],['Jarovce','jarovce'],['Rusovce','rusovce'],['Čunovo','cunovo']];
  document.getElementById('casti').innerHTML = PARTS.map(function(p){
    return '<a class="chip" href="../'+p[1]+'/">Vodár '+p[0]+'</a>';
  }).join('');`;

const swaps = [
  [/ {2}var SERVICES = \[[\s\S]*?\n {2}\];/, SERVICES],
  [/ {2}document\.getElementById\('sluzby'\)\.innerHTML[\s\S]*?\}\)\.join\(''\);/, RENDER],
  [/ {2}var PARTS = \[[\s\S]*?\}\)\.join\(''\);/, PARTS],
];

let done = 0;
for (const [re, replacement] of swaps) {
  if (!re.test(html)) {
    console.error('NIE DOPASOWANO: ' + re.source.slice(0, 50));
    process.exit(1);
  }
  html = html.replace(re, replacement);
  done++;
}

fs.writeFileSync(FILE, html);
console.log('podmienionych blokow: ' + done + '/' + swaps.length);
