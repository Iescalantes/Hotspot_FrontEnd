/**
 * @class Festival
 * Contains Festival data
 */

export class Festival {
    constructor (
        public Id_empresa: string,
        public nombre: string,
        public fecha: Date,
        public localizacion: string,
        public descripcion: string,
        public mayoriaedad: boolean,
        public eshot: boolean,
        public esnovedad: boolean,
        public artistas: Array<String>,
        public confirmado: boolean,
        public megustas: Number,
        public foto: string,
    ) {  }
}