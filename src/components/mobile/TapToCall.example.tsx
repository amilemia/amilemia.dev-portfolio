/**
 * Example usage of TapToCall and TapToEmail components
 * 
 * These components provide mobile-friendly contact links that trigger
 * native phone dialer and email client on mobile devices, while displaying
 * as plain text or styled elements on desktop.
 */

import { TapToCall, TapToEmail } from "./TapToCall";

export function TapToCallExamples() {
  return (
    <div className="space-y-8 p-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">TapToCall Examples</h2>
        
        {/* Default variant */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Default Variant</h3>
          <TapToCall phoneNumber="+1-555-123-4567" />
        </div>

        {/* With custom label */}
        <div>
          <h3 className="text-lg font-semibold mb-2">With Custom Label</h3>
          <TapToCall 
            phoneNumber="+1-555-123-4567" 
            label="Call Us Now"
          />
        </div>

        {/* Button variant */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Button Variant</h3>
          <TapToCall 
            phoneNumber="+1-555-123-4567" 
            label="Contact Sales"
            variant="button"
          />
        </div>

        {/* Inline variant without icon */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Inline Variant (No Icon)</h3>
          <p className="text-muted-foreground">
            Call us at <TapToCall 
              phoneNumber="+1-555-123-4567" 
              variant="inline"
              showIcon={false}
            /> for immediate assistance.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">TapToEmail Examples</h2>
        
        {/* Default variant */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Default Variant</h3>
          <TapToEmail email="hello@example.com" />
        </div>

        {/* With custom label */}
        <div>
          <h3 className="text-lg font-semibold mb-2">With Custom Label</h3>
          <TapToEmail 
            email="support@example.com" 
            label="Email Support"
          />
        </div>

        {/* With subject line */}
        <div>
          <h3 className="text-lg font-semibold mb-2">With Subject Line</h3>
          <TapToEmail 
            email="sales@example.com" 
            label="Contact Sales"
            subject="Inquiry from Website"
          />
        </div>

        {/* Button variant */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Button Variant</h3>
          <TapToEmail 
            email="info@example.com" 
            label="Get in Touch"
            variant="button"
          />
        </div>

        {/* Inline variant without icon */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Inline Variant (No Icon)</h3>
          <p className="text-muted-foreground">
            For inquiries, email us at <TapToEmail 
              email="info@example.com" 
              variant="inline"
              showIcon={false}
            />.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Combined Usage</h2>
        <div className="rounded-lg border p-6 space-y-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Phone:</span>
              <TapToCall phoneNumber="+1-555-123-4567" variant="inline" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Email:</span>
              <TapToEmail email="contact@example.com" variant="inline" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
