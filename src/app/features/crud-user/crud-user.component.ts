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
  editingFactureId: number | null = null;
  deletingFactureId: number | null = null;
  showModal: boolean = false;

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

      if (this.editingFactureId) {
        this.factureService
          .updateFacture(facture, this.editingFactureId)
          .subscribe({
            next: () => {
              this.getFacture();
              this.createFactureForm.reset();
              this.editingFactureId = null;
            },
          });
      } else {
        this.factureService.insertFacture(facture).subscribe({
          next: () => {
            console.log('inserted');
            this.getFacture();
            this.createFactureForm.reset();
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
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

  onModifyClick(facture: FactureResponse) {
    this.editingFactureId = facture.id_facture;

    this.createFactureForm.patchValue({
      nom: facture.nom,
      date_facture: facture.date_facture,
      montant: facture.montant,
    });
  }

  showingModal(facture: FactureResponse) {
    this.showModal = true;
    this.deletingFactureId = facture.id_facture;
  }

  confirmDelete() {
    if(this.deletingFactureId) {
      this.factureService.deleteFacture(this.deletingFactureId).subscribe({
        next: () => {
          this.deletingFactureId = null;
          this.getFacture();
          this.showModal = false;
        }
      })
    }
  }
}
