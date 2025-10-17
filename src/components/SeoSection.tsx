import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Globe2, ShieldCheck } from 'lucide-react';

const seoHighlights = [
  {
    title: 'Optimized for Sports Streaming Keywords',
    description:
      'Calypso is engineered to rank for sports streaming, live broadcasting, and RTMP configuration searches so athletes and clubs can discover the app quickly.',
    icon: CheckCircle2
  },
  {
    title: 'Global Reach with Multilingual Support',
    description:
      'English and Spanish landing page copy, localized metadata, and structured data help Calypso reach fans, federations, and broadcasters across markets.',
    icon: Globe2
  },
  {
    title: 'Trust Signals Built In',
    description:
      'Transparent privacy policy, free pricing, and early access community proof improve click-through rates and keep Google satisfied with high-quality content.',
    icon: ShieldCheck
  }
];

const faqItems = [
  {
    question: 'What is Calypso and how is it different from other sports streaming apps?',
    answer:
      'Calypso is a free Android application designed exclusively for sports streaming. It combines HD broadcasts, live scoreboards, and team management tools in a single mobile-first experience so you can go live without a laptop.'
  },
  {
    question: 'Can I stream to YouTube, Twitch, and custom RTMP servers?',
    answer:
      'Yes. Calypso offers one-tap presets for YouTube Live and Twitch, plus a manual RTMP setup for Facebook Live or any private server, ensuring professional output wherever your fans watch.'
  },
  {
    question: 'Is Calypso really free and what about future pricing?',
    answer:
      'Every current feature in Calypso—HD streaming, overlays, local recording, and analytics—is 100% free during early access. We will always offer a free plan for grassroots clubs, with optional pro upgrades announced transparently.'
  }
];

const SeoSection = () => {
  const faqSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    }),
    []
  );

  return (
    <section
      id="seo-insights"
      className="relative py-16 lg:py-24 overflow-hidden border-t border-gray-800/60"
      aria-labelledby="seo-highlights-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center space-y-6"
        >
          <motion.span
            className="inline-flex items-center justify-center rounded-full border border-purple-500/40 bg-purple-500/10 px-5 py-2 text-sm font-medium text-purple-200"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            SEO Strategy &amp; Trust Signals
          </motion.span>
          <motion.h2
            id="seo-highlights-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Built to dominate sports streaming search results
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 lg:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            This landing page blends compelling storytelling, long-tail keyword coverage, and technical markup so Google, Bing, and social platforms instantly understand the value of Calypso.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
          {seoHighlights.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <motion.article
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-700/60 bg-gray-900/60 p-8 text-left shadow-lg backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 text-purple-200">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-200">
                    {highlight.title}
                  </h3>
                </div>
                <p className="mt-4 text-base text-gray-300 leading-relaxed">{highlight.description}</p>
              </motion.article>
            );
          })}
        </div>

        <div
          className="mt-16 rounded-3xl border border-purple-500/40 bg-purple-500/10 p-8 lg:p-12"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          <div className="max-w-4xl mx-auto text-left">
            <h3 className="text-2xl font-bold text-white lg:text-3xl" id="faq-heading">
              Sports streaming FAQ
            </h3>
            <p className="mt-3 text-gray-200">
              Answers to the most-searched questions about Calypso so search engines can display rich snippets that boost click-through rates.
            </p>

            <dl className="mt-8 space-y-6" aria-labelledby="faq-heading">
              {faqItems.map((item) => (
                <div key={item.question} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <dt className="text-xl font-semibold text-white" itemProp="name">
                    {item.question}
                  </dt>
                  <dd className="mt-2 text-base text-gray-200" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <span itemProp="text">{item.answer}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </section>
  );
};

export default SeoSection;
