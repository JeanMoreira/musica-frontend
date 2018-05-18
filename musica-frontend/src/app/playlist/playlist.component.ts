import { Component, OnInit, Input, Output } from '@angular/core';
import { Playlist } from '../models/playlist.model';
import { Musica } from '../models/musica.model';
import { PlaylistMusicasModel } from '../models/PlaylistMusicasModel.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor() { }

  @Input() @Output() playlistFilho: Playlist;

  ngOnInit() {
    console.log(this.playlistFilho);
  }

  checkedMusic(playlistMusicasModel: PlaylistMusicasModel) {
    // tslint:disable-next-line:max-line-length
    const obj = this.playlistFilho.playlistMusicas.find(x => x.musica.id !== playlistMusicasModel.musica.id && x.musica.checked === true);
    if (obj != null) {
      obj.musica.checked = false;
    }
    playlistMusicasModel.musica.checked = !playlistMusicasModel.musica.checked;
  }

}
