import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, income, purpose, business, projectCost, location, preferredLanguage } = data

    // Save user
    const user = await prisma.user.create({
      data: {
        name,
        income,
        purpose,
        business,
        projectCost,
        location,
        preferredLanguage
      }
    })

    const schemes = await prisma.scheme.findMany()

    let bestScore = -1;
    let bestScheme = null;
    let matchReason = "";

    for (const scheme of schemes) {
      let score = 0;
      let reasons = [];

      // 1. Category check
      if (purpose === 'Education' && scheme.category === 'Education') {
        score += 50;
        reasons.push("Your requirement matches the education category.");
      } else if ((purpose === 'Start Business' || purpose === 'Expand Business') && scheme.category === 'Business') {
        score += 50;
        reasons.push("Your requirement matches the business category.");
      } else {
        // If category doesn't match at all, penalize heavily
        score -= 100;
      }

      // 2. Income check
      if (income <= scheme.maxIncome) {
        score += 30;
        reasons.push("Your income is within the stated eligibility range.");
      }

      // 3. Project Cost check
      if (projectCost <= scheme.maxProjectCost) {
        score += 20;
        reasons.push("Your project cost fits the scheme's target range.");
      }

      // If business category, term loan vs micro finance distinction
      if (scheme.category === 'Business') {
        if (projectCost <= 150000 && scheme.name.includes('Micro Finance')) {
          score += 10;
        } else if (projectCost > 150000 && scheme.name.includes('Term Loan')) {
          score += 10;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestScheme = scheme;
        matchReason = reasons.join(' ');
      }
    }

    if (!bestScheme || bestScore <= 0) {
      return NextResponse.json({ error: 'No matching scheme found' }, { status: 404 })
    }

    // Convert score to percentage
    const matchPercentage = Math.min(100, Math.max(0, bestScore))

    // Simple AI Explanation (Rule-based Fallback as per instructions)
    const explanation = `Your reported family income is within the stated limit and your proposed project cost is suitable for the ${bestScheme.name}. That is why it is currently the closest match for your requirement.`

    const recommendation = await prisma.recommendation.create({
      data: {
        userId: user.id,
        schemeId: bestScheme.id,
        matchScore: matchPercentage,
        matchReason: explanation
      }
    })

    return NextResponse.json({ recommendationId: recommendation.id })
    
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
