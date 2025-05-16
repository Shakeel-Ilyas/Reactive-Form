import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CustomValidator } from './Validators/noSpaceAllowed.validator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'angular-reactive-form';
  formStatus: string = '';
  formdata: any;

  reactiveForm: FormGroup;

  showFormSubmittedOrNotSubmitted: boolean | '';

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, [
        Validators.required,
        CustomValidator.noSpaceAllowed,
      ]),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(
        null,
        Validators.required,
        CustomValidator.checkUserName
      ),
      dob: new FormControl(null, Validators.required),
      gender: new FormControl('male'),
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        country: new FormControl('Japan', Validators.required),
        city: new FormControl(null, Validators.required),
        region: new FormControl(null, Validators.required),
        postal: new FormControl(null, Validators.required),
      }),
      skills: new FormArray([new FormControl(null, Validators.required)]),
      experience: new FormArray([]),
    });

    // this.reactiveForm.get('firstname').valueChanges.subscribe((value)=>{
    //   console.log(value)
    // })

    // this.reactiveForm.valueChanges.subscribe((value)=>{
    //   console.log(value);
    // })

    // this.reactiveForm.get('username').statusChanges.subscribe((status)=>{
    //   console.log(status)
    // })

    // this.reactiveForm.statusChanges.subscribe((status)=>{

    //   console.log(status)
    //   this.formStatus = status;
    // })
  }

  OnFormSubmitted() {

    if (this.reactiveForm.valid) {
      
      this.formdata = this.reactiveForm.value;

      this.showFormSubmittedOrNotSubmitted = true;

      setTimeout(() => {
        this.showFormSubmittedOrNotSubmitted = '';
      }, 5000);

      this.reactiveForm.reset({
        firstname: null,
        lastname: null,
        email: null,
        username: null,
        dob: null,
        gender: 'male',
        address: {
          street: null,
          country: 'Nepal',
          city: null,
          region: null,
          postal: null,
        },
        skills: [null],
        experience: [],
      });
    } else {
      this.showFormSubmittedOrNotSubmitted = false;
      // setTimeout(() => {
      //   this.showFormSubmittedOrNotSubmitted = '';
      // }, 5000);

      this.reactiveForm.get('firstname').markAsTouched();
      this.reactiveForm.get('lastname').markAsTouched();
      this.reactiveForm.get('email').markAsTouched();
      this.reactiveForm.get('username').markAsTouched();
      this.reactiveForm.get('dob').markAsTouched();
      this.reactiveForm.get('address.street').markAsTouched();
      this.reactiveForm.get('address.city').markAsTouched();
      this.reactiveForm.get('address.region').markAsTouched();
      this.reactiveForm.get('address.postal').markAsTouched();
      this.reactiveForm.get('skills')['controls'].forEach((skillInputField) => {
        skillInputField.markAsTouched();
      });
    }
  }

  AddSkills() {
    (<FormArray>this.reactiveForm.get('skills')).push(
      new FormControl(null, Validators.required)
    );
  }

  DeleteSkill(index: number) {
    const controls = <FormArray>this.reactiveForm.get('skills');
    controls.removeAt(index);
  }

  AddExperience() {
    let formgroup = new FormGroup({
      company: new FormControl(null),
      position: new FormControl(null),
      totalExp: new FormControl(null),
      start: new FormControl(null),
      end: new FormControl(null),
    });

    (<FormArray>this.reactiveForm.get('experience')).push(formgroup);
  }

  DeleteExperience(index: number) {
    const formArray = <FormArray>this.reactiveForm.get('experience');
    formArray.removeAt(index);
  }

  GenerateUsername() {
    let username = '';
    const fName: string = this.reactiveForm.get('firstname').value;
    const lName: string = this.reactiveForm.get('lastname').value;
    const dob: string = this.reactiveForm.get('dob').value;

    if (fName.length >= 3) {
      username += fName.slice(0, 3);
    } else {
      username += fName;
    }

    if (lName.length >= 3) {
      username += lName.slice(0, 3);
    } else {
      username += lName;
    }

    let datetime = new Date(dob);
    username += datetime.getFullYear();

    username = username.toLowerCase();

    // console.log(username);

    // this.reactiveForm.setValue({
    //   firstname: this.reactiveForm.get('firstname').value,
    //   lastname: this.reactiveForm.get('lastname').value,
    //   email: this.reactiveForm.get('email').value,
    //   username: username,
    //   dob: this.reactiveForm.get('dob').value,
    //   gender: this.reactiveForm.get('gender').value,
    //   address: {
    //     street: this.reactiveForm.get('address.street').value,
    //     country: this.reactiveForm.get('address.country').value,
    //     city: this.reactiveForm.get('address.city').value,
    //     region: this.reactiveForm.get('address.region').value,
    //     postal: this.reactiveForm.get('address.postal').value
    //   },
    //   skills: this.reactiveForm.get('skills').value,
    //   experience: this.reactiveForm.get('experience').value
    // })

    // this.reactiveForm.get('username').setValue(username);

    this.reactiveForm.patchValue({
      username: username,
      address: {
        city: 'Tokyo',
      },
    });
  }
}
