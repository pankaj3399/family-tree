import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <Link
    href={href}
    className="text-muted-foreground/80 hover:text-primary transition-colors duration-200"
  >
    {children}
  </Link>
);

export const FooterSection = () => {
  return (
    <footer id="footer" className="container py-24 sm:py-32">
      <div className="relative p-10 rounded-2xl overflow-hidden">
        {/* Gradient background - keeping original */}
        <div className="absolute inset-0 bg-gradient-to-b from-card/80 to-card backdrop-blur-sm" />

        {/* Border gradient */}
        <div className="absolute inset-0 border border-primary/10 rounded-2xl" />

        {/* Content */}
        <div className="relative">
          <div className="flex flex-col md:flex-row items-start gap-20">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group space-x-3">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image
                        src="/logo/familytreecreator-logo.png"
                        alt="Logo"
                        height="48"
                        width="48"
                        className="rounded-xl"
                      />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-[#D247BF] bg-clip-text text-transparent">
                        FamilyTreeCreator
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground/80 max-w-96">
                    Building connections, one tree at a time. <br />
                    Join us in preserving history and fostering connections.
                  </p>
                </div>
              </Link>
            </div>

            {/* Legal Links */}

            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-semibold text-orange-500">
                Quick Links
              </h3>
              <nav className="flex flex-col space-y-4">
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/services">Services</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
              </nav>
            </div>
            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-semibold text-orange-500">Legal</h3>
              <nav className="flex flex-col space-y-4">
                <FooterLink href="/legal-notice">Legal Notice</FooterLink>
                <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
                <FooterLink href="/terms">Terms & Conditions</FooterLink>
              </nav>
            </div>
          </div>

          {/* Page Links */}

          <Separator className="my-10 bg-primary/10" />

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground/70">
            <p className="relative inline-block">
              © 2024 •{" "}
              <span className="text-transparent bg-gradient-to-r from-primary via-[#D247BF] to-primary bg-clip-text font-medium">
                Designed and developed with care!
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
