'use client';

import { useState } from 'react';
import Head from 'next/head';

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
    <>
      <Head>
        <title>Campaign Plan</title>
      </Head>
      <div className="container">
        <h1>OPTIMIZATION</h1>
        <p>Campaign Optimization & Improvements</p>
        <div className="form-group">
          <label>
            Plan Request Date
            <input
              type="date"
              name="planRequestDate"
              value={planInput.planRequestDate}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Amount to Invest
            <input
              type="number"
              name="amountToInvest"
              value={planInput.amountToInvest}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <table className="plan-table">
          <thead>
            <tr>
              <th>Years Week</th>
              {planOutput.map((level, index) => (
                <th key={index}>{level.weekNumber}</th>
              ))}
            </tr>
            <tr>
              <th>Starting Day</th>
              {planOutput.map((level, index) => (
                <th key={index}>{level.startingDay}</th>
              ))}
            </tr>
            <tr>
              <th>Plans Week</th>
              {planOutput.map((level, index) => (
                <th key={index}>{level.plansWeek}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>INVEST</td>
              {planOutput.map((level, index) => (
                <td key={index}>€{level.investAmount.toFixed(2)}</td>
              ))}
            </tr>
            <tr>
              <td>Nº Ads</td>
              {planOutput.map((level, index) => (
                <td key={index}>{level.numberOfAds}</td>
              ))}
            </tr>
            <tr>
              <td>DAILY BUDGET/AD</td>
              {planOutput.map((level, index) => (
                <td key={index}>€{level.dailyBudgetPerAd.toFixed(2)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .container {
          padding: 20px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .plan-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .plan-table th, .plan-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
        }
        .plan-table th {
          background-color: #cce5ff;
        }
        .plan-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
      `}</style>
    </>
  );
};

export default Optimization;
