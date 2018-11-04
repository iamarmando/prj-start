import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { DropDownDirective } from "./dropdown.directive";

@NgModule({
  declarations: [
    DropDownDirective
  ],
  exports: [
    CommonModule,
    DropDownDirective
  ]
})
export class SharedModule {

}