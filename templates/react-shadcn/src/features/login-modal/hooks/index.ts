import { bytesToHex } from '@noble/hashes/utils';
import { NDKNip07Signer, NDKNip46Signer, NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { decode, nsecEncode } from 'nostr-tools/nip19';
import { generateSecretKey } from 'nostr-tools/pure';
import { useState } from 'react';

import { useToast } from '@/shared/components/ui/use-toast';
import { useLoginParam } from '@/shared/hooks';

export const useLoginModal = () => {
  const [nip46Input, setNip46Input] = useState('');
  const [nsecInput, setNsecInput] = useState('');
  const [loading, setLoading] = useState(false);

  const { isLoginModalOpen, closeLoginModal, openLoginModal } = useLoginParam();

  const { ndk, setSigner } = useNdk();

  const { toast } = useToast();

  const handleExtensionSigner = () => {
    setLoading(true);

    const signer = new NDKNip07Signer();

    signer
      .blockUntilReady()
      .then((user) => {
        localStorage.setItem('pubkey', user.pubkey);
        localStorage.removeItem('seckey');

        setSigner(signer);
        closeLoginModal();
      })
      .catch((e) => {
        console.error(e);
        toast({ title: 'Error', description: String(e), variant: 'destructive' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRemoteSigner = () => {
    setLoading(true);

    const signer = new NDKNip46Signer(ndk, nip46Input);

    signer.on('authUrl', (url) => {
      window.open(url, 'auth', 'width=600,height=600');
    });

    signer
      .blockUntilReady()
      .then((user) => {
        localStorage.setItem('pubkey', user.pubkey);
        localStorage.removeItem('seckey');

        setSigner(signer);
        closeLoginModal();
      })
      .catch((e) => {
        console.error(e);
        toast({ title: 'Error', description: String(e), variant: 'destructive' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSecretKeySigner = () => {
    setLoading(true);

    try {
      const bytes = decode(nsecInput).data as Uint8Array;
      const hex = bytesToHex(bytes);
      const signer = new NDKPrivateKeySigner(hex);

      signer.user().then((user) => {
        localStorage.setItem('pubkey', user.pubkey);
        localStorage.setItem('seckey', hex);
      });

      setSigner(signer);
      closeLoginModal();
    } catch (e) {
      console.error(e);
      toast({ title: 'Error', description: String(e), variant: 'destructive' });
    }

    setNsecInput('');
    setLoading(false);
  };

  const handleSecretKeyGenerate = () => {
    const sk = generateSecretKey();
    const nsec = nsecEncode(sk);
    setNsecInput(nsec);
  };

  return {
    loading,
    nip46Input,
    setNip46Input,
    nsecInput,
    setNsecInput,
    handleRemoteSigner,
    handleExtensionSigner,
    handleSecretKeySigner,
    handleSecretKeyGenerate,
    isLoginModalOpen,
    closeLoginModal,
    openLoginModal,
  };
};
