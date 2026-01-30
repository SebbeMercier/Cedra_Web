# Documentation de Déploiement CEDRA

## Architecture ISR Distribuée
L'application utilise **Valkey 8.0** comme store de cache partagé entre les instances Nomad. Cela permet :
1. Une cohérence du cache : si une instance régénère une page, toutes les autres en profitent.
2. Une persistence : le cache survit aux redémarrages des instances applicatives.
3. Une revalidation à la demande via `revalidateTag` et `revalidatePath`.

## Pré-requis
- Cluster **Nomad** 1.6+
- **Consul** pour le Service Discovery
- **Vault** pour la gestion des secrets
- **HAProxy** configuré pour le routing `/fr`, `/nl`, `/en`

## Procédure de Déploiement

### 1. Configuration des Secrets (Vault)
Ajoutez les secrets dans Vault sous le chemin `secret/cedra/prod` :
```bash
vault kv put secret/cedra/prod \
  revalidate_secret="votre_secret" \
  session_secret="votre_session_secret"
```

### 2. Déploiement de Valkey
Si Valkey n'est pas encore déployé :
```bash
nomad job run deployement/valkey.nomad
```

### 3. Build et Déploiement de l'App
Utilisez le script `deploy.sh` qui gère le build Docker avec Bun et la mise à jour Nomad :
```bash
chmod +x deployement/deploy.sh
./deployement/deploy.sh
```

## Stratégie de Mise à Jour (Canary)
Le job Nomad est configuré avec une stratégie **Canary** :
1. Nomad déploie 1 instance avec la nouvelle version.
2. HAProxy/Consul détectent l'instance.
3. Si l'instance passe le healthcheck (`/api/health`) pendant 60s, elle est considérée saine.
4. Vous devez promouvoir manuellement ou attendre la promotion automatique :
   ```bash
   nomad job promote cedra-storefront
   ```

## Monitoring & Troubleshooting
- **Logs** : `nomad alloc logs -f <alloc_id>`
- **Health** : `curl http://localhost:3000/api/health`
- **Cache Hit Rate** : Surveillez les métriques Valkey via l'exportateur Prometheus intégré.

## Rollback
En cas d'échec, Nomad effectue un rollback automatique vers la version précédente grâce à `auto_revert = true`.
Pour forcer un rollback manuel :
```bash
nomad job revert cedra-storefront <version_precedente>
```
