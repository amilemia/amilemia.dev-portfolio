import { Mail, Calendar, Github, Twitter, Linkedin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TapToEmail } from "@/components/mobile/TapToCall";

export interface ContactMethod {
  type: "email" | "calendar" | "social";
  label: string;
  url: string;
  icon: React.ReactNode;
  description?: string;
}

export interface AlternativeContactProps {
  email?: string;
  calendarUrl?: string;
  socialLinks?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
  title?: string;
  description?: string;
}

export function AlternativeContact({
  email = "hi@amilemia.dev",
  calendarUrl = "#", // Placeholder for future Cal.com integration
  socialLinks = {
    github: "https://github.com/amilemia",
    twitter: "https://twitter.com/amilemia",
    linkedin: "https://linkedin.com/in/amilemia",
  },
  title = "Other Ways to Connect",
  description = "Prefer a different way to get in touch? Choose what works best for you.",
}: AlternativeContactProps) {
  const contactMethods: ContactMethod[] = [
    {
      type: "email",
      label: "Email Directly",
      url: `mailto:${email}`,
      icon: <Mail className="h-5 w-5" />,
      description: "Send me an email and I'll respond within 24 hours",
    },
    {
      type: "calendar",
      label: "Book a Call",
      url: calendarUrl,
      icon: <Calendar className="h-5 w-5" />,
      description: "Schedule a 30-minute consultation call",
    },
  ];

  const socialMethods: ContactMethod[] = [];
  
  if (socialLinks.github) {
    socialMethods.push({
      type: "social",
      label: "GitHub",
      url: socialLinks.github,
      icon: <Github className="h-5 w-5" />,
    });
  }
  
  if (socialLinks.twitter) {
    socialMethods.push({
      type: "social",
      label: "Twitter",
      url: socialLinks.twitter,
      icon: <Twitter className="h-5 w-5" />,
    });
  }
  
  if (socialLinks.linkedin) {
    socialMethods.push({
      type: "social",
      label: "LinkedIn",
      url: socialLinks.linkedin,
      icon: <Linkedin className="h-5 w-5" />,
    });
  }

  return (
    <Card className="border-border/60 bg-card/60 shadow-sm backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Contact Methods */}
        <div className="space-y-3">
          {contactMethods.map((method) => {
            // Use TapToEmail for email links on mobile
            if (method.type === "email") {
              return (
                <div
                  key={method.label}
                  className="flex items-start gap-3 rounded-lg border border-border/40 bg-background/50 p-4"
                >
                  <div className="mt-0.5 flex-shrink-0 text-primary">
                    {method.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="font-medium text-foreground">{method.label}</div>
                    {method.description && (
                      <div className="text-sm text-muted-foreground">
                        {method.description}
                      </div>
                    )}
                    <div className="pt-1">
                      <TapToEmail
                        email={email}
                        label={email}
                        variant="inline"
                        showIcon={false}
                        className="text-sm text-primary hover:underline"
                      />
                    </div>
                  </div>
                </div>
              );
            }
            
            // Regular link for other methods
            return (
              <a
                key={method.label}
                href={method.url}
                target={method.type === "calendar" ? "_blank" : undefined}
                rel={method.type === "calendar" ? "noopener noreferrer" : undefined}
                className="flex items-start gap-3 rounded-lg border border-border/40 bg-background/50 p-4 transition-all hover:border-border hover:bg-background hover:shadow-sm"
              >
                <div className="mt-0.5 flex-shrink-0 text-primary">
                  {method.icon}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="font-medium text-foreground">{method.label}</div>
                  {method.description && (
                    <div className="text-sm text-muted-foreground">
                      {method.description}
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>

        {/* Social Links */}
        {socialMethods.length > 0 && (
          <div className="space-y-3">
            <div className="text-sm font-medium text-muted-foreground">
              Connect on Social Media
            </div>
            <div className="flex gap-3">
              {socialMethods.map((method) => (
                <Button
                  key={method.label}
                  variant="outline"
                  size="icon"
                  asChild
                  className="h-10 w-10"
                >
                  <a
                    href={method.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={method.label}
                  >
                    {method.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Response Time Banner */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </div>
            <span className="font-medium text-foreground">
              I typically respond within 24 hours
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
