import { Musica } from './../models/musica.model';
import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css']
})
export class MusicaComponent implements OnInit {

  public checkMusic: Boolean;
  constructor() { }

  // lista de musicas
  @Input() @Output() musicas: Musica[];

  ngOnInit() {

  }

  // checa a musica e valida se o mesmo esta checado ou não.
  checkedMusic(musica: Musica) {
    musica.checked = !musica.checked;
  }

}
