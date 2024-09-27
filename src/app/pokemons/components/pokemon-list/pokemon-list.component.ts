import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonCardComponent } from "./pokemon-card/pokemon-card.component";
import { PokemonListSkeletonComponent } from '../../../pages/pokemons-page/ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    PokemonCardComponent,
    PokemonListSkeletonComponent
  ],
  templateUrl: './pokemon-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent {
  public pokemons = input.required<SimplePokemon[]>();
}
