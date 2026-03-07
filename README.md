# 2FAS Authenticator

Search and copy TOTP codes from [2FAS](https://2fas.com) exports directly in Raycast. No cloud, no network calls — your secrets stay local in a Keychain-encrypted vault.

![Search OTP](metadata/search-otp.png)

## Features

- **Search OTP** — Browse all services with native Raycast filtering and live countdown
- **Recent OTP** — Quick-access pinned and recently used services
- **Import Vault** — Import encrypted `.2fas` export files
- **Setup** — Check vault status, re-import, or delete

## Why

2FAS is a great mobile authenticator, but it has no desktop app. This extension bridges that gap by importing your 2FAS export and generating TOTP codes locally on your Mac.

## Setup

1. Open 2FAS on your phone
2. Go to **Settings > 2FAS Backup > Export** (set a password)
3. Transfer the `.2fas` file to your Mac (AirDrop, iCloud Drive, etc.)
4. In Raycast, run **Import Vault** and select the file
5. Done — run **Search OTP** to find and copy codes

## Security Model

- **Vault key** stored in the macOS login Keychain via `/usr/bin/security`
- **Vault file** is AES-256-GCM encrypted at `~/Library/Application Support/Raycast/extensions/.../vault.enc` with `0600` permissions
- **Import** decrypts the `.2fas` file in memory (PBKDF2 + AES-256-GCM), then re-encrypts into the local vault
- **No plaintext secrets on disk** — secrets exist only in memory during runtime
- **No network calls** — everything is offline
- **Concealed clipboard** — copied OTP codes are excluded from clipboard history
- **Zero external crypto dependencies** — uses Node.js `crypto` module only

### Known Limitations

- The vault key is passed as a CLI argument to `/usr/bin/security` (briefly visible in the process list to same-user processes). This is an inherent limitation of the macOS `security` CLI.
- Secrets remain in the Node.js heap for the lifetime of the extension process. JavaScript has no secure memory zeroing.

## Commands

| Command | Description |
|---------|-------------|
| Search OTP | Search all services, copy codes with live countdown |
| Recent OTP | Access pinned and recently used services |
| Import Vault | Import a `.2fas` export file |
| Setup | View vault status and manage configuration |

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build
npm run build

# Lint
npm run lint
```

## Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change.

## License

[MIT](LICENSE)
