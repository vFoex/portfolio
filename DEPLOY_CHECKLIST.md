# Deployment Checklist

## ✅ Pre-Deployment

- [x] Code cleaned up (backup files removed)
- [x] Scripts archived
- [x] All text translated to English
- [x] All skills have icons and descriptions
- [x] Environment variables documented

## 🔧 Configuration Files Created

- [x] `vercel.json` - Vercel configuration
- [x] `.env.example` - Environment variables template
- [x] `app/api/revalidate/route.ts` - Webhook for auto-updates
- [x] `DEPLOYMENT.md` - Full deployment guide

## 📝 Required for Deployment

### Environment Variables to Add on Vercel:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=vfg6rxqf
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-24
SANITY_API_TOKEN=your_token_here
REVALIDATE_SECRET=6160115d2d07c6d41e7157eff84ff12d366069ac85d77b2596978441621ec41c
```

### Sanity Webhook Configuration:

Once deployed, configure in Sanity Dashboard:

**URL**: `https://YOUR_DOMAIN.vercel.app/api/revalidate?secret=6160115d2d07c6d41e7157eff84ff12d366069ac85d77b2596978441621ec41c`

**Filter**: `_type == "project" || _type == "skill"`

## 🚀 Deployment Steps

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Sign in to vercel.com
   - Import your GitHub repository
   - Add environment variables listed above
   - Deploy

3. **Configure Webhook**:
   - Add webhook URL in Sanity dashboard
   - Test with a content update

## ✨ Post-Deployment

- [ ] Test live site
- [ ] Verify images load correctly
- [ ] Test skill filtering
- [ ] Test project filtering
- [ ] Update content in Sanity and verify auto-revalidation
- [ ] Add custom domain (optional)
- [ ] Run Lighthouse audit

## 🔒 Security Notes

- `REVALIDATE_SECRET` is unique - keep it secure
- `SANITY_API_TOKEN` only needs read permissions
- Never commit `.env` files to git

## 📊 Expected Performance

- Lighthouse Score: 90+ on all metrics
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Global CDN delivery via Vercel Edge
