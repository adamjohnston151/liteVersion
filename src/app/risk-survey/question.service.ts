import {Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Injectable} from "@angular/core";
import {Question} from "../shared/question.model";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";

const API_URL = environment.apiUrl;

@Injectable()

export class QuestionService {

  private questions: Question[] = [];

  constructor(private http: Http) {}

  getQuestions() {
    return this.http.get(API_URL + '/questions')
      .map(
        (response: Response) => {
          // const questions = response.json().obj;
          // let transformedQuestions: Question[] = [];
          // for (let question of questions){
          //   transformedQuestions.push(new Question(question.guidance, question.title, question.riskWeighting));
          // }
          // this.questions = transformedQuestions;
          // return transformedQuestions;
          return response.json();
        }).catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
