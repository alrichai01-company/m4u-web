import { PageHero } from "@/components/shared";
import { Button } from "@/components/ui";

/**
 * Custom 404 page.
 *
 * Branded with PageHero + a single button back to home. Keeps the luxury feel
 * even on error pages.
 */
export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        heading={
          <>
            Page not <span className="it">found.</span>
          </>
        }
        lead="The page you're looking for doesn't exist or has been moved."
      />
      <section style={{ paddingTop: "0", paddingBottom: "clamp(5rem,11vw,9.5rem)" }}>
        <div className="wrap">
          <Button href="/" variant="solid" arrow magnetic>
            Back to Home
          </Button>
        </div>
      </section>
    </>
  );
}
