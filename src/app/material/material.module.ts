import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule } from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'

const materialComponent = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatFormFieldModule,
  MatRadioModule,
  MatInputModule,
  MatToolbarModule,
  MatDialogModule
]

@NgModule({
  declarations: [],
  imports: [materialComponent],
  exports: [materialComponent]
})
export class MaterialModule { }
