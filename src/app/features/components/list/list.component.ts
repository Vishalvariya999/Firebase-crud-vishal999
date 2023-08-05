import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public frm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.validationFrm();
  }

  private validationFrm() {
    this.frm = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      gender: [null, [Validators.required]],
    });
  }

  get fControl() {
    return this.frm.controls;
  }

  public onSubmit() {
    if (this.frm.invalid) {
      return;
    }
    console.log('this.frm.value', this.frm.value);
  }
}
