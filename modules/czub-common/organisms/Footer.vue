<template>
  <footer class="bg-primary-550 border-yellow-550 border-t-8 py-12">
    <Container>
      <div class="block lg:grid grid-cols-12 gap-0">
        <div class="block lg:grid lg:grid-cols-12 lg:col-span-8 gap-4 pt-7">
          <div class="col-span-12 lg:col-span-4">
            <h4>O objednávce</h4>
            <ul>
              <li><a href="https://eshop.czub.cz/cz/zasilkovna.html/">Zásilkovna</a></li>
              <li>
                <a
                  href="https://www.postaonline.cz/trackandtrace?utm_source=HP_CP-modra_ikona&amp;utm_medium=sledovani-zasilek"
                  >Sledování objednávky</a
                >
              </li>
              <li><a href="https://www.czub.cz/podpora-servis-opravy/">Záruka a servis</a></li>
              <li>
                <a href="https://eshop.czub.cz/cz/doprava-a-platba.html/">Doprava a platba</a>
              </li>
            </ul>
            <a
              href="https://www.comgate.cz/cz/platebni-brana"
              class="inline-block hover:border-secondary-500 hover:border-2 border-2 border-primary-550"
            >
              <img src="/images/comgate.png" alt="Platební brána ComGate" />
            </a>
          </div>
          <div class="col-span-12 lg:col-span-4 mt-8 lg:mt-0">
            <h4>Jsme tu pro vás</h4>
            <ul>
              <li><a href="https://www.czub.cz/podpora-navody/">Návody ke stažení</a></li>
              <li><a href="https://eshop.czub.cz/cz/obchodni-podminky.html/">Obchodní podmínky</a></li>
              <li><a href="https://eshop.czub.cz/cz/odstoupeni-od-smlouvy.html/">Odstoupení od smlouvy</a></li>
              <li><a href="https://eshop.czub.cz/cz/gdpr.html/">Cookies a GDPR</a></li>
              <li><a href="https://eshop.czub.cz/cz/kontakty.html/">Kontaktujte nás</a></li>
              <li><a href="https://eshop.czub.cz/cz/nadlimitni-zasobniky.html/">Nákup nadlimitních zásobníků</a></li>
            </ul>
          </div>
          <div class="col-span-12 lg:col-span-4">
            <h4>O firmě</h4>
            <ul>
              <li><a href="https://www.czub.cz/o-firme/">O nás</a></li>
              <li><a href="https://www.czub.cz/dealer-lokator/">Dealer Lokátor</a></li>
              <li><a href="https://www.czub.cz/o-firme-podnikova-prodejna-praha/">Prodejny</a></li>
              <li><a href="https://www.czconfigurator.com/cz/">Konfigurátor</a></li>
            </ul>
          </div>
        </div>
        <div class="lg:col-span-4 col-start-9"><Newsletter /></div>
      </div>
    </Container>
  </footer>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import Newsletter from '#ioc/molecules/Newsletter'
</script>

<i18n lang="yaml">
cs-CZ:
  Useful information: Užitečné informace
  Brands: Značky
  Blog: Blog
  About us: O nás
  Contact: Kontakt
  Customer service: Zákaznický servis
  Shipping and payment: Doprava a platba
  Return policy: Vrácení zboží
  Terms of service: Obchodní podmínky
  Privacy policy: Ochrana osobních údajů
  Cookies policy: Zásady souborů cookie
  Sign up: Registrovat
  Sign in: Přihlásit se
  Settings: Nastavení
  My orders: Moje objednávky
  Account: Účet
  /terms-of-service: /obchodni-podminky
  /about-company: /o-spolecnosti
  /return-policy: /vraceni-zbozi
  /contact-us: /kontakt
  /shipping-and-payment: /doprava-a-platba
  /privacy-policy: /ochrana-osobnich-udaju
  /cookies-policy: /zasady-souboru-cookies
</i18n>
