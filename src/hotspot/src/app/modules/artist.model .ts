/**
 * @class Artista
 * Contains Artista data
 */

export class Artista {
    constructor (
        public foto: string,
        public nombre: string,
        public apodo: string,
        public generos: Array<String>,
        public descripcion: string,
        public tags: Array<String>,
        public festivales: Array<String>
    ) {  }
}