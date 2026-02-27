import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

// Load certificates from ./certs — generate them with mkcert (instructions below)
const certDir = path.resolve(__dirname, 'certs')
const certFile = path.join(certDir, 'localhost.pem')
const keyFile = path.join(certDir, 'localhost-key.pem')

let httpsConfig = false
if (fs.existsSync(certFile) && fs.existsSync(keyFile)) {
  httpsConfig = {
    key: fs.readFileSync(keyFile),
    cert: fs.readFileSync(certFile),
  }
} else {
  // If certs are missing, Vite will fall back to HTTP and log a message.
  console.warn('HTTPS certificates not found in %s — falling back to HTTP.\nRun mkcert to create certs: https://github.com/FiloSottile/mkcert', certDir)
}

export default defineConfig({
  server: {
    https: httpsConfig,
    host: true,
    port: 5173,
  },
})
