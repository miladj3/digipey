import {Component, OnInit} from '@angular/core';
import {UploadComponent} from "./upload/upload.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PersonalInfoComponent} from "./personal-info/personal-info.component";
import {PersonalAddressComponent} from "./personal-address/personal-address.component";
import { WizardService } from './wizard/wizard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	protected readonly PersonalInfoComponent = PersonalInfoComponent;
  protected readonly UploadComponent = UploadComponent;
  protected readonly PersonalAddressComponent = PersonalAddressComponent;
  public form!: FormGroup;
  constructor(private readonly formBuilder: FormBuilder,
              public readonly wizardService: WizardService) {

  }
  public ngOnInit(): void {
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
}
