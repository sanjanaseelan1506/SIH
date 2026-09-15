-- CreateTable
CREATE TABLE "Scheme" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "maxIncome" DOUBLE PRECISION NOT NULL,
    "maxProjectCost" DOUBLE PRECISION NOT NULL,
    "maxLoanAmount" DOUBLE PRECISION NOT NULL,
    "financingPercentage" DOUBLE PRECISION NOT NULL,
    "interestRate" DOUBLE PRECISION NOT NULL,
    "moratoriumMonths" INTEGER NOT NULL,
    "tenureMonths" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "requiredDocuments" TEXT NOT NULL,

    CONSTRAINT "Scheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChannelPartner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "supportedSchemes" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "fundStatus" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,

    CONSTRAINT "ChannelPartner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "income" DOUBLE PRECISION NOT NULL,
    "purpose" TEXT NOT NULL,
    "business" TEXT,
    "projectCost" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "preferredLanguage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "schemeId" TEXT NOT NULL,
    "matchScore" DOUBLE PRECISION NOT NULL,
    "matchReason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
