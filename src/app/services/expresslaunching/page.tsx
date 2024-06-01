// pages/dashboard.tsx

'use client';

import { useState } from 'react';
import Head from 'next/head';
import {
  Container,
  TextField,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import Layout from '@/app/components/Layout';

interface PlanInput {
  planRequestDate: string;
  amountToInvest: number;
  messagesOk: boolean;
  goal: string;
}

interface WeeklyPlan {
  weekNumber: string;
  startingDay: string;
  percentage: number;
  investment: number;
  numberOfAds: number;
  messages: number;
  links: number;
  dailyBudgetPerAd: number;
}

interface PlanOutput {
  levels: WeeklyPlan[];
  calculatedIncrease: number[];
}

function getWeekNumber(date: Date): string {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = (date.getTime() - start.getTime() + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000)) / 86400000;
  return 'W' + Math.ceil((diff + ((start.getDay() + 1) % 7)) / 7);
}

function getStartingDay(weekNumber: number, year: number): Date {
  const firstDayOfYear = new Date(year, 0, 1);
  const days = (weekNumber - 1) * 7;
  return new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + days - firstDayOfYear.getDay() + 1));
}

function roundUpAds(investment: number): number {
  if (investment <= 7) return Math.ceil(investment / 5);
  if (investment <= 20) return Math.ceil(investment / 8);
  return Math.ceil(investment / 10);
}

function calculatePlan(input: PlanInput): PlanOutput {
  const percentages = [0.10, 0.15, 0.15, 0.30, 0.30];
  const levels: WeeklyPlan[] = [];
  const calculatedIncrease: number[] = [];
  const startDate = new Date(input.planRequestDate);
  startDate.setDate(startDate.getDate() + (7 - startDate.getDay()) % 7);

  for (let i = 0; i < 5; i++) {
    const weekNumber = getWeekNumber(startDate);
    const startingDay = startDate.toISOString().split('T')[0];
    const percentage = percentages[i];
    const investment = input.amountToInvest * percentage;
    const numberOfAds = roundUpAds(investment);
    const messages = 0;
    const links = input.messagesOk ? numberOfAds - 1 : numberOfAds;
    const dailyBudgetPerAd = Math.max(1, (investment / 7) / numberOfAds);

    levels.push({
      weekNumber,
      startingDay,
      percentage,
      investment,
      numberOfAds,
      messages,
      links,
      dailyBudgetPerAd,
    });

    if (i > 0) {
      const prevAds = levels[i - 1].numberOfAds;
      calculatedIncrease.push((prevAds - numberOfAds) / prevAds);
    } else {
      calculatedIncrease.push(0);
    }

    startDate.setDate(startDate.getDate() + 7);
  }

  return { levels, calculatedIncrease };
}

const ExpressLaunching = () => {
  const [planInput, setPlanInput] = useState<PlanInput>({
    planRequestDate: new Date().toISOString().split('T')[0],
    amountToInvest: 5000,
    messagesOk: false,
    goal: 'LANDING_PAGE_VIEWS',
  });

  const planOutput = calculatePlan(planInput);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPlanInput({
      ...planInput,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <Layout>
      <Head>
        <title>Express Launching</title>
      </Head>
      <Container>
        <Typography variant="h4" gutterBottom>
          Express Launching
        </Typography>
        <TextField
          label="Plan Request Date"
          type="date"
          name="planRequestDate"
          value={planInput.planRequestDate}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Approx. Amount to Invest"
          type="number"
          name="amountToInvest"
          value={planInput.amountToInvest}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="messagesOk"
              checked={planInput.messagesOk}
              onChange={handleInputChange}
            />
          }
          label="Messages OK?"
        />
        <TextField
          label="Goal"
          name="goal"
          value={planInput.goal}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>Year&apos;s Week</TableCell>
<TableCell>Starting Day</TableCell>
<TableCell>Plan&apos;s Week</TableCell>
                <TableCell>Invest (%)</TableCell>
                <TableCell>Invest Amount</TableCell>
                <TableCell>Number of Ads</TableCell>
                <TableCell>To Messages</TableCell>
                <TableCell>To Link</TableCell>
                <TableCell>Daily Budget/Ad</TableCell>
                <TableCell>Calculated Increase</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planOutput.levels.map((level, index) => (
                <TableRow key={index}>
                  <TableCell>{level.weekNumber}</TableCell>
                  <TableCell>{level.startingDay}</TableCell>
                  <TableCell>{`W${index + 1}`}</TableCell>
                  <TableCell>{(level.percentage * 100).toFixed(2)}%</TableCell>
                  <TableCell>${level.investment.toFixed(2)}</TableCell>
                  <TableCell>{level.numberOfAds}</TableCell>
                  <TableCell>{level.messages}</TableCell>
                  <TableCell>{level.links}</TableCell>
                  <TableCell>${level.dailyBudgetPerAd.toFixed(2)}</TableCell>
                  <TableCell>{(planOutput.calculatedIncrease[index] * 100).toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  );
};

export default ExpressLaunching;
