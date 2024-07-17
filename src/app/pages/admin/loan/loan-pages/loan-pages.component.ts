import { Component, inject } from '@angular/core';
import { LoanService } from '../../../../core/services/loan.service';
import { ILoan } from '../../../../core/models/types';
import { LoanCardComponent } from '../loan-card/loan-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-loan-pages',
  standalone: true,
  imports: [LoanCardComponent,RouterLink],
  templateUrl: './loan-pages.component.html',
  styleUrl: './loan-pages.component.css'
})
export class LoanPagesComponent {

  loans = inject(LoanService);
  
  loan : ILoan []=[]


  ngOnInit(): void {
    this.loadData()
    
    
  }

  loadData(){
   
    this.loans.getLoans().subscribe((resultado)=>{
      this.loan = resultado.resultado as ILoan[]
      this.filterListBook()
    })
  }

  filterListBook(){
    
    this.loan = this.loan.filter(loan=>
      loan.estado
    )
  
  }
}
