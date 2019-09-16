# Puppet Player

Puppet player is a tiny app based on [Carlo](https://github.com/GoogleChromeLabs/carlo). 

It can use for replay puppeteer automated testing scripts such as record by [puppeteer-recorder](https://github.com/checkly/puppeteer-recorder)

## Usage

build app

```
npm i && npm run build
```

Copy recorder scripts and paste to editor, then click 'run'.

Tips: since player has auto inject `const page = await browser.newPage();` before input code, you only need input the main code begin with `await page.goto('url')`