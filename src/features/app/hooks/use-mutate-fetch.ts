import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Error } from './error-types';

export const useMutateFetch = <T>(method: string, initialOptions?: { url?: string }) => {
  const [data, setData] = useState<T | null>();
  const [error, setError] = useState<Error | null>();
  const [studyError, setStudyError] = useState<Error | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleError = async (res: Response) => {
    try {
      const json = await res.json();
      if (res.status === 404) {
        router.push('/not-found');
        return;
      }
      if (json && json.code) {
        setError({
          code: json.code || 'SERVER_ERROR',
          message: json.message || '受け取ったエラーメッセージはありません',
          fields: json.fields || null,
        });
        return;
      } else {
        setError({
          code: 'UNKNOWN_ERROR',
          message: '原因不明のエラーが発生しました。',
          fields: null,
        });
        return;
      }
    } catch (e) {
      console.log('e: ', e);
      setError({
        code: 'NETWORK_ERROR',
        message: 'API が作成されていないか、ルーティングの設定が誤っています。',
        fields: null,
      });
    }
  };

  const setStatesWhenStartFetching = () => {
    setData(null);
    setError(null);
    setStudyError(null);
    setIsLoading(true);
  };
  const mutate = async (values?, options?: { url?: string }) => {
    const body = JSON.stringify(values);
    setStatesWhenStartFetching();

    const configs: RequestInit = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
    };

    const url = options?.url || initialOptions?.url;

    if (!url) {
      setError({
        code: 'MISSING_URL',
        message: 'URLが指定されていません。',
        fields: null,
      });
      return;
    }

    return await fetch(url, { ...configs, body })
      .then(async (res) => {
        setIsLoading(false);
        if (!res.ok) {
          handleError(res);
          return;
        }

        const json = await res.json();
        setData(json.data);
      })
      .catch(() => {
        setError({
          code: 'NETWORK_ERROR',
          message: '通信エラーが発生しました。ネットワーク環境を確認するか、時間を置いて再度アクセスしてください。',
          fields: null,
        });
      });
  };

  return { data, error, studyError, isLoading, mutate };
};
