import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroupDirective, Validators } from "@angular/forms";
import { matchPasswords } from "src/app/validators/matchPasswords.validator";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-form",
    templateUrl: "./form.component.html",
    styleUrls: ["./form.component.css"],
})
export class FormComponent implements OnInit {
    // ViewChild decorator to access the FormGroupDirective instance,
    // which provides access to the form-related directives and methods.
    @ViewChild(FormGroupDirective)
    formDirective!: FormGroupDirective;

    registerForm = this.fb.group(
        {
            userName: [
                "",
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.pattern(/^ *[a-zA-Z0-9_ -]+ *$/),
                ],
            ],
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required]],
            confirmPassword: ["", [Validators.required]],
            roleId: [null, [Validators.required]],
        },
        {
            validators: matchPasswords,
        }
    );

    isSubmitted = false;
    xMark = faXmarkCircle;
    roles = [
        { id: null, title: "Choose a role" },
        { id: 1, title: "developer" },
        { id: 2, title: "architect" },
    ];

    constructor(private fb: FormBuilder) {}

    public ngOnInit(): void {}

    public onSubmit(): void {
        console.log(
            "submitted form",
            this.registerForm.value,
            this.registerForm.invalid
        );
        this.isSubmitted = true;
        // Reset the form to its initial state using the FormGroupDirective.
        this.formDirective.resetForm();
    }

    // Check if the form control is invalid and if it has been both touched and dirty.
    // If both conditions are met, return true; otherwise, return false.
    public isInvalidInput(inputName: string): boolean {
        return this.registerForm.get(inputName)?.invalid &&
            this.isDirtyAndTouched(inputName)
            ? true
            : false;
    }

    // Check if the form control is both dirty and touched.
    // If both conditions are met, return true; otherwise, return false.
    // A control is marked touched once the user has triggered a blur event on it.
    // A control is dirty if the user has changed the value in the UI.
    public isDirtyAndTouched(inputName: string): boolean {
        return this.registerForm.get(inputName)?.dirty &&
            this.registerForm.get(inputName)?.touched
            ? true
            : false;
    }
}
