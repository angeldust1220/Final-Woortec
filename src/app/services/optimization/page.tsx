'use client';

import { useState } from 'react';
import Head from 'next/head';
import Layout from '@/app/components/Layout';
import {
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';

interface PlanInput {
  planRequestDate: string;
  amountToInvest: number;
}

interface WeeklyPlan {
  weekNumber: string;
  startingDay: string;
  plansWeek: string;
  investAmount: number;
  numberOfAds: number;
  dailyBudgetPerAd: number;
}

function getWeekNumber(date: Date): string {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = (date.getTime() - start.getTime() + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000)) / 86400000;
  return 'W' + Math.ceil((diff + ((start.getDay() + 1) % 7)) / 7);
}

function getStartingDay(weekNumber: number, year: number): string {
  const firstDayOfYear = new Date(year, 0, 1);
  const days = (weekNumber - 1) * 7;
  const startDate = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + days - firstDayOfYear.getDay() + 1));
  return startDate.toISOString().split('T')[0];
}

function calculatePlan(input: PlanInput): WeeklyPlan[] {
  const numberOfWeeks = 10;
  const weeklyInvestment = input.amountToInvest / numberOfWeeks;
  const numberOfAds = 3;
  const dailyBudgetPerAd = (weeklyInvestment / 7) / numberOfAds;
  const levels: WeeklyPlan[] = [];
  const startDate = new Date(input.planRequestDate);
  startDate.setDate(startDate.getDate() + (7 - startDate.getDay()) % 7);

  for (let i = 0; i < numberOfWeeks; i++) {
    const weekNumber = getWeekNumber(startDate);
    const startingDay = startDate.toISOString().split('T')[0];
    const plansWeek = `W${i + 1}`;

    levels.push({
      weekNumber,
      startingDay,
      plansWeek,
      investAmount: weeklyInvestment,
      numberOfAds,
      dailyBudgetPerAd,
    });

    startDate.setDate(startDate.getDate() + 7);
  }

  return levels;
}

const Optimization = () => {
  const [planInput, setPlanInput] = useState<PlanInput>({
    planRequestDate: new Date().toISOString().split('T')[0],
    amountToInvest: 250,
  });

  const planOutput = calculatePlan(planInput);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setPlanInput({
      ...planInput,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };

  return (
    <Layout>
      <Head>
        <title>Campaign Plan</title>
      </Head>
      <Container>
        <Typography variant="h4" component="h4">OPTIMIZATION</Typography>
        <Typography variant="body1">Campaign Optimization & Improvements</Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Plan Request Date"
            type="date"
            name="planRequestDate"
            value={planInput.planRequestDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Amount to Invest"
            type="number"
            name="amountToInvest"
            value={planInput.amountToInvest}
            onChange={handleInputChange}
          />
        </Box>
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Years Week</TableCell>
                {planOutput.map((level, index) => (
                  <TableCell key={index}>{level.weekNumber}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Starting Day</TableCell>
                {planOutput.map((level, index) => (
                  <TableCell key={index}>{level.startingDay}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Plans Week</TableCell>
                {planOutput.map((level, index) => (
                  <TableCell key={index}>{level.plansWeek}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>INVEST</TableCell>
                {planOutput.map((level, index) => (
                  <TableCell key={index}>${level.investAmount.toFixed(2)}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Nº Ads</TableCell>
                {planOutput.map((level, index) => (
                  <TableCell key={index}>{level.numberOfAds}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>DAILY BUDGET/AD</TableCell>
                {planOutput.map((level, index) => (
                  <TableCell key={index}>${level.dailyBudgetPerAd.toFixed(2)}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  );
};

export default Optimization;
