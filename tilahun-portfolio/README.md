# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Forms & Contact setup

This project supports two ways to receive contact form submissions:

- Formspree (client-side JS submission)
- Netlify Forms (static form handling when deployed to Netlify)

To use Formspree:

1. Create a Formspree form at https://formspree.io and copy the form ID (looks like `f/xxxxx`).
2. Create a `.env` file at the project root with:

```
VITE_FORMSPREE_ID=f/your_form_id_here
VITE_CALENDLY_URL=https://calendly.com/yourname
```

3. Restart the dev server and submit the form — the app will send the POST via fetch and show inline feedback.

To use Netlify Forms:

1. Deploy the site to Netlify. The contact form includes `data-netlify="true"` and the required hidden inputs so Netlify will capture submissions.
2. Netlify captures submissions automatically and offers email notifications or forwarding.

Testing locally

- With Formspree configured you can submit via the form in dev and check Formspree dashboard for submissions.
- Without Formspree, Netlify submissions require a Netlify deploy.
