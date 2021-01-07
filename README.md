# HTML-to-SVG
A node Js tool to convert given HTML element to SVG (vector image)

## Dependencies
1. Puppeteer ([https://www.npmjs.com/package/puppeteer](https://www.npmjs.com/package/puppeteer))
2. Node-poppler ([https://www.npmjs.com/package/node-poppler](https://www.npmjs.com/package/node-poppler))

### Puppeteer
Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/). Puppeteer runs [headless](https://developers.google.com/web/updates/2017/04/headless-chrome) by default, but can be configured to run full (non-headless) Chrome or Chromium. check out the above `npm` link to learn more.

### Node-poppler
Node-poppler converts PDF to image formats (such as `PNG`, `SVG`, and so on) and to `HTML` as well. It has necessary options to control the output, check out the above `npm` link to learn more.

## Code Overview
In my code setup, I have configured to use `table.html` as the input file in working directory with a single table in it. Please fork and test the code as your wish to try with other elements as well. 

Also added two `HTML` (*table1.html* & *table2.html*) sample tables and its respective `SVG` (*out1.svg* & *out2.svg*) output for your reference.

## How to Run
Pull the project to your local and run below
```
    npm init
```
It will install all the dependencies.

1. Open command prompt
2. Run `node index.js`
3. Output message will be 
```
    Total math count: 2
    { height: 322, width: 712 }
    out.svg - created
```	

`MathJax` is used to render Math equations in given HTML, the above output message shows there is 2 math Math equations in given HTML.

`{ height: 322, width: 712 }` is the output svg sizes

`out.svg - created` output svg file created in current working directory

## Sample output


