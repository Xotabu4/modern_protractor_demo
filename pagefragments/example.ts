/// <reference types="jasmine-protractor-matchers" />

import { ElementFinder, browser, ExpectedConditions as EC, $, $$ } from 'protractor'
import { NotesPage } from './pageObjects/notesPage'
import { AbstractNote } from './pageObjects/fragments/note/abstractNote'
import { NoteFragment } from './pageObjects/fragments/note/noteFragment'


describe('Page Objects / Page Fragments', function () {
    let notesPage = new NotesPage()

    beforeAll(async () => {
        let protractorMatchers = require('jasmine-protractor-matchers');
        return await jasmine.addMatchers(protractorMatchers)
    })

    beforeEach(async () => {
        await browser.waitForAngularEnabled(false)
        await browser.manage().timeouts().implicitlyWait(2000)
        await browser.get('')
        await browser.sleep(200)
        await browser.wait(EC.visibilityOf(notesPage.navigationBar), 10000,
            'Header should be visible after page open')
    })

    afterEach(async () => {
        let wipeIndexedDB = () => {
            (indexedDB as any).webkitGetDatabaseNames().onsuccess = function (sender, args) {
                for (let dbname of sender.target.result) {
                    indexedDB.deleteDatabase(dbname)
                }
            };
        }
        // Clearing browser data after each test
        await browser.executeScript(wipeIndexedDB)
        await browser.manage().deleteAllCookies();
        await browser.executeScript('window.sessionStorage.clear(); window.localStorage.clear();')
    })

    it('can create note', async () => {
        const noteData = { titleText: 'HELLO', bodyText: 'WORLD' }
        await notesPage.noteEditor.createNote(noteData)

        expect(notesPage.notes.first()).toAppear('First note must became visible after creation')

        expect(await notesPage.notes.count()).toBe(1, 'Should be created only one note')
        
        const createdNoteTitle = await notesPage.notes.first().getTitle()
        const createdNoteBody = await notesPage.notes.first().getBody()

        expect(createdNoteTitle).toEqual(noteData.titleText, `Title should be ${noteData.titleText}, but was ${createdNoteTitle}`)
        expect(createdNoteBody).toEqual(noteData.bodyText, `Body should be ${noteData.bodyText}, but was ${createdNoteBody}`)
    })

    it('can archive note', async () => {
        const noteData = { titleText: 'HELLO', bodyText: 'WORLD' }
        await notesPage.noteEditor.createNote(noteData)

        let firstNote = notesPage.notes.first()
        expect(firstNote).toAppear('First note must became visible after creation')

        await notesPage.notes.first().archive()

        expect(await notesPage.notes.count()).toBe(0, 'Everything should be archived')
    })

    it('can delete note', async () => {
        const noteData = { titleText: 'HELLO', bodyText: 'WORLD' }
        await notesPage.noteEditor.createNote(noteData)

        let firstNote = notesPage.notes.first()
        expect(firstNote).toAppear('First note must became visible after creation')

        await notesPage.notes.first().delete()

        expect(await notesPage.notes.count()).toBe(0, 'Everything should be deleted')

        let menu = await notesPage.navigationBar.openMenu()
        let recycleBinPage = await menu.openRecycleBinPage()

        expect(recycleBinPage.notes.first()).toAppear('Note should be visible on recycle bin page')
        expect(await recycleBinPage.notes.count()).toBe(1, 'Only one note should exist in deleted notes')

        const deletedNoteTitle = await recycleBinPage.notes.first().getTitle()
        const deletedNoteBody = await recycleBinPage.notes.first().getBody()

        expect(deletedNoteTitle).toEqual(noteData.titleText, `Title should be ${noteData.titleText}, but was ${deletedNoteTitle}`)
        expect(deletedNoteBody).toEqual(noteData.bodyText, `Body should be ${noteData.bodyText}, but was ${deletedNoteBody}`)
    })

})
