# Connecting AuthModal to the backend — the one pending change

Everything server-side is live and tested. The only missing link is inside
`src/components/AuthModal.jsx`, which currently *simulates* success with a
`setTimeout` and never contacts a server (lines 28–41). Per the "don't touch
the frontend" instruction this file was **not** modified — apply the change
below whenever you're ready (or ask and it will be applied for you).

## The change

Replace the current `handleSubmit` (lines 28–41) with:

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const endpoint = activeTab === 'login' ? 'login' : 'register';
    const res = await fetch(`http://localhost:4500/api/auth/${endpoint}`, {
      method: 'POST',
      credentials: 'include', // required — the session is a cookie
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    });
    const data = await res.json();
    setIsLoading(false);
    if (!res.ok) {
      alert(data.error || 'Authentication failed');
      return;
    }
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      // Editors and admins land in the CMS dashboard, already signed in
      if (data.user.role !== 'VIEWER') {
        window.location.href = data.dashboardUrl; // http://localhost:4400/dashboard
      }
    }, 1200);
  } catch {
    setIsLoading(false);
    alert('Could not reach the server — is backend/server.mjs running?');
  }
};
```

That's the entire integration: same fields the form already collects
(`name`, `email`, `password`), same success animation, plus a real session.

## Why this works with zero other changes

- The backend sets the `qt_admin_session` cookie for host `localhost`.
  Browsers scope cookies by host, **not port**, so the cookie set at `:4500`
  is automatically sent to the dashboard at `:4400` → the user arrives at
  `/dashboard` already authenticated.
- CORS for `http://localhost:5173` (the Vite dev server) is already allowed
  by the backend, including credentials.
- Verified end-to-end with curl: backend login → dashboard page `200` →
  dashboard API `200` → backend logout → dashboard `401`.

## Production notes

- Replace the hard-coded `http://localhost:4500` with
  `import.meta.env.VITE_BACKEND_URL` when deploying.
- The Sign-Up tab hits `/api/auth/register`, which returns 403 until you start
  the backend with `ALLOW_PUBLIC_SIGNUP=true` (new accounts are read-only
  VIEWERs; promote them in the dashboard's Users & Roles).
- In production put site + backend + dashboard behind the same parent domain
  (e.g. `quolytech.com`, `api.quolytech.com`, `cms.quolytech.com`) and set the
  cookie `Domain` accordingly, over HTTPS.
