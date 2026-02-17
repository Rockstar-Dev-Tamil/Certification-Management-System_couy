# CertiSafe V2 - Secure Digital Certification Management

**CertiSafe** is a premium, institutional-grade digital certification management platform built with Next.js 15. It empowers organizations to issue, manage, and verify professional credentials with cryptographic certainty.

## 🚀 Enterprise-Grade Architecture
- **Supabase Powered**: High-availability PostgreSQL backend.
- **Vercel Optimized**: Global Edge delivery for instant verification.
- **Cryptographic DNA**: Sha-256 integrity hashing on every asset.

## Key Features
- 🛡️ **Fraud Proof**: QR-based instant verification with cryptographic tamper protection.
- 🔍 **Advanced Intelligence**: Real-time search and status filtering (Valid/Revoked) for thousands of assets.
- 📑 **Institutional Frameworks**: Dedicated **Template Manager** to define and evolve credential designs.
- 👥 **Identity Auditing**: Centralized **User Manager** to monitor institutional participants and issuance stats.
- ⚙️ **Protocol Control**: Unified **System Settings** for infrastructure orchestration and security toggles.
- 📥 **One-Click Manifests**: Generate CSV exports for ledger audits and personal records.
- 📱 **Adaptive UI**: High-density "Command Center" dashboard with intelligent mobile scaling.

## Tech Stack
- **Framework**: Next.js 15 (App Router / Server Components)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS (Glassmorphism & SaaS Aesthetics)
- **Security**: JWT, Bcryptjs, SHA-256 Hashing, HMAC-based Integrity
- **Icons**: Lucide React

## Getting Started

### 1. Database Setup
1. Create a project at [Supabase](https://supabase.com/).
2. Run the provided `supabase_schema.sql` in the Supabase SQL Editor.
3. Add the following environment variables to your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key
   - `JWT_SECRET`: A secure random string for tokens
   - `NEXT_PUBLIC_BASE_URL`: The production URL for QR verification

### 2. Run Locally
```bash
npm install
npm run dev
```

## Production Deployment
The project is optimized for **Vercel**. Every push to the `main` branch trigger an automated build and deployment with the latest UI and protocol updates.
