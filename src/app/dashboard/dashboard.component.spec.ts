import { RouterTestingModule } from '@angular/router/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { Hero } from '../hero';
import { HeroSearchService } from '../hero-search.service';

let MockHero: Hero = <Hero>{id: 1, name: 'Superman'};
let MockHero2: Hero = <Hero>{id: 2, name: 'Iron Man'};
let MockHero3: Hero = <Hero>{id: 3, name: 'Thor'};
let MockHero4: Hero = <Hero>{id: 4, name: 'Hulk'};
let MockHero5: Hero = <Hero>{id: 5, name: 'Spiderman'};
let MockHeroesArray: Array<Hero> = [ MockHero, MockHero2, MockHero3, MockHero4, MockHero5 ];
describe('Component: HeroSearch', () => {
  let elementFixture: ComponentFixture<DashboardComponent>;
  let heroService: HeroService;
  let mockBackend: MockBackend;
  let dashboardComponent: DashboardComponent;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        HeroSearchService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [ MockBackend, BaseRequestOptions ]
        }
      ],
      declarations: [
        DashboardComponent,
        HeroSearchComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule
      ]
    });
    elementFixture = TestBed.createComponent(DashboardComponent);
  });
  beforeEach(inject([ HeroService, MockBackend, Router ],
    (hs: HeroService, mb: MockBackend, r: Router) => {
      heroService = hs;
      router = r;
      dashboardComponent = new DashboardComponent(hs, r);
      mockBackend = mb;
    }));
  describe('Functional: ', () => {
    it('should go to link for hero based on hero.id passed in', () => {
      spyOn(router, 'navigate');

      dashboardComponent.gotoDetail(MockHero);

      expect(router.navigate).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith([ '/detail', MockHero.id ]);
    });

    it('should display 4 heroes when getHeroes returns more than 4', () => {
      spyOn(heroService, 'getHeroes').and.callFake(() => {
        return {
          then: function (callback) {
            return callback(MockHeroesArray);
          }
        };
      });

      dashboardComponent.ngOnInit();

      expect(heroService.getHeroes).toHaveBeenCalled();
      expect(heroService.getHeroes).toHaveBeenCalledTimes(1);
      expect(dashboardComponent.heroes.length).toBe(4);
    });

    it('should display one less than count of heroes returned when getHeroes returns less than 4', () => {
      let expectedHeroArray = [ MockHero, MockHero2 ];
      spyOn(heroService, 'getHeroes').and.callFake(() => {
        return {
          then: function (callback) {
            return callback(expectedHeroArray);
          }
        };
      });

      dashboardComponent.ngOnInit();

      expect(heroService.getHeroes).toHaveBeenCalled();
      expect(heroService.getHeroes).toHaveBeenCalledTimes(1);
      expect(dashboardComponent.heroes.length).toBe(expectedHeroArray.length - 1);
    });

  });
});
