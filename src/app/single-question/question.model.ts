export class FormQuestion {
  id: string;
  title: string;
  inputType: string;
  value: string | boolean | null;
  hidden: boolean;
  required: boolean;
  showFollowUpValue: boolean | null;
  followUps!: FormQuestion[];

  constructor(question: FormQuestion) {
    this.id = question.id;
    this.title = question.title;
    this.inputType = question.inputType;
    this.value = question.value;
    this.hidden = question.hidden;
    this.required = question.required;
    this.showFollowUpValue = question.showFollowUpValue;

    if (question.followUps?.length > 0) {
      this.followUps = [];
      question.followUps.forEach((q: FormQuestion) => this.followUps.push(new FormQuestion(q)));
    }
  }

  // clearing the hidden answers when saving the form
  clearFollowUps() {
    this.followUps.forEach((q: FormQuestion) => {
      if (q.hidden) {
        q.value = null;
      }

      if (q.followUps) {
        q.clearFollowUps();
      }
    });
  }
}
