export interface AuditModel {
  id_audit: number;
  username: string;
  action_type: string;
  action_timestamp: string;
  host_name: string;
  montant_ancien: number;
  montant_nouveau: number;
  nom: string;
}
