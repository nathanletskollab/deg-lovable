import { motion } from 'framer-motion'
import section2Bg from '@/assets/section2-bg.png?format=webp&as=url'
import beachVideo from '@/assets/beach-video.mp4'
import beachPoster from '@/assets/beach-poster.jpg'

const QuoteVideoSection = () => {
  return (
    <section
      data-navbar-theme="light"
      className="section-layer relative z-[4]"
      style={{ background: 'hsl(var(--primary))' }}
    >
      {/* Atmospheric background texture over pine */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${section2Bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.14,
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Quote area */}
      <div className="relative w-full overflow-hidden pt-16 md:pt-40 pb-10 md:pb-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-5xl mx-auto"
        >
          {/* Opening quote mark */}
          <span className="block leading-none mb-6 md:mb-8" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <svg
              className="w-16 h-16 md:w-24 md:h-24"
              viewBox="0 0 144 119"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M29.5749 118.801C25.5647 118.801 21.5546 118.132 17.5444 116.796C13.5343 115.459 9.35702 112.786 5.01269 108.775C3.34179 103.763 2.00508 98.9171 1.00254 94.2386C0.334179 89.2259 0 84.3803 0 79.7018C0 66.0004 2.67343 53.97 8.0203 43.6104C13.3672 32.9167 20.552 24.0609 29.5749 17.0432C38.5977 9.69121 48.456 4.01016 59.1497 0L63.6612 11.0279C55.6409 15.3723 48.7902 19.8837 43.1091 24.5622C37.4281 28.9065 32.7496 34.0863 29.0736 40.1015C25.3976 45.7826 21.8887 53.4687 18.547 63.1599L17.5444 49.6256L40.1015 64.1624C46.4509 67.8384 50.9623 72.0156 53.6358 76.6942C56.3092 81.3727 57.6459 86.0512 57.6459 90.7297C57.6459 99.0842 55.1396 105.935 50.1269 111.282C45.1142 116.294 38.2635 118.801 29.5749 118.801ZM109.813 118.801C105.803 118.801 101.793 118.132 97.783 116.796C93.7728 115.459 89.5956 112.786 85.2513 108.775C83.5804 103.763 82.2436 98.9171 81.2411 94.2386C80.5728 89.2259 80.2386 84.3803 80.2386 79.7018C80.2386 66.0004 82.912 53.97 88.2589 43.6104C93.6057 32.9167 100.791 24.0609 109.813 17.0432C118.836 9.69121 128.695 4.01016 139.388 0L143.9 11.0279C135.879 15.3723 129.029 19.8837 123.348 24.5622C117.667 28.9065 112.988 34.0863 109.312 40.1015C105.636 45.7826 102.127 53.4687 98.7855 63.1599L97.783 49.6256L120.34 64.1624C126.689 67.8384 131.201 72.0156 133.874 76.6942C136.548 81.3727 137.885 86.0512 137.885 90.7297C137.885 99.0842 135.378 105.935 130.365 111.282C125.353 116.294 118.502 118.801 109.813 118.801Z" />
            </svg>
          </span>

          {/* Quote text — explicitly white */}
          <blockquote className="type-display font-normal leading-[1.2] tracking-tight">
            <span className="italic" style={{ color: 'rgba(255,255,255,0.55)' }}>Health lives in balance</span>
            <span style={{ color: 'rgba(255,255,255,0.80)' }}>—when your body is at ease, your energy flows, and you're free to be present for what matters.</span>
          </blockquote>
        </motion.div>
      </div>

      {/* Video + bridge wrapper */}
      <div className="relative px-6 md:px-8 pb-[120px] md:pb-[160px]">
        {/* Bridge: cream section behind the video's lower half */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[55%] rounded-t-[var(--section-radius)] z-[0]"
          style={{ backgroundColor: 'hsl(var(--background))' }}
        />

        {/* Video — floats above the bridge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-[1] w-full max-w-[1320px] mx-auto"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={beachPoster}
              className="w-full h-auto object-cover aspect-video"
            >
              <source src={beachVideo} type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default QuoteVideoSection
