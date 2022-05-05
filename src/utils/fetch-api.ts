export interface ApiResponse<T> {
  ok: boolean;
  message?: string;
  data?: T;
}

type Class<T> = new (...args: any[]) => T;

export default async function fetchApi<T>({
  url,
  from,
  headers,
}: {
  url: string;
  from?: Class<T>;
  headers?: object;
}): Promise<ApiResponse<T>> {
  try {
    const resp = await fetch(url, {
      headers: { ...headers },
    });
    const json = await resp.json();
    if (json.error) {
      return {
        ok: false,
        message: json.error.message,
      };
    }
    return {
      ok: true,
      data: from ? new from(json) : json,
    };
  } catch (err) {
    console.error(
      `An error occurred while performing AJAX request for ${url}`,
      err
    );
    return {
      ok: false,
      message: 'Something went wrong!',
    };
  }
}
