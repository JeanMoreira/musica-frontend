import { Playlist } from './models/playlist.model';
import { MusicaService } from './musica.service';
import { Musica } from './models/musica.model';
import { Component } from '@angular/core';
import { PlaylistMusicasModel } from './models/PlaylistMusicasModel.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  // dentro do atributo musicaLista é carregado os dados da muisica a parti do filtro nome informado na tela
  musicasLista: Musica[];
  // dentro do atributo Playlist é carregado os dados da Playlist a parti do filtro user informado na tela
  playlist: Playlist = new Playlist();

  constructor(private musicaService: MusicaService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {

  }

  // Busca as musicas no servico.
  public buscarMusica(event) {
    if (event.keyCode === 13) {
      const filter = event.target.value;
      this.musicaService.getMusicas(filter).subscribe((musicas: Musica[]) => {

        this.musicasLista = musicas.map(x => Object.assign(x, { checked: false }));
        this.musicasLista.forEach(element => {
          console.log(element);
        });
        if (this.playlist.id != null) {
          this.deleteMusicasExistInPlayList();

        }
      }
      );
    }
  }

  // busca a playlist a parti do usuario.
  public buscarPlaylist(event) {
    if (event.keyCode === 13) {
      const filter = event.target.value;
      this.musicaService.getPlaylist(filter).subscribe((playlist) => {
        this.playlist = playlist;
        if (this.playlist.id != null) {
          this.deleteMusicasExistInPlayList();
        }
        }
      );
    }
  }


  public incluirMusicasPlaylist(event) {
    let musicasChecadas: Musica[];
    // retorna as musicas para um novo array selecionado só as checadas
    musicasChecadas = this.musicaService.getMusicasChecked(true, this.musicasLista);
    // pecorre a lista de musicas para add na nova playlist
    musicasChecadas.forEach(element => {
      const listplay: PlaylistMusicasModel = new PlaylistMusicasModel();
      listplay.musica = element;
      listplay.musicaId = element.id;
      listplay.playlistId = this.playlist.id;

      this.playlist.playlistMusicas.push(listplay);
      this.deleteMusicasExistInPlayList();
    });
    // acessa o servico e add um iten a playlist
    this.musicaService.updateTodo(this.playlist);
  }


  public removerMusicasPlaylist(event) {
    const musicasChecadas = this.musicaService.getMusicasChecked(true, this.newListMusicByPlayListMusicas(this.playlist.playlistMusicas));

    const musicaListRemovidosPlaylIst: Musica[] = this.deleteMusicasOfPlayListReturnList();
    this.musicasLista.push.apply(musicaListRemovidosPlaylIst);

    musicaListRemovidosPlaylIst.forEach(element => {
      this.musicasLista.push(element);
      this.musicaService.deleteTodoById(this.playlist.id, element.id);
    });

  }

  // cria uma nova lista de musicas a parti da playlistMusica
  private newListMusicByPlayListMusicas(list: PlaylistMusicasModel[]): Musica[] {

    const listMusica: Musica[] = new Array();
    list.forEach(element => {
      let obj: Musica = new Musica();
      obj = element.musica;
      obj.checked = element.musica.checked;

      listMusica.push(obj);
    });
    return listMusica;
  }



  // verifica se existe o item musica na playList informada retornando true caso o mesmo contenha
  private isExistMusicInPlayList(musica: Musica, playlist: Playlist): boolean {
    let valid = false;
    playlist.playlistMusicas.forEach(element => {
      if (element.musicaId === musica.id) {
        return valid = true;
      }
    });
    return valid;
  }

  // altera as musicas se existir em playlist
  private setMusicasExistInPlayList() {
    this.musicasLista.forEach(element => {
      this.isExistMusicInPlayList(element, this.playlist) ? element.checked = true : element.checked = false;
    });
  }

  // altera as musicas se existir em playlist
  private deleteMusicasExistInPlayList() {
    this.musicasLista.forEach(element => {
      element.checked = false;
      if (this.isExistMusicInPlayList(element, this.playlist)) {
        this.removeElementeList(this.musicasLista, element);
      }
    });
  }

  private deleteMusicasOfPlayListReturnList(): Musica[] {
    // tslint:disable-next-line:prefer-const
    let objList: Musica[] = new Array();

    this.playlist.playlistMusicas.forEach(element => {

      if (element.musica.checked === true) {
        objList.push(element.musica);

        this.removeElementeList(this.playlist.playlistMusicas, element);
      }
    });
    return objList;
  }

  private removeElementeList(lista: Array<any>, element: any) {
    const index = lista.indexOf(element);
    lista.splice(index, 1);
  }


}




