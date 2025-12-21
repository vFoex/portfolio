# Portfolio Deployment Guide

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO)

## Prerequisites

- GitHub account
- Vercel account (free)
- Sanity project configured

## Deployment Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-24
SANITY_API_TOKEN=your_api_token (optional, for revalidation)
REVALIDATE_SECRET=your_random_secret (optional, for webhook)
```

5. Click "Deploy"

### 3. Configure Sanity Webhook (Optional - For Auto-Revalidation)

To automatically update your site when you change content in Sanity:

1. Go to your Sanity project dashboard
2. Navigate to **API** → **Webhooks**
3. Click **Create webhook**
4. Configure:
   - **Name**: Vercel Revalidation
   - **URL**: `https://your-domain.vercel.app/api/revalidate?secret=YOUR_SECRET`
   - **Dataset**: production
   - **Trigger on**: Create, Update, Delete
   - **Filter**: `_type == "project" || _type == "skill"`
   - **HTTP method**: POST

5. Save the webhook

### 4. Add Custom Domain (Optional)

1. In Vercel dashboard, go to your project settings
2. Navigate to **Domains**
3. Add your custom domain
4. Update DNS records as instructed

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ Yes | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ Yes | Dataset name (usually "production") |
| `NEXT_PUBLIC_SANITY_API_VERSION` | ✅ Yes | API version (2024-11-24) |
| `SANITY_API_TOKEN` | ⚠️ Optional | For on-demand revalidation |
| `REVALIDATE_SECRET` | ⚠️ Optional | Secret for webhook security |

## Testing Revalidation

Test the webhook endpoint:

```bash
curl "https://your-domain.vercel.app/api/revalidate?secret=YOUR_SECRET"
```

## Troubleshooting

### Images not loading
- Ensure `cdn.jsdelivr.net` is in `next.config.ts` remote patterns
- Check that local images are in `public/skills/`

### Content not updating
- Check webhook is properly configured in Sanity
- Verify `REVALIDATE_SECRET` matches in both Vercel and Sanity webhook
- Check deployment logs in Vercel dashboard

### Build failures
- Verify all environment variables are set
- Check build logs for specific errors
- Ensure `SANITY_API_TOKEN` has read permissions

## Performance

- **Lighthouse Score**: Aim for 90+ on all metrics
- **Images**: Automatically optimized by Next.js
- **CDN**: Served globally via Vercel Edge Network
- **Caching**: Static pages cached, revalidated via webhook

## Support

For issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Check [Next.js Documentation](https://nextjs.org/docs)
- Check [Sanity Documentation](https://www.sanity.io/docs)
