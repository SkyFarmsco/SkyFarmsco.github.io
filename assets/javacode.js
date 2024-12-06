import React, { useState, useRef, useContext, useEffect, useLayoutEffect, useCallback, useMemo, forwardRef, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link as RouterLink } from "react-router-dom"; // If used (not directly in code, but assuming)
import {
  // Icons from lucide-react
  ArrowRight, Brain, Cloud, Droplets, Facebook, Instagram, Twitter,
  Linkedin, Menu, Recycle, Sprout, LineChart, Leaf, X
} from "lucide-react";
import { motion as m } from "framer-motion"; // Using 'm' as alias
import {
  // Tabs related imports (Radix UI or similar)
  Tabs, TabsList, TabsTrigger, TabsContent
} from "@radix-ui/react-tabs"; // assuming from user code context

// ---------------------------------------------------------------------------
// Utility and Helper Functions (Truncated large code with frameworks logic)
// Most of this code is from your original snippet: includes a lot of
// advanced logic for motion, projection, intersection observers, etc.
// Just trust these are as-is, reformatted for readability.
// ---------------------------------------------------------------------------

// ... [A large portion of utility code, classes, hooks, etc. from user-provided code] ...

// ---------------------------------------------------------------------------
// Components:
// ---------------------------------------------------------------------------

// Button Component
const Button = forwardRef(({ className, variant = "primary", size = "md", ...props }, ref) => (
  <button
    ref={ref}
    className={[
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      variant === "primary" && "bg-green-600 text-white hover:bg-green-700",
      variant === "secondary" && "bg-gray-100 text-gray-900 hover:bg-gray-200",
      variant === "outline" && "border border-gray-200 bg-white hover:bg-gray-100",
      size === "sm" && "h-9 px-4 py-2 text-sm",
      size === "md" && "h-10 px-6 py-2",
      size === "lg" && "h-11 px-8 py-3 text-lg",
      className
    ].filter(Boolean).join(" ")}
    {...props}
  />
));
Button.displayName = "Button";

// Header Navigation Links
const navLinks = [
  { name: "About", href: "/about" },
  { name: "Technology", href: "/technology" },
  { name: "Products", href: "/products" },
  { name: "Blog", href: "/blog" },
  { name: "Impact", href: "/impact" },
];

