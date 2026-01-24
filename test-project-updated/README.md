# Realistic Resources - Updated Project

## 🎉 What's Been Updated

Your project now includes:

✅ **Olive color (#696344)** added to CSS variables
✅ **Gumroad overlay script** on all pages (seamless email collection)
✅ **Updated resources.html** with proper Gumroad buttons
✅ **PDF templates** ready to populate with content
✅ **Improved accessibility** with aria-labels on all buttons
✅ **Loading="lazy"** on images for better performance

---

## 📁 Your Project Files

```
test-project-updated/
├── index.html                    # Homepage
├── resources.html                # Resources page (UPDATED with Gumroad)
├── about.html                    # About page
├── videos.html                   # Videos page
├── products.html                 # Products page
├── styles.css                    # Styles (UPDATED with olive color)
├── script.js                     # JavaScript for filters & mobile menu
├── pdf-template-blank.html       # Empty template for new resources
└── pdf-template-example.html     # Complete example to reference
```

---

## 🎨 New Olive Color Added

**Color:** #696344 (darker, earthy accent)

**Available as CSS variable:**
```css
var(--color-olive)
```

**Where to use it:**
- Headings (H3, H4) for variety
- Link hover states
- Emphasis text
- Borders for visual depth
- Pairs beautifully with sage (#96ad90)

**Example usage:**
```css
h3 {
    color: var(--color-olive);
}
```

---

## 🔗 Gumroad Overlay Setup

**What it does:**
Opens a popup on your site instead of redirecting to Gumroad.

**How it works:**
1. User clicks "Get Free Resource"
2. Gumroad popup appears on your page
3. User enters email
4. Download starts
5. User stays on your site

**The script is already added** to all HTML pages at the bottom:
```html
<script src="https://gumroad.com/js/gumroad.js"></script>
```

**Buttons use this class:**
```html
<a href="https://yourname.gumroad.com/l/product-slug" 
   class="btn btn-secondary btn-small gumroad-button">
   Get Free Resource
</a>
```

The `gumroad-button` class triggers the overlay!

---

## ⚠️ ACTION REQUIRED: Update Gumroad URLs

All resource buttons currently have placeholder URLs:
```
https://yourname.gumroad.com/l/...
```

**You need to:**
1. Create products on Gumroad
2. Get the actual URLs
3. Replace "yourname" with your Gumroad username
4. Replace the product slug with your actual product slug

**Find and replace:**
- Open `resources.html`
- Search: `yourname.gumroad.com`
- Replace with: `your-actual-username.gumroad.com`

---

## 🚀 Quick Start Guide

### To View Your Website:
1. Double-click `index.html`
2. Opens in browser - click through all pages
3. Everything works locally!

### To Create Your First Resource:
1. Open `pdf-template-blank.html` in a text editor (VS Code recommended)
2. Find and replace all `[bracketed text]` with your content
3. Save the file
4. Open in Chrome → Print → Save as PDF
5. Upload PDF to Gumroad
6. Copy Gumroad URL
7. Update `resources.html` with the URL

### To Deploy Your Website:
1. Go to netlify.com/drop
2. Drag this entire folder
3. Get instant live URL
4. (Optional) Connect your domain later

---

## 📝 Current Resource Cards

Your resources.html has these resources ready (just need Gumroad URLs):

**AI & Work:**
- Break Tasks Into an Actionable Plan
- Managing Ambiguity Prompt
- Interviewing for a Job Prompt
- Navigating Crucial Conversations
- Work Packing List & Planning Prompt
- Managing Ambiguity at Work (Coming Soon)

**Food & Hosting:**
- Smart Sous Chef: Hosting & Planning
- Smart Sous Chef: Expanded System (Coming Soon)
- Menu Planning for a Party

**Life & Capacity:**
- Low-Energy Day Systems (Coming Soon)
- Everyday Decision-Making Frameworks (Coming Soon)

---

## 🎯 Next Steps

### Today:
1. [ ] View your website locally (double-click index.html)
2. [ ] Sign up for Gumroad if you haven't
3. [ ] Create your first PDF using pdf-template-blank.html

### This Week:
1. [ ] Upload 3-5 PDFs to Gumroad (set to $0, enable email collection)
2. [ ] Copy Gumroad URLs
3. [ ] Update resources.html with real URLs (replace "yourname")
4. [ ] Test the Gumroad overlay
5. [ ] Deploy to Netlify

### This Month:
1. [ ] Create remaining resources
2. [ ] Monitor which ones are popular
3. [ ] Gather user feedback
4. [ ] Consider converting some to paid

---

## 🎨 Using the New Olive Color

**In your CSS (already added to variables):**
```css
/* Example: Update H3 headings to use olive */
h3 {
    color: var(--color-olive);
}

/* Example: Olive link hover */
a:hover {
    color: var(--color-olive);
}

/* Example: Olive border */
.special-box {
    border-left: 4px solid var(--color-olive);
}
```

**In PDF templates:**
Update the hex code directly in the `<style>` section:
```css
.prompt-box {
    border-left: 4px solid #696344;
}
```

---

## 💡 Pro Tips

### For PDFs:
- Keep them 5-10 pages max
- Use the prompt box for the main content
- Always include 1-2 examples
- Test print preview before finalizing

### For Gumroad:
- Write descriptions matching your website cards
- Enable email collection on ALL products
- Check your Gumroad profile looks professional
- Test the full flow in incognito mode

### For Website:
- Images load lazy (good for performance)
- All buttons have proper aria-labels (accessibility)
- Mobile menu works automatically
- Filter system works without changes

---

## 🔧 Common Customizations

### Change button colors:
Edit `styles.css` around line 313:
```css
.btn-secondary {
    background-color: transparent;
    color: var(--color-charcoal);
    border: 1px solid var(--color-charcoal);
}

.btn-secondary:hover {
    background-color: var(--color-olive); /* Changed from charcoal */
    color: var(--color-ivory);
}
```

### Add more resource cards:
Copy an existing card in `resources.html` and update:
- `data-type` (ai-work, food-hosting, life-capacity)
- Image URL and alt text
- Title and description
- Gumroad URL

### Change fonts:
They're loaded from Google Fonts (already in `<head>`):
- Caveat (script)
- Cormorant Garamond (serif)
- Inter (sans-serif)

---

## 📊 What to Track

**From Gumroad Dashboard:**
- Downloads per resource
- Email capture rate
- Most popular resources

**From Google Analytics (if you add it):**
- Which resource cards get clicked
- Traffic sources
- Mobile vs desktop split

---

## 🆘 Troubleshooting

**Gumroad overlay not working?**
- Check script is loaded (view page source, search for "gumroad.js")
- Verify `gumroad-button` class is on the link
- Test in different browser

**Colors look different?**
- Make sure you're viewing the updated files
- Clear browser cache (Cmd/Ctrl + Shift + R)

**Filter buttons not working?**
- Check `script.js` is loaded
- Verify `data-type` matches `data-filter`
- Open browser console for errors

---

## 🎓 Resources Included

In this project folder, you also have:
- Example PDF template (see how it's structured)
- Blank PDF template (ready for your content)
- All documentation from our conversation

---

## ✨ You're Ready to Launch!

Everything is configured and ready. You just need to:
1. Create PDFs
2. Upload to Gumroad
3. Update URLs
4. Deploy!

The hard work is done - now it's just content creation! 🚀
