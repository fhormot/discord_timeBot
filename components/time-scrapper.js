const puppeteer = require('puppeteer'); 

let browser;

const getURL = (city) => {
    return `https://time.is/${city}`;
}

const main = async () => {
    // Open new page in headless browser 
    browser = await puppeteer.launch({
        headless: true,
        args: [
            "--incognito",
            "--no-sandbox",
            "--single-process",
            "--no-zygote"
        ]
    });
}

const getTime = async (city) => {
    const page = await browser.newPage()
    
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en'
    });  

    // Visit a page in browser 
    await page.goto(getURL(city)); 

    const result = await page.evaluate(() => {
        return {
            time:  document.getElementById('clock0_bg').innerText,
            details: [...document.querySelectorAll("section > ul > li")].map(el => el.innerText)
        }
    }); 

    page.close();

    // console.log(result);

    const retVal = (result) 
        ? { err: false, response: result } 
        : { err: true, response: {} };

    return retVal;
}

module.exports = {
    launcher: main,
    getTime: getTime
}