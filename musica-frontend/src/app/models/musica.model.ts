import { Artista } from './artista.model';

export class Musica {
    public id: String;
    public nome: String;
    public artista: Artista;
    public artistaId: String;
    public checked: Boolean;
}
