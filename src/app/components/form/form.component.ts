import { Component, OnInit } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from "@angular/forms";
import { matchPasswords } from "src/app/validators/matchPasswords.validator";

@Component({
    selector: "app-form",
    templateUrl: "./form.component.html",
    styleUrls: ["./form.component.css"],
})
export class FormComponent implements OnInit {
    registerForm = this.fb.group(
        {
            userName: [
                "",
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.pattern(/^[a-zA-Z0-9_-]+$/),
                ],
            ],
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required]],
            confirmPassword: ["", [Validators.required]],
            roleId: [1, [Validators.required]],
        },
        {
            validators: matchPasswords,
        }
    );

    isSubmitted = false;
    roles = [
        { id: 1, title: "developer" },
        { id: 2, title: "architect" },
    ];

    constructor(private fb: FormBuilder) {}

    public ngOnInit(): void {
        this.registerForm.get("roleId")?.valueChanges.subscribe(roleId => {
            console.log("SEND API AND UPDATE ROLE", roleId);
        });
    }

    public onSubmit(): void {
        console.log(
            "submitted form",
            this.registerForm.value,
            this.registerForm.invalid
        );
        this.isSubmitted = true;
    }

    public isInvalidInput(inputName: string): boolean {
        return this.registerForm.get(inputName)?.invalid &&
            this.isDirtyOrTouched(inputName)
            ? true
            : false;
    }

    public isDirtyOrTouched(inputName: string): boolean {
        return this.registerForm.get(inputName)?.dirty ||
            this.registerForm.get(inputName)?.touched
            ? true
            : false;
    }
}
