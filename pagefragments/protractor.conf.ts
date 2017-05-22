import {Config} from 'protractor'

let conf:Config = {
  directConnect: true,
  baseUrl: 'http://www.hiteshbalar.com/preserver/notes',
  specs: ['./example.js'],
  
  SELENIUM_PROMISE_MANAGER: false
}

exports.config = conf