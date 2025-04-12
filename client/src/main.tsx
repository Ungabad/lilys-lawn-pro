import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add meta information for SEO
const meta = document.createElement("meta");
meta.name = "description";
meta.content =
  "Professional lawn care and snow removal services in Spokane and surrounding areas. Family-owned business with quality service guaranteed.";
document.head.appendChild(meta);

// Add title
const title = document.createElement("title");
title.textContent =
  "Lily's Lawn & Snow Pro's LLC - Professional Lawn Care and Snow Removal Services";
document.head.appendChild(title);

// Google Fonts
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@300;400;600&display=swap";
document.head.appendChild(fontLink);

// Font Awesome
const fontAwesome = document.createElement("link");
fontAwesome.rel = "stylesheet";
fontAwesome.href =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
document.head.appendChild(fontAwesome);

createRoot(document.getElementById("root")!).render(<App />);
