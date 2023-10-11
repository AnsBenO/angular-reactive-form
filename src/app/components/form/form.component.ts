import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: "app-form",
    templateUrl: "./form.component.html",
    styleUrls: ["./form.component.css"],
})
export class FormComponent implements OnInit {
    registerForm = this.fb.group({
        userName: [
            "",
            [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{4,16}$/)],
        ],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required]],
        roleId: [1, [Validators.required]],
    });

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
            (this.registerForm.get(inputName)?.dirty ||
                this.registerForm.get(inputName)?.touched)
            ? true
            : false;
    }
}
