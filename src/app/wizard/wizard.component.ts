import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  OnDestroy, OnInit,
  Output,
  QueryList,
} from '@angular/core';
import {WizardService} from "./wizard.service";
import {WizardStepsComponent} from "./wizard-steps.component";
import {WizardStep} from "./wizard.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html'
})
export class WizardComponent implements AfterContentInit, OnInit, OnDestroy {
  @ContentChildren(WizardStepsComponent) public steps: QueryList<WizardStepsComponent> = new QueryList<WizardStepsComponent>()
  @Output() public stepChanged: EventEmitter<void> = new EventEmitter<void>();

  private currentStep!: WizardStep;
  private showNextStepWatcher!: Subscription;
  private showPreviousStepWatcher!: Subscription;
  constructor(public readonly wizardService: WizardService) {
  }

  public ngOnInit() {
    this.showNextStepWatcher = this.wizardService.showNextStep$.subscribe(() => this.showNextStep());
    this.showPreviousStepWatcher = this.wizardService.showPreviousStep$.subscribe(() => this.showPreviousStep());
  }

  public ngAfterContentInit() {
    this.steps.forEach((step, index) => {
      step.index = index;
    });
    this.showStep(this.steps.first);
  }

  public showSelectedStep(event: Event, selectedStep: WizardStepsComponent) {
    event.preventDefault();

    if (selectedStep.index !== this.wizardService?.selectedIndex && this.currentStep.isValid) {
      this.showStep(selectedStep);
    }
  }

  public showNextStep(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.showStep(this.steps.find((step) => step.index === this.wizardService?.selectedIndex + 1) ?? this.steps.first);
  }

  public showPreviousStep(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.showStep(this.steps.find((step) => step.index === this.wizardService?.selectedIndex - 1) ?? this.steps.last);
  }

  private showStep(selectedStep: WizardStepsComponent) {
    if ((selectedStep.index >= this.steps.length || selectedStep.index < 0) || (selectedStep.index === this.wizardService?.selectedIndex)) {
      return;
    }
    this.wizardService.setIndex(selectedStep.index);
    this.currentStep = selectedStep;
    //TODO: this.router.navigate([], { fragment: selectedStep.title, replaceUrl: false });
    this.stepChanged.emit();
  }

  public ngOnDestroy() {
    this.showNextStepWatcher.unsubscribe();
    this.showPreviousStepWatcher.unsubscribe();
  }
}
