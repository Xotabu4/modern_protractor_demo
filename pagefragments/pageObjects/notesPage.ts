import { BaseArrayFragment as NotesCollection } from 'protractor-element-extend'
import { NoteEditorFragment } from './fragments/noteEditorFragment'
import { NoteFragment } from './fragments/note/noteFragment'
import { NavigationBarFragment } from './fragments/navigationBarFragment'
import { $$, $, element, browser, by, ExpectedConditions as EC, ElementFinder } from 'protractor'

export class NotesPage {
    noteEditor: NoteEditorFragment
    navigationBar: NavigationBarFragment
    notes: NotesCollection<NoteFragment>

    constructor() {
        this.noteEditor = new NoteEditorFragment()
        this.navigationBar = new NavigationBarFragment()
        this.notes = new NotesCollection<NoteFragment>(
            $$('.grid-container .grid-item'),
            NoteFragment)
    }

}

