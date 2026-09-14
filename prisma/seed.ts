import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Schemes
  const microFinance = await prisma.scheme.create({
    data: {
      name: 'Micro Finance Scheme',
      category: 'Business',
      maxIncome: 300000,
      maxProjectCost: 150000,
      maxLoanAmount: 140000,
      financingPercentage: 90,
      interestRate: 6.5,
      moratoriumMonths: 6,
      tenureMonths: 36,
      description: 'Intended for small projects to support marginalized entrepreneurs. Demo scheme data based on the hackathon problem statement. Final eligibility and terms must be verified with the authorized agency.',
      requiredDocuments: 'Aadhar, Income Certificate, Project Report',
    },
  })

  const termLoan = await prisma.scheme.create({
    data: {
      name: 'Term Loan Scheme',
      category: 'Business',
      maxIncome: 500000,
      maxProjectCost: 5500000,
      maxLoanAmount: 5000000,
      financingPercentage: 90,
      interestRate: 7.0,
      moratoriumMonths: 6,
      tenureMonths: 60,
      description: 'Intended for larger projects requiring significant capital. Demo scheme data based on the hackathon problem statement. Final eligibility and terms must be verified with the authorized agency.',
      requiredDocuments: 'Aadhar, Income Certificate, Detailed Project Report, Bank Statement',
    },
  })

  const educationLoan = await prisma.scheme.create({
    data: {
      name: 'Educational Loan Scheme',
      category: 'Education',
      maxIncome: 600000,
      maxProjectCost: 1000000,
      maxLoanAmount: 900000,
      financingPercentage: 90,
      interestRate: 4.0,
      moratoriumMonths: 12,
      tenureMonths: 60,
      description: 'Intended for education-related requirements. Demo scheme data based on the hackathon problem statement. Final eligibility and terms must be verified with the authorized agency.',
      requiredDocuments: 'Aadhar, Income Certificate, Admission Letter, Fee Structure',
    },
  })

  // Create Channel Partners
  await prisma.channelPartner.create({
    data: {
      name: 'State Channelizing Agency - Demo',
      type: 'State Channelizing Agency',
      city: 'Chennai',
      latitude: 13.0827,
      longitude: 80.2707,
      supportedSchemes: [microFinance.id, termLoan.id, educationLoan.id].join(','),
      active: true,
      fundStatus: 'Funds Available',
      address: '123 Main St, Chennai, Tamil Nadu',
      contact: '+91 9876543210',
    },
  })

  await prisma.channelPartner.create({
    data: {
      name: 'Public Sector Bank - Demo',
      type: 'Public Sector Bank',
      city: 'Chennai',
      latitude: 13.0600,
      longitude: 80.2400,
      supportedSchemes: [termLoan.id, educationLoan.id].join(','),
      active: true,
      fundStatus: 'Funds Available',
      address: '456 Bank St, Chennai, Tamil Nadu',
      contact: '+91 9876543211',
    },
  })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
