import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, OnDestroy {
  @Input() public form!: FormGroup;
  ngOnInit(): void {
    if (this.form) {
      this.form.get('name')?.setValidators([Validators.required, Validators.minLength(2)]);
      this.form.get('family')?.setValidators([Validators.required, Validators.minLength(2)]);
      this.form.get('nationalCode')?.setValidators([Validators.required, Validators.pattern(/^[0-9]{10}$/)]);
      this.form?.updateValueAndValidity();
    }
  }
  public ngOnDestroy(): void {
    this.form.get('name')?.clearValidators();
    this.form.get('family')?.clearValidators();
    this.form.get('nationalCode')?.clearValidators();
    this.form?.updateValueAndValidity();
  }
}
