import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { SoldeurSharedModule } from 'app/shared/shared.module';
import { SoldeurCoreModule } from 'app/core/core.module';
import { SoldeurAppRoutingModule } from './app-routing.module';
import { SoldeurHomeModule } from './home/home.module';
import { SoldeurEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    SoldeurSharedModule,
    SoldeurCoreModule,
    SoldeurHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    SoldeurEntityModule,
    SoldeurAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class SoldeurAppModule {}
