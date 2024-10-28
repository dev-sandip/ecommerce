import { PaymentInitiateResponse, PaymentLookupResponse } from "@/types/khalti";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { KHALTI_CONFIG, khaltiClient } from ".";

type UseKhaltiOptions = {
  onSuccess?: (response: PaymentLookupResponse) => void;
  onError?: (error: Error) => void; // New callback for error handling
  autoRedirect?: boolean;
  retry?: boolean; // Option for enabling/disabling retry
};

export function useKhalti({ onSuccess, onError, autoRedirect = true, retry = true }: UseKhaltiOptions = {}) {
  const [pidx, setPidx] = useState<string | null>(null);
  const [initiationError, setInitiationError] = useState<Error | null>(null); // State for initiation error
  const [statusError, setStatusError] = useState<Error | null>(null); // State for status error

  // Initialize payment
  const {
    mutate: initiate,
    status: isInitiating,
    error: initiateError,
  } = useMutation<PaymentInitiateResponse, Error, PaymentRequest>({
    mutationFn: async (data) => {
      const { data: response } = await khaltiClient.post<PaymentInitiateResponse>(
        `${KHALTI_CONFIG.baseUrl}/epayment/initiate/`,
        data
      );
      return response;
    },
    onSuccess: (data) => {
      setPidx(data.pidx);
      if (autoRedirect) {
        window.location.href = data.payment_url;
      }
    },
    onError: (error: Error) => {
      setInitiationError(error);
      onError?.(error);
    },
    retry,
  });

  const {
    data: status,
    isLoading: isChecking,
    error: statusErrorResponse,
  } = useQuery<PaymentLookupResponse, Error>({
    queryKey: ['khalti-payment', pidx],
    queryFn: async () => {
      if (!pidx) throw new Error('Payment ID not found');
      const { data } = await khaltiClient.post<PaymentLookupResponse>(
        `${KHALTI_CONFIG.baseUrl}/epayment/lookup/`,
        { pidx }
      );
      if (data.status === 'Completed') {
        onSuccess?.(data);
      }
      return data;
    },
    enabled: !!pidx,
    refetchInterval: (query) => (query.state.data?.status === 'Completed' ? false : 5000),
  });

  // Handle query error
  if (statusErrorResponse) {
    setStatusError(statusErrorResponse);
    onError?.(statusErrorResponse); // Call the custom error callback
  }

  return {
    initiate,
    isInitiating,
    initiationError: initiateError || initiationError,
    status,
    isChecking,
    statusError: statusErrorResponse || statusError,
    isLoading: isInitiating || isChecking,
  };
}
