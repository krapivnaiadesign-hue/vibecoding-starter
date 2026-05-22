<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of your portfolio site with PostHog analytics. `posthog-js` was installed and initialized in `main.js` using environment variables from `.env`. Seven user interaction events were instrumented across the key interaction points of the site — case study navigation, the About Me panel, image/video lightbox, and contact link clicks. The integration covers both desktop and mobile viewports.

| Event | Description | File |
|---|---|---|
| `case_opened` | User clicks a portfolio case study to open it | `main.js` |
| `case_closed` | User closes an open portfolio case study | `main.js` |
| `about_opened` | User opens the About Me section | `main.js` |
| `about_closed` | User closes the About Me section | `main.js` |
| `cv_clicked` | User clicks the CV download link | `main.js` |
| `linkedin_clicked` | User clicks the LinkedIn profile link | `main.js` |
| `lightbox_opened` | User opens the image or video lightbox (with `media_type` property) | `main.js` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1617195)
- [Portfolio interactions over time](/insights/mWWbPZYe) — daily trend of all key engagement events
- [Case study to CV conversion funnel](/insights/FufWeQyL) — how many visitors who open a case also click your CV
- [Case opens by case ID](/insights/gJNBZJGY) — which case study gets the most views
- [Case opened vs case closed](/insights/ZtMwWjMi) — engagement depth / churn signal
- [Contact link clicks total](/insights/laxH1Fh6) — CV and LinkedIn clicks (strongest signal of recruiter interest)

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-javascript_node/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
