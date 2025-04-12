import { Link } from "wouter";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-8">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="mb-4">Last updated: April 12, 2025</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>Welcome to Lily's Lawn & Snow Pro's LLC ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal information.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Name and contact information</li>
                <li>Property address for service delivery</li>
                <li>Service preferences and requirements</li>
                <li>Communication history</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide and improve our services</li>
                <li>Communicate with you about appointments and services</li>
                <li>Send service updates and promotional materials</li>
                <li>Process payments and maintain accounts</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Information Sharing</h2>
              <p>We do not sell or rent your personal information. We may share your information with:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
                <li>Professional advisers and insurers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p>Email: lilyslawn.snowpros@gmail.com</p>
              <p>Phone: (509) 617-9194</p>
            </section>
          </div>

          <div className="mt-8">
            <Link href="/" className="text-primary hover:text-primary-dark">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}