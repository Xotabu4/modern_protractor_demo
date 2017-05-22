import { AbstractNote } from './abstractNote'
import { BaseArrayFragment, BaseFragment } from 'protractor-element-extend'
import { $$, $, element, browser, by, ExpectedConditions as EC, ElementFinder } from 'protractor'

export class NoteFragment extends AbstractNote {
    constructor(elem) {
        super(elem)
    }

    async edit(title: string, body: string) {
        await this.click()
        let modal = new NoteEditModalFragment()
        await browser.wait(EC.visibilityOf(modal), 3000, 'Modal window for note edit should appear')
        modal.edit({bodyText: body, titleText: title})
        modal.done()
        await browser.wait(EC.invisibilityOf(modal), 3000, 'Modal window for note edit should appear')
    }

    async archive() {
        let archiveButton = $('a[title="Archive"]')
        this.mouseOver(archiveButton)
        await archiveButton.click()
        await browser.wait(EC.invisibilityOf(this), 3000, 'Note should disappear on archive')
    }

    async delete() {
        let deleteButton = $('a[title="Delete"]')
        this.mouseOver(deleteButton)
        await deleteButton.click()
        await browser.wait(EC.invisibilityOf(this), 3000, 'Note should disappear on delete')
    }

}

class NoteEditModalFragment extends BaseFragment {
    private bodyTextArea:ElementFinder
    private titleInput:ElementFinder

    constructor() {
        super($('#node_edit_modal'))
        this.titleInput = this.$('.modal-title input')
        this.bodyTextArea = this.$('.modal-body textarea')
    }

    async edit(infoToUpdate:{bodyText:string, titleText:string}) {
        this.typeBody(infoToUpdate.bodyText)
        this.typeTitle(infoToUpdate.titleText)
    }

    async typeBody(bodyText: string) {
        await this.bodyTextArea.clear()
        await this.bodyTextArea.sendKeys(bodyText)
    }

    async typeTitle(titleText: string) {
        await this.titleInput.clear()
        await this.titleInput.sendKeys(titleText)
    }

    async done() {
        await this.element(by.buttonText('Done')).click()
    }
}