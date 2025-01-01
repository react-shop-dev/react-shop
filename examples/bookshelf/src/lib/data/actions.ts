'use server';

import faqMocks from '@/lib/mocks/faq';

export const onSuccessPlaceOrder = async () => {
  // Additional steps:
  // - Check if new user exists in DB, if not - create new record
  // - Send E-mail to Customer
  // - Update Product `inventory_quantity`, 'sales' values
};

export type FAQItem = { question: string; answer: string };

export const fetchFAQ = async (): Promise<FAQItem[]> =>
  new Promise(resolve => {
    resolve(faqMocks);
  });
