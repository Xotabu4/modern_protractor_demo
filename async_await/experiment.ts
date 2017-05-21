import { browser, $, ElementFinder } from 'protractor'

describe('async/await', () => {

    beforeEach(async () => {
        await browser.get('')
    })

    it('you can use async/await syntax, and it can be downgraded to be compatible with ES5 or ES3', async () => {
        let text = await $('body').getText()
        console.log(text) // text is not a promise here, it is ordinary String.
        await expect(text).toBeDefined('body text should not be undefined')
    })

    it('Example of trycatch', async () => {
        try {
            await $('non existing element').getText()
        } catch (error) {
            console.log('##################')
            console.log(error)
            console.log('##################')
        } finally {
            console.log('Finally block executed!')
        }
    })

    xit('OLD WAY of try/catch', async () => {
        $('non existing element').getText().then(undefined, (error) => {
            console.log('##################')
            console.log(error)
            console.log('##################')
        }).then(()=> {
            console.log('Finally block executed!')
        })
    })


})

