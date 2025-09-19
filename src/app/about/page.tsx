import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">About Me</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A passionate developer building exceptional digital experiences.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert mx-auto">
          <p className="text-lg">
            Hello! I'm Amilemia, a full-stack developer with a passion for creating
            beautiful, functional, and user-centered digital experiences. With a
            strong foundation in modern web technologies, I bring ideas to life
            through clean, efficient code and thoughtful design.
          </p>

          <h2 className="mt-12 mb-6 text-2xl font-bold">Technical Skills</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold">Frontend</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>React & Next.js</li>
                <li>TypeScript & JavaScript</li>
                <li>Tailwind CSS & CSS-in-JS</li>
                <li>State Management (Redux, Zustand)</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold">Backend</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Node.js & Express</li>
                <li>REST & GraphQL APIs</li>
                <li>Authentication & Security</li>
                <li>Database Design</li>
              </ul>
            </div>
          </div>

          <h2 className="mt-12 mb-6 text-2xl font-bold">Experience</h2>
          <div className="space-y-8">
            <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-3 before:w-3 before:rounded-full before:bg-primary before:content-['']">
              <h3 className="text-lg font-semibold">Senior Frontend Developer</h3>
              <div className="mb-2 text-sm text-muted-foreground">
                Company Name • 2022 - Present
              </div>
              <p className="text-muted-foreground">
                Led the development of responsive web applications using React and
                Next.js, improving performance and user experience.
              </p>
            </div>

            <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-3 before:w-3 before:rounded-full before:bg-primary before:content-['']">
              <h3 className="text-lg font-semibold">Full Stack Developer</h3>
              <div className="mb-2 text-sm text-muted-foreground">
                Another Company • 2019 - 2022
              </div>
              <p className="text-muted-foreground">
                Developed and maintained web applications using modern JavaScript
                frameworks and RESTful APIs.
              </p>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Button asChild size="lg">
              <a href="/contact">Get In Touch</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
