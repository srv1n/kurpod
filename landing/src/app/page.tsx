import { BentoCard } from '@/components/bento-card'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { Keyboard } from '@/components/keyboard'
import { Link } from '@/components/link'
import { LinkedAvatars } from '@/components/linked-avatars'
import { LogoCloud } from '@/components/logo-cloud'
import { LogoCluster } from '@/components/logo-cluster'
import { LogoTimeline } from '@/components/logo-timeline'
import { Map } from '@/components/map'
import { Navbar } from '@/components/navbar'
import { Screenshot } from '@/components/screenshot'
import { Testimonials } from '@/components/testimonials'
import { Heading, Subheading } from '@/components/text'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description:
    'Kurpod - Military-grade encrypted file storage with plausible deniability. Your digital safe, invisible to everyone else.',
}

function Hero() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <Navbar
          banner={
            <Link
              href="https://github.com/srv1n/kurpod"
              className="flex items-center gap-1 rounded-full bg-gray-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-hover:bg-gray-950/30"
            >
              Open source and available on GitHub
              <ChevronRightIcon className="size-4" />
            </Link>
          }
        />
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
          <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Your digital safe.<br />Invisible to everyone else.
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            Military-grade encrypted file storage with plausible deniability. 
            One password reveals your files. Another reveals nothing.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href="https://github.com/srv1n/kurpod">View on GitHub</Button>
            <Button variant="secondary" href="/docs/installation">
              Quick start guide
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

function FeatureSection() {
  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <Heading as="h2" className="max-w-3xl">
          Bank-vault security. Notebook simplicity.
        </Heading>
        <Screenshot
          width={1216}
          height={768}
          src="/screenshots/app.png"
          className="mt-16 h-144 sm:h-auto sm:w-304"
        />
      </Container>
    </div>
  )
}

function BentoSection() {
  return (
    <Container>
      <Subheading>Security Features</Subheading>
      <Heading as="h3" className="mt-2 max-w-3xl">
        Protection that adapts to your threat model.
      </Heading>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="Plausible Deniability"
          title="Two passwords, two realities"
          description="Standard password reveals your regular files. Hidden password unlocks a concealed volume. Under duress? Use the standard password - hidden data remains mathematically undetectable."
          graphic={
            <div className="h-80 bg-[url(/screenshots/profile.png)] bg-size-[1000px_560px] bg-position-[left_-109px_top_-112px] bg-no-repeat" />
          }
          fade={['bottom']}
          className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
        />
        <BentoCard
          eyebrow="Military-Grade Encryption"
          title="XChaCha20-Poly1305 AEAD"
          description="256-bit encryption keys with 192-bit nonces ensure your data is protected by the same algorithms trusted by security professionals worldwide. Argon2id key derivation makes brute-force attacks infeasible."
          graphic={
            <div className="absolute inset-0 bg-[url(/screenshots/competitors.png)] bg-size-[1100px_650px] bg-position-[left_-38px_top_-73px] bg-no-repeat" />
          }
          fade={['bottom']}
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />
        <BentoCard
          eyebrow="Simplicity"
          title="Drag, drop, done"
          description="Upload files with a simple drag and drop. Organize with folders. View images and PDFs directly in your browser. Security doesn't mean complexity."
          graphic={
            <div className="flex size-full pt-10 pl-10">
              <Keyboard highlighted={['LeftCommand', 'LeftShift', 'U']} />
            </div>
          }
          className="lg:col-span-2 lg:rounded-bl-4xl"
        />
        <BentoCard
          eyebrow="Self-Hosted"
          title="Your server, your rules"
          description="Run on your own hardware or cloud. No external dependencies. No phone-home. Your data never touches our servers because we don't have any."
          graphic={<LogoCluster />}
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="Cross-Platform"
          title="Works everywhere"
          description="Single binary runs on Linux, macOS, and Windows. Deploy with Docker. Access through any web browser. Your encrypted vault follows you anywhere."
          graphic={<Map />}
          className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
        />
      </div>
    </Container>
  )
}

function DarkBentoSection() {
  return (
    <div className="mx-2 mt-2 rounded-4xl bg-gray-900 py-32">
      <Container>
        <Subheading dark>Advanced Features</Subheading>
        <Heading as="h3" dark className="mt-2 max-w-3xl">
          Power features for advanced threat models.
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <BentoCard
            dark
            eyebrow="Zero Knowledge"
            title="We can't see your data"
            description="All encryption happens on your device. The server only sees encrypted blobs. Even with full server access, your files remain protected by your password."
            graphic={
              <div className="h-80 bg-[url(/screenshots/networking.png)] bg-size-[851px_344px] bg-no-repeat" />
            }
            fade={['top']}
            className="max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Deployment"
            title="Deploy anywhere"
            description="From Raspberry Pi to enterprise clouds. Single binary with no dependencies. Docker, systemd, or manual deployment."
            graphic={<LogoTimeline />}
            className="z-10 overflow-visible! lg:col-span-2 lg:rounded-tr-4xl"
          />
          <BentoCard
            dark
            eyebrow="Performance"
            title="Lightning fast"
            description="Stream large files without loading them into memory. Constant-time operations prevent timing attacks. Built with Rust for maximum performance."
            graphic={<LinkedAvatars />}
            className="lg:col-span-2 lg:rounded-bl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Open Source"
            title="Verify everything"
            description="Every line of code is open source. Security through transparency, not obscurity. Community audited and battle tested. Fork it, modify it, make it yours."
            graphic={
              <div className="h-80 bg-[url(/screenshots/engagement.png)] bg-size-[851px_344px] bg-no-repeat" />
            }
            fade={['top']}
            className="max-lg:rounded-b-4xl lg:col-span-4 lg:rounded-br-4xl"
          />
        </div>
      </Container>
    </div>
  )
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <main>
        <Container className="mt-10">
          <LogoCloud />
        </Container>
        <div className="bg-linear-to-b from-white from-50% to-gray-100 py-32">
          <FeatureSection />
          <BentoSection />
        </div>
        <DarkBentoSection />
      </main>
      <Testimonials />
      <Footer />
    </div>
  )
}