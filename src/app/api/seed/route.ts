import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export async function POST(req: Request) {
  const auth = req.headers.get('authorization');
  if (auth !== 'Bearer run-seed-once') return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  try {
    await prisma.recommendation.deleteMany();
    await prisma.user.deleteMany();
    await prisma.channelPartner.deleteMany();
    await prisma.scheme.deleteMany();
    const schemes = [
      {
        name: 'Micro Finance Scheme',
        category: 'Business',
        maxIncome: 300000,
        maxProjectCost: 150000,
        maxLoanAmount: 140000,
        financingPercentage: 90,
        interestRate: 6.0,
        moratoriumMonths: 6,
        tenureMonths: 36,
        description: 'Intended for small projects to support marginalized entrepreneurs. Demo scheme data based on the hackathon problem statement. Final eligibility and terms must be verified with the authorized agency.',
        requiredDocuments: 'Aadhar, Income Certificate, Project Report'
      },
      {
        name: 'Term Loan Scheme',
        category: 'Business',
        maxIncome: 500000,
        maxProjectCost: 3000000,
        maxLoanAmount: 2500000,
        financingPercentage: 85,
        interestRate: 8.5,
        moratoriumMonths: 12,
        tenureMonths: 60,
        description: 'Provides higher capital for business expansion or medium-scale setup. Demo scheme data based on the hackathon problem statement.',
        requiredDocuments: 'Aadhar, Income Certificate, Project Report, Business Registration'
      },
      {
        name: 'Educational Loan Scheme',
        category: 'Education',
        maxIncome: 400000,
        maxProjectCost: 2000000,
        maxLoanAmount: 2000000,
        financingPercentage: 100,
        interestRate: 4.0,
        moratoriumMonths: 12,
        tenureMonths: 84,
        description: 'Supports higher education expenses for professional and technical courses. Demo scheme data based on the hackathon problem statement.',
        requiredDocuments: 'Aadhar, Income Certificate, Admission Letter, Fee Structure'
      },
      {
        name: 'Women Empowerment Business Scheme',
        category: 'Business',
        maxIncome: 350000,
        maxProjectCost: 500000,
        maxLoanAmount: 450000,
        financingPercentage: 95,
        interestRate: 5.0,
        moratoriumMonths: 6,
        tenureMonths: 48,
        description: 'Special financial assistance designed to empower female entrepreneurs establishing new businesses. Demo data.',
        requiredDocuments: 'Aadhar, Income Certificate, Project Report'
      }
    ];
    const createdSchemes = [];
    for (const s of schemes) {
      createdSchemes.push(await prisma.scheme.create({ data: s }));
    }
    const partners = [
      {
        name: 'State Channelizing Agency - Chennai Central',
        type: 'State Channelizing Agency',
        city: 'Chennai',
        latitude: 13.0827,
        longitude: 80.2707,
        supportedSchemes: createdSchemes.map(s => s.id).join(','),
        active: true,
        fundStatus: 'Funds Available',
        address: '123 Main St, Parrys Corner, Chennai, Tamil Nadu',
        contact: '+91 9876543210'
      },
      {
        name: 'Public Sector Bank - T Nagar Branch',
        type: 'Partner Bank',
        city: 'Chennai',
        latitude: 13.0418,
        longitude: 80.2341,
        supportedSchemes: createdSchemes.filter(s => s.category === 'Business').map(s => s.id).join(','),
        active: true,
        fundStatus: 'High Processing Volume',
        address: '45 Usman Road, T Nagar, Chennai, Tamil Nadu',
        contact: '+91 9876543211'
      },
      {
        name: 'Rural Co-operative Society',
        type: 'Co-operative Society',
        city: 'Tambaram',
        latitude: 12.9229,
        longitude: 80.1275,
        supportedSchemes: createdSchemes.filter(s => s.name.includes('Micro')).map(s => s.id).join(','),
        active: true,
        fundStatus: 'Funds Available',
        address: '88 GST Road, Tambaram, Chennai, Tamil Nadu',
        contact: '+91 9876543212'
      },
      {
        name: 'Educational Trust Partner',
        type: 'Authorized NGO',
        city: 'Adyar',
        latitude: 13.0012,
        longitude: 80.2565,
        supportedSchemes: createdSchemes.filter(s => s.category === 'Education').map(s => s.id).join(','),
        active: true,
        fundStatus: 'Reviewing Applications',
        address: '12 Sardar Patel Rd, Adyar, Chennai, Tamil Nadu',
        contact: '+91 9876543213'
      }
    ];
    for (const p of partners) {
      await prisma.channelPartner.create({ data: p });
    }
    return NextResponse.json({success: true, message: 'Database seeded.'});
  } catch (e: any) {
    return NextResponse.json({error: e.message}, {status: 500});
  }
}
