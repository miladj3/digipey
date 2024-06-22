import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {
  public form!: FormGroup;

  public get imageControl() {
    return this.form.get('image')!;
  }

  ngOnInit(): void {
    this.form.get('image')?.setValidators([Validators.required]);
    this.form.get('image')?.updateValueAndValidity();
  }

  public uploadImage(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.convertFileToBase64(file).then((base64: string) => {
      this.form.get('image')?.setValue(base64);
    });
  }

  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.onerror = reject;
      fileReader.readAsDataURL(file);
    });
  }

  public ngOnDestroy(): void {
    this.form.get('image')?.clearValidators();
    this.form.get('image')?.updateValueAndValidity();
  }
}
