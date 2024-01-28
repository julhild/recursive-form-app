### Recursive Angular Form

Recursive functions are an interesting and useful programming technique where  a function is a part of its own definition: the function calls on itself. Recursion can be imperative to solve certain type of problems where the outcome depends on the outcome from the smaller parts of the problem. 
Hier we would like to look at [an example of a dynamic web form](https://stackblitz.com/~/github.com/julhild/recursive-form-app) built using Angular framework where each question can have an arbitrary number and also an arbitrary depth of follow-up questions.
To implement a form with  dynamic number of questions using Angular can be straight forward by applying the directive ngFor. However, to build a dynamic form that also accommodates nested questions with dynamically-defined depth can appear at first sight challenging. And that’s where it gets interesting.

Basically, this kind of form can also be described as a dynamic tree with nodes having an arbitrary depth. To construct such a tree using Angular we need only two components: a parent component that has functionalities involving the whole form and a child component which represents a single question, the answer input and the involved validation process. The trick here is that the child or single question component also calls itself if there are follow-up questions that are relevant. A condition to involve further questions (or nodes) can be defined as part of the form data structure. It is actually a crucial step while  implementing any kind of recursion: a condition for recursion to stop.

Defined by the type of question, the template of the single question can accommodate a various kinds of inputs: checkbox, text, number, dropdown and so on. The current example implements two type of questions: checkboxes and text inputs. Depending on the checkbox input, the further questions are displayed and handled. The same can be done for any kind of input: a value or an array of values to which the input should correspond for the further questions to be shown is a part of the form data structure. Like in beforementioned example, the first question needs to be answered with ‘no’ and the second one with ‘yes’ for the follow-up to be displayed.
The form is implemented in the following way: the initial questions are called by the parent or form component. These questions are hosted by the single question component that contains their template, evaluates the input, propagates the result of validation back to its parent component and moreover calls on the following questions. The following questions are also hosted by the single question component and so on and so on. 

The inputs for the single questions are validated inside of component intermediately hosting them and the changes are propagated back to the form component using the two-way data-binding mechanism in Angular. If the question is not hosted directly by the form component, but by another single-question component, it first shoots the event to parent single-question component. The parent component sends it higher-up the hierarchy till it reaches the form component. The form component evaluates then the validity of the complete form. The example here shows the case, when the form cannot be saved if any displayed inputs are invalid.

The single-question component, therefore, can serve as a child and a parent component as many times as needed to cover the depth of the initial question till the last follow-up question. By using @Input and @Output decorators the data and events are shared through direct hierarchy defined by the form data structure. 
Angular is a powerful JavaScript framework and has proven itself as a solid and reliable tool for web development. It also can be used for implementing recursive components. These represent a critical ingredient for programming a dynamic tree-like form with follow-up questions that can have their own follow-ups of an arbitrary depth. And all this can be constructed by using only two components and build-in Angular tools.







