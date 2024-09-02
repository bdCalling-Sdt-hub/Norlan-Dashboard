import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://206.189.231.81:5000/api"
    }),
    endpoints: () => ({})
});

export const imageUrl = "http://206.189.231.81:5000/";