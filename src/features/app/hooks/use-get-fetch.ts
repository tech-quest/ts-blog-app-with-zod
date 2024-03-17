import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Error } from './error-types';

const configs: RequestInit = {
  method: 'GET',
  mode: 'cors',
};

export const useGetFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>();
  const [error, setError] = useState<Error | null>();
  const [studyError, setStudyError] = useState<Error | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleError = async (res: Response) => {
    try {
      const json = await res.json();

      if (res.status === 404 && json.error) {
        router.push('/not-found');
        return;
      }
      setError({ code: 'UNKNOWN_ERROR', message: '原因不明のエラーが発生しました。', fields: null });
      return;
    } catch {
      setStudyError({
        code: 'API_NOT_AVAILABLE',
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

  const query = async () => {
    setStatesWhenStartFetching();

    return await fetch(url, configs)
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

  return { data, error, studyError, isLoading, query };
};
