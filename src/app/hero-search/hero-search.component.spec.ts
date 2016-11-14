// import { HeroSearchComponent } from './hero-search.component';
// import { RouterTestingModule } from '@angular/router/testing';
// import { BaseRequestOptions, Http } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';
// import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
// import { HeroSearchService } from '../hero-search.service';
// import { Hero } from '../hero';
// import { Router } from '@angular/router';
//
// describe('Component: HeroSearch', () => {
//   let elementFixture: ComponentFixture<HeroSearchComponent>;
//   let heroSearchService: HeroSearchService;
//   let mockBackend: MockBackend;
//   let heroSearchComponent: HeroSearchComponent;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         HeroSearchService,
//         MockBackend,
//         BaseRequestOptions,
//         {
//           provide: Http,
//           useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
//           deps: [ MockBackend, BaseRequestOptions ]
//         }
//       ],
//       declarations: [
//         HeroSearchComponent
//       ],
//       imports: [
//         RouterTestingModule
//       ]
//     });
//     elementFixture = TestBed.createComponent(HeroSearchComponent);
//   });
//   beforeEach(inject([ HeroSearchService, MockBackend, Router ],
//     (hss: HeroSearchService, mb: MockBackend, r: Router) => {
//       heroSearchService = hss;
//       heroSearchComponent = new HeroSearchComponent(hss, r);
//       mockBackend = mb;
//     }));
//   describe('Structural', () => {
//     it('should have 4 heroes in the results when heroes attribute has 4 in the array', (done) => {
//       spyOn(heroSearchService, 'search').and.returnValue(MockHeroArray);
//       // mockBackend.connections.subscribe((connection: MockConnection) => {
//       //   debugger
//       //   elementFixture.detectChanges();
//       //   const renderedElement = elementFixture.nativeElement;
//       //   expect(renderedElement.querySelectorAll('.search-result').length).toBe(2);
//       //   connection.mockRespond(new Response(new ResponseOptions({body: MockHeroArray})));
//       //   done();
//       // });
//       // heroSearchComponent.ngOnInit();
//       heroSearchComponent.search('abc');
//       elementFixture.detectChanges();
//       debugger
//       const renderedElement = elementFixture.nativeElement;
//       expect(renderedElement.querySelectorAll('.search-result').length).toBe(2);
//       debugger
//       done()
//     })
//   });
// });

// describe('addCity: ', () => {
//   it(' should add a city', (done) => {
//     let marketRankingResponse = new MarketRankingResponse();
//     marketRankingResponse.ranked_items.push(rankedItem1);
//     mockBackend.connections.subscribe((connection: MockConnection) => {
//       expect(connection.request.method).toEqual(RequestMethod.Post);
//       expect(connection.request.url).toEqual('/market_ranking');
//       expect(connection.request.headers.get('Content-Type')).toEqual('application/json; charset=utf-8');
//       connection.mockRespond(new Response(new ResponseOptions({body: marketRankingResponse})));
//       done();
//     });
//     marketRankingTableComponent.wfaFiltersLocal = new FilterService();
//     marketRankingTableComponent.cityToAdd = 'Atlanta, GA';
//     marketRankingTableComponent.marketRankingRadius = 30;
//     marketRankingTableComponent.addCity();
//     expect(marketRankingTableComponent.marketRankingData[ 0 ].CityState).toEqual('SOMETHING');
//     expect(marketRankingTableComponent.marketRankingData.length).toEqual(1);
//     expect(marketRankingTableComponent.marketRankingData[ 0 ][ 'Status' ]).toEqual('Added');
//   });
// });
//
// let MockHeroArray = <Array<Hero>>[
//   {
//     id: 1,
//     name: 'Superman'
//   },
//   {
//     id: 2,
//     name: 'Batman'
//   },
//   {
//     id: 3,
//     name: 'IronMan'
//   },
//   {
//     id: 4,
//     name: 'Thor'
//   }
// ];
