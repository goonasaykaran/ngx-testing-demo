import { HeroesComponent } from './heroes.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';

let MockHero: Hero = <Hero>{id: 1, name: 'Superman'};
let MockHero2: Hero = <Hero>{id: 2, name: 'IronMan'};
let MockHeroesArray: Array<Hero> = [ MockHero, MockHero2 ];

describe('Component: HeroSearch', () => {
  let elementFixture: ComponentFixture<HeroesComponent>;
  let heroService: HeroService;
  let mockBackend: MockBackend;
  let heroSearchComponent: HeroesComponent;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [ MockBackend, BaseRequestOptions ]
        }
      ],
      declarations: [
        HeroesComponent,
        HeroDetailComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule
      ]
    });
    elementFixture = TestBed.createComponent(HeroesComponent);
  });
  beforeEach(inject([ HeroService, MockBackend, Router ],
    (hs: HeroService, mb: MockBackend, r: Router) => {
      heroService = hs;
      router = r;
      heroSearchComponent = new HeroesComponent(hs, r);
      mockBackend = mb;
    }));
  describe('Functional: ', () => {
    // TODO: Need to figure out how to test this
    // it('should call the hero service and set heroes to successful fetch', () => {
    //   heroSearchComponent.getHeroes();
    //
    //   expect(heroSearchComponent.heroes).toBe(MockHeroesArray);
    // });

    it('should switch to add hero mode and clear selected hero when addHero is called', () => {
      expect(heroSearchComponent.addingHero).toBeFalsy();
      heroSearchComponent.selectedHero = MockHero;

      heroSearchComponent.addHero();

      expect(heroSearchComponent.addingHero).toBeTruthy();
      expect(heroSearchComponent.selectedHero).toBeNull();
    });

    // TODO: Need to test calling this without hero
    it('should switch from add hero mode', () => {
      spyOn(heroSearchComponent, 'getHeroes');
      heroSearchComponent.addingHero = true;
      expect(heroSearchComponent.addingHero).toBeTruthy();

      heroSearchComponent.close(MockHero);

      expect(heroSearchComponent.addingHero).toBeFalsy();
      expect(heroSearchComponent.getHeroes).toHaveBeenCalled();
      expect(heroSearchComponent.getHeroes).toHaveBeenCalledTimes(1);
    });

    it('should initialize and call getHeroes', () => {
      spyOn(heroSearchComponent, 'getHeroes');

      heroSearchComponent.ngOnInit();

      expect(heroSearchComponent.getHeroes).toHaveBeenCalled();
      expect(heroSearchComponent.getHeroes).toHaveBeenCalledTimes(1);
    });

    it('should set selected hero to the hero passed to onSelect', () => {
      heroSearchComponent.onSelect(MockHero);

      expect(heroSearchComponent.selectedHero).toBe(MockHero);
      expect(heroSearchComponent.addingHero).toBeFalsy();
    });

    it('should navigate to detail page for hero based on selected hero id', () => {
      spyOn(router, 'navigate');
      heroSearchComponent.selectedHero = MockHero;

      heroSearchComponent.gotoDetail();

      expect(router.navigate).toHaveBeenCalledWith([ '/detail', MockHero.id ]);
    });
  });

  describe('Presentation:', () => {
    let heroesElement;
    beforeEach(() => {
      elementFixture.componentInstance.heroes = MockHeroesArray;
      elementFixture.detectChanges();
    });
    it('should have 2 hero-element\'s when heroes is populated', () => {
      heroesElement = elementFixture.nativeElement;
      expect(heroesElement.querySelectorAll('.hero-element').length).toBe(MockHeroesArray.length);
    });
    it('add the selected class to the selected hero and not other heroes', () => {
      heroesElement = elementFixture.nativeElement;
      spyOn(elementFixture.componentInstance, 'onSelect').and.callThrough();

      heroesElement.querySelectorAll('.hero-element')[ 0 ].click();

      elementFixture.detectChanges();
      let updatedElement = elementFixture.nativeElement;
      expect(elementFixture.componentInstance.onSelect).toHaveBeenCalled();
      expect(elementFixture.componentInstance.onSelect).toHaveBeenCalledTimes(1);
      expect(updatedElement.querySelectorAll('.hero-element')[ 0 ].parentNode.classList).toContain('selected');
      expect(updatedElement.querySelectorAll('.hero-element')[ 1 ].parentNode.classList).not.toContain('selected');
    });

    it('deleted the selected hero and not other heroes', () => {
      heroesElement = elementFixture.nativeElement;
      spyOn(elementFixture.componentInstance, 'deleteHero').and.callFake((hero: Hero, $event: any) => {
        elementFixture.componentInstance.heroes.splice(elementFixture.componentInstance.heroes.indexOf(hero), 1);
      });

      heroesElement.querySelectorAll('.hero-element')[ 0 ].parentElement.querySelectorAll('.delete-button')[ 0 ].click();

      expect(elementFixture.componentInstance.heroes.length).toBe(1);
      elementFixture.detectChanges();
      let updatedElement = elementFixture.nativeElement;
      expect(elementFixture.componentInstance.deleteHero).toHaveBeenCalled();
      expect(elementFixture.componentInstance.deleteHero).toHaveBeenCalledTimes(1);
      expect(elementFixture.componentInstance.deleteHero).toHaveBeenCalledWith(MockHero, jasmine.anything());
      expect(updatedElement.querySelectorAll('.hero-element').length).toBe(1);
    });

    it('should display the error message when an error is set', () => {
      heroesElement = elementFixture.nativeElement;
      expect(heroesElement.querySelectorAll('.error').length).toBe(0);

      elementFixture.componentInstance.error = 'something happened';

      elementFixture.detectChanges();
      let updatedElement = elementFixture.nativeElement;
      expect(updatedElement.querySelectorAll('.error').length).toBe(1);
    });

  });
});
