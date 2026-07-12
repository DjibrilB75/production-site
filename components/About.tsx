'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section className="relative py-24 md:py-32 px-6 lg:px-12 bg-sunset-gradient overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.4em] uppercase text-terracotta-800/70 mb-5"
        >
          Notre savoir-faire
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl text-night-900 mb-6 text-balance"
        >
          Façonné à la main, pensé pour durer
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-night-900/70 leading-relaxed max-w-xl mx-auto"
        >
          Chaque sac Yurah naît dans notre atelier, du choix du cuir pleine
          fleur jusqu&apos;à la dernière piqûre sellier. Nous travaillons des
          teintes minérales — sable, argile, terracotta — pour que chaque
          pièce se patine et raconte une histoire différente au fil du temps.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
          {[
            { title: 'Cuir pleine fleur', desc: 'Tannage végétal, sélectionné pour sa patine naturelle.' },
            { title: 'Fait main', desc: 'Petites séries assemblées et cousues à la main en atelier.' },
            { title: 'Livraison soignée', desc: 'Emballage en coton recyclé, expédition sous 48h.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="font-display text-xl text-terracotta-800 mb-2">{item.title}</h3>
              <p className="text-sm text-night-900/60">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
