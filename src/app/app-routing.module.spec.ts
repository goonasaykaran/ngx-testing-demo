import { TestBed, fakeAsync, inject, ComponentFixture, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { routes } from './app-routing.module';
import { UserAuthentication } from './user-authentication.service';
import { Component, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ShellComponent } from './shell/shell.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroService } from './hero.service';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { LoadingStatusService } from './loading-status.service';
import { LoginComponent } from './login/login.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

describe('app-routing module', () => {
  describe('passing guard', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ ShellComponent, DashboardComponent, LoginComponent, HeroesComponent, HeroDetailComponent ],
        schemas: [ NO_ERRORS_SCHEMA ],
        imports: [ RouterTestingModule.withRoutes([ {path: 'simple', component: SimpleCmp} ]), TestModule ],
        providers: [
          HeroService,
          {
            provide: UserAuthentication, useValue: {
            canActivate: () => {
              return true;
            }
          }
          },
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
            deps: [ MockBackend, BaseRequestOptions ]
          }
        ]
      });
    });
    it('allows access to dashboard', fakeAsync(inject([ Router, Location ], (router: Router, location: Location) => {
      const fixture = createRoot(router, RootCmp);
      router.resetConfig(routes);
      router.navigate([ 'dashboard' ]);
      advance(fixture);
      expect(location.path()).toEqual('/dashboard');
    })));
    it('allows access to detail with ID', fakeAsync(inject([ Router, Location ], (router: Router, location: Location) => {
      const fixture = createRoot(router, RootCmp);
      router.resetConfig(routes);
      router.navigate([ 'detail', '123' ]);
      advance(fixture);
      expect(location.path()).toEqual('/detail/123');
    })));
    it('allows access to heroes', fakeAsync(inject([ Router, Location ], (router: Router, location: Location) => {
      const fixture = createRoot(router, RootCmp);
      router.resetConfig(routes);
      router.navigate([ 'heroes' ]);
      advance(fixture);
      expect(location.path()).toEqual('/heroes');
    })));
  });
  describe('failing guard', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ ShellComponent, DashboardComponent, LoginComponent, HeroesComponent, HeroDetailComponent ],
        schemas: [ NO_ERRORS_SCHEMA ],
        imports: [ RouterTestingModule.withRoutes([ {path: 'simple', component: SimpleCmp} ]), TestModule ],
        providers: [
          HeroService,
          LoadingStatusService,
          UserAuthentication,
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
            deps: [ MockBackend, BaseRequestOptions ]
          }
        ]
      });
    });
    it('blocks access to dashboard', fakeAsync(inject([ Router, Location ], (r: Router, location: Location) => {
      const fixture = createRoot(r, RootCmp);
      r.resetConfig(routes);
      r.navigate([ 'dashboard' ]);
      advance(fixture);
      expect(location.path()).toEqual('/login');
    })));
    it('blocks access to detail', fakeAsync(inject([ Router, Location ], (r: Router, location: Location) => {
      const fixture = createRoot(r, RootCmp);
      r.resetConfig(routes);
      r.navigate([ 'detail', '123' ]);
      advance(fixture);
      expect(location.path()).toEqual('/login');
    })));
    it('blocks access to heroes', fakeAsync(inject([ Router, Location ], (r: Router, location: Location) => {
      const fixture = createRoot(r, RootCmp);
      r.resetConfig(routes);
      r.navigate([ 'heroes' ]);
      advance(fixture);
      expect(location.path()).toEqual('/login');
    })));
  });
});

function createRoot(router: Router, type: any): ComponentFixture<any> {
  const f = TestBed.createComponent(type);
  advance(f);
  router.initialNavigation();
  advance(f);
  return f;
}

@Component({selector: 'simple-cmp', template: `simple`})
class SimpleCmp {
}

@Component({
  selector: 'root-cmp',
  template: `primary [<router-outlet></router-outlet>] right [<router-outlet name="right"></router-outlet>]`
})
class RootCmpWithTwoOutlets {
}

@Component({selector: 'root-cmp', template: `<router-outlet></router-outlet>`})
class RootCmp {
}

@Component({selector: 'root-cmp-on-init', template: `<router-outlet></router-outlet>`})
class RootCmpWithOnInit {
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.navigate([ 'one' ]);
  }
}

function advance(fixture: ComponentFixture<any>): void {
  tick();
  fixture.detectChanges();
}

@NgModule({
  imports: [ RouterTestingModule, CommonModule ],
  entryComponents: [
    SimpleCmp,
    ShellComponent,
    HeroDetailComponent,
    HeroesComponent,
    LoginComponent,
    DashboardComponent,
    RootCmp,
    RootCmpWithTwoOutlets
  ],
  exports: [
    SimpleCmp,
    RootCmp,
    RootCmpWithOnInit,
    RootCmpWithTwoOutlets
  ],
  declarations: [
    SimpleCmp,
    RootCmp,
    RootCmpWithOnInit,
    RootCmpWithTwoOutlets
  ]
})
class TestModule {
}
