export type PaymentRequest = {
  return_url: string;           // Corrected from your initial code
  website_url: string;
  amount: number;               // Amount in paisa
  purchase_order_id: string;
  purchase_order_name: string;
  customer_info?: {
    name?: string;
    email?: string;
    phone?: string;
  };
};


export type PaymentInitiateResponse = {
  pidx: string;
  payment_url: string;
};



export type PaymentStatus = 'Completed' | 'Pending' | 'Initiated' | 'Expired' | 'Refunded' | 'User canceled';

export type PaymentLookupResponse = {
  pidx: string;
  total_amount: number;
  status: PaymentStatus;
  transaction_id: string | null;
  purchase_order_id: string;
  purchase_order_name: string;
  mobile?: string; // optional field
};
