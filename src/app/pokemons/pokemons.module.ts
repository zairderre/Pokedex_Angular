import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';


import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonTeamComponent } from './pokemon-team/pokemon-team.component';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailsComponent,
    PokedexComponent,
    PokemonTeamComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatSidenavModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    InfiniteScrollModule,
    PokemonRoutingModule
  ]
})
export class PokemonsModule { }