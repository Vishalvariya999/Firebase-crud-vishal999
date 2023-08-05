import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
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
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    ListService,
    AngularFirestore,
    AngularFireAuth,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public frm!: FormGroup;
  public studentsData: any[] = [];
  public faPen = faPen;
  public faTrash = faTrash;

  constructor(private fb: FormBuilder, private listService: ListService) {
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

  ngOnInit(): void {
    this.getStudentData();
  }

  public onSubmit() {
    if (this.frm.invalid) {
      return;
    }
    console.log('this.frm.value', this.frm.value);
    const data = {
      ...this.frm.value,
    };
    this.listService
      .addStudent(data)
      .then((res: any) => {
        console.log('res', res);
        const update_dat = {
          id: res.id,
          ...data,
        };
        this.listService
          .updateOnaddStudent(update_dat)
          .then((res: any) => {
            console.log('res', res);
            this.frm.reset();
          })
          .catch((err: any) => {
            console.log('err', err);
          });
      })
      .catch((err: any) => {
        console.log('err', err);
      });
  }

  private getStudentData() {
    this.listService.getStudentData().subscribe({
      next: (res: any) => {
        console.log('res', res);
        this.studentsData = res.map((data: any) => {
          const data1 = {
            id: data.payload.doc.id,
            ...data.payload.doc.data(),
          };
          return data1;
        });
        console.log('this.studentsData', this.studentsData);
      },
      error: (err: any) => {
        console.log('err', err);
      },
    });
  }
}
