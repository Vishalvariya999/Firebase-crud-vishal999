import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ListService } from '../../services/list.service';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FontAwesomeModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  providers: [AngularFirestore, AngularFireAuth, ListService],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public frm!: FormGroup;
  public studentsData: any[] = [];
  public faPen = faPen;
  public faTrash = faTrash;
  public btnName: string = 'Save';
  public userId!: string;
  public genders: any = [
    {
      name: 'Male',
      value: 'Male',
    },
    {
      name: 'Female',
      value: 'Female',
    },
  ];

  public statuses: any = [
    {
      name: 'Active',
      value: 'Active',
    },
    {
      name: 'In Avtive',
      value: 'In Avtive',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private listService: ListService,
    private sweetAlertService: SweetAlertService
  ) {
    this.validationFrm();
  }

  private validationFrm() {
    this.frm = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      status: [null, [Validators.required]],
    });
  }

  get fControl() {
    return this.frm.controls;
  }

  ngOnInit(): void {
    this.getStudentData();
  }

  public onSubmit() {
    if (this.frm.invalid) {
      this.sweetAlertService.error('Please form fill properly');
      return;
    }
    console.log('this.frm.value', this.frm.value);
    let data = {
      ...this.frm.value,
    };
    if (this.userId) {
      console.log('this.userId', this.userId);
      data = {
        ...this.frm.value,
        id: this.userId,
      };
      this.updateData(data);
      this.userId = '';
    } else {
      this.listService
        .addStudent(data)
        .then((res: any) => {
          console.log('res', res);
          const update_dat = {
            id: res.id,
            ...data,
          };
          this.updateData(update_dat);
        })
        .catch((err: any) => {
          console.log('err', err);
        });
    }
  }

  private updateData(update_dat: any) {
    this.listService
      .updateOnaddStudent(update_dat)
      .then((res: any) => {
        console.log('update_dat', update_dat);
        // console.log('res', res);
        this.frm.reset();
        update_dat.id
          ? this.sweetAlertService.success('Insert successfully')
          : this.sweetAlertService.success('Update data successfully');
      })
      .catch((err: any) => {
        console.log('err', err);
        this.sweetAlertService.error('Please fill properly');
      });
  }
  private getStudentData() {
    this.listService.getStudentData().subscribe({
      next: (res: any) => {
        // console.log('res', res);
        this.studentsData = res.map((data: any) => {
          const data1 = {
            id: data.payload.doc.id,
            ...data.payload.doc.data(),
          };
          return data1;
        });
        // console.log('this.studentsData', this.studentsData);
      },
      error: (err: any) => {
        console.log('err', err);
      },
    });
  }

  public onEdit(data: any) {
    console.log('data', data);
    this.userId = data.id;
    this.frm.patchValue(data);
    // this.btnName = 'Update';
  }

  public onDelete(id: string) {
    console.log('id', id);
    this.sweetAlertService.confirm().subscribe({
      next: (res: any) => {
        console.log('res', res);
        if (res.isConfirmed) {
          this.listService
            .deleteStudent(id)
            .then((res: any) => {
              console.log('res', res);
              this.sweetAlertService.success('Data delete succesfully');
            })
            .catch((err: any) => {
              console.log('err', err);
            });
        } else {
          this.sweetAlertService.error('Your imaginary file is safe :)');
        }
      },
    });
  }
}
