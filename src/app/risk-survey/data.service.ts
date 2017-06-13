import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/Rx';
import {Answer} from '../shared/answer.model';
import {Question} from '../shared/question.model';

@Injectable()

export class DataService {

  private answers: Answer[] = [];
  private questions: Question[] = [];

  constructor(private http: Http) {}

  getQuestions() {
    return this.http.get('http://localhost:3003/questions')
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

  getAnswers() {
    return this.http.get('http://localhost:3004/answers')
      .map(
        (response: Response) => {
          return response.json();
        }
      ).catch(this.handleError);
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

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
