import { Link } from "wouter";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-8">Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="mb-4">Last updated: April 12, 2025</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using the services provided by Lily's Lawn & Snow Pro's LLC, you agree to be bound by these Terms of Service.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Services</h2>
              <p>We provide lawn care and snow removal services including but not limited to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Lawn mowing and maintenance</li>
                <li>Fertilization and weed control</li>
                <li>Landscaping services</li>
                <li>Snow removal and de-icing</li>
                <li>Seasonal cleanup</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Service Agreements</h2>
              <p>All services are subject to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Weather conditions and seasonal limitations</li>
                <li>Property accessibility</li>
                <li>Scheduling availability</li>
                <li>Service area restrictions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>Payment is due upon completion of service unless otherwise agreed</li>
                <li>We accept various payment methods including credit cards and electronic payments</li>
                <li>Recurring services may require automatic payment setup</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Cancellation Policy</h2>
              <p>We require 24-hour notice for service cancellations. Late cancellations may incur a fee.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Property Access and Safety</h2>
              <p>Customers are responsible for:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Providing safe access to service areas</li>
                <li>Marking or identifying potential hazards</li>
                <li>Securing pets during service visits</li>
                <li>Maintaining clear communication about service requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
              <p>For questions about these Terms of Service, please contact us at:</p>
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