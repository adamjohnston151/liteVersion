// TODO implement autosave feature (already done partly with ngOnDestroy)
// TODO fix answers feature.  If no answers exist, code breaks

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Question} from '../shared/question.model';
import {FileUploader} from 'ng2-file-upload';
import {DataService} from './data.service';
import {DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {Answer} from '../shared/answer.model';

const URL = '../../assets/';

@Component({
  selector: 'app-risk-survey',
  templateUrl: './risk-survey.component.html',
  styleUrls: ['./risk-survey.component.css']
})

export class RiskSurveyComponent implements OnInit, OnDestroy {


  answers: Answer[] = [];
  idleState = 'Not started.';
  itemsPerPage = 10;
  lastPing?: Date = null;
  possibleValuesPerPage = [1, 3, 5, 10, 25, 50];
  progressScore = 0;
  questions: Question[];
  riskScore = 100;
  timedOut = false;
  uploader: FileUploader = new FileUploader({url: URL});

  constructor(
    private dataService: DataService,
    private idle: Idle,
    private keepalive: Keepalive) {}

  ngOnInit() {

    this.idleMonitor();
    this.reset();

    // Gets question data from service
    this.dataService.getQuestions()
      .subscribe(
        (questions: Question[]) => this.questions = questions
      );

    // Gets answer data from service
    this.dataService.getAnswers()
      .subscribe(
        (answers: Answer[]) => this.answers = answers
      );

  }

  // Tracks progress scores
  scoreTracker(sliderValue: number, i: number) {
    // this.progressScore = (this.answers.length / this.questions.length) * 100;
    this.answers.push(new Answer(sliderValue));
    console.log(sliderValue);
    console.log(this.answers);
    // this.riskScore -= i;
  }

  updateValue(i: number) {
    console.log(this.answers[i]);
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
    this.idle.setTimeout(1);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
    });
    this.idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    this.idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');
    this.keepalive.interval(15);
    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
  }

  onSave() {
   this.dataService.storeAnswers(this.answers);
     // .subscribe(
     //   data => console.log(data),
     //   error => console.error(error)
     // );
  }

  // This is not always called (navigating away by URL)
  // Only called if information in answers has changed from when it was loaded
  ngOnDestroy() {
  }

}
