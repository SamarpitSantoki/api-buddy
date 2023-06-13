import axios from "axios";

export async function POST(request: Request) {
  const req = await request.json();

  console.log(req);

  let response = {};

  try {
    const resp = await axios.request(req);

    response = {
      data: {
        data: resp.data,
        status: resp.status,
        statusText: resp.statusText,
        headers: resp.headers,
      },
      status: true,
    };
  } catch (e: any) {
    console.log("erorr ", e);

    if (e.response) {
      response = {
        data: {
          data: e.response.data,
          status: e.response.status,
          statusText: e.response.statusText,
          headers: e.response.headers,
        },
        status: false,
      };
    } else if (e.request) {
      response = {
        data: {
          data: e.request.data,
          status: e.request.status,
          statusText: e.request.statusText,
          headers: e.request.headers,
        },
        status: false,
      };
    } else {
      response = {
        data: e.message,
        status: false,
      };
    }
  }
  return new Response(JSON.stringify(response));
}
