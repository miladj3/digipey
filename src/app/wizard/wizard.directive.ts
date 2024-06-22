import {Directive, Input, OnInit, Type, ViewContainerRef} from '@angular/core';
import {WizardStep} from "./wizard.model";

@Directive({
  selector: '[wizardStep]'
})
export class WizardDirective extends WizardStep implements OnInit {
  @Input('wizardStep') override component!: Type<any>;
  @Input('fieldName') override fieldName?: string;
  @Input('data') override data: any;

  constructor(
    public readonly viewContainerRef: ViewContainerRef) {
    super();
  }

  ngOnInit() {
    this.loadComponent();
  }

  private loadComponent() {
    if (!this.component) {
      return;
    }
    this.viewContainerRef?.clear();
    this.componentRef = this.viewContainerRef.createComponent(this.component);
    if (this.fieldName && this.data) {
      this.componentRef.instance.form = this.data;
    }
    queueMicrotask(() => {
    });
  }
}
