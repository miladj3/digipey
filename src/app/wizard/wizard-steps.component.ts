import {Component, OnInit} from '@angular/core';
import {WizardService} from "./wizard.service";
import {WizardStep} from "./wizard.model";

@Component({
  selector: 'app-wizard-step',
  template: `
    <ng-template [ngIf]="isSelected">
      <ng-content></ng-content>
      <ng-container [wizardStep]="component" [data]="data" [fieldName]="fieldName"></ng-container>
    </ng-template>`
})
export class WizardStepsComponent extends WizardStep {
  get isSelected(): boolean {
    return this.index === this.wizardService.selectedIndex;
  }

  constructor(private readonly wizardService: WizardService) {
    super();
  }
}
