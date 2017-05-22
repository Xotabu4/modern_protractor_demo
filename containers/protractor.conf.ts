import { Config, ExpectedConditions, $ } from 'protractor'

let conf: Config = {
  seleniumAddress: "http://localhost:4444/wd/hub",
  baseUrl: 'http://www.protractortest.org/testapp/ng1/#/form',
  specs: ['./specs/**.js'],

  capabilities: {
    browserName: "chrome",
    shardTestFiles: true,
    maxInstances: 4
  },

  SELENIUM_PROMISE_MANAGER: false
};

exports.config = conf;