import { Config, ExpectedConditions, $ } from 'protractor'

let conf: Config = {
  seleniumAddress: "http://localhost:4444/wd/hub",
  baseUrl: 'http://www.protractortest.org/testapp/ng1/#/form',
  specs: ['./experiment.js'],


  multiCapabilities: [
    {browserName: "chrome"},
    {browserName: "opera"},
    {browserName: "firefox"}
  ],
  SELENIUM_PROMISE_MANAGER: false
};

exports.config = conf;