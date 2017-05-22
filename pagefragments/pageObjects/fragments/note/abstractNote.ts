import { BaseFragment } from 'protractor-element-extend'
import { $$, $, element, browser, by, ExpectedConditions as EC, ElementFinder } from 'protractor'

export class AbstractNote extends BaseFragment {
    titleElement: ElementFinder
    bodyElement: ElementFinder

    constructor(elem) {
        super(elem)
        this.titleElement = this.$$('.my-note p').first()
        this.bodyElement = this.$$('.my-note p').get(1)
    }

    async getTitle() {
        let text = await this.titleElement.getText()
        return text.trim()
    }

    async getBody() {
        let text = await this.bodyElement.getText()
        return text.trim()
    }

    async getColor() {
        return await this.getCssValue('background-color')
    }

    protected async mouseOver(button: ElementFinder) {
        await browser.actions().mouseMove(button).perform()
        await browser.wait(EC.visibilityOf(button), 3000, 'Button should became visible on mouse over')
    }
}

