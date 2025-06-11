import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient, GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { LogoCloud } from '@/components/logo-cloud'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  CheckIcon,
  ChevronUpDownIcon,
  MinusIcon,
} from '@heroicons/react/16/solid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Start with our free open-source server. Upgrade to desktop and mobile apps for the complete encrypted file storage experience.',
}

const tiers = [
  {
    name: 'Open Source' as const,
    slug: 'opensource',
    description: 'Perfect for self-hosted deployments.',
    priceMonthly: 0,
    href: 'https://github.com/srv1n/kurpod',
    highlights: [
      { description: 'Full server functionality' },
      { description: 'Web interface included' },
      { description: 'XChaCha20-Poly1305 encryption' },
      { description: 'Dual volume support' },
      { description: 'Community support' },
    ],
    features: [
      { section: 'Core Features', name: 'Server binary', value: true },
      { section: 'Core Features', name: 'Web interface', value: true },
      { section: 'Core Features', name: 'File encryption', value: true },
      { section: 'Core Features', name: 'Plausible deniability', value: true },
      { section: 'Core Features', name: 'Multiple blob support', value: true },
      { section: 'Platforms', name: 'Linux support', value: true },
      { section: 'Platforms', name: 'macOS support', value: true },
      { section: 'Platforms', name: 'Windows support', value: true },
      { section: 'Platforms', name: 'Docker support', value: true },
      { section: 'Platforms', name: 'Desktop app', value: false },
      { section: 'Platforms', name: 'Mobile app', value: false },
      { section: 'Support', name: 'GitHub issues', value: true },
      { section: 'Support', name: 'Community forum', value: true },
      { section: 'Support', name: 'Priority support', value: false },
      { section: 'Support', name: 'Security audit reports', value: false },
    ],
  },
  {
    name: 'Personal' as const,
    slug: 'personal',
    description: 'Desktop and mobile apps for individuals.',
    priceMonthly: 9.99,
    href: '#',
    highlights: [
      { description: 'Everything in Open Source' },
      { description: 'Native desktop application' },
      { description: 'iOS and Android apps' },
      { description: 'Auto-sync between devices' },
      { description: 'Priority email support' },
    ],
    features: [
      { section: 'Core Features', name: 'Server binary', value: true },
      { section: 'Core Features', name: 'Web interface', value: true },
      { section: 'Core Features', name: 'File encryption', value: true },
      { section: 'Core Features', name: 'Plausible deniability', value: true },
      { section: 'Core Features', name: 'Multiple blob support', value: true },
      { section: 'Platforms', name: 'Linux support', value: true },
      { section: 'Platforms', name: 'macOS support', value: true },
      { section: 'Platforms', name: 'Windows support', value: true },
      { section: 'Platforms', name: 'Docker support', value: true },
      { section: 'Platforms', name: 'Desktop app', value: true },
      { section: 'Platforms', name: 'Mobile app', value: true },
      { section: 'Support', name: 'GitHub issues', value: true },
      { section: 'Support', name: 'Community forum', value: true },
      { section: 'Support', name: 'Priority support', value: true },
      { section: 'Support', name: 'Security audit reports', value: 'Quarterly' },
    ],
  },
  {
    name: 'Team' as const,
    slug: 'team',
    description: 'Advanced features for teams and organizations.',
    priceMonthly: 29.99,
    href: '#',
    highlights: [
      { description: 'Everything in Personal' },
      { description: 'Multi-user support' },
      { description: 'Centralized administration' },
      { description: 'Audit logs' },
      { description: 'Dedicated support' },
    ],
    features: [
      { section: 'Core Features', name: 'Server binary', value: true },
      { section: 'Core Features', name: 'Web interface', value: true },
      { section: 'Core Features', name: 'File encryption', value: true },
      { section: 'Core Features', name: 'Plausible deniability', value: true },
      { section: 'Core Features', name: 'Multiple blob support', value: true },
      { section: 'Platforms', name: 'Linux support', value: true },
      { section: 'Platforms', name: 'macOS support', value: true },
      { section: 'Platforms', name: 'Windows support', value: true },
      { section: 'Platforms', name: 'Docker support', value: true },
      { section: 'Platforms', name: 'Desktop app', value: true },
      { section: 'Platforms', name: 'Mobile app', value: true },
      { section: 'Support', name: 'GitHub issues', value: true },
      { section: 'Support', name: 'Community forum', value: true },
      { section: 'Support', name: 'Priority support', value: true },
      { section: 'Support', name: 'Security audit reports', value: 'Monthly' },
    ],
  },
]

