import { NDKPaymentConfirmationLN } from '@nostr-dev-kit/ndk';

export const payInvoiceByWebln = async (
  invoice: string,
): Promise<NDKPaymentConfirmationLN | undefined> => {
  const { webln } = window as { webln?: any };

  if (webln) {
    try {
      await webln.enable();

      try {
        return (await webln.sendPayment(invoice)) as NDKPaymentConfirmationLN;
      } catch (_) {
        return undefined;
      }
    } catch (_) {
      return undefined;
    }
  } else {
    return undefined;
  }
};
