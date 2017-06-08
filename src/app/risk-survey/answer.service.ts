import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AnswerService {

  constructor(private http: Http) {}

  getAnswers() {
    return this.http.get('https://risk3sixty.firebaseio.com/answers.json')
      .map(
        (response: Response) => {
          const answers = response.json();
          return answers;
        }
      ).catch((error: Response) => Observable.throw(error.json()));
  }

  storeAnswers(answers: any[]) {
    return this.http.put('https://risk3sixty.firebaseio.com/answers.json', answers);
  }
}
