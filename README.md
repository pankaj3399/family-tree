# Shadcn Landing Page Template
## <a href="https://ui.shadcn.com/" target="_blank">Shadcn</a> + <a href="https://nextjs.org/" target="_blank">Next.js</a> + <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a> + <a href="https://tailwindcss.com/" target="_blank">Tailwind</a>.
### This is a project conversion <a href="https://github.com/leoMirandaa/shadcn-vue-landing-page" target="_blank">Shadcn-Vue</a> to NextJS
![Alt text](./public/demo-img.jpg)
## Sections
- [x] Navbar
- [x] Sidebar(mobile)
- [x] Hero
- [x] Sponsors
- [x] Benefits
- [x] Features
- [x] Testimonials
- [x] Team
- [x] Community
- [x] Contact
- [x] Pricing
- [x] Frequently Asked Questions(FAQ)
- [x] Services
- [x] Footer

## Features
- [x] Fully Responsive Design
- [x] User Friendly Navigation
- [x] Dark Mode

## Configuration Steps

### Clerk Webhook Configuration
1. Log in to your Clerk Dashboard
2. Navigate to the Configure section
3. Scroll down to find the Webhook section
4. Configure the webhook:
   - Set the endpoint URL to: `http://yoururl/api/webhooks/clerk`
   - Subscribe to the `user.created` event
   - Save your configuration
5. Copy the signing secret provided for use in your .env file
6. ![WhatsApp Image 2024-12-22 at 21 36 44_35ad57b2](https://github.com/user-attachments/assets/c7b1ff56-5f59-4426-92bb-2f6cff39cbcb)


### Cloudinary Configuration
1. Log in to your Cloudinary account
2. For Upload Preset:
   - Go to Settings
   - Either use an existing preset or create a new one
   - Copy the preset name for your .env file
3. For Cloud Name:
   - Look in the side navigation of your Cloudinary dashboard
   - Copy your cloud name for your .env file
![WhatsApp Image 2024-12-22 at 21 36 22_019aa778](https://github.com/user-attachments/assets/ed782a9f-4147-433e-8a7f-a17f25490871)
## Installation Steps
1. Clone this repository:
```bash
git clone https://github.com/nobruf/shadcn-landing-page.git
```

2. Go into project:
```bash
cd shadcn-landing-page
```

3. Install dependencies:
```bash
npm install
```

4. Create .env file with the following variables:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
MONGODB_URI=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
SIGNING_SECRET=           # From Clerk webhook configuration
CLOUDINARY_CLOUD_NAME=    # From Cloudinary dashboard
CLOUDINARY_UPLOAD_PRESET= # From Cloudinary settings
```

5. Run project:
```bash
npm run dev
```
