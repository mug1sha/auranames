# auranames

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_aVIeM5gLRbHs4fNYZDBOUfOU3K8o)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Payment System (USDT TRC20)

AuraNames uses a manual USDT (TRC20) verification system for MVP launch.

### Setup Instructions

1.  **Environment Variables**: Add the following to your `.env.local`:
    *   `NEXT_PUBLIC_USDT_NETWORK=TRC20`
    *   `NEXT_PUBLIC_USDT_SYMBOL=USDT`
    *   `NEXT_PUBLIC_USDT_RECEIVING_ADDRESS=your_wallet_address`
2.  **Database**: Ensure the `payments` and `users` collections are initialized in Firestore.

### Workflow

1.  **User**: Selects a plan on the `/pricing` page.
2.  **User**: Redirected to `/dashboard/billing/payment` where they see the wallet address and unique reference.
3.  **User**: Sends USDT via TRC20 and submits the Transaction Hash (TXID).
4.  **Admin**: Reviews the transaction at `/admin/payments`.
5.  **Admin**: Verifies the TXID on TronScan and clicks **Approve**.
6.  **System**: Automatically activates the user's subscription and grants access to premium features.

### Admin Access (Authorization)
The Admin Dashboard (`/admin/payments`) is protected by:
1.  **UI Gating**: User emails must be listed in the `ADMIN_EMAILS` array in `app/(protected)/admin/payments/page.tsx`.
2.  **Database Security (Crucial)**: Access **MUST** be enforced via **Firestore Security Rules**. The frontend check is easily bypassable; real security resides at the database level.

**Example Firestore Rule for Admin Protection:**
```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    match /payments/{paymentId} {
      allow read, write: if request.auth != null && 
        request.auth.token.email in ["admin@auranames.ai", "godson.mugisha2015@gmail.com"];
    }
  }
}
```
