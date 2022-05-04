export interface ApiResponse<T> {
  ok: boolean;
  message?: string;
  data?: T;
}

type Class<T> = new (...args: any[]) => T;

export default async function fetchApi<T>(
  url: string,
  from: Class<T>
): Promise<ApiResponse<T>> {
  try {
    const resp = await fetch(url);
    const json = await resp.json();
    if (json.error) {
      return {
        ok: false,
        message: json.error.message,
      };
    }
    return {
      ok: true,
      data: new from(json),
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
