import { browser, $, $$, ElementFinder } from 'protractor'

describe('async/await', () => {

    beforeEach(async () => {
        await browser.get('')
    })

    it('you can use async/await syntax, and it can be downgraded to be compatible with ES5 or ES3', async () => {
        let text = await $('body').getText()
        console.log(text.toUpperCase()) // text is not a promise here, it is ordinary String.
        await expect(text).toBeDefined('body text should not be undefined')
    })

    it('Example of trycatch', async () => {
        try {
            await $('non existing element').getText()
        } catch (error) {
            console.log('We got error, but we ignoring it:', error)
        } finally {
            console.log('Finally block executed!')
        }
    })

    it('1 Example of iterating thru element collection', async () => {
        const collection = await $$('#animals li')
        for(let elem of collection) {
            console.log('###1 Got element:', await elem.getText())
        }
    })

    it('2 Example of iterating thru element collection', async () => {
        const collection = $$('#animals li')
        await collection.each(async elem => 
                console.log('###2 Got element:', await elem.getText())
        )
    })

    it('3 Example of iterating thru element collection', async () => {
        await $$('#animals li').getText().forEach(text=> 
            console.log(`###3 Got element: ${text}`)
        )
    })

    it('OLD WAY of try/catch', async () => {
        $('non existing element').getText().then(undefined, (error) => {
            console.log('##################')
            console.log(error)
            console.log('##################')
        }).then(()=> {
            console.log('Finally block executed!')
        })
    })


    it('Simple test', async () => {
        await browser.get('')
        let bigdogText = await $('#animals #bigdog').getText()
        expect(bigdogText.toLowerCase()).toEqual('big dog')
    })

    it('Simple test with control flow', () => {
        browser.get('')
        let bigdogTextLowered = $('#animals #bigdog').getText()
            .then(text=> text.toLowerCase())

        expect(bigdogTextLowered).toEqual('big dog')
    })

})

