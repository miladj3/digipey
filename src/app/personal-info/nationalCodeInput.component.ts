import {Component, forwardRef, Injector, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

@Component({
  selector: 'national-code-input',
  template: `<input type="text"
                    [class.border-error]="ngControl?.control?.invalid && (ngControl?.control?.touched || ngControl?.control?.dirty)"
                    placeholder="Your National Code"
                    [value]="ngControl?.control?.value"
                    (blur)="onTouch()"
                    (input)="updateValue($any($event.target).value)"
                    (keydown)="validateInput($event)">`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NationalCodeInputComponent),
      multi: true
    }
  ]
})
export class NationalCodeInputComponent implements ControlValueAccessor, OnInit {
  public ngControl!: NgControl;
  private static readonly PATTERN = /^[0-9]*$/;
  private static readonly NAVIGATION_KEYS = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
  ];

  constructor(private injector: Injector) { }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl);
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  onChange: any = () => {
  };
  onTouch: any = () => {
    console.log('Something touched me')
  };

  writeValue(value: any): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    console.log('Something touched me')
    this.onTouch = fn;
  }

  updateValue(value: any): void {
    if (NationalCodeInputComponent.PATTERN.test(value)) {
      this.ngControl.control?.setValue(value);
      this.onChange(value);
    }
  }

  validateInput(event: any): void {
    if (!NationalCodeInputComponent.PATTERN.test(event.key) && !NationalCodeInputComponent.NAVIGATION_KEYS.includes(event.key)) {
      event.preventDefault();
    }
  }
}
