import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ICity, IState} from "./personal-address.model";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-personal-address',
  templateUrl: './personal-address.component.html',
  styleUrls: ['./personal-address.component.scss']
})
export class PersonalAddressComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  private cities: Array<ICity> = [];
  public states: Array<IState> = [];
  public selectedCities: Array<ICity> = [];

  constructor(http: HttpClient) {
    forkJoin({
      state: http.get('assets/provinces.json'),
      city: http.get('assets/provinces_cities.json')
    }).subscribe(({state, city}) => {
      this.states = state as Array<IState>;
      this.cities = city as Array<ICity>;
    });
  }
  public ngOnInit(): void {
    this.form.get('state')?.setValidators([Validators.required, Validators.minLength(2)]);
    this.form.get('city')?.setValidators([Validators.required, Validators.minLength(2)]);
    this.form.get('address')?.setValidators([Validators.required]);
    this.form?.updateValueAndValidity();
  }

  public onChangeState(): void {
    this.selectedCities = this.cities.filter((city) => city.provinceId === this.form.get('state')?.value);
  }

  public ngOnDestroy(): void {
    this.form.get('state')?.clearValidators();
    this.form.get('state')?.updateValueAndValidity();
    this.form.get('city')?.clearValidators();
    this.form.get('city')?.updateValueAndValidity();
    this.form.get('address')?.clearValidators();
    this.form.get('address')?.updateValueAndValidity();
  }
}
