import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UploadComponent} from "./upload/upload.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PersonalInfoComponent} from "./personal-info/personal-info.component";
import {PersonalAddressComponent} from "./personal-address/personal-address.component";
import {WizardService} from './wizard/wizard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  protected readonly PersonalInfoComponent = PersonalInfoComponent;
  protected readonly UploadComponent = UploadComponent;
  protected readonly PersonalAddressComponent = PersonalAddressComponent;
  protected form!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              public readonly wizardService: WizardService) {
    this.form = this.formBuilder.group({
      name: [null],
      family: [null],
      nationalCode: [null],
      image: [null],
      state: [null],
      city: [null],
      address: [null]
    });
  }

  private initSaveFormState(): void {
    this.form.valueChanges.subscribe(value => {
      localStorage.setItem('formState', JSON.stringify(value));
    });
  }

  public ngAfterViewInit(): void {
    const savedFormState = localStorage.getItem('formState');
    if (savedFormState) {
      this.form.patchValue(JSON.parse(savedFormState));
      this.initSaveFormState();
      const stepIndex = localStorage.getItem('stepIndex');
      if (stepIndex){
        this.wizardService.goToStep(+stepIndex);
      }
    } else
      this.initSaveFormState();
  }

  public onStepChange(step: number) {
    localStorage.setItem('stepIndex', step.toString());
  }
}
