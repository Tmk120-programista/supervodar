# supervodarba.sk — statyczna kopia (GitHub Pages)

Statyczny mirror strony `https://supervodarba.sk/` (Bitrix24 Landing), przygotowany
pod hosting na GitHub Pages przed wygaśnięciem abonamentu Bitrix (01.09.2026).

## Co jest w środku

```
docs/                     <- to publikujemy
  index.html              <- strona główna
  <32 podstrony>/index.html
  bitrix/                 <- CSS/JS/obrazki z oryginalnej domeny (ta sama struktura ścieżek)
  cdn-assets/             <- to, co leciało z zewnętrznych CDN-ów Bitrixa
    cdn.bitrix24.pl/      <- zdjęcia (webp)
    cdn.bitrix24.site/
    fonts.bitrix24.pl/    <- Open Sans + Poppins (woff2), lokalnie
  CNAME                   <- supervodarba.sk
  .nojekyll               <- wyłącza Jekyll (inaczej GH Pages zjada część katalogów)
tools/
  mirror.mjs              <- crawler, który zbudował kopię
  patch-form.mjs          <- podmienia formularz Bitrixa na statyczny, usuwa call tracker
  check.mjs               <- weryfikator: sprawdza, czy każde odwołanie ma plik
  serve.mjs               <- lokalny podgląd
```

Wszystkie odwołania są **względne**, więc działa tak samo na `supervodarba.sk`
jak i na `uzytkownik.github.io/repo/`.

## Podgląd lokalny

```bash
node tools/serve.mjs docs 8080
# http://localhost:8080/
```

## Ponowne pobranie / odświeżenie kopii

Dopóki oryginał żyje, można kopię przebudować:

```bash
rm -rf docs && node tools/mirror.mjs docs
node tools/patch-form.mjs docs   # znów podmienia formularz i usuwa tracker
node tools/check.mjs docs        # powinno pokazać: brakujacych celow: 0
echo supervodarba.sk > docs/CNAME
```

Uwaga: `mirror.mjs` nadpisuje `docs/`, więc `patch-form.mjs` i `CNAME` trzeba
wtedy powtórzyć. `patch-form.mjs` jest idempotentny — ponowne uruchomienie
na już załatanej kopii niczego nie zepsuje.

## Wdrożenie na GitHub Pages

```bash
git init
git add .
git commit -m "Statyczna kopia supervodarba.sk"
git branch -M main
git remote add origin git@github.com:UZYTKOWNIK/supervodarba.git
git push -u origin main
```

Potem w repo: **Settings → Pages → Source: Deploy from a branch → `main` / `/docs`**.

W DNS domeny `supervodarba.sk` ustawić rekordy A na GitHub Pages:
`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
(oraz `www` jako CNAME na `UZYTKOWNIK.github.io`). Po propagacji włączyć
**Enforce HTTPS**.

## Formularz kontaktowy

Oryginalny formularz to był widget Bitrix24 CRM, który w runtime łączył się
z portalem `fachowca.bitrix24.pl` — po wygaśnięciu abonamentu przestałby działać.
Został zastąpiony statycznym formularzem o **tych samych polach i tekstach**,
odczytanych z definicji oryginału (`loader_23.js`):

| Pole | Etykieta |
|---|---|
| Meno | tekst |
| Telefon | tel, wypełnione `+421` |
| E-mail | email |
| Opíš svoj problém | textarea |

Nagłówek „Vyplňte formulár", podtytuł „Náš špecialista vám zavolá späť do 15 minút",
przycisk „Objednaj majstra" — jak w oryginale. Kolory (biały przycisk, niebieskie
pola `#6ab8ee`) też pochodzą z konfiguracji Bitrixa.

### Jak wysyła

Wysyłka idzie przez **FormSubmit** na `supervodarba@gmail.com`:

```
https://formsubmit.co/ajax/supervodarba@gmail.com
```

> **Krok wymagany raz:** przy pierwszym wysłanym zgłoszeniu FormSubmit przyśle na
> `supervodarba@gmail.com` mail aktywacyjny. Trzeba w nim kliknąć link — dopiero
> potem zgłoszenia zaczną przychodzić. Warto to zrobić od razu po wdrożeniu,
> testowym wysłaniem formularza.

Jeśli wysyłka się nie powiedzie, formularz otwiera klienta pocztowego
z uzupełnioną treścią (`mailto:`), żeby zgłoszenie nie przepadło.

Adres i endpoint siedzą w dwóch stałych na górze skryptu `sv-form-script`
(w każdym `index.html`) oraz w `tools/patch-form.mjs` — zmiana dostawcy
(Formspree, Netlify Forms) to podmiana jednego URL-a i ponowne uruchomienie patcha.

Jedna różnica względem oryginału: Bitrix nie wymagał żadnego pola, więc dało się
wysłać pusty formularz. Tutaj trzeba podać **telefon albo e-mail** — bez tego nie
ma jak oddzwonić.

## Co jeszcze zniknęło

- **Call tracker Bitrixa** (`crm/tag/call.tracker.js`) — usunięty ze wszystkich stron.
- **Panel edycji Bitrixa** — treść edytuje się teraz w HTML w tym repo.

Działa nadal bez zmian: telefony (`tel:`), e-mail (`mailto:`), link do wizytówki
Google (`g.page`), Google Analytics (G-B3545B8VYT) i Facebook Pixel (907912187649184).

## Drobna poprawka względem oryginału

Na każdej podstronie oryginał miał jeden zepsuty link telefoniczny —
`href="+421 940 790 083"` bez schematu `tel:`. W kopii jest naprawiony na
`href="tel:+421940790083"`. Poza tym treść jest 1:1.
