import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";
import {EmailInputComponent} from "../email-input/email-input.component";

@Component({
  selector: 'app-default-input',
  templateUrl: './default-input.component.html',
  styleUrls: ['./default-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailInputComponent),
      multi: true
    },{
      provide: NG_VALIDATORS,
      useExisting: EmailInputComponent,
      multi: true
    }
  ]
})
export class DefaultInputComponent implements ControlValueAccessor {
  @Input() type: "string" | "email" | "password" = "string"
  @Input() label: string | undefined
  @Input() hint: string | undefined
  @Input() minLength: string | undefined
  @Input() maxLength: string | undefined
  @Input() errorMessage: string | undefined
  @Input() required: boolean | string = true
  @Input() disabled: boolean = false
  @Input() autocapitalize: string | undefined
  @Input() routerLink: any[] | string | null | undefined;
  @Input() value: string = ""
  @Input() style: string | undefined
  @Input() placeholder: string = ""
  @Input() pattern: string = "";
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() click = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() select = new EventEmitter<any>();
  @Output() dblClick = new EventEmitter<any>();
  @Output() keyDown = new EventEmitter<any>();
  @Output() keyUp = new EventEmitter<any>();


  onChange = (_: string) => {
  }
  onTouched = () => {
  }
  touched = false;

  markAsTouched() {
    if (!this.touched) {
      this.touched = true
      this.onTouched()
    }
  }

  constructor() {
  }

  onClick($event: MouseEvent) {
    this.click.emit($event)
  }

  onSelect($event: Event) {
    this.select.emit($event)
  }

  onDblCLick($event: MouseEvent) {
    this.dblClick.emit($event)
  }

  onKeyDown($event: KeyboardEvent) {
    this.keyDown.emit($event)
  }

  onKeyUp($event: KeyboardEvent) {
    this.keyUp.emit($event)
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn
  }

  writeValue(obj: string) {
    this.value = obj
  }

  setValue(value: string){
    if(this.onTouched) this.onTouched();
    this.value = value
    if(this.onChange) this.onChange(value)
    this.click.emit(value)
   /* if(!this.disabled){
      this.markAsTouched()
      this.value = value
      this.onChange(this.value)
    }*/
  }

  validate({value}: FormControl, pattern: string | null) {
    console.log("HELP")
    if (!this.pattern || !pattern) {
      return value ? {
        required: true
      } : {
        required: false
      }
    } else {
      let regex: RegExp
      regex = new RegExp(pattern!)
      return regex.test(value) ? {
        pattern: true
      } : {
        pattern: false
      }
    }
  }
}
