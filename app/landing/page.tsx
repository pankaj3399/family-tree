'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Download, Paintbrush, Lock } from 'lucide-react'
import { motion } from "framer-motion"
import Image from "next/image"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f7f0] to-white">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/logo_1.png"
              alt="FamilyTreeCreator Logo"
              width={48}
              height={48}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold text-[#2d7a4d]">FamilyTreeCreator</h1>
          </div>
          <Button variant="outline">Login</Button>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2d7a4d]">Create Your Family&apos;s Legacy</h2>
            <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
              Design and download personalized family trees with our intuitive online platform.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="text-lg bg-[#2d7a4d] hover:bg-[#236b3f]"
              >
                Start Your Tree <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <motion.h3
              className="text-3xl font-bold text-center mb-12 text-[#2d7a4d]"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              Key Features
            </motion.h3>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                { icon: Users, title: "Easy to Use", description: "Intuitive interface for all ages" },
                { icon: Download, title: "High-Quality Downloads", description: "Get your tree in various formats" },
                { icon: Paintbrush, title: "Customizable Designs", description: "Multiple templates to choose from" },
                { icon: Lock, title: "Secure & Private", description: "Your family data is protected" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
                  variants={fadeIn}
                >
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-[#2d7a4d]" />
                  <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h3
              className="text-3xl font-bold text-center mb-12 text-[#2d7a4d]"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              Simple Pricing
            </motion.h3>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                { name: "Basic", price: "9.99", features: ["1x Download", "Basic Templates", "Email Support"] },
                { name: "Pro", price: "29.99", features: ["5x Downloads", "Premium Templates", "Priority Support"], highlighted: true },
                { name: "Unlimited", price: "49.99", features: ["Unlimited Downloads", "All Templates", "24/7 Support"] },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  className={`bg-white rounded-lg shadow-lg p-8 ${plan.highlighted ? 'ring-2 ring-[#2d7a4d]' : ''}`}
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                >
                  <h4 className="text-2xl font-bold mb-4">{plan.name}</h4>
                  <p className="text-4xl font-bold mb-6 text-[#2d7a4d]">${plan.price}</p>
                  <ul className="mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="mb-2 flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 text-[#2d7a4d]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                    style={{
                      backgroundColor: plan.highlighted ? '#2d7a4d' : 'transparent',
                      borderColor: '#2d7a4d'
                    }}
                  >
                    Choose Plan
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-[#f0f7f0] py-16">
          <div className="container mx-auto px-4">
            <motion.h3
              className="text-3xl font-bold text-center mb-12 text-[#2d7a4d]"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              How It Works
            </motion.h3>
            <motion.div
              className="max-w-3xl mx-auto"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                { step: 1, title: "Sign Up", description: "Create your account in seconds" },
                { step: 2, title: "Add Family Members", description: "Enter names, dates, and relationships" },
                { step: 3, title: "Choose Your Design", description: "Select from our beautiful templates" },
                { step: 4, title: "Download & Share", description: "Get your family tree in high resolution" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start mb-8"
                  variants={fadeIn}
                >
                  <div className="bg-[#2d7a4d] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1a472e] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-2">
              <Image
                src="/logo_1.png"
                alt="FamilyTreeCreator Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h5 className="text-xl font-bold mb-4">FamilyTreeCreator</h5>
                <p className="text-gray-400">Creating digital family legacies since 2023</p>
              </div>
            </div>
            <div>
              <h5 className="text-xl font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#7fba8a] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#7fba8a] transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-[#7fba8a] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[#7fba8a] transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-xl font-bold mb-4">Newsletter</h5>
              <p className="mb-4">Stay updated with our latest features and news</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#2d7a4d] text-gray-800"
                />
                <Button className="rounded-l-none bg-[#2d7a4d] hover:bg-[#236b3f]">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#2d7a4d] text-center text-gray-400">
            © 2023 FamilyTreeCreator. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
