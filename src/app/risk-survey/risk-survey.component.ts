//TODO implement autosave feature (already done partly with ngOnDestroy)
//TODO implement pagination feature

import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionService} from "./question.service";
import {Question} from "../shared/question.model";
import {AnswerService} from "./answer.service";
import {DEFAULT_INTERRUPTSOURCES, Idle} from "@ng-idle/core";
import {Keepalive} from "@ng-idle/keepalive";

@Component({
  selector: 'app-risk-survey',
  templateUrl: './risk-survey.component.html',
  styleUrls: ['./risk-survey.component.css']
})

export class RiskSurveyComponent implements OnInit, OnDestroy {

  questions: Question[];
  answers: any[] = [];
  progressScore = 0;
  riskScore = 100;
  collection = [];

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
    private idle: Idle,
    private keepalive: Keepalive) {}

  ngOnInit() {

    this.idleMonitor();
    this.reset();

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
    // if (this.questions.length !== null) {
    //   for (let i = 1; i <= this.questions.length; i++) {
    //     this.collection.push(`item ${i}`);
    //   }
    // }

  }

  // Tracks progress scores
  scoreTracker(i: number) {
    this.progressScore = (this.answers.length / this.questions.length) * 100;
    this.riskScore -= i;
    console.log(i);
    console.log(this.riskScore);
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  idleMonitor(){
    this.idle.setIdle(1);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(1);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
    });
    this.idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    this.idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    // sets the ping interval to 15 seconds
    this.keepalive.interval(15);

    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
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
