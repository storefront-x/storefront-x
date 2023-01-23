<template>
  <div class="bg-green-565 border-t border-green-570 hidden lg:block">
    <Container>
      <div class="flex justify-between">
        <nav
          role="navigation"
          aria-label="Hlavní menu"
          itemscope="itemscope"
          itemtype="http://schema.org/SiteNavigationElement"
        >
          <meta itemprop="name" content="Hlavní menu" />
          <ul role="menubar" class="flex items-center list-none menubar m-0 p-0">
            <li role="none">
              <a href="/" role="menuitem" tabindex="0" class="active">E-shop</a>
            </li>
            <li role="none">
              <a role="menuitem" tabindex="0" href="https://www.drmaxlekynapredpis.cz">E-recept</a>
            </li>
            <li role="none">
              <a href="/lekarny" role="menuitem" tabindex="0">Lékárny</a>
            </li>
            <li role="none">
              <a href="/kartavyhod" role="menuitem" tabindex="0">Karta výhod</a>
            </li>
            <li role="none">
              <a href="/poradna" role="menuitem" tabindex="0">Poradna</a>
            </li>
            <li role="none">
              <a role="menuitem" tabindex="0" href="https://kariera.drmax.cz/volne-pozice">Kariéra</a>
            </li>
            <li role="none">
              <a href="/b2b" role="menuitem" tabindex="0">Pro firmy</a>
            </li>
            <li role="none">
              <a href="/o-dr-max" role="menuitem" tabindex="0">O nás</a>
            </li>
          </ul>
        </nav>
        <div class="flex items-center">
          <div class="block mr-[20px]">
            <a
              href="#"
              class="text-blue-560 text-[14px] font-medium transition-colors duration-200 hover:text-red-555 hover:underline"
              >Stav objednávky</a
            >
          </div>
          <ul aria-label="Kontakty" role="menu" class="list-none m-0 p-0">
            <li role="presentation" class="">
              <a
                href="tel:+420 516 770 100"
                role="menuitem"
                class="text-[14px] transition-colors duration-200 hover:text-red-555"
              >
                +420 516 770 100
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
</script>

<style scoped>
.menubar li {
  @apply flex flex-col;
}

.menubar a {
  @apply text-blue-560 bg-transparent p-[12px] block font-semibold text-[14px] min-h-[1px] transition-colors duration-200 hover:bg-green-575;
}

.menubar a.active {
  @apply bg-blue-565 text-white rounded-[3px];
}
</style>