function Header() {
  return (
    <Container className="mt-16">
      <Heading as="h1">Start free. Upgrade when you need more.</Heading>
      <Lead className="mt-6 max-w-3xl">
        Our open-source server is free forever. Add desktop and mobile apps when
        you're ready for the complete experience. Your data always remains under
        your control.
      </Lead>
    </Container>
  )
}

function PricingCards() {
  return (
    <div className="relative py-24">
      <Gradient className="absolute inset-x-2 top-48 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {tiers.map((tier, tierIndex) => (
            <PricingCard key={tierIndex} tier={tier} />
          ))}
        </div>
        <LogoCloud className="mt-24" />
      </Container>
    </div>
  )
}

function PricingCard({ tier }: { tier: (typeof tiers)[number] }) {
  return (
    <div className="-m-2 grid grid-cols-1 rounded-4xl shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
      <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/5">
        <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
          <Subheading>{tier.name}</Subheading>
          <p className="mt-2 text-sm/6 text-gray-950/75">{tier.description}</p>
          <div className="mt-8 flex items-center gap-4">
            <div className="text-5xl font-medium text-gray-950">
              {tier.priceMonthly === 0 ? 'Free' : `$${tier.priceMonthly}`}
            </div>
            {tier.priceMonthly > 0 && (
              <div className="text-sm/5 text-gray-950/75">
                <p>USD</p>
                <p>per month</p>
              </div>
            )}
          </div>
          <div className="mt-8">
            <Button href={tier.href}>
              {tier.priceMonthly === 0 ? 'View on GitHub' : 'Start free trial'}
            </Button>
          </div>
          <div className="mt-8">
            <h3 className="text-sm/6 font-medium text-gray-950">
              What's included:
            </h3>
            <ul className="mt-3 space-y-3">
              {tier.highlights.map((props, featureIndex) => (
                <FeatureItem key={featureIndex} {...props} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function PricingTable({
  selectedTier,
}: {
  selectedTier: (typeof tiers)[number]
}) {
  return (
    <Container className="py-24">
      <table className="w-full text-left">
        <caption className="sr-only">Pricing plan comparison</caption>
        <colgroup>
          <col className="w-3/5 sm:w-2/5" />
          <col
            data-selected={selectedTier === tiers[0] ? true : undefined}
            className="w-2/5 data-selected:table-column max-sm:hidden sm:w-1/5"
          />
          <col
            data-selected={selectedTier === tiers[1] ? true : undefined}
            className="w-2/5 data-selected:table-column max-sm:hidden sm:w-1/5"
          />
          <col
            data-selected={selectedTier === tiers[2] ? true : undefined}
            className="w-2/5 data-selected:table-column max-sm:hidden sm:w-1/5"
          />
        </colgroup>
        <thead>
          <tr className="max-sm:hidden">
            <td className="p-0" />
            {tiers.map((tier) => (
              <th
                key={tier.slug}
                scope="col"
                data-selected={selectedTier === tier ? true : undefined}
                className="p-0 data-selected:table-cell max-sm:hidden"
              >
                <Subheading as="div">{tier.name}</Subheading>
              </th>
            ))}
          </tr>
          <tr className="sm:hidden">
            <td className="p-0">
              <div className="relative inline-block">
                <Menu>
                  <MenuButton className="flex items-center justify-between gap-2 font-medium">
                    {selectedTier.name}
                    <ChevronUpDownIcon className="size-4 fill-gray-900" />
                  </MenuButton>
                  <MenuItems
                    anchor="bottom start"
                    className="min-w-(--button-width) rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200 [--anchor-gap:6px] [--anchor-offset:-4px] [--anchor-padding:10px]"
                  >
                    {tiers.map((tier) => (
                      <MenuItem key={tier.slug}>
                        <Link
                          scroll={false}
                          href={`/pricing?tier=${tier.slug}`}
                          data-selected={
                            tier === selectedTier ? true : undefined
                          }
                          className="group flex items-center gap-2 rounded-md px-2 py-1 data-focus:bg-gray-200"
                        >
                          {tier.name}
                          <CheckIcon className="hidden size-4 group-data-selected:block" />
                        </Link>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                  <ChevronUpDownIcon className="size-4 fill-gray-900" />
                </div>
              </div>
            </td>
            <td colSpan={3} className="p-0 text-right">
              <Button variant="outline" href={selectedTier.href}>
                Get started
              </Button>
            </td>
          </tr>
          <tr className="max-sm:hidden">
            <th className="p-0" scope="row">
              <span className="sr-only">Get started</span>
            </th>
            {tiers.map((tier) => (
              <td
                key={tier.slug}
                data-selected={selectedTier === tier ? true : undefined}
                className="px-0 pt-4 pb-0 data-selected:table-cell max-sm:hidden"
              >
                <Button variant="outline" href={tier.href}>
                  Get started
                </Button>
              </td>
            ))}
          </tr>
        </thead>
        {[...new Set(tiers[0].features.map(({ section }) => section))].map(
          (section) => (
            <tbody key={section} className="group">
              <tr>
                <th
                  scope="colgroup"
                  colSpan={4}
                  className="px-0 pt-10 pb-0 group-first-of-type:pt-5"
                >
                  <div className="-mx-4 rounded-lg bg-gray-50 px-4 py-3 text-sm/6 font-semibold">
                    {section}
                  </div>
                </th>
              </tr>
              {tiers[0].features
                .filter((feature) => feature.section === section)
                .map(({ name }) => (
                  <tr
                    key={name}
                    className="border-b border-gray-100 last:border-none"
                  >
                    <th
                      scope="row"
                      className="px-0 py-4 text-sm/6 font-normal text-gray-600"
                    >
                      {name}
                    </th>
                    {tiers.map((tier) => {
                      let value = tier.features.find(
                        (feature) =>
                          feature.section === section && feature.name === name,
                      )?.value

                      return (
                        <td
                          key={tier.slug}
                          data-selected={
                            selectedTier === tier ? true : undefined
                          }
                          className="p-4 data-selected:table-cell max-sm:hidden"
                        >
                          {value === true ? (
                            <>
                              <CheckIcon className="size-4 fill-green-600" />
                              <span className="sr-only">
                                Included in {tier.name}
                              </span>
                            </>
                          ) : value === false || value === undefined ? (
                            <>
                              <MinusIcon className="size-4 fill-gray-400" />
                              <span className="sr-only">
                                Not included in {tier.name}
                              </span>
                            </>
                          ) : (
                            <div className="text-sm/6">{value}</div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
            </tbody>
          ),
        )}
      </table>
    </Container>
  )
}

function FeatureItem({
  description,
  disabled = false,
}: {
  description: string
  disabled?: boolean
}) {
  return (
    <li
      data-disabled={disabled ? true : undefined}
      className="flex items-start gap-4 text-sm/6 text-gray-950/75 data-disabled:text-gray-950/25"
    >
      <span className="inline-flex h-6 items-center">
        <PlusIcon className="size-3.75 shrink-0 fill-gray-950/25" />
      </span>
      {disabled && <span className="sr-only">Not included:</span>}
      {description}
    </li>
  )
}

function PlusIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 15 15" aria-hidden="true" {...props}>
      <path clipRule="evenodd" d="M8 0H7v7H0v1h7v7h1V8h7V7H8V0z" />
    </svg>
  )
}

function Testimonial() {
  return (
    <div className="mx-2 my-24 rounded-4xl bg-gray-900 bg-[url(/dot-texture.svg)] pt-72 pb-24 lg:pt-36">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[384px_1fr_1fr]">
          <div className="-mt-96 lg:-mt-52">
            <div className="-m-2 rounded-4xl bg-white/15 shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:max-w-xs">
              <div className="rounded-4xl p-2 shadow-md shadow-black/5">
                <div className="overflow-hidden rounded-3xl shadow-2xl outline outline-1 -outline-offset-1 outline-black/10">
                  <img
                    alt=""
                    src="/testimonials/tina-yards.jpg"
                    className="aspect-3/4 w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex max-lg:mt-16 lg:col-span-2 lg:px-16">
            <figure className="mx-auto flex max-w-xl flex-col gap-16 max-lg:text-center">
              <blockquote>
                <p className="relative text-3xl tracking-tight text-white before:absolute before:-translate-x-full before:content-['"'] after:absolute after:content-['"'] lg:text-4xl">
                  Kurpod gives me peace of mind. My sensitive documents are protected by
                  military-grade encryption, and the plausible deniability feature means
                  I can travel without worry.
                </p>
              </blockquote>
              <figcaption className="mt-auto">
                <p className="text-sm/6 font-medium text-white">Sarah Chen</p>
                <p className="text-sm/6 font-medium">
                  <span className="bg-linear-to-r from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff] bg-clip-text text-transparent">
                    Independent Journalist
                  </span>
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </div>
  )
}

function FrequentlyAskedQuestions() {
  return (
    <Container>
      <section id="faqs" className="scroll-mt-8">
        <Subheading className="text-center">
          Frequently asked questions
        </Subheading>
        <Heading as="div" className="mt-2 text-center">
          Your questions answered.
        </Heading>
        <div className="mx-auto mt-16 mb-32 max-w-xl space-y-12">
          <dl>
            <dt className="text-sm font-semibold">
              How does plausible deniability work?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              Kurpod uses a dual-volume system. Your standard password reveals regular files,
              while a hidden password reveals a concealed volume. The hidden volume is
              mathematically indistinguishable from random data. Under duress, you can
              provide the standard password, and there's no way to prove a hidden volume exists.
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-semibold">
              Is the open-source version really free forever?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              Yes. The server component is AGPLv3 licensed and will always be free. You can
              self-host it on your own hardware, modify the code, and use it without any
              limitations. The desktop and mobile apps are optional paid upgrades that
              provide a more convenient experience.
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-semibold">
              What encryption standards do you use?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              We use XChaCha20-Poly1305 AEAD encryption with 256-bit keys and 192-bit nonces.
              Password derivation uses Argon2id with 64 MiB memory cost and 3 iterations.
              These are modern, audited algorithms recommended by security professionals.
              All cryptographic operations are constant-time to prevent timing attacks.
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-semibold">
              Can you access my files?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              No. Kurpod uses zero-knowledge architecture. All encryption happens on your
              device before data reaches the server. The server only sees encrypted blobs.
              Even with full server access, your files remain protected by your password.
              This is why we can safely open-source the server code.
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-semibold">
              Do I need technical knowledge to use Kurpod?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              Not at all. While Kurpod can be deployed using Docker or systemd for advanced
              users, the basic setup is just running a single binary. The web interface is
              intuitive with drag-and-drop file uploads. If you can use Google Drive, you
              can use Kurpod. The only difference is your files are actually secure.
            </dd>
          </dl>
        </div>
      </section>
    </Container>
  )
}

export default function Pricing({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  let tier =
    typeof searchParams.tier === 'string'
      ? tiers.find(({ slug }) => slug === searchParams.tier)!
      : tiers[0]

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Header />
      <PricingCards />
      <PricingTable selectedTier={tier} />
      <Testimonial />
      <FrequentlyAskedQuestions />
      <Footer />
    </main>
  )
}