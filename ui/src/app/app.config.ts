import {
  ApplicationConfig,
  provideZoneChangeDetection,
  inject,
  importProvidersFrom,
} from '@angular/core';
import {
  createUrlTreeFromSnapshot,
  PreloadAllModules,
  provideRouter,
  Router,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appRoutes } from './app.routes';

/* Internationalization (i18n) */
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'; // provides the core translation service, pipes, and directives.
import { TranslateHttpLoader } from '@ngx-translate/http-loader'; // loads translations from JSON files.
/* Internationalization (i18n) */

/* Angular Material modules */
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
/* Angular Material modules */

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      appRoutes,
      withInMemoryScrolling(),
      withComponentInputBinding(),
      withViewTransitions({
        onViewTransitionCreated: ({ transition, to }) => {
          const router = inject(Router);
          const toTree = createUrlTreeFromSnapshot(to, []);
          // Skip the transition if the only thing changing is the fragment and queryParams
          if (
            router.isActive(toTree, {
              paths: 'exact',
              matrixParams: 'exact',
              fragment: 'ignored',
              queryParams: 'ignored',
            })
          ) {
            transition.skipTransition();
          }
        },
      }),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
        onSameUrlNavigation: 'reload',
      }),
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(
      withFetch()
      // withInterceptors([authenticationInterceptor, cachingInterceptor]),
    ),
    provideAnimationsAsync(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    /* Angular Material modules */
    importProvidersFrom(MatButton),
    importProvidersFrom(MatCardModule),
    importProvidersFrom(MatDialogModule),
    importProvidersFrom(MatExpansionModule),
    importProvidersFrom(MatFormFieldModule),
    importProvidersFrom(MatIconModule),
    importProvidersFrom(MatProgressSpinnerModule),
    importProvidersFrom(MatSidenavModule),
    importProvidersFrom(MatSnackBarModule),
    importProvidersFrom(MatTableModule),
    importProvidersFrom(MatToolbarModule),
    /* Angular Material modules */
  ],
};
