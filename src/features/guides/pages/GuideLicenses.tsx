import { BackButton } from '@/features/guides/components/BackButton'
import { LicenseCard } from '@/features/guides/components/LicenseCard'
import { localLicenses, nationalLicenses } from '@/features/guides/data/guides'
import { Header } from '@/components/layout/header'

export function GuideLicenses() {
  return (
    <>
      <Header className='md:hidden border-b border-gray-100 bg-white' />
      <div className='min-h-full bg-white px-4 sm:px-8 lg:px-12 xl:px-[160px] pb-16 pt-6 sm:pt-10'>
      {/* Header row */}
      <div className='mb-6 flex flex-col md:flex-row max-w-[860px] items-start gap-6 md:gap-0 justify-between'>
        <div className='max-w-[580px]'>
          <h1 className='mb-3 text-[22px] font-semibold text-gray-900'>
            Licenses and Permits for Innovatech Academy: A Complete Compliance Guide
          </h1>
          <p className='text-[13px] leading-relaxed text-gray-500'>
            An in-depth overview of forms, fees, and official channels, specifically tailored to
            ensure full compliance for your Tashkent-based educational institution. Explore all the
            key steps to maintain legal operations in Uzbekistan&apos;s regulatory environment
            without listing any specific licenses.
          </p>
        </div>
        <img
          src='https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500'
          alt='Government building'
          className='w-full sm:w-[240px] h-[160px] shrink-0 rounded-xl object-cover'
        />
      </div>

      <BackButton />

      {/* Article content */}
      <div className='max-w-[860px]'>
        <h1 className='mb-5 mt-6 text-[22px] font-extrabold text-gray-900'>
          Comprehensive Licenses Report for Innovatech Academy
        </h1>

        <p className='text-[13.5px] leading-[1.75] text-gray-700'>
          Operating a school in Tashkent, Uzbekistan, requires navigating several governmental
          processes to ensure compliance with educational, tax, and safety regulations. Below is a
          detailed summary of all relevant considerations, including the distinctions between
          national and local requirements, the various authorities responsible for oversight, and
          the associated procedures necessary for Innovatech Academy&apos;s continued operation in
          the region.
        </p>

        {/* Federal and National Considerations */}
        <h2 className='mb-3 mt-8 text-[17px] font-bold text-gray-900'>
          Federal and National Considerations
        </h2>

        <p className='text-[13.5px] leading-[1.75] text-gray-700'>
          On the national level, acquiring a formal license from the Ministry of Public Education
          of the Republic of Uzbekistan is paramount for any institution offering academic programs
          in STEM or related fields. This entails meeting strict curriculum guidelines, teacher
          qualification standards, and infrastructure requirements. Additionally, registration with
          the national tax authority and compliance with national safety regulations ensure official
          recognition of the Academy.
        </p>

        <h3 className='mb-2 mt-5 text-[14px] font-bold text-gray-900'>Forms and Applications</h3>
        <p className='text-[13.5px] leading-[1.75] text-gray-700'>
          Educators are required to submit detailed curriculum outlines, staff credentials,
          infrastructure plans, and financial documentation. These materials are typically reviewed
          by governmental committees to verify educational rigor, safety, and compliance with local
          regulations. The licensing process often involves interviews or on-site inspections to
          confirm that the institution meets necessary quality standards.
        </p>

        <h3 className='mb-2 mt-5 text-[14px] font-bold text-gray-900'>Fee Information</h3>
        <p className='text-[13.5px] leading-[1.75] text-gray-700'>
          National-level fees for educational institutions typically cover application processing
          and certification. These vary based on student capacity, educational scope, and
          institutional type. Applicants usually pay fees via bank transfer to designated government
          accounts. Proof of payment should be attached to the application when submitted.
        </p>

        <h3 className='mb-2 mt-5 text-[14px] font-bold text-gray-900'>
          Tax Authority Contact Information
        </h3>
        <p className='text-[13.5px] leading-[1.75] text-gray-700'>
          In Uzbekistan, the State Tax Committee oversees corporate and institutional tax matters.
          Innovatech Academy must register to receive its taxpayer identification number, enabling
          it to handle payroll, file tax returns, and manage financial operations in compliance with
          national laws.
        </p>

        {/* State and Local Requirements */}
        <hr className='my-8 border-gray-200' />

        <h2 className='mb-3 text-[17px] font-bold text-gray-900'>
          State and Local Requirements
        </h2>

        <p className='text-[13.5px] leading-[1.75] text-gray-700'>
          Beyond national oversight, organizations operating in Tashkent must adhere to local
          mandates set by municipal authorities and specialized agencies. These may include aspects
          of health, safety, and structural compliance. By working closely with local departments,
          Innovatech Academy can maintain a compliant, safe learning environment.
        </p>

        <h3 className='mb-2 mt-5 text-[14px] font-bold text-gray-900'>Forms and Applications</h3>
        <p className='text-[13.5px] leading-[1.75] text-gray-700'>
          Local requirements usually involve building safety compliance certificates, health and
          safety permits, and registration with municipal education boards. Institutions must also
          schedule inspections to demonstrate readiness to operate at capacity under city
          regulations.
        </p>

        <h3 className='mb-2 mt-5 text-[14px] font-bold text-gray-900'>Fee Information</h3>
        <p className='text-[13.5px] leading-[1.75] text-gray-700'>
          Local fees may apply for building inspections, sanitary certifications, and facility
          permits. Payment procedures depend on local administrative offices. Innovatech Academy
          should stay informed of any revised municipal fees and guidelines to avoid compliance
          delays.
        </p>

        <h3 className='mb-2 mt-5 text-[14px] font-bold text-gray-900'>Contact Details</h3>
        <div className='text-[13px] leading-[1.8] text-gray-700'>
          <p>
            <span className='font-bold'>• Tashkent City Administration:</span> Provides guidance
            on commercial facility registration and local zoning rules.{' '}
            <span className='font-bold'>• Municipal Fire Department:</span> Responsible for
            conducting fire safety inspections and issuing compliance certificates.{' '}
            <span className='font-bold'>• Local Sanitary-Epidemiological Agency:</span> Handles
            health-related permits and ensures the institution meets hygiene standards.
          </p>
        </div>

        <h2 className='mb-3 mt-8 text-[17px] font-bold text-gray-900'>Important Reminders</h2>
        <div className='text-[13px] leading-[1.8] text-gray-700'>
          <p>
            <span className='font-bold'>• Document Tracking:</span> Retain all evidence of
            payments, correspondence, and approvals for potential audits.{' '}
            <span className='font-bold'>• Deadlines:</span> Submission windows can vary, so ensure
            that all forms and fees are processed before official deadlines.{' '}
            <span className='font-bold'>• Legal Representation:</span> Engaging a local consultant
            or lawyer can streamline the application process and help navigate local nuances.
          </p>
        </div>

        <p className='mt-6 text-[13.5px] leading-[1.75] text-gray-700'>
          By obtaining the appropriate licenses, maintaining accurate records, and continuously
          monitoring changes to regulations, Innovatech Academy will be well-equipped to operate
          within all federal, state, and local guidelines.
        </p>

        {/* National license cards */}
        <h2 className='mb-4 mt-10 text-[16px] font-semibold text-gray-900'>National</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {nationalLicenses.map((card) => (
            <LicenseCard
              key={card.title}
              title={card.title}
              level={card.level}
              description={card.description}
              link={card.link}
            />
          ))}
        </div>

        {/* Local license cards */}
        <h2 className='mb-4 mt-8 text-[16px] font-semibold text-gray-900'>Local</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {localLicenses.map((card) => (
            <LicenseCard
              key={card.title}
              title={card.title}
              level={card.level}
              description={card.description}
              link={card.link}
            />
          ))}
        </div>
        </div>
      </div>
    </>
  )
}
