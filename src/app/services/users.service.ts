import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private database: AngularFirestore) {}

    getAllUsers() {
      return this.database.collection('users', users=>users.orderBy('name')).valueChanges({idfilled: 'firebaseId'}) as Observable<any[]>;
    }

    addUser(user: any){
      return this.database.collection('users').add(user);
    }
    
    updateUser(userId:string, user: any){
      return this.database.collection('users').doc(userId).update(user);
    }

    deleteUser(userId: string){
     return this.database.collection('users').doc(userId).delete();
    }
}
