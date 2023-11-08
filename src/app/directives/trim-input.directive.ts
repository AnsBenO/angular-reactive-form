import { Directive, ElementRef, HostListener } from "@angular/core";
import { NgControl, ControlValueAccessor } from "@angular/forms";

@Directive({ selector: "[trimInput]" })
export class TrimInputDirective {
    constructor(private ngControl: NgControl, private el: ElementRef) {
        trimValueAccessor(ngControl.valueAccessor as ControlValueAccessor);
    }
    @HostListener("blur", ["$event.target.value"])
    onBlur() {
        const trimmedValue = this.el.nativeElement.value.trim();
        this.el.nativeElement.value = trimmedValue;
    }
}

function trimValueAccessor(valueAccessor: ControlValueAccessor) {
    const original = valueAccessor.registerOnChange;

    valueAccessor.registerOnChange = (fn: (_: unknown) => void) => {
        return original.call(valueAccessor, (value: unknown) => {
            return fn(typeof value === "string" ? value.trim() : value);
        });
    };
}
