import { useEffect } from 'react';

export default function SEOHead({
  title = "QuolyTech | Web Development, AI Agents & Digital Solutions",
  description = "QuolyTech is a digital technology studio in Tiranë, Albania building websites, mobile apps, AI agents and custom digital solutions for businesses.",
  canonicalPath = "",
  ogType = "website",
  ogImage = "https://quolytech.com/quolytech-logo.jpg",
  jsonLd = null,
}) {
  const baseUrl = "https://quolytech.com";
  const fullCanonicalUrl = `${baseUrl}${canonicalPath.startsWith('/') ? canonicalPath : '/' + canonicalPath}`;

  useEffect(() => {
    // Update Document Title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (selector, attributeName, attributeValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update Meta Description
    updateMetaTag('meta[name="description"]', 'name', 'description', description);

    // Update Open Graph Tags
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', fullCanonicalUrl);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    updateMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'QuolyTech');

    // Update Twitter Card Tags
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // Update Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', fullCanonicalUrl);

    // Update JSON-LD Script Tag
    let scriptJsonLd = document.getElementById('dynamic-jsonld');
    if (jsonLd) {
      if (!scriptJsonLd) {
        scriptJsonLd = document.createElement('script');
        scriptJsonLd.id = 'dynamic-jsonld';
        scriptJsonLd.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptJsonLd);
      }
      scriptJsonLd.textContent = JSON.stringify(jsonLd);
    } else if (scriptJsonLd) {
      scriptJsonLd.remove();
    }
  }, [title, description, fullCanonicalUrl, ogType, ogImage, jsonLd]);

  return null;
}
