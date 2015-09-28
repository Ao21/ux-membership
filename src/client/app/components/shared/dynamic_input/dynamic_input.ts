import {Component, View, bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';
import {FORM_DIRECTIVES, FORM_BINDINGS, NgFormModel, ControlGroup, Control, Validators} from 'angular2/forms';


@Component({selector: 'input-text', properties: ['controlPath: control', 'value: data']})
@View({
  template: `
    <div ng-form class="form-group">
      <label [attr.for]="controlPath">{{controlPath | uppercase}}</label>
      <input type="text" class="form-control" [id]="controlPath" [(ng-control)]="controlPath" [placeholder]="controlPath" [(ng-model)]="value">
      <show-error control="{{controlPath}}" [errors]="['required']"></show-error>
    </div>
  `,
  directives: [FORM_DIRECTIVES]
})
export class DynamicInput {
  controlPath: string;
  value: string;

  constructor() { }
}