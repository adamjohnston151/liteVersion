import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

import 'rxjs/Rx';
import {Answer} from "../shared/answer.model";

@Injectable()

export class AnswerService {

  private answers: Answer[] = [];

  constructor(private http: Http) {}

  getAnswers() {
    return this.http.get('http://localhost:3004/answers')
      .map(
        (response: Response) => {
          return response.json();
        }
      ).catch((error: Response) => Observable.throw(error.json()));
  }

  // Push new update values into array
  pushAnswers(answer: Answer) {
    this.answers.push(answer);
    console.log(this.answers);
  }

  storeAnswers(answers: Answer[]) {
    const body = JSON.stringify(answers);
    console.log(body);
    // const headers = new Headers({'Content-Type': 'application/json'});
    // return this.http.post('http://localhost:3004/answers', body, {headers: headers})
    //   .map((response: Response) => {
    //     return response.json();
    //   });
  }
}
