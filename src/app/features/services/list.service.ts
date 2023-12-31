import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private afs = inject(AngularFirestore);
  private http = inject(HttpClient);

  public getStudentData() {
    return this.afs.collection('student-details').snapshotChanges();
  }

  public addStudent(data: any) {
    return this.afs.collection('student-details').add(data);
  }

  public updateOnaddStudent(data: any) {
    return this.afs.collection('student-details').doc(data.id).set(data);
  }

  public deleteStudent(id: any) {
    return this.afs.collection('student-details').doc(id).delete();
  }

  public products() {
    return this.http.get(`https://dummyjson.com/products`);
  }
}
