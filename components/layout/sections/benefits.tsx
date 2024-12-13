import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "UserPlus",
    title: "Sign Up",
    description: "Create an account and start building your family tree.",
  },
  {
    icon: "Users",
    title: "Add Family Members",
    description:
      "Enter names, dates, relationships and other details to build your tree.",
  },
  {
    icon: "Palette",
    title: "Choose Your Design",
    description:
      "Select from a variety of templates and design options to personalize your tree.",
  },
  {
    icon: "Share2",
    title: "Download & Share",
    description:
      "Export your tree in multiple high-quality formats and share with family and friends.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Working</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It{" "}
            <span className="text-transparent bg-gradient-to-r from-primary via-[#D247BF] to-primary bg-clip-text">
              Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Easily create a comprehensive family tree in just a few
            straightforward steps.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number hover:border-primary/20"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
