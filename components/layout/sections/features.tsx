import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "Users",
    title: "User-Friendly Interface",
    description: "Seamlessly designed for all age groups to enjoy.",
  },
  {
    icon: "Download",
    title: "High-Resolution Downloads",
    description: "Export your designs in multiple high-quality formats.",
  },
  {
    icon: "Paintbrush",
    title: "Personalized Creativity",
    description: "Choose from a variety of templates and design options.",
  },
  {
    icon: "Lock",
    title: "Privacy & Security",
    description: "Your personal information stays protected at all times.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="relative container py-24 sm:py-32">
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,102,0,0.07)_0%,transparent_60%)]" />
      </div>

      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Features
      </h2>

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Key Features of Our{" "}
            <span className="text-transparent bg-gradient-to-r from-primary via-[#D247BF] to-primary bg-clip-text">
              Product
            </span>
          </h2>


      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem
        fugiat, odit similique quasi sint reiciendis quidem iure veritatis optio
        facere tenetur.
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background/50 backdrop-blur-sm border-muted/20 hover:border-primary/20 transition-colors duration-300">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
