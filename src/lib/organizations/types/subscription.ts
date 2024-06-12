type Transaction = {
  id: string;
  paymentReference: string;
  createdAt: string;
  status: string;
};
type Invoice = {
  id: string;
  invoiceNumber: string;
  transactionId: string;
  status: string;
};
type Payment = {
  planId: string;
  startDate: string;
  endDate: string;
  // status: Stripe.Subscription.Status;
  status: 'active' | 'inactive' | 'expired';
  transactions: Transaction[];
  invoice: Invoice[];
};
export interface Subscription {
  id: string;
  organizationId: string;
  payments: Payment[];
}
