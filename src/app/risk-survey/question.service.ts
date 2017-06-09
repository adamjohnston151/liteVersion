import {Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Injectable} from "@angular/core";
import {Question} from "../shared/question.model";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl;

@Injectable()
export class QuestionService {

  constructor(private http: Http) {}

  getQuestions() {
    return this.http.get(API_URL + '/todos')
      .map(
        (response: Response) => {
          const questions: Question[] = response.json();
          return questions;
        }
      ).catch((error: Response) => Observable.throw(error.json()));
  }

}
