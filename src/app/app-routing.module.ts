import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RiskSurveyComponent} from "./risk-survey/risk-survey.component";

const appRoutes: Routes = [
  {path: 'risk-survey', component: RiskSurveyComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
