//TODO implement autosave feature (already done partly with ngOnDestroy)
//TODO implement pagination feature

import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionService} from "./question.service";
import {Question} from "../shared/question.model";
import {AnswerService} from "./answer.service";

@Component({
  selector: 'app-risk-survey',
  templateUrl: './risk-survey.component.html',
  styleUrls: ['./risk-survey.component.css']
})

export class RiskSurveyComponent implements OnInit, OnDestroy{

  questions: Question[];
  answers: any[] = [];
  progressScore = 0;
  riskScore = 100;
  collection = [];

  constructor(private questionService: QuestionService, private answerService: AnswerService) { }

  ngOnInit() {

    // Gets question data from service
    this.questionService.getQuestions()
      .subscribe(
        (questions: any[]) => this.questions = questions
      );

    // Gets answer data from service
    this.answerService.getAnswers()
      .subscribe(
        (answers: any[]) => this.answers = answers
      );

    // Used for pagination (ngx-pagination)
    for (let i = 1; i <= this.questions.length; i++) {
      this.collection.push(`item ${i}`);
    }

  }

  // Tracks progress scores
  scoreTracker(i: number) {
    this.progressScore = (this.answers.length / this.questions.length) * 100;
    this.riskScore -= i;
    console.log(i);
    console.log(this.riskScore);
  }

  onSave() {
    this.answerService.storeAnswers(this.answers).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  checkAnswers() {
    console.log(this.answers);
  }

  // This is not always called (navigating away by URL)
  // Only called if information in answers has changed from when it was loaded
  ngOnDestroy() {
   this.answerService.storeAnswers(this.answers);
  }

}
