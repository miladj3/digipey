import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardStepsComponent } from './wizard-steps.component';
import {WizardComponent} from "./wizard.component";
import { WizardDirective } from './wizard.directive';

@NgModule({
  declarations: [
    WizardComponent,
    WizardStepsComponent,
    WizardDirective
  ],
  exports: [
    WizardComponent,
    WizardStepsComponent,
    WizardDirective
  ],
  imports: [
    CommonModule
  ]
})
export class WizardModule { }
