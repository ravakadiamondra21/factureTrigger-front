import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FactureService } from 'src/app/core/services/factureService/facture.service';
import { CreateFactureModel } from 'src/app/models/createFactureModel';
import { FactureResponse } from 'src/app/models/factureResponseModel';

@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.component.html',
  styleUrls: ['./crud-user.component.scss'],
})
export class CrudUserComponent {
  createFactureForm!: FormGroup;

  factures: FactureResponse[] = [];

  constructor(
    private factureService: FactureService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createFactureForm = this.formBuilder.group({
      nom: ['', Validators.required],
      date_facture: ['', Validators.required],
      montant: ['', Validators.required],
    });

    this.getFacture();
  }

  onSubmit() {
    if (this.createFactureForm.valid) {
      const facture: CreateFactureModel = {
        nom: this.createFactureForm.get('nom')?.value,
        date_facture: this.createFactureForm.get('date_facture')?.value,
        montant: this.createFactureForm.get('montant')?.value,
      };

      this.factureService.insertFacture(facture).subscribe({
        next: (response) => {
          console.log('inserted');
          this.getFacture();
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  getFacture() {
    this.factureService.selectAllFacture().subscribe({
      next: (response) => {
        this.factures = response;

        console.log(this.factures);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
