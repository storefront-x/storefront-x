/**
 * GraphQL PageBuilder endpoint returns shitload of HTML.
 * Because we have to transfer it over the network and parsing it is expensive,
 * we try to purge it as much as possible.
 *
 * Ideally this should be done on the Magento side. Oh well...
 *
 * BTW regex isn't that slow.
 * Purging moderatelly large PageBuilder output takes about 1ms. I timed it :)
 * Also it isn't run on client-side during initial visit so it's perfect for page speed.
 */
export default (content = ''): string =>
  content
    // Remove redundant data from the 'Products' block
    // BTW this one line reduces size of the initial HTML by more than 30%
    // (depending on how many products there in carousels)
    .replace(/<li class="product-item">.+?data-product-sku="(.+?)".+?<\/li>/gs, '<li data-product-sku="$1"></li>')
    // Remove JavaScript
    .replace(/<script.*?>.+?<\/script>/gs, '')
    // Remove redundant whitespace
    .replace(/[\n\r\s][\n\r\s]+/gs, ' ')
