import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SeoHelmet = ({ title, description, image, type = 'website', children, jsonLd, noIndex = false }) => {
    const location = useLocation();
    const siteUrl = "https://www.ausa.io";
    const canonicalUrl = `${siteUrl}${location.pathname}`;
    const defaultTitle = "Access USA (AUSA) — Workshops, Credit Courses, Diploma & U.S. Summer Programs";
    const defaultDescription = "Build a profile universities notice. Access USA (AUSA) connects high school students in India and worldwide with U.S. university workshops, credit courses, a structured diploma pathway, and campus summer programs.";
    
    const displayTitle = title ? `${title} - AUSA` : defaultTitle;
    const displayDescription = description || defaultDescription;
    
    // Default to the homepage hero image if no specific image is provided
    // Using 1200x630 dimensions which is standard for Open Graph
    const defaultImage = "https://images.unsplash.com/photo-1557989048-03456d01a26e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80";
    const displayImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Access USA (AUSA)",
        "url": siteUrl,
        "logo": `${siteUrl}/ausa-logo.png`,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-000-000-0000",
            "contactType": "Customer Service",
            "email": "info@ausa.io"
        },
        "sameAs": [
            "https://www.linkedin.com/company/access-usa",
            "https://twitter.com/accessusa"
        ]
    };

    const schemas = [organizationSchema];
    if (jsonLd) {
        schemas.push(...(Array.isArray(jsonLd) ? jsonLd : [jsonLd]));
    }

    return (
        <Helmet>
            <html lang="en" />
            <title>{displayTitle}</title>
            <meta name="description" content={displayDescription} />
            {noIndex ? <meta name="robots" content="noindex, follow" /> : <meta name="robots" content="index, follow" />}
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={displayTitle} />
            <meta property="og:description" content={displayDescription} />
            <meta property="og:image" content={displayImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="Access USA (AUSA)" />
            <meta property="og:locale" content="en_US" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={displayTitle} />
            <meta name="twitter:description" content={displayDescription} />
            <meta name="twitter:image" content={displayImage} />

            <script type="application/ld+json">
                {JSON.stringify(schemas)}
            </script>
            {children}
        </Helmet>
    );
};

export default SeoHelmet;