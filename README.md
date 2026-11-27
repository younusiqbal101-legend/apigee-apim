# APIM repository (Apigee X artifacts)

Bootstrap this repository with the contents of this folder. The API Developer Portal commits generated artifacts here on
`portal/<proxy-name>` branches and opens a PR to `develop`.

```
ci/                      Jenkinsfile.proxy | .sharedflow | .targetserver | .kvm | .truststore
proxies/<name>/apiproxy  generated proxy bundles (+ README.md per proxy)
sharedflows/<name>/sharedflowbundle
targetservers/<env>/<name>.json
kvms/<env>/<name>.json   secret entries hold only Secret Manager references
products/<name>.json
apps/<env>/<app>.json    app metadata – never credentials
truststore/<env>/*.pem   partner client certificates for northbound mTLS
tests/smoke/<proxy>.sh   optional smoke tests executed after deployment
```

Platform shared flows that the portal references (deploy once per environment):

| Shared flow | Purpose | In this bootstrap |
|---|---|---|
| `sf-mtls-cert-binding-v1` | Verifies the client certificate fingerprint forwarded by the LB matches the `certFingerprint` app attribute | ✅ included |
| `sf-logging-v1` | Structured logging to Cloud Logging (MessageLogging) | build per platform standard |
| `sf-pii-masking-v1` | Masks personal data before logging | build per platform standard |
| `sf-response-cache-v1` | Response cache keyed by client_id + path | build per platform standard |

The platform OAuth token proxy (`/oauth/v1/token`, OAuthV2 GenerateAccessToken with client_credentials) must also exist per environment.

Required Jenkins credentials: `apigee-deployer-sa` (secret file, roles/apigee.apiAdminV2 + roles/apigee.environmentAdmin +
roles/secretmanager.secretAccessor), `apigee-network-sa` (Certificate Manager admin), `github-apim` (repo read).
