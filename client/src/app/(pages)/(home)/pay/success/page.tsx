// pages/payment/redirect.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { KHALTI_CONFIG, khaltiClient } from '@/services/khalti';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { PaymentLookupResponse } from '@/types/khalti'; 

const PaymentRedirectHandler: React.FC = () => {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<PaymentLookupResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyPayment = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const pidx = queryParams.get('pidx');

      if (pidx) {
        try {
          const response = await khaltiClient.post<PaymentLookupResponse>(
            `${KHALTI_CONFIG.baseUrl}/epayment/lookup/`,
            { pidx }
          );

          const paymentResponse = response.data;
          setPaymentData(paymentResponse);

          if (paymentResponse.status !== 'Completed') {
            setErrorMessage('Payment not completed. Please try again.');
          }
        } catch (error) {
          console.error('Payment verification error:', error);
          setErrorMessage('An error occurred while verifying the payment.');
        } finally {
          setLoading(false);
        }
      } else {
        setErrorMessage('Invalid payment details. Please try again.');
        setLoading(false);
      }
    };

    // Ensure this runs in the client
    verifyPayment();
  }, []);

  const handleRedirect = () => {
    // Redirect to the homepage or any desired page
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Payment Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <p className="text-gray-500">Loading payment details...</p>
          ) : errorMessage ? (
            <Alert variant="destructive">{errorMessage}</Alert>
          ) : paymentData ? (
            <div className="space-y-2">
              <p className="text-green-500">Payment successful! Thank you for your purchase.</p>
              <h3 className="text-md font-semibold">Payment Details:</h3>
              <ul className="list-disc pl-5">
                <li><strong>Transaction ID:</strong> {paymentData.transaction_id ?? 'N/A'}</li>
                <li><strong>Status:</strong> {paymentData.status}</li>
                <li><strong>Amount:</strong> NPR {paymentData.total_amount / 100}</li>
                <li><strong>Purchase Order ID:</strong> {paymentData.purchase_order_id}</li>
                <li><strong>Purchase Order Name:</strong> {paymentData.purchase_order_name}</li>
                <li><strong>Mobile:</strong> {paymentData.mobile ?? 'N/A'}</li>
              </ul>
            </div>
          ) : (
            <p className="text-gray-500">No payment data available.</p>
          )}
          <Button onClick={handleRedirect} className="w-full">
            Go to Homepage
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentRedirectHandler;
