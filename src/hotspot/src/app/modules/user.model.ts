/**
 * @class User
 * Contains user data
 */

export class User {
    constructor (
        public nombre: string,
        public password: string,
        public confirmPassword: string,
        public email: string,
        public fechanacimiento: Date,
        public foto: string,
        public tipo: string
    ) {  }
}