<template>
  <footer class="bg-gray-50 border-t-4 border-gray-560">
    <Container>
      <div class="flex items-center">
        <div class="grid grid-cols-4 gap-0 mt-8 w-[66.66%]">
          <div class="footer-section">
            <h3>O Dr.Max</h3>
            <ul>
              <li>
                <a href="/o-dr-max/o-spolecnosti">O společnosti</a>
              </li>
              <li>
                <a href="/o-dr-max/vize-dr-max">Vize Dr. Max</a>
              </li>
              <li>
                <a href="https://kariera.drmax.cz/volne-pozice">Kariéra a volná místa</a>
              </li>
              <li>
                <a href="/o-dr-max/pomahame">Pomáháme</a>
              </li>
              <li>
                <a href="/o-dr-max/kontakt">Kontakt</a>
              </li>
              <li>
                <a href="/tiskove-centrum">Tiskové centrum</a>
              </li>
              <li>
                <a href="/tiskove-centrum/magazin-maximum">Magazín MAXIMUM</a>
              </li>
            </ul>
          </div>
          <div class="footer-section pl-[22px]">
            <h3>Obecné</h3>
            <ul>
              <li>
                <a href="http://www.sukl.cz/nahlasit-nezadouci-ucinek">Hlášení nežádoucích účinků</a>
              </li>
              <li>
                <a href="/pravidla-soutezi">Soutěže</a>
              </li>
              <li>
                <a href="/obecne/ochrana-osobnich-udaju">Ochrana osobních údajů</a>
              </li>
              <li>
                <a href="/obecne/pouzivani-cookies">Používání cookies</a>
              </li>
              <li>
                <a href="/o-dr-max/darkove-poukazky">Dárkové poukázky</a>
              </li>
              <li>
                <a href="/znacky">Zboží dle značek</a>
              </li>
              <li>
                <a href="/drmax-a-ekologie">Dr.Max a ekologie</a>
              </li>
            </ul>
          </div>
          <div class="footer-section pl-[22px]">
            <ul>
              <h3>Online nákup</h3>
              <li>
                <a href="/vse-o-nakupu/vseobecne-obchodni-podminky"> Všeobecné obchodní podmínky </a>
              </li>
              <li>
                <a href="https://objednavky.drmax.cz/"> Stav objednávky </a>
              </li>
              <li>
                <a href="/obecne/doprava-a-platba"> Doprava a platba </a>
              </li>
              <li>
                <a href="/lekarny"> Výdejní místa </a>
              </li>
              <li>
                <a href="/vse-o-nakupu/rezervacni-podminky"> Rezervační podmínky </a>
              </li>
              <li>
                <a href="/vse-o-nakupu/odstoupeni-od-smlouvy"> Poučení o odstoupení od smlouvy </a>
              </li>
              <li>
                <a href="/reklamace/reklamacni-rad"> Reklamační řád </a>
              </li>
            </ul>
          </div>
          <div class="footer-section pl-[22px]">
            <h3>Karta výhod</h3>
            <ul>
              <li>
                <a href="/kartavyhod/nabidky-a-kupony">Nabídky a kupóny</a>
              </li>
              <li>
                <a href="/kartavyhod">Co je Karta výhod</a>
              </li>
              <li>
                <a href="/kartavyhod/registrace">Jak se zaregistrovat?</a>
              </li>
              <li>
                <a href="/kartavyhod/vyhody-programu">Jak čerpat výhody?</a>
              </li>
              <li>
                <a href="/vseobecna-pravidla-klientskeho-programu-drmax">Pravidla Klientského programu</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex items-center">
          <img class="w-auto h-[196px]" :src="trustLogo" alt="Logo" />
          <img class="w-auto h-[84px]" :src="sellerLogo" alt="Logo" />
        </div>
      </div>
      <div class="flex flex-wrap w-full flex-row mb-5">
        <div class="w-[16.66666%]">
          <h5 class="font-normal text-[14px]">Mobilní aplikace</h5>
          <ul class="list-none m-0 p-0">
            <li>
              <a href="https://www.drmax.cz/tiskove-centrum/magazin-maximum">
                <img class="w-auto" :src="mobileAppLogo" alt="Logo" />
              </a>
            </li>
          </ul>
        </div>
        <div class="w-[16.66666%]">
          <h5 class="font-normal text-[14px]">Kontaktujte nás</h5>
          <ul class="list-none p-0 m-0 flex">
            <li class="grayscale hover:grayscale-0 transition-opacity duration-200">
              <a href="https://www.facebook.com/lekarnadrmax/" rel="noopener" target="_blank" class="block mr-[12px]"
                ><img class="w-[40px] h-[40px]" :src="facebookLogo" alt="Logo"
              /></a>
            </li>
            <li class="grayscale hover:grayscale-0 transition-opacity duration-200">
              <a href="https://www.instagram.com/drmaxlekarna/" rel="noopener" target="_blank" class="block mr-[12px]"
                ><img class="w-[40px] h-[40px]" :src="instagramLogo" alt="Logo"
              /></a>
            </li>
            <li class="grayscale hover:grayscale-0 transition-opacity duration-200">
              <a
                href="https://www.youtube.com/channel/UCAZYwgUCCShV9YtO1b7MJvw"
                rel="noopener"
                target="_blank"
                class="block mr-[12px]"
                ><img class="w-[40px] h-[40px]" :src="youtubeLogo" alt="Logo"
              /></a>
            </li>
          </ul>
        </div>
        <div>
          <h5 class="font-normal text-[14px]">Seznam portálů</h5>
          <ul class="list-none p-0 m-0 flex items-center">
            <li>
              <a
                href="https://www.drmax.cz/"
                title="https://www.drmax.cz/"
                rel="noopener"
                target="_blank"
                class="block mr-[12px] mt-[6px] grayscale hover:grayscale-0 transition-opacity duration-200"
              >
                <img class="w-[38px] h-[29px]" :src="czLogo" alt="Logo"
              /></a>
            </li>
            <li>
              <a
                href="https://www.drmax.it/"
                title="https://www.drmax.it/"
                rel="noopener"
                target="_blank"
                class="block mr-[12px] mt-[6px] grayscale hover:grayscale-0 transition-opacity duration-200"
                ><img class="w-[38px] h-[29px]" :src="itLogo" alt="Logo"
              /></a>
            </li>
            <li>
              <a
                href="https://www.drmax.pl/"
                title="https://www.drmax.pl/"
                rel="noopener"
                target="_blank"
                class="block mr-[12px] mt-[6px] grayscale hover:grayscale-0 transition-opacity duration-200"
                ><img class="w-[38px] h-[29px]" :src="plLogo" alt="Logo"
              /></a>
            </li>
            <li>
              <a
                href="https://www.drmax.ro/"
                title="https://www.drmax.ro/"
                rel="noopener"
                target="_blank"
                class="block mr-[12px] mt-[6px] grayscale hover:grayscale-0 transition-opacity duration-200"
                ><img class="w-[38px] h-[29px]" :src="roLogo" alt="Logo"
              /></a>
            </li>
            <li>
              <a
                href="https://www.drmax.sk/"
                title="https://www.drmax.sk/"
                rel="noopener"
                target="_blank"
                class="block mr-[12px] mt-[6px] grayscale hover:grayscale-0 transition-opacity duration-200"
                ><img class="w-[38px] h-[29px]" :src="skLogo" alt="Logo"
              /></a>
            </li>
          </ul>
        </div>
        <div class="flex items-center w-[40.66666%] xl:w-[44.66666%] justify-end">
          <img class="w-auto h-[22px] mt-8" :src="paymentsLogo" alt="Logo" />
        </div>
      </div>
    </Container>
    <div class="border-gray-560 border-t pb-10">
      <Container>
        <div class="flex items-center py-2 justify-between">
          <div class="flex items-center">
            <p class="text-[12px]">&copy; 2023 Lékárna Dr. Max. Všechna práva vyhrazena</p>
          </div>
          <div class="flex items-center">
            <nav
              aria-label="Rychlé odkazy"
              itemscope="itemscope"
              itemtype="http://schema.org/SiteNavigationElement"
              role="navigation"
              class="m-0 p-0"
            >
              <meta content="Rychlé odkazy" itemprop="name" />
              <ul role="menubar" class="flex flex-wrap justify-center items-center list-none m-0 p-0">
                <li role="none" class="py-[4px] px-[5px]">
                  <a
                    href="/o-dr-max/kontakt"
                    role="menuitem"
                    tabindex="0"
                    class="text-[12px] text-blue-560 font-semibold transition-colors duration-200 hover:text-red-555 hover:underline"
                    >Kontakt</a
                  >
                </li>
                <li role="none" class="py-[4px] px-[5px]">
                  <a
                    href="/lekarny/"
                    role="menuitem"
                    tabindex="0"
                    class="text-[12px] text-blue-560 font-semibold transition-colors duration-200 hover:text-red-555 hover:underline"
                    >Lékárny a prodejny</a
                  >
                </li>
                <li role="none" class="py-[4px] px-[5px]">
                  <a
                    role="menuitem"
                    tabindex="0"
                    href="https://kariera.drmax.cz/volne-pozice"
                    class="text-[12px] text-blue-560 font-semibold transition-colors duration-200 hover:text-red-555 hover:underline"
                  >
                    Kariéra a volná místa
                  </a>
                </li>
                <li role="none" class="py-[4px] px-[5px]">
                  <a
                    href="/obecne/doprava-a-platba"
                    role="menuitem"
                    tabindex="0"
                    class="text-[12px] text-blue-560 font-semibold transition-colors duration-200 hover:text-red-555 hover:underline"
                    >Doprava a platba</a
                  >
                </li>
                <li role="none" class="py-[4px] px-[5px]">
                  <a
                    href="/kartavyhod"
                    role="menuitem"
                    tabindex="0"
                    class="text-[12px] text-blue-560 font-semibold transition-colors duration-200 hover:text-red-555 hover:underline"
                  >
                    Karta výhod
                  </a>
                </li>
                <li role="none" class="py-[4px] px-[5px]">
                  <a
                    href="/o-dr-max"
                    role="menuitem"
                    tabindex="0"
                    class="text-[12px] text-blue-560 font-semibold transition-colors duration-200 hover:text-red-555 hover:underline"
                  >
                    O nás
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="flex items-center">
            <ul class="list-none m-0 p-0 flex">
              <li>
                <a
                  href="tel:+420 516 770 100"
                  content="+420 516 770 100"
                  itemprop="telephone"
                  class="text-[12px] text-blue-560 font-light p-[12px] transition-colors duration-200 hover:text-red-555"
                  >+420 516 770 100</a
                >
              </li>
              <li>
                <a
                  href="mailto:info@drmax.cz"
                  content="info@drmax.cz"
                  itemprop="email"
                  class="text-[12px] text-blue-560 font-light p-[12px] transition-colors duration-200 hover:text-red-555"
                  >info@drmax.cz</a
                >
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import trustLogo from '#ioc/assets/images/footer/nejduveryhodnejsi-znacka'
import sellerLogo from '#ioc/assets/images/footer/seller-of-the-year'
import mobileAppLogo from '#ioc/assets/images/footer/drmax-media-app'
import facebookLogo from '#ioc/assets/images/footer/facebook'
import instagramLogo from '#ioc/assets/images/footer/instagram'
import youtubeLogo from '#ioc/assets/images/footer/youtube'
import czLogo from '#ioc/assets/images/footer/CZ'
import skLogo from '#ioc/assets/images/footer/SK'
import roLogo from '#ioc/assets/images/footer/RO'
import itLogo from '#ioc/assets/images/footer/IT'
import plLogo from '#ioc/assets/images/footer/PL'
import paymentsLogo from '#ioc/assets/images/footer/payments'
</script>

<style scoped>
.footer-section {
  @apply mb-[24px];
}
.footer-section h3 {
  @apply text-[18px] mb-[15px];
}
.footer-section ul {
  @apply list-none m-0 p-0;
}

.footer-section ul li {
  @apply p-0 m-0;
}

.footer-section ul a {
  @apply block text-[12px] font-semibold text-blue-560 transition-colors duration-200 hover:text-red-555 hover:underline leading-[14px] mb-[9px];
}
</style>
