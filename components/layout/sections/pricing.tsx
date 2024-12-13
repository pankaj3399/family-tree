"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface PlanProps {
  title: string;
  popular: PopularPlan;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const plans: PlanProps[] = [
  {
    title: "Basic",
    popular: 0,
    price: 9.99,
    description:
      "Perfect for individuals who need basic access to our resources.",
    buttonText: "Choose Plan",
    benefitList: ["1x Download", "Basic Templates", "Email Support"],
  },
  {
    title: "Pro",
    popular: 1,
    price: 29.99,
    description:
      "Ideal for professionals who require more resources and support.",
    buttonText: "Choose Plan",
    benefitList: ["5x Downloads", "Premium Templates", "Priority Support"],
  },
  {
    title: "Unlimited",
    popular: 0,
    price: 49.99,
    description:
      "Best for teams and businesses that need unlimited access to all features.",
    buttonText: "Choose Plan",
    benefitList: ["Unlimited Downloads", "All Templates", "24/7 Support"],
  },
];

export const PricingSection = () => {
  return (
    <section className=" relative container py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-16 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-16 left-1/4 w-72 h-72 bg-[#D247BF]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Pricing
      </h2>

      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Get {" "}
        <span className="text-transparent bg-gradient-to-r from-primary via-[#D247BF] to-primary bg-clip-text">
          Unlimitted {"  "}
        </span>
        Access
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14">
        Lorem ipsum dolor sit amet consectetur adipisicing reiciendis.
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10">
        {plans.map(
          ({ title, popular, price, description, buttonText, benefitList }) => (
            <motion.div
              key={title}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ y: 0 }}
            >
              <Card
                className={`h-full ${
                  popular === PopularPlan?.YES
                    ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
                    : ""
                } transition-transform duration-300 hover:shadow-lg`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {title}
                    {popular === PopularPlan.YES && (
                      <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription className="min-h-[50px]">
                    {description}
                  </CardDescription>
                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r  blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full`}
                    />
                    <span className="relative text-4xl font-bold">
                      ${price}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                  {benefitList.map((benefit) => (
                    <span key={benefit} className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/20 p-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span>{benefit}</span>
                    </span>
                  ))}
                </CardContent>

                <CardFooter>
                  <Button
                    variant={
                      popular === PopularPlan.YES ? "default" : "secondary"
                    }
                    className={`w-full ${
                      popular === PopularPlan.YES
                        ? "bg-gradient-to-r from-primary to-[#D247BF] hover:opacity-90"
                        : "hover:bg-primary/20"
                    }`}
                  >
                    {buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
};
