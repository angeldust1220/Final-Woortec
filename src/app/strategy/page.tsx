// pages/dashboard.tsx

'use client';

import { useState } from 'react';
import Head from 'next/head';

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

const Strategy = () => {
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
    <>
      <Head>
        <title>Strategy</title>
      </Head>
      <div className="container">
        <h1>Express Launching</h1>
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
            Approx. Amount to Invest
            <input
              type="number"
              name="amountToInvest"
              value={planInput.amountToInvest}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Messages OK?
            <input
              type="checkbox"
              name="messagesOk"
              checked={planInput.messagesOk}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Goal
            <input
              type="text"
              name="goal"
              value={planInput.goal}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <table className="plan-table">
          <thead>
            <tr>
              <th>Years Week</th>
              <th>Starting Day</th>
              <th>Plans Week</th>
              <th>Invest (%)</th>
              <th>Invest Amount</th>
              <th>Nº Ads</th>
              <th>To Messages</th>
              <th>To Link</th>
              <th>Daily Budget/Ad</th>
              <th>Calculated Increase</th>
            </tr>
          </thead>
          <tbody>
            {planOutput.levels.map((level, index) => (
              <tr key={index}>
                <td>{level.weekNumber}</td>
                <td>{level.startingDay}</td>
                <td>{`W${index + 1}`}</td>
                <td>{(level.percentage * 100).toFixed(2)}%</td>
                <td>${level.investment.toFixed(2)}</td>
                <td>{level.numberOfAds}</td>
                <td>{level.messages}</td>
                <td>{level.links}</td>
                <td>${level.dailyBudgetPerAd.toFixed(2)}</td>
                <td>{(planOutput.calculatedIncrease[index] * 100).toFixed(2)}%</td>
              </tr>
            ))}
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
        }
        .plan-table th, .plan-table td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        .plan-table th {
          background-color: #f2f2f2;
        }
      `}</style>
    </>
  );
};

export default Strategy;
