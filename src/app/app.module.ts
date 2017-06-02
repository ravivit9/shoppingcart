/*=========================================================================
                                                          Angular Module Imports
=========================================================================*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
/*=========================================================================
                                                          Material Design Imports
=========================================================================*/
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/*=========================================================================
                                                          Component Imports
=========================================================================*/
import { AppComponent } from './app.component';

@NgModule({
    declarations: [ AppComponent ],
    imports: [ BrowserModule, FormsModule, HttpModule, MaterialModule, BrowserAnimationsModule ],
    bootstrap: [ AppComponent ],
    providers: [ ]
})
export class AppModule { }
