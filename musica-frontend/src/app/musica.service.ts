
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Musica } from './models/musica.model';
import { Playlist } from './models/playlist.model';

const API_URL = "https://intense-ocean-93206.herokuapp.com";

@Injectable()
export class MusicaService {

  constructor(private http: Http) {
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

  // API: GET /Prato
  public getMusicas(musica): Observable<Musica[]>  {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    const options = new RequestOptions({ headers: headers });
    // will use this.http.get()
    return this.http
    .get(API_URL + '/api/musicas/?filtro=' + musica)
    .map(response => {
      return response.text().trim()!=''?response.json():null;
    })
    .catch(this.handleError);
  }

  public getPlaylist(usuario): Observable<Playlist>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    const options = new RequestOptions({ headers: headers });
    // will use this.http.get()
    return this.http
    .get(API_URL + '/api/playlists/?user=' + usuario)
    .map(response => {
      //TODO: validar se é maneira mais correta para valida tanato;      
      return response.text().trim()!=''?response.json():null;
    })
    .catch(this.handleError);
  }

  // Pegar as musicas a partir da sua situação informada,
  // Exemplo se o a musica estiver checada o mesmo adiona em um novo array
  public getMusicasChecked(checked: boolean, musicas:Musica[]): Musica[]{
    let musicasChecadas:Musica[] = new Array();
    musicas.forEach(element => {
      element.checked?musicasChecadas.push(element):0;
    });
    return musicasChecadas;
  }

 // API: PUT /todos/:id
 // API: PUT /todos/:id
 public updateTodo(todo: Playlist): Observable<Playlist> {
  let musicas:Musica[] = new Array();
  todo.playlistMusicas.forEach(element => {
    musicas.push(element.musica);
  });
  return this.http
  .put(API_URL + '/api/playlists/' + todo.id, musicas)
  .map(response => {
    return response.json();
  })
  .catch(this.handleError);
}


 // DELETE /todos/:id
 public deleteTodoById(idPlayList: String, idMusica:String) : Observable<null>{
    return this.http
    .delete(API_URL + '/api/playlists/' + idPlayList +'/musicas/'+idMusica)
    .map(response => null)
    .catch(this.handleError);
  }

}
