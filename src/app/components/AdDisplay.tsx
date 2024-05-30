'use client'

import React, { useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  AppBar,
  Toolbar,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CssBaseline,
  Card,
  CardContent,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type AdData = {
  date: string;
  campaign_name: string;
  adset_name: string;
  spend: string;
  impressions: string;
  clicks: string;
  ctr: string;
  cpc: string;
  cpm: string;
  reach: string;
  frequency: string;
  unique_clicks: string;
  unique_ctr: string;
  budget: string;
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: '#f44336',
    },
    success: {
      main: '#4caf50',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

const AdDisplay: React.FC<{ accessToken: string }> = ({ accessToken }) => {
  const [adsData, setAdsData] = useState<AdData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalBudget, setTotalBudget] = useState<number | null>(null);

  useEffect(() => {
    fetchUserData(); // Fetch user data including total budget
    fetchAdsData('yesterday'); // Default fetch for yesterday
  }, [accessToken]);

  const fetchUserData = async () => {
    try {
      const url = `https://graph.facebook.com/v19.0/me?fields=adaccounts{name,account_id,amount_spent,spend_cap}&access_token=${accessToken}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setError(data.error.message);
        return;
      }

      // Assuming total budget is the 'spend_cap' of the first ad account
      const userTotalBudget = data.adaccounts.data[0]?.spend_cap || 0;
      setTotalBudget(userTotalBudget);

    } catch (error) {
      setError('Failed to fetch user data');
    }
  };

  const fetchAdsData = async (datePreset: string) => {
    setLoading(true);
    try {
      const url = `https://graph.facebook.com/v19.0/me/adaccounts?fields=campaigns{name,start_time,end_time,objective,status,adsets{name,start_time,end_time,daily_budget,insights{date_start,spend,impressions,clicks,ctr,cpc,cpm,reach,frequency,unique_clicks,unique_ctr},budget_remaining}}&access_token=${accessToken}&date_preset=${datePreset}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setError(data.error.message);
        return;
      }

      const adsData = data.data.flatMap((account: any) =>
        account.campaigns?.data.flatMap((campaign: any) =>
          campaign.adsets?.data.map((adset: any) => {
            const insights = adset.insights?.data[0] || {};
            return {
              date: insights.date_start || '',
              campaign_name: campaign.name,
              adset_name: adset.name,
              spend: insights.spend || '0',
              impressions: insights.impressions || '0',
              clicks: insights.clicks || '0',
              ctr: insights.ctr || '0',
              cpc: insights.cpc || '0',
              cpm: insights.cpm || '0',
              reach: insights.reach || '0',
              frequency: insights.frequency || '0',
              unique_clicks: insights.unique_clicks || '0',
              unique_ctr: insights.unique_ctr || '0',
              budget: adset.daily_budget || '0',
            };
          })
        ) || []
      );

      setAdsData(adsData);
    } catch (error) {
      setError('Failed to fetch ads data');
    } finally {
      setLoading(false);
    }
  };

  const spentAmount = adsData.reduce((sum, ad) => sum + parseFloat(ad.spend), 0);
  const totalCampaignBudget = adsData.reduce((sum, ad) => sum + parseFloat(ad.budget), 0);
  const remainingBudget = totalCampaignBudget - spentAmount;

  // Filter out ads with zero data
  const filteredAdsData = adsData.filter(ad => parseFloat(ad.spend) > 0);

  // Determine the ad with the highest Cost Per Click (CPC) and Cost Per Message (CPM)
  const highestCpcAd = filteredAdsData.reduce((max, ad) => parseFloat(ad.cpc) > parseFloat(max.cpc) ? ad : max, filteredAdsData[0]);
  const highestCpmAd = filteredAdsData.reduce((max, ad) => parseFloat(ad.cpm) > parseFloat(max.cpm) ? ad : max, filteredAdsData[0]);

  if (loading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
  if (error) return <Typography color="error" align="center">{error}</Typography>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Facebook Ads Dashboard</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Box py={4}>
            <Typography variant="h4" gutterBottom>Ad Performance Overview</Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="textSecondary" gutterBottom>Ads Run</Typography>
                    <Typography variant="h4">28</Typography>
                    <Typography variant="body1" color="error">-33.3%</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="textSecondary" gutterBottom>Total Spend</Typography>
                    <Typography variant="h4">₱{spentAmount.toFixed(2)}</Typography>
                    <Typography variant="body1" color="primary">9.1%</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="textSecondary" gutterBottom>Remaining Budget</Typography>
                    <Typography variant="h4">{remainingBudget !== null ? `₱${remainingBudget.toFixed(2)}` : 'Loading...'}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={4} sx={{ marginTop: 2 }}>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Link Clicks</Typography>
                    <Typography variant="h4">5,810</Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Ad Name</TableCell>
                            <TableCell>Cost Per Click</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredAdsData.map((ad) => (
                            <TableRow key={ad.adset_name} sx={{ backgroundColor: ad.adset_name === highestCpcAd.adset_name ? '#f8d7da' : '#d4edda' }}>
                              <TableCell>{ad.adset_name}</TableCell>
                              <TableCell>{ad.cpc}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Messaging Conversations</Typography>
                    <Typography variant="h4">438</Typography>
                    <Typography variant="body1" color="primary">7.6%</Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Ad Name</TableCell>
                            <TableCell>Cost Per Message</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredAdsData.map((ad) => (
                            <TableRow key={ad.adset_name} sx={{ backgroundColor: ad.adset_name === highestCpmAd.adset_name ? '#f8d7da' : '#d4edda' }}>
                              <TableCell>{ad.adset_name}</TableCell>
                              <TableCell>{ad.cpm}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AdDisplay;
