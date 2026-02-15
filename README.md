# CertiSafe V2 - Secure Digital Certification Management

**CertiSafe** is a premium, secure digital certification management platform built with Next.js 15. It empowers organizations to issue, manage, and verify professional certificates with ease.

## Key Features

- 🛡️ **Fraud Proof**: QR-based instant verification ensures authenticity and built-in tamper protection.
- 🕒 **Expiry Tracking**: Automated alerts for certificate renewals and expirations to keep your pros compliant.
- 📊 **Centralized Hub**: Manage all your templates and issuances in one place with powerful analytics.
- 🔐 **Secure Auth**: Robust authentication system with role-based access control.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: MySQL
- **Styling**: Tailwind CSS
- **Authentication**: JWT & Bcryptjs
- **Icons**: Lucide React
- **Verification**: HTML5-QR Code & QRCode

## Getting Started

First, set up your environment variables in `.env.local` (see `.env.example` if available), then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Database Setup & Troubleshooting

If you encounter `ECONNREFUSED 127.0.0.1:3306`, it means the application cannot connect to your MySQL database.

### 1. Local Development
Ensure your MySQL server (XAMPP, WAMP, or standalone) is running.
- **Diagnostic Tool**: Run `node scripts/check-db.js` to verify your `.env.local` settings.
- **Initialize Tables**: If the database is connected but tables are missing, run:
  ```bash
  node scripts/add-auth-tables.js
  node migrate-db.js
  ```

### 2. Vercel Deployment (Production)
Vercel cannot connect to `localhost`. You **must** use a hosted MySQL database:
1. Create a database on [Aiven](https://aiven.io/), [Railway](https://railway.app/), or [TiDB](https://www.pingcap.com/tidb-cloud/).
2. Add the following **Environment Variables** in your Vercel Project Settings:
   - `MYSQL_HOST`: Your remote host (e.g., `mysql-instance.aivencloud.com`)
   - `MYSQL_USER`: Your db username
   - `MYSQL_PASSWORD`: Your db password
   - `MYSQL_DATABASE`: `cert_db` (or your chosen name)
   - `NEXT_PUBLIC_BASE_URL`: `https://certificationmanagementsystem-nine.vercel.app`

## Learn More
...
