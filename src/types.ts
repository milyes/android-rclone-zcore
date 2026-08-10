export type TabType = "readme" | "terminal" | "remotes" | "vault" | "cert" | "ai" | "crypto";

export interface Remote {
  id: string;
  name: string;
  type: "drive" | "onedrive" | "s3" | "dropbox" | "sftp" | "local";
  encrypted: boolean;
  encPass: string;
  status: "active" | "queued" | "offline";
  lastSync: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  target: string;
  hash: string;
  signature: string;
  dilithiumVerified?: boolean;
  publicKeyFingerprint?: string;
  signatureBytes?: number;
  tamperProofState?: "VALID" | "REVOKED" | "WARNING";
}

export interface LocalFile {
  path: string;
  size: string;
  modified: string;
  encryptedName: string;
  status: "synced" | "pending" | "offline_queued";
}
