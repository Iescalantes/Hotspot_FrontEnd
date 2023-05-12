/**
 * @class Empresa
 * Contains Empresa data
 */

export class Empresa {
    constructor (
        public nombre: string,
        public password: string,
        public confirmPassword: string,
        public email: string,
        public foto: string,
        public desc: string,
        public tlf: number,
        public code: string
    ) {  }
}