// Editorial pass: removes places where the "Typické problémy" block restated a
// sentence the intro had already made, and fixes one broken sentence.
import fs from 'node:fs';

const FILE = 'tools/content-districts-deep.mjs';
let t = fs.readFileSync(FILE, 'utf8');

const fixes = [
  // Staré Mesto — broken clause ("zvnútra korodovanie zúži") + it echoed the intro.
  ['V starých meštianskych domoch bývajú stúpačky aj rozvody v byte pôvodné. Materiál po desaťročiach zvnútra korodovanie zúži priemer, takže voda tečie slabšie a v kritických miestach sa objaví bodová netesnosť. Pri zásahu preto nikdy nezačíname silou — staré potrubie sa dá pokaziť rýchlejšie, než opraviť.',
   'Pozinkované potrubie zarastá zvnútra hrdzou a vodným kameňom. Priemer sa zužuje roky, takže tlak neklesne zo dňa na deň, ale postupne — a práve preto si to majiteľ dlho nevšimne. V najtenšom mieste potom vznikne bodová netesnosť. Spoznáte to podľa toho, že slabý prúd nespraví lepším ani nová batéria.'],

  // Staré Mesto — third card repeated the intro's sentence about what hides behind tiles.
  ['Byty v centre menili majiteľov aj dispozíciu. Za obkladom sa preto občas objaví riešenie, ktoré nezodpovedá žiadnemu súčasnému štandardu — napojenie navyše, zaslepená vetva alebo odpad s minimálnym spádom. Pri rekonštrukcii sa oplatí zavolať pred búraním, aby sa to zistilo skôr než po položení dlažby.',
   'Zaslepená vetva, na ktorú sa pri niektorej z predošlých prerábok zabudlo, je v starom byte bežný nález. Voda v nej stojí, zapácha a pri zmene tlaku sa vie ozvať netesnosťou. Podobne odpad s minimálnym spádom — funguje dovtedy, kým sa v ňom neusadí prvý nános. Odhaliť sa to dá len vtedy, keď je stena otvorená.'],

  // Petržalka — first card repeated the intro almost word for word.
  ['Toto je pri panelovej zástavbe najčastejšie obmedzenie. Rozhoduje o tom, či sa dá vaňa vymeniť za sprchový kút a aký typ vaničky je vôbec možný — nízka vanička si vyžaduje odpad v určitej výške a tá tam nemusí byť. Preto to overujem vopred, aby ste nekúpili kus, ktorý sa nedá osadiť.',
   'Nízka vanička potrebuje odpad v konkrétnej výške a v jadre nemusí byť. Riešenia sú dve: vanička s vyšším rámom, alebo úprava odpadu — a každé stojí inak. Rozdiel býva väčší, než koľko robí cena samotnej vaničky, takže sa oplatí zmerať to pred nákupom, nie po ňom.'],

  // Petržalka — second card overlapped the intro at 82 %.
  ['Ak sa u vás spomaľuje odtok, nemusí byť príčina vo vašom byte. Stúpačka je spoločná a nános v nej sa prejaví u viacerých susedov naraz. Pri obhliadke sa preto vždy pýtam, či sa spomaľuje jedno zariadenie alebo viac — podľa toho sa líši riešenie aj cena.',
   'Nános v stúpačke sa neusádza rovnomerne. Najskôr sa ozve byt najnižšie v stĺpci, potom postupne ďalšie. Ak susedia hlásia to isté, ide o spoločný rozvod a má zmysel to posunúť správcovi — inak zaplatíte za čistenie, ktoré príčinu neodstráni.'],

  // Nové Mesto — repeated the intro's paragraph on water pressure.
  ['Na Kolibe a v okolí Kramárov je tlak vody téma, ktorá sa v nížine nerieši. Ak vám voda tečie slabo, príčina nemusí byť v batérii — často ide o zanesený filter, zle nastavený redukčný ventil alebo o čerpadlo, ktoré už neťahá tak ako kedysi. Rozdiel sa dá zistiť meraním, nie odhadom.',
   'Rozdiel medzi lokálnym a celkovým poklesom tlaku zistíte za minútu aj sami: skúste dva rôzne kohútiky v rôznych miestnostiach. Ak tečie slabo všade, príčina je pri zdroji — filter, redukčný ventil alebo čerpadlo. Ak len na jednom mieste, ide o perlátor alebo o samotnú batériu. Ušetrí to zbytočnú výmenu.'],

  // Devín — repeated the intro's line about worn-out pumps.
  ['Ak čerpadlo spína krátko a často, príčina býva v tlakovej nádobe, ktorá stratila predtlak — nie v samotnom čerpadle. Rozdiel sa dá zmerať za pár minút. Ak sa to nerieši, čerpadlo sa opotrebuje podstatne rýchlejšie, než by muselo.',
   'Predtlak v tlakovej nádobe sa kontroluje manometrom a dopĺňa bežnou pumpou — je to práca na pár minút. Ak sa zanedbá, membrána vnútri praskne a nádoba sa zaleje vodou; vtedy už pomôže len výmena. Jedna kontrola ročne tomu spoľahlivo predíde.'],

  // Lamač — second card was the intro's sentence verbatim.
  ['Lamač je malý, ale zmiešaný. Preto sa vždy najprv pýtam na typ bývania — v byte ide o batérie, splachovanie a sifóny, v dome o rozvody, uzávery a väčšiu vykurovaciu sústavu. Od toho sa odvíja postup aj odhad ceny.',
   'V bytovom dome sa voda odstaví ventilom priamo v byte. V rodinnom dome býva uzáver v šachte alebo pri vodomere a nie každý majiteľ vie, kde presne. Znie to ako detail, ale rozhoduje o tom, či sa oprava dá začať hneď, alebo sa najprv hľadá, čím vodu vypnúť.'],

  // Jarovce — second card repeated the intro's advice on valves.
  ['Ventil, ktorým sa roky nehýbalo, sa v kritickej chvíli často nedá otočiť. Odporúčam ich výmenu vždy, keď sa v ich okolí aj tak robí zásah — je to najlacnejšia poistka vo vodoinštalácii.',
   'Guľový uzáver vydrží roky aj bez pohybu. Starší ventil s vretenom nie — vreteno zarastie vodným kameňom a pri prvom otočení sa buď zasekne, alebo odlomí. Preto pri výmene odporúčam guľové a preto sa to oplatí spraviť skôr, než ich budete potrebovať v zhone.'],

  // Last cross-district repeat: Devín and Záhorská Bystrica shared this line.
  ['Kohút v záhrade, ktorý sa nevypustí, po mraze praskne — často v časti skrytej v stene. Zazimovanie je krátky úkon, ktorý ušetrí jarné prekvapenie.',
   'Vonkajší výtok praskne najčastejšie v úseku, ktorý prechádza stenou — teda tam, kde to zvonku nevidno. Škoda sa ohlási až pri jarnom napustení, keď voda tečie do muriva. Vypustiť ho pred mrazmi je otázka minút.'],
];

let done = 0;
for (const [a, b] of fixes) {
  if (!t.includes(a)) {
    console.error('NIE ZNALEZIONO: ' + a.slice(0, 65));
    continue;
  }
  t = t.replace(a, b);
  done++;
}
fs.writeFileSync(FILE, t);
console.log('poprawionych fragmentow: ' + done + '/' + fixes.length);
