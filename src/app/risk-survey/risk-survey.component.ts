// TODO implement autosave feature (already done partly with ngOnDestroy)
// TODO fix answers feature.  If no answers exist, code breaks

import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionService} from "./question.service";
import {Question} from "../shared/question.model";
import {AnswerService} from "./answer.service";
import {DEFAULT_INTERRUPTSOURCES, Idle} from "@ng-idle/core";
import {Keepalive} from "@ng-idle/keepalive";
import {FileUploader} from "ng2-file-upload";
import {Answer} from "../shared/answer.model";

const URL = '../../assets/';

@Component({
  selector: 'app-risk-survey',
  templateUrl: './risk-survey.component.html',
  styleUrls: ['./risk-survey.component.css']
})

export class RiskSurveyComponent implements OnInit, OnDestroy {

  questions: Question[];
  answers: Answer[];

  progressScore = 0;
  riskScore = 100;
  itemsPerPage = 10;
  possibleValuesPerPage = [1, 3, 5, 10, 25, 50];
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  uploader: FileUploader = new FileUploader({url: URL});

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
        (questions: Question[]) => this.questions = questions
      );

    // Gets answer data from service
    this.answerService.getAnswers()
      .subscribe(
        (answers: Answer[]) => this.answers = answers
      );

  }

  // Tracks progress scores
  scoreTracker(i: number) {
    // this.progressScore = (this.answers.length / this.questions.length) * 100;
    const answer = new Answer(i);
    this.answerService.pushAnswers(answer);
    // console.log(i);
    // this.riskScore -= i;
  }

  // Resets user to non-idle state
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  // Monitors user activity
  idleMonitor() {
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
   console.log(this.answers);
   this.answerService.storeAnswers(this.answers);
     // .subscribe(
     //   data => console.log(data),
     //   error => console.error(error)
     // );
  }

  checkUrl(event: any) {
    console.log(event);
  }

  // This is not always called (navigating away by URL)
  // Only called if information in answers has changed from when it was loaded
  ngOnDestroy() {
  }

}
