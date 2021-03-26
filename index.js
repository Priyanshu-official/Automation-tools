const puppeteer = require('puppeteer');
const data=require("./config.json");
let postcount = process.argv[2];

(async function() {
  const browser = await puppeteer.launch({ headless: false });     //Launch Browser (Headless->default True)

  const page = await browser.newPage();        // Open new Tab

// Goto function will open new tab and go to that page
  await page.goto('https://www.instagram.com/',{ waitUntil:"networkidle2" }); 

// Now Enter details for Login
  await page.waitForSelector("input[name='username']");     //wait for selector help to loade page  
  await page.type("input[name='username']", data.user,{delay:100});
  await page.waitForSelector("input[name='password']");
  await page.type("input[name='password']", data.pass,{delay:100});
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle2" }),
    page.click("button[type='submit']"),
]);

// Search for Person you Want to Like
    await page.type("input[placeholder='Search']","its.nikhhil");
    await page.waitForSelector(".-qQT3 ._7UhW9", {visible:true});
    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.click(".-qQT3 ._7UhW9"),
    ]);

// Goto First post and Click it
    await page.waitForSelector("._9AhH0", {visible:true});
    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.click("._9AhH0", {delay:100}),
    ]);

let i = 0;
    do{
// Go to Post and Like it
   await page.waitForSelector(".fr66n .wpO6b", {visible:true});
   await page.click(".fr66n .wpO6b", {delay:100});

// go to Next post 
    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.click("._65Bje.coreSpriteRightPaginationArrow", {delay:200}),
    ]); 
    i++;
} while(i < postcount ){
}

// Close the Browser
await browser.close();
})();



