"use client"
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { useKhalti } from '@/services/khalti/hooks';
import React from 'react';
import { PaymentRequest } from '@/types/khalti';

export const KhaltiTestComponent: React.FC = () => {
  const {
    initiate,
    isInitiating,
    initiateError,
    status,
    statusError,
    isLoading,
  } = useKhalti({
    onSuccess: (response) => {
      alert(`Payment completed! Transaction ID: ${response.transaction_id}`);
    },
    autoRedirect: true,
  });

  // Dummy data for testing
  const paymentRequest: PaymentRequest = {
    return_url: 'http://localhost:3000/pay/success',
    website_url: 'http://localhost:3000',
    amount: 1000, // amount in paisa, e.g., 1000 paisa = 10 NPR
    purchase_order_id: 'test-order-123',
    purchase_order_name: 'Test Order',
    customer_info: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '9800000000',
    },
  };
  const isInitiatingBoolean = isInitiating === 'pending';
  const isLoadingBoolean = isLoading === 'pending';
  const isButtonDisabled = isInitiatingBoolean || isLoadingBoolean;
  const handleInitiatePayment = () => {
    initiate(paymentRequest);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Test Khalti Payment</CardTitle>
          <CardDescription>Initiate and track a test payment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleInitiatePayment}
            disabled={isButtonDisabled}
            className="w-full"
          >
            {isInitiating === "pending" ? 'Initiating...' : 'Initiate Payment'}
          </Button>
          {initiateError && (
            <p className="text-red-500 text-sm">Initiation Error: {initiateError.message}</p>
          )}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Payment Status</h3>
            {isLoading ? (
              <p className="text-gray-500">Loading...</p>
            ) : status ? (
              <div>
                <p className="text-gray-700">Status: {status.status}</p>
                <p className="text-gray-700">Amount: NPR {status.total_amount / 100}</p>
                <p className="text-gray-700">Transaction ID: {status.transaction_id ?? 'N/A'}</p>
              </div>
            ) : (
              <p className="text-gray-500">No status available.</p>
            )}
            {statusError && (
              <p className="text-red-500 text-sm">Status Error: {statusError.message}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
