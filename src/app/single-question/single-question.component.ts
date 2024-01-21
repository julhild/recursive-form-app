import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormQuestion } from './question.model';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html'
})

export class SingleQuestionComponent implements OnChanges {
  @Input() question?: FormQuestion;
  @Output() valueChanged = new EventEmitter<boolean>();

  invalidBorder = 'solid 2px var(--red)';
  validBorder = 'solid 2px var(--light-blue-background)';
  textInput = '';

  ngOnChanges(): void {
    if (this.question?.inputType === 'text') {
      this.textInput = this.question?.value?.toString() ?? '';
    }
  }

  onValueChange(): void {
    this.valueChanged.emit();
  }

  addFollowUp(question: FormQuestion): void {
    question.hidden = false;
    question.required = question.value === null || question.value.toString().trim() === '';
  }

  removeFollowUp(question: FormQuestion): void {
    question.hidden = true;
    question.required = false;
  }

  onCheckboxChange(event: Event, input: string): void {
    const inputEvent = event as unknown as Record<string, undefined>;
    const isBoxChecked = inputEvent['target']?.['checked'] as unknown as boolean;

    if (this.question) {
      if (input === 'Yes') {
        this.question.value = isBoxChecked ? true : null;
      }

      if (input === 'No') {
        this.question.value = isBoxChecked ? false : null;
      }

      this.question.required = this.question?.value === null;

      if (this.question?.followUps) {
        this.question.followUps.forEach((q: FormQuestion) => {
          if (this.question?.showFollowUpValue === this.question?.value) {
            this.addFollowUp(q);
          } else {
            this.removeFollowUp(q);
          }
        });
      }
    }

    this.valueChanged.emit(true);
  }

  onTextChange(event: Event): void {
    if (this.question) {
      this.question.value = event as unknown as string;
      this.question.required = this.question.value.trim() === '';
      this.valueChanged.emit(false);
    }
  }
}
