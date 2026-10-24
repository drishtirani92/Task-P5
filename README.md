# DEV@Deakin - Task P5 (Newsletter)

SIT313 Secure Frontend Applications, Pass Task P5.

The React frontend (from P3, P4 and C1) is now connected to an ExpressJS backend.
The "Sign up for our daily insider" bar in the footer sends the email address to
the backend, and the backend uses the Mailjet email API to send a welcome email.

## Folders

```
frontend/   React + Vite website (home, login, sign up, post)
backend/    ExpressJS server (POST /api/subscribe)
```

## How the subscribe feature works

1. The user types an email in the footer and clicks Subscribe.
2. The frontend checks the email with Zod, then sends it to the backend with `fetch`.
3. The backend checks the email again with Zod and calls the Mailjet email API.
4. The backend prints the status code from the email API in the terminal.
5. The backend replies with a status code and message, and the frontend shows a popup.

| Situation | Status | Popup |
| --- | --- | --- |
| Email sent | 200 | Subscribed! |
| Invalid or missing email | 400 | Error message |
| Email API refused the request | 502 | Could not send the email |
| Missing API key or other server problem | 500 | Something went wrong |
| Backend not running | none | Could not reach the server |

## Run it

You need two terminals.

Backend:

```bash
cd backend
npm install
cp .env.example .env     # add your Mailjet keys
npm run dev
```

Frontend:

```bash
cd frontend
npm install
cp .env.example .env     # add your Firebase values and keep VITE_API_URL
npm run dev
```

Open http://localhost:5173 and use the footer to subscribe.
Both `.env` files are ignored by Git. Only the `.env.example` files are committed.
