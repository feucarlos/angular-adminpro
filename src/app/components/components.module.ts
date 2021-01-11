import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IncrementadorComponent } from './incrementador/incrementador.component';



@NgModule({
  declarations: [IncrementadorComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ IncrementadorComponent ]
})

export class ComponentsModule { }
