/**
 * @class User
 * Contains user data
 */

export class User {
    constructor (
        public nombre: string,
        public password: string,
        public confirmPassword: string,
        public email: String,
        public fechanacimiento: Date,
        public foto: String,
    ) {  }
}