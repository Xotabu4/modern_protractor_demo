import { $, $$, ExpectedConditions as EC, browser, ElementFinder } from 'protractor'
import { BaseFragment } from 'protractor-element-extend'
import { RecycleBinPage } from '../recycleBinPage'

export class NavigationBarFragment extends BaseFragment {
    private openMenuButton: ElementFinder

    constructor() {
        super($('.navbar'))
        this.openMenuButton = this.$('.navbar-right a.dropdown-toggle')
    }

    async openMenu() {
        await this.openMenuButton.click()
        let menu = new MenuFragment()
        await browser.wait(EC.visibilityOf(menu), 2000,
            'Menu should became visible after open')
        return menu
    }
}

class MenuFragment extends BaseFragment {
    private archiveNoteLink: ElementFinder
    private recycleBinLink: ElementFinder

    constructor() {
        super($('li.dropdown.open ul.dropdown-menu'))
        this.archiveNoteLink = this.$(`a[href*='archive-notes']`)
        this.recycleBinLink = this.$(`a[href*='recycle-bin']`)
    }

    async openArchivedNotesPage() {
        await this.archiveNoteLink.click()
    }

    async openRecycleBinPage() {
        await this.recycleBinLink.click()
        return new RecycleBinPage();
    }

}