// Replaces the Bitrix24 CRM webform with a static form that e-mails the owner,
// and strips the Bitrix call tracker. Idempotent: safe to re-run after a re-mirror.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.argv[2] || 'docs');
const MAIL = 'supervodarba@gmail.com';

// Field labels / captions come from the original Bitrix form definition
// (loader_23.js), so the replacement reads identically to what was live.
const FORM_HTML = `<div class="sv-form">
	<div class="sv-form__head">
		<div class="sv-form__title">Vyplňte formulár</div>
		<div class="sv-form__desc">Náš špecialista vám zavolá späť do 15 minút</div>
	</div>
	<form class="sv-form__form" novalidate>
		<label class="sv-form__field">
			<span class="sv-form__label">Meno</span>
			<input class="sv-form__input" type="text" name="Meno" autocomplete="name">
		</label>
		<label class="sv-form__field">
			<span class="sv-form__label">Telefon</span>
			<input class="sv-form__input" type="tel" name="Telefon" value="+421" autocomplete="tel">
		</label>
		<label class="sv-form__field">
			<span class="sv-form__label">E-mail</span>
			<input class="sv-form__input" type="email" name="E-mail" autocomplete="email">
		</label>
		<label class="sv-form__field">
			<span class="sv-form__label">Opíš svoj problém</span>
			<textarea class="sv-form__input sv-form__textarea" name="Problém" rows="4"></textarea>
		</label>
		<button class="sv-form__button" type="submit">Objednaj majstra</button>
		<div class="sv-form__note" role="status" aria-live="polite"></div>
	</form>
</div>`;

const FORM_CSS = `<style id="sv-form-style">
.sv-form{width:100%;color:#fff;text-align:left}
.sv-form__head{text-align:center;margin-bottom:20px}
.sv-form__title{font-size:20px;font-weight:700;line-height:1.3}
.sv-form__desc{font-size:14px;opacity:.85;margin-top:6px;line-height:1.4}
.sv-form__field{display:block;margin-bottom:14px}
.sv-form__label{display:block;font-size:13px;font-weight:600;margin-bottom:5px}
.sv-form__input{display:block;width:100%;box-sizing:border-box;padding:12px 14px;font:inherit;font-size:15px;
	color:#fff;background:#6ab8ee;border:1px solid transparent;border-radius:3px;outline:none;
	transition:background .2s ease,border-color .2s ease}
.sv-form__input::placeholder{color:rgba(255,255,255,.7)}
.sv-form__input:focus{background:#4aa3e0;border-color:rgba(255,255,255,.6)}
.sv-form__input.sv-form__input--error{border-color:#ffd0d0;background:#e08a8a}
.sv-form__textarea{resize:vertical;min-height:96px}
.sv-form__button{display:block;width:100%;padding:14px 18px;margin-top:18px;font:inherit;font-size:15px;
	font-weight:700;text-transform:uppercase;letter-spacing:.02em;color:#333;background:#fff;
	border:0;border-radius:3px;cursor:pointer;transition:opacity .2s ease}
.sv-form__button:hover{opacity:.88}
.sv-form__button[disabled]{opacity:.6;cursor:default}
.sv-form__note{min-height:20px;margin-top:12px;font-size:14px;line-height:1.4}
.sv-form__note--ok{color:#dff5e1}
.sv-form__note--err{color:#ffdede}
</style>`;

