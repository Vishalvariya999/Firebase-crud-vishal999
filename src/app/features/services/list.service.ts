import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private afs = inject(AngularFirestore);

  getStudentData() {
    return this.afs.collection('student-details').snapshotChanges();
  }

  addStudent(data: any) {
    return this.afs.collection('student-details').add(data);
  }

  updateOnaddStudent(data: any) {
    return this.afs.collection('student-details').doc(data.id).set(data);
  }
}
