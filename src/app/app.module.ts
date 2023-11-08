import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { FormComponent } from "./components/form/form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TrimInputDirective } from "./directives/trim-input.directive";

@NgModule({
    declarations: [AppComponent, FormComponent, TrimInputDirective],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
