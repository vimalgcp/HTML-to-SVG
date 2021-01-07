const puppeteer = require('puppeteer');
const { Poppler } = require('node-poppler');
const fs = require('fs');
const pdfFile = 'out.pdf';
const poppler = new Poppler();
const options = {
    firstPageToConvert: 1,
    lastPageToConvert: 1,
    svgFile: true
};


(async () => {
	let tableHTML = await fs.readFileSync(`${__dirname}/table.html`, 'utf8');
	const browser = await puppeteer.launch();
	try {
		// Set up browser and page.
		const page = await browser.newPage();	
		await page.setContent(tableHTML);
		await page.waitForSelector('table');
		
		const mathCount = await page.$$eval('math', mathItem => mathItem.length);
		await console.log(`Total math count: ${mathCount}`);

		if(mathCount > 0){
			// Set up MathJax
			await page.addScriptTag({
				type: 'text/javascript', 
				content: `const mjReady = new Promise((ok, fail) => {
					  window.MathJax = {
						chtml: {
						  mtextInheritFont: true
						},
						startup: {
						  pageReady() {
							MathJax.startup.defaultPageReady().then(ok).catch(fail);
						  }
						}
					  }
					});`
			});
			await page.addScriptTag({url: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/mml-svg.js'});
		}else{
			console.log('No math found in HTML, skipping mathjax process !');
		}
		// getting table size
		const size = await page.evaluate(() => {
			const tab =  document.getElementsByTagName('table')[0];
			return {
				height: tab.offsetHeight,
				width: tab.offsetWidth
			}
		});
		console.log(size);
		
		// creating output as pdf temporarily to convert PDF to SVG 
		await page.pdf({
			path: './out.pdf',
			printBackground: true,
			width: parseInt(size.width) + '19px',
			height: parseInt(size.height) + '19px'
		});
		
		await browser.close();
		
		// creating SVG from PDF
		await poppler.pdfToCairo(options, pdfFile, './out.svg').then((res) => {
			console.log('out.svg - created');
		});
	}
	catch(err){
		console.log(err);
		await browser.close();
	}
	finally 
	{
		await browser.close();
	}
})();
