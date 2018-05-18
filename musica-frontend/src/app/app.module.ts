import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { MusicaComponent } from './musica/musica.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ControlesComponent } from './controles/controles.component';

import { MusicaService } from './musica.service';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    MusicaComponent,
    PlaylistComponent,
    ControlesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [MusicaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
