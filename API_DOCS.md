# API Service Documentation

## Overview
This API service provides a clean interface for the frontend to fetch content from the backend CMS.

## Setup

### Environment Variable
Add to your `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

For production:
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

## Usage Examples

### 1. Fetch Hero Section
```typescript
import { heroApi } from '@/services/api';

const MyComponent = () => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    heroApi.getHero()
      .then(data => setHero(data))
      .catch(err => console.error(err));
  }, []);

  return <div>{hero?.title}</div>;
};
```

### 2. Fetch Gallery Images
```typescript
import { galleryApi } from '@/services/api';

// Get all images
const images = await galleryApi.getImages();

// Get images by category
const residentialImages = await galleryApi.getImagesByCategory('Residential Interior');
```

### 3. Fetch Services
```typescript
import { servicesApi } from '@/services/api';

const services = await servicesApi.getServices();
```

### 4. Fetch Testimonials
```typescript
import { testimonialsApi } from '@/services/api';

const testimonials = await testimonialsApi.getTestimonials();
```

### 5. Fetch Site Settings
```typescript
import { settingsApi } from '@/services/api';

const settings = await settingsApi.getSettings();
// Returns: { navbarLinks, footerText, socialLinks }
```

### 6. Fetch Page Sections
```typescript
import { sectionsApi } from '@/services/api';

// Single section
const aboutSection = await sectionsApi.getSection('about');

// Multiple sections
const sections = await sectionsApi.getSections([
  'trust_bar',
  'why_choose_us',
  'process'
]);
```

### 7. Fetch All Homepage Data
```typescript
import { getHomepageData } from '@/services/api';

const homepageData = await getHomepageData();
// Returns: { hero, gallery, services, testimonials, settings }
```

## API Methods

### Hero API
- `heroApi.getHero()` - Get hero section content

### Gallery API
- `galleryApi.getImages()` - Get all gallery images
- `galleryApi.getImagesByCategory(category)` - Filter by category

### Services API
- `servicesApi.getServices()` - Get all services

### Testimonials API
- `testimonialsApi.getTestimonials()` - Get all testimonials

### Settings API
- `settingsApi.getSettings()` - Get site settings

### Sections API
- `sectionsApi.getSection(key)` - Get single section
- `sectionsApi.getSections(keys)` - Get multiple sections

### Combined
- `getHomepageData()` - Fetch all homepage data in parallel

## Error Handling

All API methods throw errors that should be caught:

```typescript
try {
  const data = await heroApi.getHero();
} catch (error) {
  console.error('Failed to load hero:', error);
  // Show fallback UI
}
```

## TypeScript Types

Create `types/cms.ts`:
```typescript
export interface Hero {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  bgImageUrl?: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  category: string;
  title?: string;
  createdAt: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role?: string;
  content: string;
  avatar?: string;
}

export interface SiteSettings {
  navbarLinks: Array<{ label: string; href: string }>;
  footerText: string;
  socialLinks: Record<string, string>;
}
```
