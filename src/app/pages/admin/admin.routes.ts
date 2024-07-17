import { Routes } from '@angular/router';
import path from 'path';
import { BookPagesComponent } from './book-pages/book-pages.component';
import { BookAddComponent } from './book-add/book-add.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { LoanPagesComponent } from './loan/loan-pages/loan-pages.component';
import { LoanAddComponent } from './loan/loan-add/loan-add.component';
import { LoanEndsComponent } from './loan/loan-ends/loan-ends.component';


export const routesadmin: Routes = [
    {
        path: 'bookpages',
        component: BookPagesComponent,
    },
    {
        path: 'addbook',
        component: BookAddComponent,
    },
    {
        path: 'detailsbook/:id',
        component: BookDetailsComponent
    },
    {
        path: 'editbook/:id',
        component: BookEditComponent
    },
    {
        path:'loanpages',
        component: LoanPagesComponent
    },
    {
        path: 'loanadd/:id',
        component: LoanAddComponent
    },
    {
        path: 'loanEnd',
        component: LoanEndsComponent
    }
    
]