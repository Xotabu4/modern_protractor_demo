import { BaseArrayFragment as NotesCollection, BaseFragment } from 'protractor-element-extend'
import { $$, $, element, browser, by, ExpectedConditions as EC, ElementFinder } from 'protractor'

export class NoteEditorFragment extends BaseFragment {
    private titleField: ElementFinder
    private bodyField: ElementFinder

    constructor() {
        super($('.note-editor'))
        this.titleField = this.$('input[placeholder="Title"]')
        this.bodyField = this.$('textarea')
    }

    async createNote(noteData: { bodyText: string, titleText: string }) {
        await this.activate()
        await this.bodyField.clear()
        await this.bodyField.sendKeys(noteData.bodyText)

        await this.titleField.clear()
        await this.titleField.sendKeys(noteData.titleText)

        await element(by.buttonText('Save')).click()
        await browser.wait(EC.invisibilityOf(this.titleField), 2000,
            'Title should became hidden after submit')
    }

    async activate() {
        await browser.wait(EC.visibilityOf(this), 5000, 'Note editor fragment should be visible before activating')
        await this.click()
        await browser.wait(EC.and(
            EC.elementToBeClickable(this.titleField),
            EC.elementToBeClickable(this.bodyField)
        ), 5000, 'Title and Body field should be ready to type after activation')
    }
}