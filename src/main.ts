import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {HelloComponent} from './app/hello/hello';

// @ts-ignore
bootstrapApplication(App, appConfig,HelloComponent)
  .catch((err) => console.error(err));
