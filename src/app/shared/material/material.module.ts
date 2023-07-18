import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule,

  ],
  exports: [
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [
  ]
})

export class MaterialModule {}