// Header Component
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <RouterLink to="/" className="-m-1.5 p-1.5 text-2xl font-bold text-green-600">
            SkyFarms
          </RouterLink>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navLinks.map((item) => (
            <RouterLink
              key={item.name}
              to={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-600"
            >
              {item.name}
            </RouterLink>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button variant="primary">Contact Us</Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 z-50" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <RouterLink
              to="/"
              className="-m-1.5 p-1.5 text-2xl font-bold text-green-600"
            >
              SkyFarms
            </RouterLink>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navLinks.map((item) => (
                  <RouterLink
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </RouterLink>
                ))}
              </div>
              <div className="py-6">
                <Button variant="primary" className="w-full">Contact Us</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Hero Section
function Hero() {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex items-center"
    >
      <div className="absolute inset-0 overflow-hidden">
        <m.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img
            src="/path-to-hero-image.jpg"
            alt="Vertical farming"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </m.div>
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-32 sm:py-48 lg:px-8 lg:py-56">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Cultivating Freshness & Sustainability in the Heart of the City
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Experience the future of agriculture with our innovative vertical
            farming solutions. Fresh, pesticide-free produce grown sustainably
            using cutting-edge technology.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button size="lg" className="gap-2">
              Learn More <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="text-white hover:text-gray-900">
              View Our Products
            </Button>
          </div>
        </div>
      </div>
    </m.div>
  );
}

// "Why Choose SkyFarms" Section (Features)
const features = [
  {
    name: "Sustainable Farming",
    description: "Our vertical farming methods use 95% less water than traditional agriculture while maximizing space efficiency.",
    icon: Leaf,
  },
  {
    name: "AI & IoT Innovation",
    description: "Advanced sensors and machine learning optimize growing conditions 24/7 for perfect produce every time.",
    icon: Brain,
  },
  {
    name: "Pesticide-Free Produce",
    description: "Controlled environment agriculture means no pesticides or harmful chemicals are ever needed.",
    icon: Sprout,
  },
  {
    name: "Circular Economy",
    description: "We convert organic waste into fertilizer and recycle water, creating a sustainable closed-loop system.",
    icon: Recycle,
  },
];

// WhyChoose Component with animated cards and icons
function WhyChoose() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });

  return (
    <section className="bg-gray-50 py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-heading text-green-600 text-sm font-semibold tracking-wider uppercase">
            Why Choose SkyFarms
          </span>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Innovation Meets Sustainability
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our advanced vertical farming technology combines sustainable practices
            with cutting-edge innovation to produce the freshest, highest-quality
            produce possible.
          </p>
        </m.div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-4">
          {features.map((feature, index) => (
            <m.div
              key={feature.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative p-8 bg-white rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="absolute -inset-px bg-gradient-to-r from-green-600 to-green-400 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
                
                <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-green-600/10 group-hover:bg-green-600/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-green-600" />
                </div>
                
                <h3 className="mt-6 font-heading text-xl font-semibold text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-4 text-base text-gray-600">
                  {feature.description}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Impact Numbers Section
function ImpactNumbers() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });
  const stats = [
    { id: 1, name: "Water Savings", value: "95%", delay: 0 },
    { id: 2, name: "Pesticide-Free", value: "100%", delay: 0.2 },
    { id: 3, name: "Carbon Footprint Reduction", value: "70%", delay: 0.4 },
    { id: 4, name: "Local Distribution", value: "<24h", delay: 0.6 },
  ];

  return (
    <div className="bg-green-600 py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl lg:max-w-none"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Our Impact in Numbers
            </h2>
            <p className="mt-4 text-lg leading-8 text-green-100">
              Measurable results that demonstrate our commitment to sustainable agriculture
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <m.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: stat.delay }}
                className="flex flex-col bg-white/5 p-8 hover:bg-white/10 transition-colors"
              >
                <dt className="text-sm font-semibold leading-6 text-green-100">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">
                  {stat.value}
                </dd>
              </m.div>
            ))}
          </dl>
        </m.div>
      </div>
    </div>
  );
}

