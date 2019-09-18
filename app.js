const carlo = require('carlo');
const vm = require('vm');
const os = require("os");
const path = require("path");

(async () => {
  // Launch the browser.
  const app = await carlo.launch({
    channel: ["canary", "stable", "chromium"],
    title: "puppet-player",
    icon: path.join(__dirname, "/icon.png"),
    localDataDir: path.join(os.homedir(), ".puppet-player")
  });

  // Terminate Node.js process on app window closing.
  app.on('exit', () => process.exit());

  // Tell carlo where your web files are located.
  app.serveFolder(__dirname);

  // Expose 'runInNewContext' function in the web environment.
  await app.exposeFunction('runInNewContext', code => {
    const runCode = `
        (async () => {
          try{
            const page = await browser.newPage();
            ${code}
            app.evaluate((info) => log(info), '<span class="done">done</span>')
          } catch (e){
            app.evaluate((info) => log(info), '<span>' + (e.message || e) + '</span>')
          }
        })();
      `;
    const sandbox = {
      browser: app.browserForTest(),
      app
    }
    vm.runInNewContext(runCode, sandbox, {
      timeout: 30 * 1000,
    });
  });

  // Navigate to the main page of your app.
  await app.load('main.html');
})();
