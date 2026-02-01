# BNP Vote Frame Generator

A modern, responsive React application that allows users to upload their photos and apply BNP (Bangladesh Nationalist Party) themed frames for voting campaigns. Built with React 19, Tailwind CSS 4, and shadcn/ui components.

## Features

### Core Functionality
- **Image Upload**: Easy drag-and-drop or click-to-upload interface for user photos
- **Multiple Frame Styles**: Three distinct frame designs with authentic BNP branding
  - **Circular Frame**: Classic circular design with green background and red accent
  - **Rectangular Frame**: Modern rectangular frame with patriotic colors
  - **Oval Frame**: Gradient background with elegant oval shape
- **Live Preview**: Real-time preview of the frame effect as users adjust settings
- **Image Controls**: Zoom and position adjustment sliders for perfect framing
- **Download**: High-quality PNG export of the final framed image
- **Reset Function**: Quick reset to start over with a new photo

### Design Philosophy
The application embodies **Civic Modernism with Cultural Pride**, combining:
- **Authentic BNP Colors**: Deep green (#1B5E20) and red (#D32F2F) representing stability and passion
- **Bengali Typography**: Native Bengali language support with Noto Sans Bengali font
- **Patriotic Branding**: Sheaf of Paddy symbol and official BNP logo integration
- **Professional Interface**: Clean, intuitive layout that welcomes all users

## Technical Stack

- **Frontend Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4 with custom color theme
- **UI Components**: shadcn/ui (Button, Card, etc.)
- **Routing**: Wouter (lightweight client-side router)
- **Icons**: Lucide React
- **Fonts**: Poppins (English) + Noto Sans Bengali (Bengali)

## Project Structure

```
client/
├── public/
│   └── images/
│       ├── bnp-logo.jpg
│       └── dhaner-shish.png
├── src/
│   ├── components/
│   │   ├── FrameSelector.tsx      # Frame style selection UI
│   │   ├── VoteFramePreview.tsx   # Canvas-based frame rendering
│   │   ├── ErrorBoundary.tsx
│   │   └── ui/                    # shadcn/ui components
│   ├── pages/
│   │   └── Home.tsx               # Main application page
│   ├── contexts/
│   │   └── ThemeContext.tsx
│   ├── App.tsx                    # Routes and layout
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Global styles and theme
├── index.html
└── package.json
```

## Installation & Setup

### Prerequisites
- Node.js 22.13.0 or higher
- pnpm 10.4.1 or higher

### Development

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Start development server**:
   ```bash
   pnpm dev
   ```

3. **Open in browser**:
   Navigate to `http://localhost:3000`

### Production Build

```bash
pnpm build
pnpm start
```

## Color Scheme

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary Green | #1B5E20 | Main background, borders, buttons |
| Dark Green | #0D3B1F | Accents, deep elements |
| Medium Green | #2E7D32 | Gradients, secondary elements |
| Accent Red | #D32F2F | Call-to-action, highlights |
| Gold/Orange | #FFA500 | Gradient accents, celebrations |
| White | #ffffff | Text, borders, overlays |

## Component Documentation

### Home.tsx
The main page component that orchestrates the entire application flow. Manages state for uploaded images, frame selection, zoom, and positioning.

**Key Features**:
- Image upload handler with FileReader API
- Frame selection state management
- Zoom and position offset controls
- Download functionality using canvas API
- Reset functionality to clear all selections

### VoteFramePreview.tsx
Renders the vote frame using HTML5 Canvas API. Supports three frame styles with different visual treatments.

**Frame Rendering**:
- **Circular Frame**: Uses `arc()` for circular clipping with concentric borders
- **Rectangular Frame**: Uses rectangular clipping with decorative bottom bar
- **Oval Frame**: Uses `ellipse()` for oval clipping with gradient background

### FrameSelector.tsx
Interactive component for selecting between three frame styles with visual previews.

**Features**:
- SVG-based frame previews
- Visual feedback for selected frame
- Bengali language labels and descriptions

## Usage Guide

### For End Users

1. **Upload Photo**: Click "ছবি নির্বাচন করুন" (Select Photo) button
2. **Choose Frame**: Select one of three frame styles
3. **Adjust Image**: Use zoom slider to resize, X/Y offset sliders to position
4. **Download**: Click "ডাউনলোড করুন" (Download) to save as PNG
5. **Reset**: Click "রিসেট করুন" (Reset) to start over

### For Developers

#### Adding New Frames
1. Add new frame type to the union type in Home.tsx:
   ```typescript
   type FrameType = "frame1" | "frame2" | "frame3" | "frame4";
   ```

2. Add frame preview to FrameSelector.tsx:
   ```typescript
   {
     id: "frame4",
     name: "নতুন ফ্রেম",
     description: "নতুন ফ্রেম বর্ণনা",
     preview: <svg>...</svg>
   }
   ```

3. Implement rendering function in VoteFramePreview.tsx:
   ```typescript
   case "frame4":
     drawNewFrame(ctx, canvas, img, zoom, offsetX, offsetY);
     break;
   ```

#### Customizing Colors
Edit `/client/src/index.css` to modify the color theme:
```css
:root {
  --primary: #1B5E20;        /* Change primary color */
  --secondary: #D32F2F;      /* Change secondary color */
  --accent: #FFA500;         /* Change accent color */
  /* ... other colors ... */
}
```

#### Adding Bengali Text
All Bengali text is already integrated. To add more:
1. Use the `bengali-text` class for Bengali typography
2. Ensure text is wrapped in elements with `bengali-text` class
3. Use Noto Sans Bengali font family

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- Canvas rendering is optimized for 600x600px output
- Images are processed client-side (no server upload)
- Smooth animations use CSS transitions and Tailwind utilities
- Responsive design adapts to mobile, tablet, and desktop screens

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast colors meeting WCAG standards
- Bengali language support for inclusive access

## Future Enhancements

- Social media sharing integration (Facebook, WhatsApp, Twitter)
- Additional frame styles (seasonal, event-specific)
- Image filters and effects
- Batch processing for multiple images
- Mobile app version
- Cloud storage for saved frames

## Troubleshooting

### Image not displaying in preview
- Ensure the image file is in a supported format (JPG, PNG, WebP)
- Check browser console for errors
- Verify file size is reasonable (< 10MB)

### Frame not rendering correctly
- Clear browser cache and reload
- Try a different image
- Check browser compatibility

### Download not working
- Ensure pop-ups are not blocked
- Check browser download settings
- Verify sufficient disk space

## Contributing

To contribute improvements:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is created for the Bangladesh Nationalist Party (BNP) and is subject to their usage terms and conditions.

## Support

For issues, feature requests, or questions, please contact the development team or submit an issue through the project repository.

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Developed with**: React 19 + Tailwind CSS 4 + TypeScript
