export class UserAlreadyExistError extends Error {
    constructor() {
        super('User with this email already exists.')
    }
}
