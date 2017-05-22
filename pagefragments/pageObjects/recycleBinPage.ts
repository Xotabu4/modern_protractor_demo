import { BaseArrayFragment as NotesCollection } from 'protractor-element-extend'
import { DeletedNoteFragment } from './fragments/note/deletedNote'
import { NavigationBarFragment } from './fragments/navigationBarFragment'
import { $$, $, element, browser, by, ExpectedConditions as EC, ElementFinder } from 'protractor'

export class RecycleBinPage {
    navigationBar: NavigationBarFragment
    notes: NotesCollection<DeletedNoteFragment>

    constructor() {
        this.navigationBar = new NavigationBarFragment()
        this.notes = new NotesCollection<DeletedNoteFragment>(
            $$('.grid-container .grid-item'),
            DeletedNoteFragment)
    }

}

