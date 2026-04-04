import { BackButton } from '@/features/guides/components/back-button'
import { SortableTable } from '@/features/guides/components/sortable-table'
import { UpgradeGate } from '@/features/guides/components/upgrade-gate'

export function GuideMarketing() {
  return (
    <div className='min-h-full bg-white px-[160px] pb-16 pt-10'>
      {/* Header row */}
      <div className='mb-2 flex max-w-[860px] items-start justify-between'>
        <div className='max-w-[580px]'>
          <h1 className='mb-3 text-[22px] font-semibold text-gray-900'>
            Shaping STEM Success: Marketing Strategies for Innovatech Academy
          </h1>
          <p className='text-[13px] leading-relaxed text-gray-500'>
            Discover a variety of scalable and creative marketing tactics tailored to Innovatech
            Academy&apos;s STEM focus in Tashkent and beyond, designed to enhance community
            engagement and elevate brand awareness.
          </p>
        </div>
        <img
          src='https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=500'
          alt='Registan, Samarkand'
          className='min-h-[160px] min-w-[240px] max-h-[160px] max-w-[240px] shrink-0 rounded-xl object-cover'
        />
      </div>

      <BackButton />

      {/* Article content */}
      <div className='max-w-[860px]'>
        <h2 className='mb-4 mt-6 text-[19px] font-bold text-gray-900'>Marketing Overview</h2>

        <p className='mb-6 text-[13.5px] leading-[1.75] text-gray-700'>
          Innovatech Academy, situated in Tashkent, Uzbekistan, focuses on preparing students with
          a strong foundation in STEM disciplines. Given the region&apos;s growing interest in
          science and technology, there is a clear opportunity to raise awareness and establish a
          presence among both local families and potential strategic partners. By building upon its
          strengths—modern teaching methods, innovative curriculum, and a commitment to critical
          thinking—Innovatech Academy can craft a unique identity that appeals to students eager to
          pursue advanced fields.
        </p>

        <h3 className='mb-3 mt-6 text-[15px] font-bold text-gray-900'>
          Local and Regional Context
        </h3>

        <ul className='space-y-0'>
          {[
            {
              label: "Uzbekistan's Emphasis on STEM",
              text: 'The country is increasingly recognizing the importance of science and technology, making it an optimal time for an academy that specializes in these areas.',
            },
            {
              label: 'Cultural Communication',
              text: 'Tashkent is diverse, offering an environment where targeted messages resonate with varying backgrounds and interests.',
            },
            {
              label: 'Community Engagement',
              text: "A focus on hands-on projects and real-world applications can reinforce Innovatech Academy's distinctive edge.",
            },
          ].map((item) => (
            <li key={item.label} className='mb-2 flex items-start gap-2'>
              <span className='mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400' />
              <span className='text-[13.5px] leading-[1.7] text-gray-700'>
                <span className='font-semibold'>{item.label}:</span> {item.text}
              </span>
            </li>
          ))}
        </ul>

        <h3 className='mb-3 mt-6 text-[15px] font-bold text-gray-900'>Opportunities</h3>

        <ul className='space-y-0'>
          {[
            {
              label: 'Online Platforms',
              text: 'Digital media channels can help the Academy reach families who value modern, technology-forward education.',
            },
            {
              label: 'Local Partnerships',
              text: 'Collaboration with regional organizations and academic institutions can promote STEM initiatives, competitions, and forums.',
            },
            {
              label: 'Thought Leadership',
              text: 'Hosting community events, forums, and hackathons can elevate the Academy\u2019s reputation as a leader in STEM education.',
            },
          ].map((item) => (
            <li key={item.label} className='mb-2 flex items-start gap-2'>
              <span className='mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400' />
              <span className='text-[13.5px] leading-[1.7] text-gray-700'>
                <span className='font-semibold'>{item.label}:</span> {item.text}
              </span>
            </li>
          ))}
        </ul>

        <hr className='my-8 border-gray-200' />

        <h2 className='mb-4 mt-6 text-[19px] font-bold text-gray-900'>Strategic Positioning</h2>

        <p className='mb-6 text-[13.5px] leading-[1.75] text-gray-700'>
          Innovatech Academy can leverage its modern curriculum to differentiate itself in the
          academic landscape. Emphasizing interactive learning, labs, and workshops can attract
          students who want more than a traditional classroom experience. By blending technology with
          rigorous education standards, the Academy can stand out in Tashkent&apos;s competitive
          market.
        </p>

        <hr className='my-8 border-gray-200' />

        <p className='text-[13.5px] leading-[1.75] text-gray-700'>
          By being mindful of local practices, maintaining a clear educational vision, and
          highlighting the strengths of a STEM-focused curriculum, Innovatech Academy can build a
          strong and trusted brand in Tashkent. The following sections offer a range of actionable
          marketing tactics to establish a meaningful presence in the region.
        </p>

        <SortableTable />

        <div className='mt-8'>
          <UpgradeGate />
        </div>
      </div>
    </div>
  )
}
