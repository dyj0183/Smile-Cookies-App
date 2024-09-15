# Yu-Chun's Smile Cookie App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Overview

This is an application that showcases my ability to learn new things quickly and apply them to a project.

# Main Functionalities

- Read images and cookies info from AWS S3 bucket and DynamoDb through GraphQL to display them on the cookies page
- Allow users to add cookies info and save into S3 and DynamoDb
- Set up AWS Lambda function with DynamoDb stream and AWS Cloudwatch, so it sends alert through email and displays in logs if dynamoDb data is missing either cookies name or description

# Development Environment

- Nextjs
- React
- JSX
- JavaScript
- Typescript
- HTML
- CSS
- GraphQL
- AWS S3 Bucket
- AWS DynamoDb
- AWS Lambda
- AWS Cloudwatch
- Git
- GitHub
- Visual Studio Code

# Future Work

- Add update functionality
- Add delete functionality

# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
