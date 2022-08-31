<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow-md sm:rounded-lg">
          <table class="min-w-full">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Název
                </th>
                <th
                  scope="col"
                  class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Kategorie
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Product 1 -->
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Apple MacBook Pro 17"
                </td>
                <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">Laptop</td>
              </tr>
              <!-- Product 2 -->
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Apple Imac 27"
                </td>
                <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">Stolní PC</td>
              </tr>
              <!-- Product 2 -->
              <tr class="bg-white dark:bg-gray-800">
                <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Apple Magic Mouse 2
                </td>
                <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">Příslušenství</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
