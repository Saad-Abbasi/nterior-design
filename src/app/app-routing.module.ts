import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CabinetTypeComponent } from './pages/cabinet-type/cabinet-type.component';
import { FifthStepComponent } from './pages/steps/fifth-step/fifth-step.component';
import { FirstStepComponent } from './pages/steps/first-step/first-step.component';
import { FourthStepComponent } from './pages/steps/fourth-step/fourth-step.component';
import { SecondStepComponent } from './pages/steps/second-step/second-step.component';
import { SidePanelComponent } from './pages/steps/shared/side-panel/side-panel.component';
import { SixthStepComponent } from './pages/steps/sixth-step/sixth-step.component';
import { ThirdStepComponent } from './pages/steps/third-step/third-step.component';
import {SeventhStepComponent} from './pages/steps/seventh-step/seventh-step.component';
import { StartStepComponent } from './pages/steps/start-step/start-step.component';
import {EighthStepComponent } from './pages/steps/eighth-step/eighth-step.component'
 

const routes: Routes = [
  {path : 'cabinet-type', component :CabinetTypeComponent},
  {path : 'side-panel', component :SidePanelComponent},
  {path : 'start-step', component :StartStepComponent},
  {path : 'first-step', component :FirstStepComponent},
  {path : 'second-step', component :SecondStepComponent},
  {path : 'third-step', component :ThirdStepComponent},
  {path : 'fourth-step', component :FourthStepComponent},
  {path : 'fifth-step', component :FifthStepComponent},
  {path : 'sixth-step', component :SixthStepComponent},
  {path : 'seventh-step', component :SeventhStepComponent},
  {path : 'eighth-step', component: EighthStepComponent },
  {path : '' , pathMatch : 'full' ,component:CabinetTypeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
