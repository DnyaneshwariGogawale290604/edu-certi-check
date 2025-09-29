# CertSecure  
Tamper-Proof Academic Certificate Verification Platform

---

## 📌 Overview
CertSecure is a blockchain-powered platform that enables **universities**, **employers**, and **government boards** to
issue and verify academic certificates with **instant authenticity checks**.

- **Institutions** bulk-upload issued certificates.  
- **Employers** upload candidate certificates to verify their authenticity.  
- **Admin board** monitors network trends and authorizes new members.

Certificates are **not** stored on the blockchain.  
Instead, a **Merkle root (cryptographic fingerprint)** of each batch is recorded, making verification **fast, private, and tamper-proof**.

---

## 🚨 Problem
- Rampant **fake degrees** and **forged academic records**.
- Manual verification takes **2–4 weeks** and is costly.
- Legacy (pre-digital) certificates are difficult to authenticate.

---

## 💡 Solution
CertSecure provides a **single digital platform** where:
1. Institutes **issue** certificates and upload them in bulk.
2. A **Merkle tree** is generated from certificate hashes; **only the root hash** is written to a **Hyperledger Fabric** blockchain.
3. Employers upload a candidate certificate; OCR + hashing verifies the hash path against the on-chain root.
4. Admin dashboard displays **real-time ledger data**, member stats, and anomaly alerts.

---

## 🌟 Key Features
- **Blockchain-backed authenticity** using Hyperledger Fabric.
- **Legacy support** via OCR & AI anomaly detection (tampered photos, seals, grades).
- **Privacy-preserving**: only cryptographic hashes stored on-chain, PDFs remain off-chain (NAD/DigiLocker).
- **Bulk operations**: batch upload and instant verification.
- **Admin governance** with Membership Service Providers (MSPs) and role-based access.

---
