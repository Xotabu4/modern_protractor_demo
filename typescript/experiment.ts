import { browser, $, ElementFinder } from 'protractor'

describe('TypeScript', () => {
    it('Autocomplete of code', async () => {
        let myElement = $('body')

        // myElement.

        // browser.
    })

    xit('defining own types', async () => {
        class InputField {
            constructor(private innerElem: ElementFinder) { }

            async type(text: string) {
                await this.innerElem.clear()
                await this.innerElem.sendKeys(text)
            }
        }

        // let myInput = new InputField($('input'))
        // myInput.

        interface LoginInfo {
            email: string,
            password: string,
            rememberMe: boolean
        }

        class LoginForm {
            private loginField = new InputField($('input.login'))
            private passwordField = new InputField($('input.password'))
            private rememberMe: ElementFinder = $('checkbox.rememberMe')
            private loginButton: ElementFinder = $('button.login')

            async login(loginInfo: LoginInfo) {
                this.loginField.type(loginInfo.email)
                this.passwordField.type(loginInfo.password)

                // Checking if true                
                loginInfo.rememberMe && await this.rememberMe.click()

                await this.loginButton.click()
            }
        }

        let loginForm = new LoginForm()

        loginForm.login({
            email: 'test@test.com',
            password: '123456',
            rememberMe: true
        })

        /*
        
        loginForm.login({
            email: 'test@test.com',
            password: '123456',
        })

        */


    })
})

