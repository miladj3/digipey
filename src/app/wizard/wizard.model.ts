import {ComponentRef, Directive, Input, Type} from "@angular/core";

@Directive()
export abstract class WizardStep {
  public index!: number;

  @Input()
  public title!: string;

  @Input()
  public isValid: boolean = false;

  @Input()
  public component!: Type<any>;
  public componentRef!: ComponentRef<any>;

  @Input()
  public data: any;

  @Input()
  public fieldName?: string;
}
