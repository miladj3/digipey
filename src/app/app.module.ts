import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {WizardModule} from "./wizard/wizard.module";
import { UploadComponent } from './upload/upload.component';
import {ReactiveFormsModule} from "@angular/forms";
import {PersonalInfoComponent} from "./personal-info/personal-info.component";
import { PersonalAddressComponent } from './personal-address/personal-address.component';
import {NationalCodeInputComponent} from "./personal-info/nationalCodeInput.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    PersonalInfoComponent,
    UploadComponent,
    PersonalAddressComponent,
    NationalCodeInputComponent
  ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		WizardModule,
		ReactiveFormsModule,
    HttpClientModule
	],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
