export default async function fetchApi({ url, from, headers }) {
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
      message: "Something went wrong!",
    };
  }
}
