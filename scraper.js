
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();

    const url = 'https://www.amazon.com/s?i=specialty-aps&bbn=16225007011&rh=n%3A16225007011%2Cn%3A1292115011&ref=nav_em__nav_desktop_sa_intl_monitors_0_2_6_8';
  await page.goto(url);

  await page.setViewport({width: 1080, height: 1024});

  const products = await page.evaluate(() => {
    const productElement = document.querySelectorAll('.s-result-item');
    const productList = [];
    for (const productElement of productElements ) {
        const title = productElement.querySelector('.a-size-base-plus').innerText;
        const price = productElement.querySelector('.a-price').innerText;
        const link = productElement.querySelector('.a').href;
        const image = productElement.querySelector('.a-dynamic-image').src;

      productList.push({ title, price, image, link});  
    }
    return productList;
  });

  await browser.close();
  console.log(products)
})();

