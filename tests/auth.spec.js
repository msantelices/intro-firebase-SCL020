import { login } from '../src/firebase/auth.js'
import { auth, signInWithEmailAndPassword } from '../src/firebase/init.js'

jest.mock('../src/firebase/init.js', ()=> {
    return {
        auth: jest.fn(()=> {
            return { auth: 'TEST' }
        }),

        signInWithEmailAndPassword: jest.fn((auth, email, password)=> {
            if(!email || !password) {
                throw new Error('ERROR')
            }

            Promise.resolve({ user: 'admin' })
        })
    }
})


describe('Tests for the login function', ()=> {
    const email = "admin@test.com"
    const pass = "admin123"

    it('Should call signInWithEmailAndPassword', async()=> {
        await login(email, pass)
        expect(signInWithEmailAndPassword).toHaveBeenCalled()
    })

    it('Should call signInWithEmailAndPassword with the auth, email and pass arguments', async()=> {
        await login(email, pass)
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, pass)
    })

    it('Should throw an error if executed without arguments', async()=> {
        try {
            await login()
        } catch(error) {
            expect(error).toMatch('ERROR')
        }
    })
})