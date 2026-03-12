import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditService } from 'src/app/core/services/auditService/audit.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuditModel } from 'src/app/models/auditModel';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss'],
})
export class AuditComponent implements OnInit {
  audit: AuditModel[] = [];
  auditStat: { [key: string]: number } = {
    CREATE: 0,
    UPDATE: 0,
    DELETE: 0,
  };

  constructor(
    private auditService: AuditService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auditService.getAllAudit().subscribe({
      next: (response) => {
        console.log(response);
        this.audit = response;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.auditService.countingAudit().subscribe({
      next: (response) => {
        response.forEach((item) => {
          this.auditStat[item.action_type] = item.total;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  logout() {
    this.authService.logoutAdmin();
    this.router.navigate(['/loginAdmin']);
  }
}
