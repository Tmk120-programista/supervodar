// Depth for the borough pages: the problems that actually recur in each type of
// housing, plus extra questions. These pages carry the highest commercial intent
// ("vodár Petržalka"), so they need substance, not a templated paragraph.

// slug -> { problems: [[nadpis, text]], faqMore: [[otazka, odpoved]] }
export const DEEP = {
  staremesto: {
    problems: [
      ['Rozvody, ktoré nikto nemenil od pôvodnej stavby', 'V starých meštianskych domoch bývajú stúpačky aj rozvody v byte pôvodné. Materiál po desaťročiach zvnútra korodovanie zúži priemer, takže voda tečie slabšie a v kritických miestach sa objaví bodová netesnosť. Pri zásahu preto nikdy nezačíname silou — staré potrubie sa dá pokaziť rýchlejšie, než opraviť.'],
      ['Uzávery, ktoré sa nedajú otočiť', 'Najčastejší problém, na ktorý v centre narazíme, nie je samotná porucha, ale to, že sa voda nedá odstaviť. Ventily, ktorými roky nikto nehýbal, sú zablokované vodným kameňom. Preto sa vždy vopred pýtam, kde máte hlavný uzáver a či ním ide otočiť — od toho závisí, či ide o hodinovú prácu alebo o dohodu so správcom.'],
      ['Kúpeľne prerobené na viackrát', 'Byty v centre menili majiteľov aj dispozíciu. Za obkladom sa preto občas objaví riešenie, ktoré nezodpovedá žiadnemu súčasnému štandardu — napojenie navyše, zaslepená vetva alebo odpad s minimálnym spádom. Pri rekonštrukcii sa oplatí zavolať pred búraním, aby sa to zistilo skôr než po položení dlažby.'],
    ],
    faqMore: [
      ['Bývam v dome so správcom. Kto rieši odstavenie stúpačky?', 'Ak zásah vyžaduje odstavenie stúpačky, dohodneme to so správcom alebo domovníkom vopred a naplánujeme prácu tak, aby bola voda vypnutá čo najkratšie. Bežné opravy v byte to nevyžadujú.'],
      ['Dá sa v starom byte vymeniť len časť rozvodov?', 'Áno, a často je to rozumné riešenie. Vymení sa úsek, ktorý je v najhoršom stave alebo ktorý je pri rekonštrukcii aj tak odkrytý. Poviem vám, či to má zmysel, alebo len odsúva problém o pár rokov.'],
      ['Robíte prácu aj v bytoch v pamiatkovej zóne?', 'Áno. Vodoinštalatérske práce vnútri bytu sa robia bežne. Ak by zásah zasahoval do konštrukcie alebo fasády, upozorním vás, že to treba riešiť aj inak než s vodárom.'],
    ],
  },
  ruzinov: {
    problems: [
      ['Bojlery na konci životnosti', 'V staršej ružinovskej zástavbe dnes dosluhujú zásobníkové ohrievače inštalované ešte pri pôvodnom vybavení bytov. Príznak býva jednoznačný: teplá voda dochádza rýchlejšie než kedysi alebo sa pod bojlerom objaví vlhko. Ak presakuje samotná nádoba, oprava už nemá zmysel a jediné riešenie je výmena.'],
      ['Dokončovanie po developerovi', 'V novších projektoch je najčastejšou požiadavkou to, čo zostalo nedorobené po odovzdaní: zapojenie umývačky, montáž batérie, doplnenie rohového ventilu, ktorý v byte chýba. Sú to krátke práce, ale robené narýchlo sa vypomstia — hlavne pri spotrebičoch pod trvalým tlakom vody.'],
      ['Odpady s dlhou prevádzkou', 'Kuchynský odpad sa upcháva zvnútra tukom a v byte, kde sa varí roky, je zúženie priemeru otázkou času. Rozdiel medzi chemickým prípravkom a strojovým prečistením spoznáte podľa toho, ako dlho to vydrží — chémia prepáli otvor uprostred nánosu, špirála zoškrabe usadeninu po celom obvode.'],
    ],
    faqMore: [
      ['Kúpil som byt v novostavbe. Čo býva potrebné dorobiť?', 'Najčastejšie zapojenie spotrebičov, montáž batérií a doplnenie uzatváracích ventilov. Vieme to spraviť naraz pri jednej návšteve, aby ste nás nevolali trikrát.'],
      ['Ako spoznám, že bojler treba vymeniť a nie opraviť?', 'Ak voda netečie z pripojenia, ale odspodu telesa, presakuje samotná nádoba a oprava sa nevyplatí. Keď je chybné len vykurovacie teleso alebo termostat, oprava je výrazne lacnejšia.'],
      ['Odveziete starý spotrebič alebo bojler?', 'Áno, starý kus odpojíme, zložíme a odvezieme. Nemusíte riešiť jeho likvidáciu ani to, ako ho dostanete z bytu.'],
    ],
  },
  petrzalka: {
    problems: [
      ['Výška odpadu v bytovom jadre', 'Toto je pri panelovej zástavbe najčastejšie obmedzenie. Rozhoduje o tom, či sa dá vaňa vymeniť za sprchový kút a aký typ vaničky je vôbec možný — nízka vanička si vyžaduje odpad v určitej výške a tá tam nemusí byť. Preto to overujem vopred, aby ste nekúpili kus, ktorý sa nedá osadiť.'],
      ['Spoločná stúpačka pre celý stĺpec bytov', 'Ak sa u vás spomaľuje odtok, nemusí byť príčina vo vašom byte. Stúpačka je spoločná a nános v nej sa prejaví u viacerých susedov naraz. Pri obhliadke sa preto vždy pýtam, či sa spomaľuje jedno zariadenie alebo viac — podľa toho sa líši riešenie aj cena.'],
      ['Podomietkové nádržky bez viditeľnej poruchy', 'Pri splachovačoch zabudovaných do steny je nevýhodou, že netesnosť nevidíte. Voda tichým prúdom uniká do misy a majiteľ to zistí až z vyúčtovania. Dobrá správa je, že sa k mechanizmu dá takmer vždy dostať cez revízny otvor pod tlačidlom — bez búrania obkladu.'],
    ],
    faqMore: [
      ['Ako zistím, či je upchatie u mňa alebo v stúpačke?', 'Jednoduchý test: ak odteká pomaly len jedno zariadenie a ostatné normálne, príčina je vo vašom sifóne. Keď sa spomaľuje viac výleviek naraz, problém je hlbšie a treba strojové čistenie.'],
      ['Máme malú kúpeľňu. Zmestí sa sprchový kút?', 'Vo väčšine prípadov áno, ale rozhoduje výška odpadu a rozmer jadra. Poviem vám, aké typy vaničiek prichádzajú do úvahy, ešte pred nákupom.'],
      ['Ako dlho trvá výmena vane za sprchový kút?', 'Nejde o prácu na jednu hodinu — treba demontovať vaňu, upraviť odpad, osadiť vaničku do roviny a zasilikónovať. Presný rozsah aj čas dohodneme podľa stavu jadra.'],
    ],
  },
  novemesto: {
    problems: [
      ['Slabý a kolísavý tlak vo vyšších polohách', 'Na Kolibe a v okolí Kramárov je tlak vody téma, ktorá sa v nížine nerieši. Ak vám voda tečie slabo, príčina nemusí byť v batérii — často ide o zanesený filter, zle nastavený redukčný ventil alebo o čerpadlo, ktoré už neťahá tak ako kedysi. Rozdiel sa dá zistiť meraním, nie odhadom.'],
      ['Väčšie vykurovacie sústavy rodinných domov', 'Dom má oproti bytu podstatne rozsiahlejšiu sústavu a nerovnomerné hrejúce radiátory sú tu bežnejšie. Samotné odvzdušnenie často nestačí — treba sústavu aj vyvážiť, inak najbližší radiátor od kotla berie teplo na úkor tých vzdialenejších.'],
      ['Byty v starších domoch pod svahom', 'V nižšie položených uliciach ide o klasickú bytovú prácu: výmeny batérií, opravy splachovania, sifóny a odpady. Pri starších bytoch odporúčam vymeniť rohové ventily rovno pri zásahu — po rokoch sa často nedajú uzavrieť a pri budúcej poruche to znamená odstavenie celého bytu.'],
    ],
    faqMore: [
      ['Voda tečie slabo len na jednom kohútiku. Čo to znamená?', 'Ak je slabý prúd len na jednom mieste, býva zanesený perlátor alebo filter v batérii — to je krátka oprava. Keď je slabý tlak v celom dome, príčina je inde a treba ju hľadať pri zdroji.'],
      ['Radiátory hrejú nerovnomerne. Stačí odvzdušniť?', 'Odvzdušnenie pomôže, ak je v sústave vzduch. Pri väčších domoch však býva príčinou nevyvážená sústava — vtedy treba nastaviť prietok, inak sa problém vráti.'],
      ['Riešite aj čerpadlá pri rodinných domoch?', 'Áno. Montáž, opravu aj servis čerpadiel a tlakových nádob robíme bežne, vrátane poradenstva pri výbere výkonu.'],
    ],
  },
  karlovaves: {
    problems: [
      ['Prerábky kúpeľní na Dlhých dieloch', 'V novšej zástavbe je najčastejšou zákazkou prerábka kúpeľne — výmena vane za sprchový kút, nová sanita, posun batérie. Kritickým bodom je osadenie vaničky do roviny a spojité silikónovanie po celom obvode. Nepresnosť pár milimetrov znamená vodu na podlahe, ktorú objavíte až podľa vlhkej steny.'],
      ['Vlasy a usadeniny v kúpeľňových odpadoch', 'V bytoch je najčastejšou príčinou upchatia sifón alebo mriežka sprchovej vpuste. Často stačí sifón rozobrať a vyčistiť — a poviem to rovno, aby ste neplatili za strojové čistenie tam, kde netreba. Rozdiel spoznáme podľa toho, či sa spomaľuje jedno zariadenie alebo viac naraz.'],
      ['Domy na svahu a tlak vody', 'Pri rodinných domoch vo vyšších polohách platí to isté ako inde na kopci: slabý prúd nemusí byť chybou batérie. Skôr ide o filter, redukčný ventil alebo čerpadlo. Meranie tlaku odpovie na otázku rýchlejšie než výmena zariadenia naslepo.'],
    ],
    faqMore: [
      ['Kedy stačí vyčistiť sifón a kedy treba krtkovať?', 'Ak sa upcháva len jedno zariadenie, príčina býva v sifóne a stačí ho rozobrať. Keď sa spomaľuje viac výleviek naraz, ide o hlbšie usadeniny a treba strojové čistenie.'],
      ['Prerábame kúpeľňu. Kedy vás máme volať?', 'Ideálne pred búraním. Vtedy sa dá naplánovať, kadiaľ povedú rozvody a čo treba vymeniť. Dodatočné zmeny po položení obkladu sú vždy drahšie.'],
      ['Robíte aj silikónovanie po montáži?', 'Áno, je to súčasť práce pri sprchových kútoch a vaniach. Starú škáru vždy kompletne odstránime — nový silikón nanesený na starý nedrží.'],
    ],
  },
  dubravka: {
    problems: [
      ['Kvapkajúce batérie a opotrebované kartuše', 'Najčastejšia dúbravská zákazka. Pri pákových batériách je vinníkom kartuša — vymeniteľná vložka, ktorá po rokoch prestane tesniť. Ak je telo batérie v poriadku, výmena samotnej kartuše je podstatne lacnejšia než nová batéria. Pri lacnejších modeloch sa však kartuša nedá kúpiť samostatne a rozumnejšia je výmena celého kusa.'],
      ['Tuk v kuchynskom odpade', 'Kuchynský odpad sa neupchá zo dňa na deň. Tuk z riadu tuhne na stenách potrubia a roky zužuje priemer, až kým neprejde voda. Chemický prípravok prepáli otvor uprostred nánosu a problém sa o pár týždňov vráti — strojové čistenie zoškrabe usadeninu po celom obvode.'],
      ['Sifóny, ktoré presakujú do skrinky', 'Plastové prevlečné matice po rokoch strácajú pružnosť a tesnenie tvrdne. Voda potom nekvapká viditeľne, ale steká po stene sifónu do skrinky pod drezom. Objavíte to až podľa napučaného dna — a vtedy už býva na výmenu aj skrinka, nie len sifón.'],
    ],
    faqMore: [
      ['Koľko vody premrhá kvapkajúca batéria?', 'Kvapka za sekundu je vyše tisíc litrov za rok. Preto sa výmena kartuše zvyčajne zaplatí sama skôr, než by ste čakali.'],
      ['Môžem si batériu kúpiť sám?', 'Môžete, a ak chcete, poradím s výberom vopred. Mnohí zákazníci však ocenia, že batériu kúpime my — pošlem fotky s cenami, vyberiete si a privezieme ju už na montáž.'],
      ['Ako často treba čistiť sifón?', 'Neexistuje pevný interval, ale ak voda odteká pomalšie než kedysi, je to signál. Pri výmene sifónu vždy prekontrolujeme aj potrubie za ním.'],
    ],
  },
  raca: {
    problems: [
      ['Vonkajšie výtoky a mrazy', 'Kohút v záhrade, ktorý sa na zimu nevypustí, po prvom silnejšom mraze praskne — a nie vždy navonok. Voda sa potom objaví v stene alebo v zemi až pri jarnom napustení. Zazimovanie je krátka práca, ktorá sa jednoznačne oplatí.'],
      ['Rozvody vedené v zemi', 'Pri rodinných domoch býva časť rozvodov mimo dohľad. Netesnosť sa tam neprejaví mokrou stenou, ale poklesom tlaku alebo čerpadlom, ktoré spína aj vtedy, keď nikto neodoberá vodu. Práve tieto príznaky pomáhajú zúžiť úsek, kde treba hľadať.'],
      ['Vykurovacie sústavy s viacerými okruhmi', 'V dome býva sústava rozsiahlejšia a citlivejšia na vyváženie. Ak jedna miestnosť hreje výborne a druhá vôbec, samotné odvzdušnenie problém nevyrieši — treba nastaviť prietok tak, aby sa teplo rozdelilo rovnomerne.'],
    ],
    faqMore: [
      ['Kedy zazimovať vonkajší kohút?', 'Pred prvými mrazmi. Prívod treba uzavrieť zvnútra a vonkajšiu časť vypustiť — inak zamrznutá voda roztrhne potrubie aj v stene.'],
      ['Čerpadlo spína, aj keď neodoberáme vodu. Prečo?', 'Buď je niekde netesnosť, alebo tlaková nádoba stratila predtlak. Oboje sa dá zmerať a opraviť — a oplatí sa to, lebo časté spínanie čerpadlo rýchlo opotrebuje.'],
      ['Robíte rozvody aj pri prístavbe alebo rekonštrukcii?', 'Áno. Pri väčších zásahoch sa oplatí zavolať vo fáze plánovania, aby sa rozvody dali viesť rozumne a nie okľukou.'],
    ],
  },
  vrakuna: {
    problems: [
      ['Odpady v bytových domoch', 'Aj tu platí, že spoločná stúpačka rozhoduje. Ak odteká pomaly viac zariadení naraz, príčina nie je vo vašom sifóne. Pri obhliadke sa vždy pýtam na rozsah príznakov, pretože od toho závisí, či ide o krátku opravu alebo o strojové prečistenie.'],
      ['Spotrebiče bez uzatváracieho ventilu', 'Práčka alebo umývačka bez vlastného rohového ventilu je riziko, o ktorom sa nevie, kým nepraskne hadica. Bez ventilu sa spotrebič nedá odstaviť inak než uzavretím vody v celom byte. Ak chýba, dopĺňame ho rovno pri zapojení.'],
      ['Rodinné domy a staršie rozvody', 'V zástavbe rodinných domov ide skôr o uzávery, rozvody a kúrenie. Ventily, ktorými sa roky nehýbalo, odporúčam vymeniť skôr, než ich budete naozaj potrebovať — v kritickej chvíli sa často nedajú otočiť.'],
    ],
    faqMore: [
      ['Prívodná hadica k práčke je stará. Treba ju meniť?', 'Áno, odporúčam to. Hadica pod trvalým tlakom časom tvrdne a praská — jej výmena je zlomkom ceny škody, ktorú dokáže spôsobiť.'],
      ['Zapojíte spotrebič aj do vstavanej kuchynskej linky?', 'Áno, vrátane vedenia hadíc tak, aby sa po zasunutí spotrebiča nezalomili. Po zapojení pustíme skúšobný cyklus.'],
      ['Vymeníte bojler aj s odvozom starého?', 'Áno. Starý vypustíme, odpojíme, zložíme a odvezieme. Pri novom skontrolujeme aj poistný ventil.'],
    ],
  },
  podunajskebiskupice: {
    problems: [
      ['Uzávery v starších rodinných domoch', 'Najčastejšia prekážka pri oprave nie je samotná porucha, ale to, že sa voda nedá odstaviť. Ventil zablokovaný vodným kameňom sa buď neotočí, alebo sa pri sile odlomí. Preto ich výmenu odporúčam vždy, keď sa v ich okolí aj tak robí zásah.'],
      ['Podomietkové splachovače a dostupnosť dielov', 'Pri starších podomietkových systémoch býva hlavnou otázkou, či sa k nim ešte dajú zohnať diely. Pre nás to nie je prekážka — dohľadáme ich aj k modelom, ktoré sa už roky nevyrábajú. K mechanizmu sa pritom takmer vždy dostaneme cez revízny otvor, bez búrania obkladu.'],
      ['Odpady s dlhou prevádzkou', 'V domoch aj bytoch, kde sa varí desaťročia, je zúženie kuchynského odpadu prirodzené. Strojové prečistenie obnoví pôvodný priemer — rozdiel oproti chémii spoznáte podľa toho, ako dlho to vydrží.'],
    ],
    faqMore: [
      ['Musí sa pri oprave podomietkového WC búrať stena?', 'Vo veľkej väčšine prípadov nie. Revízny otvor pod tlačidlom je navrhnutý presne na výmenu vnútorných dielov.'],
      ['Ako spoznám, že netesní vypúšťací ventil?', 'Do misy tečie tenký pramienok vody aj vtedy, keď ste nesplachovali. Pri podomietkovej nádržke to nevidíte zvonku, ale prejaví sa to na spotrebe.'],
      ['Vymeníte uzávery v celom dome naraz?', 'Áno, a často sa to oplatí. Jedna návšteva namiesto viacerých a istota, že sa v prípade poruchy dá voda odstaviť.'],
    ],
  },
  devin: {
    problems: [
      ['Domáce vodárne a časté spínanie', 'Ak čerpadlo spína krátko a často, príčina býva v tlakovej nádobe, ktorá stratila predtlak — nie v samotnom čerpadle. Rozdiel sa dá zmerať za pár minút. Ak sa to nerieši, čerpadlo sa opotrebuje podstatne rýchlejšie, než by muselo.'],
      ['Netesnosti v rozvodoch vedených v zemi', 'V rodinnom dome je časť rozvodov mimo dohľad a porucha sa neohlási mokrou stenou. Príznakom býva pokles tlaku, čerpadlo bežiace bez odberu alebo vlhkosť v netypickom mieste. Podľa nich sa dá zúžiť úsek, kde má zmysel hľadať.'],
      ['Vonkajšie výtoky pred zimou', 'Kohút v záhrade, ktorý sa nevypustí, po mraze praskne — často v časti skrytej v stene. Zazimovanie je krátky úkon, ktorý ušetrí jarné prekvapenie.'],
    ],
    faqMore: [
      ['Ako často treba kontrolovať domácu vodáreň?', 'Pravidelná kontrola predtlaku v tlakovej nádobe sa oplatí raz ročne. Zachytí opotrebenie skôr, než sa z neho stane porucha.'],
      ['Poradíte s výberom čerpadla?', 'Áno. Potrebný výkon a výtlačnú výšku prepočítame podľa toho, odkiaľ a kam sa má voda dostať — poddimenzované aj zbytočne silné čerpadlo robia problémy.'],
      ['Riešite aj filtráciu vody zo studne?', 'Zameriavame sa na vodoinštaláciu a čerpaciu techniku. Ak ide o rozbor a úpravu kvality vody, poviem vám to rovno, aby ste nestrácali čas.'],
    ],
  },
  devinskanovaves: {
    problems: [
      ['Prerábky kúpeľní v bytoch', 'Pri panelovej zástavbe rozhoduje výška odpadu, aký typ sprchovej vaničky je možný. Overujem to vopred, aby ste nekúpili kus, ktorý sa nedá osadiť. Rovnako dôležité je osadenie do roviny — nepresnosť sa prejaví vodou na podlahe.'],
      ['Opakované zavzdušňovanie kúrenia', 'Ak sa radiátory zavzdušňujú stále dokola, samotné odvzdušnenie je len dočasná úľava. Sústava buď niekde nasáva vzduch, alebo stráca tlak — a bez nájdenia príčiny sa problém o pár týždňov vráti.'],
      ['Staršia zástavba pôvodnej obce', 'V rodinných domoch pribúdajú rozvody, uzávery a vonkajšie výtoky. Ventily, ktorými sa roky nehýbalo, odporúčam vymeniť preventívne — je to lacná poistka do chvíle, keď bude treba rýchlo odstaviť vodu.'],
    ],
    faqMore: [
      ['Dá sa u nás v byte urobiť sprchový kút namiesto vane?', 'Vo väčšine prípadov áno. Rozhoduje výška odpadu v jadre — overím to vopred a poviem, aké vaničky prichádzajú do úvahy.'],
      ['Prečo sa nám kúrenie stále zavzdušňuje?', 'Znamená to, že sústava nasáva vzduch alebo stráca tlak. Treba nájsť netesnosť, inak sa odvzdušňovanie bude opakovať donekonečna.'],
      ['Chodíte aj do pôvodnej časti obce?', 'Áno, obsluhujeme celú mestskú časť vrátane zástavby rodinných domov.'],
    ],
  },
  lamac: {
    problems: [
      ['Zatuhnuté termostatické hlavice', 'Typický príznak: hlavicu otáčate, ale radiátor zostane trvalo studený alebo naopak trvalo horúci. Chyba býva v kolíku ventilu, ktorý sa po lete zablokoval. Často sa dá uvoľniť bez výmeny — a je to rozdiel medzi krátkou opravou a novým ventilom.'],
      ['Bytové aj domové zákazky v jednej štvrti', 'Lamač je malý, ale zmiešaný. Preto sa vždy najprv pýtam na typ bývania — v byte ide o batérie, splachovanie a sifóny, v dome o rozvody, uzávery a väčšiu vykurovaciu sústavu. Od toho sa odvíja postup aj odhad ceny.'],
      ['Silikón, ktorý prestal tesniť', 'Škára pri vani zostarne nerovnomerne: najskôr sčernie, potom sa v rohu odtrhne od podkladu a voda vsakuje pod vaňu. Zvonku pritom môže vyzerať ešte prijateľne. Nový silikón nanesený na starý nedrží — starú škáru treba odstrániť kompletne.'],
    ],
    faqMore: [
      ['Radiátor je stále studený aj pri otvorenej hlavici. Čo s tým?', 'Býva to zatuhnutý kolík termostatického ventilu. Skúsime ho uvoľniť; ak to nepomôže, vymeníme ventil.'],
      ['Dá sa nový silikón naniesť na starý?', 'Nie. Nový materiál nemá na čom držať a pleseň pod ním rastie ďalej. Starú škáru vždy odstránime a podklad pripravíme.'],
      ['Kedy vás volať pri rekonštrukcii kúpeľne?', 'Pred búraním. Vtedy sa dá naplánovať trasa rozvodov aj to, čo sa vymení — neskoršie zmeny sú vždy drahšie.'],
    ],
  },
  zahorskabystrica: {
    problems: [
      ['Dokončovanie novostavieb', 'Po hrubej stavbe zostáva množstvo drobností, ktoré rozhodnú o tom, či bude dom bez problémov: osadenie sanity, montáž batérií, zapojenie spotrebičov a doplnenie uzáverov tam, kde chýbajú. Práve chýbajúci rohový ventil je vec, ktorá sa prejaví až pri prvej poruche.'],
      ['Rozvody v zemi a hľadanie netesností', 'Pri rodinných domoch býva časť rozvodov mimo dohľad. Netesnosť sa ohlási poklesom tlaku alebo čerpadlom bežiacim bez odberu, nie mokrou stenou. Postupuje sa preto od príznakov, aby sa nekopalo naslepo.'],
      ['Vykurovanie väčších domov', 'Rozsiahlejšia sústava býva citlivejšia na vyváženie. Ak jedna miestnosť hreje výborne a druhá vôbec, treba nastaviť prietok — samotné odvzdušnenie to nerieši.'],
    ],
    faqMore: [
      ['Čo všetko treba dorobiť po hrubej stavbe?', 'Najčastejšie osadenie sanity, montáž batérií, zapojenie spotrebičov a doplnenie uzatváracích ventilov. Vieme to spraviť naraz.'],
      ['Ako nájdete netesnosť v potrubí v zemi?', 'Postupujeme od príznakov — pokles tlaku, čerpadlo bez odberu, vlhkosť v netypickom mieste. Tým sa zúži úsek, kde má zmysel hľadať.'],
      ['Robíte aj vonkajšie rozvody a výtoky?', 'Áno, vrátane ich zazimovania pred mrazmi.'],
    ],
  },
  vajnory: {
    problems: [
      ['Záhradné výtoky a zimné prasknutia', 'Nezazimovaný vonkajší kohút je jedna z najčastejších zimných porúch v rodinných domoch. Zamrznutá voda roztrhne potrubie a škoda sa často objaví až pri jarnom napustení — vtedy už býva mokrá aj stena.'],
      ['Čerpadlá a kolísavý tlak', 'Pri domoch s vlastným zdrojom vody je najčastejšou témou tlak, ktorý kolíše, a čerpadlo, ktoré spína príliš často. Vinníkom býva tlaková nádoba so strateným predtlakom — a je to lacnejšia oprava než výmena čerpadla, ku ktorej by inak čoskoro došlo.'],
      ['Nerovnomerne hrejúca sústava', 'Vo väčšom dome sa rozdiel medzi miestnosťami prejaví viac než v byte. Odvzdušnenie je prvý krok, vyváženie prietoku ten druhý — bez neho berie najbližší radiátor teplo na úkor vzdialenejších.'],
    ],
    faqMore: [
      ['Ako zazimovať vonkajší kohút?', 'Uzavrieť prívod zvnútra a vonkajšiu časť vypustiť. Ak si nie ste istí, kde je uzáver, ukážem vám to pri návšteve.'],
      ['Oplatí sa vymeniť staré obehové čerpadlo?', 'Ak je hlučné alebo sa po lete nerozbehlo, výmena za modernejšie s nižšou spotrebou sa spravidla vráti na účtoch za elektrinu.'],
      ['Robíte údržbu pred vykurovacou sezónou?', 'Áno. Kontrola tlaku, odvzdušnenie a preverenie hlavíc pred sezónou je lacnejšie než riešiť studený radiátor v mraze.'],
    ],
  },
  jarovce: {
    problems: [
      ['Hľadanie poruchy v rozsiahlejšej inštalácii', 'V dome je vodoinštalácia dlhšia než v byte a porucha sa nemusí ohlásiť viditeľne. Príznakom býva pokles tlaku alebo čerpadlo, ktoré beží aj bez odberu. Práve preto sa pýtam na detaily — zúži to okruh hľadania a šetrí to čas aj peniaze.'],
      ['Uzávery, ktoré treba vymeniť preventívne', 'Ventil, ktorým sa roky nehýbalo, sa v kritickej chvíli často nedá otočiť. Odporúčam ich výmenu vždy, keď sa v ich okolí aj tak robí zásah — je to najlacnejšia poistka vo vodoinštalácii.'],
      ['Bežné opravy aj v okrajovej časti', 'Batérie, WC, sifóny a prečistenie odpadov robíme tu úplne rovnako ako v centre. Dojazd je zadarmo bez ohľadu na vzdialenosť, takže sa neoplatí odkladať drobnú opravu, kým z nej nebude väčšia.'],
    ],
    faqMore: [
      ['Naozaj neplatíme za dojazd do okrajovej časti?', 'Naozaj. Dojazd k zákazníkovi v Bratislave je zadarmo bez ohľadu na mestskú časť.'],
      ['Riešite septiky a žumpy?', 'Zameriavame sa na vodoinštaláciu a kanalizáciu v dome vrátane prečistenia odpadov. Vývoz žumpy je špecializovaná služba — poviem vám to rovno.'],
      ['Prídete aj na drobnú opravu?', 'Áno. Malá oprava spravená načas býva lacnejšia než čakanie, kým sa z nej stane väčší problém.'],
    ],
  },
  rusovce: {
    problems: [
      ['Splachovače, ku ktorým sa nezháňajú diely', 'Pri starších podomietkových systémoch je hlavnou otázkou dostupnosť náhradných dielov. Máme s tým skúsenosť — diel sa nám podarilo zohnať aj k modelu, ktorý sa už dlhšie nevyrába, ako spomína jedno z hodnotení práve z tejto mestskej časti.'],
      ['Vlastný zdroj vody a tlaková nádoba', 'Pri domoch so studňou alebo domácou vodárňou býva najčastejšou príčinou kolísavého tlaku stratený predtlak v tlakovej nádobe. Meranie odpovie rýchlejšie než výmena čerpadla naslepo — a je podstatne lacnejšie.'],
      ['Rozvody a uzávery v starších domoch', 'Časť rozvodov býva vedená v zemi alebo v konštrukcii, takže netesnosť sa prejaví skôr poklesom tlaku než vodou na povrchu. Uzávery odporúčam vymeniť preventívne, kým ešte idú otočiť.'],
    ],
    faqMore: [
      ['Zoženiete diel k splachovaču, ktorý sa už nevyrába?', 'Vo väčšine prípadov áno. Ak treba diel doobjednať, poviem to vopred a dohodneme druhý termín.'],
      ['Máme kolísavý tlak zo studne. Čím to je?', 'Najčastejšie tlakovou nádobou, ktorá stratila predtlak, alebo netesnosťou na saní. Oboje sa dá zmerať a opraviť.'],
      ['Chodíte sem aj na menšie opravy?', 'Áno, a dojazd je zadarmo. Nie je dôvod odkladať výmenu sifónu, kým z nej nebude mokrá skrinka.'],
    ],
  },
  cunovo: {
    problems: [
      ['Tlak zo studne a predtlak v nádobe', 'Pri vlastnom zdroji vody je kolísavý tlak najčastejšou sťažnosťou. Vinníkom býva tlaková nádoba, ktorá stratila predtlak — čerpadlo potom spína krátko a často a rýchlo sa opotrebuje. Meranie trvá pár minút a ušetrí zbytočnú výmenu.'],
      ['Vykurovanie väčších domov', 'V rodinnom dome sa nevyvážená sústava prejaví výraznejšie než v byte. Odvzdušnenie je prvý krok; ak rozdiely medzi miestnosťami pretrvávajú, treba nastaviť prietok.'],
      ['Bežné opravy bez príplatku za vzdialenosť', 'Aj v najvzdialenejšej mestskej časti robíme rovnaké práce ako v centre — batérie, WC, sifóny, odpady. Dojazd je zadarmo, takže sa neoplatí odkladať drobnosť, kým nenarastie.'],
    ],
    faqMore: [
      ['Prídete naozaj až do Čunova?', 'Áno. Obsluhujeme všetkých sedemnásť mestských častí Bratislavy a dojazd je vždy zadarmo.'],
      ['Ako zistíte, či je problém v čerpadle alebo v nádobe?', 'Meraním tlaku a sledovaním intervalov spínania. Podľa toho sa dá rozlíšiť stratený predtlak od opotrebovaného čerpadla.'],
      ['Robíte aj údržbu pred zimou?', 'Áno — zazimovanie vonkajších výtokov a kontrolu kúrenia pred sezónou.'],
    ],
  },
};
