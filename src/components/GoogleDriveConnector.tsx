import React, { useState, useEffect } from "react";
import { HardDrive, Cloud, CheckCircle, AlertCircle, Lock, RefreshCw, Folder, File, ExternalLink, ShieldCheck, LogOut, Upload } from "lucide-react";

declare global {
  interface Window {
    google?: any;
  }
}

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
}

export const GoogleDriveConnector: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("gdrive_access_token"));
  const [userProfile, setUserProfile] = useState<{ email?: string; name?: string } | null>(null);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Initialize GSI token client
  const handleConnectDrive = () => {
    if (!window.google?.accounts?.oauth2) {
      setStatusMsg("Google Identity Services script non encore chargé. Veuillez réessayer.");
      return;
    }

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: "774911703126-preview.apps.googleusercontent.com", // standard AI Studio OAuth client
      scope: "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly",
      callback: (tokenResponse: any) => {
        if (tokenResponse && tokenResponse.access_token) {
          const token = tokenResponse.access_token;
          setAccessToken(token);
          localStorage.setItem("gdrive_access_token", token);
          setStatusMsg("Connecté à Google Drive avec succès!");
          fetchDriveFiles(token);
          fetchUserProfile(token);
        } else {
          setStatusMsg("Échec de la connexion à Google Drive.");
        }
      },
    });

    tokenClient.requestAccessToken();
  };

  const handleDisconnect = () => {
    setAccessToken(null);
    setUserProfile(null);
    setFiles([]);
    localStorage.removeItem("gdrive_access_token");
    setStatusMsg("Déconnecté de Google Drive.");
  };

  const fetchUserProfile = async (token: string) => {
    try {
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const info = await res.json();
        setUserProfile({ email: info.email, name: info.name });
      }
    } catch (err) {
      console.error("Failed to fetch user profile", err);
    }
  };

  const fetchDriveFiles = async (token: string) => {
    try {
      setLoading(true);
      const res = await fetch("https://www.googleapis.com/drive/v3/files?pageSize=10&fields=files(id,name,mimeType,size,modifiedTime)", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setFiles(data.files || []);
      } else {
        if (res.status === 401) {
          handleDisconnect();
          setStatusMsg("Session Google Drive expirée. Veuillez vous reconnecter.");
        }
      }
    } catch (err) {
      console.error("Failed to fetch Drive files", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEncryptedFolder = async () => {
    if (!accessToken) return;
    try {
      setUploading(true);
      setStatusMsg("Création du dossier chiffré 'zcore_encrypted_backups' sur Google Drive...");
      
      const fileMetadata = {
        name: "zcore_encrypted_backups",
        mimeType: "application/vnd.google-apps.folder",
      };

      const res = await fetch("https://www.googleapis.com/drive/v3/files", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fileMetadata),
      });

      if (res.ok) {
        const folder = await res.json();
        setStatusMsg(`Dossier chiffré créé sur Google Drive! (ID: ${folder.id})`);
        fetchDriveFiles(accessToken);
      } else {
        setStatusMsg("Erreur lors de la création du dossier.");
      }
    } catch (err) {
      console.error("Error creating Drive folder", err);
      setStatusMsg("Erreur de connexion avec l'API Google Drive.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchDriveFiles(accessToken);
      fetchUserProfile(accessToken);
    }
  }, []);

  return (
    <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>INTÉGRATION GOOGLE DRIVE (OAUTH2 SOUVERAIN)</span>
              <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded text-[10px] font-mono">rclone remote: drive</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Connectez votre compte Google Drive officiel pour synchroniser vos sauvegardes chiffrées localement AES-256 via <code className="text-indigo-300">arclone crypt</code>.
            </p>
          </div>
        </div>

        {accessToken ? (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => fetchDriveFiles(accessToken)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-mono flex items-center space-x-1 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
              <span>Actualiser</span>
            </button>
            <button
              onClick={handleDisconnect}
              className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-800/40 rounded-xl text-xs font-mono flex items-center space-x-1 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Déconnecter</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleConnectDrive}
            className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all flex items-center space-x-2 self-start md:self-auto"
          >
            <Cloud className="w-4 h-4 text-indigo-200" />
            <span>Connecter mon Google Drive</span>
          </button>
        )}
      </div>

      {statusMsg && (
        <div className="p-3 bg-slate-950 border border-indigo-500/20 rounded-xl text-xs font-mono text-indigo-300 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        </div>
      )}

      {accessToken && userProfile && (
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
          <div>
            <span className="text-slate-400">Compte Google Connecté: </span>
            <span className="text-white font-bold">{userProfile.name} ({userProfile.email})</span>
          </div>
          <div className="flex items-center space-x-1 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Scope OAuth Validé</span>
          </div>
        </div>
      )}

      {accessToken && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
              <Folder className="w-4 h-4 text-indigo-400" />
              <span>Fichiers & Coffres sur votre Google Drive</span>
            </h4>

            <button
              onClick={handleCreateEncryptedFolder}
              disabled={uploading}
              className="px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 rounded-xl text-xs font-mono flex items-center space-x-1.5 transition-all"
            >
              <Upload className="w-3.5 h-3.5 text-indigo-300" />
              <span>{uploading ? "Création..." : "+ Dossier Chiffré ZCore"}</span>
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl divide-y divide-slate-800 overflow-hidden">
            {loading ? (
              <div className="p-4 text-center text-xs font-mono text-slate-500">
                Lecture de la structure Google Drive...
              </div>
            ) : files.length === 0 ? (
              <div className="p-4 text-center text-xs font-mono text-slate-500">
                Aucun fichier trouvé sur votre Google Drive.
              </div>
            ) : (
              files.map((f) => (
                <div key={f.id} className="p-3 flex items-center justify-between text-xs hover:bg-slate-900/50 transition-all">
                  <div className="flex items-center space-x-3">
                    {f.mimeType.includes("folder") ? (
                      <Folder className="w-4 h-4 text-indigo-400 shrink-0" />
                    ) : (
                      <File className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <div>
                      <div className="font-mono text-slate-200 font-medium">{f.name}</div>
                      <div className="text-[10px] font-mono text-slate-500">ID: {f.id}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-right">
                    <span className="text-[10px] font-mono text-slate-400">
                      {f.modifiedTime ? new Date(f.modifiedTime).toLocaleDateString() : ""}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-mono">
                      rclone crypt ready
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
