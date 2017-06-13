import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()

export class UserProfileService {

  constructor(private http: Http) {}

  savePicture(picture: string) {
   return this.http.put('gs://risk3sixty.appspot.com/', picture);
  }

  getPicture() {
    return this.http.get('https://firebasestorage.googleapis.com/' +
      'v0/b/risk3sixty.appspot.com/o/' +
      'happyFace.png?alt=media&token=1b574a85-d491-4dc4-b93b-52633926a0e0')
      .map(
        (response: Response) => console.log(response),
      );
  }
}
