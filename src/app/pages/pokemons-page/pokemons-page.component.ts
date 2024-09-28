import { ApplicationRef, ChangeDetectionStrategy, Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons-page',
  standalone: true,
  imports: [
    PokemonListComponent,
    PokemonListSkeletonComponent,
    RouterLink
  ],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {

  private pokemonService = inject(PokemonsService);
  private route   = inject(ActivatedRoute);
  private router  = inject(Router);
  private title   = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map(params => params['page'] ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1,page))
  ));

  public pokemons = signal<SimplePokemon[]>([]);
  public loadOnPageChanged = effect(() => {
    this.loadPokemons(this.currentPage());
  }, {allowSignalWrites: true});

  public loadPokemons(page: number = 0) {
    const pageToLoad = this.currentPage()! + page;

    this.pokemonService.loadPage(pageToLoad-1)
    .pipe(
      tap(() => this.title.setTitle(`Pokemons - Page ${pageToLoad}`))
    )
    .subscribe(pokemons => {
        this.pokemons.set(pokemons);
    })
  }
}
