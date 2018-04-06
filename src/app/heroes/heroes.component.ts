import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  hero: Hero = { name: null, id: null };
  constructor(private heroService: HeroService) {
    // this.hero.name = 'Prem';
    // this.hero.id = 1;
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(): void {
    if (this.hero.name == null || this.hero.id == null) { return; }
    this.heroService.addHero(this.hero as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
    this.hero = { name: '', id: null };
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