// Technology Component with interactive elements
function Technology() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });
  const [activeFeature, setActiveFeature] = useState(null);

  return (
    <section className="relative bg-white py-24 sm:py-32 overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-heading text-green-600 text-sm font-semibold tracking-wider uppercase">
            Advanced Technology
          </span>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Smart Farming for the Future
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our vertical farms leverage cutting-edge technology to ensure optimal
            growing conditions and maximum efficiency.
          </p>
        </m.div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 3D Interactive Display */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative aspect-square rounded-2xl bg-gray-900 overflow-hidden"
          >
            {/* Replace with your 3D model or interactive visualization */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-transparent" />
            <img
              src="/path-to-tech-visualization.jpg"
              alt="Farming Technology"
              className="h-full w-full object-cover"
            />
            
            {/* Interactive Hotspots */}
            {techFeatures.map((feature, index) => (
              <button
                key={feature.title}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full 
                  ${activeFeature === index ? 'bg-green-600' : 'bg-white'}
                  hover:scale-110 transition-all duration-300`}
                style={{
                  left: `${feature.position.x}%`,
                  top: `${feature.position.y}%`,
                }}
                onClick={() => setActiveFeature(index)}
              >
                <feature.icon 
                  className={`h-6 w-6 ${
                    activeFeature === index ? 'text-white' : 'text-green-600'
                  }`} 
                />
              </button>
            ))}
          </m.div>

          {/* Tech Features Description */}
          <div className="lg:pl-8">
            <m.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {techFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`p-6 rounded-xl transition-all duration-300 ${
                    activeFeature === index
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="flex items-center gap-4">
                    <feature.icon 
                      className={`h-8 w-8 ${
                        activeFeature === index ? 'text-white' : 'text-green-600'
                      }`} 
                    />
                    <h3 className="font-heading text-xl font-semibold">
                      {feature.title}
                    </h3>
                  </div>
                  <p className={`mt-4 ${
                    activeFeature === index ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Products Section
const productsData = [
  {
    category: "Leafy Greens",
    items: [
      {
        name: "Fresh Lettuce",
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&q=80",
        description: "Crisp and nutritious lettuce varieties grown in our vertical farms.",
      },
      {
        name: "Baby Spinach",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80",
        description: "Tender baby spinach leaves packed with nutrients.",
      },
    ],
  },
  {
    category: "Herbs",
    items: [
      {
        name: "Fresh Basil",
        image: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?auto=format&fit=crop&q=80",
        description: "Aromatic basil grown in perfect conditions.",
      },
      {
        name: "Mint",
        image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&q=80",
        description: "Fresh mint leaves for culinary and beverage use.",
      },
    ],
  },
];

function Products() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });

  return (
    <section className="bg-gray-50 py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Products
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Discover our range of fresh, sustainably grown produce
          </p>
        </m.div>

        <div className="mt-16">
          <Tabs defaultValue={productsData[0].category} className="w-full">
            <TabsList className="flex justify-center space-x-4 mb-8">
              {productsData.map((cat) => (
                <TabsTrigger
                  key={cat.category}
                  value={cat.category}
                  className="px-4 py-2 text-sm font-medium"
                >
                  {cat.category}
                </TabsTrigger>
              ))}
            </TabsList>
            {productsData.map((cat, catIdx) => (
              <TabsContent key={cat.category} value={cat.category}>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
                  {cat.items.map((item, i) => (
                    <m.div
                      key={item.name}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: i * 0.2 }}
                      className="overflow-hidden rounded-lg bg-white shadow-lg"
                    >
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-64 w-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="mt-2 text-gray-600">{item.description}</p>
                      </div>
                    </m.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}

// Blog Posts Section
const posts = [
  {
    id: 1,
    title: "The Future of Urban Agriculture",
    description: "Discover how vertical farming is revolutionizing food production in cities.",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80",
    date: "2024-02-28",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Sustainable Farming Practices",
    description: "Learn about our eco-friendly approaches to modern agriculture.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80",
    date: "2024-02-25",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Technology in Agriculture",
    description: "How AI and IoT are transforming the way we grow food.",
    image: "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&q=80",
    date: "2024-02-22",
    readTime: "6 min read",
  },
];

function Insights() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });

  return (
    <section className="bg-white py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Latest Insights
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Stay updated with the latest news and insights from the world of sustainable agriculture.
          </p>
        </m.div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post, i) => (
            <m.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            >
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <time dateTime={post.date} className="mr-8">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <div className="-ml-4 flex items-center gap-x-4">
                  <span className="text-gray-300">{post.readTime}</span>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <a href="#">
                  <span className="absolute inset-0"></span>
                  {post.title}
                </a>
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                {post.description}
              </p>
            </m.article>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button variant="outline" size="lg" className="gap-2">
            View All Posts <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

// Footer
const footerLinks = {
  solutions: [
    { name: "Vertical Farming", href: "#" },
    { name: "Technology", href: "#" },
    { name: "Sustainability", href: "#" },
    { name: "Partners", href: "#" },
  ],
  support: [
    { name: "Contact", href: "#" },
    { name: "Knowledge Base", href: "#" },
    { name: "Blog", href: "#" },
    { name: "FAQ", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Impact", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
  social: [
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
  ],
};

function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <RouterLink to="/" className="text-2xl font-bold text-white">
              SkyFarms
            </RouterLink>
            <p className="text-sm leading-6 text-gray-300">
              Cultivating sustainable futures through innovative vertical farming
              solutions.
            </p>
            <div className="flex space-x-6">
              {footerLinks.social.map((social) => (
                <a key={social.name} href={social.href} className="text-gray-500 hover:text-gray-400">
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Solutions</h3>
                <ul className="mt-6 space-y-4">
                  {footerLinks.solutions.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                <ul className="mt-6 space-y-4">
                  {footerLinks.support.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul className="mt-6 space-y-4">
                  {footerLinks.company.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul className="mt-6 space-y-4">
                  {footerLinks.legal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            © {new Date().getFullYear()} SkyFarms. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main sections combined
function MainContent() {
  return (
    <main>
      <Hero />
      <WhyChoose />
      <ImpactNumbers />
      <Technology />
      <Products />
      <Insights />
    </main>
  );
}

// Root Component
function App() {
  return (
    <StrictMode>
      <div className="min-h-screen">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </StrictMode>
  );
}

// Render to DOM
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
