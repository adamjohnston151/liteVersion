import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RiskSurveyComponent } from './risk-survey/risk-survey.component';
import {AppRoutingModule} from './app-routing.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import {
  MaterialModule, MdDialogModule, MdDialogRef, MdProgressSpinnerModule, MdSliderModule,
  MdTooltipModule
} from '@angular/material';
import {DataService} from './risk-survey/data.service';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {NgxPaginationModule} from 'ngx-pagination';
import {MomentModule} from 'angular2-moment';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import {FileSelectDirective} from 'ng2-file-upload';
import {UserProfileService} from './shared/user-profile.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PaginationModule} from 'ngx-bootstrap';
import { ScoreBarsComponent } from './shared/score-bars/score-bars.component';

@NgModule({
  declarations: [
    AppComponent,
    RiskSurveyComponent,
    NavigationBarComponent,
    FileSelectDirective,
    ScoreBarsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdProgressSpinnerModule,
    MdSliderModule,
    RoundProgressModule,
    NgxPaginationModule,
    MdTooltipModule,
    MomentModule,
    NgIdleKeepaliveModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [DataService, UserProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
