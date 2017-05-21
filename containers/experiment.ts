import { browser, $, ElementFinder } from 'protractor'

describe('Containers', () => {
    it('This test executed in firefox, chrome, opera', async () => {
        let caps = await browser.getCapabilities()
        console.log(caps.get('browserName'))

        expect(await $('body').isDisplayed()).toBeTruthy()
        expect(await $('div').isDisplayed()).toBeTruthy()
    })
})