const FORM_JS = `<script id="sv-form-script">
(function () {
	// Static-hosting form delivery. FormSubmit relays the message to the address
	// below; the very first submission triggers a one-time confirmation e-mail
	// that has to be clicked once. Swap ENDPOINT for another provider if needed.
	var MAIL = '${MAIL}';
	var ENDPOINT = 'https://formsubmit.co/ajax/' + MAIL;

	function mailtoFallback(data) {
		var body = Object.keys(data).map(function (k) { return k + ': ' + data[k]; }).join('\\n');
		window.location.href = 'mailto:' + MAIL
			+ '?subject=' + encodeURIComponent('Objednávka majstra — supervodarba.sk')
			+ '&body=' + encodeURIComponent(body);
	}

	function init(form) {
		var note = form.querySelector('.sv-form__note');
		var button = form.querySelector('.sv-form__button');

		form.addEventListener('submit', function (e) {
			e.preventDefault();

			var data = {};
			var inputs = form.querySelectorAll('.sv-form__input');
			for (var i = 0; i < inputs.length; i++) {
				inputs[i].classList.remove('sv-form__input--error');
				data[inputs[i].name] = inputs[i].value.trim();
			}

			// The original form marked nothing as required, but a submission with
			// no way to reply back is useless — insist on a phone or an e-mail.
			var phone = form.querySelector('[name="Telefon"]');
			var email = form.querySelector('[name="E-mail"]');
			var hasPhone = phone.value.replace(/[^0-9]/g, '').length >= 6;
			var hasEmail = /.+@.+\\..+/.test(email.value);
			if (!hasPhone && !hasEmail) {
				phone.classList.add('sv-form__input--error');
				email.classList.add('sv-form__input--error');
				note.className = 'sv-form__note sv-form__note--err';
				note.textContent = 'Zadajte prosím telefón alebo e-mail, aby sme vás mohli kontaktovať.';
				return;
			}

			data._subject = 'Objednávka majstra — supervodarba.sk';
			data._captcha = 'false';
			data._template = 'table';

			button.disabled = true;
			note.className = 'sv-form__note';
			note.textContent = 'Odosielam…';

			fetch(ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify(data)
			})
				.then(function (res) {
					if (!res.ok) throw new Error('HTTP ' + res.status);
					return res.json();
				})
				.then(function () {
					form.reset();
					phone.value = '+421';
					note.className = 'sv-form__note sv-form__note--ok';
					note.textContent = 'Ďakujeme! Ozveme sa vám do 15 minút.';
				})
				.catch(function () {
					note.className = 'sv-form__note sv-form__note--err';
					note.textContent = 'Odoslanie zlyhalo — otvárame váš e-mailový klient.';
					mailtoFallback(data);
				})
				.then(function () {
					button.disabled = false;
				});
		});
	}

	var forms = document.querySelectorAll('.sv-form__form');
	for (var i = 0; i < forms.length; i++) init(forms[i]);
})();
</script>`;

const RE_FORM = /<div class="bitrix24forms[^>]*>\s*<div class="g-landing-alert">[^<]*<\/div>\s*<\/div>/i;
const RE_TRACKER = /\s*<script>\s*\(function\(w,d,u\)\{[\s\S]{0,600}?call\.tracker\.js'\);\s*<\/script>/i;
const RE_BROKEN_TEL = /href\s*=\s*(["'])(\+[\d\s]{6,})\1/gi;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.name === 'index.html') out.push(full);
  }
  return out;
}

const stats = { form: 0, tracker: 0, tel: 0, files: 0 };
const skipped = [];

for (const file of walk(ROOT)) {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  if (RE_FORM.test(html)) {
    html = html.replace(RE_FORM, '<div class="bitrix24forms">' + FORM_HTML + '</div>');
    stats.form++;
  } else if (!html.includes('sv-form__form')) {
    skipped.push(path.relative(ROOT, file));
  }

  if (RE_TRACKER.test(html)) {
    html = html.replace(RE_TRACKER, '');
    stats.tracker++;
  }

  const telFixed = html.replace(RE_BROKEN_TEL, (m, q, num) => 'href=' + q + 'tel:' + num.replace(/\s+/g, '') + q);
  if (telFixed !== html) stats.tel++;
  html = telFixed;

  // Inject styles + behaviour once, only on pages that actually carry the form.
  if (html.includes('sv-form__form')) {
    if (!html.includes('id="sv-form-style"')) html = html.replace(/<\/head>/i, FORM_CSS + '\n</head>');
    if (!html.includes('id="sv-form-script"')) html = html.replace(/<\/body>/i, FORM_JS + '\n</body>');
  }

  if (html !== before) {
    fs.writeFileSync(file, html);
    stats.files++;
  }
}

console.log('zmienionych plikow:      ' + stats.files);
console.log('podmienionych formularzy: ' + stats.form);
console.log('usunietych call trackerow: ' + stats.tracker);
console.log('naprawionych linkow tel:   ' + stats.tel);
if (skipped.length) console.log('BEZ formularza (' + skipped.length + '): ' + skipped.join(', '));
