/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_DATABASE_NAME: string
  readonly VITE_SECRET_AES: string
  readonly VITE_APP_VERSION: string
  readonly VITE_AD_TENANT_ID: string
  readonly VITE_AD_CLIENT_ID: string
  readonly VITE_AD_REDIRECT_URI: string
  readonly VITE_AD_LOGOUT_REDIRECT_URI: string
  readonly VITE_AD_SCOPE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